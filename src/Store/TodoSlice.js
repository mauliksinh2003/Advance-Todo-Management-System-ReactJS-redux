import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: [],
  completed: false,
};

export const fetchtodos = createAsyncThunk("fetchtodos", async () => {
  const response = await fetch("http://localhost:5000/posts");
  return response.json();
});

export const posttodos = createAsyncThunk("posttodos", async (newData) => {
  const response = await fetch("http://localhost:5000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: newData,
    }),
  });
  return response.json();
});

export const updateData = createAsyncThunk("data/updateData", async (todo) => {
  const response = await fetch(`http://localhost:5000/posts/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  return response.json();
});

export const deletetodos = createAsyncThunk("deletetodos", async (id) => {
  const response = await fetch(`http://localhost:5000/posts/${id}`, {
    method: "DELETE",
  });
  return id;
});

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchtodos.fulfilled, (state, action) => {
        state.title = action.payload;
      })
      .addCase(posttodos.fulfilled, (state, action) => {
        state.title.push(action.payload);
      })
      .addCase(deletetodos.fulfilled, (state, action) => {
        state.title = state.title.filter((item) => item.id !== action.payload);
      })
      .addCase(updateData.fulfilled, (state, action) => {
        const index = state.title.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.title[index] = action.payload;
        }
      });
  },
});

export const { addTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
