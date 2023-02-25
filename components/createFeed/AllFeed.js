import Post from "./Post";
const AllFeed = () => {
  const AllPost = [
    {
      user_image:
        "https://i.seadn.io/gae/TDT7gFhSaCkqH4HboVGNm2HYhlO9ma4QYs5N4ESqouce4QddEz-Uy07gmxZKIQaHvqFGg5nJNYCMBsuifpH4FpB2KEehYjzaifFybVc?auto=format&w=1000",
      username: "@par2222",
      post_image: "https://free4kwallpapers.com/uploads/originals/2022/03/28/one-piece-for-desktop-thousand-sunny-ship-ocean-clouds-artwork-wallpaper.jpg",
      post_des: "Hey friends watch my NEW NFT",
      user_des: "A new NFT collecter",
    },
    {
      user_image:
        "https://i.seadn.io/gae/TDT7gFhSaCkqH4HboVGNm2HYhlO9ma4QYs5N4ESqouce4QddEz-Uy07gmxZKIQaHvqFGg5nJNYCMBsuifpH4FpB2KEehYjzaifFybVc?auto=format&w=1000",
      username: "@par2222",
      post_image: "https://free4kwallpapers.com/uploads/originals/2022/03/28/one-piece-for-desktop-thousand-sunny-ship-ocean-clouds-artwork-wallpaper.jpg",
      post_des: "Hey friends watch my NEW NFT",
      user_des: "A new NFT collecter",
    },
    {
      user_image:
        "https://i.seadn.io/gae/TDT7gFhSaCkqH4HboVGNm2HYhlO9ma4QYs5N4ESqouce4QddEz-Uy07gmxZKIQaHvqFGg5nJNYCMBsuifpH4FpB2KEehYjzaifFybVc?auto=format&w=1000",
      username: "@par2222",
      post_image: "https://free4kwallpapers.com/uploads/originals/2022/03/28/one-piece-for-desktop-thousand-sunny-ship-ocean-clouds-artwork-wallpaper.jpg",
      post_des: "Hey friends watch my NEW NFT",
      user_des: "A new NFT collecter",
    },
    {
      user_image:
        "https://i.seadn.io/gae/TDT7gFhSaCkqH4HboVGNm2HYhlO9ma4QYs5N4ESqouce4QddEz-Uy07gmxZKIQaHvqFGg5nJNYCMBsuifpH4FpB2KEehYjzaifFybVc?auto=format&w=1000",
      username: "@par2222",
      post_image: "https://free4kwallpapers.com/uploads/originals/2022/03/28/one-piece-for-desktop-thousand-sunny-ship-ocean-clouds-artwork-wallpaper.jpg",
      post_des: "Hey friends watch my NEW NFT",
      user_des: "A new NFT collecter",
    },
  
  
  ];
  return (
    <div className="translate-y-[-350px]">
      {AllPost.map((p) => (
        <Post {...p}></Post>
      ))}
    </div>
  );
};
export default AllFeed;
