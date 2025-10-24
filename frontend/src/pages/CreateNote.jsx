import { useState } from "react";
import NoteForm from "../components/NoteForm";
import { createNote } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateNote() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    await createNote(data);
    setLoading(false);
    navigate("/");
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Create New Note</h2>
      <NoteForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
