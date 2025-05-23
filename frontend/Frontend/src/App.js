import React from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import './App.css';

function App() {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Todo List Application</h1>
      <div className="row">
        <div className="col-md-6">
          <AddTaskForm />
        </div>
        <div className="col-md-6">
          <TaskList />
        </div>
      </div>
    </div>
  );
}

export default App; 