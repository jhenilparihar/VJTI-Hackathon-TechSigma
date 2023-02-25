const FeedPost = () => {
  return (
    <div className="bg-[#232323] w-[700px] h-[100px]  my-[5%] mx-[0%] px-3 rounded-md ">
      <p className="pt-4 text-tertiarygrey-450 text-base px-4">
        Create a post ...
      </p>
      <div className="flex justify-between">
        <span className=" text-tertiaryorange-100 flex items-center text-base py-3 font-Heading">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="#ff7400"
            width={20}
            height={20}
            className="mx-2"
          >
            <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
          </svg>
          Image
        </span>
        <span className=" text-tertiarypurple-400 flex items-center text-base py-3 font-Heading">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width={20}
            height={20}
            className="mx-2"
            fill="#8800c7"
          >
            <path d="M256 80C149.9 80 62.4 159.4 49.6 262c9.4-3.8 19.6-6 30.4-6c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48c-44.2 0-80-35.8-80-80V384 336 288C0 146.6 114.6 32 256 32s256 114.6 256 256v48 48 16c0 44.2-35.8 80-80 80c-26.5 0-48-21.5-48-48V304c0-26.5 21.5-48 48-48c10.8 0 21 2.1 30.4 6C449.6 159.4 362.1 80 256 80z" />
          </svg>
          Audio
        </span>
        <span className="flex items-center text-base py-3 font-Heading">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width={20} height={20} fill="#fff" className="mx-2">
            <path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z" />
          </svg>
          Video
        </span>
      </div>
    </div>
  );
};
export default FeedPost;
