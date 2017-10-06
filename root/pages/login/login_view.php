<!--v-david 1396-03-22 -->
<!DOCTYPE html>
<html >
<head>
    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title da-bundle="project_name"></title>


    <!-- bootstrap -->
    <link rel="stylesheet" href="../../share/css/bootstrap.min.css">

    <!-- pnotify -->
    <link rel="stylesheet" href="../../share/css/pnotify.custom.min.css" media="screen">

    <!-- animate.css -->
    <link rel="stylesheet" href="../../share/css/animate.css" media="screen">


    <link rel="stylesheet" href="../../share/css/bootstrap-pnotify.custom.DA.css">
    <link rel="stylesheet" href="../../share/css/login.css">
    <link href="../../share/css/da-fonts.css" rel="stylesheet">
    <link href="../../share/css/da-main.css" rel="stylesheet">


</head>

<body id="body">


<?php include '../../share/core/php/error_message.php';?>


<div id="wrap" data-login="login_form">
    <div id="regbar">
        <div id="navthing">
            <div id="title-container">
                <div id="enter">
                    <h2><a href="#" id="loginform" da-bundle="enter"></a></h2>
                </div>
                <div id="title" da-bundle="project_name">
                </div>
                <div id="agahi-image-big-dev">
                    <img class="agahi-img" src="../../share/images/educational.png">
                </div>
            </div>
            <form id="login-form" action="login_ctl.php" method="post">
                <!-- TODO:rename mode to status -->
                <input type="hidden" name="mode" value="login"/>
                <div class="login">
                    <div class="arrow-up"></div>
                    <div class="formholder">
                        <div class="randompad">
                            <fieldset>
                                <div id="adamak">
                                    <img id="adamak-img" src="../../share/images/adamak.png">
                                </div>
                                <label da-bundle="user_name"></label>
                                <div id="version"><da da-bundle="version" /></div>
                                <input type="text"  name="user_name" tabindex="1"/>
                                <label ><da da-bundle="password"/></label>
                                <input type="password" name="user_pass" tabindex="2"/>
                                <!-- TODO:bubdle for submit-->
                                <input type="submit" value="<da da-bundle='enter'/>"/>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<!--<img id="agha" src="../../share/images/agha.png" alt="عکس آقا">-->

<!-- jquery -->
<script src="../../share/scripts/jQuery/jquery-3.1.1.min.js"></script>

<!-- bootstrap -->
<script src="../../share/scripts/bootstrap.min.js"></script>

<!-- jquery.validate -->
<script src="../../share/scripts/jQuery/jquery.validate.min.js"></script>
<script src="../../share/scripts/jQuery/messages_fa.js"></script>
<script src="../../share/scripts/jQuery/jquery-validate.bootstrap-tooltip.min.js"></script>

<!-- Pnotify Script -->
<script src="../../share/scripts/jQuery/pnotify.custom.min.js"></script>
<script src="../../share/scripts/jQuery/pnotify.types.DA.js"></script>

<script src="../../share/scripts/da-main.js"></script>
<script src="login_ctrl.js"></script>
<script src="../../share/scripts/da-data.js"></script>
<script src="../../share/scripts/da-bundle.js"></script>
</body>
</html>
