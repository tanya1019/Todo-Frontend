import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import "./TaskList.css";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
function TaskList({ task, user, todotrigger, setTodotrigger }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState();
  // const [hover, setHover] = useState();

  const completeTask = async (item) => {
    await axios
      .post("https://todo-tanya.herokuapp.com/completedtodo", {
        TodoId: item?._id,
      })
      .then((res) => {
        // console.log(res);
        setTodotrigger(!todotrigger);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteTask = async (item) => {
    await axios
      .post("https://todo-tanya.herokuapp.com/deleletodo", {
        TodoId: item?._id,
      })
      .then((res) => {
        // console.log(res);
        setTodotrigger(!todotrigger);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const editTask = async (item) => {
    await axios
      .post("https://todo-tanya.herokuapp.com/edittodo", {
        TodoId: item?._id,
      })
      .then((res) => {
        // console.log(res);
        setTodotrigger(!todotrigger);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          height: "calc(100vh - 80px)",
        }}
      >
        {task?.map((item) => {
          if (item.completed === false) {
            return (
              <div className="taskcontainer" key={item._id}>
                <a style={{ textAlign: "left", color: "#fff", fontSize: 18 }}>
                  {item.todo.charAt(0).toUpperCase() + item.todo.slice(1)}
                </a>
                <a style={{ textAlign: "right", color: "#fff", fontSize: 16 }}>
                  <span style={{ opacity: 0.5 }}>Priority : </span>
                  {item.priority}
                </a>
                <a style={{ textAlign: "right", color: "#fff", fontSize: 14 }}>
                  {item?.created_at
                    ?.slice(0, 10)
                    .split("-")
                    .reverse()
                    .join("-")}
                </a>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    // paddingInline: 10,
                    paddingBottom: 10,
                    marginTop: 10,
                  }}
                >
                  <button
                    className="button"
                    onClick={() => completeTask(item)}
                    style={{ backgroundColor: "#275" }}
                  >
                    <DoneAllIcon />
                  </button>
                  <button
                    className="button"
                    onClick={() => {
                      setOpenModal(true);
                      setSelectedTask(item);
                    }}
                    style={{ marginLeft: 10, backgroundColor: "#16f" }}
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="button"
                    onClick={() => deleteTask(item)}
                    style={{ marginLeft: 10, backgroundColor: "#f57" }}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            );
          }
        })}
      </div>
      {openModal && (
        <Modal
          closeModal={setOpenModal}
          task={selectedTask}
          todotrigger={todotrigger}
          setTodotrigger={setTodotrigger}
        />
      )}
    </>
  );
}

export default TaskList;
