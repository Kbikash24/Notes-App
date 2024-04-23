import React, { useState } from "react";
import { Modal } from "antd";
import "./CreateNotes.css";
import { useDispatch } from "react-redux";
import { add } from "../../Redux/notesSlice";
import { format } from "date-fns";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaImage } from "react-icons/fa6";

const CreateNotes = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Save the base64 string of the uploaded image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const newNote = {
      noteId: Date.now(), // Generating a unique id for the note
      title: title,
      notes: content,
      image: image, // Include the image in the note object
      date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    };
    dispatch(add(newNote)); // Dispatching the add action with the new note
    setTitle("");
    setContent("");
    setImage(null); // Reset the image state
    onClose(); // Closing the modal after saving
  };

  return (
    <Modal
      title="Create Note"
      visible={visible} // Corrected prop name
      onCancel={onClose} // Corrected prop name
      footer={null}
    >
      {/* Your content for creating notes goes here */}
      <input
        className="input"
        type="text"
        placeholder="Write the title here"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="form-group col-md-12 editor">
        <label className="font-weight-bold">
          {" "}
          Description <span className="required"> * </span>{" "}
        </label>

        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder={"Write something awesome..."}
        />
        {/* Image upload */}
        <input
          type="file"
          id="pic-upload"
          hidden
          onChange={handleImageUpload}
        />
        <label htmlFor="pic-upload">
          <FaImage className="relative top-9" size={25} color="#0785F4" />
        </label>
        {/* Display the uploaded image preview */}
        {image && <img src={image} alt="Uploaded"  className="view-image"/>}
      </div>

      <div className="save">
        <button onClick={handleSave}>Save</button>
      </div>
    </Modal>
  );
};

export default CreateNotes;
