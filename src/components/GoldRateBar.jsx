// import React, { useEffect, useState } from "react";

// const GoldRateBar = () => {
//   const [rateInfo, setRateInfo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const fetchRates = async () => {
//       try {
//         setLoading(true);

//         const response = await fetch(
//           "http://mtjchitapp.thechennaisilks.com/goldrate"
//         );
//         const data = await response.json();

//         if (data.results && data.results[0]?.Success === 1) {
//           setRateInfo(data.results[0]);
//           setError(false);
//         } else {
//           setError(true);
//         }
//       } catch (err) {
//         console.error("Error fetching gold rates:", err);
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRates();

//     const interval = setInterval(fetchRates, 600000); // 10 mins
//     return () => clearInterval(interval);
//   }, []);

//   const barStyle = {
//     backgroundColor: "#fff8f5",
//     color: "#7d4432",
//     padding: "8px 0",
//     fontSize: "13px",
//     fontWeight: 600,
//     borderBottom: "1px solid #ebebeb",
//     display: "flex",
//     overflow: "hidden",
//     whiteSpace: "nowrap",
//     width: "100%",
//     position: "relative",
//     zIndex: 1000,
//   };

//   if (loading && !rateInfo) {
//     return (
//       <div style={{ ...barStyle, justifyContent: "center" }}>
//         Updating live gold rates...
//       </div>
//     );
//   }

//   // if (error && !rateInfo) {
//   //   return (
//   //     <div
//   //       style={{
//   //         ...barStyle,
//   //         justifyContent: "center",
//   //         color: "#b91c1c",
//   //       }}
//   //     >
//   //       Live rates temporarily unavailable
//   //     </div>
//   //   );
//   // }

//   if (!rateInfo || !rateInfo.Message?.[0]) return null;

//   const rates = rateInfo.Message[0];

//   const renderTrend = (mode) => (
//     <span
//       style={{
//         color: mode === "H" ? "#16a34a" : "#dc2626",
//         fontSize: "11px",
//         marginLeft: "4px",
//       }}
//     >
//       {mode === "H" ? "▲" : "▼"}
//     </span>
//   );

//   return (
//     <div className="gold-rate-bar" style={barStyle}>
//       <style>
//         {`
//           // @keyframes scroll-ticker {
//           //   0% { transform: translateX(100%); }
//           //   100% { transform: translateX(-100%); }
//           }

//           .ticker-content {
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             gap: 60px;
//             animation: scroll-ticker 30s linear infinite;
//             padding-left: 20px;
//           }

//           .ticker-content:hover {
//             animation-play-state: paused;
//           }
//         `}
//       </style>

//       <div className="ticker-content w-100">
//         <span>
//           <strong>GOLD 22K:</strong> ₹ 
//           {rates.GOLD22?.toLocaleString("en-IN")}
//           {renderTrend(rateInfo.GoldMode)}
//         </span>

//         <span>
//           <strong>GOLD 24K:</strong> ₹ 
//           {rates.GOLD24?.toLocaleString("en-IN")}
//         </span>

//         <span>
//           <strong>SILVER:</strong> ₹ 
//           {rates.SILVER?.toLocaleString("en-IN")}
//           {renderTrend(rateInfo.SilverMode)}
//         </span>

//         <span>
//           <strong>PLATINUM:</strong> ₹ 
//           {rates.PLATINUM?.toLocaleString("en-IN")}
//         </span>

//         <span>
//           <strong>GOLD 22K:</strong> ₹ 
//           {rates.GOLD22?.toLocaleString("en-IN")}
//           {renderTrend(rateInfo.GoldMode)}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default GoldRateBar;


import React, { useEffect, useState } from "react";

const GoldRateBar = () => {
  const [rateInfo, setRateInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   const fetchRates = async () => {
  //     try {
  //       setLoading(true);

  //       const response = await fetch(
  //         "http://mtjchitapp.thechennaisilks.com/goldrate"
  //       );
  //       const data = await response.json();

  //       if (data.results && data.results[0]?.Success === 1) {
  //         setRateInfo(data.results[0]);
  //         setError(false);
  //       } else {
  //         setError(true);
  //       }
  //     } catch (err) {
  //       console.error("Error fetching gold rates:", err);
  //       setError(true);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchRates();

  //   const interval = setInterval(fetchRates, 600000); // 10 mins
  //   return () => clearInterval(interval);
  // }, []);

  const barStyle = {
    backgroundColor: "#fff8f5",
    color: "#7d4432",
    padding: "8px 0",
    fontSize: "13px",
    fontWeight: 600,
    borderBottom: "1px solid #ebebeb",
    display: "flex",
    overflow: "hidden",
    whiteSpace: "nowrap",
    width: "100%",
    position: "relative",
    zIndex: 1000,
  };

  // if (loading && !rateInfo) {
  //   return (
  //     <div style={{ ...barStyle, justifyContent: "center" }}>
  //       Updating live gold rates...
  //     </div>
  //   );
  // }

  // if (error && !rateInfo) {
  //   return (
  //     <div
  //       style={{
  //         ...barStyle,
  //         justifyContent: "center",
  //         color: "#b91c1c",
  //       }}
  //     >
  //       Live rates temporarily unavailable
  //     </div>
  //   );
  // }

  // if (!rateInfo || !rateInfo.Message?.[0]) return null;

  // const rates = rateInfo.Message[0];

  const renderTrend = (mode) => (
    <span
      style={{
        color: mode === "H" ? "#16a34a" : "#dc2626",
        fontSize: "11px",
        marginLeft: "4px",
      }}
    >
      {mode === "H" ? "▲" : "▼"}
    </span>
  );

  return (
    <div className="gold-rate-bar" style={barStyle}>
      {/* <style>
        {`
          @keyframes scroll-ticker {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }

          .ticker-content {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 60px;
            animation: scroll-ticker 30s linear infinite;
            padding-left: 20px;
          }

          .ticker-content:hover {
            animation-play-state: paused;
          }
        `}
      </style> */}

     <div className="ticker-content ticker-track w-100">
        <div className="ticker-group">
          <span>
            <strong>GOLD 22K:</strong> ₹ 150000
            {/* {rates.GOLD22?.toLocaleString("en-IN")}
          {renderTrend(rateInfo.GoldMode)} */}
          </span>

          <span>
            <strong>GOLD 24K:</strong> ₹ 150000
            {/* {rates.GOLD24?.toLocaleString("en-IN")} */}
          </span>

          <span>
            <strong>SILVER:</strong> ₹ 150000
            {/* {rates.SILVER?.toLocaleString("en-IN")}
          {renderTrend(rateInfo.SilverMode)} */}
          </span>

          <span>
            <strong>PLATINUM:</strong> ₹ 150000
            {/* {rates.PLATINUM?.toLocaleString("en-IN")} */}
          </span>

          
        </div>
        <div className="ticker-group">
          <span>
            <strong>GOLD 22K:</strong> ₹ 150000
            {/* {rates.GOLD22?.toLocaleString("en-IN")}
          {renderTrend(rateInfo.GoldMode)} */}
          </span>

          <span>
            <strong>GOLD 24K:</strong> ₹ 150000
            {/* {rates.GOLD24?.toLocaleString("en-IN")} */}
          </span>

          <span>
            <strong>SILVER:</strong> ₹ 150000
            {/* {rates.SILVER?.toLocaleString("en-IN")}
          {renderTrend(rateInfo.SilverMode)} */}
          </span>

          <span>
            <strong>PLATINUM:</strong> ₹ 150000
            {/* {rates.PLATINUM?.toLocaleString("en-IN")} */}
          </span>

         
        </div>
      </div>
    </div>
  );
};

export default GoldRateBar;