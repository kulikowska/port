

//var geocoder;
//var map;
function Zinitialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(coords.lat,coords.lon);
  var mapOptions = { zoom: 14, center: latlng };
  map = new google.maps.Map(document.getElementById('content'), mapOptions);
}
