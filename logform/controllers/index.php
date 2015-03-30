<?php
include 'log.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);

class DB {
    public static $link;
    public static function conn() {
    self::$link = mysqli_connect("localhost","rubz","donkey","users") or die("Error " . mysqli_error($link));
    }

    public static function newUser() {
        lg($sql);
        $username= ($_REQUEST['user']);
        $password= ($_REQUEST['password']);
        $sql = "INSERT INTO users (username, password) VALUES ('$username', '$password')";
        $result = DB::$link->query($sql);
        return $result;
    }

    public static function checkUser() {
        $ret = [];
        $username = ($_REQUEST['user']);
        $query = "SELECT username FROM users WHERE username = '$username'" or die (mysql_error());
        $result = DB::$link->query($query);
        return $result;
        while ($row = mysqli_fetch_assoc($result)) {
            array_push($ret, ["username" => $row['username']]);
        }
        return $ret;
        lg($query);
    }

}

//$add = "INSERT INTO users (username, password) VALUES ('$username', '$password')";

DB::conn();
$rows = DB::checkUser();

echo json_encode($rows);

