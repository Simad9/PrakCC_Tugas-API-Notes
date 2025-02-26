import { useState, useEffect } from "react";
import axios from "axios";

function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/notes");
        setNotes(response.data.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, []);

  const addNote = async () => {
    if (!title.trim() || !content.trim()) return;

    try {
      const response = await axios.post("http://localhost:5000/add-note", { title, content });
      if (response.data.data) {
        setNotes((prevNotes) => [...prevNotes, response.data.data]);
        setTitle("");
        setContent("");
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete-note/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const toggleEditMode = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, isEditing: !note.isEditing } : note
      )
    );
  };

  const handleInputChange = (id, field, value) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, [field]: value } : note
      )
    );
  };

  const saveNote = async (id, newTitle, newContent) => {
    if (!newTitle.trim() || !newContent.trim()) return;

    try {
      const response = await axios.put(`http://localhost:5000/update-note/${id}`, { title: newTitle, content: newContent });
      if (response.data.data) {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === id ? { ...response.data.data, isEditing: false } : note
          )
        );
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-2xl w-full mx-auto p-8 bg-white shadow rounded-lg flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center mb-4">Notes App</h1>
        <div className="bg-white p-4 shadow rounded-lg mb-4 w-full">
          <input
            className="w-full p-2 border rounded mb-2"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full p-2 border rounded mb-2"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button
            className="w-full bg-blue-500 text-white p-2 rounded"
            onClick={addNote}
          >
            Add Note
          </button>
        </div>
        <div className="space-y-4 w-full">
          {Array.isArray(notes) && notes.length > 0 ? (
            notes.map((note) => (
              <div key={note.id} className="bg-white p-4 shadow rounded-lg w-full flex flex-col items-center">
                {note.isEditing ? (
                  <>
                    <input
                      className="w-full p-2 border rounded mb-2"
                      type="text"
                      value={note.title}
                      onChange={(e) => handleInputChange(note.id, "title", e.target.value)}
                    />
                    <textarea
                      className="w-full p-2 border rounded mb-2"
                      value={note.content}
                      onChange={(e) => handleInputChange(note.id, "content", e.target.value)}
                    ></textarea>
                    <button
                      className="bg-green-500 text-white p-2 rounded mt-2 w-full"
                      onClick={() => { saveNote(note.id, note.title, note.content); toggleEditMode(note.id); }}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-center">{note.title}</h2>
                    <p className="text-gray-700 text-center">{note.content}</p>
                  </>
                )}
                <div className="flex gap-2 mt-2 w-full">
                  <button
                    className="bg-yellow-500 text-white p-2 rounded flex-1"
                    onClick={() => toggleEditMode(note.id)}
                  >
                    {note.isEditing ? "Cancel" : "Edit"}
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded flex-1"
                    onClick={() => deleteNote(note.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No notes available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotesApp;
