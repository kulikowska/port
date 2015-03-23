<?php
class DB {
    public static $link=null;
    public static function conn() {
        if ( self::$link === null) 
            self::$link = mysqli_connect("localhost","rubz","donkey","newdudes") or die("Error " . mysqli_error($link)); 
    }

    public static function getRows($sql) {
        lg($sql);
        $ret = [];
        $query = $sql or die("Error in the consult.." . mysqli_error(DB::$link)); 
        $result = DB::$link->query($query); 
        while($row = mysqli_fetch_assoc($result)) { 
            //foreach ($row as $k => $v) { lg( $k . ' => ' . $v); } // TODO Later: PHP associative arrays can be very useful, definitely worth learning
                                                                    // uncomment the above line to see what you get in the log
                                                                    // this way you don't have to know field names, you can get them from array (but that's for later)
            array_push($ret, ["id" => $row['id'], "first" => $row['first'], "last" => $row['last'], "sport" => $row['sport']]);
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

echo json_encode($rows);
