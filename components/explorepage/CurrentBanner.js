function CurrentBanner(props) {
  return (
    <div className="relative w-full h-[550px] flex justify-end">
      <img
        src="https://i.pinimg.com/736x/af/75/03/af75034ad4d919f968cf69e841b15ffa.jpg"
        className="w-full h-full absolute object-cover"
      />
      <div className="bg-gradient-to-r from-tertiaryblack-50 to-transperant absolute z-2 h-full w-full"></div>
      <div className="h-full w-full absolute z-5 font-display px-20 text-white flex flex-col justify-end">
        <div className="w-[40%] pb-14">
          <h2 className="text-3xl font-bold font-title">
            HOW TO TRAIN YOUR DRAGON
          </h2>
          <div className="flex space-x-4 text-sm mt-2">
            <p>4.3</p>
            <p>|</p>
            <p>4 days ago</p>
          </div>
          <div className="font-title text-lg mt-12">
            The story follows a young Viking named Hiccup who trains to fight
            dragons in order to protect his town from their constant attacks;
            but secretly he nurses an injured dragon back to health and
            discovers that they're not the furious beasts that he once thought
            they were.
          </div>
          <div className="mt-16 space-x-4">
            <button
              type="button"
              className="bg-none rounded-md font-medium px-4 py-2 border-2 border-tertiaryred-400 text-tertiaryred-400"
            >
              Check
            </button>
            <button
              type="button"
              className="bg-none rounded-md font-medium px-4 py-2 border-2 border-white"
            >
              Add to favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentBanner;
