import React, { useState } from 'react'; //import useState
import CustomPopup from "./Popup"; // import popup
import {ComposableMap, Geographies, Geography, ZoomableGroup, Marker} from "react-simple-maps"; // import react-simple-maps
import './App.css'; //import CSS styles

function App() {

  //const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/finland/finland-regions.json" //URL to topojson map of Finland
  const geoUrl = "https://raw.githubusercontent.com/lucified/finland-municipalities-topojson/master/finland-municipalities-topojson.json"

  const [position, setPosition] = useState({ coordinates: [26, 64.5], zoom: 1}); // state declaration for map coordinates and zoom level

  const [visibility, setVisibility] = useState(false); // state declaration for popup visibility

  const [datapoint, setDatapoint] = useState(["null", 0]); //array for dapoint names

  const [data, setData] = useState([["Nopeus", "Suunta 1 Autot", { role: "style" }, "Suunta 2 Autot", { role: "style" }], ["1 km/h", 1, "color: #BA1DBD", 3, "color: #BA1DBD"]]); //nested array for chart data
  const Dataholder = []; //array for holding csv data
  const [datahold, setDatahold] = useState([]);
  const Handleddata = [["Nopeus", "Autot", { role: "style" }]]; //array for parsed csv data with header row set

  const [data1, setdata1] = useState({data: [ [1], [1] ]});
  const [data2, setdata2] = useState({data: [ [1], [1] ]});
  const [data3, setdata3] = useState({data: [ [1], [1] ]});
  const [data4, setdata4] = useState({data: [ [1], [1] ]});
  const [data5, setdata5] = useState({data: [ [1], [1] ]});
  const [data6, setdata6] = useState({data: [ [1], [1] ]});
  const [data7, setdata7] = useState({data: [ [1], [1] ]});
  const [data1original, setdata1original] = useState([]);
  const [data2original, setdata2original] = useState([]);
  const [data3original, setdata3original] = useState([]);
  const [data4original, setdata4original] = useState([]);
  const [data5original, setdata5original] = useState([]);
  const [data6original, setdata6original] = useState([]);
  const [data7original, setdata7original] = useState([]);

  const popupCloseHandler = (e) => { //function to handle popup closing
    setVisibility(e);
  };

  function handleMoveEnd(position) {
    setPosition(position);
  }

  return (
    <div className='Main'>
      <div className='Header'>
        <h1 className='Header-text'>Lam Datapisteet</h1>
      </div>
      <div className='Map-main'>

        <ComposableMap // Component to render SVG map
        width={24} //map width
        height={23} //map height
        >
          <ZoomableGroup // Zoom component for map
            zoom={position.zoom}
            center={position.coordinates} // Coordinates to center map
            onMoveEnd={handleMoveEnd}
          >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => { //function to read and project SVG map file
               return (
                  <Geography key={geo.rsmKey} geography={geo}
                     fill="#5C80D9"
                     style={{
                      default: {outline: "none"},
                      hover: {outline: "none"},
                      pressed: {outline: "none"},
                     }}
                  />
                )
              })
            }
          </Geographies>
            <Marker className='Marker' coordinates={[25.71052, 60.41388]} /* Marker component */> 
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Porvoo, Rita", 1])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.63474, 60.15253]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Kivenlahti", 3])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.85689, 60.32671]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Vantaa, Kivistö", 4])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.78718, 60.35606]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Vantaa, Klaukkalantie", 5])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.74689, 60.23164]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Hiidenkallio", 6])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.08757, 60.28933]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Vantaa, Honkanummi", 7])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.09359, 60.36233]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Vantaa, Leppäkorpi", 8])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.02102, 60.32637]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Vantaa, Ilola", 9])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.81410, 60.19083]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Laajalahti", 10])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.09562, 60.21716]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Helsinki, Vartiokylä", 11])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.64275, 60.20209]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Muurala", 12])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.83545, 60.28171]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Vantaa, Martinkyläntie", 13])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.73884, 60.15236]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Piispansilta", 98])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.10991, 60.48592]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Järvenpää, Isokytö", 99])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.96738, 60.18150]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Helsinki, Hanasaari", 101])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.67123, 60.14151]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Soukka", 102])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.89066, 60.21908]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Huopalahti", 103])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.37191, 60.29162]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Vihti, Palojärvi", 104])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.16532, 60.36404]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lohja, Hiidenvesi", 105])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.34527, 60.29987]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Vihti, Huhmari", 106])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.87029, 60.26834]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Vantaa, Kaivoksela", 107])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.85517, 60.48947]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Nurmijärvi, Karjunkorpi", 108])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.07810, 60.26004]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Helsinki, Jakomäki", 109])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.24232, 60.57971]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Mäntsälä, Hakkari", 110])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.05410, 60.57281]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Loviisa, Liljendal", 111])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.56377, 60.37178]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Porvoo, Treksilä", 112])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.99899, 60.19133]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lohja, Virkkala", 114])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.59456, 60.42302]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Porvoo, Saksala", 115])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.81953, 60.21988]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Leppävaara", 116])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.87590, 60.19829]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Helsinki, Munkkiniemi", 117])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.83594, 60.17617]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Keilaniemi", 118])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.17929, 60.25083]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Helsinki, Itäsalmi", 119])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.19389, 60.45712]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Loviisa, Liljendal2", 121])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.23888, 60.53275]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Karkkila", 122])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.80633, 60.25965]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Pähkinärinne", 123])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.49631, 59.99056]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Raasepori, Dragsvik", 124])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.68513, 60.23292]}>
              <circle r={0.02} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Bemböle", 125])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.23694, 60.84503]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Helsinki, Konala", 126])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.97207, 60.42157]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Tuusula, Rusutjärvi", 127])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.88998, 60.29290]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Vantaa, Voutila", 128])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.52127, 60.43206]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Vihti, Selki", 129])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.10410, 60.61759]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Mäntsälä, Keravanjärvi", 130])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.97779, 60.26275]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Helsinki, Tuomarinkartano", 131])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.79153, 60.57026]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Hyvinkää, Noppo", 133])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.00920, 60.05123]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Inkoo", 134])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.75225, 60.45594]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Porvoo, Ilola", 135])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.17711, 60.52955]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Mäntsälä, Arola", 136])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.82920, 60.31720]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Vantaa, Keimola", 137])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.76348, 60.30329]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Odilampi", 138])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.59645, 60.23769]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Nupuri", 139])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.71373, 60.24169]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Järvenperä", 140])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.38908, 60.31191]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Sipoo, Box", 141])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.43309, 60.76317]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Mäntsälä, Levanto", 142])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.57163, 60.15541]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kirkkonummi, Sundsberg", 143])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.78944, 60.22220]}>
              <circle r={0.02} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Friisinmäki", 144])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.88538, 60.24168]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Helsinki, Kannelmäki", 145])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.92712, 60.25915]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Helsinki, Länsi-Pakila", 146])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.94813, 60.24414]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Helsinki, Pakila", 147])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.98913, 60.24492]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Helsinki, Pukinmäki", 148])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.01552, 60.25106]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Helsinki, Malmi", 149])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.96192, 60.30900]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Vantaa, Vantaanportti", 150])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.86206, 60.22298]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Helsinki, Pitäjänmäki", 151])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.91673, 60.23322]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Helsinki, Pirkkola", 152])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.96347, 60.22910]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Helsinki, Oulunkylä", 153])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.99989, 60.22382]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Helsinki, Viikinmäki", 154])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.51043, 60.13635]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kirkkonummi, Jorvas", 156])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.03196, 60.46148]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Loviisa, Hagaböle", 158])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.80076, 60.28550]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Vantaa, Petikko", 159])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.05273, 60.28215]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Vantaa, Heidehof", 160])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.76580, 60.17087]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Olarinluoma", 162])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.73578, 60.17631]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Kokinkylä", 163])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.90376, 60.19794]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Helsinki, Kivihaka", 164])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.89707, 60.26592]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Helsinki, Hakuninmaa", 165])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.72420, 60.21436]}>
              <circle r={0.02} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Sepänkylä", 167])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.95762, 60.28649]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Vantaa, Pakkala", 169])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.22501, 60.27131]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Helsinki, Bäcknäs", 172])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.65874, 60.22234]}>
              <circle r={0.02} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Lommila", 175])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.33074, 60.28541]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Sipoo, Sipoonlahti", 176])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.31306, 60.29961]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Sipoo, Kallbäck", 177])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.48150, 60.34099]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Sipoo, Kulloo", 178])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.10406, 60.25621]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Vantaa, Fazerila", 179])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.11097, 60.27834]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Vantaa, Hakunila", 182])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.71497, 60.24376]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Järvenperä2", 183])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.72979, 60.43297]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Porvoo, Uusikrouvi", 184])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.8073, 60.44389]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Porvoo, Lohijärvi", 185])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.12197, 60.47550]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Loviisa, Kärrbacka", 187])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.22748, 60.45789]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Loviisa", 188])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.25582, 60.46169]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Loviisa, Itä", 189])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.59698, 60.37685]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Porvoo, Ernestas", 190])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.50972, 60.26015]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kirkkonummi, Kolmiranta", 191])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.44238, 60.27029]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kirkkonummi, Veikkola", 192])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.24639, 60.31145]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lohja, Hevoskallio", 193])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.14115, 60.29241]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lohja, Lehmijärmi", 194])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.17600, 60.22592]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Helsinki, Satamatie", 195])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.14960, 60.22275]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Helsinki, Niinisaarentie", 196])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.92753, 60.21121]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Helsinki, Kivihaan tunneli", 197])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.66194, 60.39441]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Porvoo", 198])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.26956, 60.34958]}>
              <circle r={0.03} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Salo, Muurla", 201])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.19186, 60.64184]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Hämeenkyrö", 203])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.07459, 60.76833]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Ikaalinen", 204])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.16043, 60.48932]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Raisio", 205])} />
            </Marker>
            <Marker className='Marker' coordinates={[21.79763, 61.48451]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Pori", 207])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.59091, 60.64678]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lieto, Aura", 208])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.89362, 60.58584]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Marttila", 209])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.91017, 61.34047]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Sastamala, Vammala", 210])} />
            </Marker>
            <Marker className='Marker' coordinates={[21.84397, 61.10305]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Rauma, Lappi", 211])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.00550, 61.346496]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Nakkila", 221])} />
            </Marker>
            <Marker className='Marker' coordinates={[21.73386, 61.20227]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Eurajoki", 223])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.15809, 61.46781]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Ulvila, Kullaa", 224])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.30203, 60.30108]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Parainen", 225])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.38106, 61.80744]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kankaanpää", 226])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.50353, 60.43636]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kaarina, Kirismäki", 227])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.45294, 60.50257]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lieto", 230])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.09221, 60.46019]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Raisio, Vanto", 231])} />
            </Marker>
            <Marker className='Marker' coordinates={[21.79405, 60.46982]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Pori, Porin lentokenttä", 232])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.19330, 60.49613]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Raisio, Hauninen", 233])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.32088, 60.48607]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Turku, Oriketo", 234])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.29884, 60.44634]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Turku, Kupittaa", 235])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.40747, 60.52041]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Turku, Kurkela länsi", 237])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.43631, 60.52088]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kaarina, Kurkela itä", 238])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.37495, 60.40992]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kaarina", 239])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.52536, 60.42631]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kaarina, Piikkiö", 240])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.67062, 60.47004]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Paimio, Paimionjoki", 242])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.81748, 62.46720]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Paimio, Valkola", 243])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.69125, 60.45510]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Paimio, Vista", 244])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.91477, 60.41662]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Salo, Hajala", 245])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.15854, 60.42183]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Salo, Isokylä länsi", 247])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.17832, 60.47170]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Raisio, Ihala", 248])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.30458, 60.34834]}>
              <circle r={0.03} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Salo, Muurla", 249])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.10198, 60.57097]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Masku", 250])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.14055, 60.46787]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Raisio, Krookila", 251])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.18933, 60.45272]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Turku, Artukainen", 252])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.39041, 60.38801]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kaarina, Kuusisto", 254])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.22223, 60.28113]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Parainen, Simonby", 255])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.21537, 60.46253]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Turku, Härkämäki", 257])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.11653, 60.57985]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Hamina, Lankamalmi", 302])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.14594, 60.57823]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Hamina, Ruissalo", 303])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.17291, 60.59948]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Hamina, Husula", 304])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.21193, 60.61128]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Hamina, Kolsila itä", 305])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.55036, 60.97040]}>
              <circle r={0.015} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lappeenranta, Nuijamaa Uusi", 306])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.67495, 60.59550]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Virolahti, Virojoki", 307])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.51259, 60.56577]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Virolahti, Ravijoki", 308])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.80923, 60.61076]}>
              <circle r={0.02} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Virolahti, Vaalimaa", 309])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.81942, 60.59432]}>
              <circle r={0.02} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Virolahti, Vaalimaan tunneli itä", 310])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.52933, 60.95438]}>
              <circle r={0.015} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lappeenranta, Nuijamaa tulli", 311])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.75877, 61.41592]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lempäälä, Sääksjärvi", 401])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.05067, 61.15493]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Valkeakoski, Jutikka", 402])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.37123, 60.92420]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Humppila", 403])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.05623, 61.54231]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kangasala, Suinula", 404])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.46597, 60.99129]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Hämeenlinna", 405])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.35081, 61.49015]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Nokia, Linnavuori", 406])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.51628, 60.98866]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Hollola", 407])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.02714, 60.78645]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Hausjärvi", 408])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.07178, 61.98531]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Ruovesi", 409])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.59231, 61.54957]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Ylöjärvi", 421])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.76838, 61.21065]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Akaa, Viiala", 422])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.65286, 60.93133]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Hollola, Renkomäki", 424])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.76917, 60.80909]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Tammela", 425])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.56335, 61.17152]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Hämeenlinna, Hauho", 426])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.44173, 60.71781]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Loppi", 428])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.74355, 60.71702]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Riihimäki, Herajoki", 429])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.54722, 61.17230]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Asikkala", 430])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.00329, 61.47521]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kangasala, Suorama", 431])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.64604, 60.92004]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Janakkala", 432])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.96576, 61.28243]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Valkeakoski, Pispantie", 433])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.80737, 61.46328]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Tampere, Karkunvuori", 435])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.53648, 61.47571]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Nokia, Rajasalmi", 436])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.41205, 61.01331]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Hämeenlinna, Mo3", 437])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.69496, 61.51063]}>
              <circle r={0.015} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Tampere, Paasikiventie", 438])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.82619, 61.24504]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lempäälä, Lippo", 440])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.51684, 60.98853]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Hollola", 441])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.07524, 61.31082]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Heinola, Lusi", 442])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.71033, 61.50706]}>
              <circle r={0.015} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Tampere, Pispalan valtatie", 443])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.68992, 61.15042]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Akaa, Kylmäkoski", 445])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.61065, 60.97899]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lahti, Kärpäsenmäki", 446])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.70902, 60.99013]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lahti, Joutjärvi", 447])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.65709, 61.73537]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Orivesi, Talviainen", 448])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.73717, 61.45566]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Tampere, Sarankulma", 449])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.57523, 61.50262]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Tampere, Myllypuro", 450])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.95917, 61.52357]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Tampere, Aitovuori", 451])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.73121, 61.50422]}>
              <circle r={0.015} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Tampere, Onkiniemi", 452])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.74899, 61.50484]}>
              <circle r={0.015} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Tampere, Mustalahti", 453])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.67901, 61.51147]}>
              <circle r={0.015} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Tampere, Epilänharju", 455])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.66587, 61.51754]}>
              <circle r={0.015} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Tampere, Lielahti", 456])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.79466, 61.50725]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Tampere, Petsamo", 457])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.83712, 61.50233]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Tampere, Ruotula", 458])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.63809, 61.45676]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Pirkkala, Huovi", 460])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.93200, 61.10672]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Heinola, Vierumäki", 461])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.59399, 61.47630]}>
              <circle r={0.015} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Nokia, Rajasalmi", 462])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.59318, 61.46013]}>
              <circle r={0.015} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Pirkkala, Sankila", 463])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.77133, 61.47203]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Tampere, Rautaharkko", 464])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.51679, 60.94197]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Hämeenlinna", 465])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.39094, 61.02924]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Hämeenlinna", 466])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.63710, 60.95231]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lahti, Patomäki", 468])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.66797, 60.96263]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lahti, Liipola", 469])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.69664, 60.96857]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lahti, Lotila", 470])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.75037, 61.43973]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Tampere, Multisilta", 471])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.71595, 60.49551]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Pyhtää, Siltakylä", 501])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.18244, 60.91762]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Iitti, Mankala", 502])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.40638, 60.84878]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kouvola, Loveslampi", 503])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.86234, 60.60766]}>
              <circle r={0.02} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Virolahti, Rekkaparkki", 504])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.84396, 60.59497]}>
              <circle r={0.02} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Virolahti, Rekkaparkki 2", 505])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.30177, 60.55380]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Hamina, Lelu", 506])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.45081, 60.72135]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kouvola, Elimäki", 521])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.66580, 60.91883]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Luumäki", 522])} />
            </Marker>
            <Marker className='Marker' coordinates={[29.33826, 61.41814]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Rautijärvi, Änkilä", 524])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.45062, 61.32619]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Mikkeli, Suomenniemi", 526])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.06206, 61.08957]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kouvola, Tuohikotti", 527])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.91485, 62.18940]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Ruokolahti, Kotaniemi", 528])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.92389, 60.88213]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kouvola, Utti", 529])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.93362, 60.60313]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kotka, Juurikorpi", 530])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.85105, 61.23081]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Imatra, Rönkkä", 531])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.81176, 61.15184]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Imatra, raja 2", 532])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.37265, 61.02986]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lappeenranta, Karhusjärvi", 533])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.36417, 61.09210]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lappeenranta, Muukko", 534])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.83006, 61.13076]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Imatra, raja 1", 535])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.51097, 60.96728]}>
              <circle r={0.015} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lappeenranta Nuijamaa", 547])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.63136, 60.57401]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Virolahti, Vaahterikonsuo", 550])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.06238, 61.02850]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lappeenranta, Selkäharju", 556])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.16723, 61.03897]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lappeenranta, Mattila", 558])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.19973, 61.04607]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lappeenranta, Reijola", 559])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.24416, 61.04429]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lappeenranta, Karhuvuori", 560])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.28035, 61.06350]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lappeenranta, Hartikkala", 561])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.30385, 61.07702]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lappeenranta, Mälkiä", 562])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.50181, 61.11823]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lappeenranta, Juotseno", 563])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.67745, 61.16609]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lappeenranta, Korvenkangas", 564])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.00238, 60.55425]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kotka, Salminlahti", 572])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.12128, 60.55497]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Hamina, Summa", 573])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.89790, 60.50647]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Hamina, Kyminlinna", 574])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.54310, 60.49208]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Pyhtää 2", 575])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.93514, 60.51509]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kotka, Karhula", 576])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.96563, 60.52932]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kotka, Otsola", 577])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.48696, 60.50018]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Pyhtää, Ahvenkoski Itä", 578])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.71692, 60.49552]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Pyhtää, Siltakylä 2", 579])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.80297, 60.48922]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Pyhtää, Mokra", 580])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.79080, 60.59734]}>
              <circle r={0.02} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Virolahti, Vaalimaa", 581])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.52993, 60.96976]}>
              <circle r={0.015} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lappeenranta, Nuijamaa", 582])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.08548, 61.10823]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kotka, Petäjäsuo", 583])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.57205, 60.48997]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Pyhtää", 584])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.94428, 60.46543]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kotka, Kotkansaari", 586])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.42749, 60.91469]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Luumäki, Somerharju", 587])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.40998, 60.88256]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Iitti, Tillola", 590])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.80518, 60.81965]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kouvola, Havukka", 591])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.02581, 60.900530]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kouvola, Metso", 592])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.00705, 60.79863]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lappeenranta, Ylämaa", 593])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.53536, 60.82623]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kouvola, Hevossuo", 594])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.84759, 60.92479]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kouvola, Puhjo", 595])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.77220, 60.88736]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kouvola, Käyrälampi", 596])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.55397, 60.98590]}>
              <circle r={0.015} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lappeenranta, Nuijamaa", 597])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.80091, 60.58362]}>
              <circle r={0.02} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Virolahti, Vaalimaa", 598])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.87016, 60.50068]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kotka, Leppäsaari", 599])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.72085, 61.49966]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Mäntyharju, Toivola", 602])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.83482, 62.13832]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Joroinen, Tienhaara", 603])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.25789, 61.50648]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Mikkeli, Ristiina", 604])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.86172, 61.89471]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Juva1", 605])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.93803, 61.87473]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Savonlinna, Nojanmaa", 606])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.46007, 62.13273]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Pieksämäki, Virtasalmi", 607])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.50545, 62.09033]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kangasniemi, Synsiö", 622])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.02018, 61.57985]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Hartola", 623])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.06905, 61.27515]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Heinola, Murhamäki", 628])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.40625, 62.29035]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Pieksämäki, Siikamäki", 629])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.41051, 61.42178]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Pertunmaa, Kuortti", 630])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.88449, 62.26968]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Joroinen, Kuvansi", 631])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.87181, 61.87853]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Savonlinna, Hevonpäänniemi", 632])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.21929, 61.66111]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Mikkeli, Pitkäjärvi", 633])} />
            </Marker>
            <Marker className='Marker' coordinates={[29.23130, 62.64520]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Liperi, Viinijärvi", 701])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.09809, 62.17384]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kitee, Väärämäki", 704])} />
            </Marker>
            <Marker className='Marker' coordinates={[30.04955, 63.31133]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lieksä, Mähkö", 705])} />
            </Marker>
            <Marker className='Marker' coordinates={[29.24348, 62.60403]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Liperi, Kompero", 723])} />
            </Marker>
            <Marker className='Marker' coordinates={[30.59358, 62.17529]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Tohmajärvi, Niirala", 724])} />
            </Marker>
            <Marker className='Marker' coordinates={[29.21491, 63.29035]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Juuka, Lonkaa", 725])} />
            </Marker>
            <Marker className='Marker' coordinates={[29.57447, 62.62144]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Liperi, Ylämylly", 726])} />
            </Marker>
            <Marker className='Marker' coordinates={[29.81330, 62.65910]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kontiolahti, Lehmo", 727])} />
            </Marker>
            <Marker className='Marker' coordinates={[30.51755, 62.18482]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Tohmajärmi, Kaurila", 729])} />
            </Marker>
            <Marker className='Marker' coordinates={[29.69530, 62.62547]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Joensuu, Noljakka", 730])} />
            </Marker>
            <Marker className='Marker' coordinates={[29.83248, 62.54250]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Joensuu, Reijola", 731])} />
            </Marker>
            <Marker className='Marker' coordinates={[29.88212, 61.95289]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kitee, Kousa", 732])} />
            </Marker>
            <Marker className='Marker' coordinates={[29.76032, 62.61505]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Joensuu", 733])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.67254, 62.52292]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Leppävirta, Oikearanta", 801])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.98168, 63.68126]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Siilinjärvi, Pyyjärvi", 803])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.33593, 62.87294]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Tuusniemi, Tuusjärvi", 804])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.58202, 63.36639]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Rautavaara, Luostanlinna", 805])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.85543, 63.30577]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Pielavesi, Kopsankylä", 806])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.43254, 63.67476]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kiuruvesi, Hamarinvuori", 807])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.39792, 62.67721]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Suonenjoki, Kutunjärvi", 821])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.00141, 63.74301]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Vieremä", 822])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.05344, 63.15496]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Nilsiä, Suholanmäki", 824])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.61972, 62.79263]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kuopio, Hiltulanlahti", 825])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.25040, 63.56838]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Iisalmi, Paloisjärvi", 826])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.82986, 62.97117]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kuopio, Jännevirta", 827])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.68324, 62.91839]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kuopio, Rahusenlampi", 828])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.62707, 62.86115]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kuopio, Levänen", 832])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.72749, 63.62183]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Siilinjärvi, Pajukoski", 833])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.67697, 62.95123]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kuopio, Tikkalansaari", 834])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.21323, 60.96657]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kuopio, Sorsala", 835])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.69800, 62.98063]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Siilinjärvi, Vuorela", 836])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.72203, 62.65486]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Äänekoski, Karvalahti", 902])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.19813, 62.26142]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Laukaa, Lievestuore", 903])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.05918, 62.79623]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Saarijärvi, Alajärvi", 904])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.55882, 62.24772]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Keuruu, Tiusala", 905])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.16360, 61.55917]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kuhmoinen", 921])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.63838, 62.09616]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Muurame, Niittyaho", 922])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.79572, 62.24328]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Jyväskylä, Halssila", 923])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.66437, 63.23817]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Viitasaari, Löytänä", 925])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.38773, 61.97179]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Jyväskylä, Saakoski", 927])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.08465, 61.82911]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Joutsa, Harvastensuo", 928])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.88644, 62.23778]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Jyväskylä, Hupeli", 929])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.18513, 61.86780]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Jämsä", 930])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.39969, 62.26796]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Petäjävesi, Vehkasuo", 931])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.81304, 63.04027]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Viitasaari, Hännilänsalmi", 932])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.72072, 62.26976]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Jyväskylä, Mannila", 933])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.81496, 62.28970]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Jyväskylä, Palokangas", 934])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.98619, 62.10899]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Toivakka, Majalampi", 935])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.67723, 62.42651]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Laukaa, Vehniä", 936])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.31470, 62.02281]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Viitasaari, Tuliniemi", 937])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.75895, 62.23747]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Jyväskylä, Lutakko", 938])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.30287, 60.62219]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Mäntsälä", 998])} />
            </Marker>
            <Marker className='Marker' coordinates={[30.51306, 63.31574]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Ilmajoki, Majakangas", 1001])} />
            </Marker>
            <Marker className='Marker' coordinates={[21.82165, 63.02416]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Mustasaari, Hälsingby", 1002])} />
            </Marker>
            <Marker className='Marker' coordinates={[21.84188, 63.16063]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Mustasaari, Koivulahti", 1003])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.32446, 62.99997]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Isokyrö", 1004])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.74977, 62.57955]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kurikka, Luopajärvi", 1005])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.57087, 62.73445]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Ilmajoki", 1006])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.84068, 62.36034]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kurikka, Koskue", 1021])} />
            </Marker>
            <Marker className='Marker' coordinates={[21.33720, 62.47280]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Närpiö", 1022])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.13228, 63.84201]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kokkola", 1023])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.62826, 62.44508]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Alavus, Sampsalampi", 1024])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.69651, 63.54088]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Uusikaarlepyy, Kovjoki", 1026])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.81593, 63.00003]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Alajärvi", 1027])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.48615, 63.36403]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Evijärvi", 1028])} />
            </Marker>
            <Marker className='Marker' coordinates={[21.41571, 63.23378]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Mustasaari, Raippaluoto", 1029])} />
            </Marker>
            <Marker className='Marker' coordinates={[21.68979, 63.07309]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Vaasa", 1030])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.81744, 63.28667]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Alahärmä, Voltti", 1031])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.73391, 62.84247]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Seinäjoki, Munakka", 1032])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.74137, 62.60495]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Alavus, Tuuri", 1033])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.83435, 62.78867]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Seinäjoki", 1034])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.06502, 63.10124]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kauhava", 1035])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.71222, 63.67455]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Pietarsaari", 1036])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.58522, 61.16362]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Nurmo, Uittoo", 1037])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.69716, 63.54786]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kaustinen", 1038])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.06941, 62.55021]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Ähtäri", 1039])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.91679, 63.90039]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kannus", 1040])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.19695, 62.44078]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kauhajoki", 1042])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.40314, 62.65955]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kurikka, Panttila", 1043])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.50680, 62.80695]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kuortane", 1044])} />
            </Marker>
            <Marker className='Marker' coordinates={[21.77322, 62.95326]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Mustasaari, Riimala", 1045])} />
            </Marker>
            <Marker className='Marker' coordinates={[21.73907, 62.47941]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Teuva", 1046])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.43317, 62.64389]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kurikka, Tuiskula", 1047])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.19650, 63.80535]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kokkola, Ribacken", 1048])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.05498, 63.00885]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lapua, Voitilanjärvi", 1049])} />
            </Marker>
            <Marker className='Marker' coordinates={[21.37986, 62.27393]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kristiinankaupunki", 1050])} />
            </Marker>
            <Marker className='Marker' coordinates={[21.60137, 62.45475]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Laihia, Perälä", 1051])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.65422, 64.06168]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kalajoki, Himanka", 1052])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.06124, 62.99108]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Laihia, Vedenoja", 1053])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.17832, 62.42930]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kauhajoki", 1054])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.94346, 62.81788]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Alajärvi, Lehtimäki", 1055])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.46038, 62.59075]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Alavus, Kuivaskylä", 1056])} />
            </Marker>
            <Marker className='Marker' coordinates={[21.62888, 63.10727]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Vaasa, Yhdystie", 1057])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.51397, 62.94021]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Seinäjoki, Ylistaro", 1058])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.91015, 62.82922]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Seinäjoki, Nurmo", 1059])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.67455, 62.71299]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Alavus, Pohjoinen", 1060])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.83782, 62.81559]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Seinäjoki, Pajuneva", 1061])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.54289, 63.35142]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Töysä, Jokikylä", 1062])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.06662, 63.21684]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kaitsor, Vöyri-Maksamaa", 1063])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.51344, 63.17695]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Perho, Möttönen", 1064])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.15252, 62.55019]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Ähtäri, Inha", 1065])} />
            </Marker>
            <Marker className='Marker' coordinates={[21.73406, 63.12684]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Mustasaari, Lintuvuori", 1066])} />
            </Marker>
            <Marker className='Marker' coordinates={[21.67814, 63.12130]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Vaasa, Böle", 1067])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.82283, 62.70395]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Ilmajoki, Rengonkylä", 1068])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.92557, 62.80330]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Seinäjoki, Kertunlaakso", 1069])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.98151, 63.68133]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Pyhäjärvi", 1101])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.51462, 63.90602]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Sievi", 1103])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.30776, 64.16540]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Ylivieska, Alavieska", 1104])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.31775, 63.74872]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Haapajärvi", 1105])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.78625, 63.47995]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Veteli", 1122])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.81586, 64.26763]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Oulainen", 1123])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.94684, 64.27974]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kalajoki, Rahvo", 1124])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.49415, 64.97852]}>
              <circle r={0.015} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Oulu, Mäntylä", 1201])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.37345, 65.31185]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Ii", 1202])} />
            </Marker>
            <Marker className='Marker' coordinates={[29.18852, 66.04494]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kuusamo, Nissinvaara", 1203])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.48201, 64.68601]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Raahe", 1204])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.18196, 61.59694]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Liminka, Heinijärvi", 1205])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.54713, 64.94085]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Oulu, Ouluntulli", 1206])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.33328, 65.16628]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Haukipudas", 1207])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.65011, 64.50606]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Siikalatva, Rantsila", 1221])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.49048, 64.86421]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Liminka, Tupos", 1222])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.77565, 65.12792]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Oulu, Kiiminki", 1223])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.65573, 65.45220]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Pudasjärvi, Pintamo", 1224])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.98581, 65.36180]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Pudasjärvi", 1225])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.50353, 64.91316]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kempele", 1226])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.89911, 64.84841]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Muhos, Riihikylä", 1227])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.39001, 65.20081]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Oulu, Haukipudas", 1228])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.50008, 65.33419]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Ii, Myllykangas", 1229])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.69035, 65.36707]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Pudasjärvi, Rankkila", 1230])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.35677, 65.12863]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Oulu, Kello", 1231])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.42785, 65.41638]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Pudasjärvi, Kettumäki", 1232])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.22332, 64.42253]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Raahe, Alpua", 1233])} />
            </Marker>
            <Marker className='Marker' coordinates={[29.14694, 65.95306]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kuusamo, Toranki", 1234])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.80210, 64.92463]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Liminka, Lapinkangas", 1235])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.54833, 64.77303]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Liminka, Ala-Temmes", 1236])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.49748, 65.01547]}>
              <circle r={0.015} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Oulu, Intiö", 1237])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.47488, 65.04354]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Oulu, Isko", 1238])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.44931, 64.94203]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Oulu, Lentokentäntie", 1239])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.52396, 64.84038]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Liminka, Luhasto", 1243])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.51810, 65.03365]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Oulu, Laanila", 1244])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.49721, 65.06988]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Oulu, Kuivasjärvi", 1246])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.49561, 64.95775]}>
              <circle r={0.015} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Oulu, Oulunlahti", 1247])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.41417, 64.93462]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Oulu, Oulunsalo", 1248])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.37844, 64.93617]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Oulu, Lunki", 1249])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.54303, 65.00602]}>
              <circle r={0.015} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Oulu, Kontinkangas", 1250])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.47407, 64.98808]}>
              <circle r={0.015} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Oulu, Lintula", 1251])} />
            </Marker>
            <Marker className='Marker' coordinates={[29.19525, 65.97461]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kuusamo", 1252])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.71512, 65.00953]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Hailuoto", 1253])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.54912, 65.05038]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Oulu, Rusko2", 1254])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.36643, 64.52055]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Raahe, Hurnasperä", 1255])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.51816, 64.99389]}>
              <circle r={0.015} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Oulu, Kaukovainio", 1256])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.58153, 64.97245]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Oulu, Iinatti", 1257])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.02968, 64.31966]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kajaani, Mineraali", 1301])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.20679, 64.50491]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Ristijärvi", 1302])} />
            </Marker>
            <Marker className='Marker' coordinates={[29.65343, 63.99472]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kuhmo, Kankivaara", 1303])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.39953, 63.99692]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kajaani, Hatulanmäki", 1321])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.52460, 64.16229]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kajaani, Nuottijärvi", 1322])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.10952, 64.08795]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Sotkamo, Korholanmäki", 1323])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.64277, 64.60352]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Vaala, Törmäkylä", 1324])} />
            </Marker>
            <Marker className='Marker' coordinates={[29.90750, 64.49569]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kuhmo, Vartius", 1325])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.23541, 64.12175]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kajaani, Vuottolahti", 1326])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.77019, 65.05488]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Puolanka, Aska", 1327])} />
            </Marker>
            <Marker className='Marker' coordinates={[29.03259, 65.36219]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Suomussalmi, Tapiola", 1328])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.98758, 64.38976]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Paltamo, Mieslahti", 1329])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.81069, 66.08050]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Tervola", 1401])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.54185, 68.65353]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Inari, Ivalo", 1402])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.77372, 64.66161]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kemijärvi, Kenttälä", 1403])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.44220, 65.80020]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Keminmaa, Kaakamo", 1404])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.68460, 66.61976]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Rovaniemi, Misi", 1405])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.78940, 67.33188]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kolari", 1421])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.11175, 67.02912]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Rovaniemi, Jääskö", 1422])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.89000, 66.18456]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Posio, Perä-posio", 1423])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.04510, 66.58891]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Rovaniemi, Olkkajärvi", 1424])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.23849, 66.15532]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Ranua, Saukkokangas", 1425])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.02458, 66.56047]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kemijärvi, Suomu", 1426])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.72848, 66.64629]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Ylitornio, Raanujärvi", 1427])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.47000, 68.47596]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Inari, Rajajooseppi", 1429])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.89587, 66.93298]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Salla, Kelloselkä", 1430])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.16603, 65.84410]}>
              <circle r={0.015} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Tornio", 1431])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.73350, 66.40014]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Ylitornio, Aavasaksa", 1432])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.96619, 66.77620]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Pello", 1433])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.68464, 67.95325]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Muonio", 1435])} />
            </Marker>
            <Marker className='Marker' coordinates={[22.48392, 68.44922]}>
              <circle r={0.05} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Enontekiö, Karesuvanto", 1436])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.28594, 61.80805]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Keminmaa, Jokisuu", 1437])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.26796, 61.82716]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Keminmaa, Jokisuu", 1438])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.40525, 65.82645]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Tornio, Luukkaankangas", 1439])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.18510, 65.84634]}>
              <circle r={0.015} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Tornio, Torppi", 1441])} />
            </Marker>
            <Marker className='Marker' coordinates={[28.56710, 69.49998]}>
              <circle r={0.05} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Inari, Näätämö", 1442])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.87243, 70.08122]}>
              <circle r={0.05} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Utsjoki, Nuorgam", 1443])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.02844, 69.90908]}>
              <circle r={0.05} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Utsjoki", 1444])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.85577, 69.39754]}>
              <circle r={0.05} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Utsjoki, Karigasniemi", 1445])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.32149, 68.66186]}>
              <circle r={0.05} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Enontekiö, Kivilompolo", 1446])} />
            </Marker>
            <Marker className='Marker' coordinates={[20.80339, 69.04429]}>
              <circle r={0.05} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Enontekiö, Kilpisjärvi", 1447])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.64509, 67.19955]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Sodankylä, Torvinen", 1448])} />
            </Marker>
            <Marker className='Marker' coordinates={[26.70336, 67.75563]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Sodankylä, Yläpostojoki", 1449])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.72757, 66.52090]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Rovaniemi, Revontuli", 1450])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.62428, 66.47761]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Rovaniemi, Ala-Korkalo", 1451])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.73474, 65.68103]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kemi, Marostenmäki", 1452])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.60938, 65.71374]}>
              <circle r={0.015} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kemi, Siikalahti", 1453])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.59623, 65.72196]}>
              <circle r={0.015} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kemi, Peurasaari", 1454])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.57864, 65.73880]}>
              <circle r={0.015} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kemi, Karjalahti", 1455])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.58227, 65.75443]}>
              <circle r={0.015} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kemi, Kivikko", 1456])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.57750, 65.76722]}>
              <circle r={0.015} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kemi, Ristikangas", 1457])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.19959, 65.84185]}>
              <circle r={0.015} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Tornio", 1458])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.66728, 66.31971]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Ylitornio", 1459])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.68697, 66.52865]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Rovaniemi, Ylikylä", 1460])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.87584, 66.51830]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Rovaniemi, Vaarala", 1461])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.88979, 67.66662]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kittilä, Yli-Kittilä", 1462])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.49054, 66.71597]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Kemijärvi, Sipovaara", 1463])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.72253, 66.49065]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Rovaniemi, Vapaudentie", 1465])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.78589, 66.52953]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Rovaniemi, Syväsenvaara", 1466])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.76325, 66.47383]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Rovaniemi, Pöykkölä", 1467])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.63473, 67.91074]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Muonio, Pahtonen", 1468])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.28656, 63.08277]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Salo, Lakiamäki", 1601])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.48749, 60.37302]}>
              <circle r={0.045} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Salo, Kruusila", 1602])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.64526, 60.36890]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Salo, Syvälampi", 1603])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.70377, 60.37290]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Salo, Lahnajärvi", 1604])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.51078, 60.31231]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lohja, Hauklampi", 1605])} />
            </Marker>
            <Marker className='Marker' coordinates={[23.10818, 60.40738]}>
              <circle r={0.035} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lohja, Pitkämäki", 1606])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.05188, 60.29967]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Lohja, Karnainen", 1607])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.62791, 60.21957]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Hirvisuo", 20002])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.67433, 60.21058]}>
              <circle r={0.02} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Lommila", 20003])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.69967, 60.21115]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Kasavuori", 20004])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.71637, 60.19650]}>
              <circle r={0.02} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Sepänkylä", 20005])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.70533, 60.17749]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Kuurinniity", 20006])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.68510, 60.19052]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Tuomarila", 20007])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.76661, 60.22039]}>
              <circle r={0.02} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Nihtisilta", 20008])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.74073, 60.20045]}>
              <circle r={0.02} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Stensgård", 20009])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.79369, 60.17568]}>
              <circle r={0.02} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Turveradantie", 20010])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.76688, 60.19099]}>
              <circle r={0.02} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Sinimäki", 20011])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.76135, 60.20376]}>
              <circle r={0.015} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Sinimäki", 20012])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.79230, 60.20361]}>
              <circle r={0.02} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Espoo, Sinimäki 2", 20013])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.81468, 60.35493]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Nurmijärvi, Peräjänkulma", 20022])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.83943, 60.36937]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Nurmijärvi, Peräjänkulma 2", 20023])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.81458, 60.38956]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Nurmijärvi, Mäyränkallio", 20024])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.82907, 60.41417]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Nurmijärvi, Yli-Hemmi", 20025])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.80722, 60.46529]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Nurmijävi, Nurmijärvi", 20026])} />
            </Marker>
            <Marker className='Marker' coordinates={[24.94623, 60.51943]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Nurmijärvi, Peräjä", 20027])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.00937, 60.18396]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Helsinki, Kulosaari", 20028])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.91143, 61.89943]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Juva, 1", 20601])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.80777, 61.89875]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Juva, 2", 20602])} />
            </Marker>
            <Marker className='Marker' coordinates={[27.89116, 61.88370]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Juva, 3", 20603])} />
            </Marker>
            <Marker className='Marker' coordinates={[25.45839, 65.01373]}>
              <circle r={0.025} fill="#BA1DBD" onClick={(e) => setVisibility(!visibility) & setDatapoint(["Oulu, Intiö", 21201])} />
            </Marker>
          </ZoomableGroup>
        </ComposableMap>

        <CustomPopup
          onClose={popupCloseHandler}
          show={visibility}
          title={datapoint[0]}
          original={datahold}
          setoriginal={setDatahold}
          data={data}
          datapoint={datapoint[1]}
          setdata={setData}
          data1original={data1original}
          data2original={data2original}
          data3original={data3original}
          data4original={data4original}
          data5original={data5original}
          data6original={data6original}
          data7original={data7original}
          setdata1original={setdata1original}
          setdata2original={setdata2original}
          setdata3original={setdata3original}
          setdata4original={setdata4original}
          setdata5original={setdata5original}
          setdata6original={setdata6original}
          setdata7original={setdata7original}
          data1={data1}
          data2={data2}
          data3={data3}
          data4={data4}
          data5={data5}
          data6={data6}
          data7={data7}
          setdata1={setdata1}
          setdata2={setdata2}
          setdata3={setdata3}
          setdata4={setdata4}
          setdata5={setdata5}
          setdata6={setdata6}
          setdata7={setdata7}
        >

        </CustomPopup>
        
      </div>
    </div>
  );
}

export default App;
