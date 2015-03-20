<?php

function lg($msg) {
    ob_start();
    var_dump($msg);
    $out = ob_get_contents();
    ob_end_clean();
    $fp = fopen('/tmp/chart.log', 'w');
    fwrite($fp, $out . "\n");
    fclose($fp); 
}
