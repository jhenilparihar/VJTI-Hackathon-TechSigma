function CurrentBanner(props) {
  return (
    <div className="relative w-full h-[550px] flex justify-end">
      <img
        src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        className="w-full h-full absolute object-cover"
      />
      <div className="bg-gradient-to-r from-tertiaryblack-50 to-transperant absolute z-2 h-full w-full"></div>
      <div className="h-full w-full absolute z-5 font-display px-20 text-white flex flex-col justify-end">
        <div className="w-[40%] pb-14">
          <h2 className="text-3xl font-bold font-title ">
           CRYPTONAUT
          </h2>
          
          <div className="font-title text-lg mt-5">
            Explore the world of NFT's with US and and buy and sell NFT'S with us
          </div>
          <div className="mt-16 space-x-4">
            <button
              type="button"
              className="bg-none rounded-md font-medium px-4 py-2 border-2 border-tertiaryred-400 text-tertiaryred-400"
            >
              Live Auction
            </button>
            <button
              type="button"
              className="bg-none rounded-md font-medium px-4 py-2 border-2 border-white"
            >
              Create NFT's
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentBanner;
