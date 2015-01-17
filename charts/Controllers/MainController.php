<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

class DB {
    public static $link;
    public static function conn() {
        self::$link = mysqli_connect("localhost","rubz","donkey","newdudes") or die("Error " . mysqli_error($link)); 
    }

    public static function getRows($sql) {
        $ret = [];
        $query = $sql or die("Error in the consult.." . mysqli_error(DB::$link)); 
        $result = DB::$link->query($query); 
        $ret = [];
        while ($row=mysqli_fetch_assoc($result)) $ret[] = $row;
        return $ret;
    }
}

DB::conn();
$rows = DB::getRows('SELECT * FROM members');
echo json_encode($rows);
