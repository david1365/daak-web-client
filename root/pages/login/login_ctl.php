<?php

include '../../share/core/php/DANotify.php';

use core\php\DANotify;

if (!empty($_POST)) {
    if (isset($_POST["user_name"], $_POST["user_pass"])){
        $userName = $_POST['user_name'];
        $password = $_POST['user_pass'];

        if ($userName == "david" && $password == "david") {
            header("Location:../adminpage/adminpage_view.php");
        } else {
            DANotify::error("لطفا نام کاربری و کلمه ی عبور را درست وارد کنید!", "login_view.php");
        }
    }
}