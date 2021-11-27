<template>

  <div class="web-con">
    <webHeader></webHeader>
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
            <div
              class="article-item"
              :key="item.id"
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
          </DynamicScrollerItem>
        </template>
      </DynamicScroller>

      <div class="web-content-fixed">
        <div class="wcf-h-con">
          <i class="iconfont icon-remen"></i>
          <span class="wcf-h"> 头条热榜 </span>
        </div>
        <div
          v-for="(item, index) in hotArticle"
          :key="item._id"
          class="hotArticle-item"
        >
          <span
            @click="toArticle(item._id)"
            class="item-index"
            :class="{
              index1: index == 0,
              index2: index == 1,
              index3: index == 2,
            }"
            >{{ index + 1 }}</span
          >
          <span class="item-title" @click="toArticle(item._id)">
            {{ item.title }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
  
  
<script>
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
import webHeader from "../../components/webHeader.vue"
import handlerTimefn from "../../hooks/handerTime.js"

export default {
  components: {
    webHeader
  },
  setup() {
    let { proxy } = getCurrentInstance();
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
  
    const {handlerTime1:handlerTime}=handlerTimefn()

    // 触底加载
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
    document.title="简书"
  },
  mounted() {},
};
</script>
  
<style scoped lang="less">
.web-con {
  background-color: #ffffff;
  min-width: 1000px;
  padding-top: 66px;
  .test-content {
    position: relative;
    height: 1000px;
    width: 1066px;
    margin: 66px auto 0px;
    display: flex;
    justify-content: space-between;
    .left-con {
      width: 676px;
    }
  }

  .web-content {
    position: relative;
    width: 1066px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .scroller {
      width: 676px;
      .article-item {
        display: flex;
        padding: 16px 0px;
        .item-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .title {
            font-size: 20px;
            color: #222222;
            font-weight: 500;
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
      .hotArticle-item {
        padding: 12px 0px 12px 4px;
        font-size: 16px;
        display: flex;
        align-items: center;
        .item-index {
          font-size: 20px;
          margin-right: 8px;
          color: #999999;
        }
        .index1 {
          color: #a82e2e;
        }
        .index2 {
          color: #f04142;
        }
        .index3 {
          color: #ff9a03;
        }
        .item-title {
          cursor: pointer;
          &:hover {
            color: #f25758;
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
  