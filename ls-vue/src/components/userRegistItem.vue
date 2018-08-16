<template>
  <div>
    <a class="text-danger" data-toggle="modal" href="#" data-target="#registerItem">
      <small>&lt;&lt;注册条款&gt;&gt;</small>
    </a>
    <div class="modal fade" id="registerItem" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <h6 class="text-danger text-center">注册条款</h6>
            <hr>
            <embed src="../../static/others/registerItem.html">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">拒绝</span>
            </button>
            <button type="button" class="btn btn-primary ml-4" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">同意</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
