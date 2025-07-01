# 🔗 Python + React Link Shortener

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

A simple and functional full-stack web application for shortening URLs. Built with Python (Flask) on the backend and React on the frontend, it allows users to turn long links into short, easy-to-share URLs and track the click count for each link.

<br>
<p align="center">
  <img width="1072" alt="Image" src="https://github.com/user-attachments/assets/e109f775-4faf-4b52-ba70-e9ae4ff4cfdc" />
</p>
<br>

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Available Scripts](#-available-scripts)
- [How It Works](#-how-it-works)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)

## ✨ Features

- **Link Shortening**: Transforms a long URL into a short link with a unique code.
- **Automatic Redirect**: When a short link is accessed, the user is instantly redirected to the original URL.
- **Click Tracking**: The system counts how many times each shortened link has been accessed.
- **Stats Page**: An overview of all created links, showing the original link, the short link, and the click count for each.
- **RESTful API**: A Flask-built backend that exposes clear endpoints for creating and managing links.
- **Reactive Interface**: A frontend built with React for a fast and dynamic user experience.

## 🛠️ Tech Stack

- **Frontend**:
    - **React**: The main library for building the user interface.
    - **JavaScript (ES6+)**: The base language, using modern features like `async/await` for API calls.
    - **CSS3**: For interface styling and responsiveness.
- **Backend**:
    - **Python**: The main programming language for server-side logic.
    - **Flask**: A micro-framework for creating the RESTful API.
    - **SQLite**: A lightweight relational database used to store the links and their click counts.

## 🚀 Getting Started

[If you want to access the live version, click here](https://shortlinks-1-n5i6.onrender.com). If you need to wait for the application to load, or load the functions and buttons due to the free hosting plan, waiting up to 50 seconds should be enough.

This project is divided into two parts: the **backend** (the kitchen) and the **frontend** (the dining room). You will need to set up and run both.

### Prerequisites

- [**Node.js**](https://nodejs.org/en/) (version 14 or higher) for the frontend.
- [**Python**](https://www.python.org/downloads/) (version 3.8 or higher) for the backend.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Bytt13/ShortLinks.git
    ```

2.  **Navigate to the project folder:**
    ```bash
    cd ShortLinks
    ```

3.  **Set up the Backend (The Kitchen):**
    ```bash
    # Navigate to the backend folder
    cd backend

    # Create a virtual environment
    python -m venv venv

    # Activate the virtual environment
    # On Windows:
    venv\Scripts\activate
    # On macOS/Linux:
    source venv/bin/activate

    # Install the Python dependencies
    pip install -r requirements.txt

    # Create the initial database
    python init_db.py
    ```

4.  **Set up the Frontend (The Dining Room):**
    - Open a **new terminal**.
    - Navigate to the project folder again and enter the frontend directory.
    ```bash
    # Navigate to the frontend folder
    cd ../frontend # or the full path to the frontend folder

    # Install the Node.js dependencies
    npm install
    ```

## 📜 Available Scripts

You will need two terminals open to run the full application.

#### In the **Backend** terminal (inside the `/backend` folder and with `venv` activated):

```bash
# Starts the API server on port 5000
flask run
```

#### In the **Frontend** terminal (inside the `/frontend` folder):

```bash
# Runs the app in development mode on port 3000
npm start
```
Open http://localhost:3000 to view the application in your browser.

## 🧠 How It Works

Let's use a restaurant analogy to understand the architecture:

Backend (app.py): This is the application's kitchen. Built with Flask, it is responsible for:

Receiving "orders" (requests) from the frontend to shorten a link.

Generating the short code (the "secret recipe").

Storing and fetching information from the "pantry" (the SQLite database).

Serving the "dishes" (responses), like the new short link or the stats data.

Frontend (App.js): This is the dining room and the waiter. Built with React, it:

Presents the interface (the "menu") to the user.

Takes the user's "order" (the long URL).

Sends the order to the kitchen (makes a fetch call to the Flask API).

Brings the result back to the customer's table (displays the shortened link on the screen).

Database (database.db): This is the pantry. A simple SQLite file that neatly stores all the links, their short codes, and the click count for each.

And if you want to see what's happening behind the scenes, just click on "Show Stats".

![Image](https://github.com/user-attachments/assets/ad2edd7a-8260-439a-a0ed-0c0532f89510)

![Image](https://github.com/user-attachments/assets/597a926b-cbec-4f89-ae1f-436c4da24f7d)

## 📂 Project Structure

/
├── backend/                  # The "heart" of the logic (API).
│   ├── venv/                 # Python virtual environment folder (ignored by Git).
│   ├── app.py                # The API's brain: defines routes and logic.
│   ├── init_db.py            # Script to create the initial database.
│   ├── schema.sql            # The "blueprint" of our database.
│   └── database.db           # The database file (ignored by Git).
├── frontend/                 # The "face" of the application (Interface).
│   ├── public/               # Static files, like index.html.
│   ├── src/                  # React source code.
│   │   ├── App.js            # Main component that brings the application together.
│   │   ├── App.css           # Main styles.
│   │   └── index.js          # React entry point.
│   ├── package.json          # The "ID" of the frontend project.
│   └── ...
├── .gitignore                # Tells Git which files to ignore.
└── README.md                 # This file you are reading :)
🔩 API Endpoints

The API exposes the following endpoints:

- `POST /add_url`
  - **Description:** Creates a new shortened link.
  - **Body (JSON):** `{ "url": "https://your-long-url.com" }`
  - **Response:** `{ "short_url": "http://localhost:5000/shortcode" }`

- `GET /<short_code>`
  - **Description:** Redireciona o usuário para a URL original correspondente.

- `GET /stats`
  - **Description:** Retorna uma lista de todos os links, seus originais e a contagem de cliques.
