<template>
  <div class="web-con">
    <web-header></web-header>

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
          <div v-html="article.content" class="article-content"></div>
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
          <div class="lqbz">
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
            <div class="avatar" @click="toUserMainPage(item.userId)">
              <img :src="item.avatar" alt="" class="img1" />
            </div>
            <!-- 头像右边内容 -->
            <div class="item-right">
              <!-- 名称 与点赞-->
              <div class="item-right-con1">
                <div class="name" @click="toUserMainPage(item.userId)">
                  {{ item.username }}
                </div>
                <!-- <div class="star">{{ item.star }}</div> -->
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
                  @add="addComment2(null, item._id)"
                  v-if="isLogin"
                ></comment>
              </div>
              <!-- 评论的回复 -->
              <div class="item-item" v-if="item._id == openHf">
                <div
                  v-for="item1 in item.forComment"
                  :key="item1._id"
                  class="item-item-con"
                >
                  <!-- 头像 -->
                  <div
                    class="item-item-img-con"
                    @click="toUserMainPage(item1.userId)"
                  >
                    <img :src="item1.avatar" />
                  </div>

                  <div class="i-i-left">
                    <!-- 用户名 -->
                    <div
                      class="i-i-l-name"
                      @click="toUserMainPage(item1.userId)"
                    >
                      {{ item1.username }}
                    </div>
                    <!-- 评论内容 -->
                    <div class="i-i-l-content">
                      {{ item1.content }}
                      <span v-if="item1.BcId != ''" class="i-i-l-content-x"
                        >回复@{{ item1.BcName }}:{{ item1.BcContent }}</span
                      >
                    </div>
                    <div class="i-i-l-b">
                      <span class="i-i-l-hf" @click="clickHf(item1._id)"
                        >回复</span
                      >
                      <span class="i-i-l-time">{{
                        handlerTime2(item1.createTime)
                      }}</span>
                    </div>
                    <!-- 回复框 -->
                    <div v-if="item1._id == id1" class="item-hfk1">
                      <comment
                        :value="commentForComment"
                        @change="change2"
                        @add="addComment2(item1, item._id)"
                        v-if="isLogin"
                      ></comment>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 点击后显示10条回复 -->
              <div class="item-right-con3" v-if="item.forComment.length != 0">
                <span @click="clickMoreHf(item._id)" v-if="item._id !== openHf"
                  >查看全部回复</span
                >
                <span
                  @click="clickMoreHf(item._id)"
                  v-if="item._id == openHf"
                  class="sq"
                  >收起</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- 分页 -->
        <div class="more-comment">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="commentTotal"
            v-model:currentPage="currentPage"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>

      <div class="right-con">
        <div class="r-c-author-msg">
          <div class="r-c-a-m-c" @click="toUserMainPage(article.authorId)">
            <img :src="author.avatar" alt="" />
          </div>
          <div class="r-c-a-m-name">{{ author.username }}</div>
          <div class="r-c-a-m-desc">{{ author.desc }}</div>
          <div v-if="user._id !== article.authorId">
            <button class="rcam-gz" v-if="isCare" @click="careOrNoCare">
              已关注
            </button>
            <button
              class="rcam-gz rcam-gz1"
              v-if="!isCare"
              @click="careOrNoCare"
            >
              关注
            </button>
          </div>
        </div>
        <!-- Ta的热门作品 -->
        <div class="tdrmzp">
          <span> TA的热门作品 </span>
        </div>

        <!-- 近期最热文章 -->
        <div class="r-list-con">
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
                <span class="m-c-m-t">{{ handlerTime(item.createTime) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
    
  <script>
import { ref, reactive, onMounted, getCurrentInstance, watch } from "vue";
import { useStore } from "vuex";
import comment from "../../components/comment.vue";
import webHeader from "../../components/webHeader.vue";
import handlerTimefn from "../../hooks/handerTime.js";
import { useRoute, useRouter } from "vue-router";

export default {
  components: {
    comment,
    webHeader,
  },
  setup() {
    const store = useStore();
    let { proxy } = getCurrentInstance();
    let route = useRoute();
    let router = useRouter();

    let isLogin = localStorage.user ? true : false;
    let user = !isLogin ? null : JSON.parse(localStorage.user);

    // 文章的信息
    let article = reactive({});

    // 处理时间的函数
    const { handlerTime1: handlerTime2, handlerTime2: handlerTime } =
      handlerTimefn();
    // 进入文章详情页面
    const toArticle = (id) => {
      console.log("点击了");
      if (id !== article._id) {
        // 数据全部重新获取
        getAllData(id);
      }
      proxy.$router.push({
        path: "/article",
        query: {
          id,
        },
      });
    };

    watch(
      () => route.fullPath,
      (newData, oldData) => {
        if (route.path == "/article") {
          getAllData(route.query.id);
        }
      }
    );

    // 评论信息
    let comments = reactive([]);
    // 获取文章的评论
    const getComment = () => {
      proxy
        .http({
          method: "get",
          path: "comment/web/find",
          params: {
            id: article._id,
            start: (currentPage.value - 1) * pageSize.value,
            size: pageSize.value,
          },
        })
        .then((res) => {
          if (res.code == 200) {
            comments.length = 0;
            comments.push(...res.data);
            // 把评论总数赋值
            commentTotal.value = res.count;
          }
        });
    };
    // 对文章的评论内容
    let commentForArticle = ref("");
    // 监听输入框改变
    const change1 = (data) => {
      commentForArticle.value = data;
    };
    // 对文章发布评论
    const addComment = () => {
      if (!commentForArticle.value.trim()) {
        return;
      }
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
            getComment();
          }
        });
    };

    // 对一级评论的回复内容
    let commentForComment = ref("");
    //第一级回复的id
    let id1 = ref();
    // 点击回复的时候
    const clickHf = (id) => {
      if (id == id1.value) {
        id1.value = "";
      } else {
        // 出现评论框
        id1.value = id;
      }
    };
    // 监听输入框改变一级评论
    const change2 = (data) => {
      commentForComment.value = data;
    };
    // 发布对一级评论的回复
    const addComment2 = (arg, id) => {
      if (!commentForComment.value.trim()) {
        return;
      }
      proxy
        .http({
          method: "post",
          path: "/comment/update",
          params: {
            // 文章id
            aId: proxy.$route.query.id,
            // 评论id
            id: id,
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
              BcId: arg ? arg.userId : "",
              // 被回复的人的姓名,
              BcName: arg ? arg.username : "",
              // 被回复人头像
              BcAvatar: arg ? arg.avatar : "",
              // 被回复的内容
              BcContent: arg ? arg.content : "",
            },
          },
        })
        .then((res) => {
          if (res.code == 200) {
            // 成功之后清除评论框信息
            commentForComment.value = "";
            proxy.$message.success("回复成功");
            // 然后重新请求一次
            getComment();
          }
        });
    };

    // 展开更多回复的评论
    let openHf = ref("");
    // 点击查看更多回复
    const clickMoreHf = (id) => {
      if (id == openHf.value) {
        openHf.value = "";
      } else {
        openHf.value = id;
      }
    };

    // 点击用户进入用户主页
    const toUserMainPage = (id) => {
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
      let dom1 = document.getElementById("js-con");
      window.scrollTo(0, dom1.clientHeight + 50 + 66);
    };
    // 作者信息
    let author = reactive({});

    // 获取作者信息
    const getAuthorData = (id) => {
      proxy
        .http({
          method: "get",
          path: "/user/getmsg",
          params: {
            id: id,
          },
        })
        .then((res) => {
          if (res.code == 200) {
            Object.assign(author, res.data);
          }
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
            authorId: article.authorId,
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
            authorId: article.authorId,
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
    // 作者热门文章
    let hotArticle = reactive([]);
    // 获取作者最近最热文章
    const getHotArticle = () => {
      proxy
        .http({
          method: "get",
          path: "/article/userHotArticle",
          params: {
            id: article.authorId,
          },
        })
        .then((res) => {
          hotArticle.push(...res.res);
        });
    };

    // 评论总数
    let commentTotal = ref(0);
    // 当前页数
    let currentPage = ref(1);
    // 每页数量
    let pageSize = ref(10);
    // 当前页改变的时候
    const handleCurrentChange = (page) => {
      // 请求评论
      getComment();
    };

    // 页面初始化
    const getAllData = (aid) => {
      // 获取传过来的文章id
      let id = aid ? aid : route.query.id;
      comments.length = 0;
      hotArticle.length = 0;
      // 获取单个文章信息
      proxy
        .http({
          method: "get",
          path: "/article/findOne",
          params: {
            id,
          },
        })
        .then((res) => {
          Object.assign(article, res.data);
          document.title = article.title;
        })
        .then(() => {
          getComment();
          getIsCollect();
          getIsStar();
          getAuthorData(article.authorId);
          getIsCare();
          getHotArticle();
        });
    };

    getAllData();
    return {
      pageSize,
      commentTotal,
      currentPage,
      handleCurrentChange,
      id1,
      isLogin,
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
      author,
      getAuthorData,
      isCare,
      getIsCare,
      careOrNoCare,
      hotArticle,
      getHotArticle,
      toArticle,
      getAllData,
    };
  },
};
</script>
    
  <style scoped lang="less">
.web-con ::v-deep {
  overflow: hidden;
  background-color: #ffffff;
  min-width: 100vh;

  .web-content {
    position: relative;
    min-height: calc(100vh - 66px);
    width: 1066px;
    margin: 66px auto 0px;
    display: flex;
    justify-content: space-between;
    // background-color: pink;

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
      .article-content {
        white-space: pre-wrap;
          word-break:break-all; 
        line-height: 1.8;
        img{
          margin: 20px 0px;
        }
        // background-color: pink;
        /* table 样式 */
        table {
          border-top: 1px solid #ccc;
          border-left: 1px solid #ccc;
        }
        table td,
        table th {
          border-bottom: 1px solid #ccc;
          border-right: 1px solid #ccc;
          padding: 3px 5px;
        }
        table th {
          border-bottom: 2px solid #ccc;
          text-align: center;
        }
        /* blockquote 样式 */
        blockquote {
          display: block;
          border-left: 8px solid #d0e5f2;
          padding: 5px 10px;
          margin: 10px 0;
          line-height: 1.4;
          font-size: 100%;
          background-color: #f1f1f1;
        }
        /* code 样式 */
        code {
          display: inline-block;
          *display: inline;
          *zoom: 1;
          background-color: #f1f1f1;
          border-radius: 3px;
          padding: 3px 5px;
          margin: 0px 3px;
          background-color: #282C34;

          // background-color: pink;
        }
        pre{
          margin: 20px 0px;
          background-color: #282C34;

        }
        pre code {
          display: block;
          white-space: pre-wrap;
          word-break:break-all; 
        }
        ul,
        ol {
          margin: 10px 0 10px 20px;
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
            height: 36px;
          }
          .img2 {
            width: 36px;
            height: 36px;
            background: url("../../public/avatar.png") no-repeat center;
            background-size: 100%;
          }
        }
        .lqbz {
          flex: 1;
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
            cursor: pointer;
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
                cursor: pointer;
              }
              .star {
                // background-color: blue;
                cursor: pointer;
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
                    cursor: pointer;
                  }
                  .i-i-l-content {
                    font-size: 16px;
                    color: #222222;
                    margin: 10px 0px;
                    font-weight: 400;
                    .i-i-l-content-x {
                      font-size: 14px;
                      color: red;
                    }
                  }
                  .i-i-l-b {
                    font-size: 14px;
                    color: #222222;
                    margin-bottom: 10px;
                    .i-i-l-hf {
                      margin-right: 10px;
                      cursor: pointer;
                    }
                    .i-i-l-time {
                      color: #999999;
                      font-size: 14px;
                    }
                  }
                  // 评论框
                }
              }
            }
            .item-right-con3 {
              font-size: 14px;
              color: #505050;
              cursor: pointer;
              .sq {
                color: #409eff;
              }
            }
          }
        }
      }
      .more-comment {
        margin-bottom: 100px;

        .el-pagination.is-background .el-pager li:not(.disabled).active {
          background-color: #ee4142;
          color: white !important;
        }

        .el-pagination.is-background .el-pager li:not(.disabled):hover {
          color: #606266;
        }
      }
    }
    .right-con {
      box-sizing: border-box;
      padding-top: 50px;
      width: 318px;
      // height: 200px;
      .r-c-author-msg {
        display: flex;
        flex-direction: column;
        align-items: center;
        .r-c-a-m-c {
          height: 60px;
          width: 60px;
          overflow: hidden;
          border-radius: 50%;
          cursor: pointer;
          img {
            width: 60px;
          }
        }
        .r-c-a-m-name {
          color: #222222;
          font-size: 16px;
          margin: 8px 0px 4px;
        }
        .r-c-a-m-desc {
          text-align: center;
          // background-color: pink;
          font-size: 14px;
          width: 240px;
          color: #707070;
          margin-bottom: 12px;
          word-wrap: break-word;
        }
        .rcam-gz {
          width: 96px;
          height: 32px;
          outline: none;
          border: none;
          color: #999999;
          background-color: #f8f8f8;
          font-size: 14px;
          border-radius: 4px;
          cursor: pointer;
          &:hover {
            color: #adadad;
          }
        }
        .rcam-gz1 {
          background-color: #505050;
          color: #f5f5f5;
          &:hover {
            color: #f5f5f5;
            background-color: #707070;
          }
        }
      }
      .tdrmzp {
        margin: 36px 0px 8px;
        font-size: 14px;
        color: #222222;
        height: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &:before {
          content: "";
          min-width: 100px;
          height: 1px;
          background-color: #f1f3f4;
          display: inline-block;
        }
        &:after {
          content: "";
          min-width: 100px;
          height: 1px;
          background-color: #f1f3f4;
          display: inline-block;
        }
      }
      .r-list-con {
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
  }
  @media screen and (max-width: 1106px) {
    .web-content {
      margin: 66px 20px 0px 20px;
    }
  }
}
</style>
    