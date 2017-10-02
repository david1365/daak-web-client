//--v-david 1395-07-6
;(function( $, window, document, undefined ) { 
               
	var demos = {
	};
	
	$(document).ready(function() {
		
		$('input[type="submit"]').mousedown(function(){
		  $(this).css('background', '#2ecc71');
		});
		$('input[type="submit"]').mouseup(function(){
		  $(this).css('background', '#1abc9c');
		});

		$('#loginform').click(function(){
		  $('.login').fadeToggle('slow');
		  $(this).toggleClass('green');
		});



		$(document).mouseup(function (e)
		{
			var screenwidth = $( window ).width();
			
			var container = $(".login");

			if (screenwidth > 584){
				if (!container.is(e.target) // if the target of the click isn't the container...
					&& container.has(e.target).length === 0) // ... nor a descendant of the container
				{
					container.hide();
					$('#loginform').removeClass('green');
				}
			}
		});
			
	
		//---jquery.validate---
		var stack_bottomleft = {"dir1": "right", "dir2": "up", "push": "top"};

		if( $.fn.validate ) {
			$("#login-form").validate({
				rules: {
					user_name: {
						required: true,
					},
					user_pass: {
						required: true,
					}
				},
				messages: {
					user_name: {
						required: $.msg.USER_NAME_ERROR,
					},
					user_pass: {
						required: $.msg.USER_PASS_ERROR,
					}
				}			
				,
				tooltip_options: {
					user_name: {
						trigger: 'focus'
					},
					user_pass: {
						trigger: 'focus',
					}
				} ,
				invalidHandler: function(event, validator) {
				    var errors = validator.numberOfInvalids();
				    
				    if( $.notify ) {
						$.notify({
								title: $.msg.ERROR,
								text: $.msg.ERROR_COUNT.format(errors),
								type: $.notifyTypes.ERROR,
								addclass: "stack-bottomleft",
								stack: stack_bottomleft,
							});	       
					}
					
				}
			});
		}


		//---notifyGetMessage---
		$('body').notifyGetMessage({
			addclass: "stack-bottomleft",
			stack: stack_bottomleft,
		});

	});
	
	$(window).load(function() {

	});

}) (jQuery, window, document);