<template>
  <div class="serach">
    <div class="serach-con">
      <web-header> </web-header>
      <div class="serach-header">
        <span :class="{ activeItem: activeItem == 1 }" @click="clickItem(1)"
          >文章</span
        >
        <span :class="{ activeItem: activeItem == 2 }" @click="clickItem(2)"
          >用户</span
        >
      </div>
      <div class="serch-body">
        <div class="serch-left">
          <!-- 展示文章的 -->
          <div v-show="activeItem == 1">
            <div
              v-for="item in articleData"
              :key="item._id"
              class="item"
              :data-id="item._id"
              @click="toArticle(item._id)"
            >
              <div class="item-left">
                <div class="title" v-html="item.title"></div>
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
            <div v-if="articleData.length == 0">没有搜索到相关文章</div>
            <!-- 分页 -->
            <el-pagination
              v-if="articleData.length != 0"
              background
              layout="prev, pager, next"
              :total="articleTotal"
              :page-size="size"
              v-model:currentPage="artCurrentPage"
              @current-change="getArticleData"
            >
            </el-pagination>
          </div>

          <!-- 展示用户的 -->
          <div v-show="activeItem == 2">
            <div v-for="item in userData" :key="item._id" class="user" @click="toAuthor(item._id)">
              <div class="img-con">
                <img :src="item.avatar" />
              </div>
              <div class="user-msg">
                <span class="user-username" v-html="item.username"></span>
                <span class="fansCount">{{ item.fansCount }}粉丝</span>
              </div>
            </div>
            <div v-if="userData.length == 0">没有搜索到相关用户</div>
            <!-- 分页 -->
            <el-pagination
              v-if="userData.length != 0"
              background
              layout="prev, pager, next"
              :total="userTotal"
              :page-size="size"
              v-model:currentPage="userCurrentPage"
              @current-change="getAuthorData"
            >
            </el-pagination>
          </div>
        </div>

        <div class="serch-right">右侧</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, getCurrentInstance ,watch} from "vue";
import { useRoute, useRouter } from "vue-router";
import webHeader from "../../components/webHeader.vue";
import handlerTimefn from "../../hooks/handerTime.js";

export default {
  components: {
    webHeader,
  },

  setup() {
    let route = useRoute();
    let router = useRouter();
    let { proxy } = getCurrentInstance();
    document.title = "搜索";
    const { handlerTime1: handlerTime } = handlerTimefn();

    // 显示文章 还是用户
    let activeItem = ref(1);
    // 点击item
    const clickItem = (index) => {
      activeItem.value = index;
    };
    // 文章数据
    let articleData = reactive([]);
    // 文章总数
    let articleTotal = ref(0);
    // 文章当前分页
    let artCurrentPage = ref(1);
    // 用户数据
    let userData = reactive([]);
    // 用户总数
    let userTotal = ref(0);
    // 用户当前分页
    let userCurrentPage = ref(1);

    // 每一页的数量
    let size = ref(20);

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

    //显示文本的时候 转义字符串 然后替换关键字为红色 然后添加标签
    const changeString = (str, key) => {
      let result = str.replace(/&lt;/g, "<");
      result = result.replace(/&gt;/g, ">");
      let reg = new RegExp("(" + key + ")", "g");
      result = result.replace(reg, ($0, $1) => {
        return "<span style='color:red;' class='textDeco'>" + $1 + "</span>";
      });

      return result;
    };

    // 获取搜索文章的数据 需要处理红色字体
    const getArticleData = () => {
      proxy
        .http({
          method: "get",
          path: "/serach/article",
          params: {
            start: (artCurrentPage.value - 1) * size.value,
            size: size.value,
            key: route.query.key,
          },
        })
        .then((res) => {
          articleTotal.value = res.count;
          articleData.length = 0;
          articleData.push(...res.data);
          articleData.forEach((item, index, arr) => {
            arr[index].title = changeString(item.title, route.query.key);
          });
        });
    };

    // 获取搜索的作者的数据
    const getAuthorData = () => {
      proxy
        .http({
          method: "get",
          path: "/serach/author",
          params: {
            start: (userCurrentPage.value - 1) * size.value,
            size: size.value,
            key: route.query.key,
          },
        })
        .then((res) => {
          userTotal.value = res.count;
          userData.length = 0;
          userData.push(...res.data);
          userData.forEach((item, index, arr) => {
            arr[index].username = changeString(item.username, route.query.key);
          });
        });
    };

    // 监听路由改变
    watch(
      () => route.fullPath,
      (newData, oldData) => {
        if (route.path == "/serach") {
          getData();
        }
      }
    );

    // 获取页面初始数据
    const getData = () => {

        artCurrentPage.value=1
        userCurrentPage.value=1
      // 获取搜索的文章数据
      getArticleData();

      // 获取搜索的用户数据
      getAuthorData();
    };

    getData();
    return {
      activeItem,
      handlerTime,
      toArticle,
      clickItem,
      articleData,
      articleTotal,
      artCurrentPage,
      userData,
      userTotal,
      userCurrentPage,
      size,
      getArticleData,
      getAuthorData,
      changeString,
      toAuthor,
    };
  },
};
</script>

<style scoped lang="less">
.serach ::v-deep {
  background-color: #ffffff;
  .serach-con {
    padding-top: 66px;
    width: 1066px;
    min-height: calc(100vh - 66px);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    .serach-header {
      height: 40px;
      span {
        position: relative;
        font-size: 14px;
        color: #070708;
        line-height: 40px;
        margin-right: 30px;
        cursor: pointer;
      }
      .activeItem::after {
        content: "";
        position: absolute;
        width: 20px;
        height: 2px;
        border-radius: 1px;
        background-color: red;
        left: 50%;
        bottom: 0px;
        transform: translate(-50%, 10px);
      }
    }
    .serch-body {
      flex: 1;
      //   background-color: pink;
      display: flex;
      padding-bottom: 50px;
      .serch-left {
        // background-color: yellow;
        width: 676px;
        .item {
          display: flex;
          padding: 16px 0px;
          cursor: pointer;
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

              &:hover {
                text-decoration: underline #070708;
              }
              &:hover > .textDeco {
                text-decoration: underline red;
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
        .el-pagination {
          margin-top: 50px;
        }
        .user {
          display: flex;
          padding: 20px 0px 0px 0px;
          cursor: pointer;
          .img-con {
            width: 64px;
            height: 64px;
            overflow: hidden;
            border-radius: 50%;
            margin-right: 10px;
            img {
              width: 64px;
              height: 64px;
              vertical-align: middle;
            }
          }
          .user-msg {
            display: flex;
            flex-direction: column;
            justify-content: center;
            //   background-color: pink;

            .user-username {
              font-size: 20px;
              color: #070708;

              &:hover {
                text-decoration: underline #070708;
              }
              &:hover > .textDeco {
                text-decoration: underline red;
              }
            }

            .fansCount {
              color: #80838a;
              font-size: 14px;
            }
          }
        }
      }
    }
  }

  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #ee4142;
    color: white !important;
  }

  .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #606266;
  }
}
</style>

