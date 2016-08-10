# timelight.js - Time-triggered highlighting of HTML

This JavaScript plugin works with HTML5 and pure JavaScript. It is based on the use of `data-*` attributes in the HTML5 document whose elements shall be highlighted. The plugin does not require any framework. However, it relies on modern browser's HTML5 capabilities (like `document.querySelectorAll()`), so there can be problems in older browser versions. 

## Specific requirements for the HTML document

The document structure of the HTML document is completely independent of the plugin. Any HTML5 document can be the basis for the highlighting, but it has to contain additional statements and plugin-specific attributes that provide information on the temporal correspondence between a media file and the HTML elements that shall be highlighted during the progress of the media playing.

**Include plugin:** in the HTML's head the source code of the plugin has to be included by either giving a reference to the file (`<script type="text/javascript" src="timelight-0.1.js"></script>`) or better including the code directly.<br/>
**Identify media element:** The media element (HTML5 audio or video) must contain an attribute `data-tlid="media"`<br/>
**Define time spans:** the plugin comes into play only if there are definitions on HTML elements that state the intended highlighting time span, e.g. `<p data-tl="0.0-2.7">`. The attribute value represents seconds as data type double that have to match this regex: [0-9]+(\.[0-9]+)? 

## How the plugin works

**General:**<br/>
The plugin is loaded by including the source code in the HTML file (see above). It comes into play after the HTML has been loaded (excluding dynamic content, e.g. from other plugins) using `window.onload = function () { }`. 
After identifying the media element (see above), the plugin iterates over all elements with the attribute `data-tl` and builds an array (reverse index) that holds the information which elements shall be highlighted at which point in time. The individual array items' positions represent the centiseconds and their values contain arrays of IDs (data-tl values):

```javascript
times = [ 
  [e0, e1], /*centisecond 0: highlight e0 and e1*/
  [e0, e1], /*centisecond 1: highlight e0 and e1*/
  [e1],     /*centisecond 2: highlight e1*/
  [e1]      /*centisecond 3: highlight e1*/
] 
```

In addition to the building of the reverse index, an array is built keeping the original background colors of the highlighted elements, and an event listener "timeupdate" is registered for the media element. By this means an action is performed every time the media is updated (i.e. during playing the media). The action contains highlighting of elements whose data-tl time span corresponds to the currenttime of the media element and de-highlighting of elements which do not correspond  to the currenttime of the media element anymore.

**Accuracy:**<br/>
JavaScript captures time updates of the played media with an accuracy of about 0.25sec which to a minor extent depends on the client's machine. This means that the highlighting cannot be more accurate than +-0.25sec of the actually defined period, and time spans below a length of ~0.25sec might not be highlighted at all 