// JavaScript Document
////// Geolocation //////////
          function geoLoc() {
		setMapOnAll(null);
        setWinOnAll(null);
			  
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {     
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

          document.getElementById('lat').value = position.coords.latitude;
          document.getElementById('long').value =  position.coords.longitude;
 
			  
	var iconBase = 'https://png.icons8.com/office/50/000000/';
    var marker = new google.maps.Marker({
    position: pos,
	icon: iconBase + 'street-view.png',
}); markers.push(marker); windows.push(window);
              
            map.setCenter(pos);
            map.setZoom(19);
            marker.setMap(map); 
			marker.addEventListener('load',infoMap(geocoder, map, window)); 
			  

        }, function() {
            handleLocationError(true, map.getCenter());  
          });  
        } else {
          handleLocationError(false, map.getCenter());
        }
        
		document.getElementById("btnConfirm").innerHTML = '¿Estas acá?';
         var geocoder = new google.maps.Geocoder;
         var window = new google.maps.InfoWindow;
        document.getElementById('submit').addEventListener('click', function() {
        geocodeLatLng(geocoder, map, infowindow);
     });  
	  
   
}

 

     function handleLocationError(browserHasGeolocation, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }
////// Geolocation //////////