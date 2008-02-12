<?php
/* Copyright (c) 2008 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
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
