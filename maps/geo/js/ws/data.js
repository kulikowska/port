APP
.factory('DATA', ['$http', function($http) {
    var urlHref = document.location.href;
    var urlBase = urlHref + (document.location.host == 'geo' ? '/noMVC/' : '/Api/');

    var Stor    = { Dev: {list:[], idx:{}, chan: {}}, Chan: {list:[], idx:{}, dev: {}}};

    var qString = function(url, pt1, pt2, opt1, opt2) {
        ret = "";
        switch (url) {
            case 'WsTvwsLookup'     : ret = '?k=a&lo=' + pt1.lon + '&la=' + pt1.lat; break;
            case 'WsChannelsList'   : ret = '?k=a'; break;
            case 'WsDeviceDetails'  : ret = '?k=a&ids=1,2,3'; break;
            case 'WsDeviceList'     : ret = '?k=a&lonMin=' + pt1.lon + '&latMin=' + pt1.lat +
                                        '&lonMax=' + pt2.lon + '&latMax=' + pt2.lat; break;
        };
        return ret;
    };

    var Chan = {
        WsTvwsLookup: {
            set: function(data) {
                if (data.length) { Stor.Chan.list = []; Stor.Chan.idx = {}; }

                for (var i=0; i<data.length; i++)
                    Stor.Chan.list.push(
                        Stor.Chan.idx[data[i].Channel] = [data[i].Channel, data[i].Value]
                    );
            }
        },
        WsChannelsList: {
            set: function(data) {
                for (var i=0; i<data.length; i++) Stor.Chan.idx[data[i].Channel] = data[i];
            }
        } 
    };

    var Dev = {
        WsDeviceList: {
            set: function(data) {
                if (data.length) { Stor.Dev.list = []; Stor.Dev.idx = {}; }

                for (var i=0; i<data.length; i++) {
                    Stor.Dev.list.push(
                        Stor.Dev.idx[data[i].Id] = {_ID: [data[i].Long4Dec, data[i].Lat4Dec, data[i].Id]}
                    );
                }
            }
        },
        WsDeviceDetails: {
            set: function(data) {
                if (data.length) { Stor.Chan.dev = {}; Stor.Dev.chan = {} };
                for (var i=0; i<data.length; i++)
                    if (typeof  Stor.Dev.idx[data[i].Id] != 'undefined') {
                        data[i]._ID = Stor.Dev.idx[data[i].Id]._ID;
                        Stor.Dev.idx[data[i].Id] = data[i];

                        if (typeof Stor.Dev.chan[data[i].Id] == 'undefined')
                            Stor.Dev.chan[data[i].Id] = [data[i].Chans];
                        else
                            Stor.Dev.chan[data[i].Id].push(data[i].Chans);

                        for (var j=0; j<Stor.Dev.chan[data[i].Id].length; j++)
                            for (var k=0; k<Stor.Dev.chan[data[i].Id][j].length; k++) {
                                var chan = Stor.Dev.chan[data[i].Id][j][k];
                                if (typeof Stor.Chan.dev[chan.Chan] == 'undefined')
                                    Stor.Chan.dev[chan.Chan] = [{Pwr:chan.Pwr, loc:data[i]._ID}];
                                else 
                                    Stor.Chan.dev[chan.Chan].push({Pwr:chan.Pwr, loc:data[i]._ID});
                            }
                    }
            }
        }
    };

    var set = function(url, data, cb) {
        switch (url) {
            case 'WsTvwsLookup'     : case 'WsChannelsList' : Chan[url].set(data);  break;
            case 'WsDeviceDetails'  : case 'WsDeviceList'   : Dev[url].set(data);   break;
        };

        var typ = url.indexOf('Device') < 0 ? 'Chan' : 'Dev';
        typeof cb == 'function' && cb(Stor[typ].list); 
    };

    var get= function(url, cb, pt1, pt2, opt1, opt2) {
        var fullUrl = urlBase + url + qString(url, pt1, pt2, opt1, opt2); 
        $http.get(fullUrl).success(function(data) { set(url, data, cb); });
    };

    return {
        url: urlHref,
        get: get,
        chanLoc:    function(id)    { return Stor.Chan.dev[id]; },
        findChan:   function(id)    { return Stor.Chan.idx[id]; },
        findDev:    function(id)    { return Stor.Dev.idx[id];  },
        devChans:   function(id)    { return Stor.Chan;  },
        chanIdx:    function()      {LG('called'); return Stor.Chan.idx; }
    }
}])
;
/*
    Host: 'http://' + document.location.host + '/',
    DATA: {"Devices": {}, "Channels": {}}, // Static storage of devices and channels
    Stor: function(dataId, auxId) {
        var _data = UT.DATA[ (dataId == 'Devices') ? 'Devices' : 'Channels' ] ;

        var storageTypes = {
            Devices : {
                load: function(data, overwrite) {
                    overwrite = typeof overwrite != 'undefined' && overwrite;
                    for (var i=0; i<data.length; i++) {
                        data[i].lon = data[i].Long4Dec;
                        data[i].lat = data[i].Lat4Dec;
                        delete (data[i].Long4Dec);
                        delete (data[i].Lat4Dec);

                        if (typeof _data[data[i]['Id']] == 'undefined' || overwrite) 
                            _data[data[i]['Id']] = data[i];
                    }
                },
                get:            function(id) { return _data[id]; },
                getChannels:    function(id) { return typeof _data[id] == 'undefined' ? null : _data[id].Chans; }
            },

            Channels : {
                load: function(data) {
                    for (var i=0; i<data.length; i++) {
                        var chanObj = _data[data[i].Channel];
                        if (typeof chanObj == 'undefined')
                            _data[data[i].Channel] = data[i];
                        else
                            angular.extend(chanObj, data[i]);
                    }
                },
                addDevice: function(chanId, devObj) {
                    if (typeof _data[chanId] == 'undefined') 
                        _data[chanId] = {Devices: [devObj]};

                    if (typeof _data[chanId].Devices == 'undefined') 
                        _data[chanId].Devices = [devObj];
                    else if (_data[chanId].Devices.indexOf(devObj) == -1)
                        _data[chanId].Devices.push(devObj);
                },
                getDevices: function(id) { 
                    return typeof _data[id][dataId] == 'undefined' ? null : _data[id].Devices;
                }
            }
        };

        storageTypes[dataId].get = function(id) { 
            if (typeof auxId == 'undefined')
                return typeof _data[id] == 'undefined' ? null : _data[id];
            else 
                return typeof _data[id][auxId] == 'undefined' ? null : _data[id][auxId];

        };

        return storageTypes[dataId];
    },
    Ajax: function() {
        var fullUrl = this.Host + (typeof noMVC != 'undefined' && noMVC ? '/noMVC/' : '/Api/');

        var getExt = function(url, cb, pt1, pt2, opt1, opt2) {
            var url1 = fullUrl + url + qString(url, pt1, pt2, opt1, opt2); 
            Ext.Ajax.request({ 
                url: fullUrl + url + qString(url, pt1, pt2, opt1, opt2), 
                success: function(data) {
                    var res = Ext.decode(data.responseText);
                    var ret = setData(url,res);
                    cb(ret);
                }, 
                fail: function(data) {
                }
            });
         };

        var get = function(url, cb, pt1, pt2, opt1, opt2) {
            var url1 = fullUrl + url + qString(url, pt1, pt2, opt1, opt2); 
            jQuery.ajax({ 
                url: fullUrl + url + qString(url, pt1, pt2, opt1, opt2), 
                success: function(data) {
                //    var res = Ext.decode(data.responseText);
                    try {
                        var res = JSON.parse(data);
                        var ret = setData(url,res);
                        cb(ret);
                    } catch (e) {}
                }, 
                fail: function(data) {
                }
            });
         };

         var qString = function(url, pt1, pt2, opt1, opt2) {
            ret = "";
            switch (url) {
                case 'WsTvwsLookup' :
                    ret = '?k=a&lo=' + pt1.lon + '&la=' + pt1.lat;
                    break;
                case 'WsDeviceList' :
                    ret = '?k=a&lonMin=' + pt1.lon + '&latMin=' + pt1.lat +
                              '&lonMax=' + pt2.lon + '&latMax=' + pt2.lat;
                    break;
                case 'WsDeviceDetails':
                    ret = '?k=a&ids=1,2,3';
                    break;
                case 'WsChannelsList':
                    ret = '?k=a';
                    break;
            };
            return ret;
         };

        // TODO
        var mockDataDetail = function( res ) {
            for (var i=0; i<res.length; i++){
                var dt = res[i].Chans;
                for (var j=0; j<dt.length; j++) {
                    if (false) // TODO
                    if (dt[j].Pwr == -7 && Math.random() > 0.6)
                        res[i].Chans[j].Pwr = 50;
                    res[i].Chans[j].Pwr += 30;
                }
            }
            return res;
        };

         var setData = function(url, res){
            var ret = [];
            switch (url) {
                case 'WsDeviceList' :
                    UT.Stor('Devices').load(res);
                    for( var i=0; i<res.length; i++)
                        ret.push([res[i].lon, res[i].lat, res[i].Id]);

                    break;
                case 'WsDeviceDetails':
                    res = mockDataDetail(res);
                    UT.Stor('Devices').load(res, true);
                    for (var i=0; i<res.length; i++)
                        for (var j=0; j<res[i].Chans.length; j++) {
                            UT.Stor('Channels').addDevice( res[i].Chans[j].Chan, 
                                {   'Id': res[i].Id, 
                                    'lon' : res[i].lon, 
                                    'lat': res[i].lat, 
                                    'Pwr': res[i].Chans[j].Pwr
                               }
                            );
                        }

                    ret = res;
                    break;
                case 'WsTvwsLookup' :
                    UT.Stor('Channels').load(res);
                    ret = res;
                    break;
                case 'WsChannelsList':
                    UT.Stor('Channels').load(res);
                    ret = '?k=a';
                    break;
                default: ret = res;
            }
            return ret;
         };

         return {
            get: get,
            layerData: setData
         }
    },
*/
