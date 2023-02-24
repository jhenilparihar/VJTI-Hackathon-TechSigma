import identity from "../../public/images/identity2.png";
import funding2 from "../../public/images/funding2.png";

function Section3(props) {
  return (
    <div className="flex py-10 px-28 space-x-10 items-center">
      <div className="h-[575px] w-[60%] font-display">
        <div className="h-[27%] w-full flex space-x-8 items-center px-4">
          <div className="w-[20%] h-[80%] flex-shrink-0">
            <img
              src={identity?.src}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-title text-tertiaryred-50 font-medium">
              Verify your identity
            </h3>
            <div>
              Complete the identity verification process to secure your account
              and transactions.
            </div>
          </div>
        </div>
        <div className="h-[27%] w-full flex space-x-8 items-center px-4">
          <div className="w-[20%] h-[80%] flex-shrink-0">
            <img
              src={funding2?.src}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-title text-tertiaryred-50 font-medium">
              Fund your account
            </h3>
            <div>
              Add funds to your crypto account to start trading crypto. You can
              add funds with a variety of payment methods.
            </div>
          </div>
        </div>
      </div>
      <div className="h-[575px] w-[30%]">
        <img
          src="https://bin.bnbstatic.com/image/julia/new-hompage/portfolio-section.webp"
          className="h-full w-full object-contain object-center"
        />
      </div>
    </div>
  );
}

export default Section3;
