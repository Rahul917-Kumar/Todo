import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { db } from "../firebase_config";

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import Todo from "./Todo";

function Apps() {
  const [allTask, setAllTask] = useState([]);
  const serverStamp = firebase.firestore.Timestamp;

  const todoCollection = collection(db, "todos");

  const [input, setInput] = useState("");

  const applyChange = (e) => {
    setInput(e.target.value);
  };

  /*function to get data from the firebase as soon page will rerender*/

  const getTodo = async () => {
    const data = await getDocs(todoCollection);
    setAllTask([
      ...data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })),
    ]);
    console.log(allTask);
  };

  /*function to update document in the firestore */

  const updateProgress = async (id, data, inprogress, timestamp) => {
    const todoDoc = doc(db, "todos", id);
    await updateDoc(todoDoc, {
      inprogress: !inprogress,
    });
    const newTask = [
      ...allTask.map((datas) => {
        if (datas.id === id) {
          return {
            id: id,
            data: data,
            inprogress: !inprogress,
            timestamp: timestamp,
          };
        } else {
          return datas;
        }
      }),
    ];

    setAllTask([...newTask]);
  };

  /* function to push new Data to collection */

  const pushToDo = async (e) => {
    e.preventDefault();

    await addDoc(todoCollection, {
      data: input,
      inprogress: true,
      timestamp: serverStamp.now(),
    });
    const data = await getDocs(todoCollection);
    setAllTask([
      ...data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })),
    ]);

    setInput("");
  };

  /* function to delete a document */

  const deleteTodo = async (id) => {
    const todo = doc(db, "todos", id);
    await deleteDoc(todo);
    const newTask = allTask.filter((data) => data.id !== id);
    setAllTask([...newTask]);
  };

  useEffect(() => {
    console.log("useEffect");
    getTodo();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "400px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ textAlign: "center", fontSize: "3rem" }}>TO DO</h1>
        <form>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <TextField
              id="standard-basic"
              label="write a todo"
              variant="standard"
              name="input"
              value={input}
              onChange={applyChange}
              sx={{}}
            />
            <Button
              type="submit"
              variant="outlined"
              onClick={pushToDo}
              sx={{ marginTop: "10px" }}
            >
              AddTODO
            </Button>
          </div>
        </form>

        {allTask.map((data) => {
          return (
            <Todo
              todo={data.data}
              inprogress={data.inprogress}
              id={data.id}
              updateProgress={updateProgress}
              deleteTodo={deleteTodo}
              timestamp={data.timestamp}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Apps;
