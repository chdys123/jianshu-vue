<template>
  <el-container>
    <el-header>
      <div class="sys-title">简书</div>
      <div class="header-right">
        <a>网站首页</a>
        <img :src="$store.state.user.avatar" alt="" class="header-userImg" />
        <span>{{ $store.state.user.username }}</span>
        <el-button type="primary" @click="quit">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="250px">
        <el-menu
        :default-active="activeIndex"
          background-color="#F8F8F8"
          text-color="#222222"
          active-text-color="#FF5E5E"
          router
          
        >
          <el-menu-item index="/user/mainPage">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i class="el-icon-magic-stick"></i>
            <span class="home-menu-title">主页</span>
          </el-menu-item>
          <el-menu-item index="/user/create">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i class="el-icon-magic-stick"></i>
            <span class="home-menu-title">创作</span>
          </el-menu-item>
          <el-sub-menu index="/user/manger">
            <template #title>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <i class="el-icon-reading"></i>
              <span class="home-menu-title">管理</span>
            </template>
            <el-menu-item index="/user/manger/article"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;作品管理</el-menu-item
            >
            <el-menu-item index="/user/manger/comment"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;评论管理</el-menu-item
            >
          </el-sub-menu>

          <el-sub-menu index="/user/data">
            <template #title>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <i class="el-icon-reading"></i>
              <span class="home-menu-title">数据</span>
            </template>
            <el-menu-item index="/user/data/article"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;作品数据</el-menu-item
            >
            <el-menu-item index="/user/data/fans"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;粉丝数据</el-menu-item
            >
          </el-sub-menu>

          <el-menu-item index="/user/setup">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i class="el-icon-magic-stick"></i>
            <span class="home-menu-title">设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="home-main">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
  
  
  <script>
import { getCurrentInstance, ref } from "vue";
export default {
  setup() {
    const { proxy } = getCurrentInstance();
    // 头像和用户名
    let userImg = ref("");
    let username = ref("");
    const quit = function () {
      // 删除本地存储的token
      localStorage.removeItem("token");
      // 跳转到登录页面
      proxy.$router.push("/login");
    };

    let activeIndex=ref(proxy.$route.path)
    return {
      quit,
      userImg,
      username,
      activeIndex
    };
  },
  components: {
    // demo1,
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
.el-container {
  height: 100%;
}
.el-header {
  background-color: #ffffff;
  color: black;
  line-height: 60px;
  .sys-title {
    float: left;
    margin-left: 20px;
    color: #ff5e5e;
    font-size: 30px;
    font-weight: 700;
  }
  .header-right {
    float: right;
    .header-userImg {
      width: 30px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
}
.el-aside {
  background-color: #f8f8f8;
  .home-menu-title {
    font-size: 18px;
  }
  .el-menu{
    width: 250px;
  }
}
.el-main {
  background-color: #f8f8f8;
  .home-main {
    height: 100%;
    background-color: #ffffff;
  }
}

// .el-menu-item,.el-sub-menu{
//   text-align: center;
// }
</style>
  