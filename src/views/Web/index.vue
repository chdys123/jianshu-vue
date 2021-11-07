<template>
  <div class="web-con">
    <div class="web-header">
      <div class="web-header-con">
        <div class="whcl">
          <h1>简书</h1>
          <span class="web-item" :class="{ 'web-item-active': activeItem == 0 }"
            >推荐</span
          >
          <span class="web-item" :class="{ 'web-item-active': activeItem == 1 }"
            >技术博客</span
          >
          <span class="web-item" :class="{ 'web-item-active': activeItem == 2 }"
            >科技</span
          >
          <span class="web-item" :class="{ 'web-item-active': activeItem == 3 }"
            >娱乐</span
          >
          <span class="web-item" :class="{ 'web-item-active': activeItem == 4 }"
            >体育</span
          >
          <span class="web-item" :class="{ 'web-item-active': activeItem == 5 }"
            >游戏</span
          >
          <span class="web-item" :class="{ 'web-item-active': activeItem == 6 }"
            >历史</span
          >
          <span class="web-item" :class="{ 'web-item-active': activeItem == 7 }"
            >美食</span
          >
          <span class="web-item" :class="{ 'web-item-active': activeItem == 8 }"
            >社会</span
          >
        </div>
        <div class="whcr">
          <div class="web-con-serch">
            <input type="text" />
            <i class="el-icon-search"></i>
          </div>
          <el-button>登录 </el-button>
        </div>
      </div>
    </div>

    <div class="web-content">文章内容</div>
  </div>
</template>
  
  
<script>
import { ref, reactive } from "vue";
export default {
  setup() {
    let activeItem = ref(0);

    return {
      activeItem,
    };
  },
};
</script>
  
  <style scoped lang="less">
.web-con {
  overflow: hidden;
  .web-header {
    height: 66px;
    position: fixed;
    width: 100%;
    background-color: #ffffff;
    z-index: 9;
    overflow: hidden;
    min-width: 1100px;
    
  

    .web-header-con {
      height: 66px;
      padding: 0px 20px;
      box-sizing: border-box;
      vertical-align: middle;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 auto;

      .whcl {
        display: flex;
        flex:1;
        justify-content: space-between;
        align-items: center;

        h1 {
          color: #ee4142;
        }
        .web-item {
          font-size: 18px;
          color: #222222;
          cursor: pointer;
        }
        .web-item-active {
          color: #ee4142;
        }
      }
      .whcr {
        display: flex;
        
        align-items: center;
        // background-color: blue;
        .web-con-serch {
          background-color: #f5f5f5;
          height: 40px;
          padding: 0px 18px;
          display: flex;
          align-items: center;
          border-radius: 5px;
          vertical-align: middle;
          margin: 0px 20px 0px 70px;
          input {
            height: 40px;
            border: none;
            background-color: #f5f5f5;
            outline: none;
            margin-right: 18px;
            font-size: 18px;
          }
          .el-icon-search {
            color: #ee4142;
            font-size: 20px;
            font-weight: 700;
            cursor: pointer;
          }
        }
      }
    }
    @media screen and (max-width: 1334px) {
      .web-header-con {
        width: 100%;
      }
    }

    @media screen and (min-width: 1335px) {
      .web-header-con {
        width: 1334px;
      }
    }
  }
  .web-content {
    // padding-top: 66px;
    margin-top: 100px;
    height: 1000px;
    background-color: pink;
    width: 1066px;
    margin: 66px auto 0px;
  }
  @media screen and (max-width: 1106px) {
    .web-content {
        margin: 66px 20px 0px 20px;
      }
    }
 
}
</style>
  