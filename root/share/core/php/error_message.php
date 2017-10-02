<!-- --v-david 1396-07-01 -->
<span class="da-message">
    <?php
        include 'DANotify.php';

        use core\php\DANotify;

        session_start();
        if (isset($_SESSION[DANotify::ERROR])){
            print $_SESSION[DANotify::ERROR] . ',' . DANotify::ERROR;

            unset($_SESSION[DANotify::ERROR]);
        }
        else if (isset($_SESSION[DANotify::INFO])) {
            print $_SESSION[DANotify::INFO] .',' . DANotify::INFO;

            unset($_SESSION[DANotify::INFO]);
        }
    ?>
</span>
<!-- --^-david 1396-07-01 -->
