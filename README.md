# Task Management Dashboard
A modern, responsive task management application built with Next.js 14 and TailwindCSS. The app includes CRUD functionality for tasks, state management with Redux Toolkit, and filters for task categorization. This project is designed to help users manage their tasks efficiently with a clean and user-friendly UI.
## Features
- **Add Task**: Create tasks with a title, description, and due date.
- **Edit Task**: Update task details.
- **Delete Task**: Remove tasks from the dashboard.
- **Mark as Completed**: Toggle the completion status of tasks.
- **Task Filters**:
    - View All Tasks
    - View Completed Tasks
    - View Pending Tasks
    - View Overdue Tasks (tasks with past due dates).
- **Search Functionality**: Filter tasks by title or description.
- **Responsive Design**: Optimized for both desktop and mobile devices.
## Technologies Used
- **Frontend**:
    - **Next.js 14** for a modern, server-side rendered React application.
    - **TailwindCSS** for styling and responsive design.
- **State Management**:
    - **Redux Toolkit** for managing application state.
- **Other Libraries**:
    - **React** for building the UI.
## Installation
Follow these steps to set up and run the project locally.
### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- Git
### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Diparya/task-manager-redux.git
   cd task-manager-redux
2. Install dependencies:
   ```bash
   npm install
    # or
    yarn install
3. Start the development server:
   ```bash
   npm run dev
    # or
    yarn dev
4. Open your browser and navigate to:
   ```bash
   http://localhost:3000
## Usage
1. Add a Task:
  - Fill in the task title, description, and due date.
  - Click the "Add Task" button.
2. Edit a Task:
  - Click the "Edit" button on a task card.
  - Modify the details in the form.
  - Click the "Update Task" button.
3. Delete a Task:
  - Click the "Delete" button on a task card.
4. Mark as Completed:
  - Click the "Mark Complete" button on a pending task.
  - To revert, click "Mark Pending."
5. Filter and Search:
  - Use the search bar to find tasks by title or description.
  - Toggle between different filters to view specific categories.
## Folder Structure
  ```bash
  ├── app/
│   ├── layout.js             # Layout for the Next.js app
│   ├── page.js               # Main page containing the dashboard
├── components/
│   ├── Navbar.js             # Navigation bar component
│   ├── TaskDashboard.js      # Main task dashboard UI
├── store/
│   ├── tasksSlice.js         # Redux slice for task management
│   ├── store.js              # Redux store setup
├── styles/
│   ├── globals.css           # Global styles
├── public/                   # Public assets (e.g., images, icons)
├── package.json              # Dependencies and scripts



  
