<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dbc  = mysqli_connect("localhost","rubz","donkey","newdudes") or die("Error " . mysqli_error($link)); 
$query = "SELECT * FROM members";
$result = mysqli_query($dbc, $query);
$data_array = array();
while ($row = mysqli_fetch_assoc($result)) {
    $data_array[] = $row['first'];
}

var_dump($data_array);

echo json_encode($data_array);
