import axios from "axios";
import React, { useEffect, useState } from "react";
import "./TodoTaskForm.css";

function TodoTaskForm({ todotrigger, setTodotrigger }) {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    const currentUser = localStorage.getItem("user");
    const localuser = JSON.parse(currentUser);
    setUser(localuser);
    // console.log("------------------>", localuser);
  }, []);

  const addTodo = async () => {
    axios
      .post("https://todo-tanya.herokuapp.com/addTodo", {
        todo: task,
        created_at: new Date(),
        userId: user._id,
        priority: priority,
        deadline: date,
      })
      .then((res) => {
        setTodotrigger(!todotrigger);
        console.log(res);
        setPriority("");
        setDate("");
        setTask("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: 30,
          marginBottom: 30,
        }}
      >
        <a
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 28,
            textAlign: "left",
          }}
        >
          {user.name}
        </a>
        <a
          style={{
            color: "white",
            fontSize: 18,
            textAlign: "left",
          }}
        >
          {user.email}
        </a>
      </div>
      <div className="taskForm">
        <a style={{ color: "white", fontWeight: "bold", fontSize: 24 }}>
          Add Task
        </a>
      </div>
      <div className="taskFormCard">
        <input
          className="taskInput"
          type="text"
          placeholder="What needs to be done?"
          onChange={(e) => {
            setTask(e.target.value);
          }}
          value={task}
        />
        <input
          className="taskInput"
          type="number"
          maxLength={1}
          placeholder="Enter the Task Priority"
          onChange={(e) => {
            setPriority(e.target.value);
          }}
          value={priority}
        />
        <input
          className="taskInput"
          type="text"
          placeholder="Enter the task date"
          onChange={(e) => {
            setDate(e.target.value);
          }}
          value={date}
        />
        <button onClick={addTodo} className="submitbtn">
          Submit
        </button>
      </div>
    </div>
  );
}

export default TodoTaskForm;
