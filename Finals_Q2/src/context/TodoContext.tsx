import React, { createContext, useState, useContext, useEffect, type ReactNode } from "react";
import axios from "axios";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoContextType {
  todos: Todo[];
  loading: boolean;
  fetchTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  toggleTodo: (id: string, completed: boolean) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  updateTodo: (id: string, title: string) => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const API_URL = "http://localhost:5000/api/todos"; // Adjust port if necessary

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title: string) => {
    try {
      const response = await axios.post(API_URL, { title, completed: false });
      if (response.status === 201) {
        // Fix for Technical Debt #1: Property mismatch fix (ensure using id)
        // Correct implementation: Update state with the new list or append the item correctly
        await fetchTodos(); 
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;
      
      const response = await axios.put(`${API_URL}/${id}`, { ...todo, completed: !completed });
      if (response.status === 204) {
        // Fix for Technical Debt #2: Use map instead of filter for updates
        setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !completed } : t));
      }
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      if (response.status === 204) {
        // Fix for Technical Debt #1 (conceptual): filter by id, not title
        setTodos(prev => prev.filter(t => t.id !== id));
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const updateTodo = async (id: string, title: string) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;
      
      const response = await axios.put(`${API_URL}/${id}`, { ...todo, title });
      if (response.status === 204) {
        setTodos(prev => prev.map(t => t.id === id ? { ...t, title } : t));
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider value={{ todos, loading, fetchTodos, addTodo, toggleTodo, deleteTodo, updateTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
};
