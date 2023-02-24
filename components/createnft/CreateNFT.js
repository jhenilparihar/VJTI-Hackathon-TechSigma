import Input from "../common/Input";
import useInput from "@/hooks/use-input";
import { useState, useContext, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import ImageUpload from "../common/ImageUpload";
import BlockChainContext from "@/store/blockchain-context";

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
    console.log("hey", fileLink);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    blockChainCtx?.mintMyNFT(
      fileURL,
      nameInput?.enteredValue,
      priceInput?.enteredValue,
      descriptionInput
    );
    nameInput?.resetInputHandler();
    setImageInput("");
    priceInput?.resetInputHandler();
    setFileURL("");
    setDescriptionInput("");
    setDescriptionLength(0);
    // else {

    // }
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
              defaultImage={""}
              image={imageInput}
              onReset={resetImageInputHandler}
              className="h-[550px] w-full flex-shrink-0 space-y-8"
              imageDimensions="max-h-[450px] max-w-full"
              uploadBoxDimensions="h-[450px] w-full flex-shrink-0 space-y-10"
              onUploadToIPFS={uploadToIPFSHandler}
            />
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
            className="px-4 py-2 border-2 rounded-md border-tertiaryred-50 text-tertiaryred-50 text-base font-display font-semibold"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateNFT;
