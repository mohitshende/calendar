import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

type CreateSessionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type SessionData = {
  title: string;
  description: string;
  scheduled_date: string;
  start_time: string;
  end_time: string;
};

const CreateSessionModal: React.FC<CreateSessionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [session, setSession] = useState<SessionData>({
    title: "",
    description: "",
    scheduled_date: "",
    start_time: "",
    end_time: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSession((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    console.log(session)
    try {
      const response = await fetch("http://localhost:8000/session/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(session),
      });
      if (!response.ok) {
        throw new Error("Failed to create session");
      }
      onClose();
    } catch (error) {
      console.error("Error creating session", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 998,
          }}
        />
        <Dialog.Content
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "400px",
            zIndex: 999,
          }}
        >
          <Dialog.Title style={{ fontSize: "18px", fontWeight: "bold" }}>
            Create Session
          </Dialog.Title>
          <div style={{ marginTop: "16px" }}>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={session.title}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "4px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginTop: "12px" }}>
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={session.description}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "4px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginTop: "12px" }}>
            <label>Scheduled Date</label>
            <input
              type="date"
              name="scheduled_date"
              value={session.scheduled_date}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "4px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginTop: "12px" }}>
            <label>Start Time</label>
            <input
              type="time"
              name="start_time"
              value={session.start_time}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "4px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginTop: "12px" }}>
            <label>End Time</label>
            <input
              type="time"
              name="end_time"
              value={session.end_time}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "4px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div
            style={{
              marginTop: "16px",
              display: "flex",
              justifyContent: "flex-end",
              gap: "8px",
            }}
          >
            <button
              onClick={onClose}
              disabled={loading}
              style={{
                padding: "8px 16px",
                border: "none",
                backgroundColor: "#ccc",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                padding: "8px 16px",
                border: "none",
                backgroundColor: "#007bff",
                color: "white",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateSessionModal;
