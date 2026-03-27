import React, { useState } from "react";
import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList";
import EditTodoModal from "../components/EditTodoModal";
import { type Todo } from "../context/TodoContext";

const TodoPage: React.FC = () => {
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setIsEditModalOpen(true);
  };

  return (
    <div className="todo-page">
      <h2>Todo Management System</h2>
      <AddTodoForm />
      <TodoList onEdit={handleEdit} />
      <EditTodoModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        todo={editingTodo} 
      />
    </div>
  );
};

export default TodoPage;
