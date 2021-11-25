<template>
  <div class="web-con">
    <div class="web-header">
      <div class="web-header-con">
        <div class="whcl">
          <h1>简书</h1>
          <span
            class="web-item"
            :class="{ 'web-item-active': activeItem == 0 }"
            @click="getData(0)"
            >推荐</span
          >
          <span
            class="web-item"
            :class="{ 'web-item-active': activeItem == 1 }"
            @click="getData(1)"
            >技术博客</span
          >
          <span
            class="web-item"
            :class="{ 'web-item-active': activeItem == 2 }"
            @click="getData(2)"
            >科技</span
          >
          <span
            class="web-item"
            :class="{ 'web-item-active': activeItem == 3 }"
            @click="getData(3)"
            >娱乐</span
          >
          <span
            class="web-item"
            :class="{ 'web-item-active': activeItem == 4 }"
            @click="getData(4)"
            >体育</span
          >
          <span
            class="web-item"
            :class="{ 'web-item-active': activeItem == 5 }"
            @click="getData(5)"
            >游戏</span
          >
          <span
            class="web-item"
            :class="{ 'web-item-active': activeItem == 6 }"
            @click="getData(6)"
            >历史</span
          >
          <span
            class="web-item"
            :class="{ 'web-item-active': activeItem == 7 }"
            @click="getData(7)"
            >美食</span
          >
          <span
            class="web-item"
            :class="{ 'web-item-active': activeItem == 8 }"
            @click="getData(8)"
            >社会</span
          >
        </div>
        <div class="whcr">
          <div class="web-con-serch">
            <input type="text" />
            <i class="el-icon-search"></i>
          </div>
          <button class="logonBtn" v-if="!isLogin">登录</button>
          <div v-if="isLogin" class="avatar-con">
            <popover>
              <template #content1>
                <img :src="user.avatar" class="avatar" />
              </template>
              <template #content2>
                <div class="popover-content">
                  <div>个人主页</div>
                  <div @click="$router.push('/user/menu/mainPage')">
                    创作平台
                  </div>
                  <div>我的收藏</div>
                  <div>退出登录</div>
                </div>
              </template>
            </popover>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="web-content">
      <div class="left-con">
        <div
          v-for="item in article.data"
          :key="item._id"
          class="item"
          :data-id="item._id"
          @click="toArticle(item._id)"
        >
          <div class="item-left">
            <span class="title">
              {{ item.title }}
            </span>
            <div class="zw" v-if="item.coverType == '无封面'"></div>
            <div v-if="item.coverType == '四图'" class="img-con">
              <div>
                <img :src="item.coverImg[0]" />
              </div>
              <div>
                <img :src="item.coverImg[1]" />
              </div>
              <div>
                <img :src="item.coverImg[2]" />
              </div>
              <div>
                <img :src="item.coverImg[3]" />
              </div>
            </div>
            <div class="msg">
              <span>{{ item.author }}</span>
              <span> {{ item.comment }}条评论 </span>
              <span>
                {{ handlerTime(item.createTime) }}
              </span>
            </div>
          </div>
          <div v-if="item.coverType == '单图'" class="item-right">
            <img :src="item.coverImg[0]" />
          </div>
        </div>
      </div>
      <div class="right-con">头条热榜</div>

    </div> -->

    <div class="web-content">
      <DynamicScroller
        :items="article.data"
        :min-item-size="20"
        class="scroller"
        page-mode
        :emitUpdate="true"
        @update="updateTest"
      >
        <template v-slot="{ item, index, active }">
          <DynamicScrollerItem
            :item="item"
            :active="active"
            :size-dependencies="[item.id]"
            :data-index="index"
          >
            <div class="article-item" :key="item.id">
              {{ index }}
              {{ item.title }}
            </div>
          </DynamicScrollerItem>
        </template>
      </DynamicScroller>

      <div class="web-content-fixed">
        <div class="wcf-h-con">
          <i class="iconfont icon-remen"></i>
          <span class="wcf-h"> 头条热榜 </span>
        </div>
        <div v-for="(item,index) in hotArticle" :key="item._id" class="hotArticle-item">
         <span class="item-index" :class="{index1:index==0,index2:index==1,index3:index==2}">{{index+1}}</span>
         <span class="item-title">
          {{ item.title }}
         </span>
        </div>
      </div>
    </div>
  </div>
</template>
  
  
<script>
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
import popover from "../../components/popover2.vue";
export default {
  components: {
    popover,
  },
  setup() {
    let { proxy } = getCurrentInstance();
    let activeItem = ref(0);
    const getData = (index) => {
      activeItem.value = Number(index);
    };
    let isLogin = localStorage.user ? true : false;
    let user = !isLogin ? null : JSON.parse(localStorage.user);
    // 文章列表
    let article = reactive({
      data: [],
    });

    // 获取文章数据
    const getArticle = (start, end) => {
      return proxy
        .http({
          method: "get",
          path: "/article/findAll",
          params: {
            start: article.data.length,
          },
        })
        .then((res) => {
          if (res.code == 300) {
            console.log("没有更多了");
          } else {
            res.data.forEach((item, index, arr) => {
              arr[index].id = item._id;
            });
            article.data.push(...res.data);
          }
        });
    };

    // 进入文章详情页面
    const toArticle = (id) => {
      let routeUrl = proxy.$router.resolve({
        path: "/article",
        query: {
          id,
        },
      });
      window.open(routeUrl.href, "_blank");
    };

    // 处理文章或者草稿创作时间的函数
    const handlerTime = (time) => {
      let date = new Date(Number(time));

      if (Date.now() - Number(time) < 60 * 1000) {
        return Math.floor((Date.now() - Number(time)) / 1000) + "秒前";
      } else if (Date.now() - Number(time) < 60 * 60 * 1000) {
        return Math.floor((Date.now() - Number(time)) / (1000 * 60)) + "分钟前";
      } else if (Date.now() - Number(time) < 24 * 60 * 60 * 1000) {
        return (
          Math.floor((Date.now() - Number(time)) / (1000 * 60 * 60)) + "小时前"
        );
      } else if (Date.now() - Number(time) < 24 * 60 * 60 * 1000 * 30) {
        return (
          Math.floor((Date.now() - Number(time)) / (1000 * 60 * 60 * 24)) +
          "天前"
        );
      } else if (Date.now() - Number(time) < 24 * 60 * 60 * 1000 * 30 * 12) {
        return (
          Math.floor((Date.now() - Number(time)) / (1000 * 60 * 60 * 24 * 30)) +
          "月前"
        );
      } else {
        return (
          Math.floor(
            (Date.now() - Number(time)) / (1000 * 60 * 60 * 24 * 30 * 12)
          ) + "年前"
        );
      }
    };

    // test
    const updateTest = (start, end) => {
      if (end == article.data.length) {
        getArticle();
      }
    };

    // 头条热榜的文章
    let hotArticle = reactive([]);
    // 获取头条热榜
    const getHotArticle = () => {
      proxy
        .http({
          method: "get",
          path: "/article/hotArticle",
          params: {},
        })
        .then((res) => {
          if (res.code == 200) {
            hotArticle.push(...res.data);
          }
        });
    };
    return {
      updateTest,
      activeItem,
      isLogin,
      getData,
      user,
      getArticle,
      article,
      handlerTime,
      toArticle,
      hotArticle,
      getHotArticle,
    };
  },
  created() {
    this.getArticle();
    this.getHotArticle();
  },
  mounted() {},
};
</script>
  
<style scoped lang="less">
.web-con {
  // overflow: hidden;
  background-color: #ffffff;
  min-width: 1000px;
  padding-top: 66px;

  .web-header {
    height: 66px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    background-color: #ffffff;
    z-index: 9;
    // overflow: hidden;
    min-width: 1100px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

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
        flex: 1;
        justify-content: space-between;
        align-items: center;

        h1 {
          color: #ee4142;
        }
        .web-item {
          font-size: 18px;
          color: #222222;
          cursor: pointer;
          &:hover {
            color: #707070;
          }
        }
        .web-item-active {
          color: #ee4142;
          &:hover {
            color: #ee4142;
          }
        }
      }
      .whcr {
        display: flex;

        align-items: center;
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
        .logonBtn {
          height: 40px;
          font-size: 16px;
          padding: 8px 16px;
          outline: none;
          background-color: #f04142;
          border: none;
          color: white;
          font-weight: 500;
          border-radius: 5px;
          &:hover {
            background-color: #f25455;
          }
        }
        .avatar-con {
          position: relative;
          margin-right: 20px;
          height: 40px;
          width: 40px;
          // background-color: pink;
          .avatar {
            height: 40px;
            width: 40px;
            border-radius: 50%;
            vertical-align: middle;
          }
          .popover-content {
            width: 100px;
            text-align: center;
            // height: 200px;
            div {
              font-size: 14px;
              color: #222222;
              padding: 8px 16px;
              cursor: pointer;
              &:hover {
                background-color: #f8f8f8;
              }
            }
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
  .test-content {
    position: relative;
    height: 1000px;
    // background-color: hotpink;

    width: 1066px;
    margin: 66px auto 0px;
    display: flex;
    justify-content: space-between;

    .left-con {
      width: 676px;
      // background-color: pink;
      .item {
        display: flex;
        padding: 16px 0px;
        .item-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          // margin-right: 20px;
          // background-color: pink;
          .title {
            font-size: 20px;
            color: #222222;
            font-weight: 500;
            // margin-bottom: 8px;
            cursor: pointer;
            &:hover {
              color: #f04142;
            }
          }
          .zw {
            height: 20px;
          }
          .img-con {
            height: 118px;
            padding: 10px 0px;
            display: flex;
            justify-content: space-between;
            div {
              width: 158px;
              height: 118px;
              overflow: hidden;
              img {
                cursor: pointer;
                width: 158px;
                vertical-align: middle;
                transition: all 1s;
                &:hover {
                  transform: scale(1.1);
                }
              }
            }
          }
          .msg {
            font-size: 14px;
            color: #999999;
            span {
              cursor: pointer;
              margin-right: 20px;
              &:hover {
                color: #bdbdbd;
              }
              &:nth-child(3) {
                &:hover {
                  color: #999999;
                }
              }
            }
          }
        }
        .item-right {
          width: 158px;
          height: 118px;
          overflow: hidden;

          img {
            width: 158px;
            vertical-align: middle;
            transition: all 1s;
            cursor: pointer;
            &:hover {
              transform: scale(1.1);
            }
          }
        }
      }
    }
    .right-con {
      box-sizing: border-box;
      width: 318px;
      background-color: yellow;
    }
  }
  .web-content {
    position: relative;
    background-color: pink;
    width: 1066px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    .scroller {
      width: 676px;
      background-color: yellow;
      .article-item {
        height: 50px;
      }
    }
    .web-content-fixed {
      position: fixed;
      transform: translateX(calc(72px + 676px));
      width: 318px;
      min-height: 500px;
      // background-color: red;
      .wcf-h-con {
        margin-bottom: 7px;

        .icon-remen {
          color: #ee4142;
          font-size: 22px;
        }
        .wcf-h {
          font-size: 20px;
          color: #222222;
        }
      }
      .hotArticle-item{

        padding: 12px 0px 12px 4px;
        font-size: 16px;
        display: flex;
        align-items: center;
        .item-index{
          font-size: 20px;
          margin-right: 8px;
          color: #999999;
        }
        .index1{
          color: #a82e2e;
        }
        .index2{
          color:#f04142 ;
        }
        .index3{
          color: #ff9a03;
        }
        .item-title{
          cursor: pointer;
          &:hover{
            color: #F25758;
          }
        }
      }
    }
  }

  @media screen and (max-width: 1106px) {
    .web-content {
      margin: 66px 20px 0px 20px;
    }
  }
}
</style>
  