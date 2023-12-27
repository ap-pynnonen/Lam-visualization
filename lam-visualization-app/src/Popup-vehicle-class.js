import { useEffect, useState, useRef } from "react"; //useEffect and useState import from react
import "./Popup.css"; //CSS styles import
import PropTypes from "prop-types"; //prop-types import
import { Chart } from "react-google-charts"; //import chart from react google charts
import { usePapaParse } from "react-papaparse";
import {FaDownload, FaToggleOff, FaToggleOn, FaRegChartBar, FaTrash, FaBars, FaRegWindowClose, FaInfo, FaWindowClose, FaMousePointer} from "react-icons/fa";

const CustomPopup = (props) => {
  const [show, setShow] = useState(false); //State declaration for popup show
  const [chartclick, setChartclick] = useState(false); //useState for chartclicks and stopping chart errors
  const Handleddatatime = [[{ type: "datetime", label: "date"}, "Nopeus (km/h)", { role: "style" }]]; //nested array for speed times of day
  const Dataholder = []; //temporarydata holder
  const [click, setclick] = useState([false, false]); //
  const [day, setDay] = useState([true, false, false, "1 Päivä:"]); //useState for functions to know which day data is displayed and need to be handled
  const [active, setActive] = useState([null, null, null]); //useState for day button active state
  const [chartimg, setChartimg] = useState([0]);
  const [showdownload, setshowdownload] = useState([false, false]);
  const selectedRows = [];
  const [rows, setrows] = useState([]);
  const [selectmultiple, setselectmultiple] = useState(false);
  const [selectText, setselectText] = useState(["Valitse yksi nopeus"]);
  const [defaultday, setdefaultday] = useState(true);
  const { readRemoteFile } = usePapaParse();
  const [Speedlimit, SetSpeedlimit] = useState([1,1]);
  const [speedlist, setSpeedlist] = useState([]);
  const textlist = [["Lam id", "paikka", "suunta", "viikonpäivä", "kuukausi", "päivä", "vuosi", "(aika: tunti, minuutti, sekunti)", "aikavyöhyke", "Nopeus (km/h)", "ajoneuvoluokka"]];

  const [vehicle, setvehicle] = useState([1, "Henkilö- tai pakettiauto"]);
  const Handleddatav1 = [["Nopeus", "Suunta 1 HA-PA", { role: "style" }, "Suunta 2 HA-PA", { role: "style" }]]; // 1 HA-PA (henkilö- tai pakettiauto)
  const Handleddatav2 = [["Nopeus", "Suunta 1 KAIP", { role: "style" }, "Suunta 2 KAIP", { role: "style" }]]; // 2 KAIP (kuorma-auto ilman perävaunua)
  const Handleddatav3 = [["Nopeus", "Suunta 1 Linja-autot", { role: "style" }, "Suunta 2 Linja-autot", { role: "style" }]]; // 3 Linja-autot
  const Handleddatav4 = [["Nopeus", "Suunta 1 KAPP", { role: "style" }, "Suunta 2 KAPP", { role: "style" }]]; // 4 KAPP (kuorma-auto ja puoliperävaunu)
  const Handleddatav5 = [["Nopeus", "Suunta 1 KATP", { role: "style" }, "Suunta 2 KATP", { role: "style" }]]; // 5 KATP (kuorma-auto ja täysperävaunu)
  const Handleddatav6 = [["Nopeus", "Suunta 1 HA + PK", { role: "style" }, "Suunta 2 HA + PK", { role: "style" }]]; // 6 HA + PK (henkilöauto ja peräkärry)
  const Handleddatav7 = [["Nopeus", "Suunta 1  HA + AV", { role: "style" }, "Suunta 2  HA + AV", { role: "style" }]]; // 7 HA + AV (henkilöauto ja asuntovaunu)
  const Handleddatav8 = [["Nopeus", "Suunta 1 MP", { role: "style" }, "Suunta 2 MP", { role: "style" }]]; // 8 MP (Moottoripyörät ja mopot)
  const Handleddatav9 = [["Nopeus", "Suunta 1 HCT", { role: "style" }, "Suunta 2 HCT", { role: "style" }]]; // 9 HCT (High Capacity Truck)
  const [Title, setTitle] = useState(["Ajoneuvot", "Nopeus"]);


  const [log, setlog] = useState(false);
  const [open, setopen] = useState(false);
  const [daydrop, setdaydrop] = useState(false);
  const [Selectdrop, setselect] = useState(false);
  const ref = useRef(null);

/*
TODO:
dark mode

more info text

*/



//list of speedlimits
// direction1 120/100 | direction2 120/100
const speed120120 = [1, 5, 7, 8, 99, 104, 108, 110, 112, 119, 139, 141, 142, 172, 176, 177, 178, 184, 185, 187, 188, 189, 190, 191,
  192, 193, 194, 198, 227, 239, 240, 242, 243, 244, 245, 247, 248, 302, 305, 307, 308, 424, 429, 432, 440, 461, 470, 471, 506, 572,
  573, 575, 579, 580, 628, 998, 1030, 1439, 1601, 1602, 1603, 1604, 1605, 1606, 1607, 20021, 20022, 20023, 20024, 20025, 20026, 20027];
// direction1 120/100 | direction2 100/100
const speed120100 = [137];
// direction1 120/100 | direction2 80/80
const speed12080 = [4];
// direction1 100/100 | direction2 100/100
const speed100100 = [9, 103, 106, 109, 140, 143, 144, 154, 156, 167, 175, 179, 183, 205, 232, 233, 234, 238, 249, 250, 303, 304, 310, 401,
  404, 406, 431, 435, 437, 448, 449, 450, 460, 462, 463, 465, 466, 521, 522, 531, 534, 556, 558, 559, 560, 561, 562, 563, 564, 574, 576,
  577, 578, 583, 587, 592, 599, 602, 607, 631, 725, 730, 825, 828, 832, 834, 835, 836, 922, 928, 933, 935, 1066, 1067, 1068, 1069, 1101, 1201,
  1206, 1226, 1230, 1237, 1238, 1243, 1244, 1246, 1250, 1251, 1324, 1328, 1402, 1403, 1421, 1422, 1437, 1438, 1448, 1449, 1452, 1453,
  1454, 1455, 1456, 1457, 1468, 20003, 20004, 20005, 20006, 20007, 20008, 20009, 20010, 20011, 20012, 20013, 20014, 20015, 20017, 20018,
  20019, 20020, 21201];
// direction1 100/100 | direction2 120/100
const speed100120 = [20002];
// direction1 100/80 | direction2 100/80
const speed10080 = [122, 129, 134, 203, 204, 206, 208, 206, 209, 210, 224, 226, 407, 408, 425, 426, 428, 442, 445, 502, 524, 526, 527,
  530, 590, 591, 593, 595, 596, 603, 604, 622, 623, 629, 630, 701, 704, 723, 726, 727, 731, 732, 801, 805, 806, 807, 821, 822, 826,
  827, 902, 925, 927, 931, 1001, 1003, 1004, 1005, 1006, 1021, 1022, 1024, 1026, 1027, 1028, 1031, 1032, 1033, 1035, 1037, 1041, 1042,
  1045, 1046, 1048, 1049, 1050, 1053, 1060, 1063, 1104, 1105, 1122, 1123, 1124, 1203, 1205, 1221, 1224, 1225, 1229, 1231, 1232, 1233,
  1255, 1301, 1302, 1303, 1321, 1322, 1323, 1325, 1326, 1327, 1329, 1405, 1423, 1424, 1425, 1427, 1466];
// direction1 100/80 | direction2 80/80
const speed10081 = [430];
// direction1 100/80 | direction2 60/60
const speed10061 = [1447];
// direction1 100/100 | direction2 60/60
const speed10060 = [117];
// direction1 80/80 | direction2 80/80
const speed8080 = [3, 12, 13, 98, 101, 102, 105, 107, 114, 115, 121, 124, 125, 126, 127, 128, 130, 131,
  133, 135, 136, 145, 146, 147, 148, 149, 150, 152, 153, 158, 159, 160, 162, 163, 164, 165, 169, 182, 195,
  196, 201, 207, 211, 221, 223, 225, 231, 235, 237, 252, 255, 402, 403, 405, 409, 421, 422, 433, 441, 443, 447,
  451, 453, 464, 503, 504, 505, 528, 529, 533, 547, 550, 584, 594, 605, 633, 733, 803, 804, 824, 833, 903,
  904, 905, 921, 923, 930, 932, 934, 936, 937, 1002, 1023, 1029, 1034, 1036, 1038, 1039, 1040, 1043, 1044, 1047,
  1051, 1052, 1054, 1055, 1056, 1057, 1058, 1059, 1062, 1064, 1065, 1103, 1202, 1207, 1222, 1227, 1234,
  1235, 1236, 1239, 1253, 1254, 1257, 1401, 1404, 1426, 1446, 1451, 1458, 1459, 1460, 1461, 1462, 20016,
  20028, 20601, 20602, 20603];
// direction1 80/80 | direction2 100/100
const speed80100 = [111, 1061];
// direction1 80/80 | direction2 70/70
const speed8070 = [455]
// direction1 80/70 | direction2 80/70
const speed8071 = [469, 729];
// direction1 80/80 | direction2 50/50
const speed8050 = [468];
// direction1 70/70 | direction2 70/70
const speed7070 = [10, 116, 230, 254, 436, 446, 458, 586, 938, 1463];
// direction1 70/70 | direction2 60/60
const speed7060 = [438, 452];
// direction1 60/60 | direction2 60/60
const speed6060 = [6, 11, 118, 123, 138, 151, 197, 251, 456, 457, 606, 632, 705, 929, 1204, 1223, 1228, 1247,
  1248, 1249, 1256, 1436, 1442, 1445, 1450, 1465, 1467];
// direction1 60/60 | direction2 120/100
const speed60120 = [1441]; 
// direction1 60/60 | direction2 100/100
const speed60100 = [309];
// direction1 50/50 | direction2 50/50
const speed5050 = [257, 501, 1443];
// direction1 50/50 | direction2 20/20
const speed5020 = [724];
// direction1 40/40 | direction2 40/40
const speed4040 = [1430];
// direction1 30/30 | direction2 30/30
const speed3030 = [311, 532, 581, 598, 1252, 1429, 1431, 1432, 1433, 1435, 1444];
// direction1 30/30 | direction2 60/60
const speed3060 = [535];
// direction1 20/20 | direction2 20/20
const speed2020 = [306, 582, 597];

    //function to close popup
    const closeHandler = (e) => {
        setShow(false);
        setopen(false);
        setlog(false);
        setselect(false);
        setdaydrop(false);
        setselectmultiple(false);
        setshowdownload([false, false]);
        setvehicle([1, "Henkilö- tai pakettiauto"]);
        setTitle(["Ajoneuvot", "Nopeus"]);
        props.setdata([["Nopeus", "Suunta 1 Autot", { role: "style" }, "Suunta 2 Autot", { role: "style" }], ["1 km/h", 1, "color: #BA1DBD", 3, "color: #BA1DBD"]]); //clear chart data to make sure map view does not get laggy
        setclick([false, false]);
        setdefaultday(true);
        props.onClose(false);
    }

    //useEffect for popup show
    useEffect(() => {
      setShow(props.show);
    }, [props.show]);

    //toggle dropdown to open or close
    const handleopen = () => {
      setopen(!open);
    };

    //change vehicle class while keeping same day selected
    function ChangeVehicleClass(vehicleclass) {
      setclick([false, false]);
      let clickfalse = false;
      if (active[0] == true) {
        DataHandle1(props.dataO1, vehicleclass);
      }
      else if (active[1] == true) {
        compileData(props.dataO1, props.dataO2, props.dataO3, vehicleclass, clickfalse);
      }
      else if (active[2] == true) {
        compileData2(props.dataO1, props.dataO2, props.dataO3, props.dataO4, props.dataO5, props.dataO6, props.dataO7, vehicleclass, clickfalse);
      }
      else {
      }
    }

    //speedlimit check from lamid
    function speedlimit(lamid) {
      let Summer = ifSummer();
        let direction1 = 0;
        let direction2 = 0;
      // direction1 20/20 | direction2 20/20
      for(let i = 0; i<speed2020.length ;i++) {
        if (lamid == speed2020[i]){
          direction1 = 20;
          direction2 = 20;
          return([direction1, direction2]);
        }
      }
      // direction1 30/30 | direction2 60/60
      if (lamid == speed3060[0]) {
        direction1 = 30;
        direction2 = 60;
        return([direction1, direction2]);
      }
      // direction1 30/30 | direction2 30/30
      for(let i = 0; i<speed3030.length ;i++) {
        if (lamid == speed3030[i]){
          direction1 = 30;
          direction2 = 30;
          return([direction1, direction2]);
        }
      }
      // direction1 40/40 | direction2 40/40
      if (lamid == speed4040[0]) {
        direction1 = 40;
        direction2 = 40;
        return([direction1, direction2]);
      }
      // direction1 50/50 | direction2 20/20
      if (lamid == speed5020[0]) {
        direction1 = 50;
        direction2 = 20;
        return([direction1, direction2]);
      }
      // direction1 50/50 | direction2 50/50
      for(let i = 0; i<speed5050.length ;i++) {
        if (lamid == speed5050[i]){
          direction1 = 50;
          direction2 = 50;
          return([direction1, direction2]);
        }
      }
      // direction1 60/60 | direction2 100/100
      if (lamid == speed60100[0]) {
        direction1 = 60;
        direction2 = 100;
        return([direction1, direction2]);
      }
      // direction1 60/60 | direction2 120/100
      if (lamid == speed60120[0]) {
        if(Summer == true) {
          direction1 = 60;
          direction2 = 120;
          return([direction1, direction2]);
        }
        else {
          direction1 = 60;
          direction2 = 100;
          return([direction1, direction2]);
        }
      }
      // direction1 60/60 | direction2 60/60
      for(let i = 0; i<speed6060.length ;i++) {
        if (lamid == speed6060[i]){
          direction1 = 60;
          direction2 = 60;
          return([direction1, direction2]);
        }
      }
      // direction1 70/70 | direction2 60/60
      for(let i = 0; i<speed7060.length ;i++) {
        if (lamid == speed7060[i]){
          direction1 = 70;
          direction2 = 60;
          return([direction1, direction2]);
        }
      }
      // direction1 70/70 | direction2 70/70
      for(let i = 0; i<speed7070.length ;i++) {
        if (lamid == speed7070[i]){
          direction1 = 70;
          direction2 = 70;
          return([direction1, direction2]);
        }
      }
      // direction1 80/80 | direction2 50/50
      if (lamid == speed8050[0]) {
        direction1 = 80;
        direction2 = 50;
        return([direction1, direction2]);
      }
      // direction1 80/70 | direction2 80/70
      for(let i = 0; i<speed8071.length ;i++) {
        if (lamid == speed8071[i]){
          if(Summer == true) {
            direction1 = 80;
            direction2 = 80;
            return([direction1, direction2]);
          }
          else {
            direction1 = 70;
            direction2 = 70;
            return([direction1, direction2]);
          }
        }
      }
      // direction1 80/80 | direction2 70/70
      if (lamid == speed8070[0]) {
        direction1 = 80;
        direction2 = 70;
        return([direction1, direction2]);
      }
      // direction1 80/80 | direction2 100/100
      for(let i = 0; i<speed80100.length ;i++) {
        if (lamid == speed80100[i]){
          direction1 = 80;
          direction2 = 100;
          return([direction1, direction2]);
        }
      }
      // direction1 80/80 | direction2 80/80
      for(let i = 0; i<speed8080.length ;i++) {
        if (lamid == speed8080[i]){
          direction1 = 80;
          direction2 = 80;
          return([direction1, direction2]);
        }
      }
      // direction1 100/100 | direction2 60/60
      if (lamid == speed10060[0]) {
        direction1 = 100;
        direction2 = 60;
        return([direction1, direction2]);
      }
      // direction1 100/80 | direction2 60/60
      if (lamid == speed10061[0]) {
        if(Summer == true) {
          direction1 = 100;
          direction2 = 60;
          return([direction1, direction2]);
        }
        else {
          direction1 = 80;
          direction2 = 60;
          return([direction1, direction2]);
        }
      }
      // direction1 100/80 | direction2 80/80
      if (lamid == speed10081[0]) {
        if(Summer == true) {
          direction1 = 100;
          direction2 = 80;
          return([direction1, direction2]);
        }
        else {
          direction1 = 80;
          direction2 = 80;
          return([direction1, direction2]);
        }
      }
      // direction1 100/80 | direction2 100/80
      for(let i = 0; i<speed10080.length ;i++) {
        if (lamid == speed10080[i]){
          if(Summer == true) {
            direction1 = 100;
            direction2 = 100;
            return([direction1, direction2]);
          }
          else {
            direction1 = 80;
            direction2 = 80;
            return([direction1, direction2]);
          }
        }
      }
      // direction1 100/100 | direction2 120/100
      if (lamid == speed100120[0]) {
        if(Summer == true) {
          direction1 = 100;
          direction2 = 120;
          return([direction1, direction2]);
        }
        else {
          direction1 = 100;
          direction2 = 100;
          return([direction1, direction2]);
        }
      }
      // direction1 100/100 | direction2 100/100
      for(let i = 0; i<speed100100.length ;i++) {
        if (lamid == speed100100[i]){
          direction1 = 100;
          direction2 = 100;
          return([direction1, direction2]);
        }
      }
      // direction1 120/100 | direction2 80/80
      if (lamid == speed12080[0]) {
        if(Summer == true) {
          direction1 = 120;
          direction2 = 80;
          return([direction1, direction2]);
        }
        else {
          direction1 = 100;
          direction2 = 80;
          return([direction1, direction2]);
        }
      }
      // direction1 120/100 | direction2 100/100
      if (lamid == speed120100[0]) {
        if(Summer == true) {
          direction1 = 120;
          direction2 = 100;
          return([direction1, direction2]);
        }
        else {
          direction1 = 100;
          direction2 = 100;
          return([direction1, direction2]);
        }
      }
      // direction1 120/100 | direction2 120/100
      for(let i = 0; i<speed120120.length ;i++) {
        if (lamid == speed120120[i]){
          if(Summer == true) {
            direction1 = 120;
            direction2 = 120;
            return([direction1, direction2]);
          }
          else {
            direction1 = 100;
            direction2 = 100;
            return([direction1, direction2]);
          }
        }
      }

      //check if summer for summer speed
      function ifSummer() {
        let current = new Date(); //current date
        let day = current.getDate();
        let month = current.getMonth();
        let summer = '3-12'; // 12.4
        let winter = '9-28'; // 28.10
        let date = month + "-" + day; //combine month and day

        if(date >= summer && date <= winter) {
          return true;
        }
        else {
          return false;
        }
    }
  }

    function getData(){
      setdefaultday(false) // gets only neccessary data
     let datadate = getDate(); // get dates
     //create lamraw urls to get data
     let url1 = "/api_call/api/tms/v1/history/raw/lamraw?lamid=" + props.datapoint + "&yearshort=" + datadate[0] + "&daynumber=" + datadate[1];
     let url2 = "/api_call/api/tms/v1/history/raw/lamraw?lamid=" + props.datapoint + "&yearshort=" + datadate[0] + "&daynumber=" + datadate[2];
     if (datadate[8] !== 0) {
      url2 = "/api_call/api/tms/v1/history/raw/lamraw?lamid=" + props.datapoint + "&yearshort=" + datadate[8] + "&daynumber=" + datadate[2];
     }
     let url3 = "/api_call/api/tms/v1/history/raw/lamraw?lamid=" + props.datapoint + "&yearshort=" + datadate[0] + "&daynumber=" + datadate[3];
     if (datadate[9] !== 0) {
      url3 = "/api_call/api/tms/v1/history/raw/lamraw?lamid=" + props.datapoint + "&yearshort=" + datadate[9] + "&daynumber=" + datadate[3];
     }
     let url4 = "/api_call/api/tms/v1/history/raw/lamraw?lamid=" + props.datapoint + "&yearshort=" + datadate[0] + "&daynumber=" + datadate[4];
     if (datadate[10] !== 0) {
      url4 = "/api_call/api/tms/v1/history/raw/lamraw?lamid=" + props.datapoint + "&yearshort=" + datadate[10] + "&daynumber=" + datadate[4];
     }
     let url5 = "/api_call/api/tms/v1/history/raw/lamraw?lamid=" + props.datapoint + "&yearshort=" + datadate[0] + "&daynumber=" + datadate[5];
     if (datadate[11] !== 0) {
      url5 = "/api_call/api/tms/v1/history/raw/lamraw?lamid=" + props.datapoint + "&yearshort=" + datadate[11] + "&daynumber=" + datadate[5];
     }
     let url6 = "/api_call/api/tms/v1/history/raw/lamraw?lamid=" + props.datapoint + "&yearshort=" + datadate[0] + "&daynumber=" + datadate[6];
     if (datadate[12] !== 0) {
      url6 = "/api_call/api/tms/v1/history/raw/lamraw?lamid=" + props.datapoint + "&yearshort=" + datadate[12] + "&daynumber=" + datadate[6];
     }
     let url7 = "/api_call/api/tms/v1/history/raw/lamraw?lamid=" + props.datapoint + "&yearshort=" + datadate[0] + "&daynumber=" + datadate[7];
     if (datadate[13] !== 0) {
      url7 = "/api_call/api/tms/v1/history/raw/lamraw?lamid=" + props.datapoint + "&yearshort=" + datadate[13] + "&daynumber=" + datadate[7];
     }

     //get data
    let day1data = 1;
    handleReadRemoteFile(url1, day1data);
    setTimeout(400);
    let day2data = 2;
    handleReadRemoteFile(url2, day2data);
    setTimeout(400);
    let day3data = 3;
    handleReadRemoteFile(url3, day3data);
    setTimeout(400);
    let day4data = 4;
    handleReadRemoteFile(url4, day4data);
    setTimeout(400);
    let day5data = 5;
    handleReadRemoteFile(url5, day5data);
    setTimeout(400);
    let day6data = 6;
    handleReadRemoteFile(url6, day6data);
    setTimeout(400);
    let day7data = 7;
    handleReadRemoteFile(url7, day7data);
    }

    //get csv data and parse csv data
    const handleReadRemoteFile = (url, num) => {
      readRemoteFile(url, {
        complete: (results) => {
          if(num == 1) {
            props.setdataO1(results);
            DataHandle1(results); //show day 1 data
          }
          else if (num == 2) {
            props.setdataO2(results);
          }
          else if (num == 3) {
            props.setdataO3(results);
          }
          else if (num == 4) {
            props.setdataO4(results);
          }
          else if (num == 5) {
            props.setdataO5(results);
          }
          else if (num == 6) {
            props.setdataO6(results);
          }
          else if (num == 7) {
            props.setdataO7(results);
          }
          else{
            console.log("no data");
          }
        },
        // if error occurs getting data e.g file not found
        error: (error) => {
          console.log("Error: " + error.message);
          if (num == 7) {
            closeHandler();
          }
        }
       });
    }

    //get dates for url's
    function getDate() {
      let current = new Date();
      let day = current.getDate()-2;
      let month = current.getMonth();
      const year = current.getFullYear();
      let urlYear = year - 2000;
      let urlYear2 = 0;
      let urlYear3 = 0;
      let urlYear4 = 0;
      let urlYear5 = 0;
      let urlYear6 = 0;
      let urlYear7 = 0;

      let days1 = calculateDays(day, month);
      if (days1 == 0) {
        urlYear = urlYear -1;
        days1 = calculateDays(31, 11);
      }
      let days2 = calculateDays(day, month) - 1;
      if (days2 < 1) {
        days2 = calculateDays(31, 11) + days2;
        urlYear2 = urlYear -1;
        if (isLeapYear(year-1) === true) {
          days2++;
        }
      }
      let days3 = -2 + calculateDays(day, month);
      if (days3 < 1) {
        days3 = calculateDays(31, 11) + days3;
        urlYear3 = urlYear -1;
        if (isLeapYear(year-1) === true) {
          days3++;
        }
      }
      let days4 = -3 + calculateDays(day, month);
      if (days4 < 1) {
        days4 = calculateDays(31, 11) + days4;
        urlYear4 = urlYear -1;
        if (isLeapYear(year-1) === true) {
          days4++;
        }
      }
      let days5 = calculateDays(day, month)-4;
      if (days5 < 1) {
        days5 = calculateDays(31, 11) + days5;
        urlYear5 = urlYear -1;
        if (isLeapYear(year-1) === true) {
          days5++;
        }
      }
      let days6 = calculateDays(day, month)-5;
      if (days6 < 1) {
        days6 = calculateDays(31, 11) + days6;
        urlYear6 = urlYear -1;
        if (isLeapYear(year-1) === true) {
          days6++;
        }
      }
      let days7 = calculateDays(day, month)-6;
      if (days7 < 1) {
        days7 = calculateDays(31, 11) + days7;
        urlYear7 = urlYear -1;
        if (isLeapYear(year-1) === true) {
          days7++;
        }
      }

      return([urlYear, days1, days2, days3, days4, days5, days6, days7, urlYear2, urlYear3, urlYear4, urlYear5, urlYear6, urlYear7]);
      function calculateDays(number1, number2) {
        let value = 0;
        if (number2 === 0) { //January
           value = number1;
           return (value);
        }
        if (number2 === 1) { //February
          value = number1 + 31;
          return(value);
        }
        if (number2 === 2) { //March
          if (isLeapYear(year) === true) {
            value = number1 + 31 + 29;
            return(value);
          }
          else {
            value = number1 + 31 + 28;
            return(value);
          }
        }
        if (number2 === 3) { //April
          if (isLeapYear(year) === true) {
            value = number1 + 31 + 29 + 31;
            return(value);
          }
          else {
            value = number1 + 31 + 28 + 31;
            return(value);
          }
        }
        if (number2 === 4) { //May
          if (isLeapYear(year) === true) {
            value = number1 + 31 + 29 + 31 + 30;
            return(value);
          }
          else {
            value = number1 + 31 + 28 + 31 + 30;
            return(value);
          }
        }
        if (number2 === 5) { //June
          if (isLeapYear(year) === true) {
            value = number1 + 31 + 29 + 31 + 30 + 31;
            return(value);
          }
          else {
            value = number1 + 31 + 28 + 31 + 30 + 31;
            return(value);
          }
        }
        if (number2 === 6) { //July
          if (isLeapYear(year) === true) {
            value = number1 + 31 + 29 + 31 + 30 + 31 + 30;
            return(value);
          }
          else {
            value = number1 + 31 + 28 + 31 + 30 + 31 + 30;
            return(value);
          }
        }
        if (number2 === 7) { //August
          if (isLeapYear(year) === true) {
            value = number1 + 31 + 29 + 31 + 30 + 31 + 30 + 31;
            return(value);
          }
          else {
            value = number1 + 31 + 28 + 31 + 30 + 31 + 30 + 31;
            return(value);
          }
        }
        if (number2 === 8) { //September
          if (isLeapYear(year) === true) {
            value = number1 + 31 + 29 + 31 + 30 + 31 + 30 + 31 + 31;
            return(value);
          }
          else {
            value = number1 + 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31;
            return(value);
          }
        }
        if (number2 === 9) { //October
          if (isLeapYear(year) === true) {
            value = number1 + 31 + 29 + 31 + 30 + 31 + 30 + 31 + 31 + 30;
            return(value);
          }
          else {
            value = number1 + 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30;
            return(value);
          }
        }
        if (number2 === 10) { //November
          if (isLeapYear(year) === true) {
            value = number1 + 31 + 29 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31;
            return(value);
          }
          else {
            value = number1 + 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31;
            return(value);
          }
        }
        if (number2 === 11) { //December
          if (isLeapYear(year) === true) {
            value = number1 + 31 + 29 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30;
            return(value);
          }
          else {
            value = number1 + 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30;
            return(value);
          }
        }
      }
  
      function isLeapYear(year) { //check if leap year
        return (year%4 === 0 && year%100 !==0 || year%400 === 0);
      }
    }

    //calculate year month day for each 1-7 days
    function getDatespeedlist(daychange) {
      let current = new Date();
      let day = current.getDate()-2-daychange;
      let month = current.getMonth();
      const year = current.getFullYear();
      let year2 = year-1;

      if (day < 1 && month === 0) {
        day = day + 31;
        month = 11;
        return ([[year2], [month], [day]]);
      }
      else if(day < 1 && month === 1) {
        day = day + 31;
        month = 0;
        return ([[year], [month], [day]]);
      }
      else if(day < 1 && month === 2) {
        if (isLeapYear(year) === true) {
          day = day + 29;
          month = 1;
          return ([[year], [month], [day]]);
        }
        else {
          day = day + 28;
          month = 1;
          return ([[year], [month], [day]]);
        }
      }
      else if(day < 1 && month === 3) {
        day = day + 31;
        month = 2;
        return ([[year], [month], [day]]);
      }
      else if(day < 1 && month === 4) {
        day = day + 30;
        month = 3;
        return ([[year], [month], [day]]);
      }
      else if(day < 1 && month === 5) {
        day = day + 31;
        month = 4;
        return ([[year], [month], [day]]);
      }
      else if(day < 1 && month === 6) {
        day = day + 30;
        month = 5;
        return ([[year], [month], [day]]);
      }
      else if(day < 1 && month === 7) {
        day = day + 31;
        month = 6;
        return ([[year], [month], [day]]);
      }
      else if(day < 1 && month === 8) {
        day = day + 31;
        month = 7;
        return ([[year], [month], [day]]);
      }
      else if(day < 1 && month === 9) {
        day = day + 30;
        month = 8;
        return ([[year], [month], [day]]);
      }
      else if(day < 1 && month === 10) {
        day = day + 31;
        month = 9;
        return ([[year], [month], [day]]);
      }
      else if(day < 1 && month === 11) {
        day = day + 30;
        month = 10;
        return ([[year], [month], [day]]);
      }
      else {
        return ([[year], [month], [day]]);
      }

      function isLeapYear(year) { //check if leap year
        return (year%4 === 0 && year%100 !==0 || year%400 === 0);
      }
    }

    function DataHandle1 (Data, vehicleclass) { //day 1 change speeds data according to day variable
      setDay([true, false, false, "1 Päivä:"]);
      setChartclick(false);
      setActive([true, false, false]);
      setshowdownload([false, false]);
      setrows([]);
      if(Selectdrop == true && selectmultiple == false) {
        setselect(false);
      }
      //speed target
      let target = 100;
      let speedcounter = 0;
      let text = "km/h";

      let speedlimits = speedlimit(Data.data[0][0]);
      SetSpeedlimit([speedlimits[0], speedlimits[1]]);
      target = speedlimits[0];
      let target2 = speedlimits[1];
      
      //counter for counting how many cars with certain speed
      let counter = 0;
      let counter2 = 0;

      if (vehicleclass > 0) {

      //loop for every single speed
      for (let k = 0;k < 195;k++) {
    
        //reset counter after single speed check
        counter = 0;
        counter2 = 0;
        //loop for checking how many cars with certain speed
  
        for(let i = 0; i < Data.data.length; i++) {
          if (speedcounter == Data.data[i][11] && Data.data[i][9] == 1 && Data.data[i][12] == 0 && Data.data[i][10] == vehicleclass) {
            counter++;
          }
          else if (speedcounter == Data.data[i][11] && Data.data[i][9] == 2 && Data.data[i][12] == 0 && Data.data[i][10] == vehicleclass) {
            counter2++;
          }
        }
  
       let speed = speedcounter.toString();
       let newspeed = speed.concat(" ", text);
       let color = "";
       let color2 = "";
       //give color according to speedlimit
       if ( speedcounter < target+1) {
        color = "color: #23DE36";
       }
       else if (speedcounter > target-21 && speedcounter < target+11) {
        color = "color: #f7df0c";
       }
       else if (speedcounter > target-36 && speedcounter < target+16) {
        color = "color: #FF5F1B";
       }
       else if (speedcounter > target-51 && speedcounter < target+21) {
        color = "color: #c90000";
       }
       else {
        color = "color: #300404";
       }
       if ( speedcounter < target2+1) {
        color2 = "color: #23DE36";
       }
       else if (speedcounter > target2-21 && speedcounter < target2+11) {
        color2 = "color: #f7df0c";
       }
       else if (speedcounter > target2-36 && speedcounter < target2+16) {
        color2 = "color: #FF5F1B";
       }
       else if (speedcounter > target2-51 && speedcounter < target2+21) {
        color2 = "color: #c90000";
       }
       else {
        color2 = "color: #300404";
       }
       if (counter > 0 && counter2 == 0) {
        counter2 = null;
       }
       if (vehicleclass == 1) {
        Handleddatav1.push([newspeed, counter, color, counter2, color2]); //add new speed, car amount and color
       }
       else if (vehicleclass == 2) {
        Handleddatav2.push([newspeed, counter, color, counter2, color2]); //add new speed, car amount and color
       }
       else if (vehicleclass == 3) {
        Handleddatav3.push([newspeed, counter, color, counter2, color2]); //add new speed, car amount and color
       }
       else if (vehicleclass == 4) {
        Handleddatav4.push([newspeed, counter, color, counter2, color2]); //add new speed, car amount and color
       }
       else if (vehicleclass == 5) {
        Handleddatav5.push([newspeed, counter, color, counter2, color2]); //add new speed, car amount and color
       }
       else if (vehicleclass == 6) {
        Handleddatav6.push([newspeed, counter, color, counter2, color2]); //add new speed, car amount and color
       }
       else if (vehicleclass == 7) {
        Handleddatav7.push([newspeed, counter, color, counter2, color2]); //add new speed, car amount and color
       }
       else if (vehicleclass == 8) {
        Handleddatav8.push([newspeed, counter, color, counter2, color2]); //add new speed, car amount and color
       }
       else if (vehicleclass == 9) {
        Handleddatav9.push([newspeed, counter, color, counter2, color2]); //add new speed, car amount and color
       }
       else {
        Handleddatav1.push([newspeed, counter, color, counter2, color2]); //add new speed, car amount and color
       }
      
       speedcounter++;
      }

        if (vehicleclass == 1) {
          props.setdata(Handleddatav1);
          props.setoriginal(Handleddatav1);
         }
         else if (vehicleclass == 2) {
          props.setdata(Handleddatav2);
          props.setoriginal(Handleddatav2);
         }
         else if (vehicleclass == 3) {
          props.setdata(Handleddatav3);
          props.setoriginal(Handleddatav3);
         }
         else if (vehicleclass == 4) {
          props.setdata(Handleddatav4);
          props.setoriginal(Handleddatav4);
         }
         else if (vehicleclass == 5) {
          props.setdata(Handleddatav5);
          props.setoriginal(Handleddatav5);
         }
         else if (vehicleclass == 6) {
          props.setdata(Handleddatav6);
          props.setoriginal(Handleddatav6);
         }
         else if (vehicleclass == 7) {
          props.setdata(Handleddatav7);
          props.setoriginal(Handleddatav7);
         }
         else if (vehicleclass == 8) {
          props.setdata(Handleddatav8);
          props.setoriginal(Handleddatav8);
         }
         else if (vehicleclass == 9) {
          props.setdata(Handleddatav9);
          props.setoriginal(Handleddatav9);
         }
         else {
          props.setdata(Handleddatav1);
          props.setoriginal(Handleddatav1);
         }
      }
      else {
              //loop for every single speed
      for (let k = 0;k < 195;k++) {
    
        //reset counter after single speed check
        counter = 0;
        counter2 = 0;
        //loop for checking how many cars with certain speed
  
        for(let i = 0; i < Data.data.length; i++) {
          if (speedcounter == Data.data[i][11] && Data.data[i][9] == 1 && Data.data[i][12] == 0 && Data.data[i][10] == vehicle[0]) {
            counter++;
          }
          else if (speedcounter == Data.data[i][11] && Data.data[i][9] == 2 && Data.data[i][12] == 0 && Data.data[i][10] == vehicle[0]) {
            counter2++;
          }
        }
  
       let speed = speedcounter.toString();
       let newspeed = speed.concat(" ", text);
       let color = "";
       let color2 = "";
       //give color according to speedlimit
       if ( speedcounter < target+1) {
        color = "color: #23DE36";
       }
       else if (speedcounter > target-21 && speedcounter < target+11) {
        color = "color: #f7df0c";
       }
       else if (speedcounter > target-36 && speedcounter < target+16) {
        color = "color: #FF5F1B";
       }
       else if (speedcounter > target-51 && speedcounter < target+21) {
        color = "color: #c90000";
       }
       else {
        color = "color: #300404";
       }
       if ( speedcounter < target2+1) {
        color2 = "color: #23DE36";
       }
       else if (speedcounter > target2-21 && speedcounter < target2+11) {
        color2 = "color: #f7df0c";
       }
       else if (speedcounter > target2-36 && speedcounter < target2+16) {
        color2 = "color: #FF5F1B";
       }
       else if (speedcounter > target2-51 && speedcounter < target2+21) {
        color2 = "color: #c90000";
       }
       else {
        color2 = "color: #300404";
       }
       if (counter > 0 && counter2 == 0) {
        counter2 = null;
       }

       if (vehicle[0] == 1) {
        Handleddatav1.push([newspeed, counter, color, counter2, color2]); //add new speed, car amount and color
       }
       else if (vehicle[0] == 2) {
        Handleddatav2.push([newspeed, counter, color, counter2, color2]); //add new speed, car amount and color
       }
       else if (vehicle[0] == 3) {
        Handleddatav3.push([newspeed, counter, color, counter2, color2]); //add new speed, car amount and color
       }
       else if (vehicle[0] == 4) {
        Handleddatav4.push([newspeed, counter, color, counter2, color2]); //add new speed, car amount and color
       }
       else if (vehicle[0] == 5) {
        Handleddatav5.push([newspeed, counter, color, counter2, color2]); //add new speed, car amount and color
       }
       else if (vehicle[0] == 6) {
        Handleddatav6.push([newspeed, counter, color, counter2, color2]); //add new speed, car amount and color
       }
       else if (vehicle[0] == 7) {
        Handleddatav7.push([newspeed, counter, color, counter2, color2]); //add new speed, car amount and color
       }
       else if (vehicle[0] == 8) {
        Handleddatav8.push([newspeed, counter, color, counter2, color2]); //add new speed, car amount and color
       }
       else if (vehicle[0] == 9) {
        Handleddatav9.push([newspeed, counter, color, counter2, color2]); //add new speed, car amount and color
       }
       else {
        Handleddatav1.push([newspeed, counter, color, counter2, color2]); //add new speed, car amount and color
       }
      
       speedcounter++;
      }

        if (vehicle[0] == 1) {
          props.setdata(Handleddatav1);
          props.setoriginal(Handleddatav1);
         }
         else if (vehicle[0] == 2) {
          props.setdata(Handleddatav2);
          props.setoriginal(Handleddatav2);
         }
         else if (vehicle[0] == 3) {
          props.setdata(Handleddatav3);
          props.setoriginal(Handleddatav3);
         }
         else if (vehicle[0] == 4) {
          props.setdata(Handleddatav4);
          props.setoriginal(Handleddatav4);
         }
         else if (vehicle[0] == 5) {
          props.setdata(Handleddatav5);
          props.setoriginal(Handleddatav5);
         }
         else if (vehicle[0] == 6) {
          props.setdata(Handleddatav6);
          props.setoriginal(Handleddatav6);
         }
         else if (vehicle[0] == 7) {
          props.setdata(Handleddatav7);
          props.setoriginal(Handleddatav7);
         }
         else if (vehicle[0] == 8) {
          props.setdata(Handleddatav8);
          props.setoriginal(Handleddatav8);
         }
         else if (vehicle[0] == 9) {
          props.setdata(Handleddatav9);
          props.setoriginal(Handleddatav9);
         }
         else {
          props.setdata(Handleddatav1);
          props.setoriginal(Handleddatav1);
         }
      }

    }

    function DataHandlemulti (Data, num, vehicleclass) { //handle multiple days csv data
      //speed target
      let target = 100;
      let speedcounter = 0;
      let text = "km/h";
      const Handleddata2 = [["Nopeus", "Suunta 1 kaip", { role: "style" }, "Suunta 2 kaip", { role: "style" }]]; //array for parsed csv data with header row set

      let speedlimits = speedlimit(Data.data[0][0]);
      target = speedlimits[0];
      let target2 = speedlimits[1];

      //counter for counting how many cars with certain speed
      let counter = 0;
      let counter2 = 0;
      //loop for every single speed
      for (let k = 0;k < 195;k++) {
    
        //reset counter after single speed check
        counter = 0;
        counter2 = 0;

        if (vehicleclass > 0) {
          //loop for checking how many cars with certain speed
          for(let i = 0; i < Data.data.length; i++) {
            if (speedcounter == Data.data[i][11] && Data.data[i][9] == 1 && Data.data[i][12] == 0 && Data.data[i][10] == vehicleclass) {
              counter++;
            }
            if (speedcounter == Data.data[i][11] && Data.data[i][9] == 2 && Data.data[i][12] == 0 && Data.data[i][10] == vehicleclass) {
              counter2++;
            }
          }
        }
        else {
          //loop for checking how many cars with certain speed
          for(let i = 0; i < Data.data.length; i++) {
            if (speedcounter == Data.data[i][11] && Data.data[i][9] == 1 && Data.data[i][12] == 0 && Data.data[i][10] == vehicle[0]) {
              counter++;
            }
            if (speedcounter == Data.data[i][11] && Data.data[i][9] == 2 && Data.data[i][12] == 0 && Data.data[i][10] == vehicle[0]) {
              counter2++;
            }
          }
        }

       let speed = speedcounter.toString();
       let newspeed = speed.concat(" ", text);
       let color = "";
       let color2 = "";
       //give color according to speedlimit
       if ( speedcounter < target+1) {
        color = "color: #23DE36";
       }
       else if (speedcounter > target-21 && speedcounter < target+11) {
        color = "color: #f7df0c";
       }
       else if (speedcounter > target-36 && speedcounter < target+16) {
        color = "color: #FF5F1B";
       }
       else if (speedcounter > target-51 && speedcounter < target+21) {
        color = "color: #c90000";
       }
       else {
        color = "color: #300404";
       }
       if ( speedcounter < target2+1) {
        color2 = "color: #23DE36";
       }
       else if (speedcounter > target2-21 && speedcounter < target2+11) {
        color2 = "color: #f7df0c";
       }
       else if (speedcounter > target2-36 && speedcounter < target2+16) {
        color2 = "color: #FF5F1B";
       }
       else if (speedcounter > target2-51 && speedcounter < target2+21) {
        color2 = "color: #c90000";
       }
       else {
        color2 = "color: #300404";
       }
       Handleddata2.push([newspeed, counter, color, counter2, color2]); //add new speed, car amount and color
       speedcounter++;
      }

      // Give handled data to useState
        if (num == 1) {
          props.setdata1(Handleddata2);
        }
        else if (num == 2) {
          props.setdata2(Handleddata2);
        }
        else if (num == 3) {
          setclick([true, false]);
          props.setdata3(Handleddata2);
        }
        else if (num == 4) {
          props.setdata4(Handleddata2);
        }
        else if (num == 5) {
          props.setdata5(Handleddata2);
        }
        else if (num == 6) {
          props.setdata6(Handleddata2);
        }
        else if (num == 7) {
          setclick([false, true]);
          props.setdata7(Handleddata2);
        }
        return(Handleddata2);
    }

    function compileData(dat1, dat2, dat3, vehicleclass, clickfalse) { //day 3 change speeds data according to day variable

      setDay([false, true, false, "3 Päivää:"]);
      setChartclick(false);
      setActive([false, true, false]);
      setshowdownload([false, false]);
      setrows([]);
      if(Selectdrop == true && selectmultiple == false) {
        setselect(false);
      }

      if(click[0] == false || clickfalse == false) {
      const num = [1, 2, 3];
      const tempdata1 = DataHandlemulti(dat1, num[0], vehicleclass);
      const tempdata2 = DataHandlemulti(dat2, num[1], vehicleclass);
      const tempdata3 = DataHandlemulti(dat3, num[2], vehicleclass);
      let speed = "";
      let counter = 0;
      let color = "";
      let counter2 = 0;
      let color2 = "";

      if (vehicleclass > 0) {
        for (let i = 1; i< 196; i++) {
          speed = tempdata1[i][0];
          counter = tempdata1[i][1] + tempdata2[i][1] + tempdata3[i][1];
          color = tempdata1[i][2];
          counter2 = tempdata1[i][3] + tempdata2[i][3] + tempdata3[i][3];
          color2 = tempdata1[i][4];
          if (counter > 0 && counter2 == 0) {
            counter2 = null;
           }
          if (vehicleclass == 1) {
            Handleddatav1.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicleclass == 2) {
            Handleddatav2.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicleclass == 3) {
            Handleddatav3.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicleclass == 4) {
            Handleddatav4.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicleclass == 5) {
            Handleddatav5.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicleclass == 6) {
            Handleddatav6.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicleclass == 7) {
            Handleddatav7.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicleclass == 8) {
            Handleddatav8.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicleclass == 9) {
            Handleddatav9.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else {
            Handleddatav1.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
        }
  
        if (vehicleclass == 1) {
          props.setdata(Handleddatav1);
          props.setoriginal(Handleddatav1);
         }
         else if (vehicleclass == 2) {
          props.setdata(Handleddatav2);
          props.setoriginal(Handleddatav2);
         }
         else if (vehicleclass == 3) {
          props.setdata(Handleddatav3);
          props.setoriginal(Handleddatav3);
         }
         else if (vehicleclass == 4) {
          props.setdata(Handleddatav4);
          props.setoriginal(Handleddatav4);
         }
         else if (vehicleclass == 5) {
          props.setdata(Handleddatav5);
          props.setoriginal(Handleddatav5);
         }
         else if (vehicleclass == 6) {
          props.setdata(Handleddatav6);
          props.setoriginal(Handleddatav6);
         }
         else if (vehicleclass == 7) {
          props.setdata(Handleddatav7);
          props.setoriginal(Handleddatav7);
         }
         else if (vehicleclass == 8) {
          props.setdata(Handleddatav8);
          props.setoriginal(Handleddatav8);
         }
         else if (vehicleclass == 9) {
          props.setdata(Handleddatav9);
          props.setoriginal(Handleddatav9);
         }
         else {
          props.setdata(Handleddatav1);
          props.setoriginal(Handleddatav1);
         }
      }
      else {
        for (let i = 1; i< 196; i++) {
          speed = tempdata1[i][0];
          counter = tempdata1[i][1] + tempdata2[i][1] + tempdata3[i][1];
          color = tempdata1[i][2];
          counter2 = tempdata1[i][3] + tempdata2[i][3] + tempdata3[i][3];
          color2 = tempdata1[i][4];
          if (counter > 0 && counter2 == 0) {
            counter2 = null;
           }
          if (vehicle[0] == 1) {
            Handleddatav1.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicle[0] == 2) {
            Handleddatav2.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicle[0] == 3) {
            Handleddatav3.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicle[0] == 4) {
            Handleddatav4.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicle[0] == 5) {
            Handleddatav5.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicle[0] == 6) {
            Handleddatav6.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicle[0] == 7) {
            Handleddatav7.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicle[0] == 8) {
            Handleddatav8.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicle[0] == 9) {
            Handleddatav9.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else {
            Handleddatav1.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
        }
  
        if (vehicle[0] == 1) {
          props.setdata(Handleddatav1);
          props.setoriginal(Handleddatav1);
         }
         else if (vehicle[0] == 2) {
          props.setdata(Handleddatav2);
          props.setoriginal(Handleddatav2);
         }
         else if (vehicle[0] == 3) {
          props.setdata(Handleddatav3);
          props.setoriginal(Handleddatav3);
         }
         else if (vehicle[0] == 4) {
          props.setdata(Handleddatav4);
          props.setoriginal(Handleddatav4);
         }
         else if (vehicle[0] == 5) {
          props.setdata(Handleddatav5);
          props.setoriginal(Handleddatav5);
         }
         else if (vehicle[0] == 6) {
          props.setdata(Handleddatav6);
          props.setoriginal(Handleddatav6);
         }
         else if (vehicle[0] == 7) {
          props.setdata(Handleddatav7);
          props.setoriginal(Handleddatav7);
         }
         else if (vehicle[0] == 8) {
          props.setdata(Handleddatav8);
          props.setoriginal(Handleddatav8);
         }
         else if (vehicle[0] == 9) {
          props.setdata(Handleddatav9);
          props.setoriginal(Handleddatav9);
         }
         else {
          props.setdata(Handleddatav1);
          props.setoriginal(Handleddatav1);
         }
      }

      }
      else {
        let speed = "";
        let counter = 0;
        let color = "";
        let counter2 = 0;
        let color2 = "";
  
        if (vehicleclass > 0) {
          for (let i = 1; i< 196; i++) {
            speed = props.data1[i][0];
            counter = props.data1[i][1] + props.data2[i][1] + props.data3[i][1];
            color = props.data1[i][2];
            counter2 = props.data1[i][3] + props.data2[i][3] + props.data3[i][3];
            color2 = props.data1[i][4];
            if (counter > 0 && counter2 == 0) {
              counter2 = null;
             }
            if (vehicleclass == 1) {
              Handleddatav1.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicleclass == 2) {
              Handleddatav2.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicleclass == 3) {
              Handleddatav3.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicleclass == 4) {
              Handleddatav4.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicleclass == 5) {
              Handleddatav5.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicleclass == 6) {
              Handleddatav6.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicleclass == 7) {
              Handleddatav7.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicleclass == 8) {
              Handleddatav8.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicleclass == 9) {
              Handleddatav9.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else {
              Handleddatav1.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
          }

          if (vehicleclass == 1) {
            props.setdata(Handleddatav1);
            props.setoriginal(Handleddatav1);
           }
           else if (vehicleclass == 2) {
            props.setdata(Handleddatav2);
            props.setoriginal(Handleddatav2);
           }
           else if (vehicleclass == 3) {
            props.setdata(Handleddatav3);
            props.setoriginal(Handleddatav3);
           }
           else if (vehicleclass == 4) {
            props.setdata(Handleddatav4);
            props.setoriginal(Handleddatav4);
           }
           else if (vehicleclass == 5) {
            props.setdata(Handleddatav5);
            props.setoriginal(Handleddatav5);
           }
           else if (vehicleclass == 6) {
            props.setdata(Handleddatav6);
            props.setoriginal(Handleddatav6);
           }
           else if (vehicleclass == 7) {
            props.setdata(Handleddatav7);
            props.setoriginal(Handleddatav7);
           }
           else if (vehicleclass == 8) {
            props.setdata(Handleddatav8);
            props.setoriginal(Handleddatav8);
           }
           else if (vehicleclass == 9) {
            props.setdata(Handleddatav9);
            props.setoriginal(Handleddatav9);
           }
           else {
            props.setdata(Handleddatav1);
            props.setoriginal(Handleddatav1);
           }
        }
        else {
          for (let i = 1; i< 196; i++) {
            speed = props.data1[i][0];
            counter = props.data1[i][1] + props.data2[i][1] + props.data3[i][1];
            color = props.data1[i][2];
            counter2 = props.data1[i][3] + props.data2[i][3] + props.data3[i][3];
            color2 = props.data1[i][4];
            if (counter > 0 && counter2 == 0) {
              counter2 = null;
             }

            if (vehicle[0] == 1) {
              Handleddatav1.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicle[0] == 2) {
              Handleddatav2.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicle[0] == 3) {
              Handleddatav3.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicle[0] == 4) {
              Handleddatav4.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicle[0] == 5) {
              Handleddatav5.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicle[0] == 6) {
              Handleddatav6.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicle[0] == 7) {
              Handleddatav7.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicle[0] == 8) {
              Handleddatav8.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicle[0] == 9) {
              Handleddatav9.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else {
              Handleddatav1.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
          }
  
          if (vehicle[0] == 1) {
            props.setdata(Handleddatav1);
            props.setoriginal(Handleddatav1);
           }
           else if (vehicle[0] == 2) {
            props.setdata(Handleddatav2);
            props.setoriginal(Handleddatav2);
           }
           else if (vehicle[0] == 3) {
            props.setdata(Handleddatav3);
            props.setoriginal(Handleddatav3);
           }
           else if (vehicle[0] == 4) {
            props.setdata(Handleddatav4);
            props.setoriginal(Handleddatav4);
           }
           else if (vehicle[0] == 5) {
            props.setdata(Handleddatav5);
            props.setoriginal(Handleddatav5);
           }
           else if (vehicle[0] == 6) {
            props.setdata(Handleddatav6);
            props.setoriginal(Handleddatav6);
           }
           else if (vehicle[0] == 7) {
            props.setdata(Handleddatav7);
            props.setoriginal(Handleddatav7);
           }
           else if (vehicle[0] == 8) {
            props.setdata(Handleddatav8);
            props.setoriginal(Handleddatav8);
           }
           else if (vehicle[0] == 9) {
            props.setdata(Handleddatav9);
            props.setoriginal(Handleddatav9);
           }
           else {
            props.setdata(Handleddatav1);
            props.setoriginal(Handleddatav1);
           }
        }

      }
  
    }

    function compileData2(dat1, dat2, dat3, dat4, dat5, dat6, dat7, vehicleclass, clickfalse) { // day 7 change speeds data according to day variable

      setDay([false, false, true, "7 Päivää:"]); // set day
      setChartclick(false); //
      setActive([false, false, true]);
      setshowdownload([false, false]);
      setrows([]);
      if(Selectdrop == true && selectmultiple == false) {
        setselect(false);
      }

      if(click[1] == false || clickfalse == false) {
        const num = [1, 2, 3, 4, 5, 6, 7];
        const tempdata1 = DataHandlemulti(dat1, num[0], vehicleclass);
        const tempdata2 = DataHandlemulti(dat2, num[1], vehicleclass);
        const tempdata3 = DataHandlemulti(dat3, num[2], vehicleclass);
        const tempdata4 = DataHandlemulti(dat4, num[3], vehicleclass);
        const tempdata5 = DataHandlemulti(dat5, num[4], vehicleclass);
        const tempdata6 = DataHandlemulti(dat6, num[5], vehicleclass);
        const tempdata7 = DataHandlemulti(dat7, num[6], vehicleclass);

      let speed = "";
      let counter = 0;
      let color = "";
      let counter2 = 0;
      let color2 = "";

      if (vehicleclass > 0) {
        for (let i = 1; i< 196; i++) {
          speed = tempdata1[i][0];
          counter = tempdata1[i][1] + tempdata2[i][1] + tempdata3[i][1] + tempdata4[i][1] + tempdata5[i][1] + tempdata6[i][1] + tempdata7[i][1];
          color = tempdata1[i][2];
          counter2 = tempdata1[i][3] + tempdata2[i][3] + tempdata3[i][3] + tempdata4[i][3] + tempdata5[i][3] + tempdata6[i][3] + tempdata7[i][3];
          color2 = tempdata1[i][4];
          if (counter > 0 && counter2 == 0) {
            counter2 = null;
           }

          if (vehicleclass == 1) {
            Handleddatav1.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicleclass == 2) {
            Handleddatav2.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicleclass == 3) {
            Handleddatav3.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicleclass == 4) {
            Handleddatav4.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicleclass == 5) {
            Handleddatav5.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicleclass == 6) {
            Handleddatav6.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicleclass == 7) {
            Handleddatav7.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicleclass == 8) {
            Handleddatav8.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicleclass == 9) {
            Handleddatav9.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else {
            Handleddatav1.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
        }

        if (vehicleclass == 1) {
          props.setdata(Handleddatav1);
          props.setoriginal(Handleddatav1);
         }
         else if (vehicleclass == 2) {
          props.setdata(Handleddatav2);
          props.setoriginal(Handleddatav2);
         }
         else if (vehicleclass == 3) {
          props.setdata(Handleddatav3);
          props.setoriginal(Handleddatav3);
         }
         else if (vehicleclass == 4) {
          props.setdata(Handleddatav4);
          props.setoriginal(Handleddatav4);
         }
         else if (vehicleclass == 5) {
          props.setdata(Handleddatav5);
          props.setoriginal(Handleddatav5);
         }
         else if (vehicleclass == 6) {
          props.setdata(Handleddatav6);
          props.setoriginal(Handleddatav6);
         }
         else if (vehicleclass == 7) {
          props.setdata(Handleddatav7);
          props.setoriginal(Handleddatav7);
         }
         else if (vehicleclass == 8) {
          props.setdata(Handleddatav8);
          props.setoriginal(Handleddatav8);
         }
         else if (vehicleclass == 9) {
          props.setdata(Handleddatav9);
          props.setoriginal(Handleddatav9);
         }
         else {
          props.setdata(Handleddatav1);
          props.setoriginal(Handleddatav1);
         }
      }
      else {
        for (let i = 1; i< 196; i++) {
          speed = tempdata1[i][0];
          counter = tempdata1[i][1] + tempdata2[i][1] + tempdata3[i][1] + tempdata4[i][1] + tempdata5[i][1] + tempdata6[i][1] + tempdata7[i][1];
          color = tempdata1[i][2];
          counter2 = tempdata1[i][3] + tempdata2[i][3] + tempdata3[i][3] + tempdata4[i][3] + tempdata5[i][3] + tempdata6[i][3] + tempdata7[i][3];
          color2 = tempdata1[i][4];
          if (counter > 0 && counter2 == 0) {
            counter2 = null;
           }

          if (vehicle[0] == 1) {
            Handleddatav1.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicle[0] == 2) {
            Handleddatav2.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicle[0] == 3) {
            Handleddatav3.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicle[0] == 4) {
            Handleddatav4.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicle[0] == 5) {
            Handleddatav5.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicle[0] == 6) {
            Handleddatav6.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicle[0] == 7) {
            Handleddatav7.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicle[0] == 8) {
            Handleddatav8.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else if (vehicle[0] == 9) {
            Handleddatav9.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
           else {
            Handleddatav1.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
           }
        }
  
        if (vehicle[0] == 1) {
          props.setdata(Handleddatav1);
          props.setoriginal(Handleddatav1);
         }
         else if (vehicle[0] == 2) {
          props.setdata(Handleddatav2);
          props.setoriginal(Handleddatav2);
         }
         else if (vehicle[0] == 3) {
          props.setdata(Handleddatav3);
          props.setoriginal(Handleddatav3);
         }
         else if (vehicle[0] == 4) {
          props.setdata(Handleddatav4);
          props.setoriginal(Handleddatav4);
         }
         else if (vehicle[0] == 5) {
          props.setdata(Handleddatav5);
          props.setoriginal(Handleddatav5);
         }
         else if (vehicle[0] == 6) {
          props.setdata(Handleddatav6);
          props.setoriginal(Handleddatav6);
         }
         else if (vehicle[0] == 7) {
          props.setdata(Handleddatav7);
          props.setoriginal(Handleddatav7);
         }
         else if (vehicle[0] == 8) {
          props.setdata(Handleddatav8);
          props.setoriginal(Handleddatav8);
         }
         else if (vehicle[0] == 9) {
          props.setdata(Handleddatav9);
          props.setoriginal(Handleddatav9);
         }
         else {
          props.setdata(Handleddatav1);
          props.setoriginal(Handleddatav1);
         }
      }

      }
      else {
        let speed = "";
        let counter = 0;
        let color = "";
        let counter2 = 0;
        let color2 = "";
  
        if (vehicleclass > 0) {
          for (let i = 1; i< 196; i++) {
            speed = props.data1[i][0];
            counter = props.data1[i][1] + props.data2[i][1] + props.data3[i][1] + props.data4[i][1] + props.data5[i][1] + props.data6[i][1] + props.data7[i][1];
            color = props.data1[i][2];
            counter2 = props.data1[i][3] + props.data2[i][3] + props.data3[i][3] + props.data4[i][3] + props.data5[i][3] + props.data6[i][3] + props.data7[i][3];
            color = props.data1[i][4];
            if (counter > 0 && counter2 == 0) {
              counter2 = null;
             }

            if (vehicleclass == 1) {
              Handleddatav1.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicleclass == 2) {
              Handleddatav2.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicleclass == 3) {
              Handleddatav3.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicleclass == 4) {
              Handleddatav4.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicleclass == 5) {
              Handleddatav5.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicleclass == 6) {
              Handleddatav6.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicleclass == 7) {
              Handleddatav7.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicleclass == 8) {
              Handleddatav8.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicleclass == 9) {
              Handleddatav9.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else {
              Handleddatav1.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
          }
  
          if (vehicleclass == 1) {
            props.setdata(Handleddatav1);
            props.setoriginal(Handleddatav1);
           }
           else if (vehicleclass == 2) {
            props.setdata(Handleddatav2);
            props.setoriginal(Handleddatav2);
           }
           else if (vehicleclass == 3) {
            props.setdata(Handleddatav3);
            props.setoriginal(Handleddatav3);
           }
           else if (vehicleclass == 4) {
            props.setdata(Handleddatav4);
            props.setoriginal(Handleddatav4);
           }
           else if (vehicleclass == 5) {
            props.setdata(Handleddatav5);
            props.setoriginal(Handleddatav5);
           }
           else if (vehicleclass == 6) {
            props.setdata(Handleddatav6);
            props.setoriginal(Handleddatav6);
           }
           else if (vehicleclass == 7) {
            props.setdata(Handleddatav7);
            props.setoriginal(Handleddatav7);
           }
           else if (vehicleclass == 8) {
            props.setdata(Handleddatav8);
            props.setoriginal(Handleddatav8);
           }
           else if (vehicleclass == 9) {
            props.setdata(Handleddatav9);
            props.setoriginal(Handleddatav9);
           }
           else {
            props.setdata(Handleddatav1);
            props.setoriginal(Handleddatav1);
           }
        }
        else {
          for (let i = 1; i< 196; i++) {
            speed = props.data1[i][0];
            counter = props.data1[i][1] + props.data2[i][1] + props.data3[i][1] + props.data4[i][1] + props.data5[i][1] + props.data6[i][1] + props.data7[i][1];
            color = props.data1[i][2];
            counter2 = props.data1[i][3] + props.data2[i][3] + props.data3[i][3] + props.data4[i][3] + props.data5[i][3] + props.data6[i][3] + props.data7[i][3];
            color2 = props.data1[i][4];
            if (counter > 0 && counter2 == 0) {
              counter2 = null;
             }

            if (vehicle[0] == 1) {
              Handleddatav1.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicle[0] == 2) {
              Handleddatav2.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicle[0] == 3) {
              Handleddatav3.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicle[0] == 4) {
              Handleddatav4.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicle[0] == 5) {
              Handleddatav5.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicle[0] == 6) {
              Handleddatav6.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicle[0] == 7) {
              Handleddatav7.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicle[0] == 8) {
              Handleddatav8.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else if (vehicle[0] == 9) {
              Handleddatav9.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
             else {
              Handleddatav1.push([speed, counter, color, counter2, color2]); //add new speed, car amount and color
             }
          }
  
          if (vehicle[0] == 1) {
            props.setdata(Handleddatav1);
            props.setoriginal(Handleddatav1);
           }
           else if (vehicle[0] == 2) {
            props.setdata(Handleddatav2);
            props.setoriginal(Handleddatav2);
           }
           else if (vehicle[0] == 3) {
            props.setdata(Handleddatav3);
            props.setoriginal(Handleddatav3);
           }
           else if (vehicle[0] == 4) {
            props.setdata(Handleddatav4);
            props.setoriginal(Handleddatav4);
           }
           else if (vehicle[0] == 5) {
            props.setdata(Handleddatav5);
            props.setoriginal(Handleddatav5);
           }
           else if (vehicle[0] == 6) {
            props.setdata(Handleddatav6);
            props.setoriginal(Handleddatav6);
           }
           else if (vehicle[0] == 7) {
            props.setdata(Handleddatav7);
            props.setoriginal(Handleddatav7);
           }
           else if (vehicle[0] == 8) {
            props.setdata(Handleddatav8);
            props.setoriginal(Handleddatav8);
           }
           else if (vehicle[0] == 9) {
            props.setdata(Handleddatav9);
            props.setoriginal(Handleddatav9);
           }
           else {
            props.setdata(Handleddatav1);
            props.setoriginal(Handleddatav1);
           }
        }

      }
    }

    function changechartdata(row) { // day 1 chart single select change selected speed data to graph
      setselect(true);
        let listspeed = row;
        let speed = 0;
        let color = "#BA1DBD";
        let dates = getDatespeedlist(0);
        let speedlimits = speedlimit(props.dataO1.data[0][0]);
        if ( listspeed < speedlimits[0]+1) {
          color = "color: #23DE36";
         }
         else if (listspeed > speedlimits[0]-21 && listspeed < speedlimits[0]+11) {
          color = "color: #f7df0c";
         }
         else if (listspeed > speedlimits[0]-36 && listspeed < speedlimits[0]+16) {
          color = "color: #FF5F1B";
         }
         else if (listspeed > speedlimits[0]-51 && listspeed < speedlimits[0]+21) {
          color = "color: #c90000";
         }
         else {
          color = "color: #300404";
         }
        for(let i = 0;i < props.dataO1.data.length; i++) { //get speed time of day to chart day 1
          if (listspeed == props.dataO1.data[i][11] && props.dataO1.data[i][12] == 0 && props.dataO1.data[i][10] == vehicle[0]) {
            speed = parseInt(props.dataO1.data[i][11]);
            let time = new Date(dates[0], dates[1], dates[2], parseInt(props.dataO1.data[i][3]), parseInt(props.dataO1.data[i][4]), parseInt(props.dataO1.data[i][5]), 0);
            Handleddatatime.push([time, speed, color]);
            textlist.push([props.datapoint, props.title, props.dataO1.data[i][9], time, speed, props.dataO1.data[i][10]]);
          }
        }
        props.setdata(Handleddatatime);
        setSpeedlist(textlist);
    }

    function changechartdatamulti(row) { //day 3 chart single select change selected speed data to graph
      setselect(true);
      let listspeed = row;
      let speed = 0;

      let color = "#BA1DBD";
      let dates = getDatespeedlist(0);
      let speedlimits = speedlimit(props.dataO1.data[0][0]);
      if ( listspeed < speedlimits[0]+1) {
        color = "color: #23DE36";
       }
       else if (listspeed > speedlimits[0]-21 && listspeed < speedlimits[0]+11) {
        color = "color: #f7df0c";
       }
       else if (listspeed > speedlimits[0]-36 && listspeed < speedlimits[0]+16) {
        color = "color: #FF5F1B";
       }
       else if (listspeed > speedlimits[0]-51 && listspeed < speedlimits[0]+21) {
        color = "color: #c90000";
       }
       else {
        color = "color: #300404";
       }

      for(let i = 0;i < props.dataO1.data.length; i++) {
        if (listspeed == props.dataO1.data[i][11] && props.dataO1.data[i][12] == 0 && props.dataO1.data[i][10] == vehicle[0]) {
          speed = parseInt(props.dataO1.data[i][11]);
          let time = new Date(dates[0], dates[1], dates[2], parseInt(props.dataO1.data[i][3]), parseInt(props.dataO1.data[i][4]), parseInt(props.dataO1.data[i][5]), 0);
          Handleddatatime.push([time, speed, color]);
          textlist.push([props.datapoint, props.title, props.dataO1.data[i][9], time, speed, props.dataO1.data[i][10]]);
      }
      }
      dates = getDatespeedlist(1);
      for(let i = 0;i < props.dataO2.data.length; i++) {
        if (listspeed == props.dataO2.data[i][11] && props.dataO2.data[i][12] == 0 && props.dataO2.data[i][10] == vehicle[0]) {
          speed = parseInt(props.dataO2.data[i][11]);
          let time = new Date(dates[0], dates[1], dates[2], parseInt(props.dataO2.data[i][3]), parseInt(props.dataO2.data[i][4]), parseInt(props.dataO2.data[i][5]), 0);
          Handleddatatime.push([time, speed, color]);
          textlist.push([props.datapoint, props.title, props.dataO2.data[i][9], time, speed, props.dataO2.data[i][10]]);
      }
    }
    dates = getDatespeedlist(2);
    for(let i = 0;i < props.dataO3.data.length; i++) {
      if (listspeed == props.dataO3.data[i][11] && props.dataO3.data[i][12] == 0 && props.dataO3.data[i][10] == vehicle[0]) {
        speed = parseInt(props.dataO3.data[i][11]);
        let time = new Date(dates[0], dates[1], dates[2], parseInt(props.dataO3.data[i][3]), parseInt(props.dataO3.data[i][4]), parseInt(props.dataO3.data[i][5]), 0);
        Handleddatatime.push([time, speed, color]);
        textlist.push([props.datapoint, props.title, props.dataO3.data[i][9], time, speed, props.dataO3.data[i][10]]);
    }
  }

      props.setdata(Handleddatatime);
      setSpeedlist(textlist);
  }

  function changechartdatamulti7(row) { //day 7 chart single select change selected speed data to graph
    setselect(true);
    let listspeed = row;
    let speed = 0;

    let color = "#BA1DBD";
    let dates = getDatespeedlist(0);
    let speedlimits = speedlimit(props.dataO1.data[0][0]);
    if ( listspeed < speedlimits[0]+1) {
      color = "color: #23DE36";
     }
     else if (listspeed > speedlimits[0]-21 && listspeed < speedlimits[0]+11) {
      color = "color: #f7df0c";
     }
     else if (listspeed > speedlimits[0]-36 && listspeed < speedlimits[0]+16) {
      color = "color: #FF5F1B";
     }
     else if (listspeed > speedlimits[0]-51 && listspeed < speedlimits[0]+21) {
      color = "color: #c90000";
     }
     else {
      color = "color: #300404";
     }

    for(let i = 0;i < props.dataO1.data.length; i++) {
      if (listspeed == props.dataO1.data[i][11] && props.dataO1.data[i][12] == 0 && props.dataO1.data[i][10] == vehicle[0]) {
        speed = parseInt(props.dataO1.data[i][11]);
        let time = new Date(dates[0], dates[1], dates[2], parseInt(props.dataO1.data[i][3]), parseInt(props.dataO1.data[i][4]), parseInt(props.dataO1.data[i][5]), 0);
        Handleddatatime.push([time, speed, color]);
        textlist.push([props.datapoint, props.title, props.dataO1.data[i][9], time, speed, props.dataO1.data[i][10]]);
    }
    }
    dates = getDatespeedlist(1);
    for(let i = 0;i < props.dataO2.data.length; i++) {
      if (listspeed == props.dataO2.data[i][11] && props.dataO2.data[i][12] == 0 && props.dataO2.data[i][10] == vehicle[0]) {
        speed = parseInt(props.dataO2.data[i][11]);
        let time = new Date(dates[0], dates[1], dates[2], parseInt(props.dataO2.data[i][3]), parseInt(props.dataO2.data[i][4]), parseInt(props.dataO2.data[i][5]), 0);
        Handleddatatime.push([time, speed, color]);
        textlist.push([props.datapoint, props.title, props.dataO2.data[i][9], time, speed, props.dataO2.data[i][10]]);
    }
    }
    dates = getDatespeedlist(2);
  for(let i = 0;i < props.dataO3.data.length; i++) {
    if (listspeed == props.dataO3.data[i][11] && props.dataO3.data[i][12] == 0 && props.dataO3.data[i][10] == vehicle[0]) {
      speed = parseInt(props.dataO3.data[i][11]);
      let time = new Date(dates[0], dates[1], dates[2], parseInt(props.dataO3.data[i][3]), parseInt(props.dataO3.data[i][4]), parseInt(props.dataO3.data[i][5]), 0);
      Handleddatatime.push([time, speed, color]);
      textlist.push([props.datapoint, props.title, props.dataO3.data[i][9], time, speed, props.dataO3.data[i][10]]);
  }
  }
  dates = getDatespeedlist(3);
  for(let i = 0;i < props.dataO4.data.length; i++) {
    if (listspeed == props.dataO4.data[i][11] && props.dataO4.data[i][12] == 0 && props.dataO4.data[i][10] == vehicle[0]) {
      speed = parseInt(props.dataO4.data[i][11]);
      let time = new Date(dates[0], dates[1], dates[2], parseInt(props.dataO4.data[i][3]), parseInt(props.dataO4.data[i][4]), parseInt(props.dataO4.data[i][5]), 0);
      Handleddatatime.push([time, speed, color]);
      textlist.push([props.datapoint, props.title, props.dataO4.data[i][9], time, speed, props.dataO4.data[i][10]]);
  }
  }
  dates = getDatespeedlist(4);
  for(let i = 0;i < props.dataO5.data.length; i++) {
    if (listspeed == props.dataO5.data[i][11] && props.dataO5.data[i][12] == 0 && props.dataO5.data[i][10] == vehicle[0]) {
      speed = parseInt(props.dataO5.data[i][11]);
      let time = new Date(dates[0], dates[1], dates[2], parseInt(props.dataO5.data[i][3]), parseInt(props.dataO5.data[i][4]), parseInt(props.dataO5.data[i][5]), 0);
      Handleddatatime.push([time, speed, color]);
      textlist.push([props.datapoint, props.title, props.dataO5.data[i][9], time, speed, props.dataO5.data[i][10]]);
  }
  }
  dates = getDatespeedlist(5);
  for(let i = 0;i < props.dataO6.data.length; i++) {
    if (listspeed == props.dataO6.data[i][11] && props.dataO6.data[i][12] == 0 && props.dataO6.data[i][10] == vehicle[0]) {
      speed = parseInt(props.dataO6.data[i][11]);
      let time = new Date(dates[0], dates[1], dates[2], parseInt(props.dataO6.data[i][3]), parseInt(props.dataO6.data[i][4]), parseInt(props.dataO6.data[i][5]), 0);
      Handleddatatime.push([time, speed, color]);
      textlist.push([props.datapoint, props.title, props.dataO6.data[i][9], time, speed, props.dataO6.data[i][10]]);
  }
  }
  dates = getDatespeedlist(6);
  for(let i = 0;i < props.dataO7.data.length; i++) {
    if (listspeed == props.dataO7.data[i][11] && props.dataO7.data[i][12] == 0 && props.dataO7.data[i][10] == vehicle[0]) {
      speed = parseInt(props.dataO7.data[i][11]);
      let time = new Date(dates[0], dates[1], dates[2], parseInt(props.dataO7.data[i][3]), parseInt(props.dataO7.data[i][4]), parseInt(props.dataO7.data[i][5]), 0);
      Handleddatatime.push([time, speed, color]);
      textlist.push([props.datapoint, props.title, props.dataO7.data[i][9], time, speed, props.dataO7.data[i][10]]);
  }
  }

    props.setdata(Handleddatatime);
    setSpeedlist(textlist);
}

function changechartdataselect() { // day 1 chart multi select change selected speed data to graph
  let speed = 0;
  let dates = getDatespeedlist(0);

    for (let k = 0; k < rows.length;k++) {
      let color = "#BA1DBD";
      let speedlimits = speedlimit(props.dataO1.data[0][0]);
      if ( rows[k][0] < speedlimits[0]+1) {
        color = "color: #23DE36";
       }
       else if (rows[k][0] > speedlimits[0]-21 && rows[k][0] < speedlimits[0]+11) {
        color = "color: #f7df0c";
       }
       else if (rows[k][0] > speedlimits[0]-36 && rows[k][0] < speedlimits[0]+16) {
        color = "color: #FF5F1B";
       }
       else if (rows[k][0] > speedlimits[0]-51 && rows[k][0] < speedlimits[0]+21) {
        color = "color: #c90000";
       }
       else {
        color = "color: #300404";
       }
      for(let i = 0;i < props.dataO1.data.length; i++) { //get speed time of day to chart day 1
        if (rows[k][0] == props.dataO1.data[i][11] && props.dataO1.data[i][12] == 0 && props.dataO1.data[i][10] == vehicle[0]) {
          speed = parseInt(props.dataO1.data[i][11]);
          let time = new Date(dates[0], dates[1], dates[2], parseInt(props.dataO1.data[i][3]), parseInt(props.dataO1.data[i][4]), parseInt(props.dataO1.data[i][5]), 0);
          Handleddatatime.push([time, speed, color]);
          textlist.push([props.datapoint, props.title, props.dataO1.data[i][9], time, speed, props.dataO1.data[i][10]]);
      }
      }
    }

  props.setdata(Handleddatatime);
  setSpeedlist(textlist);
}

function changechartdataselectmulti() { // day 3 chart multi select change selected speed data to graph
  let speed = 0;
  let dates = getDatespeedlist(0);
    for (let k = 0; k < rows.length;k++) {
      let color = "#BA1DBD";
      let speedlimits = speedlimit(props.dataO1.data[0][0]);
      if ( rows[k][0] < speedlimits[0]+1) {
        color = "color: #23DE36";
       }
       else if (rows[k][0] > speedlimits[0]-21 && rows[k][0] < speedlimits[0]+11) {
        color = "color: #f7df0c";
       }
       else if (rows[k][0] > speedlimits[0]-36 && rows[k][0] < speedlimits[0]+16) {
        color = "color: #FF5F1B";
       }
       else if (rows[k][0] > speedlimits[0]-51 && rows[k][0] < speedlimits[0]+21) {
        color = "color: #c90000";
       }
       else {
        color = "color: #300404";
       }
      for(let i = 0;i < props.dataO1.data.length; i++) {
        if (rows[k][0] == props.dataO1.data[i][11] && props.dataO1.data[i][12] == 0 && props.dataO1.data[i][10] == vehicle[0]) {
            speed = parseInt(props.dataO1.data[i][11]);
            let time = new Date(dates[0], dates[1], dates[2], parseInt(props.dataO1.data[i][3]), parseInt(props.dataO1.data[i][4]), parseInt(props.dataO1.data[i][5]), 0);
            Handleddatatime.push([time, speed, color]);
            textlist.push([props.datapoint, props.title, props.dataO1.data[i][9], time, speed, props.dataO1.data[i][10]]);
        }
      }
    }
    dates = getDatespeedlist(1);
    for (let k = 0; k < rows.length;k++) {
      let color = "#BA1DBD";
      let speedlimits = speedlimit(props.dataO1.data[0][0]);
      if ( rows[k][0] < speedlimits[0]+1) {
        color = "color: #23DE36";
       }
       else if (rows[k][0] > speedlimits[0]-21 && rows[k][0] < speedlimits[0]+11) {
        color = "color: #f7df0c";
       }
       else if (rows[k][0] > speedlimits[0]-36 && rows[k][0] < speedlimits[0]+16) {
        color = "color: #FF5F1B";
       }
       else if (rows[k][0] > speedlimits[0]-51 && rows[k][0] < speedlimits[0]+21) {
        color = "color: #c90000";
       }
       else {
        color = "color: #300404";
       }
      for(let i = 0;i < props.dataO2.data.length; i++) { 
        if (rows[k][0] == props.dataO2.data[i][11] && props.dataO2.data[i][12] == 0 && props.dataO2.data[i][10] == vehicle[0]) {
            speed = parseInt(props.dataO2.data[i][11]);
            let time = new Date(dates[0], dates[1], dates[2], parseInt(props.dataO2.data[i][3]), parseInt(props.dataO2.data[i][4]), parseInt(props.dataO2.data[i][5]), 0);
            Handleddatatime.push([time, speed, color]);
            textlist.push([props.datapoint, props.title, props.dataO2.data[i][9], time, speed, props.dataO2.data[i][10]]);
        }
      }
    }
    dates = getDatespeedlist(2);
    for (let k = 0; k < rows.length;k++) {
      let color = "#BA1DBD";
      let speedlimits = speedlimit(props.dataO1.data[0][0]);
      if ( rows[k][0] < speedlimits[0]+1) {
        color = "color: #23DE36";
       }
       else if (rows[k][0] > speedlimits[0]-21 && rows[k][0] < speedlimits[0]+11) {
        color = "color: #f7df0c";
       }
       else if (rows[k][0] > speedlimits[0]-36 && rows[k][0] < speedlimits[0]+16) {
        color = "color: #FF5F1B";
       }
       else if (rows[k][0] > speedlimits[0]-51 && rows[k][0] < speedlimits[0]+21) {
        color = "color: #c90000";
       }
       else {
        color = "color: #300404";
       }
      for(let i = 0;i < props.dataO3.data.length; i++) { 
        if (rows[k][0] == props.dataO3.data[i][11] && props.dataO3.data[i][12] == 0 && props.dataO3.data[i][10] == vehicle[0]) {
            speed = parseInt(props.dataO3.data[i][11]);
            let time = new Date(dates[0], dates[1], dates[2], parseInt(props.dataO3.data[i][3]), parseInt(props.dataO3.data[i][4]), parseInt(props.dataO3.data[i][5]), 0);
            Handleddatatime.push([time, speed, color]);
            textlist.push([props.datapoint, props.title, props.dataO3.data[i][9], time, speed, props.dataO3.data[i][10]]);
        }
      }
    }
  props.setdata(Handleddatatime);
  setSpeedlist(textlist);
}

function changechartdataselectmulti7() { // day 7 chart multi select change selected speed data to graph
  let speed = 0;
  let dates = getDatespeedlist(0);

    for (let k = 0; k < rows.length;k++) {
      let color = "#BA1DBD";
      let speedlimits = speedlimit(props.dataO1.data[0][0]);
      if ( rows[k][0] < speedlimits[0]+1) {
        color = "color: #23DE36";
       }
       else if (rows[k][0] > speedlimits[0]-21 && rows[k][0] < speedlimits[0]+11) {
        color = "color: #f7df0c";
       }
       else if (rows[k][0] > speedlimits[0]-36 && rows[k][0] < speedlimits[0]+16) {
        color = "color: #FF5F1B";
       }
       else if (rows[k][0] > speedlimits[0]-51 && rows[k][0] < speedlimits[0]+21) {
        color = "color: #c90000";
       }
       else {
        color = "color: #300404";
       }
      for(let i = 0;i < props.dataO1.data.length; i++) {
        if (rows[k][0] == props.dataO1.data[i][11] && props.dataO1.data[i][12] == 0 && props.dataO1.data[i][10] == vehicle[0]) {
            speed = parseInt(props.dataO1.data[i][11]);
            let time = new Date(dates[0], dates[1], dates[2], parseInt(props.dataO1.data[i][3]), parseInt(props.dataO1.data[i][4]), parseInt(props.dataO1.data[i][5]), 0);
            Handleddatatime.push([time, speed, color]);
            textlist.push([props.datapoint, props.title, props.dataO1.data[i][9], time, speed, props.dataO1.data[i][10]]);
        }
      }
    }
  dates = getDatespeedlist(1);
    for (let k = 0; k < rows.length;k++) {
      let color = "#BA1DBD";
      let speedlimits = speedlimit(props.dataO1.data[0][0]);
      if ( rows[k][0] < speedlimits[0]+1) {
        color = "color: #23DE36";
       }
       else if (rows[k][0] > speedlimits[0]-21 && rows[k][0] < speedlimits[0]+11) {
        color = "color: #f7df0c";
       }
       else if (rows[k][0] > speedlimits[0]-36 && rows[k][0] < speedlimits[0]+16) {
        color = "color: #FF5F1B";
       }
       else if (rows[k][0] > speedlimits[0]-51 && rows[k][0] < speedlimits[0]+21) {
        color = "color: #c90000";
       }
       else {
        color = "color: #300404";
       }
      for(let i = 0;i < props.dataO2.data.length; i++) { 
        if (rows[k][0] == props.dataO2.data[i][11] && props.dataO2.data[i][12] == 0 && props.dataO2.data[i][10] == vehicle[0]) {
            speed = parseInt(props.dataO2.data[i][11]);
            let time = new Date(dates[0], dates[1], dates[2], parseInt(props.dataO2.data[i][3]), parseInt(props.dataO2.data[i][4]), parseInt(props.dataO2.data[i][5]), 0);
            Handleddatatime.push([time, speed, color]);
            textlist.push([props.datapoint, props.title, props.dataO2.data[i][9], time, speed, props.dataO2.data[i][10]]);
        }
      }
    }
    dates = getDatespeedlist(2);
    for (let k = 0; k < rows.length;k++) {
      let color = "#BA1DBD";
      let speedlimits = speedlimit(props.dataO1.data[0][0]);
      if ( rows[k][0] < speedlimits[0]+1) {
        color = "color: #23DE36";
       }
       else if (rows[k][0] > speedlimits[0]-21 && rows[k][0] < speedlimits[0]+11) {
        color = "color: #f7df0c";
       }
       else if (rows[k][0] > speedlimits[0]-36 && rows[k][0] < speedlimits[0]+16) {
        color = "color: #FF5F1B";
       }
       else if (rows[k][0] > speedlimits[0]-51 && rows[k][0] < speedlimits[0]+21) {
        color = "color: #c90000";
       }
       else {
        color = "color: #300404";
       }
      for(let i = 0;i < props.dataO3.data.length; i++) { 
        if (rows[k][0] == props.dataO3.data[i][11] && props.dataO3.data[i][12] == 0 && props.dataO3.data[i][10] == vehicle[0]) {
            speed = parseInt(props.dataO3.data[i][11]);
            let time = new Date(dates[0], dates[1], dates[2], parseInt(props.dataO3.data[i][3]), parseInt(props.dataO3.data[i][4]), parseInt(props.dataO3.data[i][5]), 0);
            Handleddatatime.push([time, speed, color]);
            textlist.push([props.datapoint, props.title, props.dataO3.data[i][9], time, speed, props.dataO3.data[i][10]]);
        }
      }
    }
    dates = getDatespeedlist(3);
    for (let k = 0; k < rows.length;k++) {
      let color = "#BA1DBD";
      let speedlimits = speedlimit(props.dataO1.data[0][0]);
      if ( rows[k][0] < speedlimits[0]+1) {
        color = "color: #23DE36";
       }
       else if (rows[k][0] > speedlimits[0]-21 && rows[k][0] < speedlimits[0]+11) {
        color = "color: #f7df0c";
       }
       else if (rows[k][0] > speedlimits[0]-36 && rows[k][0] < speedlimits[0]+16) {
        color = "color: #FF5F1B";
       }
       else if (rows[k][0] > speedlimits[0]-51 && rows[k][0] < speedlimits[0]+21) {
        color = "color: #c90000";
       }
       else {
        color = "color: #300404";
       }
      for(let i = 0;i < props.dataO4.data.length; i++) { 
        if (rows[k][0] == props.dataO4.data[i][11] && props.dataO4.data[i][12] == 0 && props.dataO4.data[i][10] == vehicle[0]) {
            speed = parseInt(props.dataO4.data[i][11]);
            let time = new Date(dates[0], dates[1], dates[2], parseInt(props.dataO4.data[i][3]), parseInt(props.dataO4.data[i][4]), parseInt(props.dataO4.data[i][5]), 0);
            Handleddatatime.push([time, speed, color]);
            textlist.push([props.datapoint, props.title, props.dataO4.data[i][9], time, speed, props.dataO4.data[i][10]]);
        }
      }
    }
    dates = getDatespeedlist(4);
    for (let k = 0; k < rows.length;k++) {
      let color = "#BA1DBD";
      let speedlimits = speedlimit(props.dataO1.data[0][0]);
      if ( rows[k][0] < speedlimits[0]+1) {
        color = "color: #23DE36";
       }
       else if (rows[k][0] > speedlimits[0]-21 && rows[k][0] < speedlimits[0]+11) {
        color = "color: #f7df0c";
       }
       else if (rows[k][0] > speedlimits[0]-36 && rows[k][0] < speedlimits[0]+16) {
        color = "color: #FF5F1B";
       }
       else if (rows[k][0] > speedlimits[0]-51 && rows[k][0] < speedlimits[0]+21) {
        color = "color: #c90000";
       }
       else {
        color = "color: #300404";
       }
      for(let i = 0;i < props.dataO5.data.length; i++) { 
        if (rows[k][0] == props.dataO5.data[i][11] && props.dataO5.data[i][12] == 0 && props.dataO5.data[i][10] == vehicle[0]) {
            speed = parseInt(props.dataO5.data[i][11]);
            let time = new Date(dates[0], dates[1], dates[2], parseInt(props.dataO5.data[i][3]), parseInt(props.dataO5.data[i][4]), parseInt(props.dataO5.data[i][5]), 0);
            Handleddatatime.push([time, speed, color]);
            textlist.push([props.datapoint, props.title, props.dataO5.data[i][9], time, speed, props.dataO5.data[i][10]]);
        }
      }
    }
    dates = getDatespeedlist(5);
    for (let k = 0; k < rows.length;k++) {
      let color = "#BA1DBD";
      let speedlimits = speedlimit(props.dataO1.data[0][0]);
      if ( rows[k][0] < speedlimits[0]+1) {
        color = "color: #23DE36";
       }
       else if (rows[k][0] > speedlimits[0]-21 && rows[k][0] < speedlimits[0]+11) {
        color = "color: #f7df0c";
       }
       else if (rows[k][0] > speedlimits[0]-36 && rows[k][0] < speedlimits[0]+16) {
        color = "color: #FF5F1B";
       }
       else if (rows[k][0] > speedlimits[0]-51 && rows[k][0] < speedlimits[0]+21) {
        color = "color: #c90000";
       }
       else {
        color = "color: #300404";
       }
      for(let i = 0;i < props.dataO6.data.length; i++) { 
        if (rows[k][0] == props.dataO6.data[i][11] && props.dataO6.data[i][12] == 0 && props.dataO6.data[i][10] == vehicle[0]) {
            speed = parseInt(props.dataO6.data[i][11]);
            let time = new Date(dates[0], dates[1], dates[2], parseInt(props.dataO6.data[i][3]), parseInt(props.dataO6.data[i][4]), parseInt(props.dataO6.data[i][5]), 0);
            Handleddatatime.push([time, speed, color]);
            textlist.push([props.datapoint, props.title, props.dataO6.data[i][9], time, speed, props.dataO6.data[i][10]]);
        }
      }
    }
    dates = getDatespeedlist(6);
    for (let k = 0; k < rows.length;k++) {
      let color = "#BA1DBD";
      let speedlimits = speedlimit(props.dataO1.data[0][0]);
      if ( rows[k][0] < speedlimits[0]+1) {
        color = "color: #23DE36";
       }
       else if (rows[k][0] > speedlimits[0]-21 && rows[k][0] < speedlimits[0]+11) {
        color = "color: #f7df0c";
       }
       else if (rows[k][0] > speedlimits[0]-36 && rows[k][0] < speedlimits[0]+16) {
        color = "color: #FF5F1B";
       }
       else if (rows[k][0] > speedlimits[0]-51 && rows[k][0] < speedlimits[0]+21) {
        color = "color: #c90000";
       }
       else {
        color = "color: #300404";
       }
      for(let i = 0;i < props.dataO7.data.length; i++) { 
        if (rows[k][0] == props.dataO7.data[i][11] && props.dataO7.data[i][12] == 0 && props.dataO7.data[i][10] == vehicle[0]) {
            speed = parseInt(props.dataO7.data[i][11]);
            let time = new Date(dates[0], dates[1], dates[2], parseInt(props.dataO7.data[i][3]), parseInt(props.dataO7.data[i][4]), parseInt(props.dataO7.data[i][5]), 0);
            Handleddatatime.push([time, speed, color]);
            textlist.push([props.datapoint, props.title, props.dataO7.data[i][9], time, speed, props.dataO7.data[i][10]]);
        }
      }
    }

  props.setdata(Handleddatatime);
  setSpeedlist(textlist);
}

  //function for possible image download || currently used with text list for showing download
    function callimg() {
      if (chartimg[0] == 0) {
        setshowdownload([false, true]);
        setopen(false);
        setdaydrop(false)
      }
      else {
        setshowdownload([false, true]);
        setopen(false);
        setdaydrop(false)
      }
    }

    //function to generate and download speeds text list
    function downloadspeed() {
      if(Selectdrop == true && selectmultiple == false) {
        setselect(false);
      }
      let filedata = '';
      // create list of speeds with line breaks for text file
      for(let i = 0;i<speedlist.length;i++) {
          filedata += (speedlist[i] + '\n');
      }
      // create downloadable text file and download the file
      const blob = new Blob([filedata], { type: "text/plain" });
      const textURL = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "Nopeuslista.txt";
      link.href = textURL;
      link.click();
    }

    //toggle for chart selection single or multiple
    function togglemultipleselect() {
      if (selectmultiple == false) {
        setselect(true);
        setselectmultiple(true);
        setselectText(["Valitse useita"]);
        setTitle(["Ajoneuvot", "Nopeus"]);
      }
      else {
        setselect(false);
        setselectmultiple(false);
        setselectText(["Valitse yksi nopeus"]);
        setTitle(["Ajoneuvot", "Nopeus"]);
      }
    }

    function multipleselect() {
      if (rows.length == 0) { // prevent break
        return;
      }

      let rowslength = rows.length;
      let speedcount = 0;

      for(let i = 0;i<rowslength;i++) {
        speedcount = speedcount + props.data[rows[i][0]+1][1] + props.data[rows[i][0]+1][3];
      }
      //console.log("selected speeds: " + speedcount);
      //checks to limit browser performance slowing down or browser freezing
      if (rowslength > 74 ) {
        setrows([]);
        props.setdata(props.original);
        alert("Liian monen nopeuden valinta voi hidastaa tai jumittaa selainta");
        return;
      }
      else if (speedcount > 26000) {
        setrows([]);
        props.setdata(props.original);
        alert("Liian monen nopeuden valinta voi hidastaa tai jumittaa selainta");
        return;
      }
      else if (speedcount > 15000 && day[0] == true) {
        setrows([]);
        props.setdata(props.original);
        alert("Liian monen nopeuden valinta voi hidastaa tai jumittaa selainta");
        return;
      }
      else if (speedcount > 21000 && day[1] == true) {
        setrows([]);
        props.setdata(props.original);
        alert("Liian monen nopeuden valinta voi hidastaa tai jumittaa selainta");
        return;
      }

      //day checks for correct sorting function
      if (day[0] == true) { //day 1 multiple speed select show
        changechartdataselect();
        setChartclick(true); 
        setrows([]);
        setshowdownload([true, false]);
        setTitle(["Nopeus", "Aika ja Päivämäärä"]);
      }
      if (day[1] == true) { //day 3 multiple speed select show
        changechartdataselectmulti();
        setChartclick(true); 
        setrows([]);
        setshowdownload([true, false]);
        setTitle(["Nopeus", "Aika ja Päivämäärä"]);
      }
      if (day[2] == true) { //day 7 multiple speed select show
        changechartdataselectmulti7();
        setChartclick(true); 
        setrows([]);
        setshowdownload([true, false]);
        setTitle(["Nopeus", "Aika ja Päivämäärä"]);
      }
    }

    //change selected columns color
    function changerowcolor(nullcheck, row, colornumber) {
      if (nullcheck == null) {
        for(let i = 0;props.data.length >i; i++) {
          Dataholder.push([props.data[i][0], props.data[i][1], props.data[i][2], props.data[i][3], props.data[i][4]]);
        }
        
        let temprow = row + 1;
        let oldcolor = rows[colornumber][1];
        Dataholder.splice(temprow, 1, [props.data[temprow][0], props.data[temprow][1], oldcolor, props.data[temprow][3], oldcolor]);
        props.setdata(Dataholder);

      }
      else {
        for(let i = 0;props.data.length >i; i++) {
          Dataholder.push([props.data[i][0], props.data[i][1], props.data[i][2], props.data[i][3], props.data[i][4]]);
        }
        let temprow = row + 1;
        let newcolor = "#BA1DBD";
        Dataholder.splice(temprow, 1, [props.data[temprow][0], props.data[temprow][1], newcolor, props.data[temprow][3], newcolor]);
        props.setdata(Dataholder);
      }
    }

    const chartEvents = [
      {
        eventName: "select",
        callback({ chartWrapper }) {
          setopen(false);
          setdaydrop(false)

          if(Selectdrop == true && selectmultiple == false) {
            setselect(false);
          }

          if (chartclick == true) { //check if chart already clicked and return to speed amount view
            props.setdata(props.original);
            setChartclick(false);
            setshowdownload([false, false]);
            setTitle(["Ajoneuvot", "Nopeus"]);
            return
          }

          let select = chartWrapper.getChart().getSelection(); //get chart selection info
          
          if(select.length > 0) { //legend select
            if (select[0].row == null) {
              setshowdownload([false, false]);
              return;
            }
            else if (select[0].row == 0) {
              setshowdownload([false, false]);
              return;
            }
          }

          if (select.length == 0) { //prevent chart from breaking
            setChartclick(false);
            setshowdownload([false, false]);
            return;
          }

          let row = select[0].row; //get speed row

          if (row == null) {
            setChartclick(false);
            return;
          }

          if (selectmultiple == false) {
            setChartclick(true); //disable chart click
            //Single row select
            if (day[0] === true) { //speed selected from day 1
              changechartdata(row);
              setshowdownload([true, false]);
              setTitle(["Nopeus", "Aika ja Päivämäärä"]);
            }
            else if (day[1] == true) { //speed selected from day 3
              changechartdatamulti(row);
              setshowdownload([true, false]);
              setTitle(["Nopeus", "Aika ja Päivämäärä"]);
            }
            else if (day[2] == true) { //speed selected from day 7
              changechartdatamulti7(row);
              setshowdownload([true, false]);
              setTitle(["Nopeus", "Aika ja Päivämäärä"]);
            }
            else {
              console.log("something went wrong with chart selection");
            }
          }
          else {
            //multiple row select
            if (rows.length > 0) { //get selected rows
              for (let i = 0;rows.length > i;i++) {
                selectedRows.push([rows[i][0], rows[i][1]]);
              }
            }
            if (selectedRows.length == 0) { // add first selection
              let rowcolor = props.data[row+1][2];
              selectedRows.push([row, rowcolor]);
              setrows(selectedRows);
              changerowcolor(true, row);
            }
            else {
              let check = 0;
              let rowslen  = selectedRows.length;
              for(let i = 0;i < rowslen;i++) { //remove selected row from selections
                if(check > 0) {// break prevention for a.trim is not a funciton
                }
                else if (selectedRows[i][0] == row) {
                  changerowcolor(null, row, i);
                  let removerow = selectedRows.splice(i, 1);
                  setrows(selectedRows);
                  check++;
                }
              }
              
              if ( check == 0) { // add selected row to selections
                let rowcolor = props.data[row+1][2];
                selectedRows.push([row, rowcolor]);
                setrows(selectedRows);
                changerowcolor(true, row);
              }
            }
          }
        }
      },
      {
        eventName: "ready",
        callback({ chartWrapper }) { 
          if (show == true) { //show popup check

              let chartlayout = chartWrapper.getChart().getChartLayoutInterface();
              var x1 = 0;
              var y1 = 0;
              var x2 = 0;
              var y2 = 0;
              var x3 = 0;
              var y3 = 0;
              var x4 = 0;
              var y4 = 0;

              //calculate selected area div bounds
              function reCalc() {
                x3 = Math.min(x1,x2); //Smaller X
                x4 = Math.max(x1,x2); //Larger X
                y3 = Math.min(y1,y2); //Smaller Y
                y4 = Math.max(y1,y2); //Larger Y
                ref.current.style.left = x3 + 'px';
                ref.current.style.top = y3 + 'px';
                ref.current.style.width = x4 - x3 + 'px';
                ref.current.style.height = y4 - y3 + 'px'
              }

              //check if column is within selected drag select area
              function selectrows() {
                let selectedmultirows = [];

                for (let row = 0; row < 195; row++) {
                  let point1 = chartlayout.getBoundingBox('bar#' + '1#' + row);
                  let point = chartlayout.getBoundingBox('bar#' + '0#' + row);
                  if (point !== null && point.height > 0.5) {
                    if (((point.left >= (x3 - point.width)) && ((point.left + point.width) <= (x4 + point.width)))) {
                      selectedmultirows.push(row);
                    }
                  }
                  else if(point1 !== null && point1.height > 0.5) {
                    if (((point1.left >= (x3 - point1.width)) && ((point1.left + point1.width) <= (x4 + point1.width)))) {
                      selectedmultirows.push(row);
                    }
                  }
                }

                if (selectedmultirows.length == 0) {
                  //console.log("no columns");
                }
                else {
                  //if column already selected
                  for(let i = 0;props.data.length >i; i++) {
                    Dataholder.push([props.data[i][0], props.data[i][1], props.data[i][2], props.data[i][3], props.data[i][4]]);
                  }
                  if (rows.length > 0) { 
                    for (let i = 0;rows.length > i;i++) {
                      selectedRows.push([rows[i][0], rows[i][1]]);
                    }
                    let selectedRowslength = selectedRows.length;
                    for(let i = 0;i < selectedmultirows.length;i++) {
                      let same = 0;
                      for(let k = 0;k<selectedRows.length;k++) {
                        if(selectedmultirows[i] == selectedRows[k]) {
                          same++;
                        }
                      }
                      if(same == 0) {
                        let rowcolor = props.data[selectedmultirows[i]+1][2];
                        selectedRows.push([selectedmultirows[i], rowcolor]);
                      }
                      if(selectedRowslength !== selectedRows.length) {
                        let temprow = selectedmultirows[i] + 1;
                        let newcolor = "#BA1DBD";
                        Dataholder.splice(temprow, 1, [props.data[temprow][0], props.data[temprow][1], newcolor, props.data[temprow][3], newcolor]);
                      }
                    }
                    if(selectedRowslength !== selectedRows.length) {
                      props.setdata(Dataholder);
                      setrows(selectedRows);
                    }
                  }
                  //no columns already selected
                  else { 
                    for(let i = 0;i<selectedmultirows.length;i++) {
                      let rowcolor = props.data[selectedmultirows[i]+1][2];
                      selectedRows.push([selectedmultirows[i], rowcolor]);
                      let temprow = selectedmultirows[i] + 1;
                      let newcolor = "#BA1DBD";
                      Dataholder.splice(temprow, 1, [props.data[temprow][0], props.data[temprow][1], newcolor, props.data[temprow][3], newcolor]);
                    }
                    props.setdata(Dataholder);
                    setrows(selectedRows);
                  }
                }
              }

              onmousedown = function(e) {
                if (e.button == 2 && selectmultiple == true && chartclick == false) { //left button only
                  //setTimeout(300);
                  ref.current.style.visibility = 'visible'; //Unhide the div
                  x1 = e.clientX; //Set the initial X
                  y1 = e.clientY; //Set the initial Y
                  reCalc();
                } 
              }

              onmousemove = function(e) {
                  x2 = e.clientX; //Update the current position X
                  y2 = e.clientY; //Update the current position Y
                  reCalc();
              }

              onmouseup = function(e) {
                if (e.button == 2 && selectmultiple == true && chartclick == false) {
                  ref.current.style.visibility = 'hidden'; //Hide the div
                  selectrows();
                }
              }

            if(defaultday == true) { 
              getData(); //get Lam id data
            }
            if (showdownload[0] == true) { //show download ckeck
              //setChartimg([chartWrapper.getChart().getImageURI()]); //set chart image into download button || uncomment for image download usage
              callimg();
            }
          }
        }
      },
      {
        eventName: "error",
        callback({ chartWrapper }) { 
          let error = chartWrapper;
          //console.log("Chart error occurred: " + error);
          DataHandle1(props.dataO1); //fixes a.trim error
        }
      }
    ];

    return (
        <div
            style={{
                visibility: show ? "visible" : "hidden", //boolean toggle for visible state
                opacity: show ? "1" : "0" //boolean toggle for opacity
            }}
            className="Overlay" /*set class for div as Overlay */ >
            <div className="Popup" /*set class for div as Popup */ > 
                <div className="Popup-header">
                    <div className="dropdown-hover">
                      <button><FaInfo className="" /></button>
                      <div className="hover-content">
                        <p>Päivä painikkeet valikosta pystyy muuttamaan histogrammin näkymää päivien mukaiseksi.</p>
                        <p>Histogrammista pystyy valitsemaan nopeuksia tarkempaan tarkasteluun yksittäisen palkin valintana tai valitsemalla monta palkkia kerralla.</p>
                        <p>Monen nopeuden valintaa voi myös tehdä painamalla hiiren oikeaa näppäintä pohjassa ja maalaamalla alueen.</p>
                        <p>Ajoneuvoluokat valikosta pystyy vaihtamaan histogrammin näyttämään eri ajoneuvoluokkia.</p>
                        <p>Valittujen nopeuksien tiedot pystyy lataamaan teksti tiedostona.</p>
                      </div>
                    </div>
                    <h1 className="Popup-title">{props.title} | Lam id:{props.datapoint}</h1>
                    <button className="Close" onClick={closeHandler}>
                        <FaRegWindowClose className="close-icon"/>
                    </button>
                </div>

                <div className="Popup-middle">
              <div className="Popup-speed"><h2>Suunta 1 Nopeusrajoitus {Speedlimit[0]}</h2></div>
              <div className="Popup-speed"><h2>Suunta 2 Nopeusrajoitus {Speedlimit[1]}</h2></div>
            </div>   

                <div className="Popup-middle">

                  <div className="dropdown day">
                    <button className={`dropdown-button ${daydrop == true && "active"}`} onClick={() => setdaydrop(!daydrop) & setopen(false)}>Päivät <FaBars className="dropdown-icon"/></button>
                    {daydrop ? (
                    <ul className="menu">
                      <li className={`menu-item ${active[0] == true && "active"}`}>
                      <button onClick={() => DataHandle1(props.dataO1) & setopen(false) & setdaydrop(!daydrop) & setTitle(["Ajoneuvot", "Nopeus"])}>1 Päivä <FaRegChartBar className=""/></button>
                      </li>
                      <li className={`menu-item ${active[1] == true && "active"}`}>
                      <button onClick={() => compileData(props.dataO1, props.dataO2, props.dataO3) & setopen(false) & setdaydrop(!daydrop) & setTitle(["Ajoneuvot", "Nopeus"])}>3 Päivää <FaRegChartBar className=""/></button>
                      </li>
                      <li className={`menu-item ${active[2] == true && "active"}`}>
                      <button onClick={() => compileData2(props.dataO1, props.dataO2, props.dataO3, props.dataO4, props.dataO5, props.dataO6, props.dataO7) & setopen(false) & setdaydrop(!daydrop) & setTitle(["Ajoneuvot", "Nopeus"])}>7 Päivää <FaRegChartBar className=""/></button>
                      </li>
                    </ul>
                    ) : null}
                  </div>

                  <div className="dropdown select">
                    <button className={`dropdown-button ${selectmultiple == true && "active"}`} onClick={() => togglemultipleselect() & setrows([])& props.setdata(props.original)& setshowdownload([false, false]) & setChartclick(false) & setopen(false) & setdaydrop(false)}>{selectText[0]} <FaBars className="dropdown-icon"/></button>
                    {Selectdrop ? (
                    <ul className="menu">
                      {selectmultiple ? (
                        <li className={`menu-item`}>
                        <button onClick={() => multipleselect() & setopen(false) & setdaydrop(false)}>Näytä valinnat <FaRegChartBar className=""/></button>
                        </li>
                      ) : null}
                      {selectmultiple ? (
                        <li className={`menu-item`}>
                        <button onClick={() => setrows([]) & props.setdata(props.original) & setshowdownload([false, false]) & setChartclick(false) & setopen(false) & setdaydrop(false) & setTitle(["Ajoneuvot", "Nopeus"])}>Tyhjennä valinnat <FaTrash className=""/></button>
                        </li>
                      ) : null}
                      {showdownload[1] ? (
                        <li className={`menu-item`}>
                          <button onClick={() => downloadspeed() & setshowdownload([false, false]) & setopen(false) & setdaydrop(false)}>Lataa nopeus lista <FaDownload className=""/></button>
                        </li>
                      ) : null}
                    </ul>
                    ) : null}
                  </div>
                    <button className={`Log ${log == true && "active"}`} onClick={() => setlog(!log) & setdaydrop(false) & setopen(false)}>Graafi skaalaus  {log ? <FaToggleOn className="Toggle-button"/> : <FaToggleOff className="Toggle-button"/>}</button>
                  <div className="dropdown">
                    <button className={`dropdown-button ${open == true && "active"}`} onClick={() => handleopen() & setdaydrop(false)}>Ajoneuvoluokat <FaBars className="dropdown-icon"/></button>
                    {open ? (
                    <ul className="menu">
                      <li className={`menu-item ${vehicle[0] == 1 && "active"}`}>
                      <button onClick={() => ChangeVehicleClass(1) & setvehicle([1, "Henkilö- tai pakettiauto"]) & setopen(!open) & setTitle(["Ajoneuvot", "Nopeus"])}>Henkilö- tai pakettiauto</button>
                      </li>
                      <li className={`menu-item ${vehicle[0] == 2 && "active"}`}>
                      <button onClick={() => ChangeVehicleClass(2) & setvehicle([2, "Kuorma-auto ilman perävaunua"]) & setopen(!open) & setTitle(["Ajoneuvot", "Nopeus"])}>Kuorma-auto ilman perävaunua</button>
                      </li>
                      <li className={`menu-item ${vehicle[0] == 3 && "active"}`}>
                      <button onClick={() => ChangeVehicleClass(3) & setvehicle([3, "Linja-autot"]) & setopen(!open) & setTitle(["Ajoneuvot", "Nopeus"])}>Linja-autot</button>
                      </li>
                      <li className={`menu-item ${vehicle[0] == 4 && "active"}`}>
                      <button onClick={() => ChangeVehicleClass(4) & setvehicle([4, "Kuorma-auto ja puoliperävaunu"]) & setopen(!open) & setTitle(["Ajoneuvot", "Nopeus"])}>Kuorma-auto ja puoliperävaunu</button>
                      </li>
                      <li className={`menu-item ${vehicle[0] == 5 && "active"}`}>
                      <button onClick={() => ChangeVehicleClass(5) & setvehicle([5, "Kuorma-auto ja täysperävaunu"]) & setopen(!open) & setTitle(["Ajoneuvot", "Nopeus"])}>Kuorma-auto ja täysperävaunu</button>
                      </li>
                      <li className={`menu-item ${vehicle[0] == 6 && "active"}`}>
                      <button onClick={() => ChangeVehicleClass(6) & setvehicle([6, "Henkilöauto ja peräkärry"]) & setopen(!open) & setTitle(["Ajoneuvot", "Nopeus"])}>Henkilöauto ja peräkärry</button>
                      </li>
                      <li className={`menu-item ${vehicle[0] == 7 && "active"}`}>
                      <button onClick={() => ChangeVehicleClass(7) & setvehicle([7, "Henkilöauto ja asuntovaunu"]) & setopen(!open) & setTitle(["Ajoneuvot", "Nopeus"])}>Henkilöauto ja asuntovaunu</button>
                      </li>
                      <li className={`menu-item ${vehicle[0] == 8 && "active"}`}>
                      <button onClick={() => ChangeVehicleClass(8) & setvehicle([8, "Moottoripyörät ja mopot"]) & setopen(!open) & setTitle(["Ajoneuvot", "Nopeus"])}>Moottoripyörät ja mopot</button>
                      </li>
                      <li className={`menu-item ${vehicle[0] == 9 && "active"}`}>
                      <button onClick={() => ChangeVehicleClass(9) & setvehicle([9, "High Capacity Truck"]) & setopen(!open) & setTitle(["Ajoneuvot", "Nopeus"])}>High Capacity Truck</button>
                      </li>
                    </ul>
                    ) : null}
                </div>
              </div>

            <div className="Popup-main" /*Main area for chart */>
                      
            <Chart chartType="ColumnChart" width="100%" height="86%" data={props.data} chartEvents={chartEvents} options={{
            backgroundColor: "#344263",
            chartArea: {
              backgroundColor: "#dcdae6"
            },
            isStacked: true,
            title: day[3] + " " + vehicle[1],
            titleTextStyle: {
              color: "#FFFFFF",
              fontName: "Inter",
              fontSize: "24",
              italic: "false",
              bold: false,
            },
            legend: {
              textStyle: {
                color: "#FFFFFF",
                fontSize: "18",
                fontName: "Inter",
                italic: "false"
              }
            },
            hAxis: {
              title: Title[1],
              titleTextStyle: {
                color: "#FFFFFF",
                fontName: "Inter",
                fontSize: "24",
                italic: "false",
              },
              textStyle: {
                color: "#FFFFFF",
                fontName: "Inter",
                fontSize: "18",
                italic: "false",
              }
            },
            vAxis: {
              title: Title[0],
              titleTextStyle: {
                color: "#FFFFFF",
                fontName: "Inter",
                fontSize: "24",
                italic: "false"
              },
              textStyle: {
                color: "#FFFFFF",
                fontName: "Inter",
                fontSize: "18",
                italic: "false"
              },
              gridlines: {
                interval: [1, 2, 3, 5],
              },
              logScale: log
            },
            bar: {
              groupWidth: "100%"
            },
            selectionMode: 'multiple'
            
          }} />
          <div id="SelectBox" ref={ref}></div>
                    </div>
            </div>
        </div>
    );
};

CustomPopup.propTypes = {
    title: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default CustomPopup;