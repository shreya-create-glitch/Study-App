import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center sm:text-left">
        
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">StudyHub</h2>
          <p className="text-sm text-gray-400">
            Your smart learning companion. Study smarter, not harder.
          </p>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:text-blue-400">Home</a></li>
            <li><a href="/books" className="hover:text-blue-400">Books</a></li>
            <li><a href="/interview" className="hover:text-blue-400">Interview Q</a></li>
            <li><a href="/progress" className="hover:text-blue-400">Progress</a></li>
          </ul>
        </div>

        {/* Contact / Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p className="text-sm">Email: <a href="mailto:support@studyhub.com" className="text-blue-400 hover:underline">support@studyhub.com</a></p>
          <div className="mt-2 flex justify-center sm:justify-start space-x-4 text-xl">
            <a href="#" className="hover:text-blue-400">🌐</a>
            <a href="#" className="hover:text-blue-400">🐦</a>
            <a href="#" className="hover:text-blue-400">📘</a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-sm text-gray-500 mt-8">
        © {new Date().getFullYear()} StudyHub. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
