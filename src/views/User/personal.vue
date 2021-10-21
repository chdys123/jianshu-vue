<template>
  <div>
    <el-form :model="form" label-width="80px">
      <el-form-item label="头像">
        <div class="avatar-div">
          <img
            :src="form.data.avatar"
            alt=""
            class="user-img"
            v-show="form.data.avatar"
          />
          <el-upload
            action="http://localhost:3000/upload/img"
            name="myfile"
            :headers="uploaderHeader"
            :on-success="onSuccess"
            :show-file-list="false"
          >
            <el-button>上传</el-button>
          </el-upload>
        </div>
      </el-form-item>

      <el-form-item label="用户名">
        <el-col :span="6">
          <el-input v-model="form.data.username" disabled></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="性别">
        <el-radio v-model="form.data.sex" label="男">男</el-radio>
        <el-radio v-model="form.data.sex" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="个人简介">
        <el-col :span="6">
          <el-input
            v-model="form.data.desc"
            type="textarea"
            rows="3"
            resize="none"
            placeholder="填写你的个人简介"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="手机号">
        <el-form-item>
          <el-col :span="6">
            <el-input
              v-model="form.data.phone"
              placeholder="请输入手机号"
            ></el-input>
          </el-col>
        </el-form-item>
      </el-form-item>
      <el-form-item label="电子邮箱">
        <el-col :span="6">
          <el-input
            v-model="form.data.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateUser">更新</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ref, reactive, getCurrentInstance, toRaw } from "vue";
export default {
  setup() {
    const { proxy } = getCurrentInstance();
    let uploaderHeader = reactive({
      authorization: "Bearer " + localStorage.getItem("token"),
    });

    function onSuccess(res, file, fileList) {
      console.log(res);
      form.data.avatar = res.data;
    }
    function updateUser() {
      console.log(form);
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
            proxy.$store.commit("updateUser", toRaw(form.data));
            localStorage.setItem("user", JSON.stringify(res.user));

          } else if (res.code == 300) {
            proxy.$message.error("个人信息修改失败");
          } else if (res.code == 500) {
            proxy.$message.error("个人信息修改出现异常请稍后再试");
          }
        });
    }

    // let form = reactive(proxy.$store.state.user);
    let form = reactive({
      data: {
        avatar: "",
        desc: "",
        email: "",
        phone: "",
        sex: "",
        username: "",
      },
    });
    return {
      uploaderHeader,
      onSuccess,
      form,
      updateUser,
    };
  },
  // 每次进入组件的时候 重新请求
  created() {
    this.http({
      method: "post",
      path: "/verify",
    }).then((res) => {
      if (res.code == 200) {
        this.form.data = res.user;
      } else {
        this.$message.error("登录认证失败");
      }
    });
  },
};
</script>


<style scoped lang="less">
.avatar-div {
  display: flex;
  align-items: center;
}
.user-img {
  width: 50px;
  border-radius: 50%;
}
</style>