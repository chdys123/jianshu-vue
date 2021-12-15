<template>
  <div class="menu-con">
    <div class="menu-left">
      <el-menu
        :default-active="activeIndex"
        background-color="#F8F8F8"
        text-color="#222222"
        active-text-color="#FF5E5E"
        router
        :collapse="isCollapse"
      >
        <el-menu-item index="/user/menu/manger/article">
          <i class="el-icon-notebook-2"></i>
          <span class="home-menu-title">作品</span>
        </el-menu-item>
        <el-menu-item index="/user/create">
          <i class="el-icon-edit"></i>
          <span class="home-menu-title">创作</span>
        </el-menu-item>

        <el-menu-item index="/user/menu/data/fans">
          <i class="el-icon-pie-chart"></i>
          <span class="home-menu-title">数据</span>
        </el-menu-item>

        <el-menu-item index="/user/menu/setup">
          <i class="el-icon-s-tools"></i>
          <span class="home-menu-title">设置</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="menu-right">
      <div class="menu-right-con">
        <el-scrollbar>
          <router-view></router-view>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive, getCurrentInstance } from "vue";
export default {
  setup() {
    const { proxy } = getCurrentInstance();
    // 是否折叠
    let isCollapse = ref(false);
    // 当前路由
    let activeIndex = ref(proxy.$route.path);

    const toCreate = () => {
      let routeUrl = proxy.$router.resolve({
        path: "/user/create",
      });
      window.open(routeUrl.href, "_blank");
    };

    return {
      isCollapse,
      activeIndex,
      toCreate,
    };
  },
};
</script>

<style lang="less" scoped>
.menu-con {
  height: calc(100vh - 66px);
  display: flex;
  .menu-left {
    width: 100px;
    height: 100%;
    .el-menu {
      border-right: 0;
      .home-menu-title {
        font-size: 18px;
      }
    }
  }
  .menu-right {
    flex: 1;
    height: 100%;
    box-sizing: border-box;
    background-color: #f8f8f8;
    padding: 20px 10px 20px 10px;
    // background-color: pink;
    .menu-right-con {
      width: 100%;
      height: 100%;
      background-color: #ffffff;
      // background-color: pink;
    }
  }
}
</style>