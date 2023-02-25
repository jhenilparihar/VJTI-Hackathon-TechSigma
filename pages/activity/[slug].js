import Header from "@/components/profileHeader/Header";
import UserGraph from "@/components/activity/UserGraph";
import SellGraph from "@/components/activity/SellGraph";
import ActivityList from "@/components/activity/ActivityList";
import GenericModal from "@/components/common/GenericModal";
import { useState } from "react";
import { useRouter } from "next/router";
const Index = () => {
  const [modal, setModal] = useState(false);
  const router=useRouter()
  const accountAddress=router.query.slug

  return (
    <>
   
      <Header accountAddress={accountAddress}></Header>
      <div>
        <h1 className="text-center text-xl font-bold font-Heading my-4 flex space-x-2 justify-center items-center">
          <span className="text-tertiaryred-50 text-lg ">@par2222's</span>{" "}
         <span>Activity</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={20} height={20} fill="#fff" className="cursor-pointer" onClick={()=>setModal(true)}>
            <path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z" />
          </svg>
        </h1>
      </div>
      <div className="flex justify-between items-center">
        <div className="w-[50%] px-10 my-10">
          <UserGraph></UserGraph>
        </div>
        <div className="w-[50%] px-10 my-10">
          <SellGraph></SellGraph>
        </div>
      </div>
      {modal && (
        <GenericModal
          posText="OK"
          negText="Cancel"
          negHandler={() => setModal(false)}
          posHandler={() => setModal(false)}
          className="h-[50%] w-[50%] top-[25%] left-[25%]"
        >
          <ActivityList></ActivityList>
        </GenericModal>
      )}
    </>
  );
};
export default Index;
