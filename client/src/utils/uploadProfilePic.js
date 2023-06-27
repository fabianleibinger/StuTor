import axios from "axios";
import Resizer from "react-image-file-resizer";

const uploadProfilePic = async (file) => {
  const compressedFile = await compressImage(file);
  
  const data = new FormData();
  data.append("file", compressedFile);
  data.append("upload_preset", "StuTor");

  try {
    const res = await axios.post("https://api.cloudinary.com/v1_1/daefab1lj/image/upload", data);

    const { url } = res.data;
    return url;
  } catch (err) {
    console.log(err);
  }
};

const compressImage = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      500, // max width
      500, // max height
      "JPEG", // compress format
      70, // quality
      0, // rotation
      (compressedFile) => {
        resolve(compressedFile);
      },
      "blob" // output type
    );
  });

export default uploadProfilePic;