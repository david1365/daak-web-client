/**
 * Created by david on 10/23/2016.
 */
;(function( $, window, document, undefined ) {

    da.lang = {
        EN: 'en',
        FA: 'fa'
    }
    
    da.config = '../../share/resource/config.js';

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

}) (jQuery, window, document);