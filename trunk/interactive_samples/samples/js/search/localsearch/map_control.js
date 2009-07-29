/*
*  How to build a custom control that will show a static map for each result.
*/

// First, we have to load the APIs.
google.load( 'maps' , '2' );
google.load( 'search' , '1' );

// Second, we set up our function, OnLoad
function OnLoad(){
  // First, we build our control
  // You will notice that we pass in the id of the content div
  // And we hand it also the string that we want to use for our
  // searcher's center point.
  var searchControl = new LSstaticMapControl( 'content' , 'Mountain View, CA' );

 // Execute an initial search
  searchControl.execute('google');

  // And we're done! Good job.
}


// Here is the custom control.
function LSstaticMapControl( element , center ){
  // As you can see, we're going to take two arguments.
  // The first is the element that we want to build in or
  // its ID. And the second is the value that we want to
  // use as our LocalSearch object's center point. Thanks
  // to the dev team, this can be any of the following:
  // a google.maps.LatLng object, a google.maps.Map2 object,
  // or a simple string.

  // First, we're going to grab the element
  if( typeof( element ) == 'string' ){ // If we were given a string
    this.container = document.getElementById( element );
  } else { // or an actual element reference
    this.container = element;
  }

  // Now we clear the container
  while( this.container.firstChild ){
    this.container.removeChild(this.container.firstChild);
  }

  // We're going to build two divs
  var searchFormDiv = document.createElement( 'div' ); // one for the SearchForm
  var resultsDiv = document.createElement( 'div' ); // and one for the results
  this.resultsDiv = resultsDiv;

  // And append them to our container
  this.container.appendChild( searchFormDiv );
  this.container.appendChild( resultsDiv );

  // Now we build the LocalSearch
  this.localSearch = new google.search.LocalSearch();
  this.localSearch.setCenterPoint( center );

  // Assign it our search complete callback
  this.localSearch.setSearchCompleteCallback( this , LSstaticMapControl.prototype.searchComplete );

  // And build our search form
  this.searchForm = new google.search.SearchForm( true , searchFormDiv );
  this.searchForm.setOnSubmitCallback( this, LSstaticMapControl.prototype.execute );
  this.searchForm.setOnClearCallback( this , LSstaticMapControl.prototype.clear );

}

// This method will handle the results
LSstaticMapControl.prototype.searchComplete = function(){
  // First, we get the results div and results themselves
  var resultsDiv = this.resultsDiv;
  var results = this.localSearch.results;

  // Second, we build and place the new results
  for( var i = 0; i < results.length; i++ ){
    var result = results[i];

    // We're going to use a table, but we'll build it from the inside out
    var infoCell = document.createElement( 'td' );
    infoCell.style.width = '300px';
    infoCell.appendChild( result.html.cloneNode( true ) );
    var mapCell = document.createElement( 'td' );
    mapCell.style.width = '150px';
    var map = document.createElement( 'img' );
    map.src = result.staticMapUrl;
    mapCell.appendChild( map );
    var tr = document.createElement( 'tr' );
    if( i % 2 == 0 ){
      tr.className = 'even'; // just in case you want to style alternating colors :)
      // Now, you can make the even-numbered results a pretty highlight color with this CSS:
      // .even { color: #ff8000; }
      // I love blaze orange!
    }
    tr.appendChild( infoCell );
    tr.appendChild( mapCell );
    var tbody = document.createElement( 'tbody' );
    tbody.appendChild( tr );
    var table = document.createElement( 'table' );
    table.appendChild( tbody );
    result.jResultTable = table;
    resultsDiv.appendChild( table );
  }
}

// This method will execute the search
LSstaticMapControl.prototype.execute = function( query ){
  // First, we clear the old results
  this.clear();

  // Now we have to figure out what the real query is
  if( query.input ){ // If it came from the search form, it will have an input property
    query = query.input.value;
  }

  // Just in case, we'd better coordinate the search form input with this
  this.searchForm.input.value = query;

  // And execute the searcher
  this.localSearch.execute( query );
}

// This method will clear the old stuff out of the way!
LSstaticMapControl.prototype.clear = function(){
  var resultsDiv = this.resultsDiv;
  while( resultsDiv.firstChild ){
    resultsDiv.removeChild( resultsDiv.firstChild );
  }
}

// Finally, we set our onload callback to call OnLoad and get
// the ball rolling!
google.setOnLoadCallback(OnLoad);