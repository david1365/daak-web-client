/**
 * Created by david.akbari on 12/21/2016.
 */
;(function( $, window, document, undefined ) {
    $.createMessage = function (title, registerDate, url, message) {
        url = url != '' ? '<a href="#" da-type="da-show_attachment" da-url="' + url + '" >' +
                            '<span class="glyphicon glyphicon-paperclip"></span>' +
                          '</a>' : '' ;

       return $('<div class="message-box">' +
                '<div class="message-title-content">' +
                    '<h3 class="message-title">' + title + '</h3>' +
                    '<h3 class="message-date">تاریخ ثبت : ' + registerDate + '</h3>' +
                     url +
                '</div>' +
                '<div class="message-content">' + message + '</div>' +
             '</div>');
    }

    $.ajaxParams = function (url, mode, serializeObject, ajaxComplete) {
        var ajaxParams = {};
        ajaxParams.url = url;
        ajaxParams.ajaxComplete = ajaxComplete;

        $.extend(serializeObject, {
            mode: mode
        })
        ajaxParams.data = serializeObject;//$.objectToFormData(serializeObject);
        //ajaxParams.data.append('mode', mode);

        //alert(ajaxParams.data.toSource())
        return ajaxParams;
    }
    
    $.createMessageRefresh = function () {
        return $('<div da-type="da-refresh" class="close add da-message-refresh" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="'+ $.msg.REFRESH+'">' +
                    '<span class="glyphicon glyphicon-refresh"></span>' +
                '</div>');
    }

    $.fn.createMessages = function (mode) {
        var temDiv = $('<div></div>');
        var url = $(this).attr('da-url');
        var messageContainer = $(this);

        $(temDiv).defaultAjax($.ajaxParams(url, mode, $.tagsToObject($(this).valS('[da-type="da-temp_div"]')), function (self) {
                var notifyCode = self.notifyGetMessage();

                if (notifyCode != $.msg.ERROR) {
                    messageContainer.valS($(self).find('input[type="hidden"]'));

                    self.find('table tr').each(function (index) {
                        var receiveMessage = $(this);

                        setTimeout(function () {
                            var messageAttachment = $(receiveMessage).find('[da-name="message_attachment"]');
                            var url = messageAttachment.text() == 1 ? $(receiveMessage).find('[da-name="message_attachment"]').attr('da-url') : '';

                            var message = $.createMessage('پیام',
                                $(receiveMessage).find('[da-name="message_date"]').html(),
                                url,
                                $(receiveMessage).find('[da-name="message"]').html());

                            message.find('[da-type="da-show_attachment"]').showImage();
                            messageContainer.append(message);
                            message.cssAnimate('flipInX');
                        }, 100 * index)
                    })
                }
            })
        );
    }

    $.fn.showMessage = function (tempDivs) {
        var messageContainer = $(this);
        var messageRefresh = $.createMessageRefresh();

        $(messageContainer).addClass("no-select message-container");

        $(messageContainer).createTempDivs(tempDivs);

        messageRefresh.click(function (e) {
            e.stopPropagation();

            var msgContainer = messageRefresh.parent();
            var url = msgContainer.attr('da-url');

            var newMsgContainer = $('<div da-type="da-message_container" da-url="' + url + '"></div>');
            msgContainer.after(newMsgContainer);

            msgContainer.remove();
            newMsgContainer.showMessage(tempDivs);
            newMsgContainer.find('[data-toggle="tooltip"]').tooltip();
        })
        $(messageContainer).append(messageRefresh);

        $(messageContainer).createMessages('show');

        $(messageContainer).yScrolling(function(self){
            var max = parseInt(self.find('[name="' + tempDivs.max + '"]').text());
            var last =  parseInt(self.find('[name="' + tempDivs.last + '"]').text());
            if (last < max) {
                $(self).createMessages('go_next');
            }
        });
    }

}) (jQuery, window, document);


