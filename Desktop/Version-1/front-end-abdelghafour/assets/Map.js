const Map = `
<!DOCTYPE html>
<html>

<head>
  <title>Quick Start - Leaflet</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="initial-scale=1.0" />

  <link rel="shortcut icon" type="image/x-icon" href="docs/images/favicon.ico" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
    integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
    crossorigin="" />
  <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
    integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
    crossorigin=""></script>



</head>

<body style="padding: 0; margin: 0">

<div id="mapid" style="width: 100%; height: 100vh"></div>

 
<script>





  document.addEventListener("message", message => {
   
    
    // alert(JSON.parse(message.data)) 
    // alert(message.data)
    // alert(typeof(JSON.parse(message.data))) 
    //  alert(path)
    let path=JSON.parse(message.data)
   

    polyline = L.polyline(

      path,
 
      { color: "#66a5d1" }
   )
     .addTo(mymap);
 
 
  });




// L.marker([latUser, longUser], {
//     icon: L.icon({
//       iconUrl:
//         "https://cdn3.iconfinder.com/data/icons/man-in-a-glyph-style/1600/man-male-11-512.png",
//       iconSize: [38, 40], 
//       shadowSize: [50, 64], 
//       iconAnchor: [20, 30],
//       shadowAnchor: [4, 62], 
//       popupAnchor: [-3, -76], 
//     }),
//   }).addTo(mymap);











// var popup = L.popup();
// var initIndex = 0;
// let path = [];
// let polyline = [];
// let marker = [];
// let location;
// let cordinates = [];
// let number = 4;
// var current_num = null;


//showing bus way
// function getPath(num) {
//   var path;
//   busLines().then((res) => {
//     res.forEach((element) => {
//       if (element.number == num) {
//         path = element.path;
//       }
//     });
//     drawWay(path);
//   });
// }


// function setPath(e) {

//   e.preventDefault();

//   if (e.keyCode == 90 && e.ctrlKey) {


//     busPath.forEach((element, index) => {
//       if (element.number == current_num) {
//         element.path.pop()
//       }
//     })


//   };
//   getPath(current_num)
// }

// document.onkeydown = setPath;



// function drawWay(path, num) {

//   mymap.removeLayer(polyline)

//   polyline = L.polyline(

//     path,

//     {
//       color: 'red',
//       weight: 3,
//       opacity: 0.5,
//       smoothFactor: 1,
//     }
//   )
//     .addTo(mymap);

//   mymap.fitBounds(polyline.getBounds());


// }


//  adding markers
// busStops().then((res) => {
//   res.forEach((stop) => {
//     L.marker(stop.cordinates, {
//       icon: L.icon({
//         iconUrl: stop.icon,
//         // shadowUrl: 'https://cdn-icons-png.flaticon.com/512/64/64283.png',
//         iconSize: [30, 30], // size of the icon
//         shadowSize: [50, 64], // size of the shadow
//         iconAnchor: [20, 30], // point of the icon which will correspond to marker's location
//         shadowAnchor: [4, 62], // the same for the shadow
//         popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
//       }),
//     })
//       .addTo(mymap)
//       .on("click", () => getPath(stop.number));
//   });
// });








// function onMapClick(e) {


//   popup.setLatLng(e.latlng)

//   cordinates = [e.latlng.lat, e.latlng.lng]

//   busLines().then((res) => {
//     res.forEach((element) => {
//       if (element.number == num) {
//         element.path.push(cordinates)
//       }
//     });
//     drawWay(path);
//   });
//   getPath(current_num)

// }
// mymap.on('click', onMapClick);





// 

</script>




</body>
</html>


`

export default Map;