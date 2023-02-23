import Carousel from "../common/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";

function TrendingNow(props) {
  return (
    <div className="mt-2 px-16 font-title">
      <div className="py-4 ml-4 border-b-2 border-tertiarygrey-400 flex justify-between items-center">
        <div className="text-2xl flex space-x-7 items-center">
          <FontAwesomeIcon icon={faArrowTrendUp} />
          <h2 className="font-medium">Trending Now</h2>
        </div>
        <p className="text-base">{`See All >`}</p>
      </div>
      <Carousel items={props?.items} />
    </div>
  );
}

export default TrendingNow;
