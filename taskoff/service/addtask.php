<?php
require("../db.php");

getDB();

// Gets data from URL parameters
$description = $_GET['description'];

// Insert new row with user data
$query = sprintf("INSERT INTO tasks (description) VALUES ('%s');",
         mysql_real_escape_string($description));

$result = mysql_query($query);

if (!$result) { die('Invalid query: ' . mysql_error()); }