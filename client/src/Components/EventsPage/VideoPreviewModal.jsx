import React from "react";
import './VideoPreviewModal.css';

function VideoPreviewModal({ video, onClose }) {
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

let nonMem;
let mem;

const statusCheck = async (res) => {
  if (!res.ok) {
      throw new Error(await res.text());
  }
  return res;
}

const videosId = async () => {
  try {
      let res = await fetch("routes/payment/get-product-id");
      await statusCheck(res);
      let info = await res.json();
      nonMem = info['vid1NonMem'];
      mem = info['vid1Mem'];
  } catch (err) {
      console.log(err);
  }
}

await videosId();

function VideoPreviewModal() {
  const {user, isLoading, isAuthenticated} = useAuth0();

  const payVideo = async () => {
    const isMem = true;
    let id;
    if (isMem) {
      id = mem;
    }

    try {
        let response = await fetch("/routes/payment/workshop-checkout-session", {
            method: "POST",
            body: JSON.stringify({
                id: id,
                vid: "video name",
                email: user.email}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        response = await response.json();
        window.location.href = response.url;
    } catch (error) {
        console.error("Error", error);
    }
  }

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
    <div className="modal">
        <button className="modal-close-btn" >
          Close
        </button>
        <h1>Video Title</h1>
        <p>Description:</p>
        <p>bla bla bla</p>
        <button onClick={payVideo}>Pay to watch</button>
    </div>
  );
}

export default VideoPreviewModal;