import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Create() {
  const [form, setForm] = useState({ title: "", content: "", deadline: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://jsmern-p26-notesapp.onrender.com/notes", form).then(() => {
      alert("Note created successfully!");
      navigate("/");
    });
  };

  return (
    <div>
      <h2>Add New Note</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} required />
        <br />
        <textarea name="content" placeholder="Content" onChange={handleChange} required />
        <br />
        <label>
          Deadline:{" "}
          <input type="date" name="deadline" value={form.deadline} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Create;
