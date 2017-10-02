<!-- --v-david 1396-07-03 -->
<?php include '../../../share/core/php/error_message.php';?>

<form action="../group/group_ctl.php" method="POST" id="search_group">
  <input type="hidden" name="mode"/>
  <div class="form-inline">
    <div class="form-group" data-title = 'نام گروه'>
        <input type="text" name="group_name"  class="form-control"/>
    </div>

    <div class="modal-footer text-left">
      <button call-refresh="true" type="submit" class="btn btn-info">جستجو</button>
    </div>
  </div>
</form>


<script src="../group/searchgroup/search_group.js"></script>
