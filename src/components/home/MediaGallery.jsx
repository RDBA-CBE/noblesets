import React from "react";

const videos = [
  {
    url: "https://www.youtube.com/watch?v=gKG6G_WAfzg",
    thumb: "/assets/img/home/media/video1.png", // replace with real thumbnail paths if needed
    title: "Lorem ipsum dolor sit consectetur adipiscing elit sed eiusmod tempor incididunt ut labore"
  },
  {
    url: "https://www.youtube.com/watch?v=QYLVneoDeMA",
    thumb: "/assets/img//home/media/video2.png",
    title: "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim"
  },
  {
    url: "https://www.youtube.com/watch?v=UQ9N-A_YClQ",
    thumb: "/assets/img/home/media/video3.png",
    title: "Duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  },
  {
    url: "https://www.youtube.com/watch?v=QG4q2q9p9v0",
    thumb: "/assets/img/home/media/video4.png",
    title: "Ut enim ad minim veniam, quis nostrud quis exercitation ullamco laboris nisi ut aliquip"
  }
];

export default function MediaSection() {
  return (
    <div style={{ fontFamily: "serif", paddingBottom: "40px" }}>
      {/* Section Heading */}
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <p style={{ fontSize: "14px", color: "#8b6f48" }}>✦ In the Spotlight</p>
        <h1 style={{ fontSize: "36px", color: "#5c3b26", marginTop: "-4px" }}>Media</h1>
      </div>

      {/* Hero Video Section */}
      <div style={{ width: "100%", margin: "40px auto", textAlign: "center" }}>
        <div
          style={{
            width: "90%",
            margin: "0 auto",
            borderRadius: "12px",
            overflow: "hidden",
            position: "relative"
          }}
        >
          <img
            src="/assets/img/home/media/video.jpg" // Your provided image
            alt="Main"
            style={{ width: "100%", display: "block" }}
          />

          {/* Play Button */}
          <a
            href="https://www.youtube.com/watch?v=aFXiHz1DH_0"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "rgba(255,255,255,0.85)",
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
            }}
          >
            <div
              style={{
                width: "0",
                height: "0",
                borderTop: "18px solid transparent",
                borderBottom: "18px solid transparent",
                borderLeft: "28px solid #5c3b26",
                marginLeft: "5px"
              }}
            ></div>
          </a>
        </div>
      </div>

      {/* Video Grid */}
      <div
        style={{
          width: "90%",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px"
        }}
      >
        {videos.map((video, index) => (
          <div key={index} style={{ textAlign: "left" }}>
            <div style={{ position: "relative", borderRadius: "10px", overflow: "hidden" }}>
              <img
                src={video.thumb}
                alt={`Video ${index}`}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />

              {/* Play button small */}
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background: "rgba(255,255,255,0.85)",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: "10px solid transparent",
                    borderBottom: "10px solid transparent",
                    borderLeft: "16px solid #5c3b26",
                    marginLeft: "4px"
                  }}
                ></div>
              </a>
            </div>

            <p style={{ fontSize: "14px", marginTop: "10px", color: "#444" }}>{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
