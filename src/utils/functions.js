import { useState } from "react";
import Swal from "sweetalert2";
import Resizer from "react-image-file-resizer";
import AWS from "aws-sdk";
import axios from "axios";
import CryptoJS from "crypto-js";

const SECRET_KEY = "MyStrongKey@123";

export const accessKeyId = "DO00MUC2HWP9YVLPXKXT";

export const secretAccessKey = "W9N9b51nxVBvpS59Er9aB6Ht7xx2ZXMrbf3vjBBR8OA";

export const SERVER_URL = "http://noblesetsbkend.irepute.co.in";

export const DELIVERY_ID_TN = "U2hpcHBpbmdNZXRob2Q6ODg=";

export const DELIVERY_ID_OTHER_TN = "U2hpcHBpbmdNZXRob2Q6ODk=";

export const DELIVERY_ID_OTHER_IN = "U2hpcHBpbmdNZXRob2Q6OTI=";

export const FRONTEND_URL = "https://file.noblesets.com/";

export const encrypt12 = (text) => {
  const encrypted = CryptoJS.AES.encrypt(text, SECRET_KEY).toString(); // full base64
  return encrypted.slice(0, 12); // shorten to 12 chars (display only)
};

export const encryptFull = (text) => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const decrypt = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const capitalizeFLetter = (string = "") => {
  if (string.length > 0) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return string;
};

export const useSetState = (initialState) => {
  const [state, setState] = useState(initialState);

  const newSetState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };
  return [state, newSetState];
};

export const getPrice = () => {
  let price;
};

export const shortData = (selectValue, products) => {
  if (!selectValue || !products?.length) {
    return null;
  }

  let product_items = [...products];

  if (selectValue === "Low to High") {
    product_items.sort((a, b) => {
      const priceA =
        Number(a?.node?.pricing?.priceRange?.start?.gross?.amount) || 0;
      const priceB =
        Number(b?.node?.pricing?.priceRange?.start?.gross?.amount) || 0;
      return priceA - priceB;
    });
  } else if (selectValue === "High to Low") {
    product_items.sort((a, b) => {
      const priceA =
        Number(a?.node?.pricing?.priceRange?.start?.gross?.amount) || 0;
      const priceB =
        Number(b?.node?.pricing?.priceRange?.start?.gross?.amount) || 0;
      return priceB - priceA;
    });
  } else if (selectValue === "New Added") {
    product_items.sort((a, b) => {
      const dateA = new Date(a?.node?.created) || new Date();
      const dateB = new Date(b?.node?.created) || new Date();
      return dateB - dateA;
    });
  } else if (selectValue === "On Sale") {
    product_items = products.filter((p) => p.node.pricing.discount > 0);
  }

  return product_items;
};

export const checkChannel = () => {
  let channel = "";
  const channels = localStorage.getItem("channel");
  if (!channels) {
    channel = "india-channel";
  } else {
    channel = channels;
  }
  return channel;
};

export const validLoginAndReg = () => {
  let valid = false;
  const user = localStorage.getItem("userInfo");
  const token = localStorage.getItem("token");

  if (!user) {
    valid = false;
  } else if (!token) {
    valid = false;
  } else {
    valid = true;
  }
  return valid;
};

export const roundOff = (value) => {
  if (value === null || value === undefined) return "";

  // Remove commas and convert to number
  const num = Number(value.toString().replace(/,/g, ""));
  if (isNaN(num)) return String(value);

  // Custom rounding logic
  const integerPart = Math.floor(num);
  const decimalPart = num - integerPart;
  const rounded = decimalPart > 0.5 ? Math.ceil(num) : Math.floor(num);

  // Format with Indian number system
  const roundedStr = rounded.toString();
  const lastThree = roundedStr.slice(-3);
  const otherDigits = roundedStr.slice(0, -3);
  const formatted =
    otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
    (otherDigits ? "," : "") +
    lastThree;

  return formatted;
};

export const RegularPrice = (costPrice, sale) => {
  let price = false;
  if (costPrice) {
    if (costPrice == sale) {
      price = false;
    } else if (costPrice > sale) {
      price = true;
    }
  }
  return price;
};

export const getUniqueStates = (states) => {
  const uniqueStates = [];
  const seen = new Set();

  states.forEach((state) => {
    if (!seen.has(state.raw)) {
      uniqueStates.push(state);
      seen.add(state.raw);
    }
  });

  return uniqueStates;
};

export const slider_setting = {
  slidesPerView: 4,
  spaceBetween: 10,
  navigation: {
    prevEl: ".tp-related-slider-button-prev",
    nextEl: ".tp-related-slider-button-next",
  },
  autoplay: {
    delay: 5000,
  },
  breakpoints: {
    1200: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 2,
    },
    576: {
      slidesPerView: 2,
    },
    350: {
      slidesPerView: 2,
    },
    0: {
      slidesPerView: 1,
    },
  },
};

export const addCommasToNumber = (value) => {
  if (value === null || value === undefined) return "";

  // Remove commas and convert to number
  const num = Number(value.toString().replace(/,/g, ""));
  if (isNaN(num)) return String(value);

  // Custom rounding logic
  const integerPart = Math.floor(num);
  const decimalPart = num - integerPart;
  const rounded = decimalPart > 0.5 ? Math.ceil(num) : Math.floor(num);

  // Format with Indian number system
  const roundedStr = rounded.toString();
  const lastThree = roundedStr.slice(-3);
  const otherDigits = roundedStr.slice(0, -3);
  const formatted =
    otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
    (otherDigits ? "," : "") +
    lastThree;

  return formatted;
};

export const mergeAndRemoveDuplicates = (arr1, arr2) => {
  // Merge the two arrays
  const combinedArray = [...arr1, ...arr2];

  // Use a Set to keep track of unique IDs
  const uniqueIds = new Set();

  // Filter the combined array to remove duplicates based on the 'id' property
  const uniqueArray = combinedArray.filter((item) => {
    if (uniqueIds.has(item.id)) {
      return false;
    } else {
      uniqueIds.add(item.id);
      return true;
    }
  });

  return uniqueArray;
};

export const removeduplicate = (arr) => {
  const uniqueData = arr.reduce((acc, current) => {
    const x = acc.find((item) => item.id === current.id);
    if (!x) {
      acc.push(current);
    }
    return acc;
  }, []);
  return uniqueData;
};

export const getParamsFromUrl = (url) => {
  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);
  return {
    email: params.get("email"),
    token: params.get("token"),
  };
};

export const getValueByKey = (metadata, keyToFind) => {
  const foundItem = metadata?.find((item) => item?.key === keyToFind);
  return foundItem ? foundItem?.value : null;
};

export const sortingBy = (e) => {
  let sortBy;
  if (e.value == "Default Sorting") {
    sortBy = { direction: "ASC", field: "ORDER_NO" };
  }
  if (e.value == "Low to High") {
    sortBy = { direction: "ASC", field: "PRICE" };
  }
  if (e.value == "High to Low") {
    sortBy = { direction: "DESC", field: "PRICE" };
  }
  if (e.value == "New Added") {
    sortBy = { direction: "DESC", field: "CREATED_AT" };
  }
  return sortBy;
};

export const showDeleteAlert = (onConfirm, onCancel, title) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn confirm-btn", // Add a custom class for the confirm button
      cancelButton: "btn cancel-btn", // Add a custom class for the cancel button
      popup: "sweet-alerts",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: title ? title : "Are you sure to cancel order?",
      // text: "You won't be able to Delete this!",
      icon: "warning",
      showCancelButton: true,
      // confirmButtonText: 'Yes, delete it!',
      // cancelButtonText: 'No, cancel!',
      reverseButtons: true,
      padding: "2em",
    })
    .then((result) => {
      if (result.isConfirmed) {
        onConfirm(); // Call the onConfirm function if the user confirms the deletion
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        onCancel(); // Call the onCancel function if the user cancels the deletion
      }
    });
};

export const objIsEmpty = (obj) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false; // Found a property, so the object is not empty
    }
  }
  return true; // No properties found, object is empty
};

export const formatCurrency = (currency) => {
  if (currency === "INR") {
    return "₹";
  } else {
    return "$";
  }
};

export const resizingImage = (file) => {
  return new Promise((resolve, reject) => {
    Resizer.imageFileResizer(
      file,
      1160, // Max width
      1340, // Max height
      "JPEG", // Format
      70, // Quality (adjust to get file size below 300KB)
      0, // Rotation
      (uri) => {
        // Convert resized image blob to File
        const resizedFile = new File([uri], file.name, { type: uri.type });
        resolve(resizedFile);
      },
      "blob" // Output type
    );
  });
};

export const resizeImage = (file, width, height) => {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(new File([blob], file.name, { type: file.type }));
          } else {
            reject(new Error("Failed to resize image"));
          }
        }, file.type);
      } else {
        reject(new Error("Failed to get canvas context"));
      }
    };

    img.onerror = (error) => {
      reject(error);
    };

    img.src = URL.createObjectURL(file);
  });
};

export const getImageDimensions = (file) => {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target?.result) {
        img.src = e.target.result;
      } else {
        reject(new Error("Failed to read file"));
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };

    img.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};

export const addNewMediaFile = async (file, uniqueFilename) => {
  try {
    // let uniqueFilename = await generateUniqueFilename(file.name);
    const isImage = file.type.startsWith("image/");
    if (isImage) {
      if (file.size > 300 * 1024) {
        file = await resizingImage(file);
        file = await resizeImage(file, 1160, 1340);
      } else {
        file = await resizeImage(file, 1160, 1340);
      }
      const { width, height } = await getImageDimensions(file);
    }

    file = new File([file], uniqueFilename, {
      type: file.type,
      lastModified: file.lastModified,
    });

    let presignedPostData = null;
    if (file?.name?.endsWith(".mp4")) {
      presignedPostData = await generatePresignedVideoPost(file);
    } else {
      presignedPostData = await generatePresignedPost(file);
    }

    const formData = new FormData();
    Object.keys(presignedPostData.fields).forEach((key) => {
      formData.append(key, presignedPostData.fields[key]);
    });
    formData.append("file", file);

    await axios.post(presignedPostData.url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const urls = `https://prade.blr1.digitaloceanspaces.com/${presignedPostData?.fields?.key}`;
    return urls;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

export const generatePresignedPost = async (file) => {
  const spacesEndpoint = new AWS.Endpoint(
    "https://prade.blr1.digitaloceanspaces.com"
  );

  const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId, // Add your access key here
    secretAccessKey, // Add your secret key here
  });

  // const uniqueFilename = await generateUniqueFilename(file.name);

  const params = {
    Bucket: "prade", // Your Space name
    Fields: {
      key: file.name, // File name
      acl: "public-read",
    },
    Conditions: [
      ["content-length-range", 0, 104857600], // 100 MB limit
      ["starts-with", "$Content-Type", ""], // Allow any content type
      ["eq", "$key", file.name],
    ],
    Expires: 60, // 1 minute expiration
  };

  return new Promise((resolve, reject) => {
    s3.createPresignedPost(params, (err, data) => {
      if (err) {
        console.log("err: ", err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export const generatePresignedVideoPost = async (file) => {
  const spacesEndpoint = new AWS.Endpoint(
    "https://prade.blr1.digitaloceanspaces.com"
  );

  const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId, // Add your access key here
    secretAccessKey, // Add your secret key here
  });
  // const uniqueFilename = await generateUniqueFilename(file.name);

  const params = {
    Bucket: "prade", // Your Space name
    Fields: {
      key: file.name, // File name
      acl: "public-read",
    },
    Conditions: [
      ["content-length-range", 0, 104857600], // 100 MB limit (adjust as needed)
      ["starts-with", "$Content-Type", ""], // Ensure only MP4 files are allowed
      ["eq", "$key", file.name],
    ],
    Expires: 60, // 1 minute expiration
  };

  return new Promise((resolve, reject) => {
    s3.createPresignedPost(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export const getFileType = async (filename) => {
  const videoFormats = new Set([
    "mp4",
    "avi",
    "mov",
    "mkv",
    "webm",
    "flv",
    "wmv",
    "mpeg",
    "ogv",
  ]);
  const imageFormats = new Set([
    "jpeg",
    "jpg",
    "png",
    "gif",
    "bmp",
    "tiff",
    "webp",
    "svg",
    "heic",
    "ico",
  ]);
  const documentFormats = new Set([
    "pdf",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "txt",
  ]);

  const getFileExtension = (filename) => {
    const parts = filename?.split(".");
    return parts.length > 1 ? parts.pop().toLowerCase() : "";
  };

  const ext = getFileExtension(filename);

  if (videoFormats.has(ext)) {
    return "Video";
  } else if (imageFormats.has(ext)) {
    return "Image";
  } else if (documentFormats.has(ext)) {
    return "Doc";
  } else {
    return "unknown";
  }
};

export const CommonLoader = () => {
  return (
    <div
      style={{
        height: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src="/assets/img/nobelset-gif-3.gif" alt="Loading..." />
    </div>
  );
};

export const roundIndianRupee = (value) => {
  const num = Number(value.toString().replace(/,/g, ""));
  if (isNaN(num)) return String(value);

  const integerPart = Math.floor(num);
  const decimalPart = num - integerPart;
  const rounded = decimalPart > 0.5 ? Math.ceil(num) : Math.floor(num);

  return rounded;
};

export const generateCaptcha = ({
  difficulty = 10,
  operations = ["+", "-", "*"],
} = {}) => {
  const num1 = Math.floor(Math.random() * difficulty);
  const num2 = Math.floor(Math.random() * difficulty);
  const operation = operations[Math.floor(Math.random() * operations.length)];

  let answer;
  switch (operation) {
    case "+":
      answer = num1 + num2;
      break;
    case "-":
      answer = num1 - num2;
      break;
    case "*":
      answer = num1 * num2;
      break;
    default:
      throw new Error(`Unsupported operation: ${operation}`);
  }

  return {
    question: `${num1} ${operation} ${num2}?`,
    answer,
  };
};

export const limitChar = (text = "", limit = 100) => {
  if (!text) return "";
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};

export const ReadMore = ({ text, charLimit = 120 }) => {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  const isLong = text.length > charLimit;
  const displayText = !expanded
    ? text.substring(0, charLimit) + (isLong ? "..." : "")
    : text;

  return (
    <>
      <span dangerouslySetInnerHTML={{ __html: displayText }} />
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          style={{
            background: "none",
            border: "none",
            color: "#7d4432",
            cursor: "pointer",
            paddingLeft: "5px",
            fontSize: "14px",
          }}
        >
          {expanded ? "Hide info" : "Read more"}
        </button>
      )}
    </>
  );
};

// charLimit is required and should be passed from the parent
export const ReadMoreList = ({ items, charLimit, itemStyle = {} }) => {
  const [expanded, setExpanded] = useState(false);

  if (!items || items.length === 0 || !charLimit) return null;

  // Helper function to remove HTML for accurate plain text character counting
  const cleanText = (html) => html.replace(/<[^>]+>/g, "");

  // 1. Check if the total content length exceeds the limit
  const plainTextCombined = items.map(cleanText).join(" ");
  const isLong = plainTextCombined.length > charLimit;

  // 2. Determine which items to display (truncated or full)
  let displayItems = items;

  if (!expanded && isLong) {
    let count = 0;
    const limitedItems = [];

    for (let item of items) {
      // Ensure bold is applied before checking length
      let processedItem = item.includes("<b>") ? `<b>${item}</b>` : item;
      const plainItem = cleanText(item);
      const itemLength = plainItem.length;

      if (count + itemLength <= charLimit) {
        limitedItems.push(processedItem);
        count += itemLength;
      } else {
        // Truncate the current item to fit
        const remaining = charLimit - count;
        let truncatedText = plainItem.substring(0, remaining);

        // Re-apply bold if the original item was bold
        if (item.includes("<b>")) {
          truncatedText = `<b>${truncatedText}</b>`;
        }

        // Add ellipsis and stop
        truncatedText += "...";

        limitedItems.push(truncatedText);
        break;
      }
    }
    displayItems = limitedItems;
  }

  return (
    <>
      <ul>
        {displayItems.map((item, index) => (
          <li
            key={index}
            // Apply the style passed from the parent component
            style={itemStyle}
            dangerouslySetInnerHTML={{ __html: item }}
          />
        ))}
      </ul>
      {/* 💥 THIS IS THE SINGLE BUTTON RENDERED OUTSIDE THE MAP 💥 */}
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          style={{
            background: "none",
            border: "none",
            color: "#7d4432",
            cursor: "pointer",
            fontSize: "14px",
            marginTop: "5px",
            padding: 0,
          }}
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
    </>
  );
};

export const formatIndianRupees = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
