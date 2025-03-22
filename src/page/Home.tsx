"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Circle, Trash2, Edit2, Save, ChevronDown, ChevronUp, PowerOff } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { validationSchema } from "../utils/validation/todoValidation"
import { toast } from "sonner"
import {
  postTodo,
  deleteTodoApi,
  markTodoCompletedApi,
  editTodoApi,
  getAllTodo,
} from "../services/api/user/apiMethods"
import { setUserTodos, logout } from "../utils/context/reducers/authSlice"

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import AnalogClock from "./AnalogClock"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle  } from "../components/ui/card"
import { Textarea } from "../components/ui/textarea"

interface Todo {
  _id: string
  title: string
  description?: string
  completed: boolean
  user: string
}

export default function HomePage() {
  const dispatch = useDispatch()
  const user = useSelector((state: any) => state.auth.user?.user)
  const todos = useSelector((state: any) => state.auth.userTodos) || []

  const [userId, setUserId] = useState<string>("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [_error, setError] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editedTitle, setEditedTitle] = useState("")
  const [editedDescription, setEditedDescription] = useState("")
  const [expandedTodos, setExpandedTodos] = useState<Record<string, boolean>>({})
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    if (user?.id) {
      setUserId(user.id)
    }
  }, [user])

  useEffect(() => {
    const fetchTodos = async () => {
      if (user?.id) {
        const response = await getAllTodo(user.id)
        if (response.status === 200) {
          dispatch(setUserTodos({ userTodos: response.data }))
        }
      }
    }

    fetchTodos()
  }, [user, dispatch])

  // For clock settings
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  // Toggle todo description
  const toggleTodoExpand = (todoId: string) => {
    setExpandedTodos((prev) => ({
      ...prev,
      [todoId]: !prev[todoId],
    }))
  }

  // Adding todo
  const addTodo = () => {
    if (!userId) {
      setError("User ID is required. Please log in again.")
      return
    }

    validationSchema
      .validate({ title, completed: false, user: userId })
      .then(() => {
        postTodo({ title, description, completed: false, user: userId })
          .then((response: any) => {
            if (response.status === 201) {
              dispatch(setUserTodos({ userTodos: response.data.todo }))
              toast.success(response.data.message)
              setTitle("")
              setDescription("")
              setError("")
            } else {
              toast.error(response.data.message)
            }
          })
          .catch(() => toast.error("Something went wrong. Please try again."))
      })
      .catch((err) => setError(err.message))
  }

  // Delete todo
  const deleteTodo = (todoId: string) => {
    deleteTodoApi(todoId)
      .then((response: any) => {
        if (response.status === 200) {
          dispatch(setUserTodos({ userTodos: response.data.todos }))
          toast.success(response.data.message)
        } else {
          toast.error(response.data.message)
        }
      })
      .catch(() => toast.error("Something went wrong. Please try again."))
  }

  // Update completion of a todo
  const markAsCompleted = (todoId: string) => {
    markTodoCompletedApi(todoId)
      .then((response: any) => {
        if (response.status === 200) {
          dispatch(setUserTodos({ userTodos: response.data.todos }))
          toast.success(response.data.message)
        } else {
          toast.error(response.data.message)
        }
      })
      .catch(() => toast.error("Something went wrong. Please try again."))
  }

  // Edit todo
  const editTodo = (todoId: string, newTitle: string, newDescription = " ") => {
    if (!newTitle.trim()) {
      toast.error("Title cannot be empty!");
      return;
    }
  
    editTodoApi(todoId, newTitle, newDescription)
      .then((response: any) => {
        if (response.status === 200) {
          dispatch(setUserTodos({ userTodos: response.data.userTodos })); // ✅ Fix: Use "userTodos"
          toast.success(response.data.message);
          setEditingId(null);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(() => toast.error("Something went wrong. Please try again."));
  };
  

  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        {/* Clock Section */}
        <div className="col-span-3 h-full">
          <Card className="bg-white/10 backdrop-blur-lg text-white border-none shadow-xl h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-center text-2xl text-[#ff9800]">Clock</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-6 flex-grow">
              <div className="w-48 h-48 mb-6">
                <AnalogClock />
              </div>
              <p className="text-xl">{currentTime.toLocaleDateString()}</p>
            </CardContent>
          </Card>
        </div>

        {/* Todo List Section */}
        <div className="col-span-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg shadow-xl p-6 border-none">
            <h1 className="text-4xl font-extrabold text-center mb-2 text-[#ff9800]">Task Maste</h1>
            <p className="text-center text-gray-300 mb-6">Stay organized and productive!</p>

            <div className="flex flex-col mb-4 space-y-3">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a new todo"
                className="w-full px-4 py-3 rounded-lg bg-gray-900/70 text-white placeholder-gray-400 border-none"
              />
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description (optional)"
                className="w-full px-4 py-3 rounded-lg bg-gray-900/70 text-white placeholder-gray-400 border-none resize-none"
              />
              <Button onClick={addTodo} className="bg-[#ff9800] hover:bg-orange-600 text-white">
                Add
              </Button>
            </div>

            <div className="space-y-3">
              {todos.map((todo: Todo) => (
                <div key={todo._id} className="bg-gray-900/70 p-3 rounded-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <button className="mr-2 text-lg" onClick={() => markAsCompleted(todo._id)}>
                        {todo.completed ? (
                          <CheckCircle className="text-green-400" />
                        ) : (
                          <Circle className="text-gray-400 hover:text-green-400" />
                        )}
                      </button>
                      {editingId === todo._id ? (
                        <input
                          type="text"
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                          className="bg-transparent border-b border-gray-300 text-white focus:outline-none"
                        />
                      ) : (
                        <span className={todo.completed ? "line-through text-gray-400" : ""}>{todo.title}</span>
                      )}
                    </div>
                    <div className="flex items-center">
                      {editingId === todo._id ? (
                        <button
                          className="mr-2 text-green-400 hover:text-green-600"
                          onClick={() => editTodo(todo._id, editedTitle, editedDescription)}
                        >
                          <Save size={18} />
                        </button>
                      ) : (
                        <button
                          className="mr-2 text-blue-400 hover:text-blue-600"
                          onClick={() => {
                            setEditingId(todo._id)
                            setEditedTitle(todo.title)
                            setEditedDescription(todo.description || "")
                          }}
                        >
                          <Edit2 size={18} />
                        </button>
                      )}
                      <button className="mr-2 text-red-400 hover:text-red-600" onClick={() => deleteTodo(todo._id)}>
                        <Trash2 size={18} />
                      </button>
                      <button className="text-gray-400 hover:text-white" onClick={() => toggleTodoExpand(todo._id)}>
                        {expandedTodos[todo._id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Description area that expands/collapses */}
                  {expandedTodos[todo._id] && (
                    <div className="mt-3 pl-8 pr-2 border-t border-gray-700 pt-3">
                      {editingId === todo._id ? (
                        <Textarea
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                          placeholder="Add a description"
                          className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 min-h-[80px] w-full resize-none"
                        />
                      ) : (
                        <p className="text-gray-300 text-sm">{todo.description || "No description provided."}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="col-span-3 h-full">
          <Card className="bg-white/10 backdrop-blur-lg text-white border-none shadow-xl h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-[#ff9800]">User Profile</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center p-6 flex-grow">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-[#ff9800]">
                <Avatar className="w-full h-full">
                  <AvatarImage
                    src={user?.avatar || "/placeholder.svg?height=128&width=128"}
                    alt={user?.name}
                    className="w-full h-full object-cover"
                  />
                  <AvatarFallback className="w-full h-full flex items-center justify-center text-3xl bg-[#ff9800]">
                    {user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <h2 className="text-2xl font-bold mb-2">{user?.name}</h2>
              <p className="text-gray-300 mb-6">{user?.email}</p>
              <div className="bg-gray-900/70 p-4 rounded-md w-full space-y-3">
                <h3 className="text-lg font-semibold mb-4">Additional Info</h3>
                <p className="flex justify-between">
                  <span>Total todos:</span>
                  <span>{todos.length}</span>
                </p>
                <p className="flex justify-between">
                  <span>Completed todos:</span>
                  <span>{todos.filter((todo: Todo) => todo.completed).length}</span>
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="mt-4 text-white bg-red-600 hover:bg-red-700 p-2 rounded-full transition flex items-center space-x-2"
              >
                <PowerOff className="w-5 h-5" />
                <span className="text-sm">Logout</span>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

