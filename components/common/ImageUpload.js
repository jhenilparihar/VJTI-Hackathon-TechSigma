import { useState, createRef } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import ShakaPlayer from "shaka-player-react";
import "shaka-player/dist/controls.css";

function ImageUpload(props) {
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(props?.image);
  const [isPreviewImageHovered, setIsPreviewImageHovered] = useState(false);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDropAccepted: (acceptedFiles) => {
      imageUploadHandler(acceptedFiles);
    },
    accept: {
      "image/*": [".jpeg", ".png"],
      "video/*": [".mp4"],
      "audio/*": [".mp4"],
    },
    maxFiles: 1,
  });

  const imageUploadHandler = (acceptedFiles) => {
    setImageFile(acceptedFiles[0]);
    props?.onUpload(acceptedFiles[0]);
  };

  const openUploadDialogHandler = () => {
    open();
  };

  const resetImageHandler = () => {
    props?.onReset();
    setPreviewImage(props?.defaultImage);
  };

  const deleteImageHandler = () => {
    props?.onDelete();
  };

  useEffect(() => {
    const fileReader = new FileReader();
    if (imageFile == props?.image) {
      fileReader.onloadend = () => {
        setPreviewImage(fileReader.result);
      };
      fileReader.readAsDataURL(imageFile);
    } else {
      setPreviewImage(props?.image || "");
    }
  }, [imageFile, props?.image]);

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
          <p>Upload your image here!</p>
        </div>
      )}
      {previewImage && (
        <div
          className={`${props?.imageDimensions} relative`}
          onMouseOver={() => {
            setIsPreviewImageHovered(true);
          }}
          onMouseOut={() => {
            setIsPreviewImageHovered(false);
          }}
        >
          {isPreviewImageHovered && (
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
          )}
          <img
            src={previewImage}
            className="h-full w-full object-contain object-center"
          />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
