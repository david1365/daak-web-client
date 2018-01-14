//--v-david 1395-07-06
;(function( $, window, document, undefined ) { 
               
	//var scriptsRead = {};
	var formElements = 'input, select, textarea, .da-date, button, *';
	
	var horizontalMenuContainer = $(".daak-horizontal-menu-container:first");

	$.ajaxSetup({
		cache: false,
		// processData: false,
		// contentType: false,
		// enctype: 'multipart/form-data'
	});
	
	//---jquery.validate---
	$.fn.formValidateModal = function(params){
		var submitHandler = params.submitHandler;
		var afterFormSerialize = params.afterFormSerialize;

		params.onsubmit = true;
		params.submitHandler =  function(form) {
			var parentBody = $(form).parent();
			var formType = $(form).attr($.formData.FORM_TYPE);
			if ((formType) && (formType != "")) {
				if ((formType == $.formType.SEARCH_MODAL) || (formType == $.formType.MODAL)) {
					var windowModal = $(form).parents('.modal:first');
					parentBody = windowModal.find(".modal-body:first");
				}
			}
//-------------------------------------
			//var formData = new FormData($(form)[0]);
			var bestSerialize = $(form).bestSerialize();

			var url = $(form).attr("action");
			var ajaxParams = {};
			ajaxParams.url = url;// + '?' + $(form).serialize();
			ajaxParams.showModal = false;
			ajaxParams.formData = bestSerialize.formDataType;
			ajaxParams.data = bestSerialize.data;
			//ajaxParams.data =  formData;//$(form).serialize();//$(form).serializeObject();

			//alert($(form).serialize() + '[=========]');
///----------------------------------------
			var continu = true;
			if (submitHandler){
				continu = submitHandler(form);
			}

			if (continu) {
				$.extend(ajaxParams, params);
				parentBody.defaultAjaxModal(ajaxParams);

				if (afterFormSerialize){
					afterFormSerialize(form);
				}
			}
		};


		$(this).defaultValidate(params);
	};
//----------------------------------
	$.fn.defaultAjax =  function (params){
		var error = false;
		var ajaxComplete = params.ajaxComplete;
        var ajaxSuccess = params.ajaxSuccess;
		var errorEvent = params.error;
		var ajaxParams = {
			error: function(xhr) {
				if( $.notify ) {
					$.notify({
						title: $.msg.ERROR,
						text: $.msg.RECEIVE_ERROR,
						type:  $.notifyTypes.ERROR
					});
				}

				error = true;

				if (errorEvent){
					errorEvent();
				}
			},

			complete: function(self){
				if(error == false){
					if ($.checkLogin(self) == false) {
						if (ajaxComplete) {
							ajaxComplete(self);
						}
					}
				}
			},

            success: function(result) {
				if (ajaxSuccess){
                    ajaxSuccess(result);
                }
            }
		};

		$.extend( ajaxParams, params);
		$(this).readRequestUrl(ajaxParams);
	};
//--------------------------------------------------------------
	$.fn.correctValue = function () {
		if ($(this).is('input:file')){
			var type =  $(this).attr('da-type');
			if (type) {
				var attachmentContainer = $(this).parents('.da-attachment-container:first');
				if (attachmentContainer.attr('da-attached')) {
					var parentAttachment = $(this).parents('[da-type="da-attachment"]:first');

					var form = $(this).parents('form:first');
					var attachmentIdElement = $(form).find('[name="' + $(parentAttachment).attr('da-attachment_id') + '"]:first');
					var attachmentId = attachmentIdElement ? attachmentIdElement.val() : '';
					var url = $(parentAttachment).attr('da-url');
					var pkName = $(parentAttachment).attr('da-pk_name');
					url = $.attachmentUrl(url, pkName, attachmentId);

					var showAttachment = $('<a href="#" da-type="da-show_attachment" da-url="' + url + '" > ' +
												'<span class="glyphicon glyphicon-paperclip"></span>' +
										   '</a>');

					$(showAttachment).showImage();

					return $(showAttachment);
				}
			}

			 return '';
		}

		return $(this).is('select') ? $(this).find('option:selected').text() : $(this).val();
	}
	
//-------------------------------------------------------------
	$.fn.defaultAjaxModal =  function (params){
		var body;
		var windowModal;
		var ajaxComplete = params.ajaxComplete;
		params.ajaxComplete = undefined;

		if ($(this).hasClass("modal")){
			windowModal = $(this);
			body = windowModal.find(".modal-body:first");
		}
		else{
			body = $(this);
		}

		//var sentCompleted = null;
		//var afterCreateSearchBody = null;
		var getDataRequest = function(target, formBody){
            var prnt = target.parent();
			var parentUrl = prnt.attr('da-url');
			var baseUrl = parentUrl ? parentUrl : formBody.attr('action');

			return {
				 parent: prnt,
				 id: prnt.attr('data-id'),
				 pkName: prnt.attr('data-pk_name'),
				 url: baseUrl,
			}
		};
        var divEditBody = null;
        var readEditData = function (target, formBody) {
            var maxWidth = target.parents('table:first').width();

            divEditBody = target.parents('td:first').find("div:first");
			var dataRequest = getDataRequest(target, formBody);
            var parent = dataRequest.parent;
            var id = dataRequest.id;
            var pkName = dataRequest.pkName;
            var url = dataRequest.url;

			// var formData = new FormData();
			// formData.append('mode', parent.attr('data-command'));
			// formData.append(pkName, id);

			var data = {
				mode: parent.attr('data-command'),
			};
			data[pkName] = id;

			data = $(formBody).bestSerializeFromData(data);

            var ajaxParams = {};
            ajaxParams.url = url;
            ajaxParams.showModal = false;
			ajaxParams.data = data;
			ajaxParams.formData =  $(formBody).formDataType();
			//ajaxParams.data = formData;
            // ajaxParams.data = {
            //     mode: parent.attr('data-command'),
            // };

			var realLeft = target.parents('tr:first').find('td:first').offset().left - target.parents('td:first').offset().left
			var left = realLeft > 0 ? realLeft - 35 : realLeft;
			ajaxParams.ajaxComplete = function(){
                divEditBody.width(maxWidth);
				divEditBody.css('left', left);
                divEditBody.show('slow');
            };
            // ajaxParams.data[pkName] = id;
            divEditBody.defaultAjaxModal(ajaxParams);
        };

        var baseInit = {
			createRefreshButtonShowBody: function (formBody, element) {
				var RefreshCommand = formBody.attr($.formData.DA_REFRESH_COMMAND);
				if (RefreshCommand) {
					var refreshButton = $.createButton('glyphicon glyphicon-refresh', $.msg.REFRESH, $.buttonType.DA_REFRESH);
					element.after(refreshButton);

					refreshButton.bind('click.refresh', function () {
						var windowModal =  $(this).parents('.modal:first');
						var form = windowModal.find('[form_type="show"]:first');

						form.find('input[name=mode]').val(RefreshCommand);
						form.submit();
					});

					return refreshButton;
				}

				return undefined;
			},

			createInsert: function (formBody, element) {
				var insertUrl = formBody.attr($.formData.INSERT_URL);
				if (insertUrl) {
					var insertModalSize = formBody.attr($.formData.INSERT_MODALSIZE);
					var insertButton = $.createInsertButton();
					insertButton.attr($.formData.INSERT_URL, insertUrl);

					if (insertModalSize){
						insertButton.attr($.formData.INSERT_MODALSIZE, insertModalSize);
					}

					element.after(insertButton);

					return insertButton;
				}

				return undefined;
			},

			search_modal: function (windowModal, formBody, mode, formId, completeParams) {
				if (windowModal) {
					var searchBody = $.createSearchBody(formBody);
					var searchButton = $.createSearchButton(searchBody);

					windowModal.find('.search').remove();
					windowModal.find('.close:first').after(searchButton);
//------------------------------------------------------------------------------------
					var insertButton  = this.createInsert(formBody, searchButton);
//------------------------------------------------------------------------------------
					var currentButton = insertButton ? insertButton : searchButton;
					var firstRefresh = windowModal.find('.modal-header .glyphicon-refresh:first');
					if (firstRefresh.length > 0) {
						firstRefresh.remove();
					}
					var refreshButton = $.createButton('glyphicon glyphicon-refresh', 'بازیابی');
					currentButton.after(refreshButton);

					$.extend(completeParams, {'searchBody': searchBody});


					formBody.find('[type="submit"]').unbind('click.search');
					formBody.find('[type="submit"]').bind('click.search', function () {
						if (!$(this).attr('data-oral')) {
							if (formBody.validate().checkForm()) {
								var elementMode = $(this).attr("data-command");
								var mode = elementMode ? elementMode : $.mode.SEARCH;
								formBody.find('input[name=mode]').val(mode);

								var noHide = formBody.attr($.formData.DATA_NO_HIDE);
								if ((!noHide)) {
									searchBody.hide('slow');
								}
							}
						}
					});

					formBody.find(formElements).each(function (index) {
						$(this).defaultToolTip();
					});

					refreshButton.unbind('click.refresh');
					refreshButton.bind('click.refresh', function () {
						formBody.find('[call-refresh="true"]:first').trigger("click.search");
					});

					if ($[formId].afterCreateSearchBody) {
						$[formId].afterCreateSearchBody(completeParams);
					}
				}
			},

			show: function (windowModal, formBody, mode, formId, completeParams) {
				var closeButton =  windowModal.find(".close:first");
				var currentElement = closeButton;

				if (windowModal.find('[da-type="add"]:first').length == 0){
					currentElement = this.createInsert(formBody, closeButton);
				}

				if (windowModal.find('[da-type="' + $.buttonType.DA_REFRESH + '"]:first').length == 0){
					this.createRefreshButtonShowBody(formBody, currentElement);
				}

				windowModal.find(".search-menu:first").find(formElements).each(function () {
					var name = $(this).attr('name');
					var showElementVal = formBody.find('[name=' + name + ']').val();
					if (!showElementVal) {
						formBody.find('[name=' + name + ']').val($(this).val());
					}
				});


				formBody.find('.pagination:first a,.da-title a').unbind('click.aclick');
				formBody.find('.pagination:first a,.da-title a').bind('click.aclick', function () {
					if (!$(this).attr('data-oral')) {
						if (!$(this).hasClass('da-detail')) {
							$(this).setInputs();
							formBody.setMode($(this).getCommand());
							formBody.submit();
						}
					}
				});

				formBody.find('#record').text( formBody.find('#record').text() + formBody.find('[name=currentFirst]').val());
				formBody.find('#ta').text( formBody.find('#ta').text() + formBody.find('[name=currentLast]').val());
				formBody.find('#az').text( formBody.find('#az').text() + formBody.find('[name=totalSize]').val());

				formBody.find('.da-edit a').unbind('click.edit');
				formBody.find('.da-edit a').bind('click.edit', function() {
					if (!$(this).attr('data-oral')) {
						var self = $(this);

						if (divEditBody) {
							divEditBody.hide(function (target) {
								readEditData(self, formBody);
							});
						}
						else {
							readEditData($(this), formBody);
						}

						divEditBody.unbind('click.edit_body');
						divEditBody.bind('click.edit_body', function (e) {
							e.stopPropagation();
						});
					}
				});

				windowModal.unbind('click.modal_edit_body');
				windowModal.bind('click.modal_edit_body', function () {
					if (divEditBody) {
						divEditBody.hide('slow');
					}
				});

				formBody.find('.da-delete a').unbind('click.delete');
				formBody.find('.da-delete a').bind('click.delete', function() {
					if (!$(this).attr('deleting')) {
						if (!$(this).attr('data-oral')) {
							if (!$(this).attr('disabled')) {
								$(this).attr('deleting', true);

								var self = $(this);

								$.notifyAlert({
									title: $.msg.DELETE,
									text: $.msg.DELETE_MESSAGE,
								}).get().on('pnotify.confirm', function () {
									var dataRequest = getDataRequest(self, formBody);
									var parent = dataRequest.parent;
									var id = dataRequest.id;
									var pkName = dataRequest.pkName;

									var elementMode = parent.attr("data-command");
									var mode = elementMode ? elementMode : $.mode.DELETE;

									formBody.find('input[name=mode]').val(mode);
									formBody.find('input[name=' + pkName + ']').val(id);
									formBody.submit();

									$(self).removeAttr('deleting');

								}).on('pnotify.cancel', function () {
									$(self).removeAttr('deleting');
								});
							}
						}
					}
				});

				formBody.find('[type="button"]').unbind('click.delete_btn');
				formBody.find('[type="button"]').bind('click.delete_btn', function() {
					if (!$(this).attr('data-oral')) {
						if ($(this).hasClass('daak-delete')) {
							var self = $(this);

							$.notifyAlert({
								title: $.msg.DELETE,
								text: $.msg.DELETE_MESSAGE,
							}).get().on('pnotify.confirm', function () {
								var dataRequest = getDataRequest(self, formBody);
								var parent = dataRequest.parent;
								var elementMode = parent.attr("data-command");
								var mode = elementMode ? elementMode : $.mode.DELETE;

								formBody.find('input[name=mode]').val(mode);
								formBody.submit();
							});
						}
					}
				});

				formBody.find('[type=submit]').unbind('click.show_submit');
				formBody.find('[type=submit]').bind('click.show_submit', function() {
					if (!$(this).attr('data-oral')) {
						var elementMode = $(this).attr("data-command");
						formBody.find('input[name=mode]').val(elementMode);
					}
				});

				if ($[formId].afterCreateShowBody) {
					$[formId].afterCreateShowBody(completeParams);
				}
			},

			edit: function (windowModal, formBody, mode, formId, completeParams) {
					if (mode == $.mode.SUCCESSFULL){
						windowModal.trigger("click.modal_edit_body");

						var tr = formBody.parents('tr:first');
						formBody.find(formElements).each(function (i) {
							tr.find('[data-na' +
								'me=' + $(this).attr('name') + ']').html($(this).correctValue());
						});

						return false;
					}

					formBody.find('[data-dismiss="return"]').unbind('click.dismiss');
					formBody.find('[data-dismiss="return"]').bind('click.dismiss', function() {
						windowModal.trigger("click.modal_edit_body");
					});

					formBody.find('[type=submit]').unbind('click.submit');
					formBody.find('[type=submit]').bind('click.submit', function() {
						if (!$(this).attr('data-oral')) {
							var elementMode = $(this).attr("data-command");
							var mode = elementMode ? elementMode : $.mode.EDIT;
							formBody.find('input[name=mode]').val(mode);
						}
					});

					/*$(window).unbind('resize.edit_body')
					 $(window).bind('resize.edit_body', function(){
					 if (divEditBody) {
					 var maxWidth = formBody.parents('table:first').width();
					 divEditBody.width(maxWidth);
					 }
					 });*/

					if ($[formId].afterCreateEditBody) {
						$[formId].afterCreateEditBody(completeParams);
					}
			},

			add: function (windowModal, formBody, mode, formId, completeParams) {
					if (mode == $.mode.SUCCESSFULL) {
						windowModal.modal('hide');

					 	var parentWindowModal = $('#' + windowModal.attr('da-parent_modal'));
						var refreshButton = parentWindowModal.find('.glyphicon-refresh:first');
						if (refreshButton){
							refreshButton.trigger('click.refresh')
						}

						/*var parentModal = windowModal.parentModal;
						 if (parentModal){
						 var firstTr = table.find('table tr:first');
						 if (firstTr) {
						 var tr = $(firstTr.html());
						 formBody.find(formElements).each(function (i) {
						 tr.find('[data-name=' + $(this).attr('name') + ']').html($(this).val());
						 });

						 firstTr.before(tr);
						 }
						 }*/

						return false;
					}

					formBody.find('[type=submit]').unbind('click.submit');
					formBody.find('[type=submit]').bind('click.submit', function() {
						if (!$(this).attr('data-oral')) {
							var elementMode = $(this).attr("data-command");
							var mode = elementMode ? elementMode : $.mode.SAVE;
							formBody.find('input[name=mode]').val(mode);
						}
					});

					if ($[formId].afterCreateAddBody) {
						$[formId].afterCreateAddBody(completeParams);
					}
			}
		}

		var init = function (completeParams) {
			var formId = completeParams.form.attr('id');
			var mode = completeParams.mode ? completeParams.mode.val() : '';

			if ($[formId]) {
				if (!completeParams.windowModal) {
                    windowModal = body.parents('.modal:first');
                    completeParams.windowModal = windowModal;
				}
				else{
					var headerObject =  windowModal.find('header');
					var header = params.title ;
					if ((headerObject) && (headerObject.text().trim() != "")) {
						header = headerObject.text();
						headerObject.remove();
					}

					windowModal.find('.modal-title').html(header);
				}

				if ($[formId].sentCompleted) {
					$[formId].sentCompleted(completeParams);

					var formBody = body.find('form:first');

					//------------------------------------------------
					$(formBody).find('[da-type="page_serial_navigation"]').each(function () {
						$(this).createSerialPageNavigation();
					});
					//------------------------------------------------
					$(formBody).find('[da-type="page_navigation"]').each(function () {
						$(this).createPageNavigation();
					});
					//-------------------------------------------------------
					 $(formBody).find('[da-type="da-attachment"]').each(function () {
					 	 $(this).showAttachment();
					 });

					$(formBody).find('[da-type="da-show_attachment"]').showImage();
					//-------------------------------------------------------------------------
					$(formBody).find('[da-type="da-show_print"]').each(function () {
						$(this).initShowPrint();
					});
					//-------------------------------------------------------------------------
					var formType = formBody.attr($.formData.FORM_TYPE);
					if ((formType) && (formType != "")) {
						if (baseInit[formType]){
							baseInit[formType](windowModal, formBody, mode, formId, completeParams);
						}

						if ($[formId].afterCreateBody) {
							$[formId].afterCreateBody(completeParams);
						}
					}

					//---temps-------------------------------------------------
					$(formBody).find('[data-persian="true"]').each(function () {
						$(this).html(($(this).text() == 'no' ? '<span class="da-red-color">خیر</span>' : '<span class="da-blue-color">بله</span>'));
					});

					$(formBody).find('[da-disableday="true"]').unbind('click.disableday');
					$(formBody).find('[da-disableday="true"]').bind('click.disableday', function () {
						var forElement =  $(formBody).find('[name="' + $(this).attr('da-for') + '"]:first');

						if ($(this).find('[type="radio"]:first').val() == '0'){
							$(forElement).show('slow');
						}
						else{
							$(forElement).hide('slow');
						}
					});
					//---temps--------------------------------------------------

					$(formBody).find('[da-getfile="true"]').unbind('click.da_getfile');
					$(formBody).find('[da-getfile="true"]').bind('click.da_getfile', function () {
						if ($(formBody).valid()) {
							formBody.find('input[name=mode]').val($(this).attr('data-command'));

							$.defaultFileDownload({
								url: $(this).attr('da-url'),
								data: $(formBody).serialize(),
							});
						}
					});
                    //------------------------------------------------------------------------
					var modal_size = formBody.attr($.formData.MODAL_SIZE);
					if(modal_size){
						params.modalSize =  modal_size;
					}
				}


				var headerObject =  body.find('header');
				if (headerObject){
					headerObject.remove();
				}

				//alert(body.html());
				windowModal.find('[data-toggle="tooltip"]').tooltip();

				/*windowModal.find('select').select2({
					 placeholder: "Select a state",
					 allowClear: true
			 	});*/

				windowModal.find('[data-type="da-data"]').da_date();

				$(windowModal).find('.da-radio-group label').each(function () {
					$(this).da_customRadioGroup();
				})

				/*$(windowModal).find('.da-checkbox-group label').unbind('click.checkbox_warning_color');
				$(windowModal).find('.da-checkbox-group label').each(function () {
					$(this).bind('click.checkbox_warning_color', function (e) {alert(123)
						if ($(this).hasClass('active')){
							$(this).removeClass('active');
							$(this).addClass('btn-primary');
							$(this).removeClass('btn-warning');
						}
						else{
							$(this).addClass('active');
							$(this).addClass('btn-warning');
							$(this).removeClass('btn-primary');
						}
					});
				});*/

				$(windowModal).find('[data-checkboxSelected="true"]').setEnabledButton();

				if (params.modalSize) {
					var modal = windowModal.find("div:first");
					modal.attr("class", "modal-dialog");
					modal.addClass(params.modalSize);
				}

				if (params.showModal) {
					windowModal.modal('show');
				}
			}
		};
//----------------------------------------------

		var ajaxParams = {
			url: params.url,
			data: params.data,

			ajaxComplete: function(){
				if (windowModal){
					if(params.title) {
						windowModal.find('.modal-title').html(params.title);
					}

					/*if (params.showModal) {
						if (params.modalSize) {
							var modal = windowModal.find("div:first");
							modal.attr("class", "modal-dialog");
							modal.addClass(params.modalSize);
						}

						windowModal.modal('show');
					}*/
				}

				//------------------------------------------
				//var completeMode = body.find('input[name=mode]:first').val();
				var completeNotifyType =  body.notifyGetMessage();
				var completeForm = body.find('form:first');
				var completeParams = {
					//mode: completeMode,
					notifyType: completeNotifyType,
					windowModal:windowModal,
					form: completeForm,
				};

				$.tagToObject(completeForm, completeParams);

				//sentCompleted = null;
				//afterCreateSearchBody = null;
				var formId = completeForm.attr('id');

				if (!$[formId]){
					body.find("script").each(function(i) {
						var scriptUrl = $(this).attr("src");
							if (scriptUrl) {
								//scriptUrl = scriptUrl + "?v=" + new Date().getTime();
								//if(!scriptsRead[scriptUrl]) {
									$.getScript(scriptUrl, function (script) {
										//scriptsRead[scriptUrl] = true;
										init(completeParams);

										//alert('read script url');
									});
								//}
							}
							else {
								var thisScript = $(this).text();
								//if (!scriptsRead[thisScript]) {

									eval(thisScript.decod());
									//scriptsRead[thisScript] = true;

									//alert('read script this page');
								//}
							}
					});
				}
				else{
					init(completeParams);
					//alert('second');
				}

				if(ajaxComplete){
					ajaxComplete(completeParams);
				}
			},
		};

        $.extend(ajaxParams, params );
		body.defaultAjax(ajaxParams);
	};
	//---------------------------
	$.fn.removeExtraMenu = function(){
		$(this).find('ul:first').find('li').each(function(index){
			// if(($(this).attr("id") != "user-icon") && ($(this).attr("id") != "menu-icon")){
				$(this).unbind();
				$(this).off();
				$(this).remove();
			// }
		});
	};
//---------------------------------------------
	$.fn.ajaxModal = function (params){
		var modal;
        $(this).unbind(".open-modal");
		$(this).bind("click.open-modal", function(){
			modal = $.createModal();
			modal.defaultAjaxModal(params);
        });
	};
//------------------------------------------------------
	$.fn.urlAjaxModal = function(){
		if (($(this).attr("daak-url")) && ($(this).daak("url") != "")) {
			var ajaxParams = {};
			ajaxParams.title = $(this).text();
			ajaxParams.url = $(this).daak('url');
			ajaxParams.modalSize = "modal-lg";
			ajaxParams.showModal = true;

			$(this).ajaxModal(ajaxParams);
			return true;
		}
		else{
			return false;
		}
	}

	$.fn.createHorizontalMenu = function(params){
		var endCreated = false;
        var verticalMenu = params.verticalMenu;
        var maxWidth =  params.maxWidth;
        var horizontalMenuContainer = $(this);

		verticalMenu.find('ul:first').find('li').each(function(index){
			if ((!$(this).parent().parent().hasClass('daak-vertical-sub-menu')) && (endCreated == false)){
			
					var li = $('<li ><a href="#">' + $(this).find('a:first').text() + '</a></li>');
					var selfLi = $(this);

					li.unbind("mouseover.li");
					li.bind("mouseover.li", function(){
						$(this).cssAnimate("wobble");
					});

					li.unbind("click.li");
					if ($(this).urlAjaxModal()){
						li.attr("daak-url", $(this).attr("daak-url"));

						li.bind("click.li", function(e){
							e.stopPropagation();
							selfLi.click();
						});
					}
					else{
						li.bind("click.li", function(){
							$.openVerticalMenu();
							selfLi.click();
						});
					}

					// $("#menu-icon").before(li);
					$(".daak-horizontal-menu:first").append(li);
					
					if(horizontalMenuContainer.width() >= maxWidth){
						li.remove();
						endCreated = true;
						//return false;
					}
			}
			else{
				$(this).urlAjaxModal();
			}
			
		});
	};
	
	
	$(document).ready(function() {
		
		// $('#logoutMenu').click(function(){
		// 	  //$('.logout').fadeToggle('slow');
		// 	  $('.logout').show('slow');
		// 	 // $('.logout').cssAnimate("bounceInLeft");
        //
		// 	if ($(this).attr("src") == "../../share/images/logo.png"){
		// 		  $(this).cssAnimate("flip", function(target){
		// 			  target.cssAnimate("rubberBand", function(target){
		// 				  target.attr("src", "../../share/images/white.logo.png");
		// 				  $("#logout li").show();
		// 			  });
		// 		  });
		// 	}
		// });

		// $(document).mouseup(function (e)
		// {
		// 	var screenwidth = $( window ).width();
		//
		// 	var container = $("#logoutMenu");
        //
		// 	//if (screenwidth > 584){
		// 		if (!container.is(e.target) // if the target of the click isn't the container...
		// 			&& container.has(e.target).length === 0) // ... nor a descendant of the container
		// 		{
		// 			if (container.attr("src") == "../../share/images/white.logo.png"){
		// 				$("#logout li").hide();
		//
		// 				container.cssAnimate("flip", function(target){
		// 					  target.cssAnimate("rubberBand", function(target){
		// 							target.attr("src", "../../share/images/logo.png");
		// 					  });
		// 				  });
		// 			}
		//
		//
		//
		// 			//container.cssAnimate("hinge", function(){
		// 				//container.hide('slow');
		// 			//});
		//
		// 			//$.restorDefaultMenu();
		// 		}
		// 	//}
		//
		//
		// });

		$("#change-password").bind("click", function(e){
			var ajaxParams = {};
			//ajaxParams.title = "تغییر پسورد";
			ajaxParams.url = "../actChangePassword.do";
			ajaxParams.modalSize = "modal-sm";
			ajaxParams.showModal = true;
			ajaxParams.formData = true;
			ajaxParams.data= new FormData();
			ajaxParams.data.append('mode', 'view');

            $.createModal().defaultAjaxModal(ajaxParams);
		});

		// $("#user-icon").click(function(e){
		// 	$('#bilbord-content').modal('show');
		// });
		
		$("#daak-menu-icon").click(function(e){
			e.stopPropagation();
			$.openVerticalMenu();  
		});
		
		$(".daak-container").click(function(e){
			$.closeVerticalMenu();
		});

        $(".daak-container").yScrolling();

		$(".daak-brand:first").mouseover(function(){
			$(this).cssAnimate("bounceIn");
		});

        $(horizontalMenuContainer).createHorizontalMenu({
            verticalMenu: $.verticalMenu,
            maxWidth: $(Document).width() -(205 + (5 *(50)) + $(".daak-brand:first").width()),
        });
		
		$(window).resize(function(){
            $(horizontalMenuContainer).removeExtraMenu();
            $(horizontalMenuContainer).createHorizontalMenu({
                verticalMenu: $.verticalMenu,
                maxWidth: $(Document).width() -(205 + (5 *(50)) + $(".daak-brand:first").width()),
            });

			//---resize edit body----------------------------------------
			var firstEditBody =  $('.daak-edit-menu:first');
			var editBodys = $('.daak-edit-menu');
			if (editBodys.length > 0){
				var maxWidth = firstEditBody.parents('table:first').width();
				editBodys.width(maxWidth);
			}
		});

		// $('[da-type="da-message_container"]').showMessage({
		// 	max: 'totalSize',
		// 	first: 'currentFirst',
		// 	last: 'currentLast'
		// });

		$('[data-toggle="tooltip"]').tooltip();

        //$('select').select2();
		
	});
	
	
	$(window).load(function() {

	});

}) (jQuery, window, document);
