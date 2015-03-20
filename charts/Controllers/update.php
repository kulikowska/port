<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

function lg($msg) {
    $fp = fopen('/tmp/chart.log', 'w');
    fwrite($fp, $msg . "\n");
    fclose($fp); 
}

class DB {
    public static $link;
    public static function conn() {
        self::$link = mysqli_connect("localhost","rubz","donkey","newdudes") or die("Error " . mysqli_error($link)); 
    }

    public static function update($sql) {
        $result = DB::$link->query($sql); 
        lg( $sql );
        return $result;
    }
}

//$id = ($_REQUEST['id']);
$sql = "UPDATE members set first='ronnie' where id=166";

DB::conn();
DB::update($sql);

