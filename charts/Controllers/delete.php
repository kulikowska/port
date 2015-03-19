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

    public static function remove($sql) {
        $result = DB::$link->query($sql); 
        lg( $sql );
        return $result;
    }
}

$id = ($_REQUEST['id']);
$sql = "DELETE FROM members where id=($id)";

DB::conn();
DB::remove($sql);

