# 🎨 CoSketch – Real-Time Collaborative Drawing App

CoSketch is a real-time collaborative whiteboard application that allows multiple users to draw, sketch, and brainstorm together seamlessly from anywhere.

---

## 🚀 Live Demo

👉 https://cosketch-co-sketch-frontend.vercel.app/

## ✨ Features

* 🎨 Real-time drawing with multiple users
* 👥 Live collaboration on a shared canvas
* ⚡ Instant updates using WebSockets
* 🧠 Smooth drawing experience with HTML5 Canvas
* 🔄 Sync across all connected users
* 🏗️ Scalable backend architecture
* 🔐 Room-based collaboration system

---

## 🛠️ Tech Stack

### Frontend:

* React.js
* TypeScript
* HTML5 Canvas API

### Backend:

* Node.js
* Express.js
* WebSocket

### Database:

* PostgreSQL
* Prisma ORM

---

## 📂 Project Structure

```
CoSketch/
│── frontend/      # React frontend
│── backend/       # Node.js backend
│── packages/      # Shared packages (if using turborepo)
│── prisma/        # Database schema & migrations
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone 
cd cosketch
```

### 2️⃣ Install dependencies

```bash
pnpm install
```

### 3️⃣ Setup environment variables

Create a `.env` file in the co-sketch-frontend folder:

```env
NEXT_PUBLIC_HTTP_BACKEEND="http://localhost:3000"
NEXT_PUBLIC_WS_URL="ws://localhost:8080"
```

Create a `.env` file in the prisma/db folder:

```env
DATABASE_URL="YOUR DB URL"
```

### 4️⃣ Run database migrations

```bash
pnpm prisma migrate dev
```

### 5️⃣ Start the development servers

```bash
pnpm run dev
```

---

## 🧠 How It Works

* Users join a room using a unique room ID
* WebSocket establishes a real-time connection
* Drawing data is sent as messages to the server
* Server broadcasts updates to all connected users
* Canvas updates instantly for everyone

---

## 📈 Future Improvements

* ✏️ Add shapes & text tools
* 🎯 Undo/Redo functionality
* 💾 Save drawings
* 🔐 Authentication system
* 📱 Mobile responsiveness

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch
3. Make your changes
4. Submit a pull request

---

## 📬 Contact

**Farhan Khan**
📧 farhan2005etw@gmail.com
💼 https://www.linkedin.com/in/farhan0097/

---

## ⭐ Support

If you like this project, please give it a ⭐ on GitHub!

---

**Built with ❤️ by Farhan Khan**
