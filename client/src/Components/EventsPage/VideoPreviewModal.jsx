import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './VideoPreviewModal.css';

let priceId;

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
      priceId = await res.json();
  } catch (err) {
      console.log(err);
  }
}

await videosId();

function VideoPreviewModal({ video, onClose, paid }) {
  const {user, isLoading, isAuthenticated} = useAuth0();

  let thumbnail = video.recordLink.split('/');
  thumbnail = thumbnail[thumbnail.length - 1];

  const checkMembership = async () => {
    try {
      //check if member
      let res = await fetch("routes/users/get-membership-type", {
        method: "POST",
        body: JSON.stringify({
            email: user.email}),
        headers: {
            "Content-Type": "application/json"
        }
      });
      await statusCheck(res);
      let membership = await res.json();

      if (membership.membership === "none") {
        return priceId["vid1NonMem"];
      } else {
        return priceId["vid1Mem"];
      }
    } catch(err) {
      console.error(err);
    }
  }

  const payVideo = async () => {
    try {
        let id = await checkMembership();
        let response = await fetch("/routes/payment/workshop-checkout-session", {
            method: "POST",
            body: JSON.stringify({
                id: id,
                vid: video._id,
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

  const playVideo = () => {
    window.location.href = video.recordLink;
  }

  const setBtnText = () => {
    if(!paid) {
      return <button onClick={payVideo}>Pay to watch</button>
    } else {
      return <button onClick={playVideo}>Watch video</button>
    }
  }

  return (
    <div className="video-preview-modal">
        <div className="video-modal-content">
            <button className="video-model-close-button" onClick={onClose}>Close</button>
            <h2>{video.name}</h2>
            <div className="workshop-video-thumbnail">
                <img src={`http://img.youtube.com/vi/${thumbnail}/mqdefault.jpg`} alt="Video Thumbnail"/>
            </div>
            <div className="workshop-video-description">
                <p>{video.description}</p>
            </div>
            <div className="workshop-video-link">
                <a className={"hidden"} href={`https://${video.recordLink}`} target="_blank" rel="noopener noreferrer">Watch Video</a>
            </div>
            {setBtnText()}
        </div>
    </div>
  );
}

export default VideoPreviewModal;