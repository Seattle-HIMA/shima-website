import React, { useState } from "react";

function VideoPreviewModal({ handleModalClose }) {

  return (
    <dialog className="modal">
        <button className="modal-close-btn" onClick={handleModalClose}>
          Close
        </button>
        <h1>Video Title</h1>
        <p>Description:</p>
        <p>bla bla bla</p>
        <button>Pay to watch</button>
    </dialog>
  );
}

export default VideoPreviewModal;