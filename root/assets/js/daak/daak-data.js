/**
 * Created by david on 10/23/2016.
 */
;(function( $, window, document, undefined ) {

    $.mode = {
        SAVE: 'save',
        SUCCESSFULL: 'successfull',
        SEARCH: "search",
        DELETE: "delete",
        SEARCH_SHOW: "search_show",
        AFTER_SELECT_DOSSIER: "after_select_dossier",
        SELECT_DOSSIER: 'select_dossier',
        SEND_SHOW: "send_show",
        END_DOSSIER: "end_dossier",
        PRINT: "print",
        NEW: "new",
        EDITSHOW: "edit_show",
    };

    $.formType = {
        MODAL: 'modal',
        SEARCH_MODAL: 'search_modal',
        SHOW: 'show',
        EDIT: 'edit',
        ADD: 'add'
    };

    $.buttonType = {
        DA_REFRESH: 'da-refresh',
    }

    $.serializeType = {
        DEFAULT: 'default',
        FORM_DATA: 'form_data',
    }

    $.formData = {
        FORM_TYPE: 'form_type',
        INSERT_URL: 'insert_url',
        INSERT_MODALSIZE: 'insert_modalSize',
        ACTION: "action",
        DATA_NO_HIDE: "data-no-hide",
        NO_ALWAYS_SHOW: "no_always_show",
        OPEN_SHOW_FORM: "open_show_form",
        MODAL_SIZE: "modal_size",
        DA_REFRESH_COMMAND: 'da-refresh_command',
        DA_SERIALIZE: 'da-serialize',
    }

    $.notifyTypes = {
        SUCCES: 'succes',
        ERROR: 'error' ,
        INFO: 'info',
        NOTICE: 'notice',
    };


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
        ERROR_COUNT: ' تعداد' +  '&nbsp' + "{0}" + "&nbsp"   +"خطا رخ داده است." + "در تکمیل فرم دقت کنید!",
        RECEIVE_ERROR: 'اشکال در دریافت اطلاعات!',
        RECEIVE_FILE_ERROR: 'اشکال در دریافت فایل,ممکن است اطلاعاتی برای دریافت وجود نداشته باشد!',
        RECEIVE_XML_ERROR:  'اشکال در دریافت فایل xml!',

        PRINT: 'چاپ',
        PRINT_FINGER:'چاپ برگه ی انگشت نگاری' ,

        REFRESH: 'بازیابی',
        END_RECORD: 'آخرین',
        FIRST_RECORD: 'اولین'
    };

}) (jQuery, window, document);