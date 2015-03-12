<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dbc  = mysqli_connect("localhost","rubz","donkey","newdudes") or die("Error " . mysqli_error($link)); 
$query = "SELECT * FROM members";
$result = mysqli_query($dbc, $query);
$data_array = array();
while ($row = mysqli_fetch_assoc($result)) {
    $data_array[$row['first']] = $row['last'];
}

foreach ($data_array as $row) {
    echo $row[0]. " ";
}

