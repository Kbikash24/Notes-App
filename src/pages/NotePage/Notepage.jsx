import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './NotePage.css'

const Notepage = () => {
  const { id } = useParams(); // Extract the ID from the URL
  const notes = useSelector(state => state.notes.notes); // Access notes from Redux state
  const [note, setNote] = useState(null); // State to store the selected note

  // Fetch the note data based on the ID
  useEffect(() => {
    console.log("ID:", id, typeof id);
    console.log("Notes:", notes);
    const selectedNote = notes.find(note => {
      console.log("Note ID:", note.id, typeof note.id);
      return note.id == id;
    });
    console.log("Selected Note:", selectedNote);
    setNote(selectedNote);
  }, [id, notes]);
  

  if (!note) {
    return <div>Note not found</div>;
  }

  return (
    <div className='container-2'><div className='notepage'>
    <p> {note.date}</p>
    <h2>{note.title}</h2>
    <div className='notes' dangerouslySetInnerHTML={{ __html:note.notes}} />
    
    <img src={note.image}/>
   
  </div></div>
    
  );
};

export default Notepage;
