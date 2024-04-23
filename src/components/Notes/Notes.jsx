import React from "react";
import "./Notes.css";

const Notes = ({ title, date,handleEdit,handleDelete,onClick}) => {

  return (
    <div>
      <div className="note-box">
        <div className="view"> <img src="/eye.png" alt="" onClick={onClick} /></div>
       
        <p className="title">{title}</p>
        
        <div className="date">
          <p>{date}</p>
        </div>
        <div className="bottom-buttons">
          <img src="/edit.png" alt="" onClick={handleEdit} />
          <img src="/delete.png" alt="" onClick={handleDelete}/>
        </div>
      </div>
    </div>
  );
};

export default Notes;
