<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dbc  = mysqli_connect("localhost","rubz","donkey","newdudes") or die("Error " . mysqli_error($link)); 
$query = "SELECT * FROM members";
$result = mysqli_query($dbc, $query);
$data_array = [];
while ($row = mysqli_fetch_assoc($result)) {
    array_push($data_array, [$row['first'], $row['last'], $row['sport']]);
}
return $data_array;

var_dump($data_array);

echo json_encode($data_array);
