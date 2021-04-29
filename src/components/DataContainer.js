//backend bug calculating share in age data
import "../css/dataContainer.css";
import "../css/styles.css";
import React, { useState, useEffect } from "react";
import ChartSwiper from "./Swiper";
import { fetchCensusData, createChartRequest } from "../helpers/Helpers";
import { edVars, raceVars, CensusSummary } from "../data/ReferenceData.js";

<<<<<<< HEAD
<<<<<<< HEAD
const createSummaryData = (data, varMap, sumVars, reCalc) => {
  const summary = new CensusSummary(data, varMap);
  if (!reCalc) summary.mapDataToDescriptor();
=======
const ZcreateSummaryData = (data, varMap, sumVars) => {
  const summary = new CensusSummary(data, varMap);
  summary.mapDataToDescriptor();
  Object.entries(sumVars).forEach(([key, valArr]) => {
    console.log(key, valArr);
    summary.sumDataVars(valArr, key);
    summary.delDataVars(valArr);
    console.log("manip sum", summary);
  });
  summary.calcAverage();
  return summary;
};

const createSummaryData = (data, varMap, sumVars) => {
  const summary = new CensusSummary(data, varMap);
  summary.mapDataToDescriptor();
>>>>>>> e6c28ef7... ed an race data in
=======
const createSummaryData = (data, varMap, sumVars, reCalc) => {
  const summary = new CensusSummary(data, varMap);
  if (!reCalc) summary.mapDataToDescriptor();
>>>>>>> 52e2c31f... fixed some css
  summary.getTotals();
  Object.entries(sumVars).forEach(([key, valArr]) => {
    summary.sumShares(valArr, key);
    console.log("totals", summary.totals, summary.shares);
  });

  return summary;
};

const DataContainer = (props) => {
  const [summary, setSummary] = useState({ race: null, education: null });
  const [data, setData] = useState({});
  const [closeChart, setCloseChart] = useState(false);

  // const handleClick = () => { //FIXME: This seems to be unnecessary
  //   closeChart ? setCloseChart(true) : setCloseChart(false);
  //   console.log(closeChart)
  // };

  useEffect(() => {
    console.log("fetching data");
    const raceTables = Object.keys(raceVars).map((item) => item.split("_")[1]);
    const raceRequest = createChartRequest("B03002", raceTables);
    const edTables = Object.keys(edVars).map((item) => item.split("_")[1]);
    const edRequest = createChartRequest("C15003", edTables);

    fetchCensusData(raceRequest).then((result) => {
      const raceSummary = createSummaryData(result.geoIdValue, raceVars, {
        Other: ["Native", "Pacific", "Multi", "Other"],
      });
      delete raceSummary.shares["Total"];
      setData((prevData) => ({ ...prevData, race: raceSummary.data }));
      setSummary((prevData) => ({ ...summary, race: raceSummary.shares }));
    });

    fetchCensusData(edRequest).then((result) => {
      const edSummary = createSummaryData(result.geoIdValue, edVars, {
        "High School": ["High School", "GED"],
        "Some College": ["1 Y College", "1+ Y College", "Associates"],
        Graduate: ["Master's", "Professional", "Doctorate"],
      });
      edSummary.shares["No Degree"] =
        edSummary.shares["Total"] -
        edSummary.shares["High School"] -
        edSummary.shares["Some College"] -
        edSummary.shares["Graduate"] -
        edSummary.shares["Bachelor's"];
      delete edSummary.shares["Total"];
      setData((prevData) => ({ ...prevData, education: edSummary.data }));
      setSummary((prevData) => ({
        ...prevData,
        education: edSummary.shares,
      }));
    });
  }, []); // TODO React Hook UesEffect has a missing dependency 'summary'

  console.log("data", data);
  useEffect(() => {
    if (props.onScreen) {
      const onScreenGeoIDs = [];
      for (let item of props.onScreen) {
        const geoId = item.properties.GEO_ID.split("US")[1];
        onScreenGeoIDs.push(geoId);
      }
      const onScreenRace = Object.assign(
        ...onScreenGeoIDs.map((key) => ({
          [key]: data.race[key],
        }))
      );

      const onScreenEd = Object.assign(
        ...onScreenGeoIDs.map((key) => ({
          [key]: data.education[key],
        }))
      );

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 52e2c31f... fixed some css
      const raceSummary = createSummaryData(
        onScreenRace,
        raceVars,
        {
          Other: ["Native", "Pacific", "Multi", "Other"],
        },
        true
      );
      delete raceSummary.shares["Total"];
      setSummary((prevData) => ({ ...prevData, race: raceSummary.shares }));
<<<<<<< HEAD

      const edSummary = createSummaryData(
        onScreenEd,
        edVars,
        {
          "High School": ["High School", "GED"],
          "Some College": ["1 Y College", "1+ Y College", "Associates"],
          Graduate: ["Master's", "Professional", "Doctorate"],
        },
        true
      );
      edSummary.shares["No Degree"] =
        edSummary.shares["Total"] -
        edSummary.shares["High School"] -
        edSummary.shares["Some College"] -
        edSummary.shares["Graduate"] -
        edSummary.shares["Bachelor's"];
      delete edSummary.shares["Total"];
      setSummary((prevData) => ({ ...prevData, education: edSummary.shares }));
    }
  }, [props.onScreen]);

  return summary.race && summary.education && props.onScreen ? (
=======
      const raceSum = new CensusSummary(onScreenRace);
      raceSum.calcAverage();
      setSummary((prevData) => ({ ...prevData, race: raceSum.shares }));
=======
>>>>>>> 52e2c31f... fixed some css

      const edSummary = createSummaryData(
        onScreenEd,
        edVars,
        {
          "High School": ["High School", "GED"],
          "Some College": ["1 Y College", "1+ Y College", "Associates"],
          Graduate: ["Master's", "Professional", "Doctorate"],
        },
        true
      );
      edSummary.shares["No Degree"] =
        edSummary.shares["Total"] -
        edSummary.shares["High School"] -
        edSummary.shares["Some College"] -
        edSummary.shares["Graduate"] -
        edSummary.shares["Bachelor's"];
      delete edSummary.shares["Total"];
      setSummary((prevData) => ({ ...prevData, education: edSummary.shares }));
    }
  }, [props.onScreen]);

<<<<<<< HEAD
  return summary.race && summary.education ? (
>>>>>>> e6c28ef7... ed an race data in
=======
  return summary.race && summary.education && props.onScreen ? (
>>>>>>> 8f0ef436... clean up
    <div id="dataContainer" className="dataContainer">
      <ChartSwiper data={summary} />
    </div>
  ) : (
    "Data is loading"
  );
};

export default DataContainer;
