if (typeof APP == 'undefined') var APP = angular.module('WS',[]);

APP
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
