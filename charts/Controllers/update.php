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

    public static function update($sql) {
        $result = DB::$link->query($sql); 
        lg( $sql );
        return $result;
    }
}

$id = $_POST['id'];
//$first = ($_REQUEST['first']);
//$last= ($_REQUEST['last']);
//$sport= ($_REQUEST['sport']);
$sql = "UPDATE members set first='$first', last='$last', sport='$sport' where id='$id'";

DB::conn();
DB::update($sql);

//var_dump($_SERVER);
//echo $_POST['id'] . ' ' . $_POST['first'];
