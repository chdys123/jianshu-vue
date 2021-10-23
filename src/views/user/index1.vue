<template>
  <div>
    <header class="header">
      <span class="title">简书</span>
      <span class="toIndex">简书首页</span>
      <span class="avatar">头像</span>
      <span class="username">用户名</span>
    </header>
    <div class="con">
      <el-scrollbar>
        <router-view></router-view>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.header {
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  background-color: #FFFFFF;
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
    margin-right: 20px;
  }
  .username {
    font-size: 14px;
    color: #222222;
    margin-right: 20px;
  }
}
.con {
  padding-top: 66px;
  height: calc(100vh - 66px);
}


</style>