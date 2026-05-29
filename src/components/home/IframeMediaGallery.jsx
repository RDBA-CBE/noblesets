import React, { useState } from "react";
import ReactModal from "react-modal";
import Loader from "../loader/loader";

const videos = [
  {
    url: "https://www.youtube.com/embed/eSUGX5j1MP8?si=OGDtiST_NqaXOKTW",
    thumb: "/assets/img/newlayout/Media/small-image-1.jpg",
    title: "Elegant Jewellery Collection Showcase – Premium Designs & Craftsmanship",
  },
  {
    url: "https://www.youtube.com/embed/gCdG1XATztY?si=8RVPxiPSO4q4GmlP",
    thumb: "/assets/img/newlayout/Media/small-image-2.jpg",
    title: "Behind the Scenes – Creating Beautiful Jewellery with Precision",
  },
  {
    url: "https://www.youtube.com/embed/g6108lTGMcw?si=fvzb47N9tuwPFgG6",
    thumb: "/assets/img/newlayout/Media/small-image-3.jpg",
    title: "Exclusive Jewellery Styling Ideas for Special Occasions",
  },
  {
    url: "https://www.youtube.com/embed/SvyZepgSHeM?si=_XqeyhVY0wSEVQJn",
    thumb: "/assets/img/newlayout/Media/small-image-4.jpg",
    title: "Latest Jewellery Trends – Discover Our New Collection",
  },
];

const getEmbedUrl = (shareUrl) => {
  const videoIdMatch = shareUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?#]+)/);
  return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}?autoplay=1` : '';
};

export default function IframeMediaGallery() {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideoEmbedUrl, setCurrentVideoEmbedUrl] = useState("");
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);

  const openVideoModal = (videoUrl) => {
    setIsLoadingVideo(true);
    setCurrentVideoEmbedUrl(getEmbedUrl(videoUrl));
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    setCurrentVideoEmbedUrl(""); // Clear URL when closing
  };

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
          <a
            onClick={() => openVideoModal("https://www.youtube.com/embed/SvyZepgSHeM?si=_XqeyhVY0wSEVQJn")}
            className="media-hero-play-btn"
            style={{ cursor: 'pointer' }}
          >
            <div className="media-hero-play-icon"></div>
          </a>
        </div>
      </div>

      {/* Video Grid */}
      <div className="media-grid">
        {videos.map((video, index) => (
          <div key={index} className="media-grid-item" style={{ cursor: 'pointer' }}>
            <div className="media-thumb-wrapper" onClick={() => openVideoModal(video.url)}>
              <img
                src={video.thumb}
                alt={`Video ${index}`}
                className="media-thumb-img"
              />
              <div className="media-thumb-play-btn">
                <div className="media-thumb-play-icon"></div>
              </div>
            </div>
            <p className="media-video-title p-3">{video.title}</p>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      <ReactModal
        isOpen={showVideoModal}
        onRequestClose={closeVideoModal}
        contentLabel="YouTube Video Player"
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          },
          content: {
            position: 'relative',
            background: '#fff',
            padding: '20px',
            borderRadius: '10px',
            maxWidth: '90vw',
            maxHeight: '90vh',
            width: '800px', /* Max width for the video */
            height: '450px', /* 16:9 aspect ratio for 800px width */
            outline: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            inset: 'auto', /* Override default ReactModal inline style */
          }
        }}
      >
        <button
          onClick={closeVideoModal}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: '#9b604d', /* Project's theme color */
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
          }}
        >
          &times;
        </button>
        <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isLoadingVideo && (
            <div style={{ position: 'absolute', zIndex: 1 }}>
              <Loader loading={true} />
            </div>
          )}
          {currentVideoEmbedUrl && (
            <iframe
              width="100%"
              height="100%"
              src={currentVideoEmbedUrl}
              onLoad={() => setIsLoadingVideo(false)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{ borderRadius: '10px', visibility: isLoadingVideo ? 'hidden' : 'visible' }}
            ></iframe>
          )}
        </div>
      </ReactModal>
    </div>
  );
}
