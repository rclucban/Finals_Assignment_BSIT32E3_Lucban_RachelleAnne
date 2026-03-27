import React from "react";
import "./ContactModal.css";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: { sender: string; message: string } | null;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Message Sent Successfully!</h3>
        <p><strong>From:</strong> {data.sender}</p>
        <p><strong>Message:</strong> {data.message}</p>
        <button onClick={onClose} className="btn-close">Close</button>
      </div>
    </div>
  );
};

export default ContactModal;
