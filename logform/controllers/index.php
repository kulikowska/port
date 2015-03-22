<?php
include 'log.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);

class DB {
    public static $link;
    public static function conn() {
    self::$link = mysqli_connect("localhost","rubz","donkey","users") or die("Error " . mysqli_error($link));
    }

    public static function insert($sql) {
        $result = DB::$link->query($sql);
        lg( $sql );
        return $result;
    }
}

$username= ($_REQUEST['user']);
$password= ($_REQUEST['password']);
$add = "INSERT INTO users (username, password) VALUES ('$username', '$password')";

DB::conn();
$addRows = DB::insert($add);
