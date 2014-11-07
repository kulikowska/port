if (typeof APP == 'undefined') var APP = angular.module('WS',[]);

APP
.factory('GEO', [function() {
    var map;
    var geocoder; 
    function lonLat(lon, lat, trans) {
        return trans 
            ? new OpenLayers.LonLat(lon, lat).transform('EPSG:4326', 'EPSG:3857')
            : new OpenLayers.LonLat(lon, lat);
    }
    return {
        map: map,
        init: function(domEl) {
            var bingK   = "AgAuqEizNCG46goQiquz3ERCSuMYj8hr1udAEXpb1-kix08_29KzSOGQCkyL_eJc";
            geocoder    = new google.maps.Geocoder();
            map = new OpenLayers.Map('content', {
                layers: [
                    //new OpenLayers.Layer.WMS("Open Street", "http://maps.opengeo.org/geowebcache/service/wms", { layers : "openstreetmap", format : "image/png" }),
                    new OpenLayers.Layer.Google( "Google Streets", {numZoomLevels: 22}
                    ),
                    new OpenLayers.Layer.Google( "Google Physical",
                        {type: google.maps.MapTypeId.TERRAIN, numZoomLevels:18}
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
                //center: new OpenLayers.LonLat(21.018267, 52.235850).transform('EPSG:4326', 'EPSG:3857'),
                center: lonLat(21.018267, 52.235850, true),
                zoom:14,
                controls: [
                    new OpenLayers.Control.Navigation(),
                    new OpenLayers.Control.PanZoomBar(),
                    new OpenLayers.Control.LayerSwitcher({'ascending':true}),
                    new OpenLayers.Control.ScaleLine(),
                ]
            });

            var elevator = new google.maps.ElevationService();
            console.log( elevator, ' elevator ');
        },
        locAddress: function(addr, cb) {
            geocoder.geocode( { 'address': addr}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var loc = results[0].geometry.location;
                    map.setCenter(lonLat(loc.B, loc.k, true), 22);

                    //new google.maps.Marker({ map: map, position: loc });
                    cb({'lat': loc.k, 'lon': loc.B});
                } else { cb(false); }
            });
        }
    }
}])
.factory('OL', [function() {
    return {
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
