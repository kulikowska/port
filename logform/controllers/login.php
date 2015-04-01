<?php
include 'log.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);

class DB {
    public static $link;
    public static function conn() {
    self::$link = mysqli_connect("localhost","rubz","donkey","users") or die("Error " . mysqli_error($link));
    }

    public static function login() {
        $username = $_REQUEST['user'];
        $password = md5($_REQUEST['password']);
        $query = "SELECT * from users where username = '$username' and password = '$password'"; 
        $result = DB::$link->query($query);
        lg($query);
        lg($result);
        return $result->num_rows>0;
    }
}

DB::conn();
if (!DB::login()) {
    echo json_encode(['msg' => "Incorrect login information", 'success' => false]);
} else {
    echo json_encode(['msg' => 'Logged in successfully', 'success' => true]);
}

