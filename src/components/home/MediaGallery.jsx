import React from "react";


const videos = [
  {
    // url: "https://www.youtube.com/watch?v=gKG6G_WAfzg",
    url:"https://youtu.be/eSUGX5j1MP8?si=aOxLxOxlxxARyDGF",
    thumb: "/assets/img/newlayout/Media/small-image-1.jpg",
    title: "Elegant Jewellery Collection Showcase – Premium Designs & Craftsmanship",
  },
  {
    // url: "https://www.youtube.com/watch?v=QYLVneoDeMA",
    url:"https://youtu.be/gCdG1XATztY?si=XrLwKmTAWh29d84V",
    thumb: "/assets/img/newlayout/Media/small-image-2.jpg",
    title: "Behind the Scenes – Creating Beautiful Jewellery with Precision",
  },
  {
    // url: "https://www.youtube.com/watch?v=UQ9N-A_YClQ",
    url:"https://youtu.be/g6108lTGMcw?si=xbQAiM85cK2hbYjK",
    thumb: "/assets/img/newlayout/Media/small-image-3.jpg",
    title: "Exclusive Jewellery Styling Ideas for Special Occasions",
  },
  {
    // url: "https://www.youtube.com/watch?v=QG4q2q9p9v0",
    url:"https://youtu.be/SvyZepgSHeM?si=qA-7UC8bhCiH4Brw",
    thumb: "/assets/img/newlayout/Media/small-image-4.jpg",
    title: "Latest Jewellery Trends – Discover Our New Collection",
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
            // href="https://www.youtube.com/watch?v=aFXiHz1DH_0"
            href="https://youtu.be/SvyZepgSHeM?si=qA-7UC8bhCiH4Brw"
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
