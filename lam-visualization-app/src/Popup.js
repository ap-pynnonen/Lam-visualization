import { useEffect, useState } from "react"; //useEffect and useState import from react
import "./Popup.css"; //CSS styles import
import PropTypes from "prop-types"; //prop-types import
import { Chart } from "react-google-charts"; //import chart from react google charts
import { usePapaParse } from "react-papaparse";

const CustomPopup = (props) => {
    const [show, setShow] = useState(false); //State declaration for popup show
    const [chartclick, setChartclick] = useState(false); //useState for chartclicks and stopping chart errors
    const Handleddatatime = [[{ type: "datetime", label: "date"}, "Nopeus (km/h)", { role: "style" }]]; //nested array for speed times of day
    const Dataholder = []; //temporarydata holder
    const Handleddata = [["Nopeus", "Suunta 1 Autot", { role: "style" }, "Suunta 2 Autot", { role: "style" }]]; //array for parsed csv data with header row set
    const [click, setclick] = useState([false, false]); //
    const [day, setDay] = useState([true, false, false]); //useState for functions to know which day data is displayed and need to be handled
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
    const textlist = [["Lam id", "paikka", "suunta", "viikonpäivä", "kuukausi", "päivä", "vuosi", "(aika: tunti, minuutti, sekunti)", "aikavyöhyke", "Nopeus (km/h)"]];

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
        //props.setdata([["Nopeus", "Autot", { role: "style" }, "Autot2", { role: "style" }], ["1 km/h", 1, "color: #BA1DBD", 3, "color: #BA1DBD"]]);
        setselectmultiple(false);
        setshowdownload([false, false]);
        setclick([false, false]);
        setdefaultday(true);
        props.onClose(false);
    }

    //useEffect for popup show
    useEffect(() => {
      setShow(props.show);
    }, [props.show]);


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
     let url1 = "/api_call/api/tms/v1/history/raw/lamraw_" + props.datapoint + "_" + datadate[0] + "_" + datadate[1] + ".csv";
     let url2 = "/api_call/api/tms/v1/history/raw/lamraw_" + props.datapoint + "_" + datadate[0] + "_" + datadate[2] + ".csv";
     if (datadate[8] !== 0) {
      url2 = "/api_call/api/tms/v1/history/raw/lamraw_" + props.datapoint + "_" + datadate[8] + "_" + datadate[2] + ".csv";
     }
     let url3 = "/api_call/api/tms/v1/history/raw/lamraw_" + props.datapoint + "_" + datadate[0] + "_" + datadate[3] + ".csv";
     if (datadate[9] !== 0) {
      url3 = "/api_call/api/tms/v1/history/raw/lamraw_" + props.datapoint + "_" + datadate[9] + "_" + datadate[3] + ".csv";
     }
     let url4 = "/api_call/api/tms/v1/history/raw/lamraw_" + props.datapoint + "_" + datadate[0] + "_" + datadate[4] + ".csv";
     if (datadate[10] !== 0) {
      url4 = "/api_call/api/tms/v1/history/raw/lamraw_" + props.datapoint + "_" + datadate[10] + "_" + datadate[4] + ".csv";
     }
     let url5 = "/api_call/api/tms/v1/history/raw/lamraw_" + props.datapoint + "_" + datadate[0] + "_" + datadate[5] + ".csv";
     if (datadate[11] !== 0) {
      url5 = "/api_call/api/tms/v1/history/raw/lamraw_" + props.datapoint + "_" + datadate[11] + "_" + datadate[5] + ".csv";
     }
     let url6 = "/api_call/api/tms/v1/history/raw/lamraw_" + props.datapoint + "_" + datadate[0] + "_" + datadate[6] + ".csv";
     if (datadate[12] !== 0) {
      url6 = "/api_call/api/tms/v1/history/raw/lamraw_" + props.datapoint + "_" + datadate[12] + "_" + datadate[6] + ".csv";
     }
     let url7 = "/api_call/api/tms/v1/history/raw/lamraw_" + props.datapoint + "_" + datadate[0] + "_" + datadate[7] + ".csv";
     if (datadate[13] !== 0) {
      url7 = "/api_call/api/tms/v1/history/raw/lamraw_" + props.datapoint + "_" + datadate[13] + "_" + datadate[7] + ".csv";
     }

     //get data
    let day1data = 1;
    handleReadRemoteFile(url1, day1data);
    let day2data = 2;
    handleReadRemoteFile(url2, day2data);
    let day3data = 3;
    handleReadRemoteFile(url3, day3data);
    let day4data = 4;
    handleReadRemoteFile(url4, day4data);
    let day5data = 5;
    handleReadRemoteFile(url5, day5data);
    let day6data = 6;
    handleReadRemoteFile(url6, day6data);
    let day7data = 7;
    handleReadRemoteFile(url7, day7data);
    }

    //get csv data and parse csv data
    const handleReadRemoteFile = (url, num) => {
      readRemoteFile(url, {
        complete: (results) => {
          //console.log("Results: ", results);
          if(num == 1) {
            props.setdata1original(results);
            DataHandle1(results); //show day 1 data
            //console.log(results);
          }
          else if (num == 2) {
            props.setdata2original(results);
            //console.log(results);
          }
          else if (num == 3) {
            props.setdata3original(results);
          }
          else if (num == 4) {
            props.setdata4original(results);
          }
          else if (num == 5) {
            props.setdata5original(results);
          }
          else if (num == 6) {
            props.setdata6original(results);
          }
          else if (num == 7) {
            props.setdata7original(results);
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

      //console.log("data url: " + "year(" + urlYear + ") days(" + days + ")");
      return([urlYear, days1, days2, days3, days4, days5, days6, days7, urlYear2, urlYear3, urlYear4, urlYear5, urlYear6, urlYear7]);
      function calculateDays(number1, number2) {
        let value = 0;
        //console.log("what is this number " + number2);
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

    function DataHandle1 (props1) { //Handle 1 Day csv data
      setDay([true, false, false]);
      setChartclick(false);
      setActive([true, false, false]);
      setshowdownload([false, false]);
      setrows([]);
      //speed target
      let target = 100;
      let speedcounter = 0;
      let text = "km/h";

      let speedlimits = speedlimit(props1.data[0][0]);
      //console.log(speedlimits);
      SetSpeedlimit([speedlimits[0], speedlimits[1]]);
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
        
        //loop for checking how many cars with certain speed
  
        for(let i = 0; i < props1.data.length; i++) {
          if (speedcounter == props1.data[i][11] && props1.data[i][9] == 1 && props1.data[i][12] == 0) {
            counter++;
          }
          else if (speedcounter == props1.data[i][11] && props1.data[i][9] == 2 && props1.data[i][12] == 0) {
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
        color = "color: #FBFF26";
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
        color2 = "color: #FBFF26";
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
       Handleddata.push([newspeed, counter, color, counter2, color2]); //add new speed, car amount and color
       speedcounter++;
      }

      // Give handled data to useState
        props.setdata(Handleddata);
        props.setoriginal(Handleddata);
    }

    function DataHandlemulti (Data, num) { //handle multiple days csv data
      //speed target
      let target = 100;
      let speedcounter = 0;
      let text = "km/h";
      const Handleddata2 = [["Nopeus", "Suunta 1 Autot", { role: "style" }, "Suunta 2 Autot", { role: "style" }]]; //array for parsed csv data with header row set

      let speedlimits = speedlimit(Data.data[0][0]);
      //console.log(speedlimits);
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
        //loop for checking how many cars with certain speed
        for(let i = 0; i < Data.data.length; i++) {
          if (speedcounter == Data.data[i][11] && Data.data[i][9] == 1 && Data.data[i][12] == 0) {
            counter++;
          }
          if (speedcounter == Data.data[i][11] && Data.data[i][9] == 2 && Data.data[i][12] == 0) {
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
        color = "color: #FBFF26";
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
        color2 = "color: #FBFF26";
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

    function compileData(dat1, dat2, dat3) { //Add together 3 days certain speed time of day selected from day select

      setDay([false, true, false]);
      setChartclick(false);
      setActive([false, true, false]);
      setshowdownload([false, false]);
      setrows([]);

      if(click[0] == false) {
      const num = [1, 2, 3];
      const tempdata1 = DataHandlemulti(dat1, num[0]);
      const tempdata2 = DataHandlemulti(dat2, num[1]);
      const tempdata3 = DataHandlemulti(dat3, num[2]);

      let speed = "";
      let counter = 0;
      let color = "";
      let counter2 = 0;
      let color2 = "";

      for (let i = 1; i< 196; i++) { //get speed time of day to chart day 3
        speed = tempdata1[i][0];
        counter = tempdata1[i][1] + tempdata2[i][1] + tempdata3[i][1];
        color = tempdata1[i][2];
        counter2 = tempdata1[i][3] + tempdata2[i][3] + tempdata3[i][3];
        color2 = tempdata1[i][4];
        Handleddata.push([speed, counter, color, counter2, color2]);
      }
      props.setdata(Handleddata);
      props.setoriginal(Handleddata);

      }
      else {
        let speed = "";
        let counter = 0;
        let color = "";
        let counter2 = 0;
        let color2 = "";
  
  
        for (let i = 1; i< 196; i++) { //get speed time of day to chart day 3
          speed = props.data1[i][0];
          counter = props.data1[i][1] + props.data2[i][1] + props.data3[i][1];
          color = props.data1[i][2];
          counter2 = props.data1[i][3] + props.data2[i][3] + props.data3[i][3];
          color2 = props.data1[i][4];
          Handleddata.push([speed, counter, color, counter2, color2]);
        }
        props.setdata(Handleddata);
        props.setoriginal(Handleddata);
      }
  
    }

    function compileData2(dat1, dat2, dat3, dat4, dat5, dat6, dat7) { //Add together 7 days certain speed time of day selected from day select

      setDay([false, false, true]); // set day
      setChartclick(false); //
      setActive([false, false, true]);
      setshowdownload([false, false]);
      setrows([]);

      if(click[1] == false) {
        const num = [1, 2, 3, 4, 5, 6, 7];
        const tempdata1 = DataHandlemulti(dat1, num[0]);
        const tempdata2 = DataHandlemulti(dat2, num[1]);
        const tempdata3 = DataHandlemulti(dat3, num[2]);
        const tempdata4 = DataHandlemulti(dat4, num[3]);
        const tempdata5 = DataHandlemulti(dat5, num[4]);
        const tempdata6 = DataHandlemulti(dat6, num[5]);
        const tempdata7 = DataHandlemulti(dat7, num[6]);

      let speed = "";
      let counter = 0;
      let color = "";
      let counter2 = 0;
      let color2 = "";

      for (let i = 1; i< 196; i++) { //get speed time of day to chart day 7
        speed = tempdata1[i][0];
        counter = tempdata1[i][1] + tempdata2[i][1] + tempdata3[i][1] + tempdata4[i][1] + tempdata5[i][1] + tempdata6[i][1] + tempdata7[i][1];
        color = tempdata1[i][2];
        counter2 = tempdata1[i][3] + tempdata2[i][3] + tempdata3[i][3] + tempdata4[i][3] + tempdata5[i][3] + tempdata6[i][3] + tempdata7[i][3];
        color2 = tempdata1[i][4];
        Handleddata.push([speed, counter, color, counter2, color2]);
      }
      props.setdata(Handleddata);
      props.setoriginal(Handleddata);
      }
      else {
        let speed = "";
        let counter = 0;
        let color = "";
        let counter2 = 0;
        let color2 = "";
  
        for (let i = 1; i< 196; i++) { //get speed time of day to chart day 7
          speed = props.data1[i][0];
          counter = props.data1[i][1] + props.data2[i][1] + props.data3[i][1] + props.data4[i][1] + props.data5[i][1] + props.data6[i][1] + props.data7[i][1];
          color = props.data1[i][2];
          counter2 = props.data1[i][3] + props.data2[i][3] + props.data3[i][3] + props.data4[i][3] + props.data5[i][3] + props.data6[i][3] + props.data7[i][3];
          color2 = props.data1[i][4];
          Handleddata.push([speed, counter, color, counter2, color2]);
        }
        props.setdata(Handleddata);
        props.setoriginal(Handleddata);
      }
    }

    function changechartdata(row) { // day 1 change chart data
        let listspeed = row;
        let speed = 0;
        let color = "#BA1DBD";
        let dates = getDatespeedlist(0);
        let speedlimits = speedlimit(props.data1original.data[0][0]);
        if ( listspeed < speedlimits[0]+1) {
          color = "color: #23DE36";
         }
         else if (listspeed > speedlimits[0]-21 && listspeed < speedlimits[0]+11) {
          color = "color: #FBFF26";
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
        for(let i = 0;i < props.data1original.data.length; i++) { //get speed time of day to chart day 1
            if (listspeed == props.data1original.data[i][11] && props.data1original.data[i][12] == 0) {
                speed = parseInt(props.data1original.data[i][11]);
                let time = new Date(dates[0], dates[1], dates[2], parseInt(props.data1original.data[i][3]), parseInt(props.data1original.data[i][4]), parseInt(props.data1original.data[i][5]), 0);
                Handleddatatime.push([time, speed, color]);
                textlist.push([props.datapoint, props.title, props.data1original.data[i][9], time, speed]);
            }
        }
        props.setdata(Handleddatatime);
        setSpeedlist(textlist);
    }

    function changechartdatamulti(row) { //day 3 change chart data
      let listspeed = row;
      let speed = 0;

      let color = "#BA1DBD";
      let dates = getDatespeedlist(0);
      let speedlimits = speedlimit(props.data1original.data[0][0]);
      if ( listspeed < speedlimits[0]+1) {
        color = "color: #23DE36";
       }
       else if (listspeed > speedlimits[0]-21 && listspeed < speedlimits[0]+11) {
        color = "color: #FBFF26";
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

      for(let i = 0;i < props.data1original.data.length; i++) {
          if (listspeed == props.data1original.data[i][11] && props.data1original.data[i][12] == 0) {
              speed = parseInt(props.data1original.data[i][11]);
              let time = new Date(dates[0], dates[1], dates[2], parseInt(props.data1original.data[i][3]), parseInt(props.data1original.data[i][4]), parseInt(props.data1original.data[i][5]), 0);
              Handleddatatime.push([time, speed, color]);
              textlist.push([props.datapoint, props.title, props.data1original.data[i][9], time, speed]);
          }
      }
      dates = getDatespeedlist(1);
      for(let i = 0;i < props.data2original.data.length; i++) {
        if (listspeed == props.data2original.data[i][11] && props.data2original.data[i][12] == 0) {
            speed = parseInt(props.data2original.data[i][11]);
            let time = new Date(dates[0], dates[1], dates[2], parseInt(props.data2original.data[i][3]), parseInt(props.data2original.data[i][4]), parseInt(props.data2original.data[i][5]), 0);
            Handleddatatime.push([time, speed, color]);
            textlist.push([props.datapoint, props.title, props.data2original.data[i][9], time, speed]);
        }
    }
    dates = getDatespeedlist(2);
    for(let i = 0;i < props.data3original.data.length; i++) {
      if (listspeed == props.data3original.data[i][11] && props.data3original.data[i][12] == 0) {
          speed = parseInt(props.data3original.data[i][11]);
          let time = new Date(dates[0], dates[1], dates[2], parseInt(props.data3original.data[i][3]), parseInt(props.data3original.data[i][4]), parseInt(props.data3original.data[i][5]), 0);
          Handleddatatime.push([time, speed, color]);
          textlist.push([props.datapoint, props.title, props.data3original.data[i][9], time, speed]);
      }
  }

      props.setdata(Handleddatatime);
      setSpeedlist(textlist);
  }

  function changechartdatamulti7(row) { //day 7 change chart data
    let listspeed = row;
    let speed = 0;

    let color = "#BA1DBD";
    let dates = getDatespeedlist(0);
    let speedlimits = speedlimit(props.data1original.data[0][0]);
    if ( listspeed < speedlimits[0]+1) {
      color = "color: #23DE36";
     }
     else if (listspeed > speedlimits[0]-21 && listspeed < speedlimits[0]+11) {
      color = "color: #FBFF26";
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

    for(let i = 0;i < props.data1original.data.length; i++) {
        if (listspeed == props.data1original.data[i][11] && props.data1original.data[i][12] == 0) {
            speed = parseInt(props.data1original.data[i][11]);
            let time = new Date(dates[0], dates[1], dates[2], parseInt(props.data1original.data[i][3]), parseInt(props.data1original.data[i][4]), parseInt(props.data1original.data[i][5]), 0);
            Handleddatatime.push([time, speed, color]);
            textlist.push([props.datapoint, props.title, props.data1original.data[i][9], time, speed]);
        }
    }
    dates = getDatespeedlist(1);
    for(let i = 0;i < props.data2original.data.length; i++) {
      if (listspeed == props.data2original.data[i][11] && props.data2original.data[i][12] == 0) {
          speed = parseInt(props.data2original.data[i][11]);
          let time = new Date(dates[0], dates[1], dates[2], parseInt(props.data2original.data[i][3]), parseInt(props.data2original.data[i][4]), parseInt(props.data2original.data[i][5]), 0);
          Handleddatatime.push([time, speed, color]);
          textlist.push([props.datapoint, props.title, props.data2original.data[i][9], time, speed]);
      }
    }
    dates = getDatespeedlist(2);
  for(let i = 0;i < props.data3original.data.length; i++) {
    if (listspeed == props.data3original.data[i][11] && props.data3original.data[i][12] == 0) {
        speed = parseInt(props.data3original.data[i][11]);
        let time = new Date(dates[0], dates[1], dates[2], parseInt(props.data3original.data[i][3]), parseInt(props.data3original.data[i][4]), parseInt(props.data3original.data[i][5]), 0);
        Handleddatatime.push([time, speed, color]);
        textlist.push([props.datapoint, props.title, props.data3original.data[i][9], time, speed]);
    }
  }
  dates = getDatespeedlist(3);
  for(let i = 0;i < props.data4original.data.length; i++) {
    if (listspeed == props.data4original.data[i][11] && props.data4original.data[i][12] == 0) {
        speed = parseInt(props.data4original.data[i][11]);
        let time = new Date(dates[0], dates[1], dates[2], parseInt(props.data4original.data[i][3]), parseInt(props.data4original.data[i][4]), parseInt(props.data4original.data[i][5]), 0);
        Handleddatatime.push([time, speed, color]);
        textlist.push([props.datapoint, props.title, props.data4original.data[i][9], time, speed]);
    }
  }
  dates = getDatespeedlist(4);
  for(let i = 0;i < props.data5original.data.length; i++) {
    if (listspeed == props.data5original.data[i][11] && props.data5original.data[i][12] == 0) {
        speed = parseInt(props.data5original.data[i][11]);
        let time = new Date(dates[0], dates[1], dates[2], parseInt(props.data5original.data[i][3]), parseInt(props.data5original.data[i][4]), parseInt(props.data5original.data[i][5]), 0);
        Handleddatatime.push([time, speed, color]);
        textlist.push([props.datapoint, props.title, props.data5original.data[i][9], time, speed]);
    }
  }
  dates = getDatespeedlist(5);
  for(let i = 0;i < props.data6original.data.length; i++) {
    if (listspeed == props.data6original.data[i][11] && props.data6original.data[i][12] == 0) {
        speed = parseInt(props.data6original.data[i][11]);
        let time = new Date(dates[0], dates[1], dates[2], parseInt(props.data6original.data[i][3]), parseInt(props.data6original.data[i][4]), parseInt(props.data6original.data[i][5]), 0);
        Handleddatatime.push([time, speed, color]);
        textlist.push([props.datapoint, props.title, props.data6original.data[i][9], time, speed]);
    }
  }
  dates = getDatespeedlist(6);
  for(let i = 0;i < props.data7original.data.length; i++) {
    if (listspeed == props.data7original.data[i][11] && props.data7original.data[i][12] == 0) {
        speed = parseInt(props.data7original.data[i][11]);
        let time = new Date(dates[0], dates[1], dates[2], parseInt(props.data7original.data[i][3]), parseInt(props.data7original.data[i][4]), parseInt(props.data7original.data[i][5]), 0);
        Handleddatatime.push([time, speed, color]);
        textlist.push([props.datapoint, props.title, props.data7original.data[i][9], time, speed]);
    }
  }

    props.setdata(Handleddatatime);
    setSpeedlist(textlist);
}

function changechartdataselect() { // day 1 change chart data
  let speed = 0;
  let dates = getDatespeedlist(0);

    for (let k = 0; k < rows.length;k++) {
      let color = "#BA1DBD";
      let speedlimits = speedlimit(props.data1original.data[0][0]);
      if ( rows[k][0] < speedlimits[0]+1) {
        color = "color: #23DE36";
       }
       else if (rows[k][0] > speedlimits[0]-21 && rows[k][0] < speedlimits[0]+11) {
        color = "color: #FBFF26";
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
      for(let i = 0;i < props.data1original.data.length; i++) { //get speed time of day to chart day 1
        if (rows[k][0] == props.data1original.data[i][11] && props.data1original.data[i][12] == 0) {
            speed = parseInt(props.data1original.data[i][11]);
            let time = new Date(dates[0], dates[1], dates[2], parseInt(props.data1original.data[i][3]), parseInt(props.data1original.data[i][4]), parseInt(props.data1original.data[i][5]), 0);
            Handleddatatime.push([time, speed, color]);
            textlist.push([props.datapoint, props.title, props.data1original.data[i][9], time, speed]);
        }
      }
    }

  props.setdata(Handleddatatime);
  setSpeedlist(textlist);
}

function changechartdataselectmulti() { // day 3 change chart data
  let speed = 0;
  let dates = getDatespeedlist(0);

    for (let k = 0; k < rows.length;k++) {
      let color = "#BA1DBD";
      let speedlimits = speedlimit(props.data1original.data[0][0]);
      if ( rows[k][0] < speedlimits[0]+1) {
        color = "color: #23DE36";
       }
       else if (rows[k][0] > speedlimits[0]-21 && rows[k][0] < speedlimits[0]+11) {
        color = "color: #FBFF26";
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
      for(let i = 0;i < props.data1original.data.length; i++) {
        if (rows[k][0] == props.data1original.data[i][11] && props.data1original.data[i][12] == 0) {
            speed = parseInt(props.data1original.data[i][11]);
            let time = new Date(dates[0], dates[1], dates[2], parseInt(props.data1original.data[i][3]), parseInt(props.data1original.data[i][4]), parseInt(props.data1original.data[i][5]), 0);
            Handleddatatime.push([time, speed, color]);
            textlist.push([props.datapoint, props.title, props.data1original.data[i][9], time, speed]);
        }
      }
    }
    dates = getDatespeedlist(1);
    for (let k = 0; k < rows.length;k++) {
      let color = "#BA1DBD";
      let speedlimits = speedlimit(props.data1original.data[0][0]);
      if ( rows[k][0] < speedlimits[0]+1) {
        color = "color: #23DE36";
       }
       else if (rows[k][0] > speedlimits[0]-21 && rows[k][0] < speedlimits[0]+11) {
        color = "color: #FBFF26";
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
      for(let i = 0;i < props.data2original.data.length; i++) { 
        if (rows[k][0] == props.data2original.data[i][11] && props.data2original.data[i][12] == 0) {
            speed = parseInt(props.data2original.data[i][11]);
            let time = new Date(dates[0], dates[1], dates[2], parseInt(props.data2original.data[i][3]), parseInt(props.data2original.data[i][4]), parseInt(props.data2original.data[i][5]), 0);
            Handleddatatime.push([time, speed, color]);
            textlist.push([props.datapoint, props.title, props.data2original.data[i][9], time, speed]);
        }
      }
    }
    dates = getDatespeedlist(2);
    for (let k = 0; k < rows.length;k++) {
      let color = "#BA1DBD";
      let speedlimits = speedlimit(props.data1original.data[0][0]);
      if ( rows[k][0] < speedlimits[0]+1) {
        color = "color: #23DE36";
       }
       else if (rows[k][0] > speedlimits[0]-21 && rows[k][0] < speedlimits[0]+11) {
        color = "color: #FBFF26";
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
      for(let i = 0;i < props.data3original.data.length; i++) { 
        if (rows[k][0] == props.data3original.data[i][11] && props.data3original.data[i][12] == 0) {
            speed = parseInt(props.data3original.data[i][11]);
            let time = new Date(dates[0], dates[1], dates[2], parseInt(props.data3original.data[i][3]), parseInt(props.data3original.data[i][4]), parseInt(props.data3original.data[i][5]), 0);
            Handleddatatime.push([time, speed, color]);
            textlist.push([props.datapoint, props.title, props.data3original.data[i][9], time, speed]);
        }
      }
    }

  props.setdata(Handleddatatime);
  setSpeedlist(textlist);
}

function changechartdataselectmulti7() { // day 7 change chart data
  let speed = 0;
  let dates = getDatespeedlist(0);

    for (let k = 0; k < rows.length;k++) {
      let color = "#BA1DBD";
      let speedlimits = speedlimit(props.data1original.data[0][0]);
      if ( rows[k][0] < speedlimits[0]+1) {
        color = "color: #23DE36";
       }
       else if (rows[k][0] > speedlimits[0]-21 && rows[k][0] < speedlimits[0]+11) {
        color = "color: #FBFF26";
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
      for(let i = 0;i < props.data1original.data.length; i++) {
        if (rows[k][0] == props.data1original.data[i][11] && props.data1original.data[i][12] == 0) {
            speed = parseInt(props.data1original.data[i][11]);
            let time = new Date(dates[0], dates[1], dates[2], parseInt(props.data1original.data[i][3]), parseInt(props.data1original.data[i][4]), parseInt(props.data1original.data[i][5]), 0);
            Handleddatatime.push([time, speed, color]);
            textlist.push([props.datapoint, props.title, props.data1original.data[i][9], time, speed]);
        }
      }
    }
  dates = getDatespeedlist(1);
    for (let k = 0; k < rows.length;k++) {
      let color = "#BA1DBD";
      let speedlimits = speedlimit(props.data1original.data[0][0]);
      if ( rows[k][0] < speedlimits[0]+1) {
        color = "color: #23DE36";
       }
       else if (rows[k][0] > speedlimits[0]-21 && rows[k][0] < speedlimits[0]+11) {
        color = "color: #FBFF26";
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
      for(let i = 0;i < props.data2original.data.length; i++) { 
        if (rows[k][0] == props.data2original.data[i][11] && props.data2original.data[i][12] == 0) {
            speed = parseInt(props.data2original.data[i][11]);
            let time = new Date(dates[0], dates[1], dates[2], parseInt(props.data2original.data[i][3]), parseInt(props.data2original.data[i][4]), parseInt(props.data2original.data[i][5]), 0);
            Handleddatatime.push([time, speed, color]);
            textlist.push([props.datapoint, props.title, props.data2original.data[i][9], time, speed]);
        }
      }
    }
    dates = getDatespeedlist(2);
    for (let k = 0; k < rows.length;k++) {
      let color = "#BA1DBD";
      let speedlimits = speedlimit(props.data1original.data[0][0]);
      if ( rows[k][0] < speedlimits[0]+1) {
        color = "color: #23DE36";
       }
       else if (rows[k][0] > speedlimits[0]-21 && rows[k][0] < speedlimits[0]+11) {
        color = "color: #FBFF26";
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
      for(let i = 0;i < props.data3original.data.length; i++) { 
        if (rows[k][0] == props.data3original.data[i][11] && props.data3original.data[i][12] == 0) {
            speed = parseInt(props.data3original.data[i][11]);
            let time = new Date(dates[0], dates[1], dates[2], parseInt(props.data3original.data[i][3]), parseInt(props.data3original.data[i][4]), parseInt(props.data3original.data[i][5]), 0);
            Handleddatatime.push([time, speed, color]);
            textlist.push([props.datapoint, props.title, props.data3original.data[i][9], time, speed]);
        }
      }
    }
    dates = getDatespeedlist(3);
    for (let k = 0; k < rows.length;k++) {
      let color = "#BA1DBD";
      let speedlimits = speedlimit(props.data1original.data[0][0]);
      if ( rows[k][0] < speedlimits[0]+1) {
        color = "color: #23DE36";
       }
       else if (rows[k][0] > speedlimits[0]-21 && rows[k][0] < speedlimits[0]+11) {
        color = "color: #FBFF26";
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
      for(let i = 0;i < props.data4original.data.length; i++) { 
        if (rows[k][0] == props.data4original.data[i][11] && props.data4original.data[i][12] == 0) {
            speed = parseInt(props.data4original.data[i][11]);
            let time = new Date(dates[0], dates[1], dates[2], parseInt(props.data4original.data[i][3]), parseInt(props.data4original.data[i][4]), parseInt(props.data4original.data[i][5]), 0);
            Handleddatatime.push([time, speed, color]);
            textlist.push([props.datapoint, props.title, props.data4original.data[i][9], time, speed]);
        }
      }
    }
    dates = getDatespeedlist(4);
    for (let k = 0; k < rows.length;k++) {
      let color = "#BA1DBD";
      let speedlimits = speedlimit(props.data1original.data[0][0]);
      if ( rows[k][0] < speedlimits[0]+1) {
        color = "color: #23DE36";
       }
       else if (rows[k][0] > speedlimits[0]-21 && rows[k][0] < speedlimits[0]+11) {
        color = "color: #FBFF26";
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
      for(let i = 0;i < props.data5original.data.length; i++) { 
        if (rows[k][0] == props.data5original.data[i][11] && props.data5original.data[i][12] == 0) {
            speed = parseInt(props.data5original.data[i][11]);
            let time = new Date(dates[0], dates[1], dates[2], parseInt(props.data5original.data[i][3]), parseInt(props.data5original.data[i][4]), parseInt(props.data5original.data[i][5]), 0);
            Handleddatatime.push([time, speed, color]);
            textlist.push([props.datapoint, props.title, props.data5original.data[i][9], time, speed]);
        }
      }
    }
    dates = getDatespeedlist(5);
    for (let k = 0; k < rows.length;k++) {
      let color = "#BA1DBD";
      let speedlimits = speedlimit(props.data1original.data[0][0]);
      if ( rows[k][0] < speedlimits[0]+1) {
        color = "color: #23DE36";
       }
       else if (rows[k][0] > speedlimits[0]-21 && rows[k][0] < speedlimits[0]+11) {
        color = "color: #FBFF26";
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
      for(let i = 0;i < props.data6original.data.length; i++) { 
        if (rows[k][0] == props.data6original.data[i][11] && props.data6original.data[i][12] == 0) {
            speed = parseInt(props.data6original.data[i][11]);
            let time = new Date(dates[0], dates[1], dates[2], parseInt(props.data6original.data[i][3]), parseInt(props.data6original.data[i][4]), parseInt(props.data6original.data[i][5]), 0);
            Handleddatatime.push([time, speed, color]);
            textlist.push([props.datapoint, props.title, props.data6original.data[i][9], time, speed]);
        }
      }
    }
    dates = getDatespeedlist(6);
    for (let k = 0; k < rows.length;k++) {
      let color = "#BA1DBD";
      let speedlimits = speedlimit(props.data1original.data[0][0]);
      if ( rows[k][0] < speedlimits[0]+1) {
        color = "color: #23DE36";
       }
       else if (rows[k][0] > speedlimits[0]-21 && rows[k][0] < speedlimits[0]+11) {
        color = "color: #FBFF26";
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
      for(let i = 0;i < props.data7original.data.length; i++) { 
        if (rows[k][0] == props.data7original.data[i][11] && props.data7original.data[i][12] == 0) {
            speed = parseInt(props.data7original.data[i][11]);
            let time = new Date(dates[0], dates[1], dates[2], parseInt(props.data7original.data[i][3]), parseInt(props.data7original.data[i][4]), parseInt(props.data7original.data[i][5]), 0);
            Handleddatatime.push([time, speed, color]);
            textlist.push([props.datapoint, props.title, props.data7original.data[i][9], time, speed]);
        }
      }
    }

  props.setdata(Handleddatatime);
  setSpeedlist(textlist);
}

    function callimg() {
      if (chartimg[0] == 0) {
        setshowdownload([false, true]);
      }
      else {
        setshowdownload([false, true]);
      }
    }

    //function to generate and download speeds text list
    function downloadspeed() {
      
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
        setselectmultiple(true);
        setselectText(["Valitse useita"]);
      }
      else {
        setselectmultiple(false);
        setselectText(["Valitse yksi nopeus"]);
      }
    }

    function multipleselect() {
      if (rows.length == 0) { // prevent break
        return;
      }
      if (day[0] == true) { //day 1 multiple speed select show
        changechartdataselect();
        setChartclick(true); 
        setrows([]);
        setshowdownload([true, false]);
      }
      if (day[1] == true) { //day 3 multiple speed select show
        changechartdataselectmulti();
        setChartclick(true); 
        setrows([]);
        setshowdownload([true, false]);
      }
      if (day[2] == true) { //day 7 multiple speed select show
        changechartdataselectmulti7();
        setChartclick(true); 
        setrows([]);
        setshowdownload([true, false]);
      }
    }

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
  
          if (chartclick == true) { //check if chart already clicked and return to speed amount view
            props.setdata(props.original);
            setChartclick(false);
            setshowdownload([false, false]);
            return
          }

          let select = chartWrapper.getChart().getSelection(); //get chart selection info

          if(select.length > 0) { //legend select
            if (select[0].row == null) {
              setshowdownload([false, false]);
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
            }
            else if (day[1] == true) { //speed selected from day 3
              changechartdatamulti(row);
              setshowdownload([true, false]);
            }
            else if (day[2] == true) { //speed selected from day 7
              changechartdatamulti7(row);
              setshowdownload([true, false]);
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
            else if (selectedRows.length > 5 && day[0] == true) {
            }
            else if (selectedRows.length > 3 && day[1] == true) {
            }
            else if (selectedRows.length > 2 && day[2] == true) {
            }
            else {
              let check = 0;
              for(let i = 0;i < selectedRows.length;i++) { //remove selected row from selections
                if (selectedRows[i][0] == row) {
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

            if(defaultday == true) { 
              getData(); //get Lam id data
            }
            if (showdownload[0] == true) { //show download ckeck
              setChartimg([chartWrapper.getChart().getImageURI()]); //set chart image into download button
              callimg();
            }
          }
        }
      }
    ];

    return (
        <div
            style={{
                visibility: show ? "visible" : "hidden", //boolean toggle for visible state
                opacity: show ? "1" : "0" //boolean toggle for opacity
            }}
            className="Overlay" //set class for div as Overlay
        >
            <div className="Popup" //set class for div as Popup
            > 
                <div className="Popup-header">
                    <h1>{props.title} | Lam id:{props.datapoint}</h1>
                    <span className="Close" onClick={closeHandler}>
                        <h1>X</h1>
                    </span>
                </div>
                <div className="Popup-middle">
                    <div className={`Popup-button ${active[0] == true && "active"}`} onClick={() => DataHandle1(props.data1original)}><h2>1 Päivä</h2></div>
                    <div className={`Popup-button ${active[1] == true && "active"}`} onClick={() => compileData(props.data1original, props.data2original, props.data3original)}><h2>3 Päivää</h2></div>
                    <div className={`Popup-button ${active[2] == true && "active"}`} onClick={() => compileData2(props.data1original, props.data2original, props.data3original, props.data4original, props.data5original, props.data6original, props.data7original)}><h2>7 Päivää</h2></div>
                </div>

                <div className="Popup-main" //Main area for chart
                >

                  <div className="Popup-multiple">
                    <div className={`Popup-multiple-select ${selectmultiple == true && "active"}`} onClick={() => togglemultipleselect() & setrows([])& props.setdata(props.original)& setshowdownload([false, false]) & setChartclick(false)}><h2>{selectText[0]}</h2></div>
                    <div className="Popup-multiple-select" style={{ visibility: selectmultiple ? "visible" : "hidden" }} onClick={() => multipleselect()}><h2>Näytä valinnat</h2></div>
                    <div className="Popup-multiple-select" style={{ visibility: selectmultiple ? "visible" : "hidden" }} onClick={() => setrows([]) & props.setdata(props.original) & setshowdownload([false, false]) & setChartclick(false)}><h2>Tyhjennä valinnat</h2></div>
                    <div className="Popup-download"
                      onClick={() => downloadspeed() & setshowdownload([false, false])}
                      style={{
                        visibility: showdownload[1] ? "visible" : "hidden" //boolean toggle for visible state
                      }}>
                    <h2 /* <a href={chartimg[0]} download onClick={() => setshowdownload([false, false])} className="donwload">Lataa kuva</a></h2> */>Lataa nopeus lista</h2>
                    </div>
                  </div>
            <div className="Popup-middle">
              <div className="Popup-speed"><h2>Suunta 1 nopeusrajoitus {Speedlimit[0]}</h2></div>
              <div className="Popup-speed"><h2>Suunta 2 nopeusrajoitus {Speedlimit[1]}</h2></div>
            </div>

            <Chart chartType="ColumnChart" width="100%" height="86%" data={props.data} chartEvents={chartEvents} options={{
            backgroundColor: "#5C80D9",
            chartArea: {
              backgroundColor: "#FFFFFF"
            },
            isStacked: true,
            hAxis: {
              //title: "Nopeudet",
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
              }
            },
            vAxis: {
              //title: "Autot",
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
              logScale: "true"
            },
            bar: {
              groupWidth: "100%"
            },
            
          }} />

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