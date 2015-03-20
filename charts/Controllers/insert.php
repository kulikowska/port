<?php
include 'log.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);

class DB {
    public static $link;
    public static function conn() {
        self::$link = mysqli_connect("localhost","rubz","donkey","newdudes") or die("Error " . mysqli_error($link)); 
    }

    public static function insert($sql) {
        $result = DB::$link->query($sql); 
        lg( $sql );
        return $result;
    }
}

$name = ($_REQUEST['first']);
$last = ($_REQUEST['last']);
$sport = ($_REQUEST['sport']);
$add = "INSERT INTO members (first, last, sport) VALUES ('$name', '$last', '$sport')";

DB::conn();
$addRows = DB::insert($add);
