// Facebook checks if events generated by the extension have the "isTrusted" attribute.
// This proxies the events to make sure that they do.
// After all, collecting ad info is what our users installed the extension to do...
// and they control their data.

export const DEBUG =
  process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "development";

var trust = `
let onThePage;

if (!onThePage) {

  let onThePage = 1;

  let listeners = new WeakMap();

  // We forge fn.toString() and fn.toString().toString() because those are two
  // easy ways to identify that a built-in function has been replaced with extension JS
  var cloakToString = function (target, original) {
    target.toString = function toString () {
      return original.toString();
    };

    target.toString.toString = function toString () {
      return original.toString().toString();
    };
  };

  // Simplifies all the logic of cleanly replacing a built-in function with a custom one.
  var replaceMethod = function (target, name, newValue) {
    var oldValue = target[name];
    if (!oldValue) return oldValue;

    cloakToString(newValue, oldValue); // JBFM turned this of
    target[name] = newValue;
    return oldValue;
  };

  var document_addEventListener = window.Document.prototype.addEventListener;
  var element_addEventListener = window.Element.prototype.addEventListener;

  var element_removeEventListener = window.Element.prototype.removeEventListener;
  var document_removeEventListener = window.Document.prototype.removeEventListener;

  // Filter all the primary mouse events that fb is likely to be using
  var snoopedEvents = [
    // "mousedown", "mousemove", "mouseup", "mouseover",
    "click"
  ];

  // Take the original mouse event, create a proxy handler, then wrap it in a proxy.
  function makeCustomMouseEvent (originalEvent) {
    if (originalEvent.target.getAttribute("aria-label") == "Story options" &&
      originalEvent.target.getAttribute("data-testid") == "post_chevron_button" &&
      originalEvent.target.getAttribute("aria-haspopup") == "true" &&
      originalEvent.target.getAttribute("rel") == "toggle"
    ) {
      var handler = new filteredMouseEventProxyHandler();
      var result = new Proxy(originalEvent, handler);
      return result;
    } else {
      return originalEvent;
    }
  };

  // The proxy handler accepts an event along with a list of properties to replace.
  function filteredMouseEventProxyHandler (customProperties) {
    var cp = new Map(customProperties);
    // We always want to be trusted
    cp.set("isTrusted", true);
    cp.set("which", 1); // left button
    cp.set("button", 0); // left button
    cp.set("mozInputSource", 1) // this is a mouse click, not a pen or whatever.
    this.customProperties = cp;
  };

  // This proxy trap handlers reads of properties from the event object.
  filteredMouseEventProxyHandler.prototype.get = function (target, property, receiver) {
    try {
      // If we have an override for the property we return it here, otherwise...
      if (this.customProperties.has(property)) {
        return this.customProperties.get(property);
      }
      // We delegate to the original object.
      if (target[property] && target[property].bind) {
        return target[property].bind(target)
      }
      return target[property];
    } catch (exc) {
      // Don't propagate errors out into third party code.
      if (${DEBUG}) console.error("error in get", property, exc);
    }
    return target[property];
  };

  function wrapMouseEventListener (evtType, listener) {
    switch (evtType) {
      // case "mousedown":
      // case "mousemove":
      // case "mouseup":
      case "click":
        return function (evt) {
          var filtered = makeCustomMouseEvent(evt);
          try {
            listener.call(this, filtered);
          } catch (exc) {
            if (${DEBUG}) console.error("error in wrap", filtered, exc);
          }
          return false;
        };
    }

    return listener;
  };

  var newDocumentAddEventListener = function (evtType, _listener, options) {
    var listener = _listener;
    if (options) options["passive"] = false;
    // We wrap their event listeners in our custom one when necessary then
    // forward on to the built-in addEventListener.
    try {
      if (snoopedEvents.indexOf(evtType) >= 0) {
        listener = wrapMouseEventListener(evtType, _listener);
        listeners[_listener] = listener;
      }
    } catch (exc) {
      if (${DEBUG}) console.error("error in newDocumentAddEventListener", listener, exc);
    }

    var result = document_addEventListener.call(this, evtType, listener, options);

    return result;
  };

  var newElementAddEventListener = function (evtType, _listener, options) {
    var listener = _listener;
    if (options) options["passive"] = false;
    try {
      if (snoopedEvents.indexOf(evtType) >= 0) {
        listener = wrapMouseEventListener(evtType, _listener);
        listeners[_listener] = listener;
      }
    } catch (exc) {
      if (${DEBUG}) console.error("error in newElementAddEventListener", listener, exc);
    }

    var result = element_addEventListener.call(this, evtType, listener, options);

    return result;
  };

  var newElementRemoveEventListener = function(evtType, _listener, options) {
    var our_listener = listeners[_listener] || _listener;
    element_removeEventListener.call(this, evtType, our_listener, options);
  }

  var newDocumentRemoveEventListener = function(evtType, _listener, options) {
    var our_listener = listeners[_listener] || _listener;
    document_removeEventListener.call(this, evtType, our_listener, options);
  }

  replaceMethod(window.Document.prototype, "addEventListener", newDocumentAddEventListener);
  replaceMethod(window.Element.prototype, "addEventListener", newElementAddEventListener);

  replaceMethod(window.Document.prototype, "removeEventListener", newDocumentRemoveEventListener);
  replaceMethod(window.Element.prototype, "removeEventListener", newElementRemoveEventListener);
}
`;

var script = document.createElement("script");
var code = document.createTextNode(trust);
script.appendChild(code);
document.documentElement.appendChild(script);
script.remove();
