// import LIBRARIES
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
  const [counter,setCounter] = useState(0)

  // ANIMATIONS
  const transitionAddForm = useTransition(showAddTaskForm, {
      from: { opacity: 0, y: -40 },
      enter: { opacity: 1, y: 50 },
      leave: { opacity: 0, y: 10 },
    }),
    transitionSlideTasks = useTransition(showAddTaskForm, {
      from: {  y: 0 },
      enter: {  y: 50 },
      leave: {  y: 10 },
    });

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  //REST
  // fetch Tasks
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/tasks", { method: "GET" });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Error featch tasks: ", err);
    }
  };

  // fetch one Task
  const fetchTask = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "GET",
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(`Error featch task [${id}]:`, err);
    }
  };

  // Update data
  const updateData = async (id, data) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Post all tasks
  const saveTasks = async (tasks) => {
    await fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(tasks),
    });
  };

  // Save reorderd Tasks to Server
  const saveReorderdTasks = async (srcI, disI) => {
    await fetch(`http://localhost:5000/tasks/?srcI=${srcI}&disI=${disI}`, {
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
    const res = await fetch("http://localhost:5000/tasks/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    setTasks([...tasks, data]);

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
        <button onClick={() => setCounter((i)=>i+1)}>increment</button>
        <h1>counter: {counter}</h1>
        <Header
          showAddTaskForm={showAddTaskForm}
          toggleAddTaskForm={() => setShowAddTaskForm(!showAddTaskForm)}
          
        />

        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {transitionAddForm((style, item) =>
                item ? (
                  <animated.div style={style}>
                    <AddTask
                      addTask={addTask}
                      showAddTaskForm={showAddTaskForm}
                      onAnimationEnd={()=>console.log('animation ended')}
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
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
