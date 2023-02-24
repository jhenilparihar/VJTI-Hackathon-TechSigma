import FeedPost from "@/src/components/reuseable/FeedPost/FeedPost";
import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { FeedProvider } from "@/src/components/feed/FeedProvider";
import { HomeFeedContext } from "@/src/hooks/home";
import { useTheme } from "next-themes";
import { config } from "process";

const AllFeed = ({ newFeed, setNewFeed }) => {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [allFeedData, setAllFeedData] = useState(null);
  const [hasMoreData, setHasMoreData] = useState(false);
  const [currentPageNumber, setCurrentPageNumber] = useState(-1);
  const [totalPages, setTotalPages] = useState(0);

  const userId = localStorage?.getItem("id");

  const fetchData = async () => {
    try {
      const result = await axios(
        `https://app-a64l3uuv6q-uc.a.run.app/api/mynetwork/common-post-poll-feed?id=${userId}&page=${
          currentPageNumber + 1
        }`
      );
      setCurrentPageNumber((prevPage) => {
        return prevPage + 1;
      });
      if (allFeedData?.payload) {
        setAllFeedData((prevData) => {
          const newData = {
            ...result.data,
            payload: [...prevData.payload, ...result.data.payload],
          };
          return newData;
        });
        return;
      }
      setAllFeedData(result?.data);
      setTotalPages(Math.ceil(result?.data?.count / 5));
    } catch (err) {}
  };

  // const changePage = () => {
  //   setCurrentPageNumber((prevPage) => {
  //     return prevPage + 1;
  //   });
  // };

  useEffect(() => {
    setIsLoading(true);
    fetchData().then(() => {
      setIsLoading(false);
    });
  }, []);
  // --------------------------------------------------------------------------------------------------------------
  // scroll more
  useEffect(() => {
    if (allFeedData != null) {
      setHasMoreData(currentPageNumber < totalPages - 1 ? true : false);
    }
  }, [allFeedData, currentPageNumber, totalPages]);

  const removeFeed = (id: number) => {
    const index = allFeedData?.payload.findIndex((feed) => feed.id === id);
    setAllFeedData((prevData) => {
      const newData = { ...prevData };
      newData?.payload?.splice(index, 1);
      return newData;
    });
  };

  const addFeed = (id: number, slug: string) => {
    setAllFeedData((prevData) => {
      const newData = {
        ...prevData,
        payload: [{ id, slug }, ...prevData?.payload],
      };
      return newData;
    });
  };

  useEffect(() => {
    if (!newFeed) return;
    addFeed(newFeed.id, newFeed.slug);
    setNewFeed(null);
  }, [newFeed]);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center my-2">
          <ClassicSpinner color="#0a6096" />
        </div>
      ) : (
        <div>
          {allFeedData?.payload?.length > 0 ? (
            <HomeFeedContext.Provider value={{ removeFeed, addFeed }}>
              <InfiniteScroll
                dataLength={allFeedData?.payload?.length}
                next={fetchData}
                hasMore={hasMoreData}
                style={{ overflow: "visible" }}
                loader={
                  <div className="flex justify-center my-2">
                    <ClassicSpinner color="#0a6096" />
                  </div>
                }
              >
                {allFeedData?.payload?.map((data, index) => {
                  return (
                    <FeedProvider key={data.id} id={data.id} slug={data.slug}>
                      <FeedPost
                        isActivityApi={false}
                        feedList={allFeedData?.payload}
                        setAllFeedData={setAllFeedData}
                        allFeedData={allFeedData}
                      />
                    </FeedProvider>
                  );
                })}
              </InfiniteScroll>
            </HomeFeedContext.Provider>
          ) : (
            <div className="">
              {console.log("fghdjks", allFeedData?.results)}
              <div className="bg-tertiary-250 hidden lg:block">
                <div
                  className="bg-white "
                  style={{
                    backgroundImage:
                      theme === "dark"
                        ? "url( /images/empty_state_images/globalSearch/DarkPosts.svg)"
                        : "url(/images/empty_state_images/globalSearch/Posts.svg)",
                    width: "575px",
                    height: "575px",
                    backgroundSize: "350px 450px",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "end",
                  }}
                >
                  <div className=" mb-40 text-center ">
                    <p className="text-2xl text-blackShade-50 font-semibold text-center">
                      You have no post to show in feed
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white flex justify-center lg:hidden w-full">
                <div
                  className="bg-white mb-12 "
                  style={{
                    backgroundImage:
                      theme === "dark"
                        ? "url( /images/empty_state_images/globalSearch/DarkPosts.svg)"
                        : "url(/images/empty_state_images/globalSearch/Posts.svg)",
                    width: "300px",
                    height: "300px",
                    backgroundSize: "200px 300px",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "end",
                  }}
                >
                  <div className=" mb-8 text-center ">
                    <p className="text-lg text-blackShade-50 font-semibold text-center">
                      You have no post to show in feed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllFeed;
