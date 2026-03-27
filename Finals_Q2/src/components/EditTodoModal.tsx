import React from "react";
import { useForm } from "react-hook-form";
import { type Todo } from "../context/TodoContext";
import { useTodos } from "../hooks/useTodos";

interface EditTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  todo: Todo | null;
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({ isOpen, onClose, todo }) => {
  const { register, handleSubmit } = useForm<{ title: string }>();
  const { updateTodo } = useTodos();

  if (!isOpen || !todo) return null;

  const onSubmit = async (data: { title: string }) => {
    await updateTodo(todo.id, data.title);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit Todo</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input 
            {...register("title", { required: true })} 
            defaultValue={todo.title}
            className="todo-input"
          />
          <div className="modal-buttons">
            <button type="submit" className="btn-save">Save</button>
            <button type="button" onClick={onClose} className="btn-cancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTodoModal;
