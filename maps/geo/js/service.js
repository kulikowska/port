if (typeof APP == 'undefined') var APP = angular.module('WS',[]);

APP
.factory('GEO', [function() {
    var map;
    var geocoder; 
    return {
        map: map,
        Zinit: function(domEl) {
            navigator.geolocation.getCurrentPosition( function(pos) {
                var coords = {};
                coords.lat = pos.coords.latitude;
                coords.lon = pos.coords.longitude;

                var latlng = new google.maps.LatLng(coords.lat,coords.lon);
                var opts = { zoom: 14, center: latlng };
                geocoder    = new google.maps.Geocoder();
                map         = new google.maps.Map(domEl, opts);
            });
        },
        init: function(domEl) {
            var bingK   = "AgAuqEizNCG46goQiquz3ERCSuMYj8hr1udAEXpb1-kix08_29KzSOGQCkyL_eJc";
            //map = new OpenLayers.Map('map', {
            geocoder    = new google.maps.Geocoder();
            map = new OpenLayers.Map('content', {
                //projection: 'EPSG:3857',
                projection: 'EPSG:900993',
                layers: [
                    //new OpenLayers.Layer.WMS("Open Street", "http://maps.opengeo.org/geowebcache/service/wms", { layers : "openstreetmap", format : "image/png" }),
                    new OpenLayers.Layer.Google( "Google Streets", {numZoomLevels: 22}
                    ),
                    new OpenLayers.Layer.Google( "Google Physical",
                        {type: google.maps.MapTypeId.TERRAIN}
                    ),
                    new OpenLayers.Layer.Google( "Google Hybrid",
                        {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20}
                    ),
                    new OpenLayers.Layer.Google( "Google Satellite",
                        {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
                    ),
                    new OpenLayers.Layer.Bing({ name: "Bing Road", key: bingK, type: "Road" }),
                    new OpenLayers.Layer.Bing({ name: "Bing Hybrid",
                        key: bingK,
                        type: "AerialWithLabels"
                    }),
                    new OpenLayers.Layer.Bing({ name: "Bing Aerial", key: bingK, type: "Aerial" })
                ],
                center: new OpenLayers.LonLat(10.2, 48.9).transform('EPSG:4326', 'EPSG:3857'),
                numZoomLevels:21,
                zoom:16,
                controls: [
                    new OpenLayers.Control.Navigation(),
                    new OpenLayers.Control.PanZoomBar(),
                    new OpenLayers.Control.LayerSwitcher({'ascending':true}),
                    //new OpenLayers.Control.Permalink(),
                    new OpenLayers.Control.ScaleLine(),
                    //new OpenLayers.Control.Permalink('permalink'),
                    //new OpenLayers.Control.MousePosition(),
                    //new OpenLayers.Control.OverviewMap(),
                    //new OpenLayers.Control.KeyboardDefaults()
                ]
            });

            var elevator = new google.maps.ElevationService();
            console.log( elevator, ' elevator ');
        },
        locAddress: function(addr, cb) {
            console.log( map.getNumZoomLevels(), 'num zoom levs' );
            geocoder.geocode( { 'address': addr}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var loc = results[0].geometry.location;
                    var ll = new OpenLayers.LonLat(loc.B, loc.k).transform('EPSG:4326', 'EPSG:3857');
                    map.setCenter(ll,22);

                    //new google.maps.Marker({ map: map, position: loc });
                    cb({'lat': loc.k, 'lon': loc.B});
                } else { cb(false); }
            });
        }
    }
}])
.factory('UT', [function() {
    return {
        plunk: function(inA, idx) {
            var retA = [];
            for (var i=0; i<inA.length; i++) {
                if (i != idx) retA.push(inA[i]);
            }
            return retA;
        },
        plunkVal: function(inA, val) {
            var retA = [];
            for (var i=0; i<inA.length; i++) {
                if (inA[i] != val) retA.push(inA[i]);
            }
            return retA;
        },
        inRange: function(vals, key, range) {
            for (var i=0; i<vals.length; i++)
                if (vals[i][key] < range[0] || vals[i][key] > range[1]) return false;

            return true;
        },
        arEmpty: function(ar) {
            for (var i=0; i<ar.length; i++) if (ar[i]) return false;
            return true;
        },
        camelize: function (str) {
            return (str + "").replace(/-\D/g, function(match) {
              return match.charAt(1).toUpperCase();
            });
        }
    };
}])
;
