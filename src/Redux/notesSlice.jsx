import { createSlice } from '@reduxjs/toolkit';
import { fetchFromLocalStorage, storeInLocalStorage } from '../components/utlis/setLocalStorage';

const initialState = {
  notes: fetchFromLocalStorage('notes') || [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    add: (state, action) => {
      const { title, notes, noteId,image, date } = action.payload;
      state.notes.push({ id: noteId, title, notes,image, date });
      storeInLocalStorage('notes', state.notes);
    },
    edit: (state, action) => {
      const { id, title, notes } = action.payload;
      const noteIndex = state.notes.findIndex(note => note.id === id);
      if (noteIndex !== -1) {
        state.notes[noteIndex].title = title;
        state.notes[noteIndex].notes = notes;
        storeInLocalStorage('notes', state.notes);
      }
    },
    
   
    deleteNote: (state, action) => {
      const idToDelete = action.payload;
      state.notes = state.notes.filter(note => note.id !== idToDelete);
      storeInLocalStorage('notes', state.notes);
    },
  },
});

export const { add, edit, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
