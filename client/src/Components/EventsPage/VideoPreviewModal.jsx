import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './VideoPreviewModal.css';
import { checkMembership, getProductsId, statusCheck } from "../../utils/utils";

let priceId = await getProductsId();

function VideoPreviewModal({ video, onClose, paid }) {
  const {user, isLoading, isAuthenticated} = useAuth0();
  const xButton = require(`../../utils/images/board-members/close-popup.png`);

  let thumbnail = video.recordLink.split('/');
  thumbnail = thumbnail[thumbnail.length - 1];

  const payVideo = async () => {
    try {
        let id = await checkMembership(user.email);
        let vidId;
        if (id === "none") {
          vidId = priceId["vid1NonMem"];
        } else {
          vidId = priceId["vid1Mem"];
        }

        let response = await fetch("/routes/payment/workshop-checkout-session", {
            method: "POST",
            body: JSON.stringify({
                id: vidId,
                vid: video._id,
                email: user.email,
                workshopType: 'past'}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        await statusCheck(response);
        response = await response.json();
        window.location.href = response.url;

    } catch (error) {
        console.error("Error", error);
    }
  }

  const playVideo = () => {
    window.location.href = video.recordLink;
  }

  const setBtnText = () => {
    return <button className="recording-btn" onClick={() => {
      !paid ? payVideo() : playVideo();
    }}>{!paid ? "Unlock Video" : "Watch Video"}</button>
  }

  const makeThumbnail = () => {
    if(!paid) {
      return <img src={`http://img.youtube.com/vi/${thumbnail}/mqdefault.jpg`} className="locked" alt="Video Thumbnail"/>
    } else {
      return <img src={`http://img.youtube.com/vi/${thumbnail}/mqdefault.jpg`} alt="Video Thumbnail"/>
    }
  }

  return (
    <div className="video-preview-modal">
        <div className="video-modal-content">
        <img className="video-model-close-button" src={xButton} alt="x button"
                                    onClick={onClose}></img>
            <h2>{video.name}</h2>
            <div className="workshop-video-description">
                <p>{video.description}</p>
            </div>
            <div className="workshop-video-thumbnail">
                {makeThumbnail()}
            </div>
            {setBtnText()}
        </div>
    </div>
  );
}

export default VideoPreviewModal;