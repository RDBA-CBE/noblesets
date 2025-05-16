
import ReactStars from "react-rating-stars-component";


const RatingBreakdown = ({ ratingsData }) => {
  // const { average, totalRatings, breakdown } = ratingsData;

  // Example usage
  const sampleData = {
    average: 4.0,
    totalRatings: 672,
    breakdown: {
      5: 48,
      4: 27,
      3: 14,
      2: 4,
      1: 7,
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="w-80 rounded-lg shadow-lg border bg-white p-4 relative">
     
      <div className="flex items-center gap-2 mb-1">
        <div className="flex text-orange-400">
        <ReactStars
            count={5}
            size={24}
            activeColor="#ffd700"
            value={4}
            edit={true}
            onChange={(newRating) => console.log(newRating)}
            />
        </div>
        <span className="font-semibold text-gray-700">{sampleData?.average} out of 5</span>
      </div>

      <p className="text-sm text-black mb-3">{sampleData?.totalRatings} global ratings</p>

      {/* Rating breakdown */}
      {/* {Object.entries(breakdown)
        .sort(([a], [b]) => b - a)
        .map(([star, percent]) => (
          <div key={star} className="flex items-center mb-1 text-sm text-gray-700">
            <span className="w-10">{star} star</span>
            <div className="flex-1 mx-2 bg-gray-200 rounded h-3 overflow-hidden">
              <div className="bg-orange-400 h-3" style={{ width: `${percent}%` }}></div>
            </div>
            <span>{percent}%</span>
          </div>
        ))} */}

      {/* Footer */}
      <hr className="my-3" />
      <a href="#customer-reviews" className="text-blue-600 text-sm underline">
        See customer reviews
      </a>
    </div>
    </div>
  );
};



export default RatingBreakdown