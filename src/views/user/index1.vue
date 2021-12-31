<template>
  <div>
    <header class="header">
      <span class="title" @click="$router.push('/')">简书</span>
      <span class="toIndex" @click="$router.push('/')">简书首页</span>
      <span class="username">{{ $store.state.user.username }}</span>
      <img :src="$store.state.user.avatar" class="avatar" />
      <button class="signOut-btn" @click="quit">退出</button>
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
import popover from "../../components/popover2.vue";
export default {
  components: {
    popover,
  },
  setup() {
    const { proxy } = getCurrentInstance();

    // 点击退出登录
    const quit = () => {
      console.log("点击了退出登录");
      // 清除本地的token和user
      localStorage.clear();
      // 然后到登录页面
      proxy.$router.push("/login");
    };
    return {
      quit,
    };
  },

  created() {
    let user = JSON.parse(localStorage.user);
    document.title = user.username + "的创作平台";
    this.$store.commit("updateUser", user);
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
    cursor: pointer;
    margin-left: 20px;
    color: #ff5e5e;
    font-size: 30px;
    font-weight: 700;
  }
  .toIndex {
    margin-left: 50px;
    font-size: 14px;
    cursor: pointer;
    flex: 1;
    &:hover {
      color: #666666;
    }
  }
  .avatar {
    margin-right: 10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    vertical-align: middle;
    cursor: pointer;
  }

  .username {
    font-size: 14px;
    color: #222222;
    margin-right: 10px;
    cursor: pointer;
  }
  .signOut-btn {
    outline: none;
    border: none;
    border-radius: 5px;
    background-color: #ff5e5e;
    padding: 8px 12px;
    margin-right: 10px;
    color: #ffffff;
    cursor: pointer;
    &:hover {
      background-color: red;
    }
  }
}
.con {
  padding-top: 66px;
  height: calc(100vh - 66px);
}
</style>
