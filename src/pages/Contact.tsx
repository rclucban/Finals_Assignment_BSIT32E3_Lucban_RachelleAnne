import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import ContactModal from "../components/ContactModal";
import "./Contact.css";

type ContactValues = {
  sender: string;
  message: string;
};

const Contact: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactValues>();
  const [modalData, setModalData] = useState<ContactValues | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit: SubmitHandler<ContactValues> = (data) => {
    setModalData(data);
    setIsModalOpen(true);
    reset();
  };

  return (
    <div className="page contact-page">
      <h2>Contact Me</h2>
      <section className="contact-form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
          <div className="form-group">
            <label htmlFor="sender">Sender Name:</label>
            <input
              id="sender"
              {...register("sender", { required: "Name is required" })}
              className={errors.sender ? "error-input" : ""}
            />
            {errors.sender && <span className="error-message">{errors.sender.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              {...register("message", { required: "Message is required" })}
              className={errors.message ? "error-input" : ""}
            />
            {errors.message && <span className="error-message">{errors.message.message}</span>}
          </div>

          <button type="submit" className="btn-submit">Send Message</button>
        </form>
      </section>

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        data={modalData} 
      />
    </div>
  );
};

export default Contact;
