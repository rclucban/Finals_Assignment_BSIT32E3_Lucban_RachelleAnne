import React from "react";
import { useForm } from "react-hook-form";
import { useTodos } from "../hooks/useTodos";

const AddTodoForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<{ title: string }>();
  const { addTodo } = useTodos();

  const onSubmit = async (data: { title: string }) => {
    await addTodo(data.title);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-todo-form">
      <input 
        {...register("title", { required: true })} 
        placeholder="Add a new task..." 
        className="todo-input"
      />
      <button type="submit" className="btn-add">Add</button>
    </form>
  );
};

export default AddTodoForm;
