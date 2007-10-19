<?php
require("../db.php");

getDB();

// Select all the rows in the markers table
$query = "SELECT * FROM tasks ORDER BY id DESC";

$result = mysql_query($query);
if (!$result) { die("Invalid query: " . mysql_error()); }

while ($row = @mysql_fetch_assoc($result)) {
  echo $row['description'] . "\n";
}