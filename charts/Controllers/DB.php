<?php
class DB {
    public static $link=null;
    public static function conn() {
        // Only instantiate one instance of db $link, this is a static member so you can share it in all instances
        if (self::link == null)
            self::$link = mysqli_connect("localhost","rubz","donkey","newdudes") or die("Error " . mysqli_error($link)); 
    }

    public static function getRows($sql, $cb) {
        lg($sql);
        $ret = [];
        $query = $sql or die("Error in the consult.." . mysqli_error(DB::$link)); 
        $result = self::$link->query($query); 
        while($row = mysqli_fetch_assoc($result)) { 
            //foreach ($row as $k => $v) { lg( $k . ' => ' . $v); }
            array_push($ret, ["id" => $row['id'], "first" => $row['first'], "last" => $row['last'], "sport" => $row['sport']]);
        } 
        return $ret;
    }
}
