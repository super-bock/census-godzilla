<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 4bfe56c2... working map
=======
<<<<<<< HEAD
>>>>>>> fa7489e9... working class components
=======
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> d69bfd3c... functional components done
=======
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> f6de523c... Partially refactored DemoMap
=======
<<<<<<< HEAD
>>>>>>> 304478be... Nearly done with DemoMap component
import React, { createRef, useState, useEffect } from "react";
import { Map, TileLayer, Popup, GeoJSON, ZoomControl } from "react-leaflet";
<<<<<<< HEAD
=======
=======
import React, { Component } from "react";
=======
import React, { Component,  createRef } from "react";
<<<<<<< HEAD
import Button from 'react-bootstrap/Button';
>>>>>>> 795bf6db... working map
=======
>>>>>>> 137be228... added controls
import { 
  Map, 
  TileLayer, 
  Popup,
  GeoJSON,
  ZoomControl,
} from "react-leaflet";
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 2ff3dc9f... initial commit
<<<<<<< HEAD
>>>>>>> ef8061a4... local data source
=======
=======
import L from 'leaflet'
>>>>>>> 795bf6db... working map
<<<<<<< HEAD
>>>>>>> 4bfe56c2... working map
=======
=======
>>>>>>> 137be228... added controls
<<<<<<< HEAD
>>>>>>> 5fff9e88... added controls
=======
=======
import React, { Component, createRef } from "react";
=======
import React, { createRef, useState, useEffect } from "react";
>>>>>>> 256fc825... functional components done
import { Map, TileLayer, Popup, GeoJSON, ZoomControl } from "react-leaflet";
>>>>>>> d54d9bab... working class components
>>>>>>> fa7489e9... working class components
import {
  attribution,
  tileUrl,
  defaultMapState,
<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 5fff9e88... added controls
=======
<<<<<<< HEAD
>>>>>>> fa7489e9... working class components
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
<<<<<<< HEAD
<<<<<<< HEAD
import DataContainer from "./DataContainer";
import "leaflet/dist/leaflet.css";
import US_counties from "../data/US_counties_5m";
=======
import React, { createRef, useState, useEffect } from 'react';
import { Map, TileLayer, Popup, GeoJSON, ZoomControl } from 'react-leaflet';
import { attribution, tileUrl, defaultMapState, colorRange } from '../utils/Utils';
=======
import 'leaflet/dist/leaflet.css';

// import { censusRace } from "../data/ReferenceData.js";
import { ScaleQuantile, scaleQuantile } from 'd3-scale';
import { GeoJsonObject } from 'geojson';
import React, { createRef, useEffect, useState } from 'react';
import { GeoJSON, Map, Popup, TileLayer, ZoomControl } from 'react-leaflet';

import { Feature, Polygon, polygon, Properties } from '@turf/turf';

import US_counties from '../data/US_counties_5m.json';
>>>>>>> 7f46c57f... Nearly done with DemoMap component
import {
    addData, coordsToJSON, createRequest, fetchCensusData, getIntersect
} from '../helpers/Helpers';
import { attribution, colorRange, defaultMapState, tileUrl } from '../utils/Utils';
// import DemoMapTooltip from "./DemoMapTooltip";
<<<<<<< HEAD
import DataContainer from './DataContainer';
<<<<<<< HEAD
import 'leaflet/dist/leaflet.css';
import US_counties from '../data/US_counties_5m.json';
>>>>>>> 29ff46f0... Partially refactored DemoMap
=======
>>>>>>> 7f46c57f... Nearly done with DemoMap component
//import US_tracts from "../data/";
import Legend from './Legend';
=======
 import DataContainer from './DataContainer';
// import US_tracts from "../data/";
// import Legend from './Legend';
>>>>>>> 16d165e0... Partially through TS refactor of ReferenceData


interface MapReference {
  current: any; // FIXME this should not by any type
}

interface PolysOnMap {
  geometry: {
    coordinates: [number, number][];
    type: string;
  }
  properties: {
    CENSUSAREA: number
    COUNTY: string;
    GEO_ID: string;
    LSAD:   string;
    NAME:   string;
    STATE:  string;
    dataValue: {
      [key: string]: number;
    }
  }
}
interface QueryType {
  [key: string]: {
    name: string;
    type: string;
  }
}

const TitleBlock = ({ title }: {title: string}) => <div className="info title">{title}</div>;

//need to deal w negative values in data
const DemoMap = ({selectedVar}: {'selectedVar': string | null}) => {
	const testing = false;

	const [isLoaded, setIsLoaded] = useState<boolean>();
	const [items, setItems] = useState<Feature<Polygon, Properties>[]>([]);
  // 'variables' refers to the demographic query (third form option)
	const [variables, setVariables] = useState<QueryType>({'noData':{name: '', type: 'int'}});
	const [mapVariable, setMapVariable] = useState<string>('');
	const [groupInfo, setGroupInfo] = useState({vintage: 0, description: '', code: ''});
	const [colorScale, setColorScale] = useState<ScaleQuantile<string, never>>(); /// colorScale should have function type. It's an instance of scaleQuantile
	const [quantiles, setQuantiles] = useState<number[]>();
	const [onScreen, setOnScreen] = useState<Feature<Polygon, Properties>[]>();

	const mapRef: MapReference = createRef();
	const layerRef = createRef<GeoJSON>();

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
    if (!onScreen) return;
		const colorScale = scaleQuantile<string>()
			.domain(onScreen.map((d) => d.properties?.dataValue[mapVariable]))
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
		if (selectedVar) {
			getMapData();
		}
	}, [selectedVar]);

	useEffect(() => {
		if (onScreen) {
			updateColors();
		}
	}, [onScreen]);

	const getMapData = () => {
		const group = selectedVar?.split('_')[0];
    const val = selectedVar?.split('_')[1];
    // This fixes potentially undefined value when we invoke createRequest
    const groupVal = group ? group : '';
    // This fixes the type when we invoke createRequest
		const variable = val ? val : '';
		setMapVariable(variable);
		const request = createRequest(groupVal, variable);

		fetchCensusData(request).then((result) => {
			const items = addData(US_counties, result.geoIdValue);
			const coloScale = scaleQuantile<string>()
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
				preferCanvas={true}
				minZoom={defaultMapState.minZoom}
				zoomControl={false}
				//onClick={}
			>
				<TileLayer attribution={attribution} url={tileUrl} />
				<ZoomControl position="topright" />
				{/* <DataContainer /> */}
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
						' ' +
						groupInfo.description +
						' | ' +
						variables[Object.keys(variables)[0]].name.replaceAll('!!', ' ')
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
							fillColor: colorScale(item ? item.properties.dataValue[mapVariable] : '#EEE'),
							fillOpacity: 0.5,
							weight: 0.5,
							opacity: 0.7,
							color: 'white',
							dashArray: '3',
						};
					}}
				/>
				<DataContainer onScreen={onScreen} />
      {/*<Legend quantiles={quantiles} colorRange={colorRange} /> */}
			</Map>
		) : (
			<h3>Data is loading...</h3>
		);
	}
};

export default DemoMap;
<<<<<<< HEAD
=======
=======
=======
  colorRange
>>>>>>> 137be228... added controls
} from './utils/Utils';
import {
  addData,
  getIntersect,
  coordsToJSON
} from './helpers/Helpers';
import {scaleQuantile} from "d3-scale";
=======
  colorRange,
} from "../utils/Utils";
import {
  addData,
  getIntersect,
  coordsToJSON,
  createRequest,
} from "../helpers/Helpers";
import { scaleQuantile } from "d3-scale";
>>>>>>> d54d9bab... working class components
import DemoMapTooltip from "./DemoMapTooltip";
=======
import BarPlot from "./BarPlot";
>>>>>>> 1f47e911... showing chart
=======
import DataContainer from "./DataContainer";
>>>>>>> bdf5a68e... swiper working
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
<<<<<<< HEAD
            })}
          />
          <Legend quantiles={this.state.quantiles} colorRange={colorRange} />
        </Map>
      ) : (
        "Data is loading..."
<<<<<<< HEAD
    );
}
}
<<<<<<< HEAD
>>>>>>> 2ff3dc9f... initial commit
=======
=======
      );
    }
  }
>>>>>>> d54d9bab... working class components
}
>>>>>>> 593e49ec... local data source
<<<<<<< HEAD
>>>>>>> ef8061a4... local data source
=======
=======
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
>>>>>>> 256fc825... functional components done
>>>>>>> d69bfd3c... functional components done
