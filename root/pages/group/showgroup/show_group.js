/**
 * Created by david on 10/31/2016.
 */
;(function( $, window, document, undefined ) {
    $.show_group = {
        sentCompleted: function(params) {
            var form = params.form;

            $(form).attr($.formData.FORM_TYPE, $.formType.SHOW);

            //---formValidate-----------------------
            if ($.fn.formValidateModal) {
                $(form).formValidateModal({});
            }
        }
    };
}) (jQuery, window, document);