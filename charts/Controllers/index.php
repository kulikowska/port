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
        while($row = mysqli_fetch_array($result)) { 
          array_push($ret, ["first" => $row['first'], "last" => $row['last'], "sport" => $row['sport']]);
        } 
        return $ret;
    }

}


DB::conn();
$rows = DB::getRows('SELECT * FROM members');

$my_array = array("fucking","around","with","PHP");
list($a, $b, $c, $d) = $my_array;
//echo "$a $c $d.";

$str = "What's going on in groove town?";
//print_r (explode(" ",$str));

$arr = array('Whats', 'going', 'on', 'in', 'groove', 'town?');
//echo implode(" ", $arr);

$sql = "INSERT INTO members (first, last, sport)
        VALUES ('muddy', 'waters', 'judo')";

$shifted = array_shift($rows);

echo json_encode($rows);

