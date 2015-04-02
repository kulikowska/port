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
        $username = $_REQUEST['user'];
        $password = md5($_REQUEST['password']);
        $sql = "INSERT INTO users (username, password) VALUES ('$username', '$password')";
        lg($sql);
        $result = DB::$link->query($sql);
        if (DB::$link->error != "") {
            lg($result);
            lg(DB::$link->error);
            echo json_encode(['msg' => 'database error', 'success' => false]);
        } 
        else {
            echo json_encode(['msg' => "user added", 'success' => true]);
            return $result;
        }
    }

    public static function checkUser() {
        $username = $_REQUEST['user'];
        $query = "SELECT username FROM users WHERE username = '$username'";
        $result = DB::$link->query($query);
        lg(json_encode($result));
        return $result->num_rows>0;
    }

    public static function checkLength() {
        $password = $_REQUEST['password'];
        if (strlen($password) <= 3) {
            echo json_encode(['msg' => "password must be at least 4 characters", 'success' => false]);
        }
        else {
            DB::newUser();
            //echo json_encode(['msg' => "user added", 'success' => true]);
        }
    }
}

DB::conn();
if (!DB::checkUser()) { 
    DB::checkLength(); 
} else {
    echo json_encode(['msg' => "username already exists", 'success' => false]);
}

