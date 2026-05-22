const Groq=require('groq-sdk');
const groq=new Groq({apiKey:process.env.CONN});

async function getResponse(prompt) {
    const chatCompletion = await groq.chat.completions.create({
        model:"llama-3.1-8b-instant",
        messages:[
            {
                role:"system",
                content:prompt
            },
              {
                role:"system",
                content:`
                You are a senior software engineer and code reviewer with expertise in writing clean, scalable, and production-ready code.

Your task is to carefully review the given code and provide a detailed analysis.

Follow these instructions:
1. Identify bugs and logical errors
2. Check code quality and readability
3. Suggest performance improvements
4. Point out security issues
5. Provide optimized code if possible

Response format:
- Summary
- Bugs
- Improvements
- Best practices
- Optimized code
                `
              }
        ]
    })
    return chatCompletion.choices[0].message.content;
}

module.exports = getResponse