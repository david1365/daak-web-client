/**
 * Created by david on 10/24/2016.
 */
;(function( $, window, document, undefined ) {
    $.search_group = {
        sentCompleted: function(params) {
            //  var mode = params.mode;
            var form = params.form;
            var windowModal = params.windowModal;

            $(form).attr($.formData.FORM_TYPE, $.formType.SEARCH_MODAL);
            $(form).attr($.formData.INSERT_MODALSIZE, "modal-sm");
            var url = $(form).attr($.formData.ACTION);
            $(form).attr($.formData.INSERT_URL, url + "?mode=new");

            //---formValidate-----------------------
            if ($.fn.formValidateModal) {
                $(form).formValidateModal({});
            }
        }
    };
}) (jQuery, window, document);