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

google.load("language", "1");
google.load("search", "1");

google.setOnLoadCallback(initialize);

function initialize() {
  _IG_FetchContent('http://google-ajax-examples.googlecode.com/svn/trunk/translationgame/allNouns.json', function (responseText) {
    eval(responseText);
    var translation_game = new TranslationGame(nouns);
    GSearch.getBranding(_gel('branding'));
  });
}

function PreloadedWord(showPics) {
  this.noun = null;
  this.answer = null;
  this.images = null;
  this.showPics = showPics;
  this.doneLoading = false;
}

PreloadedWord.prototype.setNoun = function(noun) {
  this.noun = noun.toLowerCase();
  this.doneLoading = this.checkDone();
}

PreloadedWord.prototype.setAnswer = function(answer) {
  this.answer = answer;
  this.doneLoading = this.checkDone();
}

PreloadedWord.prototype.setImages = function(images) {
  this.images = images;
  this.doneLoading = this.checkDone();
}

PreloadedWord.prototype.checkDone = function() {
  if(this.noun && this.answer && this.showPics && this.images) {
    return true;
  }

  if(this.noun && this.answer && !this.showPics) {
    return true;
  }

  return false;
}

function TranslationGame(nouns) {
  this.prefs = new _IG_Prefs();
  this.showPics = this.prefs.getBool("show_pictures");
  this.currentWord = null;
  this.answer = null;
  this.timePerQuestion = 15000; // 15 seconds per question
  this.timeToFlashCorrect = 1000; // 1/10 of a second
  this.numWordsToPreload = 10;
  this.preloadedWords = [];
  this.nouns = nouns;
  this.langpair = _gel("langpair").value.split('|');
  this.scoreEl = _gel('score');

  if(this.showPics) {
    _gel('fieldsetId').style.display = 'block';
  } else {
    _IG_AdjustIFrameHeight();
  }
  
  this.setupInputListeners();
  this.initPreLoader();
  this.initNewNoun();
}

TranslationGame.prototype.initPreLoader = function() {
  for(var i = 0; i < this.numWordsToPreload; i++) {
    this.preloadedWords.push(this.preloadWord());
  }
}

TranslationGame.prototype.preloadWord = function() {
  var newPreloadWord = new PreloadedWord(this.showPics);
  var noun = this.grabRandomNoun();
  this.translate(this.langpair[0], this.langpair[1], newPreloadWord, noun);
  if(this.showPics) {
    this.grabImageURLs(newPreloadWord, noun);
  }
  return newPreloadWord;
}

TranslationGame.prototype.addEvent = function(elm, evType, fn, useCapture) {
  if (elm.addEventListener) {
    elm.addEventListener(evType, fn, useCapture);
    return true;
  }
  else if (elm.attachEvent) {
    var r = elm.attachEvent('on' + evType, fn);
    return r;
  }
  else {
    elm['on' + evType] = fn;
  }
}

TranslationGame.prototype.setupInputListeners = function() {
  var input = _gel('user_answer');
  var self = this;
  this.addEvent(input, 'keydown', function(event) {
    if(event.keyCode == 13) {
      self.initNewNoun();
      self.increaseTotalWordsTried();
   }
  }, false);
  this.addEvent(input, 'keyup', this.inputClosure(self, input), false);
  
  var nextClicker = _gel('next_clicker');
  this.addEvent(nextClicker, 'click', function() {
    self.initNewNoun();
    self.increaseTotalWordsTried();
  }, false);
  
  var langpairSelector = _gel("langpair");
  this.addEvent(langpairSelector, 'change', function() {
    self.langpair = langpairSelector.value.split('|');
    self.preloadedWords = [];
    self.initPreLoader();
    self.initNewNoun();
  }, false);

  var cheatClicker = _gel('cheat_clicker');
  this.addEvent(cheatClicker, 'click', function() {
    input.value = self.answer;
    self.correctWord(self);
  }, false);
}

TranslationGame.prototype.increaseTotalWordsTried = function() {
  var score = this.scoreEl.innerHTML.split('/');
  score[1]++;
  this.scoreEl.innerHTML = score.join('/');
}

TranslationGame.prototype.increaseTotalWordsCorrect = function() {
  var score = this.scoreEl.innerHTML.split('/');
  score[0]++;
  this.scoreEl.innerHTML = score.join('/');
}

TranslationGame.prototype.correctWord = function(self) {
  var userAnswer = _gel('user_answer');
  var userAnswerFieldset = _gel('user_answer_fieldset');
  
  userAnswerFieldset.style.border = '1px solid #00FF00';
  for(i in userAnswerFieldset.childNodes) {
    if(userAnswerFieldset.childNodes[i].tagName == 'LEGEND') {
      userAnswerFieldset.childNodes[i].innerHTML = 'Correct';
    }
  }
  
  userAnswer.disabled = true;
  self.increaseTotalWordsCorrect();
  self.increaseTotalWordsTried();
  window.setTimeout(function(){
    self.initNewNoun();
  }, self.timeToFlashCorrect);
  
}

TranslationGame.prototype.inputClosure = function(self, input) {
  return function() {
    var userAnswerFieldset = _gel('user_answer_fieldset');
    
    if(input.value.toLowerCase() == self.answer.toLowerCase()) {
      self.correctWord(self);
    } else {
      userAnswerFieldset.style.border = '1px solid red';
      for(i in userAnswerFieldset.childNodes) {
        if(userAnswerFieldset.childNodes[i].tagName == 'LEGEND') {
          userAnswerFieldset.childNodes[i].innerHTML = 'Incorrect';
        }
      }
    }

    return false;
  }
}

TranslationGame.prototype.initNewNoun = function() {
  var gotNewNoun = false;
  if(this.preloadedWords) {
    for (var i=0; i < this.preloadedWords.length; i++) {
      if(this.preloadedWords[i].doneLoading == true) {        
        var preloadWordObject = this.preloadedWords[i];
        this.preloadedWords.splice(i, 1);
        gotNewNoun = true;
        this.preloadedWords.push(this.preloadWord());
        this.answer = preloadWordObject.answer;
        this.displayWords(preloadWordObject);
        if(this.showPics) {
          this.displayPictures(preloadWordObject);
          _IG_AdjustIFrameHeight();
        }
        this.clearNoun();
        break;
      }
    }
  }
  if(!gotNewNoun) {    
    var self = this;
    setTimeout(function() {self.initNewNoun()}, 100);
  }
}

TranslationGame.prototype.displayWords = function(wordObject) {
  var wordsDiv = _gel('words');
  var toLanguage = _gel('langpair');
  toLanguage = toLanguage.options[toLanguage.selectedIndex].innerHTML.split(' to ');
  wordsDiv.innerHTML = 'What is "<span style="font-size:12px;background-color:yellow;">' + wordObject.noun + '</span>" in ' + toLanguage[1] + '?';
}

TranslationGame.prototype.displayPictures = function(wordObject) {
  var picturesDiv = _gel('pictures');
  picturesDiv.innerHTML = '';
  picturesDiv.appendChild(wordObject.images);
}

TranslationGame.prototype.grabRandomNoun = function() {
  var randomEntry = Math.floor(Math.random()*(this.nouns.length-1));
  return this.nouns[randomEntry];
}

TranslationGame.prototype.translate = function(src, dest, preloadWord, noun) {
  if(src != 'en') {
    google.language.translate(noun, 'en', src, this.translateResult('src', preloadWord));
  } else {
    preloadWord.setNoun(noun);
  }
  if(dest != 'en') {
    google.language.translate(noun, 'en', dest, this.translateResult('dest', preloadWord));
  } else {
    preloadWord.setAnswer(noun);
  }

  return false;
}

TranslationGame.prototype.translateResult = function(storeAs, preloadWord) {
  return function(result) {
    if(storeAs == 'src') {
      preloadWord.setNoun(result.translation);
    } else {
      preloadWord.setAnswer(result.translation);
    }
  }
}

TranslationGame.prototype.clearNoun = function() {
  // Clear the legend
  var userAnswerFieldset = _gel('user_answer_fieldset');
  userAnswerFieldset.style.border = '1px solid black';
  for(i in userAnswerFieldset.childNodes) {
    if(userAnswerFieldset.childNodes[i].tagName == 'LEGEND') {
      userAnswerFieldset.childNodes[i].innerHTML = 'Answer';
    }
  }
  
  // Clear the user answer
  var userAnswer = _gel('user_answer');
  userAnswer.disabled = false;
  userAnswer.value = '';
  userAnswer.focus();
}

TranslationGame.prototype.grabImageURLs = function(preloadWord, noun) {
  var searcher = new google.search.ImageSearch();
  searcher.setRestriction(GimageSearch.RESTRICT_IMAGESIZE,
                          GimageSearch.IMAGESIZE_SMALL);
  searcher.setResultSetSize(google.search.Search.LARGE_RESULTSET);
  searcher.setSearchCompleteCallback(this, TranslationGame.prototype.searchComplete, [searcher, preloadWord]);
  searcher.execute(noun);
}

TranslationGame.prototype.searchComplete = function(searcher, preloadWord) {
  if (searcher.results && searcher.results.length > 0) {
    var images = document.createElement('div');
    var center = document.createElement('center');
    for (var i = 0; i < searcher.results.length; i++) {
      var result = searcher.results[i];
      var newImage = document.createElement('img');
      
      newImage.src = result.unescapedUrl;
      if(i == 4) {
        center.appendChild(document.createElement('br'));
      }
      center.appendChild(newImage);
    }
    images.appendChild(center);
    preloadWord.setImages(images);
  }
  searcher.clearResults();
}