<?php
include 'Controllers/log.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Controllers/' . $_GET['ctrl'] . '.php';
