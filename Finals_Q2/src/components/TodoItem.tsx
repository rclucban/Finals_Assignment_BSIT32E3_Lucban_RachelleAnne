import React from "react";
import { type Todo } from "../context/TodoContext";
import { useTodos } from "../hooks/useTodos";

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit }) => {
  const { toggleTodo, deleteTodo } = useTodos();

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <span onClick={() => toggleTodo(todo.id, todo.completed)} className="todo-title">
        {todo.title}
      </span>
      <div className="todo-actions">
        <button onClick={() => onEdit(todo)} className="btn-edit">Edit</button>
        <button onClick={() => deleteTodo(todo.id)} className="btn-delete">Delete</button>
      </div>
    </li>
  );
};

export default TodoItem;
