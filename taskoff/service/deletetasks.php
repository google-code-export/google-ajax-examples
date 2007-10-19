<?php
require("../db.php");

getDB();

$result = mysql_query("DELETE FROM tasks");

if (!$result) { die('Invalid query: ' . mysql_error()); }