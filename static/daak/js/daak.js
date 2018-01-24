var daak = (function ()
{
    // Create local daak
    var daak = function (selector, context) {
        // The daak object is actually just the init constructor 'enhanced'
        var daakObj = new daak.fn.init(selector, context);
        return daakObj;
    };

    var counts = 0;
    const REAL ='real-';

    var isFunction = function isFunction( obj ) {
        return typeof obj === "function" && typeof obj.nodeType !== "number";
    };

    var functionName = function(fn) {
        var f = typeof fn == 'function';
        var s = f && ((fn.name && ['', fn.name]) || fn.toString().match(/function ([^\(]+)/));
        return (!f && 'not a function') || (s && s[1] || 'anonymous');
    }

    daak.functionName = functionName;

    // daak.fn.daakElement = function () {
    //     var elem = this[0];
    //     while ( ( elem = elem[ "parentNode" ] ) && elem.nodeType !== 9 ) {
    //         if ( elem.nodeType === 1 ) {
    //             if ( elem.getAttribute(daakIdAttr) ) {
    //                 return elem;
    //             }
    //         }
    //     }
    // }

    daak.fn = daak.prototype = {
        //Define daak’s fn prototype, specially contains init method
        init: function (selector, context){
            var elem;
            if (!selector)
            {
                return this;
            }

            if ( typeof selector === "string" ) {
                if ( selector[ 0 ] === "<" &&
                    selector[ selector.length - 1 ] === ">" &&
                    selector.length >= 3 ) {

                    elem = daak.parseHTML(selector);
                }
                else{
                    elem = document.querySelectorAll(selector);
                }
            }
            else {
                elem = selector;
            }

            addProperties(elem);

            return elem;
        },

        addEventListener: function (type,listener) {
            if (document.addEventListener) {                // For all major browsers, except IE 8 and earlier
                this[REAL + 'addEventListener'](type, listener);
            } else if (document.attachEvent) {              // For IE 8 and earlier versions
                this.attachEvent("on" + type, listener);
            }
        },

        data: function (name, value) {
            if (!value && value === undefined){
               return this.getAttribute("daak-" + name);
            }
            else{
                this.setAttribute("daak-" + name, value);
            }
        }
    }

    // Give the init function the "daak" prototype for later instantiation
    daak.fn.init.prototype = daak.fn;

    var addProperties = function (elem) {
        // if(!elem.isDaak && elem.isDaak === undefined){
        //     elem.isDaak = true;
        // }
        // else {
        //     return false;
        // }

        for(var propertyName in daak.fn){
            if (propertyName !== 'init') {
                var property = daak.fn[propertyName];

                if (!elem[REAL + propertyName] && elem[REAL + propertyName] === undefined) {
                    if (elem[propertyName]) {
                        elem[REAL + propertyName] = elem[propertyName];
                    }
                    elem[propertyName] = property;
                }
            }
        }
    }

    daak.parseHTML = function(string) {
        var parser = new DOMParser(),
            content = 'text/html',
            DOM = parser.parseFromString(string, content);

        // return element
        return DOM.body.childNodes[0];
    }

    var setId = function (elem) {
        var tags = elem.querySelectorAll('*');
        // var parentId = elem.data('id');
        var ids = {};
        // ids[parentId] = 0;

        for(var i = 0; i < tags.length; i++) {
            var tag = tags[i];
            var parentId = daak(tag.parentNode).data('id');
            // alert(ids[parentId])
            ids[parentId] = ids[parentId] && ids[parentId] !== undefined ? ids[parentId]++ : 0;
            daak(tag).data('id', parentId + '.' + ids[parentId].toString());
        }
    }

    var run = function (tags) {
        for(var objectName in window){
            var object = window[objectName];
            if(object){
                if(object.render){
                    for(var i = 0; i < tags.length; i++){
                        if(tags[i].tagName == objectName.toUpperCase()) {
                            var daakId = '.' + counts.toString();

                            var elem = daak[daakId] = daak(object.render);
                            elem.data('id', daakId);

                            setId(elem);

                            // window[daak.elId].dom = window[daak.elId];
                            // elem.textChange = object.textChange;
                            //
                            var input = elem.querySelectorAll('input:first-child')[0];
                            //  // var ev = objectName + '.' + input.getAttribute('onchange') + '(e);'
                            //
                            daak(input).addEventListener('keyup', function (e) {alert(123)
                            //     // eval(ev);
                            //     var target = e.target;
                            //     var daakId = daak(target).daakElement().getAttribute(daakIdAttr);
                            //     daak[daakId][target.getAttribute('onchange')](e);
                            });
                            //
                            // input.removeAttribute('onchange');


                            tags[i].parentNode.replaceChild(elem, tags[i]);

                            counts++;
                        }
                    }
                }
            }
        }
    }

    //start daak
    daak(document).addEventListener('DOMContentLoaded', function() {
        run(document.getElementsByTagName('*'));
    });

    // Return "daak" to the global object
    return daak;
})();