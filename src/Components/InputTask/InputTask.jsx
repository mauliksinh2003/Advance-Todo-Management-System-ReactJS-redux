import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchtodos, posttodos } from "../../Store/TodoSlice";
import ListTask from "../ListTask/ListTask";

const InputTask = () => {
  const [taskTitle, setTaskTitle] = useState("");

  const dispatch = useDispatch();

  function handlechange(e) {
    setTaskTitle(e.target.value);
  }

  function handleClickBtn() {
    dispatch(posttodos(taskTitle));
    setTaskTitle(""); // Reset input field after adding task.
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <div className="form-group">
              <input
                onChange={(e) => handlechange(e)}
                name="addtask"
                type="text"
                value={taskTitle}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Add task"
              />
            </div>{" "}
          </div>
          <div className="col-md-2">
            <button onClick={handleClickBtn} className="btn btn-danger">
              Add task
            </button>
          </div>
        </div>
      </div>
      <hr />
      <ListTask setTaskTitle={setTaskTitle} taskTitle={taskTitle} />
    </>
  );
};

export default InputTask;
