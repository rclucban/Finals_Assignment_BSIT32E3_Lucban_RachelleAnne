import React from "react";
import { useTodos } from "../hooks/useTodos";
import TodoItem from "./TodoItem";
import { type Todo } from "../context/TodoContext";

interface TodoListProps {
  onEdit: (todo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({ onEdit }) => {
  const { todos, loading } = useTodos();

  if (loading) return <p>Loading todos...</p>;
  if (todos.length === 0) return <p>No tasks yet.</p>;

  return (
    <ul className="todo-list">
      {/* Fix for Technical Debt #3: Use unique ID instead of index as key */}
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onEdit={onEdit} />
      ))}
    </ul>
  );
};

export default TodoList;
