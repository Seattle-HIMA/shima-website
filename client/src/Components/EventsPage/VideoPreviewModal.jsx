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

const videosId = async (user) => {
  try {
      let res = await fetch("routes/payment/get-product-id");
      await statusCheck(res);
      priceId = await res.json();
  } catch (err) {
      console.log(err);
  }
}

await videosId();

function VideoPreviewModal({ video, onClose }) {
  const {user, isLoading, isAuthenticated} = useAuth0();

  console.log(user);
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
                vid: "123",
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
                <img src={"http://img.youtube.com/vi/hdIYBmOpugA/mqdefault.jpg"} alt="Video Thumbnail"/>
            </div>
            <div className="workshop-video-description">
                <p>{video.description}</p>
            </div>
            <div className="workshop-video-link">
                <a className={"hidden"} href={`https://${video.link}`} target="_blank" rel="noopener noreferrer">Watch Video</a>
            </div>
            <button onClick={payVideo}>Pay to watch</button>
        </div>
    </div>
  );
}

export default VideoPreviewModal;