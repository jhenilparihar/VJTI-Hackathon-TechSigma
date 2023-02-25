import { useRouter } from "next/router";

const FeedSide = () => {
    const r=useRouter()
  return (
    <div className="bg-[#232323] w-[300px] h-[350px] my-[5%] mx-[5%]">
      <div className="">
        <img
          src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          className="w-full h-[100px]"
        ></img>
        <img
          src="https://blogs.airdropalert.com/wp-content/uploads/2021/12/Lazy-Lion-NFT-1005x1024.png"
          className="w-20 h-20 rounded-full absolute top-[130px] left-[12%] border-2 border-white"
        ></img>
        <div className="flex flex-col justify-center items-center text-xl font-semibold my-10">
          <p className=" ">21 NFT'S</p>
          <p className="text-sm my-2 text-tertiaryred-50">@par2222</p>
          <span className="text-tertiarygrey-50  text-sm px-2 text-center font-normal">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </span>
          <span className="text-white my-4 text-sm flex items-center cursor-pointer" onClick={()=>r.push('/profile/1')}>
          <p className="mx-2">  Complete My Profile</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff" width={10} height={10}>
              <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};
export default FeedSide;
