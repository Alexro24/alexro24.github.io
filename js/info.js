// JavaScript Document


function getGeotext() {

var x = document.getElementById("btnConfirm").innerHTML;
document.getElementById("confirm").innerHTML = x;

}
     
////// info window //////////    
function infoMap (geocoder, map, window) { 

	
var x = document.getElementById('lat').value;
var y = document.getElementById('long').value;
  var input = x + ',' + y;
  var latlngStr = input.split(',', 2);
  var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])}; 
  var geocoder = new google.maps.Geocoder;

geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[1]) {

		  // Add a Snazzy Info Window to the marker
    var window = new SnazzyInfoWindow({
        position: latlng,
        center: {lat: x, lng: y},
         map: map,
        placement: 'top',
        offset: {
            bottom: '25px'
        },
        content: '<div class="window-box"><h1>' + results[0].address_components[1].short_name + '</h1><p>&nbsp;</p><h1>' + results[0].address_components[0].long_name + '</h1><br><h2>' + results[0].address_components[2].long_name + '</h2><br><button id="confirm"></button></div>',
        showCloseButton: true,
        closeOnMapClick: false,
        padding: '50px',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        border: false,
		maxWidth: 450,
        maxHeight: 600,
        borderRadius: '7px',
        shadow: true,
        fontColor: '#000',
        fontSize: '17px',
        callbacks: {
			afterOpen: function(){ getGeotext(); },
            beforeClose: function(){ setMapOnAll(null); setWinOnAll(null);}
			
        }
    });
		  
		  
          
     window.open(map); windows.push(window);  
  } 
    } 	 		 
  }); 
   
} 	  





	    function getDog() {
		  document.getElementById("submit").style.display = "block";
		 document.getElementById("erase").style.display = "block";
		  var d = document.getElementById('dog').innerHTML;
		  var s = document.getElementById('selected');
          s.innerHTML = d;
      }
		 
		  function getCat() {
		  document.getElementById("submit").style.display = "block";
		  document.getElementById("erase").style.display = "block";
		  var c = document.getElementById('cat').innerHTML;
		  var s = document.getElementById('selected');
		  s.innerHTML = c;
      }
////// info window //////////  
	 









////// Parse Info //////////  
function geocodeLatLng(geocoder, map, window) {  
	
document.getElementById("submit").style.display = "none";
document.getElementById("erase").style.display = "none";
document.getElementById("geo").style.display = "none";
setMapOnAll(null);
setWinOnAll(null);
		var iconBase = 'https://png.icons8.com/flat_round/50/000000/';
	    var ico = document.getElementById('selected').innerHTML;
	    var icon = ico + '.png';
        var icons = {
          cat: {
            icon: iconBase + 'cat.png'
          },
          dog: {
            icon: iconBase + 'dog.png'
          },
        }; 	
var x = document.getElementById('lat').value;
var y = document.getElementById('long').value;
  var input = x + ',' + y;
  var latlngStr = input.split(',', 2);
  var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
  var geocoder = new google.maps.Geocoder;
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[1]) {
        map.setZoom(17);
        var marker = new google.maps.Marker({
          position: latlng,
		  icon: iconBase + icon,
         center: {lat: x, lng: y},
          map: map
        });
        markers.push(marker);

    // Click Marker to zoom in
    marker.addListener('click', function() {
    map.setZoom(19);
    map.setCenter(marker.getPosition());
  });
          
        // Center Marker 
        map.setCenter(marker.getPosition());
        //window.setContent(results[0].formatted_address);
        //window.open(map, marker);
          
        // Get Info to Dom
		 document.getElementById("info").style.display = "block";
        var x = document.getElementById("info");
        var a = x.getElementsByClassName('street');
        a[0].innerHTML = (results[0].address_components[1].short_name); 
          
        var b = x.getElementsByClassName('number');
        b[0].innerHTML = (results[0].address_components[0].long_name); 
          
        var c = x.getElementsByClassName('city');
        c[0].innerHTML = (results[0].address_components[2].long_name);       
      } 
      else {
      window.alert('No se encontraron resultados válidos');
      }
    } else {
      window.alert('Falló el Geolocalizador: ' + status);
    }
  });
}
////// Parse Info //////////     
     
 




		  
         //var window = new google.maps.InfoWindow({
          //////position: latlng,
          //center: {lat: x, lng: y},
          //map: map
        //});
		  
		
         //window.setContent('<div class="window-box"><strong>' + results[0].address_components[1].short_name + '</strong><br>' +
                ////'<strong>' + results[0].address_components[0].long_name + '</strong><br>' +
                //results[0].address_components[2].long_name + '<br><button id="dog" onClick="getDog()">Perro</button>' + //'<button id="dog" onClick="getCat()">Gato</button></div>'); 
       // window.open(map); windows.push(window);