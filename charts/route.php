<?php
include 'Controllers/log.php';

// DEBUG - START , comment them out for production
error_reporting(E_ALL);
ini_set('display_errors', 1);
// DEBUG - END

// This is where we redirect to the proper Controller
include 'Controllers/' . $_GET['ctrl'] . '.php';
