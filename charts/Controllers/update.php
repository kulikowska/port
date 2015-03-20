<?php
include 'log.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);

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

lg($_REQUEST);
lg($_POST);

$id = $_REQUEST['id'];
$first = $_REQUEST['first'];
$last= ($_REQUEST['last']);
$sport= ($_REQUEST['sport']);
$sql = "UPDATE members set first='$first', last='$last', sport='$sport' where id='$id'";
lg($sql);

DB::conn();
DB::update($sql);

//echo $_POST['id'] . ' ' . $_POST['first'];
