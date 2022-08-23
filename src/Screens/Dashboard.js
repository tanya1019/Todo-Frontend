import { flattenOptionGroups } from "@mui/base";
import axios from "axios";
import React, { useState, useEffect } from "react";
import CompletedTaskList from "../Components/CompletedTaskList";
import TaskList from "../Components/TaskList";
import TodoTaskForm from "../Components/TodoTaskForm";
import "./Dashboard.css";
//-------------------------------------------------------
function Dashboard() {
  const [task, setTask] = useState([]);
  const [user, setUser] = useState("");
  const [todotrigger, setTodotrigger] = useState(false);

  //-------------------------------------------------------

  useEffect(() => {
    const currentUser = localStorage.getItem("user");
    const localuser = JSON.parse(currentUser);
    setUser(localuser);
    gettodo(localuser);
  }, [todotrigger]);

  //-----------------------------------------------------------
  const gettodo = async (user) => {
    axios
      .get(`https://todo-tanya.herokuapp.com/todo/task?userId=${user._id}`)
      .then((res) => {
        setTask(res.data.todos);
        // console.log(res);
      })
      .catch((err) => console.log(err));
  };

  //-----------------------------------------------------------

  return (
    <div className="container">
      <img
        src="https://i.pinimg.com/736x/0d/4d/11/0d4d11c69d46979ec9f5aeb004d4b340.jpg"
        style={{
          position: "fixed",
          top: 0,
          height: "100vh",
          width: "100vw",
          zIndex: -10,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 0,
          height: "100vh",
          width: "100vw",
          zIndex: -10,
          backgroundColor: "#0005",
          backdropFilter: "blur(7px)",
        }}
      ></div>
      {/* <div className="header">
        <h1 className="title">My Time Scheme!!</h1>
      </div> */}

      <div className="todoContainer">
        <div className="form">
          <TodoTaskForm
            todotrigger={todotrigger}
            setTodotrigger={setTodotrigger}
          />
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <a style={{ color: "#fff", fontWeight: "bold", fontSize: 24 }}>
              Tasks to complete
            </a>
            <TaskList
              user={user}
              task={task}
              todotrigger={todotrigger}
              setTodotrigger={setTodotrigger}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginLeft: 20,
            }}
          >
            <a style={{ color: "#fff", fontWeight: "bold", fontSize: 24 }}>
              Completed task
            </a>
            <CompletedTaskList
              user={user}
              task={task}
              todotrigger={todotrigger}
              setTodotrigger={setTodotrigger}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
