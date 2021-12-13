<template>
  <div class="web-header">
    <div class="web-header-con">
      <div class="whcl">
        <h1>简书</h1>

        <div class="web-items">
          <span
            class="web-item"
            :class="{ 'web-item-active': activeItem == 0 }"
            @click="getData(0)"
            >技术博客</span
          >
          <span
            class="web-item"
            :class="{ 'web-item-active': activeItem == 1 }"
            @click="getData(1)"
            >科技</span
          >
          <span
            class="web-item"
            :class="{ 'web-item-active': activeItem == 2 }"
            @click="getData(2)"
            >娱乐</span
          >
          <span
            class="web-item"
            :class="{ 'web-item-active': activeItem == 3 }"
            @click="getData(3)"
            >体育</span
          >
          <span
            class="web-item"
            :class="{ 'web-item-active': activeItem == 4 }"
            @click="getData(4)"
            >游戏</span
          >
          <span
            class="web-item"
            :class="{ 'web-item-active': activeItem == 5 }"
            @click="getData(5)"
            >历史</span
          >
          <span
            class="web-item"
            :class="{ 'web-item-active': activeItem == 6 }"
            @click="getData(6)"
            >美食</span
          >
          <span
            class="web-item"
            :class="{ 'web-item-active': activeItem == 7 }"
            @click="getData(7)"
            >社会</span
          >
        </div>
      </div>
      <div class="whcr">
        <div class="web-con-serch">
          <popover>
            <template #content1>
              <div class="wcs-con">
                <input
                  type="text"
                  v-model="serachKey"
                  placeholder="搜索文章或者作者"
                  @input="getSerachData"
                  @keydown="handerKeyDown($event)"
                />
                <i class="el-icon-search" @click="toSerach" ></i>
              </div>
            </template>
            <template #content2>
              <div class="serach-con-popover" v-if="serachKey != ''">
                <div class="scp-item">
                  <span class="scp-label">文章</span>
                  <div class="scp-body scp-body1">
                    <div
                      v-for="item in serachData.article"
                      :key="item._id"
                      class="scp-art"
                      @click="$router.push('/article?id=' + item._id)" v-html="item.title"
                    >
                    </div>
                    <div v-show="serachData.article.length == 0" class="scp-no">
                      未搜索到相关文章
                    </div>
                  </div>
                </div>
                <div class="scp-item">
                  <span class="scp-label">作者</span>
                  <div class="scp-body">
                    <div
                      v-for="item in serachData.authod"
                      :key="item._id"
                      class="scp-auth"
                      @click="$router.push('/authod?id=' + item._id)"
                    >
                      <div class="scp-auth-imgcon">
                        <img :src="item.avatar" alt="" />
                      </div>
                      <span class="scp-name" v-html="item.username"></span>
                    </div>
                    <div v-show="serachData.authod.length == 0" class="scp-no">
                      未搜索到相关作者
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </popover>
        </div>

        <button
          class="logonBtn"
          v-if="!isLogin"
          @click="$router.push('/login')"
        >
          登录
        </button>
        <div v-if="isLogin" class="avatar-con">
          <popover>
            <template #content1>
              <img :src="user.avatar" class="avatar" />
            </template>
            <template #content2>
              <div class="popover-content">
                <div @click="$router.push('/authod?id=' + user._id)">
                  个人主页
                </div>
                <div @click="$router.push('/user/menu/mainPage')">创作平台</div>
                <div>我的收藏</div>
                <div @click="signOut">退出登录</div>
              </div>
            </template>
          </popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, getCurrentInstance, watch, handleError } from "vue";
import popover from "./popover2.vue";
import { useRoute, useRouter } from "vue-router";

export default {
  components: {
    popover,
  },
  setup() {
    let { proxy } = getCurrentInstance();
    let route = useRoute();
    let router = useRouter();
    let activeItem = ref(route.path != "/" ? 8 : route.query.type);

    if (route.fullPath == "" || route.fullPath == "/") {
      activeItem.value = 0;
    }

    const getData = (index) => {
      activeItem.value = Number(index);
      proxy.$router.push("/?type=" + index);
    };
    let isLogin = localStorage.user ? true : false;
    let user = !isLogin ? null : JSON.parse(localStorage.user);

    // 搜索框的内容
    let serachKey = ref("");
    let timer = null;
    // 搜索的内容
    let serachData = reactive({
      article: [],
      authod: [],
    });

    // 监听搜索框数据改变
    const getSerachData = () => {
      if (timer) {
        clearTimeout(timer);
      }
      if (!serachKey.value.trim()) {
        serachData.article = [];
        serachData.authod = [];
        return;
      }
      timer = setTimeout(() => {
        proxy
          .http({
            method: "get",
            path: "/serach/artAndAuth",
            params: {
              key: serachKey.value,
            },
          })
          .then((res) => {
            res.article.forEach((item, index, arr) => {
              arr[index].title=changeString(item.title,serachKey.value)
            });
            res.authod.forEach((item, index, arr) => {
              arr[index].username=changeString(item.username,serachKey.value)
            });
            serachData.article = res.article;

            serachData.authod = res.authod;
          });
      }, 1000);
    };

    // 显示红字
    const changeString = (str, key) => {
      let result = str.replace(/&lt;/g, "<");
      result = result.replace(/&gt;/g, ">");
      let reg = new RegExp("(" + key + ")", "g");
      result = result.replace(reg, ($0, $1) => {
        return "<span style='color:red;' class='textDeco'>" + $1 + "</span>";
      });

      return result;
    };

    // 搜索框监听 按下enter
    const handerKeyDown=(e)=>{
      if(e.code=="Enter"&&serachKey.value.trim()){
        toSerach()
      }

    }

    // 进入搜索页面
    const toSerach = () => {
      if (serachKey.value.trim()) {
        router.push("/serach?key=" + serachKey.value);
      }
    };

    // 点击退出登录
    const signOut=()=>{
      console.log("点击了退出登录")
      // 清除本地的token和user
      localStorage.clear()
      // 然后到登录页面
      router.push("/login")
    }

    return {
      activeItem,
      getData,
      isLogin,
      user,
      serachKey,
      getSerachData,
      serachData,
      toSerach,
      changeString,
      handerKeyDown,
      signOut
    };
  },
  created() {},
};
</script>

<style lang="less" scoped>
.web-header {
  height: 66px;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background-color: #ffffff;
  z-index: 9;
  min-width: 1106px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .web-header-con {
    height: 66px;
    box-sizing: border-box;
    vertical-align: middle;
    display: flex;
    align-items: center;
    // justify-content: space-between;
    margin: 0 auto;
    width: 1334px;

    // background-color: skyblue;
    .whcl {
      display: flex;
      justify-content: space-between;
      align-items: center;
      // width: 676px;

      // background-color: pink;
      margin-right: 70px;
      h1 {
        color: #ee4142;
        width: 134px;
        // background-color: yellow;
        text-align: center;
      }
      .web-items {
        // background-color: pink;
        width: 676px;
        display: flex;
        justify-content: space-between;
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
    }
    .whcr {
      display: flex;
      align-items: center;
      flex: 1;
      // background-color: red;

      .web-con-serch {
        background-color: #f5f5f5;
        // background: pink;
        height: 40px;
        padding: 0px 18px;
        flex: 1;
        border-radius: 5px;
        vertical-align: middle;
        margin-right: 30px;
        .wcs-con {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          // background:yellow;
          input {
            flex: 1;
            height: 40px;
            border: none;
            background-color: #f5f5f5;
            // background-color: pink;
            outline: none;
            margin-right: 18px;
            font-size: 18px;
          }
          .el-icon-search {
            // background-color: blue;
            color: #ee4142;
            font-size: 20px;
            font-weight: 700;
            cursor: pointer;
          }
        }
      }
      .serach-con-popover {
        width: 300px;
        box-sizing: border-box;
        padding: 10px;
        font-size: 14px;
        // background-color: pink;
        .scp-item {
          display: flex;
          .scp-label {
            padding: 8px 0px;
          }
          .scp-body {
            flex: 1;

            margin-left: 20px;
            border-left: 1px solid #e2e2e2;

            .scp-art,
            .scp-auth {
              padding: 8px 0px 8px 8px;
              cursor: pointer;
              &:hover {
                background-color: #e3e5e7;
              }
            }
            .scp-auth {
              display: flex;
              align-items: center;
              .scp-auth-imgcon {
                width: 40px;
                height: 40px;
                overflow: hidden;
                border-radius: 50%;
                img {
                  width: 40px;
                  height: 40px;
                  vertical-align: middle;
                }
              }
              .scp-name {
                margin-left: 5px;
              }
            }
            .scp-no {
              padding: 8px 0px 8px 8px;
            }
          }
          .scp-body1 {
            border-bottom: 1px solid #e2e2e2;
          }
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
        height: 40px;
        width: 40px;
        .avatar {
          height: 40px;
          width: 40px;
          border-radius: 50%;
          vertical-align: middle;
        }
        .popover-content {
          width: 100px;
          text-align: center;
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
      width: 1066px;
      .whcl {
        width: 676px;
        h1 {
          width: 80px;
          // margin-right: 10px;
          transform: translateX(-40px);
        }
        .web-items {
          display: 1;
        }
      }
      .whcr {
        .web-con-serch {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>