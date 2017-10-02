<!-- --v-david 1396-03-22 -->

<!DOCTYPE html>
<html >
<head>
    <meta charset="UTF-8">
    <!-- TODO:bubdle-->
    <title>سامانه تستی</title>


    <!-- bootstrap -->
    <link rel="stylesheet" href="../../share/css/bootstrap.min.css"/>

    <!-- pnotify -->
    <link rel="stylesheet" href="../../share/css/pnotify.custom.min.css" media="screen"/>

    <!-- animate.css -->
    <link rel="stylesheet" href="../../share/css/animate.css" media="screen"/>

    <!-- bootstrap-slider.css
    <link rel="stylesheet" href="../../share/css/bootstrap-slider.css" media="screen"/>-->

    <!-- select2
    <link rel="stylesheet" href="../../share/css/select2.css" media="screen"/>
    <link rel="stylesheet" href="../../share/css/select2-bootstrap.css" media="screen"/>-->

    <!-- -------------------- -->
    <link rel="stylesheet" href="../../share/css/bootstrap-pnotify.custom.DA.css"/>
    <link rel="stylesheet" href="../../share/css/da-message-form.css"/>
    <link rel="stylesheet" href="../../share/css/da-menu.css"/>
    <link rel="stylesheet" href="../../share/css/da-base.css"/>
    <link href="../../share/css/da-fonts.css" rel="stylesheet"/>
    <link href="../../share/css/da-main.css" rel="stylesheet"/>
    <link href="../../share/css/da-date.css" rel="stylesheet"/>
    <link href="../../share/css/da-print.css" rel="stylesheet"/>
    <link href="../../share/css/da-attachment.css" rel="stylesheet"/>
    <link href="../../share/css/da-show_image.css" rel="stylesheet"/>
</head>

<body id="body">
<!-- TODO:bubdle-->
<!-- <%@ include file="/app../../share/register/struts-error-message.jsp"%> -->

<div id="regbar">
    <div id="navthing">

        <div class="agahi-img-container">
            <ul id="logout">
                <!-- TODO: bundle for password -->
                <a href="#"  data-toggle="tooltip" data-placement="right" title="تغییر پسورد"><li id="change-password"><img alt="lock" src="../../share/images/lock.png"/></li></a>
                <!-- TODO: bundle for logout -->
                <a href="../login/logOut_ctl.php" data-toggle="tooltip" data-placement="right" title="خروج"><li ><img alt="lock" src="../../share/images/off.png"/></li></a>
            </ul>

            <img  id="logoutMenu" class="agahi-img" src="../../share/images/educational.png">

        </div>

        <div id="logo">
            <img id="logo-img" src="../../share/images/logo.png">
        </div>

        <div id="horizontal-menu-container" class="no-select">
            <ul class="menu horizontal-menu">
                <li id="user-icon" >
                    <a  href="#"><span  class="glyphicon glyphicon-user"></span></a>
                </li>

                <li id="menu-icon"><a href="#"><span  class="glyphicon glyphicon-menu-hamburger"></span></a>
                </li>

            </ul>
        </div>
    </div>

</div>

<!--TODO: data-url to da-url and use bundle-->
<div id="vertical-menu" class="menu vertical-menu-container no-select">
    <ul class="vertical-menu">
        <li class="vertical-sub-menu"><a href="#" da-bundle="group">گروه</a>
            <ul>
                <li data-url="../group/searchgroup/searchgroup_view.php" ><a href="#" da-bundle="group">گروه</a></li>
            </ul>
        </li>
    </ul>
</div>

<div id="container">
    <div da-type="da-message_container" da-url="../../share/actMessage.do"></div>
</div>



<!-- ------------------------------------------   -->
<div id="bilbord-content" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div id="bilbord" class="modal-content">

            <div class="modal-body">
                <div id="title-container">
                    <div id="title">
                        <!-- TODO:bubdle-->
                        سامانه ی تستی
                    </div>
                    <div id="agahi-image-bilbord">
                        <img class="agahi-img" src="../../share/images/educational.png">
                    </div>
                </div>

                <div id="bilbord-details">
                    <div>
                        <!-- TODO:bubdle-->
                        name karbarey : <span> user_name user_family</span>
                    </div>
                    <!-- TODO:bubdle-->
                    <div>time : <span>date</span> </div>
                    <!-- TODO:bubdle-->
                    <div>enter : <span>enter time</span></div>
                    <!-- TODO:bubdle-->
                    <div> <strong>version</strong></div>
                </div>
            </div>

        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
</div>





<!-- jquery -->
<script src="../../share/scripts/jQuery/jquery-3.1.1.min.js"></script>

<!-- select2 Script
<script src="../../share/scripts/jQuery/select2.js"></script>-->

<!-- bootstrap -->
<script src="../../share/scripts/bootstrap.min.js"></script>

<!-- jquery.validate -->
<script src="../../share/scripts/jQuery/jquery.validate.min.js"></script>
<script src="../../share/scripts/jQuery/jquery.validate.additional-methods.min.js"></script>
<script src="../../share/scripts/jQuery/messages_fa.js"></script>
<script src="../../share/scripts/jQuery/jquery-validate.bootstrap-tooltip.min.js"></script>

<!--serialize-->
<script src="../../share/scripts/jQuery/jquery.serialize-object.min.js"></script>

<!-- Pnotify Script  -->
<script src="../../share/scripts/jQuery/pnotify.custom.min.js"></script>
<script src="../../share/scripts/jQuery/pnotify.types.DA.js"></script>

<!-- jquery.fileDownload Script  -->
<script src="../../share/scripts/jQuery/jquery.fileDownload.js"></script>

<!-- bootstrap-slider.js
<link rel="stylesheet" href="../../share/scripts/jQuery/bootstrap-slider.js" media="screen"/>-->

<!-- html2canvas  -->
<script src="../../share/scripts/html2canvas.js"></script>

<!-- da...--------------------------------------- -->
<script src="../../share/scripts/da-main.js"></script>
<script src="../../share/scripts/da-XSLTransform.js"></script>
<script src="../../share/scripts/da-menu.js"></script>
<script src="../../share/scripts/da-base.js"></script>
<script src="../../share/scripts/da-data.js"></script>
<script src="../../share/scripts/da-date.js"></script>
<script src="../../share/scripts/da-print.js"></script>
<script src="../../share/scripts/da-attachment.js"></script>
<script src="../../share/scripts/da-show_image.js"></script>
<script src="../../share/scripts/da-show_message.js"></script>

<!--<script src="../../share/scripts/da-bundle.js"></script>-->

</body>
</html>
