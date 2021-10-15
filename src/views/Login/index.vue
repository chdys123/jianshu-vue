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
            v-model="user.password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" class="login-btn">登录</el-button>
          <el-button class="regist-btn">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  setup() {
    let user = reactive({
      username: "",
      password: "",
    });
    return {
      user,
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
    width: 400px;
    opacity: 0.9;
    .card-header {
      text-align: center;
      font-size: 22px;
      font-weight: 700;
    }
    .login-btn{
        margin-left: 80px;
    }
    .regist-btn{
        margin-left: 50px;
    }
  }
}
</style>

