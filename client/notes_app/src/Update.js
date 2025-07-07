import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "", deadline: "" });

  useEffect(() => {
    axios.get(`https://jsmern-p26-notesapp.onrender.com/notes/${id}`).then(res => {
      const { title, content, deadline } = res.data;
      setForm({ title, content, deadline: deadline ? deadline.split("T")[0] : "" });
    });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://jsmern-p26-notesapp.onrender.com/notes/${id}`, form).then(() => {
      alert("Note updated successfully!");
      navigate("/");
    });
  };

  return (
    <div>
      <h2>Edit Note</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={form.title} onChange={handleChange} required />
        <br />
        <textarea name="content" value={form.content} onChange={handleChange} required />
        <br />
        <label>
          Deadline:{" "}
          <input type="date" name="deadline" value={form.deadline} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default Update;
