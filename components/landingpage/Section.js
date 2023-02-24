import Animation from "../common/Animation";

function Section(props) {
  const div = (
    <div className="space-y-2 w-[70%] h-[75%] flex flex-col justify-center">
      <h2 className="font-semibold text-[40px] text-tertiaryred-50">{props?.heading}</h2>
      <p className="text-[20px]">{props?.description}</p>
    </div>
  );

  const image = (
    <div className="w-[75%] h-[65%] flex items-center">
      <Animation animationData={props?.animationData} height={"70%"} width={"90%"} />
    </div>
  );

  return (
    <>
      {props?.imagePosition === "left" && (
        <div className="h-[450px] w-full px-20 grid grid-cols-2 gap-x-8 place-items-center">
          {image}
          {div}
        </div>
      )}
      {props?.imagePosition === "right" && (
        <div className="h-[450px] w-full px-20 grid grid-cols-2 gap-x-8 place-items-center">
          {div}
          {image}
        </div>
      )}
    </>
  );
}

export default Section;
