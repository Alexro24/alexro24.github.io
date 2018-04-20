
// JavaScript Document

////// Set map //////////	      

 function initAutocomplete() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -31.6428858, lng: -60.6898023},
    zoom: 14,
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
     
     map.addListener('click', function() {
           infoMap(geocoder, map, window);
		 
     });  
	 
        
        var geocoder = new google.maps.Geocoder;
        var window = new google.maps.InfoWindow;

        document.getElementById('submit').addEventListener('click', function() {
        geocodeLatLng(geocoder, map, window);
     });  
	 
       
	 
	
     
///////////////////// Search Box ///////////////////////////////////////////////////
  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var options = {
	  
   types: ['(regions)'],
   bounds:[ -31.6428858, -60.6898023],  
   location_type:"APPROXIMATE",
   componentRestrictions: {country: 'AR', postalCode: '3000'}
};
  var searchBox = new google.maps.places.SearchBox(input, options);
 // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);////

	
  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });
 
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    document.getElementById("btnConfirm").innerHTML = '¿Confirmas la ubicación?';
    if (places.length == 0) {
      return;
    }
    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();

    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
        
		var iconBase = 'https://png.icons8.com/office/50/000000/';
      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
         icon: iconBase + 'place-marker.png',
        title: place.name,
        position: place.geometry.location
      }));
        
          var p = document.getElementById('posit');
          p.value = place.geometry.location;
          var posi = document.getElementById('posit').value;
          var latlngSearch0 = posi.split('(', 2);
          var latS = parseFloat(latlngSearch0[1]);
          var latlngSearch = posi.split(',', 2);
          var lngS = parseFloat(latlngSearch[1]);
          
          document.getElementById('lat').value = latS;
          document.getElementById('long').value = lngS;

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    }); 
    map.fitBounds(bounds);  
   infoMap(geocoder, map, window);
  });  
         
}