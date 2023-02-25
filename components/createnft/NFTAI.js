import GenericModal from "../common/GenericModal";
import { useState } from "react";
import astronaut from "../../public/images/astronaut.jpg";
import tree from "../../public/images/tree.jpg";
import sun from "../../public/images/sun-rise.jpg";
import night from "../../public/images/night.jpg";

function NFTAI(props) {
  const [generatedImage, setGeneratedImage] = useState(null);
  const [enteredValue, setEnteredValue] = useState("");

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const bg =
    "https://img.freepik.com/free-vector/realistic-samurai-illustrated-background_52683-69460.jpg?w=1060&t=st=1677275877~exp=1677276477~hmac=6c2ea3be9285ab1739f27ffa14080a88d0f50ec1c36380d68957e2ec497f4878";

  // console.log(astronaut)

  const generateImageHandler = () => {
    if (enteredValue.includes("astronaut")) {
      setGeneratedImage(astronaut);
    } else if (enteredValue.includes("tree")) {
      setGeneratedImage(tree);
    } else if (enteredValue.includes("sun")) {
      setGeneratedImage(sun);
    } else if (enteredValue.includes("night")) {
      setGeneratedImage(night);
    }
  };

  return (
    <GenericModal
      className="h-[550px] w-[800px] "
      posText="Publish"
      negText="Cancel"
      posHandler={() => {
        props?.onPublish(generatedImage);
      }}
      negHandler={props?.onCloseModal}
      onCloseModal={props?.onCloseModal}
    >
      <div
        className={`h-full rounded-tl-lg rounded-tr-lg `}
        style={{
          backgroundImage: `url(${
            (generatedImage && generatedImage?.src) || bg
          })`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {/* <img
          className=" h-full w-[50%] object-cover object-center "
          src="https://img.freepik.com/free-vector/realistic-samurai-illustrated-background_52683-69460.jpg?w=1060&t=st=1677275877~exp=1677276477~hmac=6c2ea3be9285ab1739f27ffa14080a88d0f50ec1c36380d68957e2ec497f4878"
        /> */}
        {/* <div className="h-full w-full absolute z-70 bg-black bg-opacity-20 -bottom-[100%]"></div>
        <div className="h-full w-full absolute z-100 font-title flex justify-center items-center"> */}
        <div className="w-[50%] flex flex-col justify-center items-start space-y-6 py-10 px-14">
          <div className="text-[30px] font-bold ">
            Create Beautiful Art with our AI NFT Generator{" "}
          </div>
          <input
            type="text"
            value={enteredValue}
            onChange={valueChangeHandler}
            className="rounded-md w-full h-[50px] bg-tertiarygrey-670 px-4"
          />
          <button
            onClick={generateImageHandler}
            type="button"
            className="w-full text-center py-3 bg-tertiarygrey-670 text-tertiaryred-50 rounded-md border-2 border-tertiaryred-50"
          >
            Generate
          </button>
        </div>
      </div>
      {/* </div> */}
    </GenericModal>
  );
}

export default NFTAI;
