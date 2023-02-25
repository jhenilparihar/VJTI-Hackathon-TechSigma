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
      <div className="flex items-center justify-between">
        <span className="flex px-2 my-5"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height={20} width={20} className="mx-3" fill="#fff "><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>3 Likes</span>
        <span className="flex items-center">{5+" "+ "Comments"}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height={20} width={20} fill="#fff" className="mx-3"><path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"/></svg></span>
      </div>
    </div>
  );
};
export default Post;
