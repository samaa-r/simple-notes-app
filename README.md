# Simple Notes App

A simple note-taking web application built with Node.js, Express, SQLite, and basic front-end technologies (HTML, CSS, JavaScript). The application allows users to create, read, update, and delete notes.

## Project Structure
```
simple-notes-app/
│── backend/                 # 後端程式碼
│   ├── server.js            # Express 伺服器入口
│   ├── db.js                # SQLite 連接與操作
│   ├── routes/              # API 路由
│   │   ├── notes.js         # 記事相關 API
│   ├── models/              # 資料模型
│   │   ├── noteModel.js     # 記事的資料結構
│   ├── package.json         # Node.js 依賴管理
│   ├── .env                 # 環境變數（Port 等）
│
│── frontend/                # 前端程式碼
│   ├── index.html           # 主要 HTML 頁面
│   ├── styles.css           # CSS 樣式
│   ├── script.js            # 前端邏輯（與 API 互動）
│
│── database/                # 資料庫
│   ├── notes.db             # SQLite 資料庫檔案
│   ├── migrations/          # 資料庫初始化與遷移
│       ├── init.sql         # 建立資料表的 SQL 指令
│
│── README.md                # 專案說明文件
│── .gitignore               # 忽略不該提交的檔案（node_modules、database/notes.db）
```


## Features

- **Create**: Add new notes.
- **Read**: View all notes.
- **Update**: Edit existing notes.
- **Delete**: Remove notes from the list.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **Frontend**: HTML, CSS, JavaScript (Vanilla JS or React)
- **Version Control**: Git

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/simple-notes-app.git
cd simple-notes-app
```

### 2. Install dependencies

For both backend and frontend:
```
npm install
```

### 3. Set up the database

Run the database initialization script:
```
node ./backend/database/init.js
```

### 4. Start the server
```
# Inside the 'backend' folder
npm start
```

The app will be available at http://localhost:3000.
### 5. Frontend

The frontend will automatically interact with the backend API and display notes. Simply open frontend/index.html in your browser to start using the app.
API Endpoints

    GET /api/notes - Fetch all notes.

    POST /api/notes - Create a new note.

    PUT /api/notes/:id - Update a note by ID.

    DELETE /api/notes/:id - Delete a note by ID.
