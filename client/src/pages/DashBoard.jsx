import Facilities from "./../components/DashBoard Stuff/facilities";
import ImageSlider from "./../components/DashBoard Stuff/ImageSlider";
import ToursNavigate from "../components/DashBoard Stuff/ToursNavigate";
import ToursStats from "../components/DashBoard Stuff/ToursStats";
import TrendingTours from "../components/DashBoard Stuff/TrendingTours";

function DashBoard() {
  return (
    <>
      <ImageSlider />
      <ToursNavigate />
      <TrendingTours />
      <Facilities />
      <ToursStats />
    </>
  );
}

export default DashBoard;
