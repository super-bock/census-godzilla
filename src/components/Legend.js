// https://codesandbox.io/s/how-to-add-a-legend-to-the-map-using-react-leaflet-6yqs5?file=/src/Map.js
import { MapControl, withLeaflet } from "react-leaflet";
import L from "leaflet";

<<<<<<< HEAD
=======

>>>>>>> d54d9bab... working class components
class Legend extends MapControl {
  createLeafletElement(props) {}

  legend = L.control({ position: "bottomright" });

  createLegend = () => {
<<<<<<< HEAD
    const div = L.DomUtil.create("div", "info legend");
    const grades = this.props.quantiles;
    const colors = this.props.colorRange;
    let labels = [];
    let from;
    let to;

    for (let i = 0; i < grades.length; i++) {
      from = parseInt(grades[i]);
      to = grades[i + 1];
      labels.push(
        '<i style="background:' + colors[i] + '"></i> ' + from + (to ? "" : "+")
      );
    }

    div.innerHTML = labels.join("<br>");
    return div;
  };
=======
      const div = L.DomUtil.create("div", "info legend");
      const grades = this.props.quantiles;
      const colors = this.props.colorRange;  
      let labels = [];
      let from;
      let to;

      for (let i = 0; i < grades.length; i++) {
        from = parseInt(grades[i]);
        to = grades[i + 1];
        labels.push(
          '<i style="background:' +
            colors[i] +
            '"></i> ' +
            from +
            (to ? "" : "+")
        );
      }

      div.innerHTML = labels.join("<br>");
      return div;
}


>>>>>>> d54d9bab... working class components

  componentDidMount() {
    this.legend.onAdd = this.createLegend;
    const { map } = this.props.leaflet;
    this.legend.addTo(map);
  }

<<<<<<< HEAD
  // this should only update the div
  componentDidUpdate() {
    const { map } = this.props.leaflet;
    map.removeControl(this.legend);
    this.legend.onAdd = this.createLegend;
    this.legend.addTo(map);
  }
=======
// this should only update the div
  componentDidUpdate () {
    const { map } = this.props.leaflet;
    map.removeControl(this.legend)
    this.legend.onAdd = this.createLegend;
    this.legend.addTo(map);
  }

>>>>>>> d54d9bab... working class components
}

export default withLeaflet(Legend);
