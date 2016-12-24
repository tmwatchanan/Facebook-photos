chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    var htmlSource = request.source;
    message.innerText = htmlSource; //request.source;
    var imgUrls = retrieveImg(htmlSource);
    photoLinks.innerText = imgUrls.toString();
    // var ImgString = "";
    // for (var i in imgUrls) {
    //  ImgString += imgUrls[i] + " ";
    // }
    // photo-links.innerText = ImgString;
  }
});

function onWindowLoad() {

  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}

window.onload = onWindowLoad;

function retrieveImg(strHtml) {
  var el = document.createElement( 'html' );
  el.innerHTML = strHtml;
    var imageTags = el.getElementsByTagName("img"); // Returns array of <img> DOM nodes
    var sources = [];
    for (var i in imageTags) {
     var src = imageTags[i].src;
     sources.push(src);
   }
   return sources;
 }