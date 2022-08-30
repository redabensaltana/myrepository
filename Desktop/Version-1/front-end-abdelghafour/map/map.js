import { baseUrl } from "../config";
const map = `
<!DOCTYPE html>
<html>
  <head>
    <title>Quick Start - Leaflet</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0"  />
    <link
      rel="shortcut icon"
      type="image/x-icon"
      href="docs/images/favicon.ico"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
      integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
      crossorigin=""
    />
    <script
      src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
      integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
      crossorigin=""
    ></script>
    <script
      src="https://cdn.socket.io/4.5.0/socket.io.min.js"
      integrity="sha384-7EyYLQZgWBi67fBtVxw60/OWl1kjsfrPFcaU0pp0nAh+i8FD068QogUvg85Ewy1k"
      crossorigin="anonymous"
    ></script>
    <!-- <script type="module" src="../api/busMap.js"></script> -->
  </head>
  <body style="padding: 0; margin: 0">
    <div id="mapid" style="width: 100%; height: 100vh;  border-radius: 50px 50px 0 0;"></div>
    <script type="module">
      import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
 
          const socket = io('${baseUrl}');
          socket.on("connect", () => {
              // alert('im connected')
            });
          socket.on("getBusLinePath", (arg) => {
            
            drawWay(arg);
          });
      // import { busStops, busLines, getBusStopDetails, clearMap } from "../api/busMap.js";
      
      
      </script>
        </body>
  </html>
  
`;
export default map;