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
    const DAAK_REGEX = /^{{[\w\.]*}}$/;
    const DAAK_REGEX_MORE = /{{[\w\.]*}}/g;

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

            addFn(elem);

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

    var createRealProperty = function (elem, propertyName) {
        if (!elem[REAL + propertyName] && elem[REAL + propertyName] === undefined) {
            if (elem[propertyName]) {
                elem[REAL + propertyName] = elem[propertyName];
            }
        }
    }

    var addFn = function (elem) {
        for(var propertyName in daak.fn) {
            if (propertyName !== 'init') {
                var property = daak.fn[propertyName];

                createRealProperty(elem, propertyName);

                elem[propertyName] = property;
            }
        }
    }

    var addProperties = function (elem, object) {
        for(var propertyName in object) {
            var property = object[propertyName];

            elem[propertyName] = property;
        }
    }

    daak.parseHTML = function(string) {
        var parser = new DOMParser(),
            content = 'text/html',
            DOM = parser.parseFromString(string, content);

        // return element
        return DOM.body;
    }

    var addEvents = function (elem) {
        var attributes = elem.attributes;
        for(var i = 0; i < attributes.length; i++) {
            var attribute = attributes[i];
            var attributeName = attribute.name;
            var attributeValue = attribute.value;

            if (attributeValue.match(DAAK_REGEX_MORE)){
                if (attributeName[0] + attributeName[1] === 'on') {
                    if (!attributeValue.match(DAAK_REGEX)){
                        console.log("daak -> Event only one match!? '<" + elem.tagName + ' ' +  attributeName + '=' + attributeValue + " ...'");
                        continue;
                    }

                    var eventName = attributeName.substr(0, attributeName.length);
                    var eventPerfectName = attributeName.substr(2, attributeName.length);
                    var eventValue = attributeValue.substr(2, attributeValue.length - 4);
                    elem.data(eventPerfectName, eventValue);
                    elem.removeAttribute(eventName)

                    elem.addEventListener(eventPerfectName, function (e) {
                        var target = daak(e.target);
                        var event = target.data(e.type);
                        var targetId = target.data('id');
                        var parentId = targetId.substr(0, 2);

                        if(event.indexOf('this.') == 0){
                            event = event.split('.')[1];
                            daak[parentId][event](e);

                            return false;
                        }

                        eval(event + '(e)');
                    })
                }
            }
        }
    }

    var traceTag = function (elem) {
        var tags = elem.querySelectorAll('*');
        // var parentId = elem.data('id');
        var ids = {};
        // ids[parentId] = 0;

        for(var i = 0; i < tags.length; i++) {
            var tag = daak(tags[i]);
            //--add id ------------------------
            var parentId = daak(tag.parentNode).data('id');

            ids[parentId] = !ids[parentId] && ids[parentId] === undefined ? 0 : ids[parentId];
            ids[parentId]++;

            tag.data('id', parentId + '.' + ids[parentId].toString());
            //---------------------------------

            addEvents(tag);
        }
    }

    var render = function () {
        
    }

    var run = function (tags) {
        for(var objectName in window){
            var object = window[objectName];
            if(object){
                if(object.render){
                    for(var i = 0; i < tags.length; i++) {
                        if(tags[i].tagName == objectName.toUpperCase()) {
                            var daakId = '.' + counts.toString();

                            var elem = daak[daakId] = daak(tags[i]);
                            elem.data('id', daakId);
                            elem.data('class', objectName);

                            elem.appendChild(daak(object.render));

                            traceTag(elem);

                            addProperties(elem, object);

                            // tags[i].parentNode.replaceChild(elem, tags[i]);

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