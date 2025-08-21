Task Manager Application

A full-stack task management application built with Node.js/Express backend and React frontend, featuring a user-controlled horizontal scrolling carousel for task display.

Project Structure

```
task-manager/
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── routes/
│   │   └── tasks.js
│   └── middleware/
│       ├── error.js
│       └── notFound.js
├── frontend/
│   ├── package.json
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskFilter.js
│   │   │   ├── TaskForm.js
│   │   │   ├── TaskItem.js
│   │   │   └── TaskList.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   └── main.css
│   │   └── App.js
├── .gitignore
└── README.md
```

How to Run

Prerequisites

- Node.js (v14 or higher)
- npm or yarn

Backend Setup

1. Navigate to the backend directory:

```bash
cd task-manager/backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the backend server:

```bash
npm start
```

The backend will run on `http://localhost:4000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd task-manager/frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend development server:

```bash
npm start
```

The frontend will run on `http://localhost:3000`

### Running Both Together

1. **Terminal 1** - Start Backend:

```bash
cd task-manager/backend && npm start
```

2. **Terminal 2** - Start Frontend:

```bash
cd task-manager/frontend && npm start
```

Both services will run concurrently and the frontend will automatically connect to the backend API.

## 📚 API Documentation

### Base URL

```
http://localhost:4000/api/tasks
```

### Endpoints

#### GET /api/tasks

**Description:** Retrieve all tasks  
**Method:** `GET`  
**Response:**

```json
[
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "priority": "low" | "medium" | "high",
    "completed": boolean,
    "createdAt": "ISO 8601 date string"
  }
]
```

#### POST /api/tasks

**Description:** Create a new task  
**Method:** `POST`  
**Request Body:**

```json
{
  "title": "string (required)",
  "description": "string (optional)",
  "priority": "low" | "medium" | "high" (default: "low")"
}
```

**Response:** Created task object

#### PUT /api/tasks/:id

**Description:** Update an existing task  
**Method:** `PUT`  
**Parameters:** `id` - Task ID  
**Request Body:**

```json
{
  "title": "string",
  "description": "string",
  "priority": "low" | "medium" | "high"
}
```

**Response:** Updated task object

#### PATCH /api/tasks/:id/toggle

**Description:** Toggle task completion status  
**Method:** `PATCH`  
**Parameters:** `id` - Task ID  
**Response:** Updated task object

#### DELETE /api/tasks/:id

**Description:** Delete a task  
**Method:** `DELETE`  
**Parameters:** `id` - Task ID  
**Response:** `204 No Content`

### Error Responses

All endpoints return appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `204` - No Content
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

Error response format:

```json
{
  "error": "Error message description"
}
```

## 🎯 Design Decisions & Assumptions

### Frontend Architecture

- **React Functional Components:** Used modern React hooks (useState, useEffect) for state management
- **Component Structure:** Modular design with separate components for each feature (TaskList, TaskForm, TaskFilter, TaskItem)
- **User-Controlled Scrolling:** Implemented horizontal scrolling carousel that users control manually (no auto-scroll)
- **CSS-Only Styling:** Pure CSS without frameworks, preprocessors, or CSS-in-JS libraries as requested

### Backend Architecture

- **In-Memory Storage:** Tasks are stored in memory for simplicity (resets on server restart)
- **RESTful API:** Standard REST endpoints for CRUD operations
- **UUID for IDs:** Using UUID for unique task identification
- **CORS Enabled:** Cross-origin requests allowed for frontend integration

### Key Features

1. **Horizontal Task Carousel:** Tasks display in a horizontal scrollable layout
2. **Priority System:** Three-level priority system (low, medium, high) with visual indicators
3. **Responsive Design:** Mobile-friendly with custom media queries
4. **Real-time Updates:** Frontend immediately reflects changes without page refresh
5. **Custom Scrollbar:** Styled scrollbar for better user experience

### Assumptions Made

- Tasks don't need persistent storage (acceptable for demo/development)
- Single user system (no authentication/authorization needed)
- Priority levels are sufficient as low/medium/high
- Horizontal scrolling is preferred over vertical list view
- Modern browser support (CSS Grid, Flexbox, ES6+)

## ⏱️ Time Breakdown

### Backend Development (1.5 hour )

### Frontend Development (2.5 hour)

## 🛠️ Technologies Used

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing

### Frontend

- **React** - UI library
- **Fetch API** - HTTP requests
- **CSS3** - Styling (Flexbox, Grid, Custom Properties)
- **HTML5** - Markup

### Development Tools

- **Git** - Version control
- **npm** - Package management
- **VS Code** - Code editor
