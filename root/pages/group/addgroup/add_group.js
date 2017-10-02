/**
 * Created by dav.akbari on 11/2/2016.
 */
;(function( $, window, document, undefined ) {
    $.add_group = {
        sentCompleted: function(params) {
            var form = params.form;

            $(form).attr($.formData.FORM_TYPE, $.formType.ADD);

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
