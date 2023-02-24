import { useContext, useEffect, useState } from "react";
import FeedPostComment from "./FeedPostComment";
import LinkPreview from "./LinkPreview";
import FeedPostUserDetail from "./FeedPostUserDetail";
import SmartGallery from "react-smart-gallery";
import ReactPlayer from "react-player";
import ShowMoreText from "./ShowMoreText";
import { ClassicSpinner } from "react-spinners-kit";
import { FeedContext } from "@/src/hooks/feed";
import LikeIcon from "@/public/images/icons/LikeIcon";
import LikedIcon from "@/public/images/icons/LikedIcon";
import ShareIcon from "@/public/images/icons/ShareIcon";
import CommentIcon from "@/public/images/icons/CommentIcon";
import FeedPostModal from "./FeedPostModal/FeedPostModal";
import { Utils } from "@/src/utils/utils";
import FeedShareButton from "./FeedShareButton";
import ReshareFeedPost from "../ReshareFeedPost/ReshareFeedPost";
import FeedPoll from "./FeedPoll";
import { DarkModeContext } from "@/src/hooks/DarkModeContext";
import { useTheme } from "next-themes";
import CommentLikedModal from "./CommentLikedModal";
import CommentEditor from "./CommentEditor";
import { useSmartEditor } from "@/src/hooks/editor";
import PostShareModal from "./PostShareModal";
import PostLikedModal from "./PostLikedModal";
import { toast } from "react-toastify";

const FeedPost = ({
  isActivityApi = false,
  isEmbedded = false,
  heightClass = "",
  feedList,
  setAllFeedData,
  allFeedData
}) => {
  const darkMode = useContext(DarkModeContext);
  const { theme } = useTheme();
  const feedContextValue = useContext(FeedContext);
  const feedPost = feedContextValue.data;

  const isDisabledButton = feedContextValue.isDisbledButton;
  const [isOpenCommentTextArea, setIsOpenCommentTextArea] = useState(false);

  const commentsIsLoading = feedContextValue.commentsIsLoading;
  // comment
  const [showCommentList, setShowCommentList] = useState(false);
  // modal
  // reshare modal
  const [isReshareModal, setIsReshareModal] = useState(false);
  // Like modal

  const [isLikeModalOpen, setIsLikeModalOpen] = useState(false);

  // Comment Like Modal
  const [isCommentLikeModalOpen, setIsCommentLikeModalOpen] = useState(false);
  const [commentLikeModalCommentId, setCommentLikeModalCommentId] =
    useState(false);

  const openCommentLikedModal = (commentId) => {
    setCommentLikeModalCommentId(commentId);
    setIsCommentLikeModalOpen(true);
  };

  // feed modal
  const [openFeedInModal, setOpenFeedInModal] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [isLikeClicked, setIsLikeClicked] = useState(false);

  const handleCloseOpenFeedModal = () => {
    setOpenFeedInModal(false);
  };

  useEffect(() => {
    setIsLikeClicked(false);
  }, [isDisabledButton]);

  // -------------------------------------------------------------------------------------------------
  // modal handle state
  const handleOpenReshareModal = () => {
    setIsReshareModal(true);
  };

  const handleOpenLikeModal = (post_id) => {
    setIsLikeModalOpen(true);
  };

  const handleCloseLikeModal = () => {
    setIsLikeModalOpen(false);
  };

  // -------------------------------------------------------------------------------------------------
  // comment textarea
  const editor = useSmartEditor({
    placeholder: "Add a comment...",
  });

  if (feedPost == null) {
    return <div />;
  }

  return (
    <>
      <div
        className={`mb-3 lg:rounded-md bg-white flex pt-4 flex-col ${
          !isEmbedded ? "border border-tertiary-250 " + heightClass : "h-full"
        }`}
      >
        <FeedPostUserDetail
          isActivityApi={isActivityApi}
          isEmbedded={isEmbedded}
          feedList={feedList}
          setAllFeedData={setAllFeedData}
          allFeedData={allFeedData}
        />
        <div className=" overflow-y-auto">
          {/* desc */}
          <div className="lg:mt-0.5 mt-1 px-3 md:px-5">
            <span className="text-sm ">
              <ShowMoreText description={feedPost?.description} />
            </span>
          </div>
          {/* photos ,video,repost,poll */}
          {feedPost?.reshare_post == null ? (
            <div>
              {feedPost?.is_poll ? (
                <FeedPoll />
              ) : (
                <div
                  className="mt-2 cursor-pointer"
                  onClick={() => {
                    setOpenFeedInModal(true);
                    if (feedContextValue.comments.length === 0)
                      feedContextValue.getComments();
                  }}
                  style={{
                    pointerEvents: !localStorage.getItem("token")
                      ? "none"
                      : "all",
                  }}
                >
                  {feedPost?.group_post_img?.length >= 1 && !isEmbedded ? (
                    <div className="smartGallery">
                      <SmartGallery
                        width="100%"
                        onImageSelect={(event, src, index) =>
                          setImageIndex(index)
                        }
                        images={feedPost?.group_post_img.map((obj) => {
                          return obj.post_image;
                        })}
                      />
                    </div>
                  ) : (
                    <>
                      {feedPost?.youtube_link != "undefined" &&
                        feedPost?.youtube_link != null &&
                        !isEmbedded && (
                        <div className="w-full relative">
                          <ReactPlayer
                            url={feedPost?.youtube_link}
                            width="100%"
                            height="360px"
                            controls={false}
                            pip={true}
                          />

                          <div
                            className="w-full h-[360px] absolute top-0 left-0"
                            onClick={() => {
                              setOpenFeedInModal(true);
                              if (feedContextValue.comments.length === 0)
                                feedContextValue.getComments();
                            }}
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="px-0 md:px-5 mt-3">
              <ReshareFeedPost isEmbedded={isEmbedded} />
            </div>
          )}
          {/* Link Preview */}

          {feedPost?.reshare_post == null &&
            !(feedPost?.group_post_img?.length >= 1) &&
            (feedPost?.youtube_link == "undefined" ||
              feedPost?.youtube_link == null) &&
            !feedPost?.is_poll &&
            feedPost?.link_description != null &&
            feedPost?.link_image != null &&
            feedPost?.link_title != null &&
            feedPost?.link_url != null &&
            feedPost?.link_domain != null &&

            (
              <LinkPreview
              /*  previewData={feedPost.link_preview} */
                content={feedPost?.link_description}
                image={feedPost?.link_image}
                title={feedPost?.link_title}
                url={feedPost?.link_url}
                domain={feedPost?.link_domain}
              />
            )}
            
          {/* -------------------------------------------------------------------------------------------------- */}
          {/* like.comment count */}
          <div className="flex justify-between px-3 md:px-5 pt-2">
            <div className="flex space-x-3 items-center">
              <span
                className="flex items-center cursor-pointer"
                onClick={() => {
                  if (!localStorage.getItem("token")) {
                    // toast('Please login.');
                    return;
                  }
                  handleOpenLikeModal(feedPost?.id);
                }}
                style={{
                  pointerEvents: localStorage.getItem("token") ? "all" : "none",
                }}
              >
                <LikedIcon />
                {feedPost?.like_on_group_post_count > 0 && (
                  <span className="lg:text-sm text-[11px] text-tertiary-550 ml-2 ">
                    {Utils.numberToRoman(feedPost?.like_on_group_post_count)}
                  </span>
                )}
              </span>
              <span className="text-tertiary-500 lg:text-sm text-[11px] ">
                &bull;
              </span>

              <span
                className="lg:text-sm text-[11px]  text-tertiary-550 cursor-pointer"
                onClick={() => {
                  if (feedContextValue.comments.length === 0)
                    feedContextValue.getComments();
                  setShowCommentList(true);
                }}
              >
                {Utils.numberToRoman(feedPost?.comment_on_group_post_count)}{" "}
                Comments
              </span>
            </div>
            <div>
              <span className="lg:text-sm text-[11px]  text-tertiary-550">
                {Utils.numberToRoman(feedPost?.view_count)} Views
              </span>
            </div>
          </div>
          <hr className="my-2 border-tertiary-20" />
          {/* -------------------------------------------------------------------------------------------------- */}
          {/* like comment button */}
          <div className="flex justify-around">
            <div>
              {feedPost?.like_post == null ? (
                <button
                  className={`${
                    (isDisabledButton || isLikeClicked) && "cursor-not-allowed"
                  } flex lg:flex-row flex-col items-center lg:items-end hover:bg-tertiary-300 p-1 rounded-lg `}
                  onClick={() => {
                    if (!localStorage.getItem("token")) {
                      toast("Please login to like this post.");
                      return;
                    }
                    setIsLikeClicked(true);
                    feedContextValue.likeFeed();
                    return;
                  }}
                  style={{
                    pointerEvents:
                      isDisabledButton || localStorage.getItem("token")
                        ? "all"
                        : "none",
                  }}
                  // disabled={isDisabledButton || !localStorage.getItem("token")}
                >
                  {theme === "dark" ? (
                    <LikeIcon stroke="#bebebe" />
                  ) : (
                    <LikeIcon />
                  )}
                  <span className="lg:text-sm text-xs font-semibold text-tertiary-650 lg:ml-2">
                    Like
                  </span>
                </button>
              ) : (
                <button
                  className={`${
                    (isDisabledButton || isLikeClicked) && "cursor-not-allowed"
                  } flex lg:flex-row flex-col items-center lg:items-end hover:bg-tertiary-300 p-1 rounded-lg `}
                  onClick={() => {
                    setIsLikeClicked(true);
                    feedContextValue.unlikeFeed();
                    return;
                  }}
                  disabled={isDisabledButton}
                >
                  <LikedIcon />
                  <span className="lg:text-sm text-xs font-semibold text-tertiary-650 lg:ml-2">
                    Liked
                  </span>
                </button>
              )}
            </div>
            <div>
              <button
                className="flex lg:flex-row flex-col items-center lg:items-end hover:bg-tertiary-300 p-1 rounded-lg "
                onClick={() => {
                  setIsOpenCommentTextArea(!isOpenCommentTextArea);
                  if (feedContextValue.comments.length === 0)
                    feedContextValue.getComments();
                  setShowCommentList(true);
                }}
              >
                {theme === "dark" ? (
                  <CommentIcon stroke="#bebebe" />
                ) : (
                  <CommentIcon />
                )}

                <span className="lg:text-sm text-xs font-semibold text-tertiary-650 lg:ml-2">
                  Comment
                </span>
              </button>
            </div>
            {feedPost?.reshare_post == null ? (
              <div>
                <button
                  onClick={() => handleOpenReshareModal()}
                  className="flex lg:flex-row flex-col items-center lg:items-end hover:bg-tertiary-300 p-1 rounded-lg "
                  style={{
                    pointerEvents: localStorage.getItem("token")
                      ? "all"
                      : "none",
                  }}
                >
                  {theme === "dark" ? (
                    <ShareIcon stroke="#bebebe" />
                  ) : (
                    <ShareIcon />
                  )}

                  <span className="lg:text-sm text-xs font-semibold text-tertiary-650 lg:ml-2">
                    Reshare
                  </span>
                </button>
              </div>
            ) : null}
            <div
              style={{
                pointerEvents: localStorage.getItem("token") ? "all" : "none",
              }}
            >
              <FeedShareButton slug={feedPost.slug} />
            </div>
          </div>
          {/* -------------------------------------------------------------------------------------------------- */}
          {/* comment text area */}
          {isOpenCommentTextArea && localStorage.getItem("token") && (
            <div className="mt-2 md:px-5 py-2 w-full">
              <CommentEditor showProfileImage={true} editor={editor} />

              {editor?.getCharacterCount() > 1 && (
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => {
                      feedContextValue.commentFeed(editor.getHTML());
                      setIsOpenCommentTextArea(false);
                      editor.commands.clearContent();
                    }}
                    className={`${
                      (editor.getCharacterCount() < 1 || isDisabledButton) &&
                      "cursor-not-allowed"
                    } text-sm bg-tertiary-50 hover:bg-tertiaryBlue-600 hover:text-whiteShade-10 text-gray-800 font-semibold py-1 px-4 border border-tertiary-20  rounded-full`}
                  >
                    Comment
                  </button>
                </div>
              )}
            </div>
          )}
          {/* -------------------------------------------------------------------------------------------------- */}
          {/* render comment */}
          {showCommentList && (
            <>
              {commentsIsLoading ? (
                <div className="flex justify-center my-2">
                  <ClassicSpinner color="#0a6096" />
                </div>
              ) : (
                <div>
                  {feedContextValue.comments.map((comment) => {
                    return (
                      <FeedPostComment
                        key={comment?.id}
                        comment={comment}
                        deleteComment={feedContextValue.deleteComment}
                        openCommentLikedModal={openCommentLikedModal}
                      />
                    );
                  })}
                  {feedContextValue.isMoreCommentsAvailable && (
                    <div className="mb-2">
                      <button
                        className=""
                        onClick={(e) => feedContextValue.getComments()}
                      >
                        Load more comments
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
          {/* no like & comment statement */}
          {feedPost?.like_on_group_post_count == 0 ? (
            <div
              className={`${
                isEmbedded ? "" : "bg-tertiary-350"
              } px-5 py-2 border-t border-tertiary-20 rounded-b-md mt-2`}
            >
              <span className="lg:text-sm text-xs text-tertiary-550 font-semibold">
                Mark your first impression by liking this post
              </span>
            </div>
          ) : (
            <>
              {feedPost?.comment_on_group_post_count == 0 ? (
                <div
                  className={`${
                    isEmbedded ? "" : "bg-tertiary-350"
                  } px-5 py-2 border-t border-tertiary-20 rounded-b-md mt-2`}
                >
                  <span className="lg:text-sm text-xs text-tertiary-550 font-semibold">
                    Mark your first impression by commenting on this post
                  </span>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
      <div>
        <FeedPostModal
          showFeedPostModal={openFeedInModal}
          handleCloseOpenFeedModal={handleCloseOpenFeedModal}
          imageIndex={imageIndex}
        />
      </div>

      <PostLikedModal
        isLikeModalOpen={isLikeModalOpen}
        setIsLikeModalOpen={setIsLikeModalOpen}
        feedPost={feedPost}
      />

      <CommentLikedModal
        setIsLikeModalOpen={setIsCommentLikeModalOpen}
        isLikeModalOpen={isCommentLikeModalOpen}
        commentId={commentLikeModalCommentId}
      />

      <PostShareModal
        feedPost={feedPost}
        isModalOpen={isReshareModal}
        setModalOpen={setIsReshareModal}
        reshareFeed={feedContextValue.reshareFeed}
      />
    </>
  );
};

export default FeedPost;
