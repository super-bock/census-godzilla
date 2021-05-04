import 'swiper/swiper-bundle.css';
import '../css/styles.css';

import React, { useEffect, useState } from 'react';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper } from 'swiper/react';

import { drawChart } from '../helpers/Helpers';
import ReactDOM from 'react-dom';

//import "swiper/components/navigation/navigation.scss"; // Import Swiper styles
//import 'swiper/swiper.scss';
// install Swiper modules

type AnyObject = { [key: string]: any };

interface SummeryData {
	data: {
		race: AnyObject;
		education: AnyObject;
	};
  setShowDataContainer: React.Dispatch<React.SetStateAction<Boolean>>
}

SwiperCore.use([Navigation]);
const ChartSwiper = (props: SummeryData) => {
  const [raceChart, setRaceChart] = useState<AnyObject>();
  const [edChart, setEdChart] = useState<AnyObject>();

  useEffect(() => {
    if (props.data) {
      setRaceChart(drawChart(props.data.race, '#race-chart'));
      setEdChart(drawChart(props.data.education, '#education-chart'));
    }
  }, []);

  useEffect(() => {
    if (raceChart) {
      // Here we take steps to correct any errors in the data before we pass it to the chart
      const currentValue = Object.assign(
        {
          Asian: 0,
          Black: 0,
          Hispanic: 0,
          Other: 0,
          White: 0,
        },
        props.data.race
      );
      let totalCount = 0;
      for (const key in currentValue) {
        if (!currentValue[key]) currentValue[key] = 0; // Correct any null or undefined values
        totalCount += currentValue[key];
      }
      raceChart.update(currentValue);
      // If total count is zero, we're not graphing anything, so unmount the DataContainer
      if (totalCount === 0) props.setShowDataContainer(false);
    }

    if (edChart) {
      // Here we take steps to correct any errors in the data before we pass it to the chart
      const currentValue = Object.assign(
        {
          'Bachelor\'s': 0,
          'Graduate': 0,
          'High School': 0,
          'No Degree': 0,
          'Some College': 0,
        },
        props.data.education
      );
      for (const key in currentValue) {
        if (!currentValue[key]) currentValue[key] = 0;
      }
      edChart.update(currentValue);
    }
  }, [props.data]);

<<<<<<< HEAD
  //  useEffect(() => {
  //console.log(props.closeChart);
  //props.closeChart
  //? setRaceChart(null, "#race-chart")
  //: setRaceChart(drawChart(props.data.race, "#race-chart"));
  //  }, [props.closeChart]);

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 5011befb... Added Eslint, auto fixed errors
=======
>>>>>>> 73252f99... Feat: Legend
  if (props) {
    return (
      <React.Fragment>
        <Swiper
          id="main"
<<<<<<< HEAD
          //thumbs={{ swiper: thumbsSwiper }}
          //controller={{ control: controlledSwiper }}
<<<<<<< HEAD
          data-tag="section"
=======
=======
>>>>>>> 73252f99... Feat: Legend
          tag="section"
>>>>>>> 5011befb... Added Eslint, auto fixed errors
          wrapperTag="ul"
          navigation
          pagination
          spaceBetween={0}
          slidesPerView={1}
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
          onInit={(swiper) => console.log('Swiper initialized!', swiper)}
=======
>>>>>>> e338b863... Fix: DataContainer now renders only when ready
          onSlideChange={(swiper) => {
            console.log('Slide index changed to: ', swiper.activeIndex);
          }}
          onReachEnd={() => console.log('Swiper end reached')}
        >
          <div className="swiper-wrapper">
            <div className="swiper-slide" id="race-chart" key={1} data-tag="li">
              <div className="swiper-title">Ethnicity</div>
            </div>
            <div className="swiper-slide" id="education-chart" key={2} data-tag="li">
              {' '}
              <div className="swiper-title">Education</div>
            </div>
>>>>>>> 5011befb... Added Eslint, auto fixed errors
          </div>
        </Swiper>
      </React.Fragment>
    );
<<<<<<< HEAD
  }
  else return null;
=======
	if (props) {
		return (
			<React.Fragment>
				<Swiper
					id="main"
					//thumbs={{ swiper: thumbsSwiper }}
					//controller={{ control: controlledSwiper }}
					tag="section"
					wrapperTag="ul"
					navigation
					pagination
					spaceBetween={0}
					slidesPerView={1}
					onInit={(swiper) => console.log('Swiper initialized!', swiper)}
					onSlideChange={(swiper) => {
						console.log('Slide index changed to: ', swiper.activeIndex);
					}}
					onReachEnd={() => console.log('Swiper end reached')}
				>
					<div className="swiper-wrapper">
						<div className="swiper-slide" id="race-chart" key={1} data-tag="li">
							<div className="swiper-title">Ethnicity</div>
						</div>
						<div className="swiper-slide" id="education-chart" key={2} data-tag="li">
							{' '}
							<div className="swiper-title">Education</div>
						</div>
					</div>
				</Swiper>
			</React.Fragment>
		);
	} else return null;
>>>>>>> eaa37281... Fix: End of Saturday
=======
  } else return null;
>>>>>>> 5011befb... Added Eslint, auto fixed errors
};

export default ChartSwiper;
