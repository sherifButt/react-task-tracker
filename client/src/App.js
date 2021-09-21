// import LIBRARIES
import React from 'react'
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useTransition, animated } from "react-spring";

// import COMPONANTS
import Header from "./componenets/Header";
import Tasks from "./componenets/Tasks";
import AddTask from "./componenets/AddTask";
import Footer from "./componenets/Footer";
import About from "./componenets/About";

// App COMPONENT
function App(props) {
  // STATE
  const [tasks, setTasks] = useState([]);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  // ANIMATIONS
  const transitionAddForm = useTransition(showAddTaskForm, {
    from: { opacity: 0, y: -40 },
    enter: { opacity: 1, y: 50 },
    leave: { opacity: 0, y: 10 },
  });

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      
      setTasks(tasksFromServer?tasksFromServer:[]);
    };
    getTasks();
  }, []);

  //REST
  // fetch Tasks
  const fetchTasks = async () => {
    try {
      const res = await fetch("/tasks", { method: "GET" });
      const data = await res.json();
      console.log("-->", process.env.REACT_APP_SERVER)
      return data;
    } catch (err) {
      console.error("Error featch tasks: ", err);
    }
  };

  // fetch one Task
  const fetchTask = async (id) => {
    try {
      const res = await fetch(`/tasks/${ id }`, {
        method: "GET",
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(`Error featch task [${ id }]:`, err);
    }
  };

  // Update data
  const updateData = async (id, data) => {
    await fetch(`/tasks/${ id }`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`/tasks/${ id }`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Post all tasks
  const saveTasks = async (tasks) => {
    await fetch(process.env.SERVER, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(tasks),
    });
  };

  // Save reorderd Tasks to Server
  const saveReorderdTasks = async (srcI, disI) => {
    await fetch(`/tasks/?srcI=${ srcI }&disI=${ disI }`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  // const saveReorderdTasks = async (_tasks,srcI,disI) => {
  //   await fetch("http://localhost:5000/reordertasks/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({tasks:_tasks})
  //   });
  //   setTasks(_tasks);
  // }

  // Toggle reminder
  const toggleReminder = async (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );

    const taskToChange = await fetchTask(id);
    const changedTask = await {
      ...taskToChange,
      reminder: !taskToChange.reminder,
    };

    updateData(id, changedTask);
  };

  // Add Task
  const addTask = async (task) => {
    try {const res = await fetch(`/tasks/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
      setTasks([...tasks, data]);
    } catch (err) {
      console.error("Error feach Tasks: ",err)
    }

    // const newTask = { id: tasks.length + 1, ...task };
    // setTasks([...tasks, newTask]);
  };

  //Edit Task text
  const editTask = async (payload) => {
    // Fetch tasks
    const tasks = await fetchTasks();
    // Fetch oldTaskInfo
    //const oldTaskInfo = await fetchTask(payload.id)//
    //  console.log('-->',payload,oldTaskInfo);
    // Replace oldTaskInfo with newTaskInfo

    const newTasks = tasks.map((task) =>
      payload.id === task.id ? { ...task, text: payload.text } : task
    );
    setTasks(newTasks);


    // Update Tasks state with newTaskInfo
    // PUT newTaskInfo to server
    updateData(payload.id, payload);
  };

  return (
    <Router>
      <div className="container">

        <Header
          showAddTaskForm={showAddTaskForm}
          toggleAddTaskForm={() => setShowAddTaskForm(!showAddTaskForm)}

        />

        <Route
          path="/"
          exact
          render={(props) => (
            <div>
              {transitionAddForm((style, item) =>
                item ? (
                  <animated.div style={style}>
                    <AddTask
                      addTask={addTask}
                      showAddTaskForm={showAddTaskForm}
                      onAnimationEnd={() => console.log('animation ended')}
                    />
                  </animated.div>
                ) : (
                  ""
                )
              )}

              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  setTasks={setTasks}
                  deleteTask={deleteTask}
                  toggleReminder={toggleReminder}
                  editTask={editTask}
                  saveTasks={saveTasks}
                  saveReorderdTasks={saveReorderdTasks}
                />
              ) : (
                <div className="task" style={{ backgroundColor: "white" }}>
                  Sorry.. No tasks to show!
                </div>
              )}
            </div>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
