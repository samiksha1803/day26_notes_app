import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Show() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
const navigate=useNavigate();

  useEffect(() => {
    axios.get(`https://jsmern-p26-notesapp.onrender.com/notes/${id}`).then(res => setNote(res.data));
  }, [id]);

  if (!note) return <p>Loading...</p>;

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p><strong>Deadline:</strong> {note.deadline ? new Date(note.deadline).toLocaleDateString() : "No deadline"}</p>
<button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
}

export default Show;
