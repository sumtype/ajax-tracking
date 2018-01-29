'use strict';

// Defines properties on window to avoid additional global variables (except the "callWhenReadyToGo" function).
window._AjaxTracking = {
  XMLHttpRequestTracker: [0],
  XMLHttpRequestOpen: window.XMLHttpRequest.prototype.open,
  windowLoaded: function windowLoaded() {
    window._AjaxTracking.XMLHttpRequestTracker[0] = window.XMLHttpRequest.DONE;
  },
  XMLHttpRequestTrackingCheckFrequency: 100
};

// Overrides the default XMLHttpRequest open() function to track the status of Ajax requests via an array of integers corresponding to .
window.XMLHttpRequest.prototype.open = function() {
  var index = window._AjaxTracking.XMLHttpRequestTracker.slice().length, onReadyStateChange = this.onreadystatechange;
  this.onreadystatechange = function() {
    window._AjaxTracking.XMLHttpRequestTracker[index] = this.readyState;
    if (this.readyState === window.XMLHttpRequest.DONE) window._AjaxTracking.XMLHttpRequestTracker[index] = this.readyState;
    if (onReadyStateChange !== null) onReadyStateChange.apply(this, arguments);
  }
  window._AjaxTracking.XMLHttpRequestOpen.apply(this, arguments);
}

// Sets an event listener to determine when page assets have loaded.
window.addEventListener('load', function() { window._AjaxTracking.windowLoaded(); });

// Function that takes a calls an input function when the window has loaded and there are no pending Ajax requests.
function callWhenReadyToGo(callback) {
  var ajaxTracking = setInterval(function() {
    if (!window._AjaxTracking.XMLHttpRequestTracker.filter(function(n) { return n !== 4; }).length) {
      clearInterval(ajaxTracking);
      callback();
    }
  }, window._AjaxTracking.XMLHttpRequestTrackingCheckFrequency);
}

callWhenReadyToGo(function() { console.log('Loading complete.') });
