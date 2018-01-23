var daak = (function ()
{
    // Define a local copy of "daak"
    var daak = function (selector, context)
    {
        // The daak object is actually just the init constructor 'enhanced'
        var daakObj = new daak.fn.init(selector, context);
        return daakObj;
    };

    daak.elId = 0;
    // var addMethods = function (elem) {
    //     elem.forEach(function (item, inex) {
    //         alert(item)
    //     })
    // }

    //Define daak’s fn prototype, specially contains init method
    daak.fn = daak.prototype = {
        init: function (selector, context)
        {
            if (!selector)
            {
                return this;
            }

            if ( typeof selector === "string" ) {
                if ( selector[ 0 ] === "<" &&
                    selector[ selector.length - 1 ] === ">" &&
                    selector.length >= 3 ) {

                    this[0] = daak.parseHTML(selector);
                }
                else{
                    this[0] = document.querySelectorAll(selector);
                }
            }
            else {
                this[0] = selector;
            }

            if (this[0]){
                // addMethods(this[0]);
                this.length = 1;
            }

            return this;
        }
    };

    // Give the init function the "daak" prototype for later instantiation
    daak.fn.init.prototype = daak.fn;

    daak.parseHTML = function(string) {
        var parser = new DOMParser(),
            content = 'text/html',
            DOM = parser.parseFromString(string, content);

        // return element
        return DOM.body.childNodes[0];
    }

    var run = function (tags) {
        for(var objectName in window){
            var object = window[objectName];
            if(object){
                if(object.render){
                    for(var i = 0; i < tags.length; i++){
                        if(tags[i].tagName == objectName.toUpperCase()) {
                            var daakId = 'daak-' + objectName + '-' + daak.elId.toString();

                            daak[daakId] = daak(object.render);
                            daak[daakId].setAttribute('daak-id', daakId);

                            // window[daak.elId].dom = window[daak.elId];
                            daak[daakId].textChange = object.textChange;

                            var input = daak[daakId].querySelectorAll('input:first-child')[0];
                             // var ev = objectName + '.' + input.getAttribute('onchange') + '(e);'

                            daak(input).addEventListener('keyup', function (e) {
                                // eval(ev);
                                var target = e.target;alert(daak(target).daakElement)
                                daak(target).daakElement[target.getAttribute('onchange')](e);

                                alert(daakId);
                            });

                            input.removeAttribute('onchange');


                            tags[i].parentNode.replaceChild(daak[daakId][0], tags[i]);
                            daak.elId++;
                        }
                    }
                }
            }
        }
    }

    daak.fn.daakElement = function () {
        var elem = this[0];
        while ( ( elem = elem[ "parentNode" ] ) && elem.nodeType !== 9 ) {
            if ( elem.nodeType === 1 ) {
                if ( elem.getAttribute('daak-id') ) {
                    return elem;
                }
            }
        }
    }

    daak.fn.addEventListener = function (type,listener) {
        if (document.addEventListener) {                // For all major browsers, except IE 8 and earlier
            this[0].addEventListener(type, listener);
        } else if (document.attachEvent) {              // For IE 8 and earlier versions
            this[0].attachEvent("on" + type, listener);
        }
    }

    daak.fn.setAttribute = function(name,value){
        this[0].setAttribute(name, value)
    }

    daak.fn.querySelectorAll = function(selector){
        return this[0].querySelectorAll(selector)
    }

    //start daak
    daak(document).addEventListener('DOMContentLoaded', function() {
        run(document.getElementsByTagName('*'));
    });

    // Return "daak" to the global object
    return daak;
})();