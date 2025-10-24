import axios from "axios";

const API_BASE = "http://localhost:5000/api/notes"; // your backend endpoint

export const getNotes = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const getNoteById = async (id) => {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
};

export const createNote = async (data) => {
  const res = await axios.post(API_BASE, data);
  return res.data;
};

export const updateNote = async (id, data) => {
  const res = await axios.put(`${API_BASE}/${id}`, data);
  return res.data;
};

export const deleteNote = async (id) => {
  const res = await axios.delete(`${API_BASE}/${id}`);
  return res.data;
};

export const summarizeNote = async (id) => {
  const res = await axios.post(`${API_BASE}/${id}/summarize`);
  return res.data;
};
