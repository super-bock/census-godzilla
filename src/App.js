import React, { useState, useEffect } from "react";
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

const variablesCall =
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
=======
=======
import React, { Component } from "react";
import DemoMap from "./components/DemoMap";
import { mountains } from "./components/utils/Utils"
import "leaflet/dist/leaflet.css";
import Sidebar from "react-sidebar";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

class App extends Component {
  state = {
    mountains: mountains,
    sidebarOpen: true
  };
  constructor(props) {
      super(props);
      this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    onSetSidebarOpen(open) {
      this.setState({ sidebarOpen: open });
    }

  componentDidUpdate() {
      console.log("appitems",this.state.items)
  }

  render() {
    return (
      <div>
  <button onClick={() => this.onSetSidebarOpen(true)}>
          Open sidebar
        </button>
    <Sidebar
        sidebar={<DropdownButton id="dropdown-basic-button" title="Dropdown button">
  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
</DropdownButton> 
      }
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "white", zIndex: 6000 } }}
   />
        <DemoMap
          mountains={this.state.mountains}
        />
      </div>
    );
  }
}
export default App;
<<<<<<< HEAD
>>>>>>> 2ff3dc9f... initial commit
=======
>>>>>>> 593e49ec... local data source
>>>>>>> ef8061a4... local data source
