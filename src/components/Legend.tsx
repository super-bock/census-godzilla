// https://codesandbox.io/s/how-to-add-a-legend-to-the-map-using-react-leaflet-6yqs5?file=/src/Map.js
import { MapControl, withLeaflet } from 'react-leaflet';
import L from 'leaflet';

<<<<<<< HEAD:src/components/Legend.js
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> d54d9bab... working class components
=======
>>>>>>> 1f47e911... showing chart
class Legend extends MapControl {
=======
type Props = {
  quantiles:number[] | undefined;
  colorRange:string[];
  leaflet: any;
}
class Legend extends MapControl<Props> {
  //@ts-ignore
>>>>>>> 73252f99... Feat: Legend:src/components/Legend.tsx
  createLeafletElement() {}

  //@ts-ignore
  legend = L.control({ position: 'bottomright' });

  createLegend = () => {
<<<<<<< HEAD:src/components/Legend.js
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
=======

    const div = L.DomUtil.create('div', 'info legend');
    const grades = (this.props.quantiles)? this.props.quantiles:[];
>>>>>>> 73252f99... Feat: Legend:src/components/Legend.tsx
    const colors = this.props.colorRange;
    const labels = [];
    let from;
    let to;

    for (let i = 0; i < grades?.length; i++) {
      from = Math.floor(grades[i]);
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

    const { map } = this.props.leaflet;
    this.legend.onAdd = this.createLegend;
    if (map) this.legend.addTo(map);
  }

<<<<<<< HEAD
<<<<<<< HEAD
  // this should only update the div
  componentDidUpdate() {
    const { map } = this.props.leaflet;
    map.removeControl(this.legend);
    this.legend.onAdd = this.createLegend;
    if (map) this.legend.addTo(map);
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
