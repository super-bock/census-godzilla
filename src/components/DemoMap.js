import React, { createRef, useState, useEffect } from "react";
import { Map, TileLayer, Popup, GeoJSON, ZoomControl } from "react-leaflet";
<<<<<<< HEAD
=======
=======
import React, { Component } from "react";
import { 
  Map, 
  TileLayer, 
  CircleMarker, 
  Popup,
  GeoJSON
} from "react-leaflet";
>>>>>>> 2ff3dc9f... initial commit
>>>>>>> ef8061a4... local data source
import {
  attribution,
  tileUrl,
  defaultMapState,
  colorRange,
} from "../utils/Utils";
import {
  addData,
  getIntersect,
  coordsToJSON,
  createRequest,
  fetchCensusData,
  avgObjects,
  drawChart,
} from "../helpers/Helpers";
import { censusRace } from "../data/ReferenceData.js";
import { scaleQuantile } from "d3-scale";
import DemoMapTooltip from "./DemoMapTooltip";
import DataContainer from "./DataContainer";
import "leaflet/dist/leaflet.css";
import US_counties from "../data/US_counties_5m";
//import US_tracts from "../data/";
import Legend from "./Legend";
import { polygon } from "@turf/turf";

const TitleBlock = ({ title }) => <div className="info title">{title}</div>;

//need to deal w negative values in data
const DemoMap = (props) => {
  const testing = false;

  const [isLoaded, setIsLoaded] = useState();
  const [items, setItems] = useState();
  const [variables, setVariables] = useState();
  const [mapVariable, setMapVariable] = useState();
  const [groupInfo, setGroupInfo] = useState();
  const [colorScale, setColorScale] = useState();
  const [quantiles, setQuantiles] = useState();
  const [error, setError] = useState();
  const [onScreen, setOnScreen] = useState();

  const mapRef = createRef();
  const layerRef = createRef();

  const handleMove = () => {
    const map = mapRef.current.leafletElement;
    // const dataLayer = this.layerRef.current.leafletElement
    // dataLayer.clearLayers()
    const bounds = map.getBounds();
    const bounds_poly = coordsToJSON([
      [bounds._northEast.lat, bounds._northEast.lng],
      [bounds._southWest.lat, bounds._southWest.lng],
    ]);
    const bounds_json = polygon(bounds_poly);
    const polysOnScreen = getIntersect(bounds_json, items);
    setOnScreen(polysOnScreen);
  };

  const updateColors = () => {
    const colorScale = scaleQuantile()
      .domain(onScreen.map((d) => d.properties.dataValue[mapVariable]))
      .range(colorRange);
    const quantiles = colorScale.quantiles(); //for legend
    setColorScale(() => colorScale);
    setQuantiles(quantiles);
  };

  useEffect(() => {
    setIsLoaded(true);
    if (testing) getMapData();
  }, []);

  useEffect(() => {
    //only run when variable has been selected
    if (props.selectedVar) {
      getMapData();
    }
  }, [props.selectedVar]);

  useEffect(() => {
    if (onScreen) {
      updateColors();
    }
  }, [onScreen]);

  const getMapData = () => {
    const group = props.selectedVar.split("_")[0];
    const variable = props.selectedVar.split("_")[1];
    setMapVariable(variable);
    const request = createRequest(group, variable);

    fetchCensusData(request).then((result) => {
      const items = addData(US_counties, result.geoIdValue);
      const coloScale = scaleQuantile()
        .domain(items.map((d) => d.properties.dataValue[variable]))
        .range(colorRange);
      setQuantiles(coloScale.quantiles());
      setVariables(result.variableInfo);
      setGroupInfo(result.groupInfo);
      setItems(items);
      console.log(items);
      setColorScale(() => coloScale);
    });
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (!items) {
    return (
      <Map
        ref={mapRef}
        center={[defaultMapState.lat, defaultMapState.lng]}
        zoom={defaultMapState.zoom}
        style={defaultMapState.mapStyle}
        updateWhenZooming={false}
        updateWhenIdle={true}
        preferCanvas={props}
        minZoom={defaultMapState.minZoom}
        zoomControl={false}
        //onClick={}
      >
        <TileLayer attribution={attribution} url={tileUrl} />
        <ZoomControl position="topright" />
        <DataContainer />
      </Map>
    );
  } else {
    return items && colorScale ? (
      <Map
        ref={mapRef}
        center={[defaultMapState.lat, defaultMapState.lng]}
        zoom={defaultMapState.zoom}
        style={defaultMapState.mapStyle}
        updateWhenZooming={false}
        updateWhenIdle={true}
        preferCanvas={true}
        minZoom={defaultMapState.minZoom}
        onMoveEnd={handleMove}
        zoomControl={false}
        //onClick={}
      >
        <TitleBlock
          title={
            groupInfo.vintage +
            " " +
            groupInfo.description +
            " | " +
            variables[Object.keys(variables)[0]].name.replaceAll("!!", " ")
          }
        />
        <TileLayer attribution={attribution} url={tileUrl} />
        <ZoomControl position="topright" />
        <GeoJSON
          ref={layerRef}
          data={items}
          style={(item) => {
            return {
              //? add variable to state to use here
              fillColor: colorScale(
                item ? item.properties.dataValue[mapVariable] : "#EEE"
              ),
              fillOpacity: 0.5,
              weight: 0.5,
              opacity: 0.7,
              color: "white",
              dashArray: "3",
            };
          }}
        />
        <DataContainer onScreen={onScreen} />
        <Legend quantiles={quantiles} colorRange={colorRange} />
      </Map>
    ) : (
      "Data is loading..."
    );
  }
};

export default DemoMap;
<<<<<<< HEAD
=======
=======
} from './utils/Utils';
import DemoMapTooltip from "./DemoMapTooltip";
import "leaflet/dist/leaflet.css";
import US_counties from './data/US_counties_5m'

console.log(US_counties)

function style(feature) {
    return {
        fillColor: getColor(feature.properties.COUNTY),
        weight: 0.5,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}

export default class DemoMap extends Component {
    state = defaultMapState;
    componentDidMount() {
              this.setState({
                isLoaded: true,
                items: US_counties
              });
            }
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
        render() {
        const { isLoaded, items } = this.state;
         if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
            return this.props.mountains ? (
        <Map
            center={[this.state.lat, this.state.lng]}
            zoom={this.state.zoom}
            style={{ width: "100%", position: "absolute", top: 0, bottom: 0, zIndex: 500, }}
            updateWhenZooming={false}
            updateWhenIdle={true}
            preferCanvas={true}
            minZoom={this.state.minZoom}
        >
            <TileLayer
                attribution={attribution}
                url={tileUrl}
            />
          <GeoJSON
          data={items} 
          style={style}
        //  style={() => ({
        //    color: '#4a83ec',
        //    weight: 0.5,
        //    fillColor: getColor(items.features.properties.COUNTY),
        //    fillOpacity: 0.5,
        //  })}
          />
            {this.props.mountains.map((mountain, idx) => 
                <CircleMarker 
                    key={`mountain-${mountain.id}`}
                    color='black'
                    radius={15}
                    weight={2}
                    onClick={() => { 
                        this.setState({ activeMountain: mountain });
                    }}
                    center={mountain.point}>
                </CircleMarker>
            )}
            {this.state.activeMountain && <Popup
                position={this.state.activeMountain.point}
                onClose={() => {
                    this.setState({ activeMountain: null })
                }}
            >
                <DemoMapTooltip
                    mountain={this.state.activeMountain}
                />
            </Popup>}
        </Map>
        ) : (
            "Data is loading..."
        );
    }
}
<<<<<<< HEAD
>>>>>>> 2ff3dc9f... initial commit
=======
}
>>>>>>> 593e49ec... local data source
>>>>>>> ef8061a4... local data source
