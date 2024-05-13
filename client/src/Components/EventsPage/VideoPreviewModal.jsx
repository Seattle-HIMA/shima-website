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