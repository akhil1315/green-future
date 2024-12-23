import React, { useState } from 'react';

const IdeaForm = ({ onIdeaAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newIdea = {
      id: Date.now(), // Unique ID
      title,
      description,
      votes: 0,
      status: 'Pending', // Default status
    };
    onIdeaAdded(newIdea);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default IdeaForm;
