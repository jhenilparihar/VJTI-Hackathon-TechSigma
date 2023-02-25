const Post = (props) => {
  return (
    <div className=" bg-[#232323] h-[700px] w-[600px] my-10 py-4 px-5  ">
      <div className="flex items-center px-4">
        <img
          src={props.user_image}
          className="w-[50px] h-[50px] rounded-full border-2 border-white"
        ></img>
        <div className="flex flex-col mx-4">
          <p className="text-white text-sm ">{props.username}</p>
          <p className="text-tertiarygrey-250 text-xs">{props.user_des}</p>
        </div>
      </div>
      <div className="">
        <p className="text-sm px-6 py-2 my-3">{props.post_des}</p>
        <div className="flex items-center justify-center">
          <img className="w-[95%] h-[500px]" src={props.post_image}></img>
        </div>
      </div>
    </div>
  );
};
export default Post;
