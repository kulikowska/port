function LG(arg) { console.log(arguments); }
if (typeof APP == 'undefined') var APP = angular.module('WS',[]);

APP
.factory('GEO', ['DATA', 'OLCtrl', 'OLC', function(DATA, OLCtrl, OLC) {
    var zoom=8;
    var zIndex = 10;
    var map;
    var devActive = false;
    var devMarkers = {};
    var chanContours = {};
    var devUrl = [ '', DATA.url + 'image/markgreen.png', DATA.url + 'image/markred.png'];
    var geocoder; 
    var _this = this;

    function lonLat(lon, lat, trans) {
        return trans 
            ? new OpenLayers.LonLat(lon, lat).transform('EPSG:4326', 'EPSG:3857')
            : new OpenLayers.LonLat(lon, lat);
    }

    var contours = ['contL', 'contM', 'contS'];
    function getRange(pwr, byPwr) {
        var l = byPwr 
            ? pwr >= -7 ? 'L' : (pwr < -13  ? 'S' : 'M')
            : pwr ? (pwr > 1 ? 'S' : 'M') : 'L';
        return 'cont' + l;
    };

    function toTop(layers) {
        typeof layers == 'string' && (layers = [layers]);

        for (var i=0; i<layers.length; i++) {
            map.setLayerIndex(_this[layers[i]], zIndex++);
            _this[layers[i]].setVisibility(true);
            _this[layers[i]].redraw();
        }
    }

    function clearDevMarkers() {
        _this.deviceL.clearMarkers();
        for (var i in devMarkers) {
            devMarkers[i].destroy();
            delete(devMarkers[i]);
        }
        devMarkers = {};
    }

    return {
        map: map,
        init: function(domEl) {
            var bingK   = "AgAuqEizNCG46goQiquz3ERCSuMYj8hr1udAEXpb1-kix08_29KzSOGQCkyL_eJc";
            geocoder    = new google.maps.Geocoder();
            map = new OpenLayers.Map('content', {
                layers: [
                    //new OpenLayers.Layer.WMS("Open Street", "http://maps.opengeo.org/geowebcache/service/wms", { layers : "openstreetmap", format : "image/png" }),
                    new OpenLayers.Layer.Google( "Google Streets", {numZoomLevels: 22}),
                    new OpenLayers.Layer.Google( "Google Physical",
                        {type: google.maps.MapTypeId.TERRAIN, numZoomLevels:18}),
                    new OpenLayers.Layer.Google( "Google Hybrid",
                        {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20}),
                    new OpenLayers.Layer.Google( "Google Satellite",
                        {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}),
                    new OpenLayers.Layer.Bing({ name: "Bing Road", key: bingK, type: "Road" }),
                    new OpenLayers.Layer.Bing({ name: "Bing Hybrid", key: bingK,
                        type: "AerialWithLabels"
                    }),
                    new OpenLayers.Layer.Bing({ name: "Bing Aerial", key: bingK, type: "Aerial" })
                ],
                //center: lonLat(21.018267, 52.235850, true), //Warszawa
                //center: lonLat(18.55123, 54.49001, true), //Gdynia
                center: lonLat(58.043, 23.523, true), //Oman 
                zoom:zoom,
                controls: [
                    new OpenLayers.Control.Navigation(),
                    new OpenLayers.Control.PanZoomBar(),
                    new OpenLayers.Control.LayerSwitcher({'ascending':true}),
                    new OpenLayers.Control.ScaleLine(),
                ]
            });
            OLCtrl.setMap(map);
            OLCtrl.init(['box', 'point', 'center', 'elevation']);
            map.addLayers([
                _this.centerL=OLC.Markers('centerL'),
                _this.deviceL=OLC.Markers('deviceL'),
                _this.contL = OLC.Contours('contL'),
                _this.contM = OLC.Contours('contM'),
                _this.contS = OLC.Contours('contS')
            ]);
        },
        initDevs: function() {
            var data = DATA.devIdx();
            clearDevMarkers();
            for (var i in data) {
                if (typeof devMarkers[data[i]._ID[2]] == 'undefined')
                    devMarkers[data[i]._ID[2]] =
                        _this.deviceL.add( 'markGreen', 
                            [{lon: data[i]._ID[0], lat:data[i]._ID[1], attrs: data[i]._ID[2]}], 
                            function(attrs) { LG( 'cb from create marker', attrs ); }, 'hidden'
                        );
            }
        },
        initChans: function() {
            var d = DATA.devChans();
            var loc;
            for (var id  in d) { 
                loc = d[id];
                chanContours[id] = [];
                for (var i=0; i<loc.length; i++) {
                    var L = getRange(loc[i].Pwr, true);
                    chanContours[id].push(
                        _this[L].add([loc[i].loc], L, function() {})
                   );
                 }
            }
        },
        deviceVis: function(id, vis, active, doCenter) {
            devMarkers[id].display(vis != 0);
            typeof active != 'undefined' && active && devMarkers[active].setUrl(devUrl[1]);
            if (vis) {
                devMarkers[id].setUrl(devUrl[vis]);
                typeof doCenter != 'undefined' && doCenter && map.setCenter(devMarkers[id].lonlat);
            }
            map.setLayerIndex(_this.deviceL, zIndex++);
        },
        chanVis: function(id, loc, vis) {
            for (var i in chanContours[id])
                chanContours[id][i][0].style.display = 
                chanContours[id][i][1].style.display = vis ? 'block' : 'none';;
            toTop(contours);
        },
        showChan: function(showIt) {
            for (var i=0; i<contours.length; i++ )
                _this[contours[i]].setVisibility(showIt);
            toTop(contours);
        },
        showDev: function(showIt) {
            for (var i=0 in devMarkers) devMarkers[i].display(showIt);
            toTop('deviceL');
        },
        chanToFront: function() { toTop(contours); },
        devToFront: function()  { toTop('deviceL'); },
        range: function(idx, vis) {
            var L = getRange(idx);
            _this[ L].setVisibility(vis);
            vis && map.setLayerIndex(_this[L], zIndex++);
        },
        locAddress: function(addr, cb) {
            geocoder.geocode( { 'address': addr}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var loc = results[0].geometry.location;
                    map.setCenter(lonLat(loc.B, loc.k, true), 22);
                    cb({'lat': loc.k, 'lon': loc.B});
                } else { cb(false); }
            });
        }
    }
}])
.factory('OLStyle', [function() {
    var STYLES = {};

    var Host =  'http://' + document.location.host + '/';
    var imgPath = Host + 'image/';
    var markerWidth24 = 16;
    var markerWidth36 = 24;

    var def = function(styleId, base, params)    { 
        if (typeof STYLES[styleId] == 'undefined') {
            STYLES[styleId] = angular.extend({}, OpenLayers.Feature.Vector.style['default']);
            if (base) for (var i in STYLES[base]) STYLES[styleId][i] = STYLES[base][i];
            for (var i in params) STYLES[styleId][i] = params[i];
        }
    };

    def('base', '',  {graphicOpacity: 1, 'strokeWidth' : 1});
    def('pin','', { graphicHeight: 24, graphicYOffset: -24, graphicWidth: 12, graphicXOffset: -6, 
                    externalGraphic: imgPath + 'pin.png', fillOpacity: 1} );
    def('contL', 'pin', { 'strokeColor': '#000088', 'fillColor' : '#0044FF', 
                                    'fillOpacity': 0.2, 'strokeWidth' : 0.5});
    def('contM', 'contL', {'strokeColor': '#004400', 'fillColor' : '#00AA22'});
    def('contS', 'contL', {'strokeColor': '#440000', 'fillColor' : '#FF2200'});

    def('center','', {  graphicHeight: 32, graphicYOffset: -32, graphicWidth:  32, graphicXOffset: -16,
                        externalGraphic :   imgPath + 'target.png', fillOpacity:1} );

    def('marker', 'pin', { externalGraphic : imgPath + 'marker.png'});




    return {
        get: function(styleId) { return angular.extend({},STYLES[styleId]); }
    };
}])
.factory('OLCtrl', [function() {
    var _this = this;
    var cbk = null;
    var ml = new OpenLayers.Layer.Vector("Selects");

    var actions = { // callbacks
        box: function(b) {
            typeof b.bottom == 'undefined' ||
                _this.cbk( 
                    _this.map.getLonLatFromPixel( 
                        new OpenLayers.Pixel(b.left, b.bottom)).transform('EPSG:3857', 'EPSG:4326'),
                    _this.map.getLonLatFromPixel( 
                        new OpenLayers.Pixel(b.right, b.top)).transform('EPSG:3857', 'EPSG:4326')
                );
        },
        point: function(a) { _this.cbk(a); },
        center: function(a) {
            //_this.map.zoomIn();

            _this.map.setCenter(new OpenLayers.LonLat(a.x, a.y));
            var pt  = new OpenLayers.LonLat(a.x, a.y);
            pt.transform('EPSG:3857', 'EPSG:4326');

            _this.map.getLayersByName('centerL')[0].add( 'marker', 
                [{lon: pt.lon, lat: pt.lat, attrs: { id: 0}}], 
                function (attrs) { console.log(attrs); }
            );
            setTimeout(function() { _this.map.getLayersByName('centerL')[0].clearMarkers(); }, 500);
            _this.cbk(pt);
        },
        elevation: function(a) {
            _this.cbk(a);
        }
    };

    var ctrls = {
        box : new OpenLayers.Control.DrawFeature(
            ml, OpenLayers.Handler.Box, {callbacks: { done: actions.box }}
        ),
        center : new OpenLayers.Control.DrawFeature(
            ml, OpenLayers.Handler.Point, { callbacks: { done: actions.center }}
        ),
        point:  new OpenLayers.Control.DrawFeature(
            ml, OpenLayers.Handler.Point, { callbacks: { done: function(a) {
                a.transform('EPSG:3857', 'EPSG:4326');
                actions.point((new OpenLayers.LonLat(a.x, a.y)), 0);
        }}}),
        elevation:  new OpenLayers.Control.DrawFeature(
            ml, OpenLayers.Handler.Point, { callbacks: { done: function(a) {
                a.transform('EPSG:3857', 'EPSG:4326');
                (new google.maps.ElevationService()).getElevationForLocations(
                    { locations: [new google.maps.LatLng(a.y, a.x)] },
                    function(v) {
                        _this.cbk((new OpenLayers.LonLat(v[0].location.B, v[0].location.k)), v[0].elevation);
                    }
                );
        }}})
    };
    setTimeout( function() { _this.map.addLayer(ml); }, 500);

    return {
        map: null,
        init: function(ctrlName) {
            setTimeout( function() { 
                if (typeof ctrlName == 'string') _this.map.addControl(ctrls[ctrlName]); 
                else 
                    for (var i=0; i<ctrlName.length; i++) _this.map.addControl(ctrls[ctrlName[i]]);

            }, 0);
        },
        activate: function(ctrlName, cb) {
            _this.cbk = cb; 
            ctrls[ctrlName].activate();
            ml.setVisibility(true);
        },
        deactivate: function(ctrlName) {
            if (ctrlName) {
                ctrls[ctrlName].deactivate();
                ml.setVisibility(false);
            }
        },
        setMap: function( map ) { _this.map = map; }
    }
}])
.factory('OLC', ['OLStyle', function(OLStyle) { //OLCHERE
    var Point   = function(lo, la) { return new OpenLayers.Geometry.Point(lo, la).transform('EPSG:4326', 'EPSG:3857'); };
    var LonLat  = function(lo, la) { return new OpenLayers.LonLat(lo, la).transform('EPSG:4326', 'EPSG:3857'); };

    var imgPath =  'http://' + document.location.host + '/image/';

    var marker = function(icon, loc, cb, hideIt) {
        typeof loc == 'undefined' && (loc = {lon:0, lat:0});
        var size    = new OpenLayers.Size(15,25);
        var offset  = new OpenLayers.Pixel(-(size.w/2), -size.h);
        var icon    = new OpenLayers.Icon(imgPath + icon + '.png', size, offset);
        var m  = new OpenLayers.Marker(LonLat(loc.lon, loc.lat), icon);
        m.attrs = loc.attrs;
        m.events.register('click', m, cb);
        m.display(typeof hideIt == 'undefined' || !hideIt);
        return  m;
    };

    var circ = function(origin, radius) {
        typeof radius == 'undefined' && (radius = 20000); // 1.3km
        return new OpenLayers.Geometry.Polygon.createRegularPolygon(Point(origin[0], origin[1]), radius, 30);
    };

    var contour = function(l, style, cb, radius, hideIt) { 
        typeof l == 'string' && (l = [l]);
        var ret = [];

        if (typeof radius == 'undefined') 
            radius = style == 'contL' ? 20000 : (style=='contM' ? 10000 : 50);

        for (var i=0; i< l.length; i++ ) {
            var cStyle = OLStyle.get(style);
            var mStyle = OLStyle.get('pin');
            mStyle.display = 'none';
            cStyle.display = 'none';
            var c = new OpenLayers.Feature.Vector(circ(l[i], radius), null, cStyle);
            ret.push( c );
            var m = new OpenLayers.Feature.Vector(Point(l[i][0], l[i][1]), null, mStyle);
            ret.push( m );

            m.attrs = c.attrs = l[i][2]; // attributes passed in location data
        }
        return ret; 
    };

    return {
        Contour: function() { return false; },
        Contours: function(name, loc, marker) { 
            var vect = new OpenLayers.Layer.Vector(name,{ rendererOptions: {zIndexing: true} });;
            vect.add = function(a,b,c,d,e)  { 
                var f;
                vect.addFeatures(f = contour(a,b,c,d,e)); 
                return f;
            };
            return vect;
        },
        Marker: function(icon, loc, id) { return marker(icon, loc, id); },
        Markers: function(name) { 
            var ret = new OpenLayers.Layer.Markers(name,{ rendererOptions: {zIndexing: true} }); 
            ret.add = function(icon, coords, cb, hideIt) { 
                var m;
                for (var i=0; i<coords.length; i++) 
                    ret.addMarker(m = marker(icon, coords[i],
                    function(e) { cb(e.object.attrs); }, hideIt)
                ); 
                return m;
            };
            ret.clear = function() {
                ret.removeMarkers();
            };
            ret.show= function(show, id) { 
                for (var i=0; i<this.markers.length; i++) 
                    if (this.markers[i].id == id || typeof id == 'undefined') 
                        this.markers[i].display(show);
            };
            return ret;
        },
        Add: function(l, m)     { l.addMarker(m); }
    }
}])
.factory('OLDepr', ['OLStyle', 'OLCtrl', function(OLStyle, OLCtrl) {
    var pointList= function(l, closeIt) {
        var poly = [];
        for (var i=0; i< l.length; i++) 
            poly.push( (new OpenLayers.Geometry.Point(l[i][0], l[i][1])).transform('EPSG:4326', 'EPSG:3857'));

        if (typeof closeIt!= 'undefined' && closeIt) {
            if (l[0][0] != l[l.length-1][0] || l[0][1] != l[l.length-1][1])
                poly.push(poly[0]);
        }
        return {o: this, v:poly};
    };
    var ring = function(l) {
        var pList = pointList(l, true).v;
        return new OpenLayers.Geometry.LinearRing(pList);
    }; 

    var circ = function(origin, radius) {
        origin = new OpenLayers.Geometry.Point(origin[0], origin[1]).transform('EPSG:4326', 'EPSG:3857');;
        typeof radius == 'undefined' && (radius = 1300); // 1.3km
        return new OpenLayers.Geometry.Polygon.createRegularPolygon(origin, radius, 40);
    };

    var markF = function(l, style) { 
        //return new OpenLayers.Feature.Vector( ring(l), null, OLStyle.get('style') );
        var ret = [];
        if (typeof l[0] == 'number') {
                var point =  new OpenLayers.Geometry.Point(l[i], l[i], OLStyle.get(style)).transform('EPSG:4326', 'EPSG:3857');
                ret =  new OpenLayers.Feature.Vector(point,null, OLStyle.get(style));
        } else {
            for (var i=0; i< l.length; i++ ) {
                var point =  new OpenLayers.Geometry.Point(l[i][0], l[i][1], OLStyle.get(style)).transform('EPSG:4326', 'EPSG:3857');
                var vector =  new OpenLayers.Feature.Vector(point,null, OLStyle.get(style));
                ret.push(vector);
            }
        }
        return ret; 
    };
    var ringF = function(l, style) { 
        //return new OpenLayers.Feature.Vector( ring(l), null, OLStyle.get('style') );
        var ret = [];
        if (typeof l[0] == 'number') {
            ret = new OpenLayers.Feature.Vector( circ(l), null, OLStyle.get(style) );
        } else {
            for (var i=0; i< l.length; i++ ) {
                var point =  new OpenLayers.Geometry.Point(l[i][0], l[i][1]).transform('EPSG:4326', 'EPSG:3857');
                var vector =  new OpenLayers.Feature.Vector(point, null, OLStyle.get('marker'));
                ret.push( new OpenLayers.Feature.Vector( circ(l[i]), null, OLStyle.get(style) ));
                ret.push(vector);
            }
        }
        return ret; 
    };

    var ringV = function(id, l, style) {
        var v = new OpenLayers.Layer.Vector(id, { rendererOptions: {zIndexing: true} });
        //v.addFeatures(ringF(l, OLStyle.get(style)));
        v.addFeatures(ringF(l, style));
        return v;
    };

    var ringM = function(id, l, style) {
        var v = new OpenLayers.Layer.Vector(id, { rendererOptions: {zIndexing: true} });
        //v.addFeatures(ringF(l, OLStyle.get(style)));
        v.addFeatures(markF(l, style));
        return v;
    };

    var _this = this;
    return {
        List: function(l, closeIt) { return pointList(l, closeIt); },
        Ring: function(l) { return ring(l); },
        RingF: function(l, style) { return ringF(l, style); },
        RingV: function(id, l, style) { return ringV(id, l, style); },
        RingM: function(id, l, style) { return ringM(id, l, style); },
        setMap: function( map ) { OLCtrl.setMap( _this.map = map ); },
        initCtrls: function(what) { OLCtrl.init(what); },
        showFeatures: function(layer, doShow) {
            doShow = typeof doShow == 'undefined' || !doShow;
            var layer = _this.map.getLayersByName(layer)[0];
            for (var i=0; i< layer.features.length; i++) 
                layer.features[i].style.display = doShow ? 'block' : 'none';
            layer.redraw();
        },
        activate: function(ctrlName, cb) {
            OLCtrl.activate(ctrlName, function(a,b) {
                cb(a,b);
            });
        }, 
        deactivate: function(ctrlName) {
            OLCtrl.deactivate(ctrlName);
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
