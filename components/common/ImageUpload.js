import { useState, createRef } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

function ImageUpload(props) {
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(props?.image);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDropAccepted: (acceptedFiles) => {
      imageUploadHandler(acceptedFiles);
    },
    accept: props?.acceptExtension,
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
    <div className={`flex-grow flex flex-col space-y-5 ${props?.className}`}>
      {!previewImage && (
        <div
          {...getRootProps()}
          className="h-full flex flex-col justify-center items-center space-y-6 cursor-pointer border-2 border-black border-dashed text-base"
        >
          <input {...getInputProps()} />
          <FontAwesomeIcon icon={faUpload} />
          <p>Upload your image here!</p>
        </div>
      )}
      {previewImage && (
        <img
          src={previewImage}
          className={`${props?.imageDimensions}`}
        />
      )}
      <div className="flex items-center space-x-3">
        <button
          type="button"
          disabled={!previewImage}
          onClick={openUploadDialogHandler}
          className={`px-4 py-2 rounded-md text-white ${
            previewImage ? "bg-indigo-700" : "bg-slate-500"
          }`}
        >
          Upload Another
        </button>
        {props?.enableReset && (
          <button
            type="button"
            disabled={previewImage === props?.image}
            onClick={resetImageHandler}
            className={`px-4 py-2 rounded-md text-white ${
              previewImage !== props?.image ? "bg-red-600" : "bg-slate-500"
            }`}
          >
            Reset
          </button>
        )}
        {props?.enableDelete && (
          <button
            type="button"
            onClick={deleteImageHandler}
            className={`px-4 py-2 rounded-md text-white ${
              previewImage ? "bg-red-600" : "bg-slate-500"
            }`}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
