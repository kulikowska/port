<?php
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

