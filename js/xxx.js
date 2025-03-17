// NoteTaking.js - A simple note-taking application using Node.js

const fs = require('fs');

class NoteTaking {
  constructor(filename = 'notes.json') {
    this.filename = filename;
    this.notes = [];
    
    // Create the notes file if it doesn't exist
    try {
      if (!fs.existsSync(this.filename)) {
        fs.writeFileSync(this.filename, JSON.stringify([], null, 2));
        console.log(`Created new notes file: ${this.filename}`);
      } else {
        // Load existing notes
        this.loadNotes();
      }
    } catch (error) {
      console.error('Error initializing NoteTaking:', error);
    }
  }

  // Load notes from the file
  loadNotes() {
    try {
      const data = fs.readFileSync(this.filename, 'utf8');
      this.notes = JSON.parse(data);
      console.log(`Loaded ${this.notes.length} notes from ${this.filename}`);
    } catch (error) {
      console.error('Error loading notes:', error);
      this.notes = [];
    }
  }

  // Save notes to the file
  saveNotes() {
    try {
      fs.writeFileSync(this.filename, JSON.stringify(this.notes, null, 2));
      console.log(`Saved ${this.notes.length} notes to ${this.filename}`);
      return true;
    } catch (error) {
      console.error('Error saving notes:', error);
      return false;
    }
  }

  // Add a new note
  addNote(title, content) {
    const newNote = {
      id: Date.now().toString(), // Use timestamp as a simple unique ID
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.notes.push(newNote);
    this.saveNotes();
    return newNote;
  }

  // Get all notes
  getAllNotes() {
    return this.notes;
  }

  // Get a specific note by ID
  getNoteById(id) {
    return this.notes.find(note => note.id === id) || null;
  }

  // Update an existing note
  updateNote(id, updates) {
    const noteIndex = this.notes.findIndex(note => note.id === id);
    
    if (noteIndex === -1) {
      console.log(`Note with ID ${id} not found`);
      return null;
    }
    
    // Update the note
    this.notes[noteIndex] = {
      ...this.notes[noteIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    this.saveNotes();
    return this.notes[noteIndex];
  }

  // Delete a note
  deleteNote(id) {
    const initialLength = this.notes.length;
    this.notes = this.notes.filter(note => note.id !== id);
    
    if (this.notes.length < initialLength) {
      this.saveNotes();
      return true;
    } else {
      console.log(`Note with ID ${id} not found`);
      return false;
    }
  }

  // Search notes by title or content
  searchNotes(query) {
    query = query.toLowerCase();
    return this.notes.filter(note => 
      note.title.toLowerCase().includes(query) || 
      note.content.toLowerCase().includes(query)
    );
  }
}

// Export the class for use in other files
module.exports = NoteTaking;

// Example usage if run directly
if (require.main === module) {
  const noteApp = new NoteTaking();
  
  // Example: Add a new note
  const newNote = noteApp.addNote(
    'My First Note', 
    'This is the content of my first note.'
  );
  
  console.log('Added Note:', newNote);
  
  // Example: List all notes
  console.log('All Notes:', noteApp.getAllNotes());
}