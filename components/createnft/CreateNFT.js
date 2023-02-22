import Input from "../common/Input";
import useInput from "@/hooks/use-input";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";

const toolbarContainer = [
  ["bold", "italic", "underline"], // toggled buttons
  [{ align: [] }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ list: "ordered" }, { list: "bullet" }],
];

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

function CreateNFT(props) {
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

  const [putForSaleInput, setPutForSaleInput] = useState(false);

  const putForSaleInputChangeHandler = (event) => {
    if (event.target.value === "Yes") {
      setPutForSaleInput(true);
    } else if (event.target.value === "No") {
      setPutForSaleInput(false);
    }
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <div className="px-16 pt-20">
      <h2 className="py-4 border-b-2 border-tertiarygrey-400">
        Create your NFT
      </h2>
      <form onSubmit={formSubmitHandler}>
        <div className="flex space-x-10">
          <div className="w-[50%]">
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
          </div>
          <div className="w-[50%]">
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
          </div>
        </div>
        <ReactQuill
          id="description_input"
          className="h-64 mb-12"
          // placeholder="Mention the roles & responsibilities here..."
          theme="snow"
          maxLength="1500"
          onChange={(content, delta, source, editor) => {
            setDescriptionInput(content);
            setDescriptionLength(editor.getLength() - 1);
            return setDescriptionDelta(editor.getContents());
          }}
          value={descriptionInput}
          modules={{
            toolbar: {
              container: toolbarContainer,
            },
          }}
        />
      </form>
    </div>
  );
}

export default CreateNFT;
