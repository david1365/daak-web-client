/**
 * Created by david on 6/16/17.
 */
/*--v-david 1395-07-23*/
;(function( $, window, document, undefined ) {

    da.language = da.lang.FA;

//-----------------------------------------

    $.fn.bundle = function () {
        var bundle = $(this).attr('da-bundle');

        if(!bundle){
            var value = $(this).val();
            if(value){
                $(this).attr('da-bundle', $(value).attr('da-bundle'));

                return $(value).bundle();
            }
        }

        return da[da.language][da.project_name][bundle];
    }

    $.fn.assignedBundle = function () {
        var bundle = $(this).bundle();

        if(bundle) {
            $(this).val(bundle);
            $(this).text(bundle);
        }

    }
    
    da.setLanguage = function (lang) {
        da.language = lang;
        
        da.loadBundle();
    }

    da.loadBundle = function () {
        $.getScript(da.config, function (script) {
            $.each(da.file,function (index, value) {

                var path = da.bundle_path + value;
                $.getScript(path, function () {
                    $('da').each(function () {
                        //alert($(this).attr('da-bundle'));
                    })
                    
                    $('[da-bundle]').each(function () {
                        $(this).assignedBundle();
                    });

                    $('input').each(function () {
                        $(this).assignedBundle();
                    })
                });

            })
        });
    };

    $(document).ready(function() {
        //debugger;

        da.loadBundle();

        $('#agha').click(function () {
            da.setLanguage(da.lang.EN);
        })
        
    });  
    

    $(window).load(function() {
        
    });

}) (jQuery, window, document);
