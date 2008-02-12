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

require("../db.php");

getDB();

// Gets data from URL parameters
$description = $_GET['description'];

// Insert new row with user data
$query = sprintf("INSERT INTO tasks (description) VALUES ('%s');",
         mysql_real_escape_string($description));

$result = mysql_query($query);

if (!$result) { die('Invalid query: ' . mysql_error()); }