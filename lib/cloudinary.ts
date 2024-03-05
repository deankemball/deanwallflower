import { Cloudinary } from "@cloudinary/url-gen";
// import cloudinary from "cloudinary";

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.CLOUDINARY_NAME,
    apiKey: process.env.CLOUDINARY_KEY,
    apiSecret: process.env.CLOUDINARY_SECRET,
  },
});

export default cld;
