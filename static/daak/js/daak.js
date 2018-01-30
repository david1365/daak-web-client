var daak = (function ()
{
    // Create local daak
    var daak = function (selector, context) {
        // The daak object is actually just the init constructor 'enhanced'
        var daakObj = new daak.fn.init(selector, context);
        return daakObj;
    };

    var counts = 0;
    const DAAK_PATTERN = 'daak-Pattern';
    const REAL ='real-';
    const DAAK_REGEX = /^{{[\w\.\t\r\n\s\+\*\"\'\-\*\\\/\%\|\&\^\$\@\!\=\)\(\~]*}}$/;
    const DAAK_REGEX_MORE = /{{[\w\.\t\r\n\s\+\*\"\'\-\*\\\/\%\|\&\^\$\@\!\=\)\(\~]*}}/g;

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

            if (typeof selector === "string") {
                if ( selector[0] === "<" &&
                    selector[selector.length - 1] === ">" &&
                    selector.length >= 3 ) {

                    elem = daak.parseHTML(selector);
                }
                else if (selector[0] === '#') {
                    elem = document.getElementById(selector.substr(1, selector.length - 1));
                }
                else if (selector[0] === '~') {
                    var id = selector.substr(1, selector.length - 1);
                    elem = document.querySelectorAll("[daak-id='" + id + "']")[0];
                }
                else {
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
    
    var object2array = function (event, parentId) {
        var eventPart = event.split('.');
        var arrayPattern = '';

        eventPart.forEach(function (item, index) {
            if (item == 'this') {
                arrayPattern += "daak['" + parentId + "']";
            }
            else {
                arrayPattern += index === 0 ? item : "['" + item + "']";
            }
        })

       return arrayPattern;
    }

    var pickValue = function (value) {
        return value.substr(2, value.length - 4);
    }

    var pickParentId = function (id) {
        return id.substr(0, 2);
    }

    var handleEvents = function (elem, attributeName, attributeValue) {
        if (!attributeValue.match(DAAK_REGEX)){
            throw ("daak -> Event only one match!? '<" + elem.tagName + ' ' +  attributeName + '=' + attributeValue + " ...'");
        }

        var eventName = attributeName;/*.substr(0, attributeName.length);*/
        var eventPerfectName = attributeName.substr(2, attributeName.length);
        var eventValue = pickValue(attributeValue);

        daak[elem.data('id')][eventPerfectName] =  eventValue;

        elem.addEventListener(eventPerfectName, function (e) {
            var target = daak(e.target);
            var targetId = target.data('id');
            var parentId = pickParentId(targetId);
            var event = daak[targetId][e.type];

            var arrayPattern = object2array(event, parentId);
            var eventString =  arrayPattern + '(e);';

            eval(eventString);

            handlePatterns();
        })
    }

    handlePatterns = function () {
        var patterns = daak[DAAK_PATTERN];
        for(var elemId in patterns){
            var elem = daak("~" + elemId);
            for(var attributeName in patterns[elemId]){
                var attributeValue = patterns[elemId][attributeName];
                handleOtherAttributes(elem, attributeName, attributeValue);
            }
        }
    }

    handleOtherAttributes = function (elem, attributeName, attributeValue) {
        if (!daak[DAAK_PATTERN][elem.data('id')][attributeName] && daak[DAAK_PATTERN][elem.data('id')][attributeName] === undefined) {
            daak[DAAK_PATTERN][elem.data('id')][attributeName] = attributeValue;
        }

        var attrValue = daak[DAAK_PATTERN][elem.data('id')][attributeName];
        var targetId = elem.data('id');
        var parentId = pickParentId(targetId);
        var matches = attrValue.match(DAAK_REGEX_MORE);

        matches.forEach(function (item, index) {
            var newItem = item.replace('this', "daak['" + parentId + "']");
            newItem = eval(pickValue(newItem));

            attrValue = attrValue.replace(item, newItem);
        });

        elem.setAttribute(attributeName, attrValue);
    }

    var handleAttributes = function (elem) {
        var attributes = elem.attributes;
        daak[elem.data('id')] = {};
        daak[DAAK_PATTERN][elem.data('id')] = {};
        var removeAttributes = {};

        for(var i = 0; i < attributes.length; i++) {
            var attribute = attributes[i];
            var attributeName = attribute.name;
            var attributeValue = attribute.value;

            if (attributeValue.match(DAAK_REGEX_MORE)){

                if (attributeName[0] + attributeName[1] === 'on') { // is event
                    handleEvents(elem, attributeName, attributeValue);
                    removeAttributes[attributeName] = true;
                }
                else {
                    handleOtherAttributes(elem, attributeName, attributeValue);
                }
            }
        }

        //TODO : Selection best Algorithm for remove attributes
        for(var name in removeAttributes){
            elem.removeAttribute(name);
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

            handleAttributes(tag);
        }
    }

    var render = function () {
        
    }

    var run = function (tags) {
        daak[DAAK_PATTERN] = {};

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
                            addProperties(elem, object);

                            traceTag(elem);

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