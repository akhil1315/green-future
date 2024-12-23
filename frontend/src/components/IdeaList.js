import React from 'react';
import IdeaCard from './IdeaCard';

const IdeaList = ({ ideas, onAction }) => (
  <div className="idea-list">
    {ideas.map((idea) => (
      <IdeaCard key={idea.id} idea={idea} onAction={onAction} />
    ))}
  </div>
);

export default IdeaList;
