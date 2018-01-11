/**
 * Created by david.akbari on 1395/09/29.
 */

;(function( $, window, document, undefined ) {

    $.fn.showImage = function () {
        $(this).click(function (e) {
            var showImage = $.createShowImage($(this).attr('da-url'));
            showImage.imagePreview();
        })
    }

    $.createShowImage = function (url) {
        var factor = 1;
        var zoomed = false;
        var deg = 0;

        // function getDeg(deg) {
        //     deg = deg == 270 ? 0 : deg + 90;
        //     return deg;
        // }

        var modal =  $.createModal();
        modal.addClass('da-print-modal');

        var zoomInButton = $.createButton('glyphicon glyphicon-zoom-in', 'بزرگ نمایی');
        var zoomOutButton = $.createButton('glyphicon glyphicon-zoom-out','کوجک نمایی');
        var img = $.createImage(url, 'da-image-modal-img');
        modal.body.append(img);
        modal.body.addClass('da-image-modal-body');
        img.css('opacity', '0');

        zoomInButton.click(function () {
            if (zoomed == false){
                zoomed = true;

                var modal = $(this).parents('.modal:first');
                var img =  $(modal).find('[da-type="da-img"]');

                factor += 0.1;

                img.animate({
                    height: img.height() * factor,
                    width: img.width() * factor
                }, function () {
                    zoomed = false;
                })
            }
        });

        zoomOutButton.click(function () {
            if (zoomed == false) {
                if (factor > 1) {
                    zoomed = true;

                    var modal = $(this).parents('.modal:first');
                    var img = $(modal).find('[da-type="da-img"]');

                    img.animate({
                        height: img.height() / factor,
                        width: img.width() / factor
                    }, function () {
                        zoomed = false;
                    });

                    factor -= 0.1;
                }
            }

            // var modal = $(this).parents('.modal:first');
            // var img = $(modal).find('[da-type="da-img"]');
            // deg = getDeg(deg);
            // img.rotate(deg);
        });


        modal.dialog.attr("class", "modal-dialog da-height-100  modal-lg da-print-width-100");
        modal.content.addClass("da-height-100");
        modal.closeButton.after(zoomInButton);
        zoomInButton.after(zoomOutButton);

        modal.imagePreview = function () {
            $.startAjaxLoading();
            modal.modal('show');
        }

        modal.off('shown.bs.modal');
        modal.on('shown.bs.modal', function (e) {
            var body = $(this).find('.modal-body:first');
            var img =  $(this).find('[da-type="da-img"]');

            var bodyHeight = body.height();
            var imgHeight = img.height();

            var bodyWidth = body.width();
            var imgWidth = img.width();

            var areaBody = (bodyWidth * bodyHeight);
            var areaImg = (imgWidth * imgHeight);

            while(true) {
                areaBody = (bodyWidth * bodyHeight);
                areaImg = (imgWidth * imgHeight);

                if (areaImg > areaBody) {
                    var eqHeight = imgHeight > bodyHeight ? imgHeight / bodyHeight : 1;
                    var eqWidth = imgWidth > bodyWidth ? imgWidth / bodyWidth : 1;

                    imgWidth /= eqHeight;
                    imgHeight /= eqHeight;

                    imgWidth /= eqWidth;
                    imgHeight /= eqWidth;

                    img.width(imgWidth);
                    img.height(imgHeight);
                }
                else {
                    break;
                }
            }

            img.animate({'opacity': 1});

            $.stopAjaxLoading();
        });

        modal.find('[data-toggle="tooltip"]').tooltip();

        return modal;
    }

    $(document).ready(function() {
    });

    $(window).load(function() {
    });

}) (jQuery, window, document);


