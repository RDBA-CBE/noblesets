import React from "react";


const videos = [
  {
    url: "https://www.youtube.com/watch?v=gKG6G_WAfzg",
    thumb: "/assets/img/newlayout/Media/small-image-1.jpg",
    title:
      "Lorem ipsum dolor sit consectetur adipiscing elit sed eiusmod tempor incididunt ut labore",
  },
  {
    url: "https://www.youtube.com/watch?v=QYLVneoDeMA",
    thumb: "/assets/img/newlayout/Media/small-image-2.jpg",
    title:
      "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim",
  },
  {
    url: "https://www.youtube.com/watch?v=UQ9N-A_YClQ",
    thumb: "/assets/img/newlayout/Media/small-image-3.jpg",
    title:
      "Duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    url: "https://www.youtube.com/watch?v=QG4q2q9p9v0",
    thumb: "/assets/img/newlayout/Media/small-image-4.jpg",
    title:
      "Ut enim ad minim veniam, quis nostrud quis exercitation ullamco laboris nisi ut aliquip",
  },
];

export default function MediaSection() {
  return (
    <div className=" media-section-wrapper">
      {/* Section Heading */}
      <div className="text-center mb-4">
        <div className="feature-main">
          <h5 className="sub-ti">
            <b className="pe-2">✦</b> In the Spotlight
          </h5>
          <h4 className="feature-adipisicing main-ti">Media</h4>
        </div>
      </div>

      {/* Hero Video Section */}
      <div className="media-hero-container">
        <div className="media-hero-box">
          <img
            src="/assets/img/newlayout/Media/image.jpg"
            alt="Main"
            className="media-hero-image"
          />

          {/* Play Button */}
          <a
            href="https://www.youtube.com/watch?v=aFXiHz1DH_0"
            target="_blank"
            rel="noopener noreferrer"
            className="media-hero-play-btn"
          >
            <div className="media-hero-play-icon"></div>
          </a>
        </div>
      </div>

      {/* Video Grid */}
      <div className="media-grid">
        {videos.map((video, index) => (
          <div key={index} className="media-grid-item">
            <div className="media-thumb-wrapper">
              <img
                src={video.thumb}
                alt={`Video ${index}`}
                className="media-thumb-img"
              />

              {/* Play button small */}
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="media-thumb-play-btn"
              >
                <div className="media-thumb-play-icon"></div>
              </a>
            </div>

            <p className="media-video-title p-3">{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
