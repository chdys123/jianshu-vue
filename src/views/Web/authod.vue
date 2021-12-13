<template>
  <div class="web-con">
    <web-header></web-header>
    <div class="web-content">
      <div class="left-con">
        <div class="author-msg">
          <div class="img-con">
            <img :src="author.avatar" alt="" />
          </div>
          <div class="msg-right">
            <div class="msg-r-name">{{ author.username }}</div>
            <div class="msg-r-con1">
              <div class="msg-star">
                <span class="msg-sz">{{ author.star }}</span>
                <span class="msg-wz">获赞</span>
              </div>
              <div class="msg-star" @click="clickFansOrCare(1)">
                <span class="msg-sz">{{ author.fans }}</span>
                <span class="msg-wz">粉丝</span>
              </div>
              <div class="msg-star" @click="clickFansOrCare(2)">
                <span class="msg-sz">{{ author.careId }}</span>
                <span class="msg-wz">关注</span>
              </div>
            </div>
            <div class="msg-right-desc">
              <span>简介:&nbsp;&nbsp;</span>
              <span v-if="author.desc ? true : false">{{ author.desc }}</span>
              <span v-else>这个人很懒什么都没留下</span>
            </div>
          </div>
        </div>
        <!-- 展示文章和收藏 -->
        <div class="author-tabBar">
          <span
            :class="{ 'active-tabBar': articleOrLike == 0 }"
            @click="clickAOrL(0)"
            >文章</span
          >
          <span
            @click="clickAOrL(1)"
            :class="{ 'active-tabBar': articleOrLike == 1 }"
            >收藏</span
          >
          <!-- 近期最热文章 -->
          <div class="r-list-con">
            <div class="r-list-con-h">近期最热文章</div>
            <div
              v-for="item in hotArticle"
              :key="item._id"
              class="r-list"
              @click="toArticle(item._id)"
            >
              <!-- 如果有图片 -->
              <div class="r-list-imgcon" v-if="item.coverType != '无封面'">
                <img :src="item.coverImg[0]" />
              </div>
              <div class="msg-con">
                <div class="title">
                  {{ item.title }}
                </div>
                <div class="msg-con-msg">
                  <span>{{ item.read }}阅读</span>
                  <span class="m-c-m-t">{{
                    handlerTime(item.createTime)
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 展示内容 -->
        <div class="author-content">
          <!-- 用户写的文章 -->
          <transition>
            <div v-show="articleOrLike == 0">
              <div
                v-for="item in article"
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
          </transition>

          <!-- 用户收藏的文章 -->
          <transition>
            <div v-show="articleOrLike == 1">
              <div
                v-for="item in articleLiked"
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
          </transition>
        </div>
      </div>
      <div class="right-con">
        <!-- 关注 如果是自己的话就不需要关注了 -->
        <div class="likeBtn-con" v-if="user._id !== id">
          <button class="btn1" v-show="isCare == false" @click="careOrNoCare">
            关注
          </button>
          <button class="btn2" v-show="isCare == true" @click="careOrNoCare">
            已关注
          </button>
        </div>
        <div class="likeBtn-con" v-if="user._id == id"></div>
      </div>
    </div>

    <el-drawer v-model="drawer" :with-header="false">
      <div class="drawer-tabar">
        <span
          class="drawer-tabar-span"
          :class="{ 'drawer-tabar-active': drawerActive == 1 }"
          @click="clickDrawerFansOrCare(1)"
          >粉丝{{ author.fans }}</span
        >
        <span
          @click="clickDrawerFansOrCare(2)"
          :class="{ 'drawer-tabar-active': drawerActive == 2 }"
          >关注{{ author.careId }}</span
        >
      </div>
      <div class="drawer-body">
        <el-scrollbar>
          <div class="list-con fans-con" v-show="drawerActive == 1">
            <div
              v-for="(item, index) in fansArr"
              :key="item.id"
              class="item-con"
            >
              <div class="ImgCon" @click="toAuthor(item.id)">
                <img :src="item.avatar" />
              </div>

              <div class="fans-msg">
                <span class="fans-name" @click="toAuthor(item.id)">{{ item.username }}</span>
                <span class="fans-fansCount">{{ item.fansCount }}粉丝</span>
              </div>

              <button
                class="nocare-btn"
                v-if="!item.isCare"
                @click="careAndNoCare(1, index, item.id, 1)"
              >
                关注
              </button>
              <button
                class="care-btn"
                v-if="item.isCare"
                @click="careAndNoCare(1, index, item.id, 2)"
              >
                已关注
              </button>
            </div>
          </div>

          <div class="list-con careId-con" v-show="drawerActive == 2">
            <div
              v-for="(item, index) in careArr"
              :key="item.id"
              class="item-con"
            >
              <div class="ImgCon" @click="toAuthor(item.id)">
                <img :src="item.avatar" />
              </div>

              <div class="fans-msg">
                <span class="fans-name" @click="toAuthor(item.id)">{{ item.username }}</span>
                <span class="fans-fansCount">{{ item.fansCount }}粉丝</span>
              </div>

              <button
                class="nocare-btn"
                v-if="!item.isCare"
                @click="careAndNoCare(2, index, item.id, 1)"
              >
                关注
              </button>
              <button
                class="care-btn"
                v-if="item.isCare"
                @click="careAndNoCare(2, index, item.id, 2)"
              >
                已关注
              </button>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </el-drawer>
  </div>
  <el-backtop></el-backtop>

</template>
    
  <script>
import { ref, reactive, onMounted, getCurrentInstance, watch } from "vue";
import webHeader from "../../components/webHeader.vue";
import handlerTimefn from "../../hooks/handerTime.js";
import { useRoute, useRouter } from "vue-router";

export default {
  components: {
    webHeader,
  },
  setup() {
    let { proxy } = getCurrentInstance();
    let route = useRoute();

    let isLogin = localStorage.user ? true : false;
    let user = !isLogin ? null : JSON.parse(localStorage.user);

    // 当前页面用户id
    let id = ref(route.query.id);

    // 进入文章详情页面
    const toArticle = (id) => {
      proxy.$router.push({
        path: "/article",
        query: {
          id,
        },
      });
    };

    // 进入用户详情页面
    const toAuthor = (id) => {
      proxy.$router.push({
        path: "/authod",
        query: {
          id: id,
        },
      });
    };

    const { handlerTime1: handlerTime } = handlerTimefn();

    // 获取到的作者信息
    let author = reactive({});

    // 文章或者收藏的flag
    let articleOrLike = ref(0);
    // 点击文章或者收藏的方法
    const clickAOrL = (num) => {
      articleOrLike.value = num;
    };
    // 作者写的文章
    let article = reactive([]);

    // 作者收藏的文章
    let articleLiked = reactive([]);

    // 获取作者的文章
    const getArticle = () => {
      proxy
        .http({
          method: "get",
          path: "/article/find",
          params: {
            authorId: id.value,
          },
        })
        .then((res) => {
          article.length = 0;
          article.push(...res.res);
        });
    };
    // 获取作者收藏的文章
    const getLiked = () => {
      proxy
        .http({
          method: "get",
          path: "/user/getCollect",
          params: {
            userId: id.value,
          },
        })
        .then((res) => {
          articleLiked.length = 0;
          articleLiked.push(...res.res);
        });
    };
    // 是否关注作者的标志
    let isCare = ref();

    // 获取是否关注该作者的方法
    const getIsCare = () => {
      proxy
        .http({
          method: "get",
          path: "user/isCare",
          params: {
            userId: user._id,
            authorId: id.value,
          },
        })
        .then((res) => {
          isCare.value = res.data;
        });
    };
    // 取消或者关注作者的方法
    const careOrNoCare = () => {
      let cate = null;
      // 如果已经关注
      if (isCare.value) {
        cate = 2;
      } else {
        cate = 1;
      }
      proxy
        .http({
          method: "get",
          path: "/user/care",
          params: {
            userId: user._id,
            authorId: id.value,
            cate,
          },
        })
        .then((res) => {
          if (res.code == 200) {
            isCare.value = res.data;
            if (cate == 2) {
              author.fans--;
            } else {
              author.fans++;
            }
          } else {
            proxy.$message.error("服务器出现异常");
          }
        });
    };

    // 用户最近最热文章
    let hotArticle = reactive([]);
    // 获取用户最近最热文章
    const getHotArticle = () => {
      proxy
        .http({
          method: "get",
          path: "/article/userHotArticle",
          params: {
            id: id.value,
          },
        })
        .then((res) => {
          hotArticle.length = 0;
          hotArticle.push(...res.res);
        });
    };

    // 页面数据初始化
    const getPageData = () => {
      // 获取传过来的用户id
      id.value = route.query.id;
      // 获取用户信息
      proxy
        .http({
          method: "get",
          path: "/user/getmsg",
          params: {
            id: id.value,
          },
        })
        .then((res) => {
          author = Object.assign(author, res.data);
          document.title = author.username + "的主页";
        });
      // 获取文章信息
      getArticle();
      // 获取收藏的文章
      getLiked();
      // 是否关注
      getIsCare();
      // 获取作者近期最热文章
      getHotArticle();

      // 获取粉丝列表
      fansArr.length = 0;
      getFans();
      careArr.length = 0;
      // 获取关注列表
      getCare();
    };

    watch(
      () => route.fullPath,
      (newData, oldData) => {
        if (route.path == "/authod") {
          getPageData();
        }
      }
    );

    // 是否展示抽屉
    let drawer = ref(false);

    // 抽屉里面的activeitem
    let drawerActive = ref(1);

    // 粉丝数据
    let fansArr = reactive([]);
    // 关注数据
    let careArr = reactive([]);

    // 获取粉丝数据 后期需要懒加载
    const getFans = () => {
      proxy
        .http({
          method: "get",
          path: "/user/getFans",
          params: {
            authorId: id.value,
            userId: user._id,
          },
        })
        .then((res) => {
          fansArr.push(...res.data);
        });
    };

    // 获取关注数据 后期需要懒加载
    const getCare = () => {
      proxy
        .http({
          method: "get",
          path: "/user/getCare",
          params: {
            authorId: id.value,
            userId: user._id,
          },
        })
        .then((res) => {
          careArr.push(...res.data);
        });
    };
    // 点击关注或者取关
    const careAndNoCare = (type, index, id, cate) => {
      proxy
        .http({
          method: "get",
          path: "/user/care",
          params: {
            userId: user._id,
            authorId: id,
            cate,
          },
        })
        .then((res) => {
          if (res.code == 200) {
            if (type == 1) {
              fansArr[index].isCare = cate == 1 ? true : false;
              if (cate == 1) {
                fansArr[index].fansCount++;
              } else {
                fansArr[index].fansCount--;
              }
            } else {
              careArr[index].isCare = cate == 1 ? true : false;
              if (cate == 1) {
                careArr[index].fansCount++;
              } else {
                careArr[index].fansCount--;
              }
            }

            // 如果当前用户与当前作者页面相同
            if (user._id == author._id) {
              if (cate == 1) {
                author.careId++;
              } else {
                author.careId--;
              }
            }
          } else {
            proxy.$message.error("出现异常稍后再试");
          }
        });
    };

    // 点击抽屉里面里面的粉丝与关注 每次要重新获取数据
    const clickDrawerFansOrCare = (index) => {
      if (index == drawerActive.value) {
        return;
      }
      if (index == 1) {
        // 获取粉丝列表
        fansArr.length = 0;
        getFans();
        drawerActive.value = index;
      } else {
        // 获取关注列表
        careArr.length = 0;
        getCare();
        drawerActive.value = index;
      }
    };

    // 点击外面的粉丝与关注也是 重新获取数据
    const clickFansOrCare = (index) => {
      drawer.value = true;
      if (index == 1) {
        // 获取粉丝列表
        fansArr.length = 0;
        getFans();
        drawerActive.value = index;
      } else {
        // 获取关注列表
        careArr.length = 0;
        getCare();
        drawerActive.value = index;
      }
    };

    getPageData();

    return {
      id,
      isLogin,
      user,
      handlerTime,
      toArticle,
      toAuthor,
      author,
      articleOrLike,
      clickAOrL,
      getArticle,
      getLiked,
      article,
      articleLiked,
      getIsCare,
      isCare,
      careOrNoCare,
      hotArticle,
      getHotArticle,
      getPageData,
      drawer,
      drawerActive,
      fansArr,
      careArr,
      getFans,
      careAndNoCare,
      getCare,
      clickDrawerFansOrCare,
      clickFansOrCare,
    };
  },
};
</script>
    


  <style scoped lang="less">
.web-con {
  overflow: hidden;
  background-color: #ffffff;

  // min-width: 1000px;

  .web-content {
    position: relative;
    margin-top: 66px;
    // background-color: pink;
    min-height: 100vh;

    width: 1066px;
    margin: 66px auto 0px;
    display: flex;
    justify-content: space-between;

    .left-con {
      width: 676px;
      padding-top: 50px;
      // background-color: pink;
      .author-msg {
        min-height: 100px;
        display: flex;
        margin-bottom: 50px;
        .img-con {
          width: 106px;
          height: 106px;
          overflow: hidden;
          border-radius: 50%;
          margin-right: 40px;
          img {
            width: 106px;
          }
        }
        .msg-right {
          flex: 1;
          min-height: 100px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .msg-r-name {
            font-size: 24px;
            color: #222222;
          }
          .msg-r-con1 {
            display: flex;
            .msg-star {
              margin-right: 40px;
              display: flex;
              align-items: center;
              cursor: pointer;
              // background-color: pink;
              .msg-sz {
                font-size: 24px;
              }
              .msg-wz {
                font-size: 14px;
                color: #505050;
              }
            }
          }
          .msg-right-desc {
            display: flex;
            justify-content: flex-start;
            font-size: 16px;
            color: #222222;
          }
        }
      }
      .author-tabBar {
        position: relative;
        //   background-color: hotpink;
        color: #222222;
        font-size: 18px;
        display: flex;
        height: 40px;
        border-bottom: 1px solid #ededed;
        & > span {
          margin-right: 36px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          height: 40px;
          //   background-color: pink;
        }
        .active-tabBar {
          color: rgb(240, 65, 66);
          &::after {
            content: "";
            display: inline-block;
            height: 2px;
            border-radius: 1px;
            width: 20px;
            background-color: red;
          }
        }

        .r-list-con {
          position: absolute;
          right: 0;
          transform: translateX(calc(100% + 73px));
          .r-list-con-h {
            font-size: 20px;
            color: #222222;
            height: 41px;
          }
          .r-list {
            min-height: 50px;
            padding: 16px 0px;
            display: flex;
            width: 318px;

            .r-list-imgcon {
              height: 72px;
              width: 96px;
              overflow: hidden;
              margin-right: 12px;
              border-radius: 3px;
              img {
                width: 96px;
                cursor: pointer;
                transition: all 0.5s;
                &:hover {
                  transform: scale(1.1);
                }
              }
            }
            .msg-con {
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .title {
                font-size: 16px;
                color: #222222;
                cursor: pointer;
                &:hover {
                  color: red;
                }
              }
              .msg-con-msg {
                font-size: 14px;
                color: #999999;

                .m-c-m-t {
                  margin-left: 16px;
                }
              }
            }
          }
        }
      }
      .author-content {
        margin-bottom: 50px;
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
    }
    .right-con {
      box-sizing: border-box;
      width: 318px;
      // background:yellow;
      .likeBtn-con {
        margin-top: 50px;
        width: 180px;
        height: 114px;
        //   background-color: pink;
        display: flex;
        align-items: center;
        button {
          width: 180px;
          height: 36px;
          line-height: 36px;
          font-size: 14px;
          outline: none;
          border: 0;
          border-radius: 5px;
        }
        .btn1 {
          color: #ededed;
          background-color: #f04142;
          &:hover {
            background-color: #f06465;
          }
        }
        .btn2 {
          color: #9999b2;
          background-color: #f8f8f8;
        }
      }
    }
  }
  @media screen and (max-width: 1106px) {
    .web-content {
      margin: 66px 20px 0px 20px;
    }
  }

  .el-drawer {
    display: flex;
    flex-direction: column;
    .drawer-tabar {
      height: 30px;
      // background-color: yellow;
      font-size: 20px;
      color: #333333;
      display: flex;
      margin-bottom: 10px;
      span {
        cursor: pointer;
        position: relative;
      }
      .drawer-tabar-span {
        margin-right: 20px;
      }
      .drawer-tabar-active {
        &::after {
          position: absolute;
          content: "";
          bottom: -3px;
          left: 50%;
          transform: translateX(-50%);
          height: 3px;
          width: 30px;
          background-color: red;
          border-radius: 2px;
        }
      }
    }
    .drawer-body {
      height: calc(100vh - 80px);
      width: 100%;
      // background: pink;
      .list-con {
        .item-con {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0px;
          height: 44px;
          // background-color: pink;
          cursor: pointer;
          &:hover {
            background-color: #f8f8f8;
          }
          .ImgCon {
            width: 44px;
            height: 44px;
            overflow: hidden;
            border-radius: 50%;
            margin-right: 10px;
            img {
              width: 44px;
              height: 44px;
            }
          }
          .fans-msg {
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            .fans-name {
              color: #222222;
              font-size: 16px;
            }
            .fans-fansCount {
              color: #707070;
              font-size: 14px;
            }
          }
          .nocare-btn {
            cursor: pointer;
            height: 30px;
            width: 50px;
            outline: none;
            border: 0px;
            border-radius: 5px;
            color: #ededed;
            background-color: red;
            font-size: 12px;
            &:hover {
              background-color: #f04142;
            }
          }
          .care-btn {
            cursor: pointer;
            height: 30px;
            width: 50px;
            outline: none;
            border: 0px;
            border-radius: 5px;
            color: #999999;
            background-color: #f6f6f7;
            font-size: 12px;
            &:hover {
              background-color: #f8f8f8;
            }
          }
        }
      }
    }
  }
}
</style>
    