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
    <el-scrollbar>

        <div class="work-con" v-show="isWork">
          <div class="work-c-h">
            <span
              class="work-c-item"
              @click="itemIndex = 0"
              :class="{ itemActive: itemIndex == 0 }"
              >全部</span
            >
            <span
              class="work-c-item"
              @click="itemIndex = 1"
              :class="{ itemActive: itemIndex == 1 }"
              >已发布</span
            >
            <span
              class="work-c-item"
              @click="itemIndex = 2"
              :class="{ itemActive: itemIndex == 2 }"
              >审核中</span
            >
            <span
              class="work-c-item"
              @click="itemIndex = 3"
              :class="{ itemActive: itemIndex == 3 }"
              >未通过</span
            >
            <span
              class="work-c-item"
              @click="itemIndex = 4"
              :class="{ itemActive: itemIndex == 4 }"
              >仅我可见</span
            >
            <el-date-picker
              v-model="date"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
            <div class="work-c-serch-c">
              <input
                type="text"
                class="work-c-serch"
                placeholder="请输入关键字"
              />
              <i class="el-icon-search"></i>
            </div>
          </div>
        </div>
        <div class="draft-con" v-show="!isWork">草稿</div>
    </el-scrollbar>

    </div>
  </div>
</template>

<script>
import { ref, reactive, getCurrentInstance } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    let isWork = ref(true);

    let itemIndex = ref(0);

    let date = ref();

    let serchData = ref();

    let Draft = reactive({
      data: [],
    });

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

    // created
    getDraft();

    return {
      isWork,
      itemIndex,
      date,
      serchData,
      getDraft,
      Draft,
    };
  },
};
</script>

<style lang="less" scoped>
.m-a-con {
  box-sizing: border-box;
  height: calc(100vh - 106px);
  // height: 1000px;
  //   background-color: pink;
  padding: 13px 32px;
  .m-a-c-header {
    // background-color: pink;
    // background-color: #ffffff;
    font-size: 16px;
    //   background-color: pink;
    color: #222222;
    display: flex;
    height: 42px;
    // align-items: center;

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
    height: calc(100% - 42px);
    // padding: 0px 30px 0px 0px;
    // background-color: yellow;

    .work-con {
      padding-top: 32px;
      background-color: pink;
    //   height: 1000px;
      .work-c-h ::v-deep {
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
    }
  }
}
</style>