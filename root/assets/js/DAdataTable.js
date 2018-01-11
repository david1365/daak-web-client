/*
Created on 2015

@author: davood akbary
 * 
tel: 09125188694
*/


;(function( $, window, document, undefined ) {
    window.DAurl = './php/DAdb.php';
    window.DAtable = ''
    
    DAoperate = {
        insert: 'DAins',
        update: 'DAup',
        select: 'DAsel',
        delete: 'DAdel',
        lookUp: 'DAlp'
    };
    
    
    $.fn.DAtrValidate = function (){
        
            var errorCount = 0;
            var operate = $(this).data('operate');
            var self = $(this);
            
            $(this).children().each(function (index){
                if ($(this).data('look_up')){
                    var value = $(this).find('select').select2("data").id;//.val();
                    if ($.trim(value).length == 0){ //alert($(this).find('select').select2("data").id);
                        if(((operate == DAoperate.update) && ( $(this).data('updating'))) || (operate == DAoperate.insert)){
                            errorCount++;
                        }
                    }
                }else{
                    if ($.trim($($(this)).text()).length == 0){ 
                        errorCount++;
                    }
                }
            
            });
            
            if (errorCount > 0){
                if( $.pnotify ) {
                       $.pnotify({
                           title: 'Request failed!',
                           text: "Please ENTER Column Data Correct And Full!!",
                           type: 'error',
                           delay: 2000,
                           shadow: true,
                           mouse_reset: true
                       });
                 }
                 
                 return false;
            }
                                
            return true;
        };
        
    
    $.fn.DAquickRequest = function (rData, done, showSuccess, showError, fail){
        showError = showError == undefined ? true : showError;
        showSuccess = showSuccess == undefined ? false  : showSuccess;
        
        $(this).DApostJson({
                    url: window.DAurl,
                    beforeSend: function(){
                        // Handle the beforeSend event
                    },
                    complete: function(){
                        // Handle the complete event
                    },
                    success: function(jsonData) { 
                        if (showSuccess){
                            if( $.pnotify ) {
                                jsonData.notify.delay = 300;
                                jsonData.notify.shadow = true;
                                jsonData.notify.mouse_reset = true;
                                $.pnotify(jsonData.notify);                   
                            }
                        }
                        
                        if (done){
                            done(jsonData);
                        }
                    },
                    error:function(jqXHR, textStatus) {
                          if (showError){
                                if( $.pnotify ) {
                                    $.pnotify({
                                        title: 'Request failed!',
                                        text: textStatus + ": Please try again.",
                                        type: textStatus,
                                        shadow: true,
                                        mouse_reset: true
                                    });
                                }
                          }
                          
                          if (fail){
                            fail(jqXHR, textStatus);
                          }
                    },
                    data: rData,
                    
        });
        
    }
    
//--Base----------------------------------------------------------------------
        $.fn.DAbtnCheck = function (value){
            return $(this).find('i').hasClass(value);
        }
        
        $.fn.DAgetBtn = function (value){
            return $(this).find('.' + value).parent('a');
        }
        
        $.fn.getI = function (){
            return $(this).find('i');
        }
        
        $.fn.DAbtnChange = function (add){ 
            var i = $(this).getI();
            i.removeClass(i.attr('class'));
            i.addClass(add);
        }
                    
        
        $.fn.DAreadData = function (){
            var btns = '<td class="action-col-right"> \
                            <span class="btn-group"> \
                               <!-- <a data-op="DAup"  class="btn btn-mini disabled"><i class="icon-pencil"></i></a>--> \
                                <a data-op="DAdel" class="btn btn-mini disabled"><i class="icon-ok"></i></a> \\n\
                                <a data-op="DAdel" class="btn btn-mini disabled"><i class="icon-trash"></i></a> \
                            </span> \
                        </td>';
            
            
            
            var step = 0;
            var reciveRowCount =0;
            var maxStep = 0;
            var displayMaxRow = 5;

            var self = $(this);
            var next = $(this).find('.next');
            var prev = $(this).find('.prev');
            
            var thead = $(this).parents('div.widget').find('thead');
            var tbody = $(this).parents('div.widget').find('tbody');
            var table = $(this).parents('div.widget').find('table');
            var toolbar = $(this).parents('div.widget').find('.toolbar');
            
            window.DAtable = table.data('table_name');
            //alert(window.DAtable);
            
            
            var order = thead.data('order_name').split(",");
            var uniqe = thead.data('uniqe');
            var lookUp = thead.data('look_up').split(",");
            
            
            
            var refreshBtn = toolbar.DAgetBtn('icon-refresh');
            
            var lockBtn =  thead.DAgetBtn('icon-lock');
            var mainOkBtn = thead.DAgetBtn('icon-ok');
            var mainTrashBtn = thead.DAgetBtn('icon-trash');
            var addBtn = thead.DAgetBtn('icon-plus');
            
            
//-----------add btn-------------------------------------------------------------------
            addBtn.click(function (){
                if (!$(this).hasClass('disabled')){
                    addTr(); 
                }
            });
            
//0000000000000000000--thead btns--000000000000000000000000000000000000000000000000000
            refreshBtn.click(function (){   
                if (!$(this).hasClass('disabled')){
                    self = $(this);
                    $(this).addClass('disabled');
                    
                    /*if (lockBtn.DAbtnCheck('icon-unlock')){
                        lockBtn.trigger('click');
                    }*/
                    
                    step = 0;
                    goRequest(function (){
                        self.removeClass('disabled');
                    })
                }              
            });
            
            mainTrashBtn.click(function (){
                if (!$(this).DAbtnCheck('icon-remove')){
                    tbody.DAgetBtn('icon-trash').trigger( "click" );
                }
                else{
                    tbody.DAgetBtn('icon-remove').trigger( "click" );
                }
            });
            
            mainOkBtn.click(function (){
                if (!$(this).hasClass('disabled')){
                    tbody.DAgetBtn('icon-ok').trigger( "click" );
                    
                    //refreshBtn.trigger( "click" );
                }
            });
            
            lockBtn.click(function (){
                if ($(this).DAbtnCheck('icon-lock')){
                    table.DAgetBtn('icon-trash').removeClass('disabled');
                    table.DAgetBtn('icon-plus').removeClass('disabled');
                    
                    $(this).DAbtnChange('icon-unlock');
                }
                else{
                    thead.DAgetBtn('icon-remove').trigger( "click" );
                    
                    table.DAgetBtn('icon-trash').addClass('disabled');
                    table.DAgetBtn('icon-plus').addClass('disabled');
                  
              
                    $(this).DAbtnChange('icon-lock');
                   
                }
                    
            });
         
         
///------------------add tr-------------------------------------------------------         
            function addTr(value){
                var tr = $('<tr/>');
                //---get ins data--
                if (value != undefined){
                    tr.data('uniqe', value[uniqe]);
                }
                else{
                   tr.data('end_insert', false); 
                }
                $.each(order, function (index, arrValue){
                    var td = $('<td/>')
                   
                    if (value != undefined){
                        td.text(value[arrValue]);
                    }
                    else{
                        td.attr('contenteditable', true);
                        
                        //tr.data('operate', DAoperate.insert);
                    }
                    
                    td.data('field_name', arrValue);
                    td.data('updating', false);
//==============================for updata ==================================
//------------------------td-click -------------------------------
                    td.click(function (){
                       
                        var tr = $(this).closest('tr');
                      
                        if (!tr.DAgetBtn('icon-trash').hasClass('disabled')){

                            if (tr.data('operate') !=  DAoperate.insert){
                                
                                tr.data('operate', DAoperate.update);
                                if (!$(this).data('updating')){
                                    tr.data('operate', DAoperate.update);
                                    //if(tr.DAbtnCheck('icon-trash')){

                                    //}
                                    $(this).data('old_data', $(this).text());
                                    
                                    //alert($(this).data('look_up'));
                                    if ($(this).data('look_up')){
                                        $(this).text('');
                                        
                                        var frTname = $(this).data('fr_tname');

                                        var select = $('<select/>');
                                        select.DAselect( $(this).data('def'), frTname);

                                        $(this).append(select);
                                    }
                                    else{
                                        $(this).attr('contenteditable', true);
                                    }

                                    tr.DAgetBtn('icon-trash').trigger( "click" );

                                    $(this).data('updating', true);
                                    tr.data('end_update', false);
                                }
                            }
                        }
                    });
                    
                    
//===========================================================================
                    
                    tr.append(td);   
                    
                    $.each(lookUp, function (i, v){
                        var lukUp = v.split('>');
                        var fatName = lukUp[1].split('|');
                        
                        var frName = lukUp[0];
                        var reName = fatName[0];
                        var frTname = fatName[1];
                        
                        //alert(frName + ',' + reName + ',' + frTname);
                        
                        //---get ins data--
                        if (frName == arrValue){
                            td.data('look_up', true);
                            td.data('re_name', reName);
                            td.data('fr_name',frName);
                            td.data('fr_tname',frTname);
                            
                            //alert(td.data('re_name'));
                            
                            if (value != undefined){
                                td.data('def', value[reName]); 
                                
                            }
                            else{
                                td.attr('contenteditable', false);
                                
                                var select = $('<select/>');
                                select.DAselect(false, frTname);

                                td.append(select);
                            }
                        }
                    });

                });

                tr.append(btns);
                //alert(tbody.attr('id'));
                tbody.append(tr);  


//--------------------------------------btn click------------------------------------------------                                      
//------------------------------------------icon-trash----------------------------------------                                       
                tr.DAgetBtn('icon-trash').click(function (){
                    if (!$(this).hasClass('disabled')){

                        var tr = $(this).closest('tr');
                        var uniqeValue = tr.data('uniqe');
                        okBtn = tr.DAgetBtn('icon-ok');
                        
                        

                        if($(this).DAbtnCheck('icon-trash')){

                            $(this).DAbtnChange('icon-remove');
                            mainTrashBtn.DAbtnChange('icon-remove');



                            //tr.data('operate', DAoperate.delete);

                            //if ((operate != DAoperate.insert) && (operate != DAoperate.update)){
		            
		            var uniqeId = {};
                            uniqeId[uniqe] = uniqeValue;
                            okBtn.data('sData', {
                                 rules:{
                                     operate: DAoperate.delete, name: window.DAtable,
                                     where:[
                                         //{[uniqe]: uniqeValue},
					uniqeId
                                     ]                                                                }
                                 }
                             ); 
                            //}

                            okBtn.removeClass('disabled'); 
                            mainOkBtn.removeClass('disabled');
                          
                        }
                        else{
                                var operate = tr.data('operate');
                                
                                $(this).DAbtnChange('icon-trash');

                                okBtn.data('sData', 'null');
                                okBtn.addClass('disabled'); 

                                if (tbody.DAgetBtn('icon-remove').length == 0){
                                    mainTrashBtn.DAbtnChange('icon-trash');
                                    mainOkBtn.addClass('disabled');
                                }
                                
                                if (operate == DAoperate.insert){
                                    if (!tr.data('end_insert')){
                                        tr.remove();
                                    }
                                }
                                else if (operate == DAoperate.update){
                                 
                                    tr.children().each(function (index){
                                            
                                            if ($(this).data('look_up')){
                                                
                                                var select = $(this).find('select');
                                                
                                                if (tr.data('end_update')){
                                                    var text = select.select2('data').text;//text();
                                                    var val = select.select2("data").id;//val();
                                                    $(this).data('def', val); 
                                                    $(this).text(text);
                                                }
                                            
                                                select.select2('destroy');
                                                select.remove();
                                                
                                                
                                            }else{
                                                $(this).attr('contenteditable', false);
                                            }  
                                            //alert(tr.data('end_update'));
                                            
                                            if (tr.data('end_update') == false){
                                                $(this).text($(this).data('old_data'));
                                            }
                                            
                                            $(this).data('updating', false);
                                            
                                            
                                    });
                                }
                                //alert(operate);
                                tr.data('operate', 'null');
                        }
                    }
                });
//-------------------------------------------icon-ok-----------------------------------------------                                       
                tr.DAgetBtn('icon-ok').click(function (){
                    if (!$(this).hasClass('disabled')){
                        
                        var tr = $(this).closest('tr');
                        var insertFunc = null;
                        var updateFunc = null;                        
                        var error = false;
                        var operate = tr.data('operate');
                        var uniqeValue = tr.data('uniqe');
                        
                        //alert(operate);
                        function getData(){
                                var sdata = [];
                                var row = {};

                                tr.children().each(function (index){
                                    var feildName = $(this).data('field_name');
                                    if (feildName){
                                        var value = '';

                                        if ($(this).data('look_up')){
                                            value = $(this).find('select').val();
                                            feildName = $(this).data('re_name');

                                        }else{
                                            value = $(this).text();
                                        }

                                        //alert(feildName + ':' + value);

                                        row[feildName] = value;
                                        //{[feildName]: value});\
                                    }
                                });
                                
                                sdata.push(row);
                                
                                return sdata;
                        }
                        
                        
                        if (operate == DAoperate.insert){
                            
                            if (tr.DAtrValidate()){
                                
                                var sdata = getData();

                                $(this).data('sData', {
                                     rules:{
                                         operate: DAoperate.insert, 
                                         name: window.DAtable,                       
                                     },
                                     data: sdata,
                                });
                                
                               // alert(JSON.stringify(okBtn.data('sData')));
                                   
                            }
                            else{
                                error = true;
                            }
                        }
                        else if (operate == DAoperate.update){
                            var validate = tr.DAtrValidate();
                            error = !validate;
                            if (validate){
                                var sdata = getData();
                                var uniqeId = {};
                                uniqeId[uniqe] = uniqeValue;

                                $(this).data('sData', {
                                     rules:{
                                         operate: DAoperate.update, 
                                         name: window.DAtable, 
                                         where:[
                                            uniqeId//{[uniqe]: uniqeValue},
                                        ]  
                                     },
                                     data: sdata
                                });
                                
                                /*tr.children().each(function (index){

                                        if ($(this).data('look_up')){
                                            var select = $(this).find('select');
                                            select.remove();

                                        }else{
                                            $(this).attr('contenteditable', false);
                                        }  

                                        $(this).text($(this).data('old_data'));

                                        $(this).data('updating', false);

                                });*/
                            }
                        }
                            
                        
                        
                        if(error == false){
                            var sData = $(this).data('sData');
                            //var self = $(this);

                            $(this).DAquickRequest(sData, 
                                function (jsonData){
                                    
                                    if (operate == DAoperate.insert){
                                       
                                        tr.data('uniqe', jsonData.data.id);
                                        
                                        tr.children().each(function (index){
                                            if ($(this).data('look_up')){
                                                var select = $(this).find('select');
                                                
                                                var text = select.select2('data').text;//text();
                                                var val = select.select2("data").id;//val();
                                                $(this).data('def', val); 
                                               
                                                select.select2('destroy');
                                                select.remove();
                                                
                                                $(this).text(text);

                                            }else{
                                                $(this).attr('contenteditable', false);
                                            }   
                                            
                                        });
                                        
                                        tr.data('end_insert', true);
                                        tr.DAgetBtn('icon-remove').trigger('click');
                                    }
                                    else if (operate == DAoperate.update){
                                        
                                        tr.data('end_update', true);
                                        tr.DAgetBtn('icon-remove').trigger('click');
                                    }
                                    else{
                                        if (jsonData.notify.type == 'success'){

                                            tr.DAgetBtn('icon-remove').trigger('click');
                                            tr.toggle().remove();
                                        }

                                    }
                                    
                                    if (tbody.find('tr').length == 0){
                                        refreshBtn.trigger( "click" );
                                    }
                                    

                                }, 
                                true
                            );
                        }
                        
                        
                    }
                });
                
                
                
                if (value == undefined){
                    tr.DAgetBtn('icon-trash').removeClass('disabled'); 
                    tr.data('operate', DAoperate.insert);
                    tr.DAgetBtn('icon-trash').trigger('click');
                }
                
                
                
                return tr;
            }
            
            
 //=================================================================================           
///---------------------request----------------------------------------------------------            
            function request(doEnd){
                //alert('dsfsd');
                $(this).DAquickRequest({
                        rules:{
                            operate: DAoperate.select, name: window.DAtable,
                            ruleData: {offset: (step * displayMaxRow).toString(), count: displayMaxRow, full:true}
                        }
                },
                function( jsonData ) {
                            //alert(JSON.stringify(jsonData));
                            reciveRowCount = parseInt(jsonData.data.count);
                            maxStep = Math.ceil(reciveRowCount / displayMaxRow);
                            
                            $.each(jsonData.data.data, function(index, value){
                                addTr(value);
                            });
                          
                            var to = ((step * displayMaxRow)) + displayMaxRow;
                            to = to > reciveRowCount ? to - (to - reciveRowCount) : to;
                            showMaxRow = reciveRowCount < displayMaxRow ? reciveRowCount : displayMaxRow;

                            $('#demo-dtable-03_info').html('Showing ' + ((step * showMaxRow)).toString() + ' to '
                                                           + to.toString() + ' of ' + reciveRowCount.toString() +' entries');
                                                   
                                                   
                                
                            if(doEnd){
                                doEnd();
                            }     
                        });
            }
            
//-----------------------goRequest--------------------------------------------------            
           function goRequest(fin, fout){
                 if (lockBtn.DAbtnCheck('icon-unlock')){
                       lockBtn.trigger('click');
                 }
               
                tbody.fadeOut( iFadeOut, function() {
                     tbody.empty();
                     request(function (){
                            if (fout){
                                fout();
                            }
                            tbody.fadeIn( iFadeIn , function (){
                                if (fin){
                                    fin()
                                }
                            });
                     });
                     
                });
           }
            
//--------------------next prev--------------------------------------------------           
           var iFadeOut = 900;
           var iFadeIn = 500;
          
            next.click(function (){
               if (!$(this).hasClass('disabled')){
                    
                    if ((step + 1) >= maxStep ){
                        next.addClass('disabled');
                        prev.removeClass('disabled');
                    }
                    else{
                        step++;
                        self = $(this);
                        $(this).addClass('disabled');

                        goRequest(function (){
                            self.removeClass('disabled');
                        })
                    }
                     
                     
                     if (step > 0){
                          prev.removeClass('disabled');
                     }
                     
               }
           });
           
           prev.click(function (){
               if (!$(this).hasClass('disabled')){
                    
                   if ((step) <= 0){
                        next.removeClass('disabled');
                        prev.addClass('disabled');                        
                   }
                   else{
                        step--;
                        self = $(this);
                        $(this).addClass('disabled');
                        
                        goRequest(function (){
                            self.removeClass('disabled');
                        })
                   }
                   
                   if (step < maxStep){
                          next.removeClass('disabled');
                     }
                   
                }
           });
           
//-----------------call request-----------------------------------------------------
           request();        
            
        }
        
        
        
        
        

         $.fn.DAselect = function (defKey, tname){
             var self = $(this);
             
             $(this).DApostJson({
                    url: window.DAurl,
                    success: function( jsonData ) { 
                            /*if( $.pnotify ) {
                                $.pnotify(jsonData.notify);                   
                            }*/
                          
                          var op = '';
                          $.each(jsonData.data, function(index, value){
                               op = '<option value="' + index + '">'+ value +'</option>' ;
                               
                               self.append($(op));
                              
                          });
                         
                           self.select2({
                                theme: "classic",
                                width: '100%' , 
                            }).select2("val", defKey);
                            
                        },
                    error:function( jqXHR, textStatus ) {
                            if( $.pnotify ) {
                                $.pnotify({
                                    title: 'Request failed!',
                                    text: textStatus + ": Please try again.",
                                    type: textStatus
                                });
                            }
                    },
                    data:{rules:{operate: DAoperate.lookUp, name: tname}//window.DAtable}
                    }      
                });
               
         }

         $.fn.DAform =function (options){
             var optionsType = {
                 insert: 'insert',
                 update: 'update'
             }
             
             options.type = options.type == undefined ? optionsType.insert : options.type;
             
             
             var formModel = $('<form/>',{
                            id: "anim-modal",
                            class: "modal fade hide"
                         }).prepend(
                                 $( "<div/>",{
                                      class: 'modal-header', 
                                      text: options.title
                                  }).prepend(
                                        $( "<button/>",{
                                             class: 'close',
                                             type: "button",
                                             'data-dismiss': "modal",
                                             html: '&times;'
                                         })
                                  ).after(
                                        $( "<div/>",{
                                              class: 'modal-body',
                                         }).prepend(
                                                 $( "<div/>",{
                                                        class: 'control-group row-fluid',
                                                 })
                                         )
                                  ).after(
                                        $( "<div/>",{
                                            class: 'modal-footer',
                                         }).prepend(
                                              $( "<input/>",{
                                                   id: "insert",
                                                   type: "submit",
                                                   value: "Insert",
                                                   class: "btn btn-success",
                                               }).after(
                                                    $( "<input/>",{
                                                         id: "cancle",
                                                         type: "button",
                                                         value: "Cancle",
                                                         class: "btn btn-danger pull-right",
                                                         'data-dismiss': "modal"
                                                     })       
                                               ).after(
                                                    $( "<input/>",{
                                                         type: "reset",
                                                         value: "Reset",
                                                         class: "btn pull-left btn-info"
                                                     })       
                                               )
                                         )
                                  )
                          )
                            
            var rules = {}; 
             
            $.each(options.fields, function (i, value){
               if (value.type == undefined) value.type = 'text';
               if (value.id == undefined) value.id = '';
               
               var def = '';
               if (options.type == optionsType.insert){
                   if (value.def != undefined){
                        def = value.def;
                   }
               }
               else{
                   if (options.data != undefined){
                       if ((value.name != undefined) && (options.data[value.name] != undefined)){
                            def = options.data[value.name];
                       }
                       else if (options.data[value.name] == undefined){
                           def = value.def;
                       }
                   }
               }
                
               var required = "";
               if (value.rules != undefined) {
                    required = value.rules.required != undefined ? '<span class="required">*</span>' : '';
                    
                    $.extend(rules, {[value.name]: value.rules});                   
               }
                
               var label = '<label class="control-label">' + value.label + required +'</label>';
               var input = '<input type="' + value.type + '" name="' + value.name + '" class="span12" value="' + def + '"/> ';
               var div = label + '<div class="controls ">' + input +'</div>';
                
               formModel.find("div.control-group").append($(div));
               formModel.find("input[id=insert]").val(options.type);
               
                 //   document.write(i + value.label);
             });
            
          
            formModel.modal({keyboard: true});
            
            $(formModel).validate({'rules': rules, 
                                    submitHandler: function(form) {
                                        options.events.submitHandler(form);                                        
                                    }
                                  });
            
            formModel.on('hidden.bs.modal', function () {
                   formModel.remove();
            });
         }
         
         
         $.fn.DAheaderTable = function (options){
            $(this).addClass('widget-header')/*,{
                    class: 'widget-header',                
                }).appendTo($(this))*/
                        .prepend(
                            $('<span/>',{
                                class: 'title',
                                text: options.title
                             }).prepend(
                                     $( "<i/>",{
                                          class: 'icol-table'
                                 
                                      })
                              )
                          )
             return $(this);
        }
        
        
        $.fn.DAtoolBar = function (options){
            $(this).addClass('toolbar')
                         .prepend($("<span/>",{
                                   class: 'btn-group'
                                }).prepend($('<a/>',{
                                               class: "btn btn-small"
                                           }).prepend($("<i/>", {
                                                       class: "icon-search",
                                                       click: null
                                                      })    
                                           ).after($('<a/>',{
                                                       class: "btn btn-small"
                                                       }).prepend($("<i/>", {
                                                                   class: "icon-pencil",
                                                                   click: null
                                                                  })    
                                                       )
                                           ).after($('<a/>',{
                                                       class: "btn btn-small"
                                                   }).prepend($("<i/>", {
                                                               class: "icon-trash",
                                                               click: null
                                                              })    
                                                   )
                                           ).after($('<a/>',{
                                                       class: "btn btn-small"
                                                   }).prepend($("<i/>", {
                                                               class: "icon-plus",
                                                               click: null
                                                              })    
                                                   )
                                           )
                                   )
                     )
            
            
        }
    
    
        $.fn.DAdataTable = function(header){
            $('<div/>', {
                class: 'widget',
            }).appendTo($(this))
            .prepend($('<div/>').DAheaderTable({
                                    title: "david",
                                    
                                })
            )
            /*.prepend(
                $('<div/>',{
                    class: 'widget-header',                
                }).prepend(
                            $('<span/>',{
                                class: 'title',
                                text: header
                             }).prepend(
                                     $( "<i/>",{
                                          class: 'icol-table'
                                 
                                      })
                              ).after($("<div>",{
                                            class: 'toolbar',
                                        }).prepend($("<span/>",{
                                                       class: 'btn-group'
                                                    }).prepend($('<a/>',{
                                                                   class: "btn btn-small"
                                                               }).prepend($("<i/>", {
                                                                           class: "icon-search",
                                                                           click: null
                                                                          })    
                                                               ).after($('<a/>',{
                                                                           class: "btn btn-small"
                                                                           }).prepend($("<i/>", {
                                                                                       class: "icon-pencil",
                                                                                       click: null
                                                                                      })    
                                                                           )
                                                               ).after($('<a/>',{
                                                                           class: "btn btn-small"
                                                                       }).prepend($("<i/>", {
                                                                                   class: "icon-trash",
                                                                                   click: null
                                                                                  })    
                                                                       )
                                                               ).after($('<a/>',{
                                                                           class: "btn btn-small"
                                                                       }).prepend($("<i/>", {
                                                                                   class: "icon-plus",
                                                                                   click: null
                                                                                  })    
                                                                       )
                                                               )
                                                       )
                                         )
                                )
                ).after($('<a/>',{
                            class: "widget-content table-container"
                        }).prepend($('<div/>',{
                                        class: "dataTables_wrapper form-inline"
                                   }).prepend($("<table/>",{
                                                   class: "table table-striped"
                                              }).prepend($("<thead/>",{
                                                              class: "table table-striped"
                                                          }).prepend($("<tr/>",{
                                                              
                                                                    })
                                                           ).after($("<tbody/>",{
                                                              
                                                                    })
                                                             )
                                                ).after($("<div/>",{
                                                             class: "dt_footer"
                                                        }).prepend($("<div/>",{
                                                                        class: "row-fluid"
                                                                   }).prepend($("<div/>",{
                                                                                  class: "span6"
                                                                              }).prepend($("<div/>",{
                                                                                              id: "demo-dtable-03_info",
                                                                                              class: "dataTables_info",
                                                                                              text: "Showing 1 to 10 of 259 entries"
                                                                                         })
                                                                                ).after($("<div/>",{
                                                                                              class: "span6",
                                                                                        }).prepend($("<div/>",{
                                                                                                        class: "dataTables_paginate paging_bootstrap pagination",
                                                                                                   }).prepend($("<ul/>",{
                                                                                                       
                                                                                                              }).prepend($("<li/>",{
                                                                                                                             class: "prev disabled",
                                                                                                                         }).prepend($("<a/>",{
                                                                                                                                        text: "← Previous"
                                                                                                                                     })
                                                                                                                           ).after($("<li/>",{
                                                                                                                                        class: "active",
                                                                                                                                    }).prepend($("<a/>",{
                                                                                                                                                   text: "1"
                                                                                                                                                })
                                                                                                                                       ).after($("<li/>",{
                                                                                                                                                }).prepend($("<a/>",{
                                                                                                                                                               text: "2"
                                                                                                                                                            })
                                                                                                                                                   ).after($("<li/>",{
                                                                                                                                                            }).prepend($("<a/>",{
                                                                                                                                                                           text: "3"
                                                                                                                                                                        })
                                                                                                                                                               ).after($("<li/>",{
                                                                                                                                                                            class: "next"
                                                                                                                                                                       }).prepend($("<a/>",{
                                                                                                                                                                                       text: "Next → "
                                                                                                                                                                                    })
                                                                                                                                                                           )
                                                                                                                                                                )
                                                                                                                                                    )
                                                                                                                                        )
                                                                                                                            )
                                                                                                                )
                                                                                                     )
                                                                                           )
                                                                                 )
                                                                     )
                                                          )
                                                 )
                                     )
                          )
                  )
            );*/
        }

    
        /*$.fn.DAdataTable = function(detail){
           $.each(detail, function (index, value){
               
               
               
           });
           
       
           
            
        }*/
        
        
        

    
//--run---------------------------------------------------------------------------
			
	var demos = {
	};
               
        
        $(document).ready(function() {
                    
		
	});
	
	$(window).load(function() {                
		// When all page resources has finished loading
	});
	
}) (jQuery, window, document);

