// https://codesandbox.io/s/how-to-add-a-legend-to-the-map-using-react-leaflet-6yqs5?file=/src/Map.js
import { MapControl, withLeaflet } from 'react-leaflet';
import L from 'leaflet';

<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> d54d9bab... working class components
=======
>>>>>>> 1f47e911... showing chart
class Legend extends MapControl {
  createLeafletElement() {}

  legend = L.control({ position: 'bottomright' });

  createLegend = () => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 1f47e911... showing chart
    const div = L.DomUtil.create("div", "info legend");
=======
    const div = L.DomUtil.create('div', 'info legend');
>>>>>>> 5011befb... Added Eslint, auto fixed errors
    const grades = this.props.quantiles;
    const colors = this.props.colorRange;
    let labels = [];
    let from;
    let to;

    for (let i = 0; i < grades.length; i++) {
      from = parseInt(grades[i]);
      to = grades[i + 1];
      labels.push(
        '<i style="background:' + colors[i] + '"></i> ' + from + (to ? '' : '+')
      );
    }

    div.innerHTML = labels.join('<br>');
    return div;
  };
<<<<<<< HEAD
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
=======
>>>>>>> 1f47e911... showing chart

  componentDidMount() {
    this.legend.onAdd = this.createLegend;
    const { map } = this.props.leaflet;
    this.legend.addTo(map);
  }

<<<<<<< HEAD
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
=======
  // this should only update the div
  componentDidUpdate() {
>>>>>>> 1f47e911... showing chart
    const { map } = this.props.leaflet;
    map.removeControl(this.legend);
    this.legend.onAdd = this.createLegend;
    this.legend.addTo(map);
  }
<<<<<<< HEAD

>>>>>>> d54d9bab... working class components
=======
>>>>>>> 1f47e911... showing chart
}

export default withLeaflet(Legend);
