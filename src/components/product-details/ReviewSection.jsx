import React, { useState } from "react";
import Rating from "react-rating-stars-component";
// import ProfileImage from "@assets/img/actors/actors-image";

const initialReviews = [
  {
    name: "Alexander Rity",
    avatar: "/assets/img/profile-1.webp",
    date: "4 months ago",
    rating: 5,
    comment:
      "Easy booking, great value! Cozy rooms at a reasonable price in Sheffield’s vibrant center. Surprisingly quiet with nearby Traveller’s accommodations. Highly recommended!",
    images: [1, 2, 3, 4].map(() => "/assets/img/placeholder-portrait.png"),
  },
  {
    name: "Emma Creight",
    avatar: "/assets/img/profile-1.webp",
    date: "4 months ago",
    rating: 4,
    comment:
      "Effortless booking, unbeatable affordability! Small yet comfortable rooms in the heart of Sheffield’s nightlife hub. Surrounded by elegant housing, it’s a peaceful gem. Thumbs up!",
    images: [],
  },
  {
    name: "Emma Creight",
    avatar: "/assets/img/profile-1.webp",
    date: "4 months ago",
    rating: 4,
    comment:
      "Effortless booking, unbeatable affordability! Small yet comfortable rooms in the heart of Sheffield’s nightlife hub. Surrounded by elegant housing, it’s a peaceful gem. Thumbs up!",
    images: [],
  },
  {
    name: "Emma Creight",
    avatar: "/assets/img/profile-1.webp",
    date: "4 months ago",
    rating: 4,
    comment:
      "Effortless booking, unbeatable affordability! Small yet comfortable rooms in the heart of Sheffield’s nightlife hub. Surrounded by elegant housing, it’s a peaceful gem. Thumbs up!",
    images: [],
  },
  {
    name: "Emma Creight",
    avatar: "/assets/img/profile-1.webp",
    date: "4 months ago",
    rating: 4,
    comment:
      "Effortless booking, unbeatable affordability! Small yet comfortable rooms in the heart of Sheffield’s nightlife hub. Surrounded by elegant housing, it’s a peaceful gem. Thumbs up!",
    images: [],
  },
];

const ReviewSection = (props) => {
  const { reviewList } = props;

  return (
    <div className="container py-5 review-sec">
      <div className="row g-4">
        <div className="col-lg-12">
          <div className="review-box p-4 bg-white shadow-sm ">
            <h4 className="review-title mb-3 ">Reviews</h4>

            {/* Rating Summary */}
            {/* <div className="d-flex align-items-center mb-3">
              <div className="review-score-display me-3">
                <h1 className=" m-0 text-dark">4.0</h1>
                <Rating count={5} value={4} edit={false} size={20} activeColor="#b4633a" />
                <p className="text-muted small">{reviews.length} ratings</p>
              </div>
              <div className="flex-grow-1">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = reviews.filter((r) => r.rating === rating).length;
                  return (
                    <div key={rating} className="d-flex align-items-center mb-1">
                      <div className="flex-grow-1 review-bar bg-light">
                        <div
                          className="bg-gold"
                          style={{
                            width: `${(count / reviews.length) * 100 || 0}%`,
                            height: '8px',
                          }}
                        />
                      </div>
                      <div className="ms-2 small text-dark">
                        {rating}.0 <span className="text-muted">{count} reviews</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div> */}

            {/* Write a Review */}
            {/* <div className="mb-4">
              <h5 className="">Write a Review</h5>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <textarea
                  className="form-control mb-2"
                  placeholder="Your review"
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  required
                />
                

                <div className="d-flex gap-2 flex-wrap mb-2">
                <input type="file" className="form-control" multiple onChange={handleImageUpload} />
                <div className="d-flex gap-2 mt-2 flex-wrap">
                  {formData.images.map((img, idx) => (
                    <img key={idx} src={img} alt="preview" className="rounded" width={50} height={50} />
                  ))}
                </div>
                <div className="mb-2">
                  <Rating
                    count={5}
                    value={formData.rating}
                    onChange={(newRating) => setFormData({ ...formData, rating: newRating })}
                    size={25}
                    activeColor="#b4633a"
                  />
                </div>
              </div>

                <button type="submit" className="tp-btn tp-btn-border ">Submit Review</button>
                
              </form>
            </div> */}

            {/* Reviews List */}
            {reviewList?.map((review, index) => (
              <div key={index} className="mb-4">
                <div className="d-flex align-items-center mb-2">
                  <img
                    src={
                      review.user?.avatar
                        ? review.user?.avatar
                        : "/assets/img/user.png"
                    }
                    alt="avatar"
                    className="rounded-circle me-2"
                    width={50}
                  />

                  <div>
                    <strong>{`${review.user?.firstName} ${review.user?.lastName}`}</strong>

                    <p className="text-muted small m-0">{review.created_at}</p>
                  </div>
                </div>
                <p className="text-dark mb-1">{review.comment}</p>
                <Rating
                  count={5}
                  value={review.rating}
                  edit={false}
                  size={18}
                  activeColor="#b4633a"
                />
                <div className="d-flex gap-2 mt-2">
                  {review.images.map((src, idx) => (
                    <img
                      key={idx}
                      src={src?.fileUrl}
                      className="rounded"
                      alt="review"
                      style={{objectFit:"cover"}}
                      width={50}
                      height={50}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Read More Toggle */}
            {/* {!showAll && reviews.length > 2 && (
              <a  className="text-gold  small cursor-pointer" onClick={() => setShowAll(true)}>
              Read all reviews <span>&#x25BC;</span>
            </a>
              // <button className="btn btn-link text-gold  small p-0" onClick={() => setShowAll(true)}>
              //   Read all reviews <span>&#x25BC;</span>
              // </button>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
