import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import React, { useState, useEffect } from "react";
import { drawChart } from "../helpers/Helpers";
import "swiper/swiper-bundle.css";
import "../css/styles.css";
//import "swiper/components/navigation/navigation.scss"; // Import Swiper styles
//import 'swiper/swiper.scss';
// install Swiper modules

type AnyObject = { [key: string]: any };

interface SummeryData {
  data: {
    race: AnyObject;
    education: AnyObject;
  }
}

SwiperCore.use([Navigation]);
const ChartSwiper = (props: SummeryData) => {
  const [raceChart, setRaceChart] = useState<AnyObject>();
  const [edChart, setEdChart] = useState<AnyObject>();

  useEffect(() => {
    if (props.data) {
      console.log("props", props);
      setRaceChart(drawChart(props.data.race, "#race-chart"));
      setEdChart(drawChart(props.data.education, "#education-chart"));
    }
  }, []);

  useEffect(() => {
    console.log("updating");
    if (raceChart && edChart) {
      console.log("updating2");
      raceChart.update(props.data.race);
      edChart.update(props.data.education);
    }
  }, [props.data]);

  //  useEffect(() => {
  //console.log(props.closeChart);
  //props.closeChart
  //? setRaceChart(null, "#race-chart")
  //: setRaceChart(drawChart(props.data.race, "#race-chart"));
  //  }, [props.closeChart]);

  if (props) {
    return (
      <React.Fragment>
        <Swiper
          id="main"
          //thumbs={{ swiper: thumbsSwiper }}
          //controller={{ control: controlledSwiper }}
          data-tag="section"
          wrapperTag="ul"
          navigation
          pagination
          spaceBetween={0}
          slidesPerView={1}
          onInit={(swiper) => console.log("Swiper initialized!", swiper)}
          onSlideChange={(swiper) => {
            console.log("Slide index changed to: ", swiper.activeIndex);
          }}
          onReachEnd={() => console.log("Swiper end reached")}
        >
          <div className="swiper-wrapper">
<<<<<<< HEAD:src/components/Swiper.js
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 8f0ef436... clean up
            <div className="swiper-slide" id="race-chart" key={1} tag="li">
=======
            <div className="swiper-slide" id="race-chart" key={1} data-tag="li">
>>>>>>> 4c613d8d... Feat: Refactor of Swiper, ReferenceData:src/components/Swiper.tsx
              <div className="swiper-title">Ethnicity</div>
            </div>
            <div className="swiper-slide" id="education-chart" key={2} data-tag="li">
              {" "}
              <div className="swiper-title">Education</div>
            </div>
<<<<<<< HEAD
=======
            <div
              className="swiper-slide"
              id="race-chart"
              key={1}
              tag="li"
            ></div>
            <div
              className="swiper-slide"
              id="education-chart"
              key={2}
              tag="li"
            ></div>
>>>>>>> e6c28ef7... ed an race data in
=======
>>>>>>> 8f0ef436... clean up
          </div>
        </Swiper>
      </React.Fragment>
    );
  }
  else return null;
};

export default ChartSwiper;
