// import React from 'react';
import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';

const urlEndpoint = 'https://task-list-api-c17.herokuapp.com';

// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const getTasks = () => {
  return axios
    .get(`${urlEndpoint}/tasks`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('error');
      return error;
    });
};

const App = () => {
  const [tasks, setTasks] = useState([]);

  const getAllTasks = () => {
    getTasks().then((tasks) => {
      setTasks(tasks);
    });
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const updateTasks = (updatedTask) => {
    const allUpdatedTasks = tasks.map((task) => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      } else {
        return task;
      }
    });

    setTasks(allUpdatedTasks);
  };

  const deleteTask = (taskId) => {
    const allUpdatedTasks = [];
    for (const task of tasks) {
      if (task.id !== taskId) {
        allUpdatedTasks.push(task);
      }
    }

    setTasks(allUpdatedTasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {
            <TaskList
              tasks={tasks}
              updateTasks={updateTasks}
              deleteTask={deleteTask}
            />
          }
        </div>
      </main>
    </div>
  );
};

export default App;
