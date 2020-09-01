<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 4bfe56c2... working map
import React, { createRef, useState, useEffect } from "react";
import { Map, TileLayer, Popup, GeoJSON, ZoomControl } from "react-leaflet";
<<<<<<< HEAD
=======
=======
import React, { Component } from "react";
=======
import React, { Component,  createRef } from "react";
import Button from 'react-bootstrap/Button';
>>>>>>> 795bf6db... working map
import { 
  LayerGroup,
  FeatureGroup,
  LayersControl,
  Map, 
  TileLayer, 
  Popup,
  GeoJSON
} from "react-leaflet";
<<<<<<< HEAD
>>>>>>> 2ff3dc9f... initial commit
<<<<<<< HEAD
>>>>>>> ef8061a4... local data source
=======
=======
import L from 'leaflet'
>>>>>>> 795bf6db... working map
>>>>>>> 4bfe56c2... working map
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
import FluidGeoJSON from './FluidGeoJSON'
import { scaleQuantize, scaleQuantile } from "d3-scale";
import DemoMapTooltip from "./DemoMapTooltip";
import "leaflet/dist/leaflet.css";
import US_counties from './data/US_counties_5m'
import Legend from "./Legend"
import { intersect, polygon } from '@turf/turf'
import Sidebar from "react-sidebar";

const { BaseLayer, Overlay } = LayersControl

function addData (geo, data) {
	const newFeatures = []
    for (var i in geo.features) {
      const newFeature = geo.features[i]
      const geoId = geo.features[i].properties.GEO_ID.split('US')[1]
      if (data[geoId]){
      	const newData = data[geoId]
      	const newKey = Object.keys(newData)
      	const newValue = newData[newKey]
      	newFeature.properties["dataValue"] = newValue
      	newFeatures.push(newFeature)
      }
  }
    return newFeatures
}

const colorRange = [
    "#ffd1dc",
    "#ffad9f",
    "#ff5533",
    "#e2492d",
    "#9a311f",
    "#782618"
  ]


function getScale (data, colorRange) {
  return (
  scaleQuantile()
    .domain(data.map(d => d.value))
    .range(colorRange)
)
}

function getIntersect (bounds, geo) {
    const intrsctPolys = []
    for (let i in geo) {
        let geo_poly = geo[i] 
        let intrsct = intersect(bounds, geo_poly)
        if (intrsct != null) {
            intrsctPolys.push(geo_poly)
        }
    }
    return intrsctPolys
}

function coordsToJSON (coords) {
    let lat_NE = coords[0][0]
    let lng_NE = coords[0][1]
    let lat_SW = coords[1][0]
    let lng_SW = coords[1][1]
    let poly = [[
        [lng_NE, lat_NE],
        [lng_NE, lat_SW],
        [lng_SW, lat_SW],
        [lng_SW, lat_NE],
        [lng_NE, lat_NE]
    ]]
    return poly
    }

const colorScaleQuantize = scaleQuantize()
  .domain([0, 5])
  .range(colorRange);

const group = "B25097"
const req = "gettable?vintage=2018&dataset=acs5&group="+group+"&state=36,34,42&county=*&geography=county&key=32dd72aa5e814e89c669a4664fd31dcfc3df333d&variable=001E"
const url = "https://better-census-api.com/"


class TitleBlock extends Component {
  render() {
    console.log("title", this.props.title)
    return (
        <div className="info title">
            {this.props.title}
      </div>
    );
  }
}

class FluGeoJSON extends Component {
   // constructor(props) {
   //     super(props);

       // this.state = {
       //     polygonFillColor: "pink",
       //     constant_range: [-10.0, 10.0],
       // }
//
 //       this.getColor = this.getColor.bind(this);
  //      this.style = this.style.bind(this);
   // }

   // getColor(d) {
   // };

   // style(feature) {
   // };

    render() {

console.log("im fluid")
        return (
                
                <GeoJSON data={this.props.data} style={this.props.style}></GeoJSON>
           )
       }
    }




export default class DemoMap extends Component {
    state = defaultMapState;
    constructor(props) {
      super(props);
      this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }
    mapRef = createRef()
    layerRef = createRef()

    onSetSidebarOpen(open) {
      this.setState({ sidebarOpen: open });
    }

    handleMove = () => {   
        const map = this.mapRef.current.leafletElement
        const dataLayer = this.layerRef.current.leafletElement
   //     dataLayer.clearLayers().addTo(map)
        console.log(dataLayer)
        const bounds = map.getBounds()
        console.log(map.getBounds())  
        const geo = this.state.items
        const bounds_poly = coordsToJSON([[bounds._northEast.lat, bounds._northEast.lng], [bounds._southWest.lat, bounds._southWest.lng]])  
        const bounds_json =  polygon(bounds_poly)
        const polysOnScreen = getIntersect(bounds_json, geo)
        this.setState({
            polysOnScreen,
        })

 //       const colorScale = scaleQuantile()
 //         .domain(polysOnScreen.map(d => d.properties.dataValue))
 //         .range(colorRange);
 //       const quantiles = colorScale.quantiles()    //for legend
 //       function style(feature) {
 //           return {
 //               fillColor: colorScale(feature ? feature.properties.dataValue : "#EEE"),
 //               weight: 0.5,
 //               opacity: 1,
 //               color: 'white',
 //               dashArray: '3',
 //               fillOpacity: 0.7
 //           };
//}



        //map.removeLayer(dataLayer)
 //       console.log('data', dataLayer)
  } 

    componentDidMount() {
//const leafletMap = this.leafletMap.leafletElement
         fetch(url + req)
              .then(res => res.json())
              .then(
                (result) => {
                  const items = addData(US_counties,result.geoid)
                  const colorScale = scaleQuantile()
                   .domain(items.map(d => d.properties.dataValue))
                   .range(colorRange);
                  this.setState({
                    isLoaded: true,
                    items: items,
                    variables: result.variables,
                    groupInfo: result.group,
                    colorScale: colorScale,
                    quantiles: colorScale.quantiles()
                  });
                },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error)
          this.setState({
            isLoaded: true,
            error
          });
        }
              ).then(() => {
             }
              )
     

    }



    componentDidUpdate(prevProps, prevState) {
        if (this.state.polysOnScreen !== prevState.polysOnScreen) {
        console.log("didupdate")
            if (this.state.key !== 0) {
                this.setState({key: 1})} else {
                this.setState({key: 0})
                }
            const map = this.mapRef.current
            const bounds = map.leafletElement.getBounds()
            //console.log(map.leafletElement.getBounds())  
            const geo = this.state.items
            const bounds_poly = coordsToJSON([[bounds._northEast.lat, bounds._northEast.lng], [bounds._southWest.lat, bounds._southWest.lng]])  
            const bounds_json =  polygon(bounds_poly)
            const polysOnScreen = getIntersect(bounds_json, geo)
            
            const colorScale = scaleQuantile()
                .domain(polysOnScreen.map(d => d.properties.dataValue))
                .range(colorRange);
             
            const quantiles = colorScale.quantiles()    //for legend
            this.setState({
                onScreen: polysOnScreen,
                colorScale: colorScale,
                quantiles: quantiles,
                })

            console.log("setted", this.state.polysOnScreen)

         }
    }



    render() {
    const { isLoaded, items, variables, groupInfo} = this.state;
     if (!isLoaded) {
      return <div>Loading...</div>;
        } else {
        console.log("scale", this.state.colorScale) 
            const colorScale = scaleQuantile()
                .domain(items.map(d => d.properties.dataValue))
                .range(colorRange);
 
      //  function style(feature) {
      //      return {
      //          fillColor: colorScale(feature ? feature.properties.dataValue : "#EEE"),
      //          weight: 0.5,
      //          opacity: 1,
      //          color: 'white',
      //          dashArray: '3',
      //          fillOpacity: 0.7
      //      };
      //  }
         
        return items ? (        
    <Map
        ref={this.mapRef}
        center={[this.state.lat, this.state.lng]}
        zoom={this.state.zoom}
        style={{ width: "100%", position: "absolute", top: 0, bottom: 0, zIndex: 500, }}
        updateWhenZooming={false}
        updateWhenIdle={true}
        preferCanvas={true}
        minZoom={this.state.minZoom}
        onMoveEnd={this.handleMove}
        //onClick={}
    >
    <Button onClick={() => this.onSetSidebarOpen(true)} variant="outline-info">Info</Button>{' '}
    <Sidebar
        sidebar={<><b>Sidebar content</b> 
        <button onClick={() => this.onSetSidebarOpen(true)}>
          Open sidebar
        </button></>}
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "white", zIndex: 6000 } }}
   />
        <TitleBlock
            title = {groupInfo.vintage + " " + groupInfo.description + " " + variables[Object.keys(variables)[0]].name} 
        />
        <TileLayer
            attribution={attribution}
            url={tileUrl}
        />
      <GeoJSON
      key = {this.key}
      ref={this.layerRef}
      data={items} 
    //  style={style}
      style={(items) => ({
                fillColor: this.state.colorScale(items ? items.properties.dataValue : "#EEE"),
                weight: 0.5,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
      })}
      />
      <Legend 
      key = {this.key}
      quantiles = {this.state.quantiles}
      colorRange = {colorRange}/> 
 
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
