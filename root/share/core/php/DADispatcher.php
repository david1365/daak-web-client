<?php

namespace core\php;

use function PHPSTORM_META\elementType;

class DADispatcher
{
    const MODE = 'mode';
    const PRENEW = "new";
    const ADD = 'add';
    const NONE = 'none';
    const SUCCESSFULL = 'successfull';
    const SAVE = 'save';
    const SEARCH = "search";
    const DELETE = "delete";
    const EDITSHOW = "edit_show";
    const EDIT = "edit";

    public static function mode(){
            echo self::getMode();
    }

    public static function getMode(){
        if(isset($_GET[self::MODE])){
            return $_GET[self::MODE];
        }
        else if(isset($_POST[self::MODE])){
            return $_POST[self::MODE];
        }
        else if(isset($_SESSION[self::MODE])){
            session_start();
            $mode = $_SESSION[self::MODE];
            unset($_SESSION[self::MODE]);

            return $mode;
        }

        return self::NONE;
    }

    public static function setMode($mode){
        session_start();

        $_SESSION[self::MODE] = $mode;
    }

    public static function redirect($path){
        header("Location:$path");
    }

}