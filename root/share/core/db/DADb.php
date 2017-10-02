<?php

namespace core\db;

//include "../php/DANotify.php";
include '../../share/core/php/DANotify.php';

use core\php\DADispatcher;
use core\php\DANotify;

class DADb
{
    const SERVER_NAME = "localhost";
    const USER_NAME = "root";
    const PASSWORD = "root";
    const DB_NAME = "group";

    public static function connect (){
        $conn =  mysqli_connect(self::SERVER_NAME, self::USER_NAME, self::PASSWORD, self::DB_NAME);
        if (!$conn) {
//                echo mysqli_connect_error();
            DANotify::error("Connection failed: " . mysqli_connect_error(), "../group/addgroup/addgroup_view.php");
        }

        return $conn;
//        return new PDO("mysql:host=" .SERVER_NAME . ";dbname=" . DB_NAME, USER_NAME, PASSWORD);
    }

    public static function add_group($name, $desc)
    {
//        error_log("add_group");
//        try {
            $conn = self::connect();
//            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            if ($conn) {
                $sql = "INSERT INTO TBL_GROUP (group_name, des)
                    VALUES ('$name', '$desc')";

//            $conn->exec($sql);


                if (mysqli_query($conn, $sql)) {
                    DADispatcher::setMode(DADispatcher::SUCCESSFULL);
                    DANotify::info("با موفقیت درج گردید.", "../group/addgroup/addgroup_view.php");
                } else {
                    DANotify::error($sql . ":" . mysqli_error($conn), "../group/addgroup/addgroup_view.php");
                }

                mysqli_commit();

                mysqli_close($conn);
//        } catch (PDOException $e) {
//
//        }
            }

    }

    public static function selectGroup($groupName) {
        $conn = self::connect();
        if ($conn) {
            $sql = "SELECT id, group_name, des FROM TBL_GROUP WHERE group_name like '%$groupName%'";
            $result = $conn->query($sql);

            return $result;


//            $conn->close();
        }
    }

    public static function selectGroupFromId($id) {
        $conn = self::connect();
        if ($conn) {
            $sql = "SELECT id, group_name, des FROM TBL_GROUP WHERE id = $id";
            $result = $conn->query($sql);

//            error_log($sql);

            return $result->fetch_assoc();
        }
    }

    public static function delGroup($id){
        $conn = self::connect();
        if ($conn) {
            $sql = "DELETE FROM  TBL_GROUP WHERE id=$id;";
           return $conn->query($sql);
        }
    }

    public static function updateGroup($id, $groupName, $des){
        $conn = self::connect();

        if ($conn) {
            $sql = "UPDATE TBL_GROUP
                    SET group_name='$groupName', des='$des'
                    WHERE id = $id";


            error_log($conn->query($sql) . $sql);
            return $conn->query($sql);
        }
    }
}

