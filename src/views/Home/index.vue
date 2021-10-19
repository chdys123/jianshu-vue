<template>
  <el-container>
    <el-header>
      <div class="sys-title">简书后台管理系统</div>
      <div class="header-right">
        <a>网站首页</a>
        <img :src="$store.state.user.avatar" alt="" class="header-userImg">
        <span>{{$store.state.user.username}}</span>
        <el-button type="primary" @click="quit">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="/admin/user"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-sub-menu index="/admin/user">
            <template #title>
              <i class="el-icon-user-solid"></i>
              <span>个人中心</span>
            </template>
            <el-menu-item index="/admin/user/personal">个人资料</el-menu-item>
            <el-menu-item index="/admin/user/password">修改密码</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/admin/article">
            <template #title>
              <i class="el-icon-reading"></i>
              文章管理
            </template>
            <el-menu-item index="/admin/article/add">发布文章</el-menu-item>
            <el-menu-item index="/admin/article">文章列表</el-menu-item>
          </el-sub-menu>

          <el-menu-item index="/admin/comment">
            <i class="el-icon-chat-line-square"></i>
            评论管理
          </el-menu-item>
          <el-menu-item index="/admin/fans">
            <i class="el-icon-magic-stick"></i>
            粉丝管理
          </el-menu-item>
          <el-menu-item index="/admin/star">
            <i class="el-icon-thumb"></i>
            点赞管理
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
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
    return {
      quit,
      userImg,
      username,
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
  background-color: #545c64;
  color: azure;
  line-height: 60px;
  .sys-title {
    float: left;
    font-size: 20px;
  }
  .header-right {
    float: right;
    .header-userImg{
      width: 30px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
}
.el-aside {
  background-color: #545c64;
}
// .el-main {
//   // background-color: yellow;
// }
</style>
