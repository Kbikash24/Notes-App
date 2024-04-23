import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import './EditNotes.css';

import { useDispatch } from 'react-redux';
import { edit } from '../../Redux/notesSlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditNotes = ({ open, onClose, selectedNote }) => {
  const dispatch = useDispatch();
  
  // Initialize title and content with selectedNote values, or empty strings if selectedNote is undefined
  const [title, setTitle] = useState(selectedNote?.title || '');
  const [content, setContent] = useState(selectedNote?.notes || '');

  // Update title and content when selectedNote changes
  useEffect(() => {
    setTitle(selectedNote?.title || '');
    setContent(selectedNote?.notes || '');
  }, [selectedNote]);

  const handleSave = () => {
    dispatch(edit({
      id: selectedNote?.id,
      title: title,
      notes: content,
    }));
    onClose();
  };

  return (
    <Modal
      title="Edit Note"
      visible={open} // Use visible instead of open for Modal component
      onCancel={onClose}
      footer={[
        <button key="save" onClick={handleSave}>Save</button>,
      ]}
    >
      <input
        className="input"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      
      <ReactQuill
        theme="snow"
        className="textarea"
        value={content}
        onChange={setContent}
      />
    </Modal>
  );
};

export default EditNotes;
