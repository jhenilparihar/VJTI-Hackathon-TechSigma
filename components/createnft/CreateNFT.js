import Input from "../common/Input";
import useInput from "@/hooks/use-input";
import { useState, useContext, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import ImageUpload from "../common/ImageUpload";
import BlockChainContext from "@/store/blockchain-context";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import metamask from "../../public/metamask.gif";
import NFTAI from "./NFTAI";

const toolbarContainer = [
  ["bold", "italic", "underline"], // toggled buttons
  [{ align: [] }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ list: "ordered" }, { list: "bullet" }],
];

const ReactQuill = dynamic(import("react-quill"), { ssr: false });

function CreateNFT(props) {
  const [imageInput, setImageInput] = useState("");

  const blockChainCtx = useContext(BlockChainContext);

  const nameInput = useInput("", (name) => {
    return name?.length > 0;
  });

  const priceInput = useInput(0, (price) => {
    return price > 0;
  });

  const [descriptionInput, setDescriptionInput] = useState(
    props?.description || ""
  );

  const [descriptionDelta, setDescriptionDelta] = useState(
    props?.descriptionDelta || ""
  );

  const [descriptionLength, setDescriptionLength] = useState(
    props?.description?.length || 0
  );

  const [isDescriptionInputSelected, setIsDescriptionInputSelected] =
    useState(false);

  const [putForSaleInput, setPutForSaleInput] = useState(false);

  const [fileURL, setFileURL] = useState("");

  const [formHasError, setFormHasError] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const [isGeneratedAI, setIsGeneratedAI] = useState(false);

  const [ai, setAi] = useState(null);

  const router = useRouter();

  const imageInputChangeHandler = (newImage) => {
    setImageInput(newImage);
  };

  const resetImageInputHandler = () => {
    setImageInput("");
  };

  const putForSaleInputChangeHandler = (event) => {
    if (event.target.value === "Yes") {
      setPutForSaleInput(true);
    } else if (event.target.value === "No") {
      setPutForSaleInput(false);
    }
  };

  const uploadToIPFSHandler = async () => {
    const fileUploadResponse = await blockChainCtx?.uploadFileToIPFS(
      imageInput
    );
    const IPFS = fileUploadResponse?.value?.cid;
    const fileLink = `https://alchemy.mypinata.cloud/ipfs/${IPFS}/`;
    setFileURL(fileLink);
  };

  const closeModalHandler = () => {
    setIsGeneratedAI(false);
    setFileURL("");
    setAi("");
  };

  const publishAIHandler = async (ai) => {
    // let response = await fetch(ai?.src);
    // let data = await response.blob();    
    setImageInput(ai);
    setAi(ai);
    setIsGeneratedAI(false);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    await blockChainCtx?.mintMyNFT(
      fileURL,
      nameInput?.enteredValue,
      priceInput?.enteredValue,
      descriptionInput
    );
    setIsLoading(false);
    router.push("/explore");
  };

  useEffect(() => {
    const formIsValid =
      fileURL &&
      !nameInput?.inputHasError &&
      descriptionInput &&
      !priceInput?.inputHasError;
    setFormHasError(!formIsValid);
  }, [fileURL, nameInput, priceInput, descriptionInput]);

  return (
    <>
      {!isLoading && (
        <div className="px-16 pt-20 pb-10">
          <h2 className="py-4 border-b-2 border-tertiarygrey-400 font-semibold text-lg font-title">
            Create your NFT
          </h2>
          <form onSubmit={formSubmitHandler} className="space-y-2">
            <div className="flex space-x-10 pt-8">
              <div className="w-[35%]">
                <ImageUpload
                  onUpload={imageInputChangeHandler}
                  enableReset={true}
                  defaultImage={ai && ai}
                  image={imageInput}
                  onReset={resetImageInputHandler}
                  className="h-[400px] w-full flex-shrink-0 space-y-8"
                  imageDimensions="max-h-[400px] max-w-full"
                  uploadBoxDimensions="h-[400px] w-full flex-shrink-0 space-y-10"
                  onUploadToIPFS={uploadToIPFSHandler}
                />
                <button
                  type="button"
                  className="py-3 w-full text-center text-tertiaryred-50 border-2 border-tertiaryred-50 mt-[100px]"
                  onClick={() => {
                    setIsGeneratedAI(true);
                  }}
                >
                  Generate Via AI
                </button>
              </div>
              <div className="flex-grow flex-shrink-0 space-y-6">
                <Input
                  input={{
                    id: "name_input",
                    type: "text",
                    value: nameInput?.enteredValue,
                    onChange: nameInput?.valueChangeHandler,
                    onBlur: nameInput?.inputBlurHandler,
                    required: true,
                  }}
                  label="Item Name"
                />
                <Input
                  input={{
                    id: "price_input",
                    type: "number",
                    min: 0,
                    step: 0.01,
                    value: priceInput?.enteredValue,
                    onChange: priceInput?.valueChangeHandler,
                    onBlur: priceInput?.inputBlurHandler,
                    required: true,
                  }}
                  label="Item Price"
                />
                <div className="space-y-2 pt-1">
                  <label
                    htmlFor="description_input"
                    className={`text-sm font-normal text-tertiarygrey-400 font-title ${
                      isDescriptionInputSelected && "text-tertiaryred-50"
                    }`}
                  >
                    Item Description*
                  </label>
                  <ReactQuill
                    id="description_input"
                    className="h-64 mb-12 focus:border-tertiaryred-50"
                    // placeholder="Mention the roles & responsibilities here..."
                    theme="snow"
                    maxLength="1500"
                    onChange={(content, delta, source, editor) => {
                      setDescriptionInput(content);
                      setDescriptionLength(editor.getLength() - 1);
                      return setDescriptionDelta(editor.getContents());
                    }}
                    onFocus={() => {
                      setIsDescriptionInputSelected(true);
                    }}
                    onBlur={() => {
                      setIsDescriptionInputSelected(false);
                    }}
                    value={descriptionInput}
                    modules={{
                      toolbar: {
                        container: toolbarContainer,
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                disabled={formHasError}
                className={`px-4 py-2 border-2 rounded-md text-base font-display font-semibold mt-16 ${
                  (formHasError &&
                    "border-tertiarygrey-400 text-tertiarygrey-400") ||
                  "border-tertiaryred-50 text-tertiaryred-50"
                }`}
                type="submit"
              >
                Create
              </button>
            </div>
          </form>
          {isGeneratedAI && (
            <NFTAI
              onPublish={publishAIHandler}
              onCloseModal={closeModalHandler}
            />
          )}
        </div>
      )}
      {isLoading && (
        <div className="h-full w-full flex justify-center items-center">
          <img src={metamask?.src} className="h-[50%] object-center" />
        </div>
      )}
    </>
  );
}

export default CreateNFT;
