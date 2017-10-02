/*--v-david 1395-07-23*/
;(function( $, window, document, undefined ) { 
               
	var demos = {
	};
	
	var verticalMenu = $('#vertical-menu');
	$.verticalMenu = verticalMenu
	
	$.verticalMenuClosed = true;
	$.verticalMenuMoving = false;	
	
	$.openVerticalMenu = function(){
		if (($.verticalMenuClosed) && ($.verticalMenuMoving == false)){
			$.verticalMenuMoving = true;
			
			$(verticalMenu).show();			
			$(verticalMenu).cssAnimate("slideInRight", function(){
				$.verticalMenuMoving = false;
				$.verticalMenuClosed = false;
			});
		}
	}
	
	$.closeVerticalMenu = function(){
		if (($.verticalMenuClosed == false) && ($.verticalMenuMoving == false)){
			$.verticalMenuMoving = true;
			
			$(verticalMenu).cssAnimate("slideOutRight", function(target){
				$(target).hide();
				$.verticalMenuMoving = false;
				$.verticalMenuClosed = true;
			});
		}
	}
	
	$(document).ready(function() {
		$(verticalMenu).yScrolling();
		
	});
	
	
	
	$( document ).scroll(function() {
		$(verticalMenu).cssAnimate("zoomOut", function(target){
			$(target).hide();
		});

	});
	
	$(verticalMenu).bind("click", function(){
		if ($(verticalMenu).yScrolled == false){
			$.closeVerticalMenu();
		}
	});
	
	$(verticalMenu).find("li").each(function(index){
			$(this).bind("click", function(e){
				if ($(verticalMenu).yScrolled == false){
					if ($(this).hasClass('vertical-sub-menu')){
						e.stopPropagation();
						$(verticalMenu).find("li").each(function(index){				
								$(this).removeClass("open");
						});
				
						$(this).addClass("open");
						$(this).find("ul:first").hide();
						$(this).find("ul:first").fadeToggle('slow');
					}
					else{
						$.closeVerticalMenu();
					}
					
					var top = $(this).offset().top;
					var height = $(this).height() + 24;
					var verticalMenuHeight = $(verticalMenu).height();
					var bottom = (top + height);
					if ((top < 0) || (bottom >= verticalMenuHeight)){
						$(verticalMenu).animate({ scrollTop: $(verticalMenu).scrollTop() + top }, 300);
					}
					/*else{						
						//$(verticalMenu).scrollTop($(verticalMenu).scrollTop() + top);						
						$(verticalMenu).animate({ scrollTop: $(verticalMenu).scrollTop() + top }, 300);
					}*/
				}
		});
		
	});
	
		
	
	$(window).load(function() {
			
	});

}) (jQuery, window, document);