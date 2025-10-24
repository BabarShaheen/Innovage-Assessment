import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoteForm from "../components/NoteForm";
import { getNoteById, updateNote, summarizeNote } from "../services/api";

export default function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");

  useEffect(() => {
    getNoteById(id).then(setNote);
  }, [id]);

  const handleSubmit = async (data) => {
    setLoading(true);
    await updateNote(id, data);
    setLoading(false);
    navigate("/");
  };

  const handleSummarize = async () => {
    setLoading(true);
    const result = await summarizeNote(id);
    setSummary(result.summary);
    setLoading(false);
  };

  if (!note) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Edit Note</h2>
      <NoteForm initialData={note} onSubmit={handleSubmit} loading={loading} />

      <div className="mt-6">
        <button
          onClick={handleSummarize}
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
        >
          {loading ? "Summarizing..." : "Generate AI Summary"}
        </button>

        {summary && (
          <div className="mt-4 bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-gray-800 mb-2">AI Summary</h3>
            <p className="text-gray-700">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}
