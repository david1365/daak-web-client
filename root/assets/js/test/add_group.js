/**
 * Created by dav.akbari on 11/2/2016.
 */
;(function( $, window, document, undefined ) {
    $.add_group = {
        sentCompleted: function(params) {
            var form = params.form;

            $(form).attr($.formData.FORM_TYPE, $.formType.ADD);

            //---formValidate-----------------------
            if ($.fn.formValidateModal) {
                $(form).formValidateModal({
                    rules: {
                        group_name: {
                            required: true,
                            minlength: 2
                        },
                    }
                });
            }
        },

		afterCreateBody: function (params) {
			var form = params.form;

			$(form).find('#example:first').DataTable({

				"language": {

					"sEmptyTable": "داده ای برای نمایش وجود ندارد",
					"sInfo": "_START_ تا _END_ از _TOTAL_ رکورد",
					"sInfoEmpty": "0 تعداد 0 از 0 رکورد",
					"sInfoFiltered": "(gefiltert von _MAX_ EintrÃ¤gen)",
					"sInfoPostFix": "",
					"sInfoThousands": ".",
					"sLengthMenu": "_MENU_ رکورد",
					"sLoadingRecords": "در حال دریافت اطلاعات...",
					"sProcessing": "لطفا منتظر باشید...",
					"sSearch": "جســتجو: ",
					"sZeroRecords": "داده ای برای نمایش وجود ندارد",
					"oPaginate": {
						"sFirst": "ابتدا",
						"sPrevious": "قبلی",
						"sNext": "بعدی",
						"sLast": "انتها"
					},
					"oAria": {
						"sSortAscending": ": مرتب سازس صعودی",
						"sSortDescending": ": مرتب سازی نزولی"
					}
				},
				"pagingType": "full_numbers",
				select: true,
				"createdRow": function (row, data, index) {
					if (data[1].replace(/[\$,]/g, '') * 1 > 150000) {
						$('td', row).css("color", "red");
						/*$('td', row).eq(1).css("color","red");*/
					}
				},

				dom: 'Bfrtip',
				buttons: [
					'copy', 'csv', 'excel', 'pdf', 'print'
				],
				// // dom: '<"top"fB>rt<"bottom"ilp><"clear">',
				// buttons: [
				// 	{
				// 		extend: 'collection',
				// 		text: 'Table control',
                //
				// 		buttons: [
				// 			'copy', 'csv', 'pdf',
				// 			{
				// 				extend: 'print',
				// 				text: 'Print all'
				// 			},
				// 			{
				// 				extend: 'print',
				// 				text: 'Print selected',
				// 				exportOptions: {
				// 					modifier: {
				// 						selected: true
				// 					}
				// 				}
				// 			},
				// 			{
				// 				extend: 'excel',
				// 				text: 'Exle selected',
				// 				exportOptions: {
				// 					modifier: {
				// 						selected: true
				// 					}
				// 				}
				// 			}
				// 		]
				// 	},
				// 	{
				// 		text: 'My button',
				// 		action: function (e, dt, node, config) {
                //
				// 			var ids = $.map(table.rows('.selected').data(), function (item) {
				// 				return item[0]
				// 			});
				// 			alert(ids)
				// 			const args = [ids, 'p1', 'p2'];
				// 			openDialog(args);
				// 			/*alert(table.rows('.selected').data().length + ' row(s) selected');
                //
                 //                           alert(table.row('.selected').item[1]);
                 //                      */
				// 		}
				// 	}
				// ],
				// columns: _cluns,
				"processing": true,
				"serverSide": true,
				"ajax": '_list/_list_controller/load_tbl/',
			});

			// $(form).find('#example:first').DataTable({
				// "sDom": "<'dt_header'<'row-fluid'<'span6'l><'span6'T>>r>t<'dt_footer'<'row-fluid'<'span6'i><'span6'p>>>",
				// "oTableTools": {
				// 	"sSwfPath": "plugins/datatables/TableTools/swf/copy_csv_xls_pdf.swf",
				// 	"aButtons": [
				// 		{
				// 			"sExtends": "copy",
				// 			"sButtonText": '<i class="icol-clipboard-text"></i> Copy'
				// 		},
				// 		{
				// 			"sExtends": "csv",
				// 			"sButtonText": '<i class="icol-doc-excel-csv"></i> CSV'
				// 		},
				// 		{
				// 			"sExtends": "xls",
				// 			"sButtonText": '<i class="icol-doc-excel-table"></i> Excel'
				// 		},
				// 		{
				// 			"sExtends": "pdf",
				// 			"sButtonText": '<i class="icol-doc-pdf"></i> PDF'
				// 		},
				// 		{
				// 			"sExtends": "print",
				// 			"sButtonText": '<i class="icol-printer"></i> Print'
				// 		}
				// 	]
				// },
			// 	dom: '<"top"fB>rt<"bottom"ilp><"clear">',
			// 	buttons: [
			// 		{
			// 			extend: 'collection',
			// 			text: 'Table control',
            //
			// 			buttons: [
			// 				'copy', 'csv', 'pdf',
			// 				{
			// 					extend: 'print',
			// 					text: 'Print all'
			// 				},
			// 				{
			// 					extend: 'print',
			// 					text: 'Print selected',
			// 					exportOptions: {
			// 						modifier: {
			// 							selected: true
			// 						}
			// 					}
			// 				},
			// 				{
			// 					extend: 'excel',
			// 					text: 'Exle selected',
			// 					exportOptions: {
			// 						modifier: {
			// 							selected: true
			// 						}
			// 					}
			// 				}
			// 			]
			// 		}
			// 		],
            //
			// 	"language": {
            //
			// 		"sEmptyTable": "داده ای برای نمایش وجود ندارد",
			// 		"sInfo": "_START_ تا _END_ از _TOTAL_ رکورد",
			// 		"sInfoEmpty": "0 تعداد 0 از 0 رکورد",
			// 		"sInfoFiltered": "(gefiltert von _MAX_ EintrÃ¤gen)",
			// 		"sInfoPostFix": "",
			// 		"sInfoThousands": ".",
			// 		"sLengthMenu": "_MENU_ رکورد",
			// 		"sLoadingRecords": "در حال دریافت اطلاعات...",
			// 		"sProcessing": "لطفا منتظر باشید...",
			// 		"sSearch": "جســتجو: ",
			// 		"sZeroRecords": "داده ای برای نمایش وجود ندارد",
			// 		"oPaginate": {
			// 			"sFirst": "ابتدا",
			// 			"sPrevious": "قبلی",
			// 			"sNext": "بعدی",
			// 			"sLast": "انتها"
			// 		},
			// 		"oAria": {
			// 			"sSortAscending": ": مرتب سازس صعودی",
			// 			"sSortDescending": ": مرتب سازی نزولی"
			// 		}
			// 	},
			// 	"processing": true,
			// 	"serverSide": true,
			// 	"ajax": '_list/_list_controller/load_tbl/',
			// });


		}
	};


}) (jQuery, window, document);
