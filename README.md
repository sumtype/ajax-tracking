# Ajax Tracking

Script to track Ajax requests on a page to determine when it's done loading.  Provides a function to the global namespace, `callWhenReadyToGo`, that takes a callback function which is called when the window has loaded and there are no pending Ajax requests.

### Known Issues

Doesn't always work when the page involves requests made via some higher-level libraries.  In general, if the request is performed using the `XMLHttpRequest` API and concludes (successfully or not) with an `onreadystatechange` event changing the `readyState` value of the XHR request to the value of `XMLHttpRequest.DONE` the tracker understands the XHR request to no longer be pending.  If `onreadystatechange` is not fired, or `readyState` is not ultimately set to the value of `XMLHttpRequest.DONE` the tracker will indefinitely consider the request to be pending, so will not consider the page to have ever loaded.
