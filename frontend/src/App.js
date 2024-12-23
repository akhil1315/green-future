import React, { useState, useEffect } from 'react';
import IdeaForm from './components/IdeaForm';
import IdeaList from './components/IdeaList';
import './App.css';

const App = () => {
  const [ideas, setIdeas] = useState([]);

  // Load ideas from local storage
  useEffect(() => {
    const storedIdeas = JSON.parse(localStorage.getItem('ideas')) || [];
    setIdeas(storedIdeas);
  }, []);

  // Save ideas to local storage
  useEffect(() => {
    localStorage.setItem('ideas', JSON.stringify(ideas));
  }, [ideas]);

  // Add a new idea
  const handleIdeaAdded = (newIdea) => {
    setIdeas([...ideas, newIdea]);
  };

  // Vote or reject an idea
  const handleAction = (id, action) => {
    setIdeas(
      ideas.map((idea) =>
        idea.id === id
          ? {
              ...idea,
              status: action === 'approve' ? 'Approved' : 'Rejected',
            }
          : idea
      )
    );
  };

  return (
    <div className="app-container">
      <h1>Idea Management System</h1>
      <IdeaForm onIdeaAdded={handleIdeaAdded} />
      <IdeaList ideas={ideas} onAction={handleAction} />
    </div>
  );
};

export default App;
