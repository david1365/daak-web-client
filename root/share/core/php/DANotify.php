<?php

namespace core\php;

class DANotify
{
    const INFO = 'info';
    const ERROR = 'error';

    private static function redirect($redirect, $key, $message){
        session_start();
        $_SESSION[$key] = $message;
        header("Location:$redirect");
    }

    public static function info($message, $redirect){
        self::redirect($redirect, self::INFO, $message);
    }

    public static function error($message, $redirect){
        self::redirect($redirect, self::ERROR, $message);
    }
}