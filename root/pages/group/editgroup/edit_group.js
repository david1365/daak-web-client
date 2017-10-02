/**
 * Created by david on 10/31/2016.
 */
;(function( $, window, document, undefined ) {
    $.edit_group = {
        sentCompleted: function(params) {
            var form = params.form;

            $(form).attr($.formData.FORM_TYPE, $.formType.EDIT);

            //---formValidate-----------------------
            if ($.fn.formValidateModal) {
                $(form).formValidateModal({
                    rules: {
                        group_name: {
                            required: true,
                            minlength: 2
                        },
                    }
                });
            }
        }
    };
}) (jQuery, window, document);
