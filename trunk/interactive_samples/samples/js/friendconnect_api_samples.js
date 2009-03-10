var tempJSON = [
  {
    "category":"Friend Connect",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/friendconnect/requestingdata.html", "files":["samples/js/friendconnect/fetchPerson.js"], "sampleName":"Fetch Person", "tags": "", "docsUrl":"http://code.google.com/apis/opensocial/articles/datarequests/datarequests-0.8.html#fetchPerson"},
      {"boilerplateLoc":"samples/boilerplateHTML/friendconnect/requestingdata.html", "files":["samples/js/friendconnect/signInSignOut.js"], "sampleName":"Sign-in Sign-out", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/friendconnect/requestingdata.html", "files":["samples/js/friendconnect/fetchFriends.js"], "sampleName":"Fetch Friends", "docsUrl":"http://code.google.com/apis/opensocial/articles/datarequests/datarequests-0.8.html#fetchPeople"},
      {"boilerplateLoc":"samples/boilerplateHTML/friendconnect/requestingdata.html", "files":["samples/js/friendconnect/setAppData.js"], "sampleName":"Set Persistent App Data", "docsUrl":"http://code.google.com/apis/opensocial/articles/datarequests/datarequests-0.8.html#updateData"},
      {"boilerplateLoc":"samples/boilerplateHTML/friendconnect/requestingdata.html", "files":["samples/js/friendconnect/fetchUserActivities.js"], "sampleName":"Fetch User Activities", "docsUrl":"http://code.google.com/apis/opensocial/articles/datarequests/datarequests-0.8.html#fetchActivities"},
      {"boilerplateLoc":"samples/boilerplateHTML/friendconnect/requestingdata.html", "files":["samples/js/friendconnect/listSupportedFields.js"], "sampleName":"Find Supported Person Fields"}
    ]
  },
  {
    "category":"Friend Connect-Tutorial",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/friendconnect/fetchSiteInfo.html", "files":["samples/js/friendconnect/fetchSiteInfo.js"], "sampleName":"Fetch Site Info", "tags": "", "docsUrl":"http://code.google.com/apis/friendconnect/articles/inpage_integration.html"},
      {"boilerplateLoc":"samples/boilerplateHTML/friendconnect/fetchMemberInfo.html", "files":["samples/js/friendconnect/fetchMemberInfo.js"], "sampleName":"Add Member Info", "tags": "", "docsUrl":"http://code.google.com/apis/friendconnect/articles/inpage_integration.html"},
      {"boilerplateLoc":"samples/boilerplateHTML/friendconnect/controlsForUser.html", "files":["samples/js/friendconnect/controlsForUser.js"], "sampleName":"Add User Controls", "tags": "", "docsUrl":"http://code.google.com/apis/friendconnect/articles/inpage_integration.html"}
    ]
  }
];


if (typeof codeArray != 'undefined' && codeArray.length) {
  codeArray = codeArray.concat(tempJSON);
  delete tempJSON;
} else {
  window.codeArray = tempJSON;
  delete tempJSON;
}
