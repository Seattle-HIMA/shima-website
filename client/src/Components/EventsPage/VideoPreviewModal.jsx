import React from "react";

function VideoPreviewModal({ video, onClose }) {

  return (
      <div className="video-preview-modal">
          <div className="video-modal-content">
              <button className="video-model-close-button" onClick={onClose}>Close</button>
              <h2>{video.title}</h2>
              <div className="workshop-video-thumbnail">
                  <img src={video.thumbnail} alt="Video Thumbnail"/>
              </div>
              <div className="workshop-video-description">
                  <p>{video.description}</p>
              </div>
              <div className="workshop-video-link">
                  <a href={`https://${video.link}`} target="_blank" rel="noopener noreferrer">Watch Video</a>
              </div>
          </div>
      </div>
  );
}

export default VideoPreviewModal;