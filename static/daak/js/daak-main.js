//--v-david 1395-07-06
;(function( $, window, document, undefined ) {
	da = {};
	window.da = da;
	
	$.elementCount = 0;
	$.elements = {};

//-----------------------------------------------
	$.fn.daak = function (attrData) {
		return $(this).attr("daak-" + attrData);
	}
//-----------------------------------------------
	$.fn.getElementUrl = function () {
		var formBody = $(this).getForm();
		var parentUrl = $(this).parent().attr('da-url');
		var thisUrl = parentUrl ? parentUrl : $(this).attr('da-url');

		return 	thisUrl ? thisUrl :  formBody.attr('action');
	}
//-----------------------------------------------
	$.fn.getElementTile = function (titleName) {
		var title =  $(this).attr(titleName);
		return title ? title : $(this).text();
	}
//-----------------------------------------------
	$.fn.initShowPrint = function () {
		$(this).unbind('click.print_click');
		$(this).bind('click.print_click', function (e) {
			var formBody = $(this).getForm();
			var printTitle = $(this).getElementTile('da-print_title');
			var url = $(this).getElementUrl();
			var command = $(this).getCommand();
			
			var modal =  $.createPrintModal();
			modal.title.text(printTitle);

			formBody.setMode(command);

			modal.printContainer.XSLTransform({
				xmlurl: url + "?" + $(formBody).serialize(),
				loadComplete: function ($params) {
					if($params.xml != false) {
						modal.printPreview();
					}
				}
			});
		});		
	}
//-----------------------------------------------
	$.fn.getForm = function() {
		return $(this).parents('form:first');
	}
//------------------------------------------------------
	$.fn.getFromName = function (name) {
		return $(this).find('input[name="' + name  + '"]:first');
	}
//-------------------------------------------------------
	$.fn.selectItem = function (cls, formBody) {
		var itmeValue = formBody.getFromName($(this).attr('da-check_input')).val();

		if (itmeValue) {
			if (itmeValue.trim() == $(this).text().trim()) {
				$(this).addClass(cls);
			}
		}
	}
//------------------------------------------------------
	$.fn.setInputFromName = function (name, value) {
		$(this).getFromName(name).val(value);
	}
//----------------------------------------------
	$.fn.setInputs = function () {
		var inputNames = $(this).attr('da-input_names');
		var inputValues = $(this).attr('da-input_values');
		var formBody = $(this).getForm();

		var arrInputNames = inputNames ? inputNames.split(',') : undefined;
		var arrInputValues = inputValues ? inputValues.split(',') : undefined;

		if (arrInputNames){
			$.each(arrInputNames, function (index) {
				var value = arrInputValues ? (arrInputValues[index] ? arrInputValues[index] : '') : '';

				formBody.setInputFromName(arrInputNames[index], value);
			})
		}
	}
//----------------------------------------------	
	$.fn.setMode = function (value) {
		$(this).find('input[name=mode]').val(value);
	}
//-----------------------------------------------
	$.fn.switchClass = function (oldClass, newClass) {
		$(this).removeClass(oldClass);
		$(this).addClass(newClass);
	}
//-----------------------------------------------
	$.fn.getCommand = function () {
		return $(this).attr("data-command") ? $(this).attr("data-command") : $(this).attr("da-command");
	}
//----------------------------------------------
	$.checkValue = function (value, correctValue) {
		return (value && (value == correctValue)) ? true : false;
	}
// ---------------------------------------------
	$.fn.da_customRadioGroup = function () {
		$.fn.getRadioParent =  function() {
			return $(this).parents('.da-radio-group:first');
		}

		$.fn.getRadio = function () {
			return $(this).find('input[type="radio"]:first');
		}

		function switchAttr(parent, element) {
			parent.find('label').switchClass('btn-warning', 'btn-primary');
			element.switchClass('btn-primary', 'btn-warning');

			parent.find('input[type="radio"]').removeAttr('checked');
			element.getRadio().attr('checked', 'checked');
		}

		var checked = $(this).getRadio().attr('checked');
		if (checked){
			var parent = $(this).getRadioParent();
			switchAttr(parent, $(this));
		}

		$(this).unbind('click.radio_warning_color');
		$(this).bind('click.radio_warning_color', function (e) {
			var	formBody = $(this).getForm();

			var parent = $(this).getRadioParent();
			switchAttr(parent, $(this));

			if ($.checkValue(parent.attr('da-submit'), 'true')){
				formBody.setMode($(this).getCommand());
				formBody.submit();
			}
		});
	}
//----------------------------------------------
	$.createSimplePageNavigation = function (description) {
		if(!description) {
			description = "";
		}

		var pageNavigation = '<nav aria-label="Page navigation"> ' +
								'<ul class="pagination"> ' +
									'<li class="previous"> ' +
										'<a data-command="go_last" href="#">' + $.msg.END_RECORD + '<span aria-hidden="true">&larr;</span> </a> ' +
									'</li> ' +
									'<li> ' +
										'<a href="#" data-command="go_next" aria-label="Previous"> ' +
											'<span aria-hidden="true">&raquo;</span> ' +
										'</a> ' +
									'</li> ' +
										description +
									'<li> ' +
										'<a data-command="go_prev" href="#" aria-label="Next"> ' +
											'<span aria-hidden="true">&laquo;</span> ' +
										'</a> ' +
									'</li> ' +

									'<li class="previous"><a  data-command="go_first" href="#"><span aria-hidden="true">&rarr;</span>' + $.msg.FIRST_RECORD + '</a></li> ' +
								'</ul> ' +
							'</nav>';

		return pageNavigation;
	}
//-------------------------------------------------------------------------------
	$.fn.createPageNavigation = function () {
		var from = $(this).attr('da-from');
		var to = $(this).attr('da-to');
		var record = $(this).attr('da-record');

		var description =	'<li> ' +
								'<a class="da-detail bg-info"> ' +
									'<spn id="record">' +  record + '</spn> ' +
									'<spn id="ta">' +  to + '</spn> ' +
									'<spn id="az">' +  from + '</spn> ' +
								'</a> ' +
							'</li> ';


		$(this).replaceWith($.createSimplePageNavigation(description));
	}
//-------------------------------------------------------------------------------------
	$.fn.createSerialPageNavigation = function () {
		var formBody = $(this).getForm();
		var serialTags = $(this).html();
		var newPageNavigation =  $($.createSimplePageNavigation(serialTags));
		 $(newPageNavigation).find('li a').each(function () {
		 	$(this).selectItem('da-navigation-page-selected-item', formBody);
		 })

		$(this).replaceWith(newPageNavigation);
	}
//----------------------------------------------
	$(document).ready(function() {
		$.fn.removeElement = function () {
			$.elementCount--;

			$(this).remove();
		}
//-----------------------------------------
		String.prototype.format = function () {
			var args = arguments;
			return this.replace(/\{\{|\}\}|\{(\d+)\}/g, function (m, n) {
				if (m == "{{") { return "{"; }
				if (m == "}}") { return "}"; }
				return args[n];
			});
		};
//--------------------------------------------------------
		$.createTempDiv = function (name, value) {
			return $('<div style="display: none" name="' + name + '" da-type="da-temp_div" >' + value + '</div>');
		}
//---------------------------------------------------------
		$.objectToFormData = function (Object) {
			var formData = new FormData();

			$.each(Object, function (index, value) {
				formData.append(index, value);
			})

			return formData;
		}
		//----------------------------------
		$.tagsToObject = function (tags) {
			var data = {};

			$.each(tags, function (index, value) {
				data[index] =  value;
			})

			return data;
		}
//---------------------------------------------------------
		$.fn.createTempDivs = function (tempDivs) {
			var self = $(this);

			$.each(tempDivs, function (key) {
				$(self).append($.createTempDiv(tempDivs[key], ''));
			})
		}
//---------------------------------------------------------
		$.fn.valS = function (value) {
			var self = $(this);


			if (typeof value === 'string') {
				var values = {};

				self.find(value).each(function () {
					var method = $(this).is('input') ? 'val' : 'html';
					values[$(this).attr('name')] = $(this)[method]();
				});

				return values;
			}
			else {
				var desObjects = value;

				desObjects.each(function () {
					var srcElement = self.find('[name="' + $(this).attr('name') + '"]');
					var value = $(this).is('input') ? $(this).val() : $(this).text();

					var method = $(srcElement).is('input') ? 'val' : 'html';
					$(srcElement)[method](value);
				})
			}
		}
//--------------------------------------------------------
		String.prototype.decod = function () {
			return $("<textarea></textarea>").html(this).html();
		}
//------------------------------------------
		$.tagToObject = function (completeForm, completeParams) {
			completeForm.find('*').each(function () {
				var name = $(this).attr('name');
				var id = $(this).attr('id');
				if (name){
					completeParams[name] = $(this);
				}
				else if(id){
					completeParams[id] = $(this);
				}
			})
		}
//-----------------------------------------
		$.checkLogin = function (target) {
			var loginForm = target.find('[data-login=login_form]:first');
			var dataLogin = loginForm.attr('data-login');
			if((dataLogin) && (dataLogin == "login_form")){
				window.open('/idp/app/idp/register/login.html', '_self');
				return true;
			}

			return false;
		}
//-----------------------------------------
        $.fn.rotate = function (deg) {
            $(this).css('transform', 'rotate(' + deg + 'deg)');
        }
//-----------------------------------------
		$.fn.defaultToolTip = function () {
			var title = $(this).parent().attr('data-title');
			title = title ? title : $(this).attr('data-title');

			if (title) {
				$(this).attr("title", title);
				$(this).attr("placeholder", title);

				$(this).attr("data-toggle", "tooltip");
				$(this).attr("data-placement", "top");

				$(this).tooltip();
			}
		};
//-------------------------------------------
		$.fn.formDataType = function () {
			var serializeType = $(this).attr($.formData.DA_SERIALIZE);
			 return serializeType && (serializeType == $.serializeType.FORM_DATA) ? true : false;
		}
		$.fn.bestSerialize = function () {
			var formDataType = $(this).formDataType();

			return {
				formDataType: formDataType,
				data: formDataType ? new FormData($(this)[0]) : $(this).serialize(),
			}
		}
		$.fn.bestSerializeFromData = function (data) {
			var newData = data;
			if ($(this).formDataType()){
				newData = $.objectToFormData(data);
			}

			return newData;
		}
//-------------------------------------------
		$.fn.setEnabledButton = function () {
			$(this).attr('data-checkbox-count', '0');
			var mainCheckbox = $(this).find('[data-checkboxmain="true"]');
			var checkboxes = $(this).find('input[type="checkbox"]').not('[data-checkboxmain="true"]');

			checkboxes.unbind('click.enable');
			checkboxes.bind('click.enable', function () {
				var parent =$(this).parents('[data-checkboxSelected="true"]:first');
				var element = $('[name=' + parent.attr('data-disableElements') + ']');
				var container = $('[name=' + parent.attr('data-container') + ']');
				var mainCheckbox = parent.find('[data-checkboxmain="true"]');
				var count = parseInt($(parent).attr('data-checkbox-count'));

				count += $(this).is(':checked') ? 1 : -1;

				if(element) {
					if (count > 0) {
						element.prop('disabled', false);
						element.removeClass('disabled');
					}
					else {
						element.prop('disabled', true);
						element.addClass('disabled');
					}
				}

				if (mainCheckbox) {
					if (count != checkboxes.length) {
						mainCheckbox.prop('checked', false);
					}
					else {
						mainCheckbox.prop('checked', true);
					}
				}

				if (container) {
					container.val(count.toString());
				}

				$(parent).attr('data-checkbox-count', count.toString());
			});

			if(mainCheckbox) {
				$(mainCheckbox).unbind('click.select_all');
				$(mainCheckbox).bind('click.select_all', function () {
					var parent = $(this).parents('[data-checkboxSelected="true"]:first');
					var element = $('[name=' + parent.attr('data-disableElements') + ']');
					var container = $('[name=' + parent.attr('data-container') + ']');
					var checkboxes = parent.find('input[type="checkbox"]').not('[data-checkboxmain="true"]');
					var count = parseInt($(parent).attr('data-checkbox-count'));

					if ($(this).is(':checked')) {
						checkboxes.prop('checked', true);
						if (element) {
							element.prop('disabled', false);
							element.removeClass('disabled');
						}

						count = checkboxes.length;
					}
					else {
						checkboxes.prop('checked', false);
						if (element) {
							element.prop('disabled', true);
							element.addClass('disabled');
						}

						count = 0;
					}

					if (container) {
						container.val(count.toString());
					}

					$(parent).attr('data-checkbox-count', count.toString());
				});
			}
		};

//-----------------------------------------
		var onSearchFormShow = function () {
			var firstControl = $(this).find('.form-control:first');
			if (firstControl.hasClass('da-date')){
				firstControl.find('input[name="day"]').focus()
			}
			else{
				firstControl.focus();
			}
		};
//-------------------------------------------
		$.createModal = function(/*parentModal*/){
			$.elementCount++;
			var id = 'da-modal-' + $.elementCount;

			$.elements[id] = $('<div id="' + id + '" class="modal fade" tabindex="-1" role="dialog"> ' +
									'<div class="modal-dialog" role="document">' +
										'<div class="modal-content">' +
											'<div class="modal-header">' +
												'<button type="button" class="close" data-dismiss="modal" aria-label="Close" data-toggle="tooltip" data-placement="bottom" title="بستن"><span aria-hidden="true">&times;</span></button>' +
												'<h4 class="modal-title"></h4>' +
											'</div>' +
											'<div  class="modal-body">' +
											'</div>' +
										'</div>' +
									'</div>' +
								'</div>');

			$.elements[id].title = $.elements[id].find('.modal-title:first');
			$.elements[id].body = $.elements[id].find('.modal-body:first');
			$.elements[id].dialog = $.elements[id].find('.modal-dialog:first');
			$.elements[id].eader = $.elements[id].find('.modal-header:first');
			$.elements[id].closeButton = $.elements[id].find('.close:first');
			$.elements[id].content = $.elements[id].find('.modal-content:first');

			/*if (parentModal){
				$.extend(modal, {
					parentModal: parentModal
				});
			}*/

			$.elements[id].unbind('hidden.bs.modal');
			$.elements[id].bind('hidden.bs.modal', function (e) {
				$(this).unbind();
				//$('.modal-backdrop, .modal ').remove();
				$(this).children().unbind();
				$(this).children().remove();

				$(this).removeElement();

				if ($('.modal').length > 1){
					if (!$('body').hasClass('modal-open')){
						$('body').addClass('modal-open');
					}
				}
			});

			$.elements[id].unbind('shown.bs.modal');
			$.elements[id].bind('shown.bs.modal', function () {
				var searchMenu = $(this).find('.daak-search-menu:first');
				var searchBody = searchMenu.find('form:first');
				var seachButton = $(this).find('search');
				var noAlwaysShow = searchBody.attr($.formData.NO_ALWAYS_SHOW);
				if (!noAlwaysShow){
					$(searchMenu).fadeToggle(onSearchFormShow);
				}

				var openShowForm = $(searchBody).attr($.formData.OPEN_SHOW_FORM);
				if (openShowForm){
					searchBody.find('[call-refresh="true"]:first').trigger("click.search");
				}

				$(this).find('.da-focus:first').focus();
			});

            return $.elements[id];
		};

        $.createSearchBody = function(body){
            var searchBody =  $('<div class="message-box daak-search-menu"> '+
                                    '<div class="message-content"> ' +
                                    '</div> ' +
                                 '</div>'
                               );

			searchBody.find(".message-content:first").append($(body));

			searchBody.unbind('click.serach-body');
			searchBody.bind('click.serach-body', function (e) {
				e.stopPropagation();
			});


			$('body').unbind("click.serach-body");
			$('body').bind("click.serach-body", function(){
				var searchBody =  $('body').find('.daak-search-menu');
				//searchBody.cssAnimate("bounceOut", function (target) {
				if (searchBody.is(":visible")) {
					//searchBody.cssAnimate('hinge', function (target) {
					searchBody.fadeToggle();
					//});
				}
				//});
			});

		//	searchBody.onshow('show');
			/*searchBody.onshow( function () {
				alert('daivd');
			});
*/
            return searchBody;
        };

        $.createSearchButton = function(searchBody){
            var searchButton = $('<div  class="close daak-search" data-toggle="tooltip" data-placement="bottom" title="جستجو"> ' +
                                    '<span class="glyphicon glyphicon-search" ></span> ' +
                                 '</div>'
                               );

            searchButton.append(searchBody);

			searchButton.unbind("click.seach-button");
			searchButton.bind("click.seach-button", function(e){
				e.stopPropagation();
                searchBody.show('slow', onSearchFormShow);
                //searchBody.cssAnimate("bounceIn");
            });


            return searchButton;
        };

       /* $.createInsertBody = function (title) {
			var insertButton = $('<div class="message-box da-add-menu"></div>');

			$(title).append(insertButton);
		}*/

		$.createButton = function(classType, tooltip, daType) {
			daType = daType ? 'da-type="' + daType + '" ' : 'da-type="da-button"';
			var tooltipBody = tooltip ? 'data-toggle="tooltip" data-placement="bottom" title="' + tooltip + '"' : '';
			var button = $('<div ' + daType + ' class="close add" ' + tooltipBody + '> ' +
				'<span class="' + classType +  '" ></span> ' +
				'</div>'
			);

			return button;
		}
		//-----------------------------------
		$.createImage = function (url, classType, daType) {
			daType = daType ? ' da-type="' + daType + '" ' : ' da-type="da-img" ';
			classType = classType ? ' class="' + classType + '" ' : '';
			var img = $('<img src="'+ url + '" ' + daType + classType + '/>');

			return img;
		};
		//-------------------------
		$.createInsertButton = function(){
			var insertButton = $('<div da-type="add" class="close add" data-toggle="tooltip" data-placement="bottom" title="افزودن"> ' +
				'<span class="glyphicon glyphicon-plus-sign" ></span> ' +
				'</div>'
			);

			insertButton.unbind("click.open-insert-modal");
			insertButton.bind("click.open-insert-modal", function(){
				var insertUrl = insertButton.attr($.formData.INSERT_URL);
				var size = insertButton.attr($.formData.INSERT_MODALSIZE);
				var modalSize = size ? size : "modal-lg";
				//var parentModal = $(this).parents('.modal:first');
				if ((insertUrl) && (insertUrl != "")) {
					var ajaxParams = {};
					ajaxParams.title = $(this).text();
					ajaxParams.url = insertUrl;
					ajaxParams.modalSize = modalSize;
					ajaxParams.showModal = true;

					var modal =	$.createModal();//parentModal);
					var parentModal = $(this).parents('.modal:first');
					modal.attr('da-parent_modal', parentModal.attr('id'));
					modal.defaultAjaxModal(ajaxParams);
				}
			});

			return insertButton;
		};

		//--PNotify--
		PNotify.prototype.options.styling = "bootstrap3";

		$.pnotify = function (pnotifyParam){
			return new PNotify(pnotifyParam);
		}

		$.notify = function (notifyParam){
			//var stack_bottomleft = {"dir1": "right", "dir2": "up", "push": "top"};

			var np = {
				animate: {
					animate: true,
					in_class: 'bounceIn',
					out_class: 'bounceOutLeft'
				},
				//addclass: "stack-bottomleft",
				//stack: stack_bottomleft,

				cornerclass: "",
				width: "500px",
			};

			np.title = notifyParam.title;
			np.text = notifyParam.text;
			np.type = notifyParam.type;

			if ((notifyParam.addclass) && (notifyParam.addclass != 'undefined')){
				np.addclass = notifyParam.addclass;
			}
			if((notifyParam.stack) && (notifyParam.stack != 'undefined')){
				np.stack = notifyParam.stack;
			}

			$.extend(notifyParam, np);
			return $.pnotify(notifyParam);
		}

//------------------------------------------------
		$.notifyAlert = function (notifyParam){
			var params = {
				// icon: 'glyphicon glyphicon-question-sign',
				hide: false,
				confirm: {
					confirm: true
				},
				buttons: {
					closer: false,
					sticker: false
				},
				history: {
					history: false
				}
			}

			$.extend(params, notifyParam);
			return $.notify(params);
		}

		//---notifyGetMessage---
		$.fn.notifyGetMessage = function(otherParams){
			if( $.notify ) {
				var ms = '';
				ms = $(this).find('.da-message:first').text();
				ms = ms.trim();

				if (ms != '') {
					var arMs = ms.split(',');
					var typ = arMs[1];
					var ttl = arMs[1] == "succes" ? $.msg.SUCCES : (arMs[1] == 'error' ? $.msg.ERROR : (arMs[1] == 'info' ? $.msg.INFO : $.msg.NOTICE));
					ms = arMs[0];

					var params = {
						title: ttl,
						text: ms,
						type: typ
					};

					if(otherParams){
						params.addclass = otherParams.addclass;
						params.stack = otherParams.stack;
					}

					$.notify(params);

					return typ;
				}
			}
		};


		//---jquery.validate---
		$.fn.defaultValidate = function(params, animateTarget){
			if( $.fn.validate ) {
				if (params){
					var invalidHandler = params.invalidHandler;
					params.invalidHandler = function(e, validator) {
						if (animateTarget){
							animateTarget.cssAnimate("bounceIn");
						}

						var errors = validator.numberOfInvalids();
						if( $.notify ) {
							$.notify({
								title: $.msg.ERROR,
								text: $.msg.ERROR_COUNT.format(errors),
								type: $.notifyTypes.ERROR,
							});
						}

						if (invalidHandler){
							invalidHandler(e, validator);
						}
					};

					$(this).validate(params);
				}
			}
		};

		//--Animate--
		$.cssAnimate = function (target , x, func) {
			//target.removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			target.addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				target.removeClass('animated');
				target.removeClass(x);

				if (func){
					func(target);
				}
			});
		};

		$.fn.cssAnimate = function (x, func){
			$.cssAnimate($(this), x, func);
		};

	});

	//-----ajaxLoading---------------------------------------------
	$.startAjaxLoading = function(){
		var ajxLd = $('<div id="ajax-loading"></div>');
		ajxLd.addClass("ajax-loading");
		ajxLd.unbind('click.ajax_load');
		ajxLd.bind('click.ajax_load', function (e) {
			e.stopPropagation();
		});
		$('body').append(ajxLd);
	};

	$.stopAjaxLoading = function(){
		$('#ajax-loading').remove();
	};

	//-----yScrolling----------------------------------------------
	$.fn.yScrolled = false;
	$.fn.yScrolling = function(fun){
		var y = 0;
		var down = false;
		var scrollTop = 0;
		var scrlTopWheel =0;
		var self = $(this);

		//var timer = 0;
		var sensed = false;

		var sensDown = function (sclTop, maxScrollTop){
			if ( sclTop >= maxScrollTop){
				if (fun){
					fun(self);
				}
			}
		}

		$(this).bind('mousewheel DOMMouseScroll', function(event){
			var maxScrollTop = this.scrollHeight - this.clientHeight;
			var scrollTop = $(this).scrollTop();

			if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
				if(scrollTop > 0){
					scrlTopWheel -= scrlTopWheel <= 0 ? 0 : 50;
					$(this).scrollTop(scrlTopWheel);
				}
			}
			else {
				if(scrollTop < maxScrollTop){
					scrlTopWheel += scrlTopWheel >= maxScrollTop ? 0 : 50;
					$(this).scrollTop(scrlTopWheel);

					sensed = false;
				}
				else if(sensed == false){
					sensed = true;
					sensDown(scrollTop, maxScrollTop);
				}
			}
		});

		$(this).bind("mousedown touchstart", function(e){
			var touchobj = e.changedTouches[0];
			down = true;
			y = e.pageY || touchobj.clientY;
			scrollTop = $(this).scrollTop();
		});

		$(this).bind("mouseup touchend", function(e){
			down = false;

			var maxScrollTop = this.scrollHeight - this.clientHeight;
			sensDown($(this).scrollTop(), maxScrollTop);

			/*if(timer <= 5){
			 var min = (y - e.pageY) + ($(this).scrollTop());
			 min += y > e.pageY ? 100 : -100;

			 //alert($(this).scrollTop() +","+ $(this).height());
			 $(this).animate({ scrollTop: min }, 300);
			 }

			 timer = 0;*/
		});

		$(this).bind("mousemove touchmove", function(e){
            var touchobj = e.changedTouches[0];

			if(down){
				//timer++;

				$.fn.yScrolled = true;
				var min = scrollTop + (y - (e.pageY || touchobj.clientY));
				$(this).scrollTop(min);

				scrlTopWheel = $(this).scrollTop();

				//$("#horizontal-menu-container").html($(this).ScrollTopMax +" ,"+ $(this).height());
				// if($(this).scrollTop() > $(this).height() - 100) {
				//$(window).unbind('scroll');
				//	 alert("near bottom!");
				//}
			}
			else{
				$.fn.yScrolled = false;
			}
		});

		/*$(this).bind("mouseover", function(e){
		 });*/
	};

	//-----xScrolling----------------------------------------------
	$.fn.xScrolled = false;
	$.fn.xScrolling = function(fun, xMiddleScroll){
		var x = 0;
		var down = false;
		var scrollLeft = 0;
		var scrlTopWheel =0;
		var self = $(this);

		//var timer = 0;
		var sensed = false;

		if (xMiddleScroll) {
			var sensRight = function (sclTop, maxscrollLeft) {
				if (sclTop >= maxscrollLeft) {
					if (fun) {
						fun(self);
					}
				}
			}

			$(this).bind('mousewheel DOMMouseScroll', function (event) {
				var maxscrollLeft = this.scrollWidth - this.clientWidth;
				var scrollLeft = $(this).scrollLeft();

				if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
					if (scrollLeft > 0) {
						scrlTopWheel -= scrlTopWheel <= 0 ? 0 : 50;
						$(this).scrollLeft(scrlTopWheel);
					}
				}
				else {
					if (scrollLeft < maxscrollLeft) {
						scrlTopWheel += scrlTopWheel >= maxscrollLeft ? 0 : 50;
						$(this).scrollLeft(scrlTopWheel);

						sensed = false;
					}
					else if (sensed == false) {
						sensed = true;
						sensRight(scrollLeft, maxscrollLeft);
					}
				}
			});
		}

		$(this).bind("mousedown", function(e){
			down = true;
			x = e.pageX;
			scrollLeft = $(this).scrollLeft();
		});

		$(this).bind("mouseup", function(e){
			down = false;

			var maxscrollLeft = this.scrollWidth - this.clientWidth;
			if (xMiddleScroll) {
				sensRight($(this).scrollLeft(), maxscrollLeft);
			}
			/*if(timer <= 5){
			 var min = (x - e.pagex) + ($(this).scrollLeft());
			 min += x > e.pagex ? 100 : -100;

			 //alert($(this).scrollLeft() +","+ $(this).width());
			 $(this).animate({ scrollLeft: min }, 300);
			 }

			 timer = 0;*/
		});

		$(this).bind("mousemove", function(e){
			if(down){
				//timer++;

				$.fn.xScrolled = true;
				var min = scrollLeft + (x - e.pageX);
				$(this).scrollLeft(min);

				scrlTopWheel = $(this).scrollLeft();

				//$("#horizontal-menu-container").html($(this).scrollLeftMax +" ,"+ $(this).width());
				// if($(this).scrollLeft() > $(this).width() - 100) {
				//$(window).unbind('scroll');
				//	 alert("near bottom!");
				//}
			}
			else{
				$.fn.xScrolled = false;
			}
		});

		/*$(this).bind("mouseover", function(e){
		 });*/
	};


	//----readRequestUrl------------------------------------------------------------------
	$.fn.readRequestUrl = function(params){
		var self = $(this);
		if (!params){
			params = {};
		}

		 var ajaxParams = {};
		// $.extend(ajaxParams, params);
		// if (!ajaxParams.type){
		// 	ajaxParams.type = 'POST';
		// }
        //
		// if (!ajaxParams.dataType){
		// 	ajaxParams.type = 'html';
		// }
		ajaxParams.type = params.type ? params.type : 'POST';
		ajaxParams.dataType = params.dataType ? params.dataType :'html';

		if ((params.formData) && (params.formData == true)){
			ajaxParams.processData = false;
			ajaxParams.contentType = false;
			ajaxParams.enctype = 'multipart/form-data';
		}
		else {
			if (params.contentType) {
				ajaxParams.contentType = params.contentType;
			}
		}

		if(params.async){
			ajaxParams.async = params.async;
		}

		ajaxParams.url = params.url;
		ajaxParams.data = params.data;

		ajaxParams.beforeSend = function() {
			if (params.beforeSend){
				params.beforeSend();
			}
			$.startAjaxLoading();
		};

		ajaxParams.success = function(result) {
			self.html(result);

			if (params.success){
				params.success(result);
			}
		};

		ajaxParams.error = function() {
			$.stopAjaxLoading();

			if (params.error){
				params.error();
			}
		};

		ajaxParams.complete = function() {
			$.stopAjaxLoading();

			if (params.complete){
				params.complete(self);
			}
		};

		$.ajax(ajaxParams);
	}
//------------------------------
	$.defaultFileDownload = function(params){
		var self = $(this);
		if (!params){
			params = {};
		}

		var fileDownloadParams = {};
		fileDownloadParams.httpMethod = params.httpMethod ? params.httpMethod : 'POST';
		fileDownloadParams.data = params.data;

		fileDownloadParams.prepareCallback =  function () {
			$.startAjaxLoading();

			if (params.prepareCallback){
				params.prepareCallback();
			}
		};

		fileDownloadParams.successCallback =  function (url) {
			$.stopAjaxLoading();

			if (params.successCallback){
				params.successCallback(url);
			}
		};

		fileDownloadParams.failCallback =  function (responseHtml, url) {
			$.stopAjaxLoading();

			if( $.notify ) {
				$.notify({
					title: $.msg.ERROR,
					text: $.msg.RECEIVE_FILE_ERROR,
					type:  $.notifyTypes.ERROR
				});
			}

			if (params.failCallback){
				params.failCallback(responseHtml, url);
			}
		};

		return $.fileDownload(params.url, fileDownloadParams);
	}

	$(window).load(function() {

	});

}) (jQuery, window, document);
