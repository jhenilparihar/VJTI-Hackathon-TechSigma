import { useState, createRef } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import ReactPlayer from "react-player";

function ImageUpload(props) {
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(props?.image);
  const [isPreviewImageHovered, setIsPreviewImageHovered] = useState(false);
  const [fileType, setFileType] = useState("");

  const { getRootProps, getInputProps, open } = useDropzone({
    onDropAccepted: (acceptedFiles) => {
      imageUploadHandler(acceptedFiles);
    },
    accept: {
      "image/*": [".jpeg", ".png"],
      "video/*": [".mp4", ".mkv"],
      "audio/*": [".mp4"],
    },
    maxFiles: 1,
  });

  const imageUploadHandler = (acceptedFiles) => {
    console.log(acceptedFiles);
    setImageFile(acceptedFiles[0]);
    props?.onUpload(acceptedFiles[0]);
  };

  const openUploadDialogHandler = () => {
    open();
  };

  const resetImageHandler = () => {
    props?.onReset();
    setPreviewImage("");
    setFileType("");
  };

  const deleteImageHandler = () => {
    props?.onDelete();
  };

  useEffect(() => {
    if (imageFile == props?.image) {
      if (imageFile?.type.includes("video")) {
        setPreviewImage(URL.createObjectURL(imageFile));
        setFileType("video");
      } else if (imageFile?.type.includes("image")) {
        setPreviewImage(URL.createObjectURL(imageFile));
        setFileType("image");
      }
    }
    // const fileReader = new FileReader();
    // if (imageFile == props?.image) {
    //   fileReader.onloadend = () => {
    //     if (imageFile?.type.includes("image")) {
    //       setPreviewImage(fileReader.result);
    //       console.log(fileReader.result);
    //     }
    //     // } else if (imageFile?.type.includes("video")) {
    //     //   setPreviewVideo(fileReader.result);
    //     //   console.log(fileReader.result);
    //     // }
    //   };
    //   fileReader.readAsDataURL(imageFile);
    // } else {
    //   setPreviewImage(props?.image || "");
    // }
  }, [imageFile, props?.image]);

  useEffect(() => {
    console.log(props?.defaultImage)
    if (props?.defaultImage) {
      setPreviewImage(props?.defaultImage?.src);
      setFileType("image");
    }
  }, [props?.defaultImage]);

  return (
    <div
      className={`flex-grow flex flex-col space-y-5 text-tertiaryred-50 ${props?.className}`}
    >
      {!previewImage && (
        <div
          {...getRootProps()}
          className="h-full flex flex-col justify-center items-center space-y-6 cursor-pointer border-2 border-tertiaryred-50 border-dashed text-base"
        >
          <input {...getInputProps()} />
          <FontAwesomeIcon icon={faUpload} />
          <p>Upload your file here!</p>
        </div>
      )}
      {previewImage && (
        <div
          className={`${props?.imageDimensions} relative`}
          // onMouseOver={() => {
          //   setIsPreviewImageHovered(true);
          // }}
          // onMouseOut={() => {
          //   setIsPreviewImageHovered(false);
          // }}
        >
          {/* {isPreviewImageHovered && (
            <div className="flex items-center space-x-5 justify-center text-base font-display h-full w-full absolute z-10 bg-tertiarygrey-400 bg-opacity-80 transition-all duration-500">
              <button
                type="button"
                onClick={openUploadDialogHandler}
                className={`px-4 py-3 rounded-full border-2 text-white hover:text-tertiaryred-50 hover:border-tertiaryred-50 transition-all duration-500`}
              >
                <FontAwesomeIcon icon={faUpload} />
              </button>
              {props?.enableReset && (
                <button
                  type="button"
                  disabled={previewImage === props?.image}
                  onClick={resetImageHandler}
                  className={`px-4 py-3 rounded-full border-2 text-white hover:text-tertiaryred-50 hover:border-tertiaryred-50 transition-all duration-500`}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              )}
            </div>
          )} */}
          {fileType === "image" && (
            <img
              src={props?.defaultImage?.src || previewImage}
              className="h-full w-full object-contain object-center"
            />
          )}
          {fileType === "video" && (
            <ReactPlayer
              height={"100%"}
              width={"100%"}
              controls={true}
              url={previewImage}
            />
          )}
          <div className="flex justify-between mt-4">
            <button
              className="px-4 py-2 rounded-md border-2 border-tertiaryred-50"
              type="button"
              onClick={props?.onUploadToIPFS}
            >
              Upload To IPFS
            </button>
            <div className="space-x-5 ">
              <button
                type="button"
                onClick={openUploadDialogHandler}
                className={`px-4 py-3 rounded-md border-2 text-white hover:text-tertiaryred-50 hover:border-tertiaryred-50 transition-all duration-500`}
              >
                <FontAwesomeIcon icon={faUpload} />
              </button>
              {props?.enableReset && (
                <button
                  type="button"
                  // disabled={previewImage === props?.image}
                  onClick={resetImageHandler}
                  className={`px-4 py-3 rounded-md border-2 text-white hover:text-tertiaryred-50 hover:border-tertiaryred-50 transition-all duration-500`}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
