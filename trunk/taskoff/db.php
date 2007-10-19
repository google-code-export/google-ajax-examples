<?php

// The simple DB settings
define(DBUSER, "taskuser");
define(DBPASS, "taskpassword");
define(DBNAME, "tasklist");
define(DBHOST, "localhost");

function getDB() {
  // Opens a connection to a MySQL server
  $connection = mysql_connect(DBHOST, DBUSER, DBPASS);
  if (!$connection) { die('Not connected : ' . mysql_error()); }

  // Set the active MySQL database
  $db_selected = mysql_select_db(DBNAME, $connection);
  if (!$db_selected) { die ("Can't use db : " . mysql_error()); }
  
  return $db_selected;
}
