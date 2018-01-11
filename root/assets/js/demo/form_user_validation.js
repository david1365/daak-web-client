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
				
			$("#validate-4").validate({
				rules: {
					user_name: {
						required: true
					}, 
					pass2: {
						required: true, 
						minlength: 5
					}, 
					cpass2: {
						required: true, 
						minlength: 5, 
						equalTo: '#pass2'
					}, 
					dd1: {
						required: true
					}
				}
			});
			
		}
		
	});
	
	$(window).load(function() {
		
		// When all page resources has finished loading
	});
	
}) (jQuery, window, document);