import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import axios from "axios";

import "prismjs/themes/prism-tomorrow.css";
import "highlight.js/styles/github-dark.css";
import "prismjs/components/prism-javascript";

const Debug = () => {

  const [prompt, setPrompt] = useState(`function add(a, b) {
  return a - b;
}`);

  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  async function reviewCode() {

    try {

      setLoading(true);

      const response = await axios.post(
        " https://study-app-1-u0bd.onrender.com/review",
        {
          prompt: prompt,
        }
      );

      setReview(response.data);

    } catch (error) {

      console.log(error);

      setReview("❌ Failed to review code.");

    } finally {

      setLoading(false);
    }
  }

  function handleFileUpload(event) {

    const file = event.target.files[0];

    if (file) {

      const reader = new FileReader();

      reader.onload = (e) => {
        setPrompt(e.target.result);
      };

      reader.readAsText(file);
    }
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white overflow-hidden">

      {/* Background Blur Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500 opacity-20 blur-3xl rounded-full"></div>

      {/* Main Container */}
      <div className="relative z-10 p-6">

        {/* Header */}
        <div className="mb-8 text-center">

          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            AI Code Reviewer
          </h1>

          <p className="text-gray-400 mt-3 text-lg">
            Paste your code and get instant AI-powered review 🚀
          </p>

        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT SIDE */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-5">

            {/* Top Bar */}
            <div className="flex items-center justify-between mb-4">

              <h2 className="text-2xl font-bold text-cyan-400">
                Code Editor
              </h2>

              <label className="cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded-xl text-sm font-semibold hover:scale-105 transition-all duration-300">

                Upload File

                <input
                  type="file"
                  accept=".js,.py,.cpp,.java,.ts,.html,.css,.json"
                  onChange={handleFileUpload}
                  className="hidden"
                />

              </label>

            </div>

            {/* Editor */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-inner">

              <Editor
                value={prompt}
                onValueChange={(code) => setPrompt(code)}
                highlight={(code) =>
                  prism.highlight(
                    code,
                    prism.languages.javascript,
                    "javascript"
                  )
                }
                padding={20}
                style={{
                  fontFamily: '"Fira Code", monospace',
                  fontSize: 15,
                  minHeight: "500px",
                  backgroundColor: "#0d1117",
                  color: "#ffffff",
                }}
              />

            </div>

            {/* Button */}
            <button
              onClick={reviewCode}
              disabled={loading}
              className="w-full mt-5 py-4 rounded-2xl text-lg font-bold
              bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600
              hover:scale-[1.02]
              active:scale-95
              transition-all duration-300
              shadow-lg shadow-cyan-500/20"
            >
              {loading ? "Reviewing Code..." : "Review Code ⚡"}
            </button>

          </div>

          {/* RIGHT SIDE */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 overflow-auto">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">

              <h2 className="text-2xl font-bold text-purple-400">
                AI Review
              </h2>

              <div className="px-4 py-2 rounded-xl bg-purple-500/20 text-purple-300 text-sm font-semibold">
                Powered by AI
              </div>

            </div>

            {/* Review Content */}
            <div className="prose prose-invert max-w-none text-gray-300">

              {review ? (

                <Markdown rehypePlugins={[rehypeHighlight]}>
                  {review}
                </Markdown>

              ) : (

                <div className="flex flex-col items-center justify-center h-[500px] text-center text-gray-500">

                  <div className="text-7xl mb-4">
                    🤖
                  </div>

                  <h3 className="text-2xl font-bold mb-2">
                    Ready to Review
                  </h3>

                  <p className="max-w-md">
                    Your AI-powered code analysis will appear here with bugs,
                    improvements, best practices, and optimization suggestions.
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Debug;
