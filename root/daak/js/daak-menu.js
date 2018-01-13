/*--v-david 1395-07-23*/
;(function( $, window, document, undefined ) { 
               
	var demos = {
	};
	
	var verticalMenu = $('#vertical-menu');
	$.verticalMenu = verticalMenu;
	
	$.verticalMenuClosed = true;
	$.verticalMenuMoving = false;

    $.verticalMenu.searchButton = $.verticalMenu.find('.daak-search:first');

    // $.verticalMenu.searchButton.keyup(function () {
    // 	var self = $(this);
    // 	$.verticalMenu.find('.daak-vertical-sub-menu').hide();
    //     $.verticalMenu.find('a').each(function () {
		// 	if ($(this).text().trim().indexOf(self.val().trim()) != -1) {
    //             $(this).parents('.daak-vertical-sub-menu:first').show('slow');
		// 	}
    //     })
    // });


	
	$.openVerticalMenu = function(){
		if (($.verticalMenuClosed) && ($.verticalMenuMoving == false)){
			$.verticalMenuMoving = true;
            // $.verticalMenu.searchButton.val('');
			
			$(verticalMenu).show();			
			$(verticalMenu).cssAnimate("slideInRight", function(target){
				$(target).show();
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
	
	// $(verticalMenu).bind("click", function(){
	// 	if ($(verticalMenu).yScrolled == false){
	// 		$.closeVerticalMenu();
	// 	}
	// });

	$.fn.openSubMenu = function () {
        $(this).addClass("open");
        $(this).find("ul:first").hide();
        $(this).find("ul:first").fadeToggle('slow');
    }

    $.fn.closeSubMenu = function () {
		$(this).removeClass("open");
    }

    $.fn.subMenus = function () {//return [daak-vertical-sub-menu]s in same zone
		return $(this).find(".daak-vertical-sub-menu");
    }
	
	$(verticalMenu).find("li").each(function(index){
			$(this).bind("click", function(e){
				if ($(verticalMenu).yScrolled == false){
					if ($(this).hasClass('daak-vertical-sub-menu')){
						e.stopPropagation();

						var parentMenu = $(this).parents('.daak-vertical-sub-menu:first');
                        parentMenu = parentMenu.length > 0 ? parentMenu : verticalMenu;
                        $(parentMenu).subMenus().each(function(index){
							$(this).closeSubMenu();
						});


                        $(this).openSubMenu();
					}
					else{
						$.closeVerticalMenu();
					}

					var verticalMenuTop = $(this).parents(".daak-vertical-menu-container:first").offset().top;
					var top = $(this).offset().top - (verticalMenuTop + 3);
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
