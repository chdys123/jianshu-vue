<template>
  <div class="m-a-con">
    <div class="m-a-c-header">
      <span
        class="mach-work"
        :class="{ machActive: isWork }"
        @click="isWork = true"
        >作品</span
      >
      <span class="mach-fg"></span>
      <span
        class="mach-cg"
        :class="{ machActive: !isWork }"
        @click="isWork = false"
        >草稿箱({{ Draft.data.length }})</span
      >
    </div>

    <div class="m-a-c-body">
      <div class="work-con" v-show="isWork">
        <div class="work-c-h">
          <span
            class="work-c-item"
            @click="getWork(0)"
            :class="{ itemActive: itemIndex == 0 }"
            >全部</span
          >
          <span
            class="work-c-item"
            @click="getWork(1)"
            :class="{ itemActive: itemIndex == 1 }"
            >已发布</span
          >
          <span
            class="work-c-item"
            @click="getWork(2)"
            :class="{ itemActive: itemIndex == 2 }"
            >审核中</span
          >
          <span
            class="work-c-item"
            @click="getWork(3)"
            :class="{ itemActive: itemIndex == 3 }"
            >未通过</span
          >
          <span
            class="work-c-item"
            @click="getWork(4)"
            :class="{ itemActive: itemIndex == 4 }"
            >仅我可见</span
          >
          <el-date-picker
            v-model="workDate"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="getWork(itemIndex)"
          >
          </el-date-picker>
          <div class="work-c-serch-c">
            <input
              type="text"
              v-model="keyWord"
              class="work-c-serch"
              placeholder="请输入关键字"
            />
            <i class="el-icon-search" @click="getWork(itemIndex)"></i>
          </div>
        </div>
        <div class="work-total">共{{ Article.data.length }}条内容</div>
        <div
          v-for="(item, index) in Article.data"
          :key="item._id"
          class="work-item"
        >
          <div class="work-img-con" v-if="item.coverType !== '无封面'">
            <img :src="item.coverImg[0]" alt="" class="work-img" />
          </div>
          <div class="work-item-msg">
            <div class="work-msg1">
              <div class="work-item-title">{{ item.title }}</div>
              <div class="work-item-time">
                {{ handlerTime(item.createTime) }}
              </div>
            </div>

            <div class="work-msg2">
              <span :class="{ 'work-msg21': item.statu == '未通过'||item.statu=='审核中' }">{{
                item.statu
              }}</span>
            </div>
            <div
              class="work-msg3"
              :class="{ 'work-msg31': item.statu == '未通过'||item.statu=='审核中' }"
            >
              <div class="work-data" v-if="item.statu !== '未通过'&&item.statu!=='审核中'">
                <span>阅读</span>
                <span>点赞</span>
                <span>评论</span>
              </div>

              <div class="work-manager">
                <span v-if="item.statu !== '未通过'&&item.statu!=='审核中'" class="work-manager-item"
                  >查看数据</span
                >
                <span v-if="item.statu !== '未通过'&&item.statu!=='审核中'" class="work-manager-item"
                  >查看评论</span
                >
                <span
                  @click="toCreate(null, item._id)"
                  class="work-manager-item"
                  >修改</span
                >
                <span
                  class="work-manager-item"
                  v-if="item.statu == '未通过'||item.statu=='审核中'"
                  @click="delArticle(item._id, index)"
                  >删除作品</span
                >
                <popover v-if="item.statu !== '未通过'&&item.statu!=='审核中'">
                  <template #content>
                    <div class="work-manager-more">
                      <div @click="setStatu(item._id,'仅我可见',index)" v-if="item.statu!=='仅我可见'">仅我可见</div>
                      <div @click="setStatu(item._id,'已发布',index)"  v-if="item.statu=='仅我可见'">设为公开</div>
                      <div @click="delArticle(item._id,index)">删除作品</div>
                    </div>
                  </template>
                  <template #reference>
                    <span class="work-manager-item">更多</span>
                  </template>
                </popover>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="draft-con" v-show="!isWork">
        <div class="draft-c-h">
          <div class="draft-c-total">共{{ Draft.data.length }}条内容</div>

          <el-date-picker
            v-model="draftDate"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            unlink-panels
            @change="getDraftByTime()"
          >
          </el-date-picker>
        </div>

        <div
          class="draft-item"
          v-for="(item, index) in Draft.data"
          :key="item._id"
        >
          <div class="draftImg-con">
            <img
              @click="toCreate(item._id, null)"
              :src="
                item.coverImg[0]
                  ? item.coverImg[0]
                  : 'https://sf3-cdn-tos.toutiaostatic.com/obj/mp/static/article_cover_empty.svg'
              "
              class="draft-img"
            />
          </div>
          <div class="draft-title">
            <span @click="toCreate(item._id, null)">
              {{ item.title ? item.title : "[无标题]" }}</span
            >
          </div>

          <div class="draft-msg">
            <div class="draft-time">{{ handlerTime(item.createTime) }}</div>
            <div class="draft-manage">
              <span @click="toCreate(item._id, null)">编辑</span>
              <span @click="delDraft(item._id, index)">删除</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import popover from "../../../components/popover.vue";

export default {
  components: {
    popover,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    let isWork = ref(true);

    let itemIndex = ref(0);

    let workDate = ref();
    let draftDate = ref();

    // 关键词
    let keyWord = ref();

    // 草稿列表
    let Draft = reactive({
      data: [],
    });

    // 文章列表
    let Article = reactive({
      data: [],
    });

    // 获取文章列表
    const getWork = (index) => {
      let t1, t2;
      if (workDate.value) {
        t1 = Date.parse(workDate.value[0]);
        t2 = Date.parse(workDate.value[1]);
        console.log(t1, t2);
      } else {
        t1 = 0;
        t2 = Date.now();
      }
      index = Number(index);
      itemIndex.value = index;
      let arr = [null, "已发布", "审核中", "未通过", "仅我可见"];
      proxy
        .http({
          method: "get",
          path: "/article/find",
          params: {
            authorId: JSON.parse(localStorage.user)._id,
            key: keyWord.value,
            statu: arr[index],
            t1,
            t2,
          },
        })
        .then((res) => {
          Article.data = res.res;
        });
    };

    // 获取草稿列表
    const getDraft = () => {
      proxy
        .http({
          method: "get",
          path: "/draft/find",
          params: {
            authorId: JSON.parse(localStorage.user)._id,
          },
        })
        .then((res) => {
          Draft.data = res.res;
        });
    };

    // 处理文章或者草稿创作时间的函数
    const handlerTime = (time) => {
      let date = new Date(Number(time));

      if (Date.now() - Number(time) < 60 * 1000) {
        return Math.floor((Date.now() - Number(time)) / 1000) + "秒前";
      } else if (Date.now() - Number(time) < 60 * 60 * 1000) {
        return Math.floor((Date.now() - Number(time)) / (1000 * 60)) + "分钟前";
      }
      // else if (Date.now() - Number(time) < 24 * 60 * 60 * 1000) {
      //   return (
      //     Math.floor((Date.now() - Number(time)) / (1000 * 60 * 60)) + "小时前"
      //   );
      // }

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

    // created
    getDraft();
    getWork(0);

    // 进入编辑页面
    const toCreate = (id1, id2) => {
      if (id1) {
        let routeUrl = proxy.$router.resolve({
          path: "/user/create",
          query: {
            draftId: id1,
          },
        });
        window.open(routeUrl.href, "_blank");
      }
      if (id2) {
        let routeUrl = proxy.$router.resolve({
          path: "/user/create",
          query: {
            articleId: id2,
          },
        });
        window.open(routeUrl.href, "_blank");
      }
    };

    // 删除草稿
    const delDraft = (id, index) => {
      proxy
        .http({
          method: "post",
          path: "/draft/del",
          params: {
            _id: id,
          },
        })
        .then((res) => {
          if (res.code == 200) {
            proxy.$message.success("删除草稿成功");
            Draft.data.splice(index, 1);
          } else if (res.code == 300) {
            proxy.$message.error("删除失败");
          } else {
            proxy.$message.error("服务器出现异常");
          }
        });
    };

    // 草稿时间查询
    const getDraftByTime = () => {
      if (draftDate.value) {
        let t1 = Date.parse(draftDate.value[0]);
        let t2 = Date.parse(draftDate.value[1]);
        proxy
          .http({
            method: "get",
            path: "/draft/find",
            params: {
              authorId: JSON.parse(localStorage.user)._id,
              t1,
              t2,
            },
          })
          .then((res) => {
            Draft.data = res.res;
          });
      }
    };

    // 删除文章
    const delArticle = (id, index) => {
      proxy.$messageBox
        .confirm("删除文章将不可恢复,确定删除吗", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then((res) => {
          proxy
            .http({
              method: "post",
              path: "/article/del",
              params: {
                id: id,
              },
            })
            .then((res) => {
              if (res.code == 200) {
                proxy.$message.success("删除文章成功");
                Article.data.splice(index, 1);
              } else {
                proxy.$message.error("删除文章失败");
              }
            });
        })
        .catch((err) => {
          proxy.$message.info("取消");
        });
    };
    // 设置文章仅我可见
    const setStatu=(id,value,index)=>{
      proxy.http({
        method:'post',
        path:'/article/setStatu',
        params:{
          id,
          statu:value
        }
      }).then(res=>{
        if(res.code==200){
          proxy.$message.success("设置成功")
          // Article.data[index].statu=value
          // 然后重新获取数据
          getWork(itemIndex.value)

        }else{
          proxy.$message.error("设置出现异常")
        }
      })
    }
    
    return {
      isWork,
      itemIndex,
      workDate,
      draftDate,
      keyWord,
      getDraft,
      getWork,
      Draft,
      Article,
      handlerTime,
      toCreate,
      delDraft,
      getDraftByTime,
      delArticle,
      setStatu
    };
  },
};
</script>

<style lang="less" scoped>
.m-a-con ::v-deep {
  box-sizing: border-box;
  //   background-color: pink;
  padding: 0px 32px 13px 32px;
  .m-a-c-header {
    position: fixed;
    width: calc(100vw - 200px - 114px);
    z-index: 9;
    background-color: #ffffff;
    font-size: 16px;
    color: #222222;
    display: flex;
    padding-top: 13px;
    height: 42px;
    .mach-work {
      height: 40px;
      line-height: 40px;
      margin-right: 32px;
      cursor: pointer;
    }
    .mach-fg {
      height: 18px;
      width: 0.1px;
      transform: translateY(12px);
      background-color: #d8d8d8;
    }
    .mach-cg {
      height: 40px;
      line-height: 40px;
      margin-left: 32px;
      cursor: pointer;
    }
    .machActive {
      border-bottom: 2px solid #ff373c;
    }
  }
  .m-a-c-body {
    padding: 55px 0px 100px 0px;
    // height: 1000px;
    // background-color: yellow;

    .el-input__inner {
      height: 100%;
      line-height: 100%;
    }
    .el-range-editor.el-input__inner {
      padding: 0 10px 0;
    }
    .el-date-editor {
      --el-date-editor-daterange-width: 240px;
    }
    .el-range-editor.is-active {
      border-color: #bfbfbf;
    }
    .el-date-editor .el-range-input {
      width: 90px;
    }

    .work-con {
      padding-top: 32px;
      .work-c-h {
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        color: #222222;
        display: flex;
        justify-content: space-between;
        .work-c-item {
          cursor: pointer;
        }
        .itemActive {
          color: #ff373c;
        }
        .work-c-serch-c {
          // background-color: pink;
          padding: 0px 10px 0px 10px;
          line-height: normal;
          box-sizing: border-box;
          height: 32px;
          border: 1px solid #dcdfe6;
          border-radius: 4px;
          .work-c-serch {
            outline: none;
            height: 30px;
            width: 100px;
            margin-right: 10px;
            border: 0;
            &::-webkit-input-placeholder {
              color: #c0c9db;
            }
            &::-moz-placeholder {
              /* Mozilla Firefox 19+ */
              color: #c0c9db;
            }
            &:-moz-placeholder {
              /* Mozilla Firefox 4 to 18 */
              color: #c0c9db;
            }
            &:-ms-input-placeholder {
              /* Internet Explorer 10-11 */
              color: #c0c9db;
            }
          }

          .el-icon-search {
            color: #bfbfbf;
            cursor: pointer;
          }
          .el-icon-search:hover {
            color: #666666;
          }
        }
      }
      .work-total {
        font-size: 14px;
        color: #000000;
        margin: 24px 0px 8px;
        // background-color: yellow;
      }
      .work-item {
        min-height: 106px;
        padding: 24px 0px;
        // background-color: pink;
        border-bottom: 1px solid #e8e8e8;
        display: flex;
        align-items: center;
        .work-img-con {
          height: 106px;
          width: 166px;
          margin-right: 24px;
          overflow: hidden;
          .work-img {
            width: 166px;
            vertical-align: middle;
            cursor: pointer;
            transition: all 0.5s;
            &:hover {
              transform: scale(1.2);
            }
          }
        }
        .work-item-msg {
          flex: 1;
          min-height: 106px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .work-msg1 {
            display: flex;
            justify-content: space-between;
            .work-item-title {
              font-size: 16px;
              color: #222222;
              cursor: pointer;
            }
            .work-item-time {
              font-size: 14px;
              color: #999999;
            }
          }
          .work-msg2 {
            font-size: 12px;
            span {
              display: inline-block;
              padding: 0px 8px;
              margin: 0px 8px;
              color: #999999;
              background-color: #f5f5f5;
            }
            .work-msg21 {
              background-color: #fff2f2;
              color: #ff5e5e;
            }
          }
          .work-msg3 {
            display: flex;
            justify-content: space-between;
            .work-data {
              color: #666666;
              font-size: 14px;
              display: flex;
              align-items: center;
              span {
                margin-right: 24px;
              }
            }
            .work-manager {
              display: flex;
              font-size: 14px;
              color: #222222;
              align-items: center;
              cursor: pointer;
              .work-manager-item {
                margin-left: 24px;
              }
              .work-manager-more {
                font-size: 14px;
                // background-color: pink;
                div{
                  padding: 10px 20px;
                  &:hover{
                    background-color: #F5F5F5;
                  }
                }
              }
            }
          }
          .work-msg31 {
            justify-content: flex-end;
          }
        }
      }
    }

    .draft-con {
      padding-top: 32px;
      // background-color: red;
      .draft-c-h {
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        color: #222222;
        display: flex;
        justify-content: space-between;
        .draft-c-total {
          font-size: 14px;
          color: #222222;
        }
      }

      .draft-item {
        min-height: 112px;
        // background-color: pink;
        border-bottom: 1px solid #e8e8e8;
        padding: 24px 0;
        display: flex;
        align-items: center;
        .draftImg-con {
          width: 166px;
          height: 106px;
          overflow: hidden;
          .draft-img {
            width: 166px;
            vertical-align: middle;
            cursor: pointer;
            transition: all 0.5s;
            &:hover {
              transform: scale(1.2);
            }
          }
        }
        .draft-title {
          height: 106px;
          flex: 1;
          margin-left: 24px;
          font-size: 16px;
          color: #222222;
          font-weight: 700;
          word-break: break-all;
          word-wrap: break-word;
          cursor: pointer;

          span {
            &:hover {
              color: #666666;
            }
          }
        }
        .draft-msg {
          display: flex;
          // align-items: center;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          height: 106px;
          width: 176px;
          .draft-time {
            font-size: 14px;
            color: #999999;
          }
          .draft-manage {
            font-size: 14px;
            color: #222222;
            span {
              margin-left: 24px;
              cursor: pointer;
              &:hover {
                color: #666666;
              }
            }
          }
        }
      }
    }
  }
}
</style>