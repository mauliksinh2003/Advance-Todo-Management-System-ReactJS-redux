import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletetodos, updateData } from "../../Store/TodoSlice";

const ListTask = () => {
  const dispatch = useDispatch();

  const [editItem, setEditItem] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const tasks = useSelector((state) => state);

  const handleEdit = (task) => {
    console.log(task);
    setEditItem(task);
    setEditTitle(task.title);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedItem = { ...editItem, title: editTitle };
    dispatch(updateData(updatedItem));
    setEditItem(null);
  };

  return (
    <div className="container" style={{ width: "100%" }}>
      <h4 style={{ textDecoration: "underline" }}>TO_DO list</h4>
      <div className="card">
        {tasks.todo.title.length > 0 ? (
          tasks.todo.title.map((task, index) => (
            <div
              key={index}
              className="row"
              style={{ margin: "10px", textAlign: "left" }}
            >
              <div className="col-md-10" style={{ display: "list-item" }}>
                <h5>{task.title}</h5>
              </div>
              <div className="col-md-1">
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(task)}
                >
                  Edit
                </button>
              </div>{" "}
              <div className="col-md-1">
                <button
                  className="btn btn-danger"
                  onClick={() => dispatch(deletetodos(task.id))}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: "red", textDecoration: "underline" }}>
            No tasks available
          </p>
        )}
      </div>

      {editItem && (
        <form className="card" onSubmit={handleEditSubmit}>
          <h3 className="card-title">Edit Item</h3>
          <div className="card">
            <div style={{ alignItems: "center" }}>
              <h6>
                <u>Replace Title</u>
              </h6>
              <input
                style={{ width: "50%", display: "inline-block" }}
                className="form-control"
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <button className="btn btn-danger btn-block" type="submit">
                Save
              </button>{" "}
              <button
                className="btn btn-primary btn-block"
                type="button"
                onClick={() => setEditItem(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ListTask;
