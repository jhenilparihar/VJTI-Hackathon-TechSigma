import FeedPost from "@/components/createFeed/FeedPost";
import FeedSide from "@/components/createFeed/FeedSide";
import FollowPeople from "@/components/createFeed/FollowUsers";
import AllPost from "@/components/createFeed/AllFeed";
const Index = () => {
  return (
    <>
      <div className=" flex justify-between">
        <FeedSide></FeedSide>
        <FeedPost></FeedPost>
        <FollowPeople></FollowPeople>
      </div>
      <div className="flex justify-center items-center">
        <AllPost></AllPost>
      </div>
    </>
  );
};
export default Index;
