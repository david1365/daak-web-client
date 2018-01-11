/**
 * Created by david on 11/7/2016.
 */
;(function( $, window, document, undefined ) {
    $.dateType = {
        TEXT_BOX: 'text_box',
        SELECT: 'select'
    }

    $.fn.da_date = function (params) {
        var dateContainer;
        if (!params){
            params = {};
        }

        var type = params.type ? params.type : $.dateType.TEXT_BOX;

        var addZero = function (num) {
            return num.toString().length < 2 ? '0' + num.toString() : num.toString();
        }

        if($(this).find('.da-date').length == 0) {
            if (type == $.dateType.SELECT) {
                var frDate = params.fromDate ? params.fromDate : 1388;
                var toDate = params.toDate ? params.toDate : 1410;
                dateContainer = $('<div date-type="' + type + '" class="da-date form-control" >' +
                    '                       <div data-part="day">01<select id="day" ></select></div>' +
                    '                       /<div data-part="month">01<select id="month" ></select></div>' +
                    '                       /<div data-part="year">' + frDate + '<select id="year" ></select></div>' +
                    '              </div>');

                var yearSelect = dateContainer.find('#year');
                var monthSelect = dateContainer.find('#month');
                var daySelect = dateContainer.find('#day');

                var i;
                for (i = frDate; i <= toDate; i++) {
                    yearSelect.append('<option value="' + i + '">' + i + '</option>');
                }

                for (i = 1; i <= 12; i++) {
                    var value = addZero(i);
                    monthSelect.append('<option value="' + value + '">' + value + '</option>');
                }

                for (i = 1; i <= 31; i++) {
                    var value = addZero(i);
                    daySelect.append('<option value="' + value + '">' + value + '</option>');
                }

                dateContainer.find('div').bind('click', function () {
                    var select = $(this).find('select:first');
                    if (!select.is(':visible')) {
                        $(this).html(select);
                        select.show();
                        select.focus();
                    }
                });

                dateContainer.find('div').bind('focusout', function () {
                    var select = $(this).find('select:first');
                    if (select.is(':visible')) {
                        select.hide();
                        select.before(select.val());
                    }
                });

                dateContainer.bind('focusin', function () {
                    $(this).addClass('da-date-focus');
                });

                dateContainer.bind('focusout', function () {
                    $(this).removeClass('da-date-focus');
                });
            }
            else {
                dateContainer = $('<div date-type="' + type + '" class="da-date form-control">' +
                    '                       <input name="day" type="text" >' +
                    '                       /<input name="month" type="text" >' +
                    '                       /<input name="year" type="text" >' +
                    '              </div>');

                dateContainer.find('input').bind('keypress', function (e) {
                    var name = $(this).attr('name');
                    var value = $(this).val();
                    var prevent = false;

                    if ((e.which < 0) || (e.which > 57)) {
                        prevent = true;
                    }

                    if (name == 'year') {
                        if (value.length > 3) {
                            prevent = true;
                        }
                    }
                    else {
                        if (value.length > 1) {
                            prevent = true;
                        }
                    }

                    if (prevent) {
                        if ((e.which != 0) && (e.which != 8) && (e.which != 9)) {
                            e.preventDefault();
                        }
                    }
                });

                dateContainer.find('input').bind('keyup', function (e) {
                    var name = $(this).attr('name');
                    var value = $(this).val();

                    var focus = false;
                    if (name == 'year') {
                        if (value.length > 3) {
                            focus = true;
                        }
                    }
                    else {
                        if (value.length > 1) {
                            focus = true;
                        }
                    }

                    if (focus) {
                        if ((e.which != 0) && (e.which != 8) && (e.which != 9)) {
                            if (name != 'year') {
                                $(this).val(name == 'month' ? (value > 12 ? 12 : value) : ((value > 31) ? 31 : value));
                            }
                            $(this).next().focus();
                        }
                    }
                });

                dateContainer.find('input').bind('focusin', function () {
                    $(this).addClass('da-date-focus');
                    $(this).parents('.da-date:first').addClass('da-date-focus');
                });

                dateContainer.find('input').bind('focusout', function () {
                    $(this).removeClass('da-date-focus');
                    $(this).parents('.da-date:first').removeClass('da-date-focus');
                });
            }

            $(this).bind('focusout', function () {
                var forElement = $(this).attr('for');
                if (forElement) {
                    $('[name="' + forElement + '"]').val($(this).date());
                }
            });

            $(this).append(dateContainer).delay(1000).queue(function (next) {
                var forElement = $(this).attr('for');
                if (forElement) {
                    $(this).date($('[name="' + forElement + '"]').val());
                }
            });
        }
    }

    $.fn.date = function (date) {
        var arrDate;

        if (date) {
            arrDate = date.split('/');
        }

        var dataType = $(this).attr('data-type');
        if ((dataType) && (dataType == "da-data")){
            var dateType = $(this).find('div:first').attr('date-type');

            if (dateType == $.dateType.SELECT) {
                var yearSelect = $(this).find('#year');
                var monthSelect = $(this).find('#month');
                var daySelect = $(this).find('#day');

                if (date) {
                    yearSelect.val(arrDate[0]);
                    monthSelect.val(arrDate[1]);
                    daySelect.val(arrDate[2]);

                    $(this).find('[data-part="year"]').html(yearSelect);
                    $(this).find('[data-part="month"]').html(monthSelect);
                    $(this).find('[data-part="day"]').html(daySelect);

                    yearSelect.before(arrDate[0]);
                    monthSelect.before(arrDate[1]);
                    daySelect.before(arrDate[2]);

                    return false;
                }

                return yearSelect.val() + "/" + monthSelect.val() + "/" +  daySelect.val();
            }
            else{
                var yearInput = $(this).find('input[name="year"]');
                var monthInput = $(this).find('input[name="month"]');
                var dayInput = $(this).find('input[name="day"]');

                if (date) {
                    yearInput.val(arrDate[0]);
                    monthInput.val(arrDate[1]);
                    dayInput.val(arrDate[2]);

                    return false;
                }

                return yearInput.val() + "/" + monthInput.val() + "/" + dayInput.val();
            }

        }
        else{
            return '';
        }
    }

    $(document).ready(function() {
    });

    $(window).load(function() {
    });

}) (jQuery, window, document);