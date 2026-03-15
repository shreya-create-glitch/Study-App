# 📚 Study App (MERN Stack)

A full-stack **Study Management Application** built with the **MERN stack**.
The app helps developers and students manage learning resources like books, interview questions, and code debugging tools.

## 🚀 Features

* 📚 **Book Management**

  * Add new books
  * Edit books
  * Delete books
  * View book details

* 🔐 **User Authorization**

  * Only the creator can edit or delete their books.

* 🤖 **AI Code Debugger**

  * Paste your code
  * Select programming language
  * Get AI review and suggestions

* ❓ **Interview Questions Section**

  * View interview questions
  * Track question status

* 🔍 **Search Functionality**

  * Easily search study materials.

* 🌙 **Dark Mode Support**

---

## 🛠️ Tech Stack

### Frontend

* React
* React Router
* Tailwind CSS
* Axios
* React Hot Toast
* Monaco Code Editor
* React Select

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### AI Integration

* Google Gemini API

---

## 📂 Project Structure

```
frontend
│
├── components
│   ├── Navbar
│   └── Footer
│
├── pages
│   ├── Home
│   ├── Book
│   ├── AddBook
│   ├── EditBook
│   ├── ShowBook
│   ├── Interview
│   ├── ShowInterview
│   ├── Debug
│   └── Search
│
└── App.js
```

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/shreya-create-glitch/Study-App.git
```

### 2️⃣ Go to project folder

```bash
cd Study-App
```

### 3️⃣ Install dependencies

```bash
npm install
```

### 4️⃣ Run the project

```bash
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file in the backend and add:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

For AI debugging feature add:

```
GEMINI_API_KEY=your_api_key
```

---



## 📌 Future Improvements

* User authentication system
* Bookmark favorite books
* Notes system
* Progress tracking dashboard
* Deploy to cloud

---

## 👩‍💻 Author

**Shreya**

GitHub: https://github.com/shreya-create-glitch

---

⭐ If you like this project, please give it a **star** on GitHub!
