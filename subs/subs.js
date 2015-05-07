// Globall DOM Els
//
var video       = null;
var fileInput   = null
var ta          = null;
var start       = null;
var end         = null;
var frameNo     = null;

var lines       = [];
var inFrame     = false;
var lI          = 0;

// Local Storage Test TODO
var lsS         = "";

var Config = {
    frameNo     : null,
    lines       : [],
    lI          : 0,
    rollBack    : 000,
    lastTm      : 86399999,
    baseName    : 'bench',
    vidName     : 'bench.mp4',
    autoLoad    : true,
    autoPlay    : true,
    playOnSync  : false,
    liveUpdate  : true,
    volume      : 0.8,

    minFrameLength : 600
}

function LG() { console.log(JSON.stringify(arguments)); }

DRAG = {
    x:0,
    y:0,
    fx:0,
    fy:0,
    target: null,
    drop: function (ev, arg) {
        if (arg == 'mousedown') {
            DRAG.x = ev.x;
            DRAG.y = ev.y;
            DRAG.target = ev.target;
        }
        if (arg == 'dragend') 
            if (ev.y != 0 ) {
                DRAG.fx=ev.x;
                DRAG.fy=ev.y;
            }
    },

    end: function(ev) {
        $(DRAG.target).css({'left' : DRAG.fx - DRAG.x + parseInt($(DRAG.target).css('left'))});
        $(DRAG.target).css({'top'   : DRAG.fy - DRAG.y + parseInt($(DRAG.target).css('top'))});
    }
}

$(document).ready(function(){
    V5S.player  = document.getElementById('player5');
    fileInput   = document.getElementById('fileInput');
    ta          = document.getElementById('caption');
    start       = document.getElementById('start');
    end         = document.getElementById('end');
    frameNo     = document.getElementById('frameNo');

    fileInput.addEventListener('change', function(e) {
        var reader = new FileReader();
        reader.readAsText(fileInput.files[0]);
        reader.onload = function(e) { Parse(reader.result); };
        $('#fileOver').addClass('chosen');
    });
    $('#storedProjs').append(loadProjs());

    Init();
});

function Init() {
    var config = localStorage.getItem("subTool:::Config");

    if (config != null) {
        Config = $.extend(Config, JSON.parse(config));

        $('#vidName').val(Config.vidName);
        $('#baseName').val(Config.baseName);
        $('#rollBack').val(Config.rollBack);
        $('#rollBackVal').text("Roll Back:" + Config.rollBack);
        $('#volume').val(Config.volume);

        $('#autoLoad').attr('checked', Config.autoLoad);
        $('#autoPlay').attr('checked', Config.autoPlay);
        $('#playOnSync').attr('checked', Config.playOnSync);
        $('#liveUpdate').attr('checked', Config.liveUpdate);
    }
}

function loadFromParams() {
        if (($('#vidName').val().indexOf('.') > -1)) {
            VID = V5S;
            YTS.hide();
            YTS.unload();
        } else {
            V5S.unload();
            VID = YTS;
            V5S.hide();
            YTS.vidId = Config.vidName;
        }

        $('#workArea').show();
        VID.Init();
}

function PlayerReady() {
        if (Config.autoLoad) {
            //loadFromParams();
            if (Config.autoPlay) togglePlay();
            VID.volume(Config.volume);
        }
        setAutoPlay();
        Parse(localStorage.getItem('subTool:::' + $("#vidName").val() + ":::" + $("#baseName").val() + '.vtt'));
}


function loadConfig(subKey) {
    var baseName = subKey.substr(0, subKey.length-4).split(':::').pop();
    var vidName = subKey.split(':::')[1];
    saveConfig('baseName', baseName);
    saveConfig('vidName', vidName);
    $('#baseName').val(baseName);
    $('#vidName').val(vidName);
}

function saveConfig(key, value) {
    if (typeof value == 'object')
        switch ($(value).attr('type')) {
            case "text" : value = value.value; break;
            case "checkbox" : value = $(value).is(":checked");
            default : ;
        }
    
    if (typeof key != 'undefined') Config[key] = value;

    if (key == 'vidName') {
        if ($('#baseName').val() == '') {
            Config.baseName = value.substr(0, value.length-4);
            $('#baseName').val(Config.baseName);
        }
    }

    $('#rollBackVal').text(Config.rollBack);

    Config.lI = lI;
    localStorage.setItem('subTool:::Config', JSON.stringify(Config));
}
function loadProjs() {
    // TODO SET initial value from config
    var laS = '';
    for ( var i in localStorage) {
        if (i.substr(0, 7) == 'subTool') {
            key = i.substr(10);
            
            if (key != "Config")
                laS += '<li><input name="projs" type="radio" value="' + i + '" onclick="loadConfig(\'' + i + '\')">' 
                    + key.replace(':::','/').substr(0, key.length-6)
                    + '<button onclick="delProj(\'' + i + '\')">Del</button>'
                    + '</li>';
        }
    }
    return laS;
}

function delProj(projName) {
    localStorage.removeItem(projName);
    $('#storedProjs >  *').remove();
    $('#storedProjs').append(loadProjs());
}


function appendFrame() {
    if (lines[lI-1][0] > 0) {
        lines.push([VID.getCT()*1000, Config.lastTm, '', 'position:10%']);
        lI = lines.length-1;
        $('.timers').attr('class', 'timers isNew');
    } else {
        lI--;
    }
    return false;
}

function findFrame(currentTm) {
        inFrame = inFrameCT(currentTm);

        if (!inFrame) {
            if (lines[lI][1] < currentTm)
                while (lI < lines.length && lines[lI][1] < currentTm) lI++;
            if (lines.length<=lI) {
                appendFrame();
            } else {
                if (lI>0 && lines[lI-1][0] > currentTm)
                    while (lI >= 0 && lines[lI][0] > currentTm) lI--;

                if (lI<0) lI = 0; 
            }
            inFrame = inFrameCT(currentTm);
        } 

        setFrame();
        setOverlaps();
}

function updateFrame() {
    if (lines.length == 0) Parse(''); // Safety, lines should have at least one element by now

    var startTm = toMs(start.value);
    var endTm   = toMs(end.value);

    if (endTm - startTm < Config.minFrameLength) // Enforce min frame length
        endTm = startTm + Config.minFrameLength;

    lines[lI][0] = startTm;
    lines[lI][1] = endTm;
    lines[lI][2] = ta.value;
    lines[lI][3] = $('#timeArgs').val();
}

function inFrameCT(ct, frameNbr)     { 
    if (typeof frameNbr == 'undefined') frameNbr = lI;
    return frameNbr >=0 && lines[frameNbr][0]<=ct && lines[frameNbr][1]>=ct; 
}

function frameChange(arg) {
    switch (typeof arg) {
        case 'number'   : lI += parseInt(arg); break;
        case 'boolean'  : lI = arg ? 0 : lines.length - 1; break;
        default         : lI = parseInt(arg.value);
    }

    if (lI < 0)             lI = 0;
    if (lI >= lines.length) lI = lines.length - 1;
    if (lines[lI][0] >= 0)   VID.setCT(lines[lI][0]/1000, 0.001);
    setFrame();

}

function setFrame(jumpTo) {
    if (typeof jumpTo != 'undefined') lI = jumpTo;
    if (typeof lI == 'undefined' ) lI = 0;

    ta.value        = lines[lI][2];
    start.value     = fromMs(lines[lI][0]);
    end.value       = fromMs(lines[lI][1]);
    frameNo.value   = lI;
    $('#timeArgs').val(lines[lI][3]);

    var timerClass = 'timers';
    if (inFrame) 
        if (lI == lines.length-1)   timerClass += " isNew";
        else                        timerClass += " isIn"

    $('.timers').attr('class', timerClass);
        
    var out = '';
    var i=lI+1;

    while (lines.length > i && inFrameCT(1000*VID.getCT(), i))
        { out += lines[i++][2]; }

    if (out != '') out += "<br />";
    out.trim();

    $('#activeCaption').html(inFrame ? (out + lines[lI][2]).replace(/\r?\n/g, '<br />') : "");

    updateSlider();
}

function setOverlaps() {
    if (Config.liveUpdate || VID.isPaused()) {
        if (lI > 0) {
            $('#prevEnd').text(fromMs(Math.abs(lines[lI][0] - lines[lI-1][1])).substr(6)).css({"opacity" : 1});
            
            if (lines[lI][0]<lines[lI-1][1])    $('#prevEnd').addClass("overlap");
            else                                $('#prevEnd').removeClass("overlap");
        } else {
            $('#prevEnd').text(fromMs(lines[lI][0].toString()).substr(6));
        }

        if (lI < lines.length-1) {
            $('#nextStart').text(fromMs(Math.abs(lines[lI+1][0] - lines[lI][1])).substr(6)).css({"opacity" : 1});;

            if (lines[lI][1]>lines[lI+1][0])    $('#nextStart').addClass("overlap");
            else                                $('#nextStart').removeClass("overlap");
        } else {
            $('#nextStart').text('END');
        }
    } else {
            $('#prevEnd').css({"opacity" : 0});
            $('#nextStart').css({"opacity" : 0});
    }
}

function jump(jumpInt, which) {
    if (typeof which == 'undefined') which=0;

    switch (which) {
        case -3: lines[lI][0] = 0; break;
        case -2: lines[lI][1] = Config.lastTm; break;
        case  0: VID.jumpCT(jumpInt); break;
        case  1: lines[lI][0] -= 1000 * jumpInt; break;
        case  2: 
            lines[lI][0] -= 1000 * jumpInt;
            lines[lI][1] -= 1000 * jumpInt; 
            break;
        case  3: lines[lI][1] -= 1000 * jumpInt; break;
    }
    if (which>0) VID.setCT(lines[lI][0]/1000);
    setFrame();
    setOverlaps();
}

function setAutoPlay( el ) {

    $('#autoPlayBtn').text('Auto Play ' + (Config.playOnSync ? 'Off' : 'On'));
    Config.playOnSync = !Config.playOnSync;
}

function syncCT(arg) {
    var isStart     = typeof arg != 'undefined' && arg;

    VID.setCT(toMs(isStart ? start.value : end.value)/1000, 0);

    if (Config.playOnSync) {
        togglePlay(true);
    }
}

function syncTm(which) {
    var curEl = document.getElementById("current");
    if (typeof which == 'undefined') {
        end.value = curEl.innerText;
    } else {
        start.value = fromMs(VID.getCT()*1000 - Config.rollBack);
        VID.setCT(toMs(start.value)/1000,0);
    }
    updateFrame();
    setOverlaps();
}

function Parse(cont) {
    if (typeof cont != 'undefined' && cont != null && cont.trim() != '') {
        lines = [];
        var byLine = cont.split('\n\n');
        var line = '';
        var idx  = -1;
        for (var i=0; i<byLine.length; i++) {
            line = byLine[i].trim();
            if (line.trim() != '' && line.trim() != 'WEBVTT' ) {
                var index = i.toString();
                var parts = line.match(/(.*\r?\n)(.*\d\d:\d\d[,.]\d\d\d.*-->.*\d\d:\d\d[,.]\d\d\d)(.*\r?\n)((.|\r?\n)*)/);
                if( parts != null ) {
                    parts.shift();
                    index = parts.shift();
                } else {
                    parts = line.match(/(^.*\d\d:\d\d[,.]\d\d\d.*-->.*\d\d:\d\d[,.]\d\d\d)(.*\r?\n)((.|\r?\n)*)/);
                    parts.shift();
                }
                if ( parts ) {
                    var times = parts[0].split('-->');
                    lines[++idx] = [toMs(times[0]), toMs(times[1]), parts[2], parts[1].trim(), index.trim()];
                } else {
                    if (line.indexOf('NOTE') > -1) {
                        lines[++idx] = [-1, -1, line, ''];
                    } else {
                        lines[++idx] = [0, Config.lastTm, line, ''];
                    }

                }
            }
        }
        console.log("Loaded Subs", cont.substr(0,100));
    } else {
        if (confirm( "This will create a new subtitles file and overwrite existing work if any.\nPlease confirm/cancel."
                   )) {

            lines = [[0, Config.lastTm, 'New Project - first frame', '']];
            $('#fileOver').removeClass('chosen');
            lI = 0;
        }
    }
    setFrame();

    if (false)
        for (var i=0;i <lines.length; i++)  {
            console.log( i );
            console.log(lines[i]);
           }

}

function toMs(inS) {
    if (inS == 0) return 0;
    inS = inS.toString();
    var sA = inS.indexOf(',') > -1 ? inS.split(',') : inS.split('.');
    var mils = parseInt(sA.pop());
    var tA = sA[0].split(':');
    var secs = parseInt(tA.pop()) * 1000;
    var mins = parseInt(tA.pop()) * 60000;
    var hurs = parseInt(tA.pop()) * 3600000;

    return hurs + mins + secs + mils;
}

function fromMs(stamp, isVtt) {
    isVtt = (typeof isVtt == 'undefined') ? false : isVtt;

    var hurs = Math.floor(stamp/3600000).toString();
    var rest = stamp-hurs*3600000;
    var mins = Math.floor(rest/60000).toString();
    rest = rest - mins*60000;
    var secs = Math.floor(rest/1000).toString();
    var mils = Math.floor(rest - secs*1000).toString();

    if (hurs.length == 1) hurs = '0' + hurs;
    if (mins.length == 1) mins = '0' + mins;
    if (secs.length == 1) secs = '0' + secs;

    if (mils.length == 1) mils = '00' + mils;
    if (mils.length == 2) mils = '0'  + mils;

    return isVtt    ? hurs + ":" + mins + ":" + secs + "." + mils
                    : hurs + ":" + mins + ":" + secs + "," + mils;
}

function updateSlider() {
    if (Config.liveUpdate || VID.isPaused()) {
        $('#frameSlide >*').remove();
        if (lines.length < 1 || lines[lI][1] == Config.lastTm) return;

        var back    = lI > 0 ? lI - 1 : 0;
        var forth   = lI < lines.length - 1 ? lI + 1 : lI;
        if (lines[forth][1] == Config.lastTm) // Ignore infinite length frames
            forth--;

        var elCount = 1+(forth-back)*2;
        var stretch = lines[forth][1] - lines[back][0];

        var els = [];
        var coords = [];
        for (var i = back; i <= forth; i++) {
            els[els.push(lines[i][1] - lines[i][0])-1];
            coords.push({"t" : i.toString()});

            if (i != forth ) {
                els[els.push(lines[i+1][0] - lines[i][1])-1];
                coords.push({"t" : ''});
            }
        }

        var sum = 0;
        for (var i=0; i<elCount; i++) {
            //coords[i].v = Math.round(100*els[i]/stretch);
            coords[i].v = 100*els[i]/stretch;
            sum += coords[i].v;
            if (coords[i].v < 0.4 && coords[i].v>0) {
                var subtr = coords[i].v;
                coords[i].v = 0.25;
                coords[i-1].v -= 0.25 - subtr;
            }
        }
         
        if (sum != 100) coords[i-1].v -= sum - 100;

        for (var i=1; i < elCount; i += 2) {
            if (coords[i].v < 0) {
                coords[i].v = -coords[i].v;
                coords[i+1].v = coords[i+1].v - 2*coords[i].v;
                coords[i].t = 'overlap';
                if (coords[i+1].v < 0) {
                    coords[i].v += coords[i+1].v - 5;
                    coords[i+1].v=5;
                    coords[i].t = 'overlap cover';
                }
            }
        }

        for (var i=0; i<elCount; i++){
            var domClass = (i>0 && i<elCount-1) ? "inner" : "outer";
            if (coords[i].t == '' || coords[i].t == 'overlap') {
                $('#frameSlide').append( $('<div class="spacer ' + coords[i].t + '"></div>')
                    .css({"width" :  coords[i].v.toString() + "%"})
                );
            }else if (coords[i].t == 'overlap cover') {
                $('#frameSlide').append( $('<div class="spacer ' + coords[i].t + '"></div>')
                    .css({"width" :  coords[i].v.toString() + "%"})
                );
            } else {
                $('#frameSlide').append('<div class="' + domClass + '"'
                    + ' style="width:' + coords[i].v + '%;"'
                    + (i==0 ? " onclick='frameChange(-1)'" : '')
                    + (i==(elCount-1) ? " onclick='frameChange(1)'" : '')
                    + '>' + coords[i].t + '</div>');
            }
        }
        $('#frameSlide').css({"opacity":1});
    } else {
        $('#frameSlide').css({"opacity":0.2});
    }
}

function getLine(i, isVtt) {
    var out =  
        fromMs(lines[i][0], isVtt) + " --> " 
        + fromMs(lines[i][1], isVtt) + "\n" + lines[i][2] + "\n\n";
    return out;
}

function save(localOnly){
    var outVtt = "WEBVTT\n\n";
    var outSrt = "";
    for (var i=0; i<lines.length; i++)
    {
        if (lines[i][0] != 0 && lines[i][2] != '') {
            outVtt += getLine(i, true);
            outSrt += getLine(i, false);
        }
    }

    if (outSrt != '') {
        if (typeof localOnly != 'undefined' && localOnly) {
            localStorage.setItem("subTool:::" + Config.vidName + ":::" + Config.baseName + '.vtt', outVtt);
        } else {
            download(Config.baseName, "vtt", outVtt);
            download(Config.baseName, "srt", outSrt);
        }
    } else {
        console.log("Empty Subtitles file...aborting");
    }
}

function download(filename, fType, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/' + fType + ';charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename + '.' +  fType);
    pom.click();
}

function togglePlay(arg) {
    
    if (typeof arg != 'undefined' && arg || VID.isPaused()) {
        VID.play();
        flashBg('#bigPlayButton', true, function() { $("#bigPlayButton").text("Pause");} );
    } else {
        VID.pause();
        flashBg('#bigPlayButton', false, function() { $("#bigPlayButton").text("Play");} );
    }
}

function flashBg(targetEl, cond, cb) {
    $(targetEl).css({"background" : (cond ? "#afd" : "#faa")});
    setTimeout( 
        function() { 
            $(targetEl).css({"background" : "transparent"}); 
            cb();
        }
   , 300);
}

function infEnd() {
    lines[lI][1] = Config.lastTm;
    setFrame();
}

function goToFrame() {
    if ($('#frameSel button').length < lines.length) {
        for (var i=0; i< lines.length; i++) {
            $('#frameSel').append(
                    '<button onclick="setFrame(' + i + '); syncCT(true); $(\'#frameSel\').slideUp();">' + i.toString() + '</button>'
                    );
        }
    }
    $('#frameSel:visible').slideUp();
    $('#frameSel:hidden').slideDown();
}

V5S = {
    player      : null,
    load        : function() { return this.player.load();  },
    getDuration : function() { return this.player.duration;},
    isPaused    : function() { return this.player.paused;  },
    pause       : function() { return this.player.pause(); },
    play        : function() { return this.player.play();  },
    getCT       : function() { return this.player.currentTime;           },
    getCTInt    : function() { return this.player.currentTime * 1000;    },
    jumpCT      : function(offset)  { this.player.currentTime += offset; },
    setCT : function (stamp, offset)   { 
        if (typeof offset == 'undefined') offset = 0;
        
        this.player.currentTime = stamp + offset; 
    },
    volume : function(arg) { 
        if (typeof arg == 'undefined') return this.player.volume;
        else                            this.player.volume = arg; 
    },
    onTrackedVideoFrame : function (currentTime) {
        if (typeof lines != 'undefined' && typeof lines[0] != 'undefined') {
            findFrame(currentTime*1000);
            $("#current").text(fromMs(currentTime*1000));
        }
    },

    Init : function() {
        $("#player5").on( "timeupdate", function(event){ 
            V5S.onTrackedVideoFrame(this.currentTime); 
        });

        $('#player5').show().attr('src', Config.vidName);
        V5S.load();
        PlayerReady();
    },
    hide: function() { $('#player5').hide(); },
    unload: function() {
        $('#player5').show().attr('src', '');
    }
}

YTS = {
    player : null,
    vidId  :'-jSkqQFy5AU',
    paused : true,
    onYouTubeIframeAPIReady : function() {
        YTS.player = new YT.Player('player', {
        width: '640',
        videoId: YTS.vidId,
        events: {
          'onReady': YTS.onPlayerReady,
          'onStateChange': YTS.onPlayerStateChange
        }
      });
    },

    load :          function() { YTS.onYouTubeIframeAPIReady(); },
    onPlayerReady : function(event) { PlayerReady(); },

    onPlayerStateChange : function (event) {
      YTS.paused = event.data == YT.PlayerState.PAUSED;
    },

    getDuration : function() { return this.getDuration(); },
    isPaused    : function() { return YTS.paused;              },
    pause       : function() { return YTS.player.pauseVideo(); },
    play        : function() { return YTS.player.playVideo();  },
    getCT       : function() { return YTS.player.getCurrentTime();      },
    getCTInt    : function() { return YTS.player.getCurrentTime() * 1000;},
    jumpCT      : function(offset)  { this.player.seekTo(this.player.getCurrentTime() + offset); },
    setCT : function (stamp, offset)   { 
        if (typeof offset == 'undefined') offset = 0;
        this.player.seekTo(stamp + offset); 
    },
    volume : function(arg) { 
        if (typeof arg == 'undefined')  return this.player.getVolume();
        else                            this.player.getVolume(arg); 
    },

    stopVideo   : function()     { this.player.stopVideo(); },
    startVideo  : function()     { this.player.playVideo(); },
    pauseVideo  : function ()    { this.player.pauseVideo(); },
    seek        : function (pos) { this.player.seekTo(pos); },

    Init: function(){
        if (YTS.player == null) {
            window.onYouTubeIframeAPIReady = YTS.onYouTubeIframeAPIReady;
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";

            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            setInterval(function() { 
                if (!YTS.paused) 
                    if (typeof lines != 'undefined' && typeof lines[0] != 'undefined') {
                        findFrame(YTS.getCT() * 1000);
                        $("#current").text(fromMs(YTS.getCT()*1000));
                    }
            } , 300);
        } else {
            YTS.player.loadVideoById(Config.vidName);
            PlayerReady();
            YTS.show();
        }
        setTimeout( function() {
        console.log($('#player').css('height'));
        console.log($('#player').css('width'));
        $('#playerCover').css({'height' : '324px'}).show();
        }, 300);
    },
    unload: function() { 
        if (YTS.player != null) YTS.pause(); 
        $('#playerCover').hide();
    },

    hide: function() { $('#player').hide(); },
    show: function() { $('#player').show(); }
}
