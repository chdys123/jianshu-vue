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
      <!-- 点赞 评论 收藏 -->
      <div class="fixed">
        <div class="fixed-item" @click="star">
          <i class="iconfont icon-dianzan" :class="{ hasStared: isStar }"></i>
          <span :class="{ hasStared: isStar }">{{ article.star }}</span>
        </div>
        <div class="fixed-item" @click="toComment">
          <i class="iconfont icon-pinglun"></i>
          <span>评论</span>
        </div>
        <div class="fixed-item" @click="collect">
          <i
            class="iconfont icon-shoucang"
            :class="{ hasCollected: isCollect }"
          ></i>
          <span v-if="!isCollect">收藏</span>
          <span class="hasCollected" v-if="isCollect">已收藏</span>
        </div>
      </div>
      <div class="left-con">
        <div id="js-con">
          <!-- 文章标题 -->
          <h1>
            {{ article.title }}
          </h1>
          <!-- 时间  作者信息 -->
          <div class="msg">
            <span class="time">{{ handlerTime(article.createTime) }}</span>
            <!-- 点击进入创作者主页 -->
            <span @click="toUserMainPage(article.authorId)" class="authod">{{
              article.author
            }}</span>
          </div>
          <!-- 文章内容 -->
          <div v-html="article.content"></div>
        </div>

        <!-- 评论标题 -->
        <div class="comment-title">评论&nbsp;&nbsp;{{ article.comment }}</div>
        <!-- 评论框 -->
        <div class="comment-write">
          <!-- 头像 -->
          <div class="avatar">
            <img :src="user.avatar" v-if="isLogin" class="img1" />
            <div class="img2" v-if="!isLogin"></div>
          </div>
          <!-- 框框 -->
          <div>
            <!-- 如果登录 -->
            <comment
              :value="commentForArticle"
              @change="change1"
              @add="addComment"
              v-if="isLogin"
            ></comment>

            <!-- 如果没有登录 -->
            <div v-if="!isLogin" class="comment-nologin">
              <p>请先 <span>登录</span> 之后发表评论~</p>
            </div>
          </div>
        </div>

        <!-- 具体的评论 先展示三条-->
        <div class="comment-con">
          <div v-for="item in comments" :key="item._id" class="item">
            <!-- 头像 -->
            <div class="avatar">
              <img :src="item.avatar" alt="" class="img1" />
            </div>
            <!-- 头像右边内容 -->
            <div class="item-right">
              <!-- 名称 与点赞-->
              <div class="item-right-con1">
                <div class="name">{{ item.username }}</div>
                <div class="star">{{ item.star }}</div>
              </div>
              <!-- 评论内容 -->
              <div class="item-right-content">
                {{ item.content }}
              </div>
              <!-- 回复与时间 -->
              <div class="item-right-con2">
                <span class="item-right-hf" @click="clickHf(item._id)"
                  >回复</span
                >
                <span class="item-createTime">{{
                  handlerTime2(item.createTime)
                }}</span>
              </div>
              <!-- 回复框 -->

              <div v-if="item._id == id1" class="item-hfk1">
                <comment
                  :value="commentForComment"
                  @change="change2"
                  @add="addComment2(arguments, item._id)"
                  v-if="isLogin"
                ></comment>
              </div>
              <!-- 评论的回复 -->
              <div class="item-item" v-if="item._id == openHf">
                <div
                  v-for="item1 in item.forComment.reverse()"
                  :key="item1._id"
                  class="item-item-con"
                >
                  <!-- 头像 -->
                  <div class="item-item-img-con">
                    <img :src="item1.avatar" />
                  </div>

                  <div class="i-i-left">
                    <!-- 用户名 -->
                    <div class="i-i-l-name">{{ item1.username }}</div>
                    <!-- 评论内容 -->
                    <div class="i-i-l-content">{{ item1.content }}</div>
                    <div class="i-i-l-b">
                      <span class="i-i-l-hf">回复</span>
                      <span class="i-i-l-time">{{
                        handlerTime2(item1.createTime)
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 点击后显示10条回复 -->
              <div class="item-right-con3">
                <span @click="clickMoreHf(item._id)">查看全部回复</span>
                <!-- <span>收起</span> -->
              </div>
              <!--  -->
              <!-- 点击后在展示10条回复 -->
              <!-- <div class="item-right-con3">查看更多回复</div> -->
            </div>
          </div>
        </div>

        <!-- 查看全部多少条评论 -->
        <div class="more-comment">查看全部1000条评论></div>
      </div>
      <div class="right-con">推荐阅读</div>
    </div>
  </div>
</template>
    
    
  <script>
import { ref, reactive, onMounted, getCurrentInstance, watch } from "vue";
import { useStore } from "vuex";
import popover from "../../components/popover2.vue";
import comment from "../../components/comment.vue";
export default {
  components: {
    popover,
    comment,
  },
  setup() {
    const store = useStore();
    let { proxy } = getCurrentInstance();
    let activeItem = ref(0);
    const getData = (index) => {
      activeItem.value = Number(index);
    };
    let isLogin = localStorage.user ? true : false;
    let user = !isLogin ? null : JSON.parse(localStorage.user);

    // 文章的信息
    let article = reactive({});

    // 处理文章或者草稿创作时间的函数
    const handlerTime = (time) => {
      let date = new Date(Number(time));
      let nowYear = new Date(Date.now).getFullYear();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      let day = date.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      let hours = date.getHours();
      if (hours < 10) {
        hours = "0" + hours;
      }
      let minutes = date.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      return month + "-" + day + " " + hours + ":" + minutes;
    };

    // 处理评论时间的函数
    const handlerTime2 = (time) => {
      let date = new Date(Number(time));

      if (Date.now() - Number(time) < 60 * 1000) {
        return Math.floor((Date.now() - Number(time)) / 1000) + "秒前";
      } else if (Date.now() - Number(time) < 60 * 60 * 1000) {
        return Math.floor((Date.now() - Number(time)) / (1000 * 60)) + "分钟前";
      } else if (Date.now() - Number(time) < 24 * 60 * 60 * 1000) {
        return (
          Math.floor((Date.now() - Number(time)) / (1000 * 60 * 60)) + "小时前"
        );
      }

      let nowYear = new Date(Date.now).getFullYear();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      let day = date.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      let hours = date.getHours();
      if (hours < 10) {
        hours = "0" + hours;
      }
      let minutes = date.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      if (Number(nowYear) < date.getFullYear()) {
        return year + " " + month + "-" + day + " " + hours + ":" + minutes;
      } else {
        return month + "-" + day + " " + hours + ":" + minutes;
      }
    };
    // 评论信息
    let comments = reactive([]);
    // 获取文章的评论
    const getComment = (start, size) => {
      proxy
        .http({
          method: "get",
          path: "comment/web/find",
          params: {
            id: article._id,
            start,
            size,
          },
        })
        .then((res) => {
          if (res.code == 200) {
            comments.length = 0;
            comments.push(...res.data);
          }
        });
    };
    // 对文章的评论内容
    let commentForArticle = ref("");
    // 监听输入框改变
    const change1 = (data) => {
      commentForArticle.value = data;
      console.log(commentForArticle.value);
    };
    // 对文章发布评论
    const addComment = () => {
      let comment = {
        username: user.username,
        userId: user._id,
        avatar: user.avatar,
        author: article.author,
        authorId: article.authorId,
        articleTitle: article.title,
        articleId: article._id,
        content: commentForArticle.value,
        createTime: Date.now(),
        hasCForComment: false,
      };
      // 如果对文章评论
      proxy
        .http({
          method: "post",
          path: "/comment/add",
          params: comment,
        })
        .then((res) => {
          if (res.code == 200) {
            proxy.$message.success("评论成功");
            article.comment += 1;
            // 清空内容
            commentForArticle.value = "";
            // 重新获取三条评论
            getComment(0, 3);
          }
        });
    };

    // 对一级评论的回复内容
    let commentForComment = ref("");
    //第一级回复的id
    let id1 = ref();
    // 点击回复的时候
    const clickHf = (id) => {
      // 出现评论框
      id1.value = id;
    };
    // 监听输入框改变一级评论
    const change2 = (data) => {
      commentForComment.value = data;
      console.log(commentForComment.value);
    };
    // 发布对一级评论的回复
    const addComment2 = (arg, id) => {
      proxy
        .http({
          method: "post",
          path: "/comment/update",
          params: {
            // 文章id
            aId: proxy.$route.query.id,
            // 评论id
            id,
            comment: {
              // 回复的userId
              userId: user._id,
              // 回复username
              username: user.username,
              // 回复的头像
              avatar: user.avatar,
              // 回复的内容
              content: commentForComment.value,
              // 回复的时间
              createTime: Date.now(),

              // 被回复的人id
              BcId: "",
              // 被回复的人的姓名,
              BcName: "",
              // 被回复人头像
              BcAvatar: "",
              // 被回复的内容
              BcContent: "",
            },
          },
        })
        .then((res) => {
          if (res.code == 200) {
            // console.log("回复评论成功");
            // 成功之后清除评论框信息
            commentForComment.value = "";
            proxy.$message.success("回复成功");
            // 然后重新请求一次
            getComment(0, 3);
          }
        });
    };

    // 展开更多回复的评论
    let openHf = ref("");
    // 点击查看更多回复
    const clickMoreHf = (id) => {
      openHf.value = id;
    };

    // 点击用户进入用户主页
    const toUserMainPage = (id) => {
      console.log("进入用户主页");
      proxy.$router.push({
        path: "/authod",
        query: {
          id: id,
        },
      });
    };

    // 当前文章是否被收藏的标志
    let isCollect = ref(false);
    //获取当前文章是否被收藏的方法
    const getIsCollect = () => {
      proxy
        .http({
          method: "get",
          path: "/user/isCollect",
          params: {
            userId: user._id,
            articleId: article._id,
          },
        })
        .then((res) => {
          isCollect.value = res.data;
        });
    };
    // 点击收藏执行的方法
    const collect = () => {
      let cate = null;
      if (isCollect.value) {
        cate = 2;
      } else {
        cate = 1;
      }
      proxy
        .http({
          method: "get",
          path: "/user/collect",
          params: {
            userId: user._id,
            articleId: article._id,
            cate,
          },
        })
        .then((res) => {
          // console.log(res)
          isCollect.value = res.data;
        });
    };
    // 当前文章是否被点赞的标志
    let isStar = ref(false);
    // 获取当前文章是否被点赞的方法
    const getIsStar = () => {
      proxy
        .http({
          method: "get",
          path: "/user/isStar",
          params: {
            userId: user._id,
            articleId: article._id,
          },
        })
        .then((res) => {
          console.log(res);
          isStar.value = res.data;
        });
    };
    // 点击点赞执行的方法
    const star = () => {
      let cate = null;
      if (isStar.value) {
        cate = 2;
      } else {
        cate = 1;
      }
      proxy
        .http({
          method: "get",
          path: "/user/star",
          params: {
            userId: user._id,
            articleId: article._id,
            cate,
          },
        })
        .then((res) => {
          console.log(res);
          isStar.value = res.data;
          if (res.data) {
            article.star++;
          } else {
            article.star--;
          }
        });
    };

    // 点击评论图标执行的方法
    const toComment = () => {
      let dom1=document.getElementById("js-con")
      window.scrollTo(0,dom1.clientHeight+50+66)
    };

    return {
      id1,
      activeItem,
      isLogin,
      getData,
      user,
      handlerTime,
      handlerTime2,
      article,
      commentForArticle,
      commentForComment,
      change1,
      change2,
      addComment,
      addComment2,
      comments,
      getComment,
      clickHf,
      openHf,
      clickMoreHf,
      toUserMainPage,
      isCollect,
      getIsCollect,
      collect,
      isStar,
      getIsStar,
      star,
      toComment,
    };
  },

  created() {
    // 获取传过来的文章id
    let id = this.$route.query.id;
    // 获取单个文章信息
    this.http({
      method: "get",
      path: "/article/findOne",
      params: {
        id,
      },
    })
      .then((res) => {
        Object.assign(this.article, res.data);
      })
      .then(() => {
        this.getComment(0, 3);
        this.getIsCollect();
        this.getIsStar();
      });
  },
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
  .web-content {
    position: relative;
    min-height: 1000px;
    width: 1066px;
    margin: 66px auto 0px;
    display: flex;
    justify-content: space-between;
    .fixed {
      position: fixed;
      top: 164px;
      transform: translateX(-60px);
      min-width: 48px;
      min-height: 200px;
      // background-color: pink;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      .iconfont {
        font-size: 24px;
        cursor: pointer;
      }
      .hasCollected {
        color: #ffc740 !important;
      }
      .hasStared {
        color: red !important;
      }
      .fixed-item {
        display: flex;
        align-items: center;
        flex-direction: column;
        span {
          cursor: pointer;
          font-size: 12px;
          color: #222222;
        }
      }
    }

    .left-con {
      width: 676px;
      box-sizing: border-box;
      padding-top: 50px;
      .msg {
        font-size: 14px;
        color: #707070;
        margin: 16px 0px 36px;
        .time {
          margin-right: 20px;
        }
        .authod {
          cursor: pointer;
          &:hover {
            color: #9a9a9a;
          }
        }
      }
      .comment-title {
        margin-top: 100px;
        font-size: 20px;
        font-weight: 600;
        line-height: 28px;
        color: #222;
      }
      .comment-write {
        margin: 24px 0px 40px 0px;
        display: flex;
        .avatar {
          width: 36px;
          height: 36px;
          overflow: hidden;
          border-radius: 50%;
          margin-right: 12px;
          .img1 {
            width: 36px;
          }
          .img2 {
            width: 36px;
            height: 36px;
            background: url("../../public/avatar.png") no-repeat center;
            background-size: 100%;
          }
        }

        .comment-nologin {
          background-color: #f8f8f8;
          width: 628px;
          height: 100px;
          cursor: pointer;
          font-size: 16px;
          color: #222222;
          display: flex;
          align-items: center;
          justify-content: center;
          span {
            color: #ee4142;
          }
        }
      }
      .comment-con {
        width: 100%;
        .item {
          display: flex;
          margin-bottom: 40px;
          .avatar {
            width: 36px;
            height: 36px;
            overflow: hidden;
            border-radius: 50%;
            margin-right: 12px;
            .img1 {
              width: 36px;
              vertical-align: middle;
            }
          }
          .item-right {
            flex: 1;
            // background-color: yellow;
            // display: flex;
            flex-direction: column;
            justify-content: space-between;
            .item-right-con1 {
              color: #222222;
              font-size: 16px;
              display: flex;
              justify-content: space-between;
              .name {
                // background-color: red;
              }
              .star {
                // background-color: blue;
              }
            }
            .item-right-content {
              // background-color: hotpink;
              color: #222222;
              font-size: 16px;
              margin: 10px 0px;
            }
            .item-right-con2 {
              margin-bottom: 10px;
              .item-right-hf {
                color: #222222;
                font-size: 14px;
                cursor: pointer;
              }
              .item-createTime {
                color: #999999;
                font-size: 14px;
                margin-left: 20px;
              }
            }
            .item-hfk1 {
              min-height: 50px;
              margin-bottom: 20px;
            }
            .item-item {
              .item-item-con {
                margin-bottom: 20px;
                display: flex;
                .item-item-img-con {
                  height: 22px;
                  width: 22px;
                  overflow: hidden;
                  border-radius: 50%;
                  margin-right: 8px;
                  cursor: pointer;
                  img {
                    width: 22px;
                  }
                }
                .i-i-left {
                  flex: 1;
                  .i-i-l-name {
                    font-size: 16px;
                    color: #222222;
                  }
                  .i-i-l-content {
                    font-size: 16px;
                    color: #222222;
                    margin: 10px 0px;
                    font-weight: 400;
                  }
                  .i-i-l-b {
                    font-size: 14px;
                    color: #222222;
                    .i-i-l-hf {
                      margin-right: 10px;
                      cursor: pointer;
                    }
                    .i-i-l-time {
                      color: #999999;
                      font-size: 14px;
                    }
                  }
                }
              }
            }
            .item-right-con3 {
              font-size: 14px;
              color: #505050;
              cursor: pointer;
            }
          }
        }
      }
      .more-comment {
        height: 44px;
        background-color: #f8f8f8;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #222222;
        font-size: 16px;
        margin-bottom: 100px;
        cursor: pointer;
        &:hover {
          color: #898989;
        }
      }
    }
    .right-con {
      box-sizing: border-box;
      width: 318px;
      // height: 200px;
      background-color: yellow;
    }
  }
  @media screen and (max-width: 1106px) {
    .web-content {
      margin: 66px 20px 0px 20px;
    }
  }
}
</style>
    