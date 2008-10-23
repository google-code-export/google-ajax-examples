google.load("language", "1");

function initialize() {
  var text = '你好，很高興見到你。';
  google.language.detect(text, function(result) {
    if (!result.error && result.language) {
      google.language.translate(text, result.language, "en", function(result) {
        var translated = document.getElementById("content");
        if (result.translation) {
          translated.innerHTML = result.translation;
        }
      });
    }
  });
}
google.setOnLoadCallback(initialize);