import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  id: string;
  name: string;
  email: string;
}

interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  user: string;
}

interface AuthTodoState {
  user: UserData | null;
  token: string | null;
  todos: Todo[]; 
  userTodos: Todo[]; 
}

const initialState: AuthTodoState = {
  user: null,
  token: null,
  todos: [],
  userTodos: [],
};

const authTodoSlice = createSlice({
  name: "authTodo",
  initialState,
  reducers: {
    logged: (state, action: PayloadAction<{ user: UserData; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.todos = [];
      state.userTodos = [];
    },

    updateUser: (state, action: PayloadAction<{ user: UserData }>) => {
      state.user = action.payload.user;
    },

    setTodos: (state, action: PayloadAction<{ todos: Todo[] }>) => {
      state.todos = action.payload.todos;
    },

    setUserTodos: (state, action: PayloadAction<{ userTodos: Todo[] }>) => {
      state.userTodos = action.payload.userTodos;
    },

  },
});

export const { logged, logout, updateUser, setTodos, setUserTodos } =
  authTodoSlice.actions;
export default authTodoSlice.reducer;
