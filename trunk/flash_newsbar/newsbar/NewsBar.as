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

package newsbar {
  import flash.events.MouseEvent;

import flash.events.TimerEvent;
import flash.net.navigateToURL;
import flash.net.URLRequest;
import flash.utils.Timer;
import mx.containers.HBox;
import mx.controls.Label;
import mx.core.Application;
import mx.effects.Fade;
import mx.events.ResizeEvent;
import mx.rpc.events.ResultEvent;
import mx.rpc.events.FaultEvent;
import mx.rpc.http.HTTPService;


import com.adobe.serialization.json.JSON;

/**
 * News ticker, cycles through news headlines based on keywords using AJAX
 * Search API.
 *
 * @author vadims@google.com (Vadim Spivak)
 */
public class NewsBar {

  private var keywords:/*String*/Array;
  private var currentKeyword:Number;
  private var results:/*Object*/Array;
  private var currentResult:Number;
  private var currentLink:String
  private var timer:Timer;
  private var keywordLabel:Label;
  private var sourceLabel:Label;
  private var headlineLabel:Label;
  private var fade:Fade;

  /**
   * Creates a new NewsBar with the given keywords and UI components.
   * @param expression comma seperated keywords.
   * @param keywordLabel keyword label.
   * @param sourceLabel headline source label.
   * @param headlineLabel headline label.
   */
  public function NewsBar(expression:String, keywordLabel:Label,
      sourceLabel:Label, headlineLabel:Label) {

    this.keywordLabel = keywordLabel;
    this.sourceLabel = sourceLabel;
    this.headlineLabel = headlineLabel;

    keywords = expression.split(',');
    results = new Array(keywords.length);

    fade = new Fade();
    fade.alphaFrom = 0.0;
    fade.alphaTo = 1.0;
    fade.duration = 500;

    currentKeyword = 0;
    currentResult = 0;

    this.headlineLabel.addEventListener(MouseEvent.CLICK, onHeadlineClick);
    showNextResult();

    var self:NewsBar = this;

    timer = new Timer(5000, 0);
    timer.addEventListener(TimerEvent.TIMER,
        function(event:TimerEvent):void {
          self.showNextResult();
        }
    );
    timer.start();
  }

  /**
   * Pause the news bar ticker.
   */
  public function pause():void {
    timer.stop();
  }

  /**
   * Play/resume the news bar ticker.
   */
  public function play():void {
    timer.start();
  }

  /**
   * Show the next news headline by cycling through the keywords if necessary.
   */
  private function showNextResult():void {
    var result:Object = results[currentKeyword];
    // Check if the results have been cached already.
    if (result) {
      // Check if we're done with the current keyword, so we can move on to the
      // next one.
      if (currentResult == result.length) {
        currentResult = 0;
        currentKeyword = (currentKeyword + 1) % keywords.length;
        showNextResult();
      } else {
        renderCurrentResult();
        currentLink = results[currentKeyword][currentResult].unescapedUrl;
        // Bump up the result index, keyword index and overflow gets updated
        // above.
        currentResult++;
      }
    } else {
      fetchCurrentKeyword();
    }
  }

  /**
   * Display the current new headline.
   */
  private function renderCurrentResult():void {
    var keyword:String = keywords[currentKeyword];
    var result:Object = results[currentKeyword][currentResult];

    keywordLabel.text = keyword;
    sourceLabel.text = result.publisher + " -";
    headlineLabel.htmlText = result.titleNoFormatting;

    // need to set text property so truncateToFit will work
    headlineLabel.validateNow();
    headlineLabel.text = headlineLabel.text;
    fade.play([sourceLabel, headlineLabel]);
  }

  /**
   * Fetch the current keyword results using the AJAX Search API.
   */
  private function fetchCurrentKeyword():void {
    var service:HTTPService = new HTTPService();

    service.url = 'http://ajax.googleapis.com/ajax/services/search/news';
    service.request.v = '1.0';
    service.request.rsz = 'small';
    service.request.key = 'notsupplied-flash-newsbar';
    service.request.q = keywords[currentKeyword];
    service.resultFormat = 'text';
    service.useProxy = false;

    service.addEventListener(ResultEvent.RESULT, onServerResponse);
    service.send();
  }

  /**
   * Handle the server response when the keyword results are returned.
   * @param event
   */
  private function onServerResponse(event:ResultEvent):void {
    try {
      var o:Object = JSON.decode(event.result as String);
      results[currentKeyword] = o.responseData.results;
      showNextResult();
    } catch(ignored:Error) {      
    }
  }

  /**
   * Handle the headline click event by opening the requested URL.
   * @param event
   */
  private function onHeadlineClick(event:MouseEvent):void {
    var request:URLRequest = new URLRequest(currentLink);
    navigateToURL(request, "_self");
  }
}

}
