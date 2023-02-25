const GenericModal = (props) => {
  return (
    <div>
      <div
        className="bg-black h-full w-full absolute z-10 opacity-70 inset-0"
        onClick={props.closeModal}
      ></div>
      <div className={`absolute  z-50 top-[20%] left-[20%] bg-[#232323]   rounded-md ${props.className}`}>
        {props.children}
        <footer className="flex justify-end px-5 space-x-6 mb-5 font-semibold">
          <button className="bg-gradient-to-r from-red-300 to-red-600 w-[15%] py-1 rounded-full text-base " onClick={props.posHandler} disabled={props.disable}>{props.posText}</button>
          <button className="bg-gradient-to-l from-gray-200 via-gray-400 to-gray-600 w-[15%] py-1 rounded-full text-base "onClick={props.negHandler}>{props.negText}</button>
        </footer>
      </div>
    </div>
  );
};
export default GenericModal;
