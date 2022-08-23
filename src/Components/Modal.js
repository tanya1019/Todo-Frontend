import axios from "axios";
import React, { useState } from "react";
import "./Modal.css";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

function Modal({ closeModal, task, setTodotrigger, todotrigger }) {
  const [todo, setTodo] = useState(task?.todo);
  const [priority, setPriority] = useState(task?.priority);
  const [date, setDate] = useState(task?.deadline);
  //   console.log(task);
  const editTask = async () => {
    await axios
      .post("http://localhost:5000/edittodo", {
        TodoId: task?._id,
        priority: priority,
        todo: todo,
        deadline: date,
      })
      .then((res) => {
        console.log(res);
        setTodotrigger(!todotrigger);
        // closeModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "calc(100vw + 100px)",
        position: "fixed",
        top: 0,
        zIndex: 100,
        backgroundColor: "#0005",
        backdropFilter: "blur(10px)",
      }}
      onClick={() => {
        // closeModal(false);
      }}
    >
      {/* <div className="background"> */}
      <div className="modalContainer">
        <div
          style={{
            justifyContent: "flex-end",
            display: "flex",
            marginBottom: 20,
          }}
        >
          <button
            style={{
              justifyContent: "flex-end",
              width: 50,
              backgroundColor: "transparent",
              border: "none",
              color: "#fff",
            }}
            onClick={() => {
              closeModal(false);
            }}
          >
            <CloseIcon />
          </button>
        </div>
        <input
          onChange={(e) => {
            setTodo(e.target.value);
          }}
          value={todo}
          type="text"
          className="text"
          placeholder="Enter Task"
        />
        <input
          onChange={(e) => {
            setPriority(e.target.value);
          }}
          value={priority}
          type="text"
          className="text"
          placeholder="Enter Priority"
        />
        <input
          onChange={(e) => {
            setDate(e.target.value);
          }}
          value={date}
          type="text"
          className="text"
          placeholder="Enter Date"
        />
        <button
          className="button"
          onClick={() => {
            closeModal(false);
            editTask();
          }}
        >
          <EditIcon />
        </button>
      </div>
      {/* </div> */}
    </div>
  );
}

export default Modal;
