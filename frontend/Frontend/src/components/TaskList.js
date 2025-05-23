import React, { useState, useEffect } from 'react';
import TaskService from './TaskService';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    TaskService.getAllTasks()
      .then(response => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      });
  };

  const handleToggleComplete = (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    TaskService.updateTask(task.id, updatedTask)
      .then(() => {
        fetchTasks();
      })
      .catch(error => {
        console.error('Error updating task:', error);
      });
  };

  const handleDelete = (id) => {
    TaskService.deleteTask(id)
      .then(() => {
        fetchTasks();
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };

  if (loading) {
    return <div className="spinner-border text-primary" role="status"></div>;
  }

  return (
    <div>
      <h3>My Tasks</h3>
      {tasks.length === 0 ? (
        <p className="text-muted">No tasks available. Add a new task!</p>
      ) : (
        tasks.map(task => (
          <div key={task.id} className="card task-card">
            <div className="card-body">
              <h5 className={`card-title ${task.completed ? 'task-completed' : ''}`}>
                {task.title}
              </h5>
              <p className={`card-text ${task.completed ? 'task-completed' : ''}`}>
                {task.description}
              </p>
              <div className="d-flex justify-content-between">
                <button 
                  className={`btn ${task.completed ? 'btn-secondary' : 'btn-success'}`}
                  onClick={() => handleToggleComplete(task)}
                >
                  {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList; 