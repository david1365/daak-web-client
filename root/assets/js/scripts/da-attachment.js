/**
 * Created by david.akbari on 1395/09/22.
 */

;(function( $, window, document, undefined ) {
    $.fn.showAttachment = function () {
        $.createAttachment($(this));
    }


    $.createAttachmentImageCover = function(src, checkElement){//, imageName){
        var attachmentImageCover = $('<div class="da-attachment-image-cover">' +
                                        '<img da-type="da-imgattach" src="' + src + '"/>' +
                                        '<div class="da-attachment-image-title">' + //<span da-type="da-imagename"></span>' +
                                            '<button type="button" da-type="da-removeattach" class="close da-attachment-remove" data-toggle="tooltip" data-placement="bottom" title="حذف پیوست"><span aria-hidden="true">×</span></button>' +
                                        '</div>' +
                                    '</div>');

        attachmentImageCover.img = $(attachmentImageCover).find('[da-type="da-imgattach"]');
        attachmentImageCover.removeAttach = $(attachmentImageCover).find('[da-type="da-removeattach"]');
        attachmentImageCover.imageTitle = $(attachmentImageCover).find('.da-attachment-image-title:first');
        //attachmentImageCover.imageName = $(attachmentImageCover).find('[da-type="da-imagename"]');

        $(attachmentImageCover.img).click(function () {
            var showImage = $.createShowImage($(this).attr('src'));
            showImage.imagePreview();
        })

        $(attachmentImageCover.img).bind('mouseenter', function () {
            if (!$(this).attr('da-fadeno')){
                attachmentImageCover.imageTitle.fadeIn('slow');
            }
        });

        $(attachmentImageCover.img).bind('mouseleave', function () {
            if (!$(this).attr('da-fadeno')) {
                attachmentImageCover.imageTitle.hide();
            }
        });

        $(attachmentImageCover.imageTitle).bind('mouseenter', function () {
            $(attachmentImageCover.img).attr('da-fadeno', true);
            $(this).show();
        });

        $(attachmentImageCover.imageTitle).bind('mouseleave', function () {
            $(attachmentImageCover.img).removeAttr('da-fadeno');
        });

        attachmentImageCover.removeAttach.click(function () {
            var self = this;
            if (!$(this).attr('deleting')) {
                $(this).attr('deleting', true);

                $.notifyAlert({
                    title: $.msg.DELETE,
                    text: $.msg.DELETE_MESSAGE,
                }).get().on('pnotify.confirm', function () {
                    if (checkElement) {
                        $(checkElement).val("-1");
                    }

                    var imageCover = $(self).parents('.da-attachment-image-cover:first');
                    $(imageCover).parents('.da-attachment-container:first').removeAttr('da-attached');
                    imageCover.remove();

                }).on('pnotify.cancel', function () {
                    $(self).removeAttr('deleting');
                });
            }
        });

        return attachmentImageCover;
    };

    $.attachmentUrl = function(url, pkName, attachmentId){
        url += url.indexOf('?') ? '&' + pkName + '=' + attachmentId : '?' + pkName + attachmentId;
        return url + '&rnd=' + Math.random() + $.now();
    }

    $.createAttachment = function (element) {
        var form = element.parents('form:first');
        var checkElement = $(form).find('[name="' + element.attr('da-check_element') + '"]:first');
        var attachmentIdElement = $(form).find('[name="' + element.attr('da-attachment_id') + '"]:first');
        var attachmentId = attachmentIdElement ? attachmentIdElement.val() : '';
        var url = element.attr('da-url');
        var pkName = element.attr('da-pk_name');
        url = $.attachmentUrl(url, pkName, attachmentId) ;

        element.attr('da-full_url', url);

       var attachment = $('<div class="da-attachment-container"> ' +
                               '<input type="file" da-type="da-file" class="hide" name="'+ element.attr('name') +'" />' +
                                '<div class="da-attachment-tools-box">' +
                                    '<button type="button" da-type="da-addattach" class="da-attachment-button" data-toggle="tooltip" data-placement="bottom" title="افزودن پیوست">' +
                                    '<span class="glyphicon glyphicon-plus-sign" ></span>' +
                                    '</button>' +
                                '</div>' +
                                '<div class="da-attachment-image-box">' +
                                '</div>' +
                            '</div>');

        element.removeAttr('name');

        attachment.file = $(attachment).find('[da-type="da-file"]');
        attachment.attachmentImageBox = $(attachment).find('.da-attachment-image-box:first');

        attachment.appendAttachment = function (element) {
            attachment.attachmentImageBox.append(element);
            $(attachment).find('[data-toggle="tooltip"]').tooltip();

            attachment.attr('da-attached', true);
        }


        if ((checkElement) && (checkElement.val() == '1')){
            var attachmentImageCover = $.createAttachmentImageCover(url, checkElement);
            attachment.appendAttachment(attachmentImageCover);
        }

        attachment.file.bind('change', function() {
            if (this.files[0].size > (200 * 1024)){
                $.notify({
                    title: $.msg.ERROR,
                    text: 'سایز فایل مورد نظر باید کمتر از 200 کیلو بایت باشد!',
                    type: $.notifyTypes.ERROR
                });

                if (checkElement) {
                    $(checkElement).val("-1");
                }

                $(this).val('');

                return false;
            }

            var arr = $(this).val().split(".");
            var ext = arr[arr.length - 1].toUpperCase();
            if( ext != 'GIF' && ext != 'JPG' && ext != 'JPEG' && ext != 'BMP' && ext != 'PNG') {
                $.notify({
                    title: $.msg.ERROR,
                    text: "فرمت فایل مورد نظر قابل قبول نیست از فرمتهای استاندارد تصاویر استفاده کنید!",
                    type: $.notifyTypes.ERROR
                });

                if (checkElement) {
                    $(checkElement).val("-1");
                }

                $(this).val('');

                return false;
            }



            if (checkElement) {
                $(checkElement).val("1");
            }

            var attachmentImageCover = $.createAttachmentImageCover(window.URL.createObjectURL(this.files[0]), checkElement);
            //attachmentImageCover.imageName.html($(this).val());
            attachment.appendAttachment(attachmentImageCover);

            attachment.attr('da-attached', true);
        });

       $(attachment).find('[da-type="da-addattach"]').click(function () {
           if (!attachment.attr('da-attached')){
               attachment.file.trigger('click');
           }
       });

        element.append(attachment);
    }

    $(document).ready(function() {
    });

    $(window).load(function() {
    });

}) (jQuery, window, document);

