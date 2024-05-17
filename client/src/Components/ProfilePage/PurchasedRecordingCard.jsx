import React from 'react';
import './PurchasedRecordingCard.css';

function PurchasedRecordingCard({workshop}) {
    return (
        <div className="workshop-card">
            <h4 className="workshop-title">{workshop.name}</h4>
            <p className="workshop-description">{workshop.description}</p>
            <p className="workshop-detail"><strong>Speaker:</strong> {workshop.speaker}</p>
            <p className="workshop-detail"><strong>Date:</strong> {new Date(workshop.date).toLocaleDateString()}</p>
            <a href={workshop.recordLink} target="_blank" rel="noopener noreferrer" className="workshop-link">Recording
                Link</a>
        </div>
    );
}

export default PurchasedRecordingCard;
