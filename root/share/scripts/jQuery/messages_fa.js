(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery", "../jquery.validate"], factory );
	} else if (typeof module === "object" && module.exports) {
		module.exports = factory( require( "jquery" ) );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: FA (Persian; فارسی)
 */
$.extend( $.validator.messages, {
	required: "تکمیل این فیلد اجباری است.",
	remote: "لطفا این فیلد را تصحیح کنید.",
	email: ".لطفا یک ایمیل صحیح وارد کنید",
	url: "لطفا آدرس صحیح وارد کنید.",
	date: "لطفا یک تاریخ صحیح وارد کنید",
	dateFA: "لطفا یک تاریخ صحیح وارد کنید",
	dateISO: "لطفا تاریخ صحیح وارد کنید (ISO).",
	number: "لطفا عدد صحیح وارد کنید.",
	digits: "لطفا تنها رقم وارد کنید",
	creditcard: "لطفا کریدیت کارت صحیح وارد کنید.",
	equalTo: "لطفا مقدار برابری وارد کنید",
	extension: "لطفا مقداری وارد کنید که ",
	maxlength: $.validator.format( "لطفا بیشتر از {0} حرف وارد نکنید." ),
	minlength: $.validator.format( "لطفا کمتر از {0} حرف وارد نکنید." ),
	rangelength: $.validator.format( "لطفا مقداری بین {0} تا {1} حرف وارد کنید." ),
	range: $.validator.format( "لطفا مقداری بین {0} تا {1} حرف وارد کنید." ),
	max: $.validator.format( "لطفا مقداری کمتر از {0} وارد کنید." ),
	min: $.validator.format( "لطفا مقداری بیشتر از {0} وارد کنید." ),
	minWords: $.validator.format( "لطفا حداقل {0} کلمه وارد کنید." ),
	maxWords: $.validator.format( "لطفا حداکثر {0} کلمه وارد کنید." ),

	//--v-david 1395-08-02
	notEqualTo: "لطفا مقدار نابرابری را وارد کنید.",
	require_from_group: 'لطفا یکی از مقادیر را پر کنید!',
	checkboxGroupValidate: 'لطفا یکی از موارد مربوطه را انتخاب کنید!',
	persianDate: 'لطفا تاریخ را صحیح وراد نمایید!'
	//--^-david 1395-08-02
} );

}));

//--v-david 1395-08-02
$.validator.addMethod("notEqualTo",
	function(value, element, param) {
		var notEqual = true;
		value = $.trim(value);
		for (i = 0; i < param.length; i++) {
			if (value == $.trim($(param[i]).val())) { notEqual = false; }
		}
		return this.optional(element) || notEqual;
	},
	$.validator.messages.notEqualTo
);
//--------------------------------
$.validator.addMethod("onechecked", function (value, elem, param) {
	if ($(".da-sibling-checkbox:checkbox:checked").length > 0) {
		return true;
	} else {
		return false;
	}
}, $.validator.messages.checkboxGroupValidate);

$.validator.addClassRules("da-sibling-checkbox", {
	onechecked: true
});


$.msg = {
	 err_zip_code_length__: "كد پستي 5 يا 10 رقمي مي باشد",
	 err_zip_code_zero__: "در كد پستي رقم 0 نبايد وجود داشته باشد",
	 err_zip_code_two__: "در كد پستي رقم 2 نبايد وجود داشته باشد",
	 err_national_code_format__: "كد ملي را درست وارد كنيد",
	 err_national_code_length__: "كد ملي 10 رقمي مي باشد",
	 err_national_code_number__: "كد ملي عدد مي باشد",
	 err_iran_vehicle__: "براي وسيله ايراني نمي توانيد خودرو خارجي انتخاب كنيد",
	 err_forgin_vehicle__: "براي وسيله خارجي نمي توانيد خودرو ايراني انتخاب كنيد",
	 err_model_vehicle__: "مدل خودرو با نوع وسيله همخواني ندارد",
	 err_dual_malk__: "مالك خودرو يا سازمان مي باشد يا فرد لطفا اصلاح كنيد",
	 err_not_malk__: "لطفا مالك خودرو را وارد كنيد",
	 err_plak__: "لطفا پلاك را درست وارد كنيد",
	 err_not_plak__: "پلاك را وارد كنيد",
	 err1 :  "فيلدهاي با حاشيه قرمز حتما بايستي پر شوند",
	 err2 :  "فيلد مورد نظر از نوع عددي مي باشد",
	 err3 :  "تغييراتي براي ثبت موجود نيست",
	 DELETE: "حذف",
	 DELETE_MESSAGE :  "آیا برای حذف کردن مطمئن هستید؟",
	 pltmsg: "لطفا پلاك را درست وارد كنيد",
	 err_shomareh_motor_or_shomareh_shasi : "شماره شاسی یا شماره موتور   نباید کمتر از 6 رقم باشد",
	 err_date: "تاریخ تولد یا صدور شناسنامه ازتاریخ جاری بزرگتر است",
	 warningConfirm: "ركورد حذف شود؟",
	 input_txt_1: ' !"#$%،گ)(×+و-./0123456789:ك,: .؟@ِذ}ىُىلآ÷ـ،/’د×؛َءٍف‘{ًْإ~جژچ^_پشذزيثبلاهتنمئدخحضقسفعرصطغظ<|>ّ',
	 input_txt_2: ' !"#$%،گ)(×+و-./0123456789:ك,=.؟@ِذ}ىُىلآ÷ـ،/’د×؛َءٍف‘{ًْإ~جژچ^_پشذزيثبلاهتنمئدخحضقسفعرصطغظ<|>ّ',
	 PASSWD_ERROR1 :  "تکرار کلمه عبور1 صحیح نیست",
	 PASSWD_ERROR2 :  "تکرار کلمه عبور2 صحیح نیست",
	 PASSWD_ERROR3 :  "کلمه عبور1 با کلمه عبور2 باید متفاوت باشد",
	 loc_err :  "محل خدمت را مشخص کنید",

	 USER_NAME_ERROR: "لطفا نام کاربری را وارد کنید!",
	 USER_PASS_ERROR: "لطفا پسورد را وارد کنید!",

	 SUCCES: 'موفقیت',
	 ERROR: 'خطا!' ,
	 INFO: 'جهت اطلاع',
	 NOTICE: 'خبر',

	 FILL_MEMBERS: "فرم ورود را کامل پر کنید!",
	 ERROR_COUNT: ' تعداد' +  '&nbsp' + "{0}" + "&nbsp"   +"خطا رخ داده است &nbsp." + "در تکمیل فرم دقت کنید!",
	 RECEIVE_ERROR: 'اشکال در دریافت اطلاعات!',
	 RECEIVE_FILE_ERROR: 'اشکال در دریافت فایل,ممکن است اطلاعاتی برای دریافت وجود نداشته باشد!',
	 RECEIVE_XML_ERROR:  'اشکال در دریافت فایل xml!',

	 PRINT: 'چاپ',
	 PRINT_FINGER:'چاپ برگه ی انگشت نگاری' ,

	 REFRESH: 'بازیابی',
	 END_RECORD: 'آخرین',
	 FIRST_RECORD: 'اولین'
};
//--^-david 1395-08-02