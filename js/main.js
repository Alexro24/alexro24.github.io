// JavaScript Document
   var map;
    var markers = [];
    var windows = [];

 $(function mainMap () {
	 
	 map = new google.maps.Map($('#map')[0], {
    center: {lat: -31.6428858, lng: -60.6898023},
    zoom: 14,
	styles: mapStyle,
    gestureHandling: 'cooperative',
          mapTypeControl: false,
          mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.TOP_CENTER
          },
          zoomControl: true,
          zoomControlOptions: {
          position: google.maps.ControlPosition.BOTTOM_CENTER,
          },

          scaleControl: false,
          streetViewControl: false,
          streetViewControlOptions: {
          position: google.maps.ControlPosition.LEFT_TOP
          },
          fullscreenControl: false
    });
   map.addListener('click', function(event) {

          if (markers.length >= 1) {
              deleteMarkers();
          }
 
          addMarker(event.latLng);  
          document.getElementById('lat').value = event.latLng.lat();
          document.getElementById('long').value =  event.latLng.lng();
        }
);
     document.getElementById("btnConfirm").innerHTML = '¿Confirmas la ubicación?';
     map.addListener('click', function() {
           infoMap(geocoder, map, window);
     });  
        var geocoder = new google.maps.Geocoder;
        var window = new google.maps.InfoWindow;
        document.getElementById('submit').addEventListener('click', function() {
        geocodeLatLng(geocoder, map, window);
     });   

   }
);



////// Markers //////////  
      // Adds a marker to the map and push to the array.
      function addMarker(location) {
		var iconBase = 'https://png.icons8.com/office/50/000000/';
        var marker = new google.maps.Marker({
          position: location,
		  icon: iconBase + 'place-marker.png',
          map: map
			
        });   
        var window = new google.maps.InfoWindow({
          map: map
        });
        markers.push(marker);
        windows.push(window);
      }
      // Sets the map on all markers in the array.
      function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }    
       function setWinOnAll(map) {
        for (var i = 0; i < windows.length; i++) {
          windows[i].setMap(map);
        }
      }
      // Removes the markers from the map, but keeps them in the array.
      function clearMarkers() {
        setMapOnAll(null);
        setWinOnAll(null);
      }

      // Deletes all markers in the array by removing references to them.
      function deleteMarkers() {
        clearMarkers();
        markers = [];
        windows = [];
      }
////// Markers //////////   