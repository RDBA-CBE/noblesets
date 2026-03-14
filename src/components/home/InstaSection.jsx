export default function InstaSection() {
  return (
    <section className="insta-wrapper container-fluid">
      <div className=" row justify-content-center">
        <div className="col-11">
          <div className="container-fluid">
            <div className="insta-container">
              <div className="insta-item">
                <img
                  className="insta-img"
                  src="/assets/img/newlayout/Our Instagram/image-1.png"
                  alt=""
                />
              </div>
              <div className="insta-item">
                <img
                  className="insta-img"
                  src="/assets/img/newlayout/Our Instagram/image-2.png"
                  alt=""
                />
              </div>
              <div  className="insta-item">
                <div className="insta-center">
<h4 className="feature-adipisicing main-ti">Follow Us on Instagram</h4>
<p className="insta-desc">
  Discover our latest jewellery collections, styling inspiration, and new arrivals. 
  Follow <a href="https://www.instagram.com/noble_sets/" target="_blank" rel="noopener noreferrer">
    <span className="insta-id">@noble_sets</span>
  </a> to stay updated with our newest designs and exclusive showcases.
</p>
<div className="insta-btn-wrapper">
  <a
    href="https://www.instagram.com/noble_sets/"
    target="_blank"
    rel="noopener noreferrer"
    className="insta-btn"
  >
    <i className="fab fa-instagram"></i> View on Instagram
  </a>
</div>
                </div>
              </div>
              <div className="insta-item">
                <img
                  className="insta-img"
                  src="/assets/img/newlayout/Our Instagram/image-3.png"
                  alt=""
                />
              </div>
              <div className="insta-item">
                <img
                  className="insta-img"
                  src="/assets/img/newlayout/Our Instagram/image-4.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
