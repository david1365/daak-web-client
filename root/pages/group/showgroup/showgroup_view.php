<!-- --v-david 1396-07-03 -->
<?php
    include '../../../share/core/php/error_message.php';
    include '../../../share/core/db/DADb.php';

    use core\db\DADb;

    session_start();
    $result = DADb::selectGroup($_SESSION['group_name']);

//    error_log( strval($result->num_rows));
?>


<form action="../group/group_ctl.php" method="POST" id="show_group" form_type="show">
    <input type="hidden"  name="mode" value="${mode}"/>
    <input type="hidden" name="id"/>
    <input type="hidden" name="totalSize"/>
    <input type="hidden" name="currentFirst"/>
    <input type="hidden" name="currentLast"/>
    <input type="hidden" name="sort_col"/>
    <input type="hidden" name="changed"/>
    <input type="hidden" name="group_name"/>


        <br/>
            <?php
            if ($result->num_rows > 0) { ?>
                <table class="table table-bordered table-hover da-table">
                    <thead>
                    <tr>
                        <td class="td-button"><span class="glyphicon glyphicon-edit"></span></td>
                        <td class="td-button"><span class="glyphicon glyphicon-remove"></span></td>
                        <td >نام گروه</td>
                    </tr>
                    </thead>
                    <tbody>
            <?php
                while($row = $result->fetch_assoc()) { ?>
                    <tr>
                        <td class="td-button da-edit" data-id='<?php echo $row["id"];?>' data-command='edit_show' data-pk_name='id'>
                            <a href="#">
                                <span class="glyphicon glyphicon-edit"></span>
                            </a>
                            <div class="message-box da-edit-menu"></div>
                        </td>
                        <td class="td-button da-delete" data-id='<?php echo $row["id"];?>' data-command='delete' data-pk_name='id'>
                            <a href="#">
                                <span class="glyphicon glyphicon-remove"></span>
                            </a>
                        </td>

                        <td data-name="group_name"><?php echo $row["group_name"];?></td>
                    </tr>

                    <?php
                }
                ?>
                    </tbody>
                </table>
            <?php
            }
             ?>

            <div class="modal-footer da-text-center">
                <nav da-type="page_navigation" da-from="از" da-to="تا" da-record="شماره" ></nav>
            </div>
    </form>

<script src="../group/showgroup/show_group.js"></script>

