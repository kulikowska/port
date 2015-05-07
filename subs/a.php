<?php
    //$cont = file_get_contents("Prawo i Pięść.srt");

    $cont = file_get_contents("test.srt");

    $a = explode("\n", $cont);
    
    $cnt = count($a);

    for ($i=0; $i<$cnt; $i++) {
        if (trim($a[$i]) != "")
            $content = '';
            while (trim($a[$i]) != "") {
                if (strstr($a[$i], '-->') || strstr($a[$i], '--+')) {
                    $wrapper = doParams($a[$i]);
                } else {
                    $content .= $a[$i] . " \n";
                }
                $i++;
            }
            echo $wrapper[0] . "\n" . $wrapper[1] . $content . $wrapper[2] . "\n";
    }

    function doParams($inStr) {
        $sA = split('>>>', $inStr );
        $add   = trim($sA[1]);
        $css   = trim($sA[2]);

        $tmA   = split('--', trim($sA[0]));
        $start = trim($tmA[0]);
        $add   = addTime(trim($tmA[1]), $start);
        $end   = $add;

        return array("$start --> $end", '<font>','</font>');
    }

    function addAndPad($startA, $addA = '00:00:00,000') {

        function addOne($s, $a, $carry, $unit = 60) {
            $out   = $s + $a + $carry;

            if ($out >= $unit)  { $carry = 1;   $out -= $unit;  } 
            else                { $carry = 0;                   }

            $out = ($unit === 1000) ? str_pad($out, 3, '0') 
                                    : str_pad($out, 2, '0', STR_PAD_LEFT);

            return array($out, $carry);
        }

        list($t, $carry)  = addOne( $startA['t'], $addA['t'], 0, 1000);
        list($s, $carry)  = addOne( $startA['s'], $addA['s'], $carry);
        list($m, $carry)  = addOne( $startA['m'], $addA['m'], $carry);
        list($h, $carry)  = addOne( $startA['h'], $addA['h'], $carry);

        return "$h:$m:$s,$t";
    }

    function splitIt($inS) {
        list($h, $m, $s) = split(':', $inS);

        if ($s == '') {
            if ($m == '')   { $s = $h;          }
            else            { $s = $m; $m = $h; }

            $h = '';
        }

        list($s, $t) = split(',', $s);
        return array('h' => $h, 'm' => $m, 's' => $s, 't' => $t);
    }

    function addTime($in, $start) {
        $in = trim($in);

        return (substr($in, 0, 1) == '+')
            ? addAndPad(splitIt(trim($start)), splitIt(trim(substr($in,1))))
            : $in;
    }
?>
