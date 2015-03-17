<?php
$dbhost = 'localhost';
$dbuser = 'rubz';
$dbpass = 'donkey';
$conn = mysql_connect($dbhost, $dbuser, $dbpass);
if(! $conn )
{
  die('Could not connect: ' . mysql_error());
  }
  $sql = 'INSERT INTO members'.
         '(first, last, sport) '.
                'VALUES ( "dr", "john", "judo")';

                mysql_select_db('newdudes');
                $retval = mysql_query( $sql, $conn );
                if(! $retval )
                {
                  die('Could not enter data: ' . mysql_error());
                  }
                  echo "Entered data successfully\n";
                  mysql_close($conn);
                  ?>
