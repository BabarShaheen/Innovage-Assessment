import { Link } from "react-router-dom";

export default function NoteCard({ note, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{note.title}</h2>
      <p className="text-gray-600 mb-4 line-clamp-3">{note.content}</p>

      <div className="flex justify-between items-center">
        <Link
          to={`/edit/${note._id}`}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(note._id)}
          className="text-sm text-red-600 hover:text-red-800 font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
