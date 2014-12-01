APP
.factory('DATA', ['$http', function($http) {
    var urlHref = document.location.origin;
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
        devChans:   function()      { return Stor.Chan.dev;  },
        chanDevs:   function()      { return Stor.Dev.chan;  },
        chanIdx:    function()      { return Stor.Chan.idx; },
        devIdx:     function()      { return Stor.Dev.idx; }
    }
}])
;
