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
              <div class="msg-star">
                <span class="msg-sz">{{ author.fans }}</span>
                <span class="msg-wz">粉丝</span>
              </div>
              <div class="msg-star">
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
            <div v-for="item in hotArticle" :key="item._id" class="r-list">
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
          <!-- 用户收藏的文章 -->
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

    // 当前页面用户id
    let id = ref("");

    // 进入文章详情页面
    const toArticle = (id) => {
      proxy.$router.push({
        path: "/article",
        query: {
          id,
        },
      });
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

    // 获取到的作者信息
    let author = reactive({});

    // 文章或者收藏的flag
    let articleOrLike = ref(0);
    // 点击文章或者收藏的方法
    const clickAOrL = (num) => {
      articleOrLike.value = num;
    };
    // 作者写的文章
    let article = reactive({});

    // 作者收藏的文章
    let articleLiked = reactive({});

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
          Object.assign(article, res.res);
        });
    };
    // 获取作者收藏的文章
    const getLiked = () => {
      proxy
        .http({
          method: "get",
          path: "/user/getCollect",
          params: {
            userId: user._id,
          },
        })
        .then((res) => {
          Object.assign(articleLiked, res.res);
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
            id: user._id,
          },
        })
        .then((res) => {
          hotArticle.push(...res.res);
        });
    };
    return {
      id,
      activeItem,
      isLogin,
      getData,
      user,
      handlerTime,
      toArticle,
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
    };
  },
  created() {
    // 获取传过来的用户id
    this.id = this.$route.query.id;
    // 获取用户信息
    this.http({
      method: "get",
      path: "/user/getmsg",
      params: {
        id: this.id,
      },
    }).then((res) => {
      this.author = Object.assign(this.author, res.data);
    });

    // 获取文章信息
    this.getArticle();
    // 获取收藏的文章
    this.getLiked();
    // 是否关注
    this.getIsCare();
    // 获取作者近期最热文章
    this.getHotArticle();
  },

  mounted() {},
};
</script>
    

  <style scoped lang="less">
.web-con {
  overflow: hidden;
  background-color: #ffffff;
  min-width: 1000px;
  .web-header {
    height: 66px;
    position: fixed;
    width: 100%;
    background-color: #ffffff;
    z-index: 9;
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
  .web-content {
    position: relative;
    margin-top: 100px;
    min-height: 1000px;

    width: 1066px;
    margin: 66px auto 0px;
    display: flex;
    justify-content: space-between;

    .left-con {
      width: 676px;
      //   background-color: pink;
      padding-top: 50px;
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
                transition: all .5s;
                &:hover{
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
        margin-bottom: 100px;
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
}
</style>
    