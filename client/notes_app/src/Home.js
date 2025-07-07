import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get("https://jsmern-p26-notesapp.onrender.com/notes").then(res => setNotes(res.data));
  }, []);

  const deleteNote = (id) => {
    axios.delete(`https://jsmern-p26-notesapp.onrender.com/notes/${id}`).then(() => {
      setNotes(notes.filter(note => note._id !== id));
      alert("Note deleted successfully!");
    });
  };

  return (
    <div>
      <h2>All Notes</h2>
      {notes.map(note => (
        <div key={note._id} className="note-card">
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <p><strong>Deadline:</strong> {note.deadline ? new Date(note.deadline).toLocaleDateString() : "No deadline"}</p>
          <Link to={`/show/${note._id}`}>View</Link>{" | "}
          <Link to={`/update/${note._id}`}>Edit</Link>{" | "}
          <button onClick={() => deleteNote(note._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Home;
