import React from 'react';

const IdeaCard = ({ idea, onAction }) => {
  const handleApprove = () => onAction(idea.id, 'approve');
  const handleReject = () => onAction(idea.id, 'reject');

  return (
    <div className="idea-card">
      <h3>{idea.title}</h3>
      <p>{idea.description}</p>
      <div className="status">
        <strong>Status:</strong>{' '}
        <span
          className={`status-label ${
            idea.status === 'Approved'
              ? 'approved'
              : idea.status === 'Rejected'
              ? 'rejected'
              : 'pending'
          }`}
        >
          {idea.status || 'Pending'}
        </span>
      </div>
      <div className="action-buttons">
        <button onClick={handleApprove} disabled={idea.status !== 'Pending'}>
          Approve
        </button>
        <button onClick={handleReject} disabled={idea.status !== 'Pending'}>
          Reject
        </button>
      </div>
    </div>
  );
};

export default IdeaCard;
