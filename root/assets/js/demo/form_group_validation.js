/*
 * MoonCake v1.3.1 - Form Validation Demo JS
 *
 * This file is part of MoonCake, an Admin template build for sale at ThemeForest.
 * For questions, suggestions or support request, please mail me at maimairel@yahoo.com
 *
 * Development Started:
 * July 28, 2012
 * Last Update:
 * December 07, 2012
 *
 */

;(function( $, window, document, undefined ) {
			
	var demos = {
	};

	$(document).ready(function() {
							   
		if($.fn.select2) {
			
			$( '.select2-select' ).select2();
			
		}
		
		if( $.fn.validate ) {
				
                        //alert($("#validate-4").attr("method"));        
                                
			$("#validate-4").validate({
				rules: {
					group_name: {
						required: true
					}
				}
			});
			
		}
		
	});
	
	$(window).load(function() {
		
		 //When all page resources has finished loading
	});
	
}) (jQuery, window, document);