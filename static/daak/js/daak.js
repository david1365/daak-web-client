var daak = (function ()
{
    // Define a local copy of "daak"
    var daak = function (selector, context)
    {
        // The daak object is actually just the init constructor 'enhanced'
        var daakObj = new daak.fn.init(selector, context);
        return daakObj;
    };

    //Define daak’s fn prototype, specially contains init method
    daak.fn = daak.prototype = {
        init: function (selector, context)
        {
            if (!selector)
            {
                return this;
            }
            if (typeof selector == 'string') {
                if (selector.startsWith("<")) {
                    daak.htmlDom(selector)
                }
                else{
                    return document.querySelectorAll(selector);
                }
            }
            else {
                return selector;
            }
        }
    };

    // Give the init function the "daak" prototype for later instantiation
    daak.fn.init.prototype = daak.fn;

    daak.htmlDom = function(string) {
        var parser = new DOMParser(),
            content = 'text/html',
            DOM = parser.parseFromString(string, content);

        // return element
        return DOM.body.childNodes[0];
    }

    daak.fn.addEventListener = function (type,listener) {
        if (document.addEventListener) {                // For all major browsers, except IE 8 and earlier
            daak(this).addEventListener(type, listener);
        } else if (document.attachEvent) {              // For IE 8 and earlier versions
            daak(this).attachEvent("on" + type, listener);
        }
    }

    // Return "daak" to the global object
    return daak;
})();