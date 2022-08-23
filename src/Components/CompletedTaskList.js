import axios from "axios";
import React, { useEffect, useState } from "react";
import "./TaskList.css";
import DeleteIcon from "@mui/icons-material/Delete";
import UndoIcon from "@mui/icons-material/Undo";

function CompletedTaskList({ task, setTodotrigger, todotrigger }) {
  const [hover, setHover] = useState("");
  const undoTask = async (item) => {
    await axios
      .post("https://todo-tanya.herokuapp.com/undotodo", {
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
        console.log(res);
        setTodotrigger(!todotrigger);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        height: "calc(100vh - 80px)",
      }}
    >
      {task?.map((item) => {
        if (item.completed === true) {
          return (
            <div
              onMouseEnter={() => {
                setHover(item._id);
              }}
              onMouseLeave={() => {
                setHover("");
              }}
              className="taskcontainer"
              key={item._id}
            >
              <>
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
                    justifyContent: "center",
                  }}
                >
                  <button
                    className="button"
                    onClick={() => undoTask(item)}
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      backgroundColor: "#fa5",
                    }}
                  >
                    <UndoIcon />
                  </button>
                  <button
                    className="button"
                    onClick={() => deleteTask(item)}
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      backgroundColor: "#f57",
                      marginLeft: 10,
                    }}
                  >
                    <DeleteIcon style={{ color: "white" }} />
                  </button>
                </div>
              </>
            </div>
          );
        }
      })}
    </div>
  );
}

export default CompletedTaskList;
