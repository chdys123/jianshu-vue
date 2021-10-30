<template>
  <div>
    <header class="header">
      <span class="title">简书</span>
      <span class="toIndex">简书首页</span>
      <img :src="$store.state.user.avatar" class="avatar" />
      <span class="username">{{$store.state.user.username}}</span>
    </header>
    <div class="con">
      <el-scrollbar>
        <router-view></router-view>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, ref } from "vue";
export default {
  setup() {
    const { proxy } = getCurrentInstance();
 
    const quit = function () {
      // 删除本地存储的token
      localStorage.removeItem("token");
      // 跳转到登录页面
      proxy.$router.push("/login");
    };
    return {
      quit,
    };
  },
 
  created() {
    this.http({
      method: "post",
      path: "/verify",
    }).then((res) => {
      if (res.code == 200) {
        // 把信息存vuex
        this.$store.commit("updateUser", res.user);
        localStorage.setItem("user", JSON.stringify(res.user));
      } else {
        this.$message.error("登录认证失败");
      }
    });
  },
};
</script>

<style scoped lang="less">
.header {
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  background-color: #ffffff;
  height: 66px;
  display: flex;
  align-items: center;
  .title {
    margin-left: 40px;
    color: #ff5e5e;
    font-size: 30px;
    font-weight: 700;
    flex: 1;
  }
  .toIndex {
    margin-right: 50px;
    font-size: 14px;
    cursor: pointer;
  }
  .avatar {
    margin-right: 10px;
    width: 30px;
    border-radius: 50%;
    vertical-align: middle;
    cursor: pointer;
  }
  
  .username {
    font-size: 14px;
    color: #222222;
    margin-right: 20px;
    cursor: pointer;
  }
}
.con {
  padding-top: 66px;
  height: calc(100vh - 66px);
  // background-color: pink;
}
</style>