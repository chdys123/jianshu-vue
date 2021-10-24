<template>
  <div class="setup-con">
    <div class="clear-float">
      <div class="con-left">账号信息</div>
      <div class="con-right">
        <div class="label-item">
          <span class="label">用户名</span>
          <span class="content">{{ form.data.username }}</span>
          <span class="func" @click="showUsername = true">编辑</span>
        </div>
        <div class="label-item">
          <span class="label">用户简介</span>
          <span class="content">{{ form.data.desc }}</span>
          <span class="func" @click="showDesc = true">编辑</span>
        </div>
        <div class="avatar-item label-item">
          <span class="label">用户头像</span>
          <span class="content">
            <el-upload
              action="http://localhost:3000/upload/img"
              name="myfile"
              :headers="uploaderHeader"
              :on-success="onSuccess"
              :show-file-list="false"
            >
              <span class="avatar">上传头像</span>
              <img :src="form.data.avatar"/>
              <span v-show="form.data.avatar" class="avatar-span"
                >更换头像</span
              >
            </el-upload>
          </span>
        </div>
        <div class="label-item">
          <span class="label">用户ID</span>
          <span class="content" id="userId">{{ form.data._id }}</span>
          <span class="func" @click="copyId">复制ID</span>
        </div>
      </div>
    </div>

    <div class="clear-float">
      <div class="con-left">运营人信息</div>
      <div class="con-right">
        <div class="label-item">
          <span class="label">联系邮箱</span>
          <span class="content">{{ form.data.email }}</span>
          <span class="func" @click="showEmail = true">填写邮箱</span>
        </div>
      </div>
    </div>

    <div class="clear-float">
      <div class="con-left">安全中心</div>
      <div class="con-right">
        <div class="label-item">
          <span class="label">登录密码</span>
          <span class="content"></span>
          <span class="func" @click="showPwd = true">修改</span>
        </div>
      </div>
    </div>
  </div>

  <!-- dialog -->
  <!-- 用户名 -->
  <el-dialog
    v-model="showUsername"
    title="编辑用户名"
    width="30%"
    :before-close="beforeClose"
  >
    <el-input
      v-model="form.data.username"
      maxlength="10"
      placeholder="Please input"
      show-word-limit
      type="text"
    ></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="Quxiao('Username')">取消</el-button>
        <el-button type="danger" @click="Baocun('Username')">保存</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 用户简介 -->

  <el-dialog
    v-model="showDesc"
    title="编辑用户简介"
    width="30%"
    :before-close="beforeClose"
  >
    <el-input
      v-model="form.data.desc"
      maxlength="30"
      placeholder="Please input"
      show-word-limit
      type="text"
    ></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="Quxiao('Desc')">取消</el-button>
        <el-button type="danger" @click="Baocun('Desc')">保存</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 用户邮箱 -->

  <el-dialog
    v-model="showEmail"
    title="编辑运营人邮箱"
    width="30%"
    :before-close="beforeClose"
  >
    <el-input
      v-model="form.data.email"
      maxlength="30"
      placeholder="Please input"
      show-word-limit
      type="text"
    ></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="Quxiao('Email')">取消</el-button>
        <el-button type="danger" @click="Baocun('Email')">保存</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 用户密码 -->
  <el-dialog v-model="showPwd" title="修改密码" width="30%">
    <el-input
      v-model="pwd"
      maxlength="10"
      placeholder="新密码"
      show-word-limit
      type="password"
    ></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showPwd = false">取消</el-button>
        <el-button type="danger" @click="updatePwd()">修改</el-button>
      </span>
    </template>
  </el-dialog>
</template>


<script>
import { ref, reactive, getCurrentInstance, toRaw } from "vue";
export default {
  setup() {
    const { proxy } = getCurrentInstance();
    let uploaderHeader = reactive({
      authorization: "Bearer " + localStorage.getItem("token"),
    });
    let form = reactive({
      data: {},
    });
    function onSuccess(res, file, fileList) {
      console.log(res);
      form.data.avatar = res.data;
      //然后提交给后台修改
      update();
    }
    // 获取用户信息
    function getData() {
      proxy
        .http({
          method: "post",
          path: "/verify",
        })
        .then((res) => {
          if (res.code == 200) {
            form.data = res.user;
          } else {
            proxy.$message.error("登录认证失败");
          }
        });
    }

    // 修改用户信息
    function update() {
      proxy
        .http({
          method: "post",
          path: "/update/personal",
          params: form.data,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            proxy.$message.success("个人信息修改成功");
            proxy.$store.commit(
              "updateUser",
              JSON.parse(JSON.stringify(toRaw(form.data)))
            );
            localStorage.setItem("user", JSON.stringify(res.user));
          } else if (res.code == 300) {
            proxy.$message.error("个人信息修改失败");
          } else if (res.code == 500) {
            proxy.$message.error("个人信息修改出现异常请稍后再试");
          }
        });
    }
    // 点击复制id执行的函数
    function copyId() {
      if (!document.execCommand) {
        proxy.$message.warn("当前浏览器不支持,请手动复制");
        return;
      }
      var textarea = document.createElement("textarea");
      textarea.value = form.data._id;
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      var result = document.execCommand("copy");
      document.body.removeChild(textarea);
      if (result) {
        proxy.$message.success("复制成功");
      }
    }

    function beforeClose(done) {
      done();
      getData();
    }
    let showUsername = ref(false);
    let showDesc = ref(false);
    let showEmail = ref(false);
    let showPwd = ref(false);
    let pwd = ref("");

    // 取消
    function Quxiao(str) {
      proxy["show" + str] = false;
      getData();
    }
    // 保存
    function Baocun(str) {
      proxy["show" + str] = false;
      update();
    }
    // 修改密码
    function updatePwd() {
      console.log("修改成功");

      proxy
        .http({
          method: "post",
          path: "/update/pwd",
          params: {
            _id: form.data._id,
            pwd: pwd.value,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            proxy.$message.success("修改密码成功");
          } else if (res.code == 300) {
            proxy.$message.error("修改密码失败");
          } else {
            proxy.$message.error("修改密码时出现异常");
          }
        });
      showPwd.value = false;
    }

    return {
      uploaderHeader,
      onSuccess,
      form,
      update,
      copyId,
      getData,
      beforeClose,
      Quxiao,
      Baocun,
      updatePwd,
      showUsername,
      showDesc,
      showEmail,
      showPwd,
      pwd,
    };
  },
  // 每次进入组件的时候 重新请求
  created() {
    this.getData();
  },
 
};
</script>

<style lang="less" scoped>
.setup-con {
  width: 100%;
  height: 100%;
  //   background-color: pink;

  .con-left {
    float: left;
    width: 90px;
    // height: 100%;
    font-size: 16px;
    // background-color: red;
    height: 66px;
    display: flex;
    align-items: center;
    // line-height: 66px;
    padding-left: 20px;
  }

  .con-right {
    float: right;
    width: calc(100% - 120px);
    height: 100%;
    // background-color: yellow;
    .label-item {
      height: 66px;
      font-size: 14px;
      //   line-height: 66px;
      border-bottom: 1px solid #e8e8e8;
      .label {
        float: left;
        //   background-color: blue;
        width: 100px;
        height: 66px;
        display: flex;
        align-items: center;
      }
      .content {
        position: relative;
        color: #666666;
        float: left;
        width: calc(100% - 170px);
        height: 100%;
        display: flex;
        align-items: center;
        //   background-color: hotpink;
      }

      .func {
        color: #1356bd;
        float: right;
        margin-right: 10px;
        cursor: pointer;
        height: 66px;
        display: flex;
        align-items: center;
      }
    }

    .avatar-item {
      height: 100px;
      //   line-height: 100px;
      display: flex;
      align-items: center;

      .avatar {
        height: 80px;
        width: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        //   background-color: pink;
        border: 1px solid #e8e8e8;
        vertical-align: middle;
      }
      img {
        position: absolute;
        left: 1px;
        top: 11px;
        height: 80px;
        width: 80px;
        border-radius: 50%;
      }
      .avatar-span {
        font-size: 12px;
        position: absolute;
        left: 18px;
        top: 66px;
        color: #e8e8e8;
        line-height: 20px;
        background-color: rgba(1, 1, 1, 0.5);
        height: 20px;
      }
    }
  }
  .clear-float {
    clear: both;
  }
}
</style>
