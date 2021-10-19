<template>
  <div class="login-con">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>简书后台管理系统</span>
        </div>
      </template>
      <el-form :model="user">
        <el-form-item>
          <el-input
            v-model="user.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="user.pwd"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="login"
            >登录</el-button
          >
          <el-button class="regist-btn">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, getCurrentInstance } from "vue";
export default {
  setup() {
    const { proxy } = getCurrentInstance();
    let user = reactive({
      username: "",
      pwd: "",
    });

    // 点击登录按钮
    function login() {
      // 把登录信息发送给后台
      proxy
        .http({
          method: "post",
          path: "/login",
          params: user,
        })
        .then((res) => {
          console.log(res);
          // 判断code
          if (res.code == 200) {
            proxy.$message.success("登录成功");

            // 登录成功之后 保存token。在localStorage
            localStorage.setItem("token", res.token);
            // 把用户信息存vuex
            // proxy.$store.commit("updateUser", res.user);

            proxy.$router.push("/admin");
          } else if (res.code == 300) {
            proxy.$message.error("用户名或密码错误");
            // console.log("用户名或密码错误")
          } else {
            proxy.$message.error("服务器出现异常，请稍后再试");
          }
        });
    }
    return {
      user,
      login,
    };
  },
};
</script>

<style scoped lang="less">
.login-con {
  height: 100%;
  background: url("../../assets/login.jpg") no-repeat;
  background-size: 120%;
  display: flex;
  justify-content: center;
  align-items: center;
  .box-card {
    height: 300px;
    width: 350px;
    opacity: 0.9;
    .card-header {
      text-align: center;
      font-size: 22px;
      font-weight: 700;
    }
    .login-btn {
      margin-left: 80px;
    }
    .regist-btn {
      margin-left: 50px;
    }
  }
}
</style>

