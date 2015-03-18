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

    public static function insert($sql) {
        $result = DB::$link->query($sql); 
        lg( $sql );
        return $result;
    }

    public static function getRows($sql) {
        $ret = [];
        $query = $sql or die("Error in the consult.." . mysqli_error(DB::$link)); 
        $result = DB::$link->query($query); 
        while($row = mysqli_fetch_array($result)) { 
          array_push($ret, ["first" => $row['first'], "last" => $row['last'], "sport" => $row['sport']]);
        } 
        return $ret;
    }
}

<<<<<<< HEAD
$insert_query = 'INSERT INTO members (first, last, sport) VALUES ( "rick", "danko", "kendo")';

DB::conn();
$addrow = DB::getRows($insert_query);
=======
$sql = "INSERT INTO members (first, last, sport) VALUES ( 'rick', 'danko', 1)";

DB::conn();
DB::insert($sql);
>>>>>>> fc745de9504e1cf651e06634dc14f8eb4f8d7ad0
$rows = DB::getRows('SELECT * FROM members');

$my_array = array("fucking","around","with","PHP");
list($a, $b, $c, $d) = $my_array;
//echo "$a $c $d.";

$str = "What's going on in groove town?";
//print_r (explode(" ",$str));

$arr = array('Whats', 'going', 'on', 'in', 'groove', 'town?');
//echo implode(" ", $arr);

$shifted = array_shift($rows);

echo json_encode($rows);


