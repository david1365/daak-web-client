/*--v-david 1395-07-23*/
;(function( $, window, document, undefined ) { 
               
	var demos = {
	};
	
	var verticalMenu = $('#vertical-menu');
	$.verticalMenu = verticalMenu;
	
	$.verticalMenuClosed = true;
	$.verticalMenuMoving = false;

    $.verticalMenu.searchButton = $.verticalMenu.find('.daak-search:first');

    $.fn.parentMenu = function () {
       return $(this).parents('.daak-vertical-sub-menu:first');
    }

    $.fn.parentMenus = function () {
        return $(this).parents('.daak-vertical-sub-menu');
    }

    $.verticalMenu.defualt = function () {
        $.verticalMenu.searchButton.val('');

        $.verticalMenu.find('.daak-vertical-sub-menu').show();
        $.verticalMenu.find('a').each(function () {
            $(this).html($(this).text());
        })
    }

    $.verticalMenu.searchButton.keyup(function () {
    	var self = $(this);
        $.verticalMenu.find('.daak-vertical-sub-menu').hide();
    	$.verticalMenu.find('.daak-vertical-sub-menu').each(function () {
			$(this).closeSubMenu();
        })

        $.verticalMenu.find('a').each(function () {console.log($(this).text())
        	$(this).html($(this).text());

        	var textIndexOf = $(this).text().trim().indexOf(self.val().trim());
			if (textIndexOf != -1) {
				var parentMenus = $(this).parentMenus();
				var parentLi = $(this).parents('li:first');

				var text = $(this).text();
                $(this).html(text.replace(self.val(), '<span class="daak-highlight">' + self.val().trim() + '</span>'));

				parentMenus.show();
				parentMenus.addClass("open");

				parentLi.cssAnimate("pulse");
                parentLi.hover();
			}
        })
    });
	
	$.openVerticalMenu = function(){
		if (($.verticalMenuClosed) && ($.verticalMenuMoving == false)){
			$.verticalMenuMoving = true;
            $.verticalMenu.defualt();
			
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

						var parentMenu = $(this).parentMenu();
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
