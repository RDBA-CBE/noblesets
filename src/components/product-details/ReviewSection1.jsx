
import ReactStars from "react-rating-stars-component";


const ReviewSection1 = ({ ratingsData }) => {
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

   
      <hr className="my-3" />
      <a href="#customer-reviews" className="text-blue-600 text-sm underline">
        See customer reviews
      </a>
    </div>
    </div>
  );
};



export default ReviewSection1