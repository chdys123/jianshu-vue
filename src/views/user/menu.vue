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
        <el-menu-item index="/user/menu/mainPage">
          <i class="el-icon-magic-stick"></i>
          <span class="home-menu-title">主页</span>
        </el-menu-item>
        <el-menu-item index="/user/create">
          <i class="el-icon-magic-stick"></i>
          <span class="home-menu-title">创作</span>
        </el-menu-item>
        <el-sub-menu index="/user/menu/manger">
          <template #title>
            <i class="el-icon-reading"></i>
            <span class="home-menu-title">管理</span>
          </template>
          <el-menu-item index="/user/menu/manger/article"
            >&nbsp;&nbsp;&nbsp;作品管理</el-menu-item
          >
          <el-menu-item index="/user/menu/manger/comment"
            >&nbsp;&nbsp;&nbsp;评论管理</el-menu-item
          >
        </el-sub-menu>
        <el-sub-menu index="/user/menu/data">
          <template #title>
            <i class="el-icon-reading"></i>
            <span class="home-menu-title">数据</span>
          </template>
          <el-menu-item index="/user/menu/data/article"
            >&nbsp;&nbsp;&nbsp;作品数据</el-menu-item
          >
          <el-menu-item index="/user/menu/data/fans"
            >&nbsp;&nbsp;&nbsp;粉丝数据</el-menu-item
          >
        </el-sub-menu>
        <el-menu-item index="/user/menu/setup">
          <i class="el-icon-magic-stick"></i>
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

    return {
      isCollapse,
      activeIndex,
    };
  },
};
</script>

<style lang="less" scoped>
.menu-con {
  // background-color: pink;
  height: calc(100vh - 66px);
  display: flex;
  .menu-left {
    width: 250px;
    //   background-color: pink;
    height: 100%;
    .el-menu {
      border-right: 0;
    }
  }
  .menu-right {
    flex: 1;
    height: 100%;
    box-sizing: border-box;
    background-color: #f8f8f8;
    padding: 20px 40px 20px 0px;
    // background-color: pink;
    .menu-right-con {
      width: 100%;
      height: 100%;
      background-color: #ffffff;
    }
  }
}
</style>