<?php
include '../../share/core/php/DADispatcher.php';
include '../../share/core/db/DADb.php';

use core\php\DANotify;
use core\php\DADispatcher;
use core\db\DADb;

error_log(DADispatcher::getMode());
//error_log($_POST[DADispatcher::MODE]);

if (strcmp(DADispatcher::getMode(), DADispatcher::PRENEW) == 0){
    DADispatcher::redirect("../group/addgroup/addgroup_view.php");
}
elseif (strcmp(DADispatcher::getMode(), DADispatcher::SAVE) == 0){
    DADb::add_group($_POST['group_name'], $_POST['desc']);
}
elseif (strcmp(DADispatcher::getMode(), DADispatcher::SEARCH) == 0){
    session_start();
    $_SESSION["group_name"] = $_POST['group_name'];

    DADispatcher::redirect("../group/showgroup/showgroup_view.php");
}
elseif (strcmp(DADispatcher::getMode(), DADispatcher::DELETE) == 0){ //correct block
    if(DADb::delGroup($_POST['id'])) {
        DANotify::info("با موفقیت حذف گردید.", "../group/showgroup/showgroup_view.php");
    }
}
elseif (strcmp(DADispatcher::getMode(), DADispatcher::EDITSHOW) == 0){//correct block
//    error_log('id-->' . $_POST['id']);

    session_start();

    $_SESSION['grp'] = DADb::selectGroupFromId($_POST['id']);

    DADispatcher::redirect("../group/editgroup/editgroup_view.php");
}
elseif (strcmp(DADispatcher::getMode(), DADispatcher::EDIT) == 0){ //correct block
    error_log($_POST['id']. "-" . $_POST['group_name'] . "-" . $_POST['desc']);

    if(DADb::updateGroup($_POST['id'], $_POST['group_name'], $_POST['desc'])) {
        DADispatcher::setMode(DADispatcher::SUCCESSFULL);

        $_SESSION['grp'] = DADb::selectGroupFromId($_POST['id']);//no correct

        DANotify::info("با موفقیت به روز رسانی گردید.", "../group/editgroup/editgroup_view.php");
    }
    else{
        DANotify::error("اشکال در انجام عمل بروز رسانی!", "../group/editgroup/editgroup_view.php");
    }
}
