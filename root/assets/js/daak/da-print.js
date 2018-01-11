/**
 * Created by david on 11/13/2016.
 */

;(function( $, window, document, undefined ) {

    $.document = {
        a4_portrait: 'da-a4-portrait-canvas',
        a4_landscape: 'da-a4-landscape-canvas',
        a5_portrait: 'da-a5-portrait-canvas',
        a5_landscape: 'da-a5-landscape-canvas'
    }

    var mm1 = 3.779528; //1mm = 3.779528px

    //$.fn.mouseScrolling = function(fun){


    /*$.fn.zoom = function (zoomValue) {
        $(this).css('transform', 'scale( '+  zoomValue.toString() + ',' +  zoomValue.toString() + ')');
    }

    $.fn.transformOrigin = function (x, y) {
        $(this).css('transform-origin:', x.toString() + ' ' + y.toString());
    }*/

    $.createPrintModal = function () {
       // var zoomInUnit = 1;
        //var zoomOutUnit = 0.2;

        $.doPrint = false;
        var autoPrint = false;

        var documents = '.da-a4-portrait, .da-a4-landscape, .da-a5-portrait, .da-a5-landscape';
        var printables = '.da-a4-portrait-canvas,.da-a4-landscape-canvas, .da-a5-portrait-canvas, .da-a5-landscape-canvas';

        var modal =  $.createModal();
        modal.addClass('da-print-modal');

        var printContainer = $('<div class="da-print-container"></div>');
        printContainer.addClass('no-select ');

        var printButton = $.createButton('glyphicon glyphicon-print', $.msg.PRINT);
        //var zoomInButton = $.createButton('glyphicon glyphicon-zoom-in', 'بزرگ نمایی');
        //var zoomOutButton = $.createButton('glyphicon glyphicon-zoom-out','کوجک نمایی');

        modal.dialog.attr("class", "modal-dialog da-height-100  modal-lg da-print-width-100");
        modal.content.addClass("da-height-100");
        modal.closeButton.after(printButton);
        //printButton.after(zoomInButton);
        //zoomInButton.after(zoomOutButton);
//-------------------------------------
        function getDocumentPadding(element) {
            var a5PaddingMM = 4;
            var a4PaddingMM = 5;

            var a5PaddingPX = a5PaddingMM * mm1;
            var a4PaddingPX = a4PaddingMM * mm1;

            if ($(element).hasClass('da-a4-portrait') || $(element).hasClass('da-a4-landscape')){
                return a4PaddingPX;
            }
            else if ($(element).hasClass('da-a5-portrait') || $(element).hasClass('da-a5-landscape')){
                return a5PaddingPX;
            }

            return null;
        }
//--------------------------------------
        function createCanvas(documentDimension) {
            var canvas = document.createElement('canvas');

            if ((documentDimension.cssClass == $.document.a4_landscape)){
                canvas.width = documentDimension.height * mm1;
                canvas.height = documentDimension.width *  mm1;
            }
            else{
                canvas.width = documentDimension.width *  mm1;
                canvas.height = documentDimension.height * mm1;
            }

            $(canvas).addClass(documentDimension.cssClass);

            return canvas;
        }
//----------------------------------
        function getDocumentDimension (doc) {
            var documentDimension = {};

            switch(doc){
                case $.document.a4_portrait:
                    documentDimension = {
                        height: 287.3,
                        width: 200.2,
                        cssClass: 'da-a4-portrait-canvas'
                    }
                    break;
                case $.document.a4_landscape:
                    documentDimension = {
                        height: 200.3,
                        width: 287.2,
                        cssClass: 'da-a4-landscape-canvas'
                    }
                    break;
                case $.document.a5_portrait:
                    documentDimension = {
                        height: 200,
                        width: 138.2,
                        cssClass: 'da-a5-portrait-canvas'
                    }
                    break;
                case $.document.a5_landscape:
                    documentDimension = {
                        height: 143,
                        width: 200.2,
                        cssClass: 'da-a5-landscape-canvas'
                    }
                    break;
            }

            return documentDimension;
        }
//-------------------------------
        function getDocTypeElement(element) {
            if ($(element).hasClass('da-a4-portrait')){
                return $.document.a4_portrait;
            }
            else if ($(element).hasClass('da-a4-landscape')){
                return $.document.a4_landscape;
            }
            else if ($(element).hasClass('da-a5-portrait')){
                return $.document.a5_portrait;
            }
            else if ($(element).hasClass('da-a5-landscape')){
                return $.document.a5_landscape;
            }

            return null;
        }
//--------------------------------        
        function getNeedDocumentCanvas(element) {
            return createCanvas(getDocumentDimension(getDocTypeElement(element)));
        }
        //-----------------------------
        function createCanvases(element, count) {
            var canvases = {};

            for(i = 0; i < count; i++){
                canvases[i] = getNeedDocumentCanvas(element);
            }

            return canvases;
        }
//-----------------------
        function getCanvasCount(maxHeight, elementHeight) {
            maxHeight = Math.ceil(maxHeight);//alert(elementHeight + ', maxh' + maxHeight)
            return elementHeight > (maxHeight + 1) ? Math.round(elementHeight / maxHeight) : 0;
        }
//------------------------
        function copyCanvas(source, destination, x, y, width, height, padding, first) {
            var calPadding =  0;//padding ? padding / 2 : 0;
            var top = first ? 0 : calPadding;
            y = first ? y : y - calPadding;

            var sourceContext = source.getContext("2d");
            if ($(destination).attr('class') != $.document.a4_landscape) {
                var myImageData = sourceContext.getImageData(0, y - calPadding, width, height - calPadding);
            }

            var destinationContext = destination.getContext("2d");
            if ($(destination).attr('class') == $.document.a4_landscape) {
                destinationContext.rotate(Math.PI / 2);
                destinationContext.drawImage(source, 0, -height);
            }
            else{
                destinationContext.putImageData(myImageData, 0, top)
            }
        }
//------------------------
        function getMaxHeight(element) {
            return getDocumentDimension(getDocTypeElement(element)).height;
        }
//----------------------
        $.fn.getImage = function () {
            var img = $('<img src="' + $(this)[0].toDataURL() + '" class="da-img ' + $(this).attr('class') + '"/>');
            img.mousedown(function (e) {
                e.stopPropagation()
            });

            return $(img);
        }
//----------------------------
        function removePrintSection(count, index) {
            if (count  == index) {
                // var noConverts = $('main');
                // $(noConverts).each(function () {
                //     var noConvert= $(this).attr('da-noconvert');
                //     if (noConvert){
                //         $(this).show();
                //         $(this).css('background', 'rgb(255,255,255)');
                //     }
                // });

                $('body').find('.da-print-section').remove();

                $.doPrint = true;

                $.stopAjaxLoading();

                if (autoPrint){
                    doPrint(1);
                }
            }
        }
//----------------------------
        doPrint = function (delayTime) {
            function goPrint() {
                if ($.doPrint) {
                    $.startAjaxLoading();

                    var printSection = $('<div class="da-print-section"></div>');

                    var elements =  $('*').not(printables).not('body').not('html');
                    elements.addClass('no-printable');

                    //$(printSection).html($(document).find('.da-print-container:first').html());

                    $(document).find('.da-print-container:first').find(printables).each(function () {
                        $(printSection).append($(this).getImage());
                    });

                    $(document).find('.da-print-container:first').find('[da-noconvert="da-noconvert"]').each(function () {
                        $(printSection).append($(this).clone());

                    });

                    $(printSection).removeClass('no-printable').find('*').removeClass('no-printable');

                    $('body').find('*:first').before(printSection);

                    window.print();
                }
            }

            if (delayTime) {
                setTimeout(goPrint, delayTime );
            }
            else{
                goPrint();
            }

        }
//----------------------
        modal.printPreview = function () {
            $.doPrint = false;
            autoPrint = false;
            modal.modal('show');
        }

        modal.print = function () {
            autoPrint = true;
            modal.modal('show');
        }
//---------------------------------
        modal.off('shown.bs.modal');
        modal.on('shown.bs.modal', function (e) {
            $.startAjaxLoading();

            var printSection = $('<div class="da-print-section"></div>');
            var printContainer = $(document).find('.da-print-container:first');

            //$(printSection).html($(document).find('.da-print-container:first').html());
            $(printSection).append($(document).find('.da-print-container:first').children());//.html());
            // $(document).find('.da-print-container:first').find(documents).each(function () {
            //     $(printSection).append($(this));
            // });

            $('body').find('*:first').before(printSection);

            var indexCount = 0;
            var elementCount = printSection.find(documents).length;
            printSection.find(documents).each(function (index) {
                var noConvert= $(this).attr('da-noconvert');

                if (!noConvert) {
                    var self = $(this);
                    var maxHeight = getMaxHeight($(this));

                    $(this).show(function () {
                        html2canvas($(this)[0], {
                            onrendered: function (canvas) {
                                var canvases;
                                var elementHeight = Math.ceil(canvas.height / mm1);

                                var myCanvas = getNeedDocumentCanvas(self);

                                var documentDimension = getDocumentDimension(getDocTypeElement(self));
                                var realHeight = documentDimension.height * mm1;
                                var realWidth = documentDimension.width * mm1;

                                copyCanvas(canvas, myCanvas, 0, 0, realWidth, realHeight, getDocumentPadding(self), true);

                                $(printContainer).append(myCanvas);//$(myCanvas).getImage());

                                var count = getCanvasCount(maxHeight, elementHeight);
                                if (count > 0) {
                                    canvases = createCanvases(self, count);

                                    var canvasIndex = 1;
                                    $.each(canvases, function () {
                                        copyCanvas(canvas, $(this)[0], 0, (realHeight * (canvasIndex)), realWidth, realHeight * (canvasIndex), getDocumentPadding(self));

                                        $(printContainer).append($(this));//.getImage());
                                        canvasIndex++;
                                    });
                                }

                        //------TEMP--remove after .....-----------------------------
                                //$(self).remove(); //---- remane before remove
                                $(self).hide();

                                $(printContainer).append(self);
                        //------TEMP--remove after .....-----------------------------

                                //$.stopAjaxLoading();

                                indexCount++;
                                removePrintSection(elementCount, indexCount);
                            }
                        });
                    });
                }
                else{
                    indexCount++;

                    $(this).show();
                    $(this).css('background', 'rgb(255,255,255)');
                    $(printContainer).append($(this));

                    removePrintSection(elementCount, indexCount);
                }
            });
           // });
        });

        modal.find('[data-toggle="tooltip"]').tooltip();
        modal.body.append(printContainer);
        modal.body.addClass('da-print-modal-body');
        modal.printContainer = printContainer;

        printButton.unbind('click.print');
        printButton.bind('click.print', function () {
            doPrint();
        });

        // $(window).unbind('beforeprint.print');
        // $(window).bind('beforeprint.print', function () {
        //
        // });

        $(window).unbind('afterprint.print');
        $(window).bind('afterprint.print', function () {
            var elements =  $('*').not(printables).not('body').not('html');
            elements.removeClass('no-printable');

            var printSection = $('body').find('.da-print-section');
            var printContainer = $(document).find('.da-print-container:first');

            printSection.remove();

            if (autoPrint){
                setTimeout(function () {
                    modal.modal('hide');
                }, 1);
            }

            $.stopAjaxLoading();
        });

        modal.body.yScrolling();
        modal.body.xScrolling();

        return modal;
    };

    $(document).ready(function() {
    });

    $(window).load(function() {
    });

}) (jQuery, window, document);