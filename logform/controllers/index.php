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
        $username= ($_REQUEST['user']);
        $password= ($_REQUEST['password']);
        $sql = "INSERT INTO users (username, password) VALUES ('$username', '$password')";
        $result = DB::$link->query($sql);
        return $result;
        lg($sql);
    }

    public static function checkUser() {
        $username= ($_REQUEST['user']);
        $query = mysqli_query("SELECT * FROM users WHERE username = '$username'") or die (mysql_error());
        if (!$row = mysql_fetch_array($query) or die (mysql_error())) {
            DB::newUser();
        }
        else {
            echo "User Already Exists";
        }
    }

}

//$add = "INSERT INTO users (username, password) VALUES ('$username', '$password')";

DB::conn();
DB::checkUser();
