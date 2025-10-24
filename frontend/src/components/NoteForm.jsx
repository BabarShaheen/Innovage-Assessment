import { useState } from "react";

export default function NoteForm({ initialData = {}, onSubmit, loading }) {
  const [form, setForm] = useState({
    title: initialData.title || "",
    content: initialData.content || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 space-y-4"
    >
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter note title"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          Content
        </label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          rows="6"
          placeholder="Write your note here..."
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        {loading ? "Saving..." : "Save Note"}
      </button>
    </form>
  );
}
