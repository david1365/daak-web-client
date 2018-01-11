/*
Created on Oct 28, 2015

@author: davood akbary
 * 
tel: 09125188694
*/


//--DAscript------------------------------------------------------------------    
    ;(function( $, window, document, undefined ) {
        window.DAtitle = $("#titleForm").html();
        window.DAdescription = $("#titleForm").attr("title");
    
         
                
	var demos = {
	};

	$(document).ready(function() {
		
		if( $.fn.validate ) {
                                
			$("#from-group").validate({
				rules: {
					group_name: {
						required: true
					}
				},
                                submitHandler: function(form) { 
                                    
                                    $(form).postJson('DAinsertDb.php',function( jsonNotify ) { 
                                        if( $.pnotify ) {
                                            $.pnotify(jsonNotify);                   
                                        }
                                        
                                        $(form).trigger('reset');
                                    },
                                    function( jqXHR, textStatus ) {
                                        if( $.pnotify ) {
                                            $.pnotify({
                                                title: 'Request failed!',
                                                text: textStatus + ": Please try again.",
                                                type: textStatus
                                            });
                                        }
                                    }, {operate: "ins", title:$(form).attr("name")});                                    
                                }
			});
			
		}
		
	});
	
	$(window).load(function() {
		
		 //When all page resources has finished loading
	});
	
}) (jQuery, window, document);
