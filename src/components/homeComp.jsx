import React, { useState } from "react";
import './homeComp.css';
import Notes from "./Notes/Notes";
import CreateNotes from "./CreateNotes/CreateNotes";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote } from '../Redux/notesSlice';
import EditNotes from "./EditNotes/EditNotes";
import { useNavigate } from "react-router-dom"; 
const HomeComp = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const notes = useSelector(state => state.notes.notes); 
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [sortOption, setSortOption] = useState('');

  // Handle opening the CreateNotes modal for editing a note
  const handleEdit = (id) => {
    const clickedNote = notes.find(note => note.id === id);
    setSelectedNote(clickedNote); // Set the selected note
    setShowEditModal(true); // Open the EditNotes modal
  };

  // Handle adding functionality
  const handleAdd = () => {
    setSelectedNote(null); //
    setShowCreateModal(true); 
  };

 
  const handleCloseModal = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
  };

  // Handle deleting a note
  const handleDelete = (id) => {
    
    dispatch(deleteNote(id));
  };

  // Filter notes based on search query
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.notes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort notes based on the selected sorting option
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortOption === 'name') {
      return a.title.localeCompare(b.title);
    } else if (sortOption === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else {
      return 0;
    }
  });

  return (
    <div className="home">
      <div className="top">
        <p>Note Book</p>
        <div className="top-buttons">
          <input
            placeholder="Search Notes here.."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          {/* Sorting Button */}
          <select onChange={(e) => setSortOption(e.target.value)}>
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="date">Date</option>
            {/* Add more sorting options if needed */}
          </select>
          
        </div>
      </div>

      {/* Content Area */}
      <div className="notes-container">
        {sortedNotes.length > 0 ? (
          sortedNotes.map((note) => (
            <div key={note.id} > {/* Move onClick event to outer div */}
              <Notes
                id={note.id}
                title={note.title}
                notes={note.notes}
                date={note.date}
                handleEdit={() => handleEdit(note.id)}
                handleDelete={() => handleDelete(note.id)}
                onClick={() => navigate(`/notes/${note.id}`)}
              />
            </div>
          ))
        ) : (
          <p>No notes found.</p>
        )}
      </div>

      {/* Floating Add Button */}
      <div className="add" onClick={handleAdd}>
        <img src="\add.png" alt="" />
      </div>

      {/* CreateNotes Modal */}
      <CreateNotes
        visible={showCreateModal}
        onClose={handleCloseModal}
      />

      {/* EditNotes Modal */}
      <EditNotes
        open={showEditModal} // Corrected prop name
        onClose={handleCloseModal}
        selectedNote={selectedNote}
      />
    </div>
  );
};

export default HomeComp;
