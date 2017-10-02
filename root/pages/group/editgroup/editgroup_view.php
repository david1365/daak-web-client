<!-- --v-david 1396-07-03 -->
<?php
include '../../../share/core/php/error_message.php';
include '../../../share/core/php/DADispatcher.php';

use core\php\DADispatcher;

session_start();
$result = $_SESSION['grp'];
$row = $result;//->fetch_assoc();

//error_log($row["id"]);
?>

<form action="../group/group_ctl.php" method="POST" id="edit_group">
    <input type="hidden" name="mode" value="<?php DADispatcher::mode()?>"/>
    <input type="hidden" name="id" value="<?php echo $row["id"];?>"/>

    <div class="form-group" >
        <label >نام گروه</label>
        <input type="text" name="group_name"  class="form-control" value="<?php echo $row["group_name"];?>"/>
    </div>

    <div class="form-group">
        <label >توضیحات</label>
        <textarea name="desc" class="form-control" ><?php echo $row["des"];?></textarea>
    </div>

    <div class="modal-footer text-left">
        <div class="modal-footer text-left">
            <button id="submit" type="submit" class="btn btn-warning" data-command="edit">تایید</button>
            <button type="button" class="btn btn-primary" data-dismiss="return">بازگشت</button>
        </div>
    </div>

</form>


<script src="../group/editgroup/edit_group.js"></script>