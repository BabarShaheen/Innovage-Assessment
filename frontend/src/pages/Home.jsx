import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import { getNotes, deleteNote } from "../services/api";

export default function Home() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await getNotes();
    setNotes(res);
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Notes</h2>

      {notes.length === 0 ? (
        <p className="text-gray-600">No notes yet. Create one!</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
