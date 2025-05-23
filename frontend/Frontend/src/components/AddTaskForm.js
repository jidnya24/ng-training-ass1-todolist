import React, { useState } from 'react';
import TaskService from './TaskService';

const AddTaskForm = () => {
  const [task, setTask] = useState({
    title: '',
    description: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prevTask => ({
      ...prevTask,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title.trim() === '') {
      alert('Task title cannot be empty');
      return;
    }
    
    TaskService.createTask(task)
      .then(response => {
        setTask({ title: '', description: '' });
        window.location.reload();
      })
      .catch(error => {
        console.error('Error creating task:', error);
      });
  };
  
  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">Add New Task</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={task.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={task.description}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Add Task</button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm; 