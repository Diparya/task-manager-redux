'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTask,
  editTask,
  deleteTask,
  toggleTaskCompletion,
} from '@/store/tasksSlice';

const TaskDashboard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
  });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const handleAddOrUpdateTask = () => {
    if (!newTask.title.trim() || !newTask.dueDate.trim()) return;

    if (editingTaskId) {
      dispatch(editTask({ id: editingTaskId, ...newTask }));
      setEditingTaskId(null);
    } else {
      dispatch(addTask(newTask));
    }

    setNewTask({ title: '', description: '', dueDate: '' });
  };

  const handleEditTask = (task) => {
    setNewTask({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
    });
    setEditingTaskId(task.id);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setNewTask({ title: '', description: '', dueDate: '' });
  };

  const currentDate = new Date().toISOString().split('T')[0];

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (filter === 'completed') return matchesSearch && task.completed;
    if (filter === 'pending') return matchesSearch && !task.completed;
    if (filter === 'overdue')
      return matchesSearch && task.dueDate < currentDate && !task.completed;
    return matchesSearch; // 'all' filter
  });

  return (
    <div className="min-h-screen bg-gray-100 p-2">
      {/* Add/Edit Task Form */}
      <div className="p-6 bg-white shadow-md rounded-lg mx-auto max-w-4xl mt-6">
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-600">
          {editingTaskId ? 'Edit Task' : 'Add Task'}
        </h1>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="text-gray-600 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            placeholder="Task Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            className="text-gray-600 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) =>
              setNewTask({ ...newTask, dueDate: e.target.value })
            }
            className="text-gray-600 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="flex justify-between items-center">
            <button
              onClick={handleAddOrUpdateTask}
              className="bg-purple-900 text-white py-2 px-6 rounded-lg hover:bg-purple-600 transition"
            >
              {editingTaskId ? 'Update Task' : 'Add Task'}
            </button>
            {editingTaskId && (
              <button
                onClick={handleCancelEdit}
                className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto p-6 mt-4">
        <input
          type="text"
          placeholder="Search tasks by title or description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
        />
      </div>

      {/* Filter Buttons */}
      <div className="max-w-4xl mx-auto flex justify-around p-4">
        {['all', 'completed', 'pending', 'overdue'].map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`py-2 px-4 rounded ${
              filter === filterType
                ? 'bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-800'
            }`}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)} Tasks
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto mt-4 p-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="p-4 bg-white border rounded-lg shadow-md hover:shadow-lg transition"
          >
            <h3 className="font-bold text-lg text-black">{task.title}</h3>
            <p className="text-gray-500 break-words mt-2 text-sm">{task.description}</p>
            <p className="text-gray-400 text-xs mt-1">
              Due: {task.dueDate} |{' '}
              {task.completed ? (
                <span className="text-green-600">Completed</span>
              ) : (
                <span className="text-red-600">Pending</span>
              )}
            </p>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => handleEditTask(task)}
                className="bg-green-900 text-white py-1 px-4 rounded hover:bg-green-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteTask(task.id))}
                className="bg-red-900 text-white py-1 px-4 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
              <button
                onClick={() => dispatch(toggleTaskCompletion(task.id))}
                className="bg-blue-900 text-white py-1 px-4 rounded hover:bg-blue-600 transition"
              >
                {task.completed ? 'Mark Pending' : 'Mark Complete'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskDashboard;
