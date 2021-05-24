<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 1bb270fb... app functional component
=======
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 69e1d6f4... Fix: Cleanup
=======
<<<<<<< HEAD
>>>>>>> 304478be... Nearly done with DemoMap component
import React, { useState, useEffect } from "react";
import DemoMap from "./components/DemoMap";
import "leaflet/dist/leaflet.css";
//import Sidebar from "react-sidebar";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { Typeahead } from "react-bootstrap-typeahead";
// import "./css/typeahead.css";
import 'react-bootstrap-typeahead/css/Typeahead.css';
=======
import React, { useState, useEffect } from 'react';
import DemoMap from './components/DemoMap';
=======
>>>>>>> 7f46c57f... Nearly done with DemoMap component
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/typeahead.css';

import React, { useEffect, useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
<<<<<<< HEAD
import "./css/typeahead.css";
>>>>>>> 392e70f8... Fix: Cleanup
=======
//import Sidebar from "react-sidebar"; // Sidebar is unused in original fork
import Form from 'react-bootstrap/Form';

import DemoMap from './components/DemoMap';
>>>>>>> 7f46c57f... Nearly done with DemoMap component

const censusKey = '32dd72aa5e814e89c669a4664fd31dcfc3df333d';

const acsCall = 'https://better-census-api.com/finddataset?vintage=*&search=ACS,detailed%20tables';
const tablesCall = 'https://better-census-api.com/findtable?search=*&datasetid=$id';

const variablesCall =
<<<<<<< HEAD
<<<<<<< HEAD
  "https://better-census-api.com/gettable?vintage=2018&dataset=acs5&state=10&county=*&group=$group&variable=*&geography=tract&key=$key";
=======
	'https://better-census-api.com/gettable?vintage=2018&dataset=acs5&state=10&county=*&group=$group&variable=*&geography=tract&key=$key';
>>>>>>> 392e70f8... Fix: Cleanup

const App = () => {
	interface DatasetParameters {
		id: number;
		vintage: number;
		title: string;
	}
	interface InitialQueryType {
	 name: string;
   type: string;
	}
	const [tables, setTables] = useState<CensusLabel[]>([]);
	const [variables, setVariables] = useState<CensusLabel[]>([]);
	const [selectedVar, setSelectedVar] = useState<string>('');
	const [isLoaded, setIsLoaded] = useState(false);
	const [datasets, setDatasets] = useState<DatasetParameters[]>([]);

	// NOTE: This is commented out from the original fork
	//  constructor(props) {
	//super(props);
	//this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
	//}

	//onSetSidebarOpen(open) {
	//this.setState({ sidebarOpen: open });
	//  }
	type CensusLabel = { [key: string]: string[] };

	interface TableCategories {
		AccessURL: string;
		Dataset: string;
		Groups: { [key: string]: string }[];
	}
	const getTables = (e: React.ChangeEvent<HTMLInputElement>) => {
		fetch(tablesCall.replace('$id', e.target.value))
			.then((res) => res.json())
			.then((result: TableCategories) => {
				setTables(
					// This will probably cause a crash
					result.Groups.flatMap((data: { [key: string]: string }) =>
						Object.entries(data).map(([key, value]) => ({ [key]: [value] }))
					)
					//Object.entries(result.Groups).map( ([key, value]) => ({[key]: [value]}))
				);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// interface raceCounts {
	// 	Asian: number;
	// 	Black: number;
	// 	Hispanic: number;
	// 	Multi: number;
	// 	Native: number;
	// 	Other: number;
	// 	Pacific: number;
	// 	White: number;
	// 	Total: number;
	// }
	// interface variableCategories {
	// 	race: any; // Should be an object of raceCounts types
	// 	education: any; // Should be an object of educationCounts types
	// }
	// e is an array with one index, whose key is code for the census query and value is the query in english
	const getVariables = (e: CensusLabel[]): void => {
		if (e[0] !== undefined) {
			fetch(variablesCall.replace('$group', Object.keys(e[0])[0]).replace('$key', censusKey))
				.then((res) => res.json())
				.then((result: { variableInfo: { [key: string]: InitialQueryType } }) => {
					setVariables( //NOTE the type here should be an Object of CensusLables
						Object.entries(result.variableInfo).map(([key, value]) => ({ [key]: Object.values(value) }))
					);
					//setVariables(result.variableInfo);
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			console.log("can't get variables");
		}
	};

	const setVariable = (e: CensusLabel[]) => {
		if ( !Array.isArray(e)|| !e?.length) return setSelectedVar('');
    // FIXME TypeError: Cannot convert undefined or null to object
    console.log('!!!', e)

    const selectedQuery = Object.keys(e[0])[0];
    setSelectedVar( selectedQuery );

		// else setSelectedVar('');
	};

	interface UnprocessedCensusYearsData {
		Dataset_ID: number;
		Title: string;
		Vintage: number;
	}

	useEffect(() => {
		fetch(acsCall)
			.then((res) => res.json())
			.then((data: UnprocessedCensusYearsData[]) => {
				let datasetsAPI = data.map((d) => {
					return { id: d.Dataset_ID, vintage: d.Vintage, title: d.Title };
				});
				setIsLoaded(true);
				setDatasets([{ id: 0, vintage: 0, title: '(Select dataset)' }].concat(datasetsAPI));
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	if (!isLoaded) {
		return <div>Loading...</div>;
	} else {
		return (
			<>
				<div className="form-container">
					<Form.Group>
						<Form.Control id="dataset" size="sm" as="select" onChange={getTables}>
							{datasets.map((dataset, idx) => (
								<option key={idx} value={dataset.id}>
									{dataset.vintage + ' ' + dataset.title}
								</option>
							))}
						</Form.Control>
						<br />
						{
							<Typeahead
								id="group"
								size="small"
								onChange={getVariables}
								labelKey={(option) => {
									return option[Object.keys(option)[0]][0];
								}}
								options={tables}
							/>
						}
						<br />
						{
							<Typeahead
								id="variable"
								size="small"
								onChange={setVariable}
								filterBy={(option, props) => {
									return !!option[Object.keys(option)[0]][0].match(/^Estimate!!/i); // '!!' converts null to false
								}}
								labelKey={(option) => {
									// this runs 8 times???
									return option[Object.keys(option)[0]][0]
										.replace(/Estimate!!Total!!/g, '')
										.replace(/!!/g, '|');
								}}
								options={variables}
							/>
						}
					</Form.Group>
				</div>
				<DemoMap selectedVar={selectedVar} />
			</>
		);
	}
};

export default App;
<<<<<<< HEAD
=======
=======
import React, { Component } from "react";
=======
import React, { useState, useEffect } from "react";
>>>>>>> 5dd5bd5e... app functional component
import DemoMap from "./components/DemoMap";
import "leaflet/dist/leaflet.css";
//import Sidebar from "react-sidebar";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { Typeahead } from "react-bootstrap-typeahead";
import "./css/typeahead.css";

const censusKey = "32dd72aa5e814e89c669a4664fd31dcfc3df333d";

const acsCall =
  "https://better-census-api.com/finddataset?vintage=*&search=ACS,detailed%20tables";
const tablesCall =
  "https://better-census-api.com/findtable?search=*&datasetid=$id";

const columnsCall =
=======
>>>>>>> 256fc825... functional components done
  "https://better-census-api.com/gettable?vintage=2018&dataset=acs5&state=10&county=*&group=$group&variable=*&geography=tract&key=$key";

const App = () => {
  const [tables, setTables] = useState([]);
  const [variables, setVariables] = useState([]);
  const [selectedVar, setSelectedVar] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [datasets, setDatasets] = useState([]);
  //  constructor(props) {
  //super(props);
  //this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  //}

  //onSetSidebarOpen(open) {
  //this.setState({ sidebarOpen: open });
  //  }

  const getTables = (e) => {
    fetch(tablesCall.replace("$id", e.target.value))
      .then((res) => res.json())
      .then((result) => {
        setTables(result.Groups);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getVariables = (e) => {
    if (e[0] !== undefined) {
      fetch(
        variablesCall
          .replace("$group", Object.keys(e[0])[0])
          .replace("$key", censusKey)
      )
        .then((res) => res.json())
        .then((result) => {
          setVariables(result.variableInfo);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("can't get variables");
    }
  };

  const setVariable = (e) => {
    setSelectedVar(e[0]);
  };

  useEffect(() => {
    fetch(acsCall)
      .then((res) => res.json())
      .then((data) => {
        let datasetsAPI = data.map((d) => {
          return { id: d.Dataset_ID, vintage: d.Vintage, title: d.Title };
        });
        setIsLoaded(true);
        setDatasets(
          [{ vintage: "", title: "(Select dataset)" }].concat(datasetsAPI)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className="form-container">
          <Form.Group>
            <Form.Control
              id="dataset"
              size="sm"
              as="select"
              onChange={getTables}
            >
              {datasets.map((dataset, idx) => (
                <option key={idx} value={dataset.id}>
                  {dataset.vintage + " " + dataset.title}
                </option>
              ))}
            </Form.Control>
            <br />
            <Typeahead
              id="group"
              size="small"
              onChange={getVariables}
              labelKey={(option) => {
                return option[Object.keys(option)[0]];
              }}
              options={tables}
            />
            <br />
            <Typeahead
              id="variable"
              size="small"
              onChange={setVariable}
              filterBy={(option, props) => {
                return variables[option].name.match(/^Estimate!!/i);
              }}
              labelKey={(option) => {
                // this runs 8 times???
                return variables[option].name
                  .replace(/Estimate!!Total!!/g, "")
                  .replace(/!!/g, "|");
              }}
              options={Object.keys(variables)}
            />
          </Form.Group>
        </div>
        <DemoMap selectedVar={selectedVar} />
      </>
    );
  }
};

export default App;
<<<<<<< HEAD
>>>>>>> 2ff3dc9f... initial commit
=======
>>>>>>> 593e49ec... local data source
>>>>>>> ef8061a4... local data source
