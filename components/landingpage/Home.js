import MainScreen from "./MainScreen";
import Section from "./Section";

function Home(props) {
  return (
    <>
      <MainScreen />
      <div className="h-[10px] w-full bg-tertiarygrey-670"></div>
      <Section
        image="https://img.freepik.com/free-photo/ai-cloud-concept-with-robot-face_23-2149739753.jpg?size=626&ext=jpg&uid=R63965761&ga=GA1.2.1046262473.1674666620&semt=ais"
        heading="NFT Generator AI"
        description="This AI will automatically create a digital art for which an NFT can be created."
        imagePosition="right"
      />
      <div className="h-[10px] w-full bg-tertiarygrey-670"></div>
      <Section
        image="https://img.freepik.com/free-photo/ai-cloud-concept-with-robot-face_23-2149739753.jpg?size=626&ext=jpg&uid=R63965761&ga=GA1.2.1046262473.1674666620&semt=ais"
        heading="NFT Generator AI"
        description="This AI will automatically create a digital art for which an NFT can be created."
        imagePosition="left"
      />
      <div className="h-[10px] w-full bg-tertiarygrey-670"></div>
      <Section
        image="https://img.freepik.com/free-photo/ai-cloud-concept-with-robot-face_23-2149739753.jpg?size=626&ext=jpg&uid=R63965761&ga=GA1.2.1046262473.1674666620&semt=ais"
        heading="NFT Generator AI"
        description="This AI will automatically create a digital art for which an NFT can be created."
        imagePosition="right"
      />
    </>
  );
}

export default Home;
