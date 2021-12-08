<template>
  <div class="fans-con">
    <div class="fans-con-header">
      <span
        class="mach-work"
        :class="{ machActive: headerActiveItem == 1 }"
        @click="headerActiveItem = 1"
        >概况</span
      >
      <span class="mach-fg"></span>
      <span
        class="mach-cg"
        :class="{ machActive: headerActiveItem == 2 }"
        @click="headerActiveItem = 2"
        >粉丝列表</span
      >
    </div>

    <!-- 内容主体 -->
    <div class="fans-con-body">
      <!-- 概况 -->
      <div v-show="headerActiveItem == 1">
        <!-- 核心数据 -->
        <div class="hx-title">核心数据</div>
        <div class="hx-Data-con">
          <div class="hx-data-item">
            <div class="hx-data-item-title">今日粉丝变化数</div>
            <div class="hx-data-item-number">{{ fansChangeData }}</div>
          </div>
          <div class="hx-data-item">
            <div class="hx-data-item-title">粉丝总数</div>
            <div class="hx-data-item-number">{{ fansCount }}</div>
          </div>
        </div>
        <!-- 核心数据ennd -->

        <!-- 数据趋势 -->
        <div class="qs-title">数据趋势</div>
        <div class="qs-header-con">
          <span class="qs-time-title">时间</span>
          <span
            class="qs-time-item"
            :class="{ fansQsActiveItem: fansQsActive == 1 }"
            @click="clickItem(1)"
            >最近7天</span
          >
          <span
            class="qs-time-item"
            :class="{ fansQsActiveItem: fansQsActive == 2 }"
            @click="clickItem(2)"
            >最近30天</span
          >
          <el-date-picker
            v-model="fansQsTime"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="getFansQs()"
            class="picker"
            :disabledDate="isDisable"
          >
          </el-date-picker>
        </div>

        <!-- 折线图 -->
        <div id="FansQs"></div>
        <!-- 折线图end -->

        <!-- 数据趋势end -->
      </div>
      <!-- 概况end -->
      <!-- 粉丝列表 -->
      <div v-show="headerActiveItem == 2" class="fans-list">
        <div class="fans-list-title">
          共 <span>{{ fansList.length }}</span
          >个粉丝
        </div>

        <div class="fansList-con">
          <div
            v-for="(item, index) in fansList"
            :key="item.id"
            class="fans-item"
            
          >
            <div class="img-con" @click="$router.push('/authod?id=' + item.id)">
              <img :src="item.avatar" alt="" />
            </div>
            <span class="fans-username" @click="$router.push('/authod?id=' + item.id)">{{ item.username }}</span>
            <button
              v-if="!item.isCare"
              class="noCare"
              @click="careAndNoCare(index, item.id, 1)"
            >
              关注
            </button>
            <button
              v-if="item.isCare"
              class="hasCare"
              @click="careAndNoCare(index, item.id, 2)"
            >
              已关注
            </button>
          </div>
        </div>
      </div>
      <!-- 粉丝列表end -->
    </div>
  </div>
</template>

<script>
import { inject, onMounted, ref, reactive, getCurrentInstance } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    let { proxy } = getCurrentInstance();
    let store = useStore();
    let echarts = inject("ec");
    // 显示概况还是粉丝列表
    let headerActiveItem = ref(1);
    // 核心数据中的粉丝变化数
    let fansChangeData = ref(0);
    // 核心数据中的粉丝总数
    let fansCount = ref(0);
    // 获取核心数据
    const getHxData = () => {
      // console.log(store.state.user._id)
      proxy
        .http({
          method: "get",
          path: "/user/getFansData",
          params: {
            userId: store.state.user._id,
          },
        })
        .then((res) => {
          if (res.code == 200) {
            fansChangeData.value = res.data.data1;
            fansCount.value = res.data.data2;
          }
        });
    };

    // 粉丝趋势数据
    let option = reactive({
      title: {
        text: "粉丝趋势折线图",
      },
      color: ["#3D89FF", "#00C7C6"],
      tooltip: {
        trigger: "axis",
      },
      grid: {
        left: "50px",
        right: "50px",
      },
      legend: {
        data: ["粉丝总数", "粉丝变化数"],
      },
      xAxis: {
        boundaryGap: false,
        data: [],
      },
      yAxis: {},
      series: [
        {
          name: "粉丝变化数",
          type: "line",
          data: [],
        },
        {
          name: "粉丝总数",
          type: "line",
          data: [],
        },
      ],
    });
    // 粉丝趋势时间
    let fansQsTime = ref();
    // 获取粉丝趋势数据
    const getFansQs = () => {
      if (!fansQsTime.value) {
        console.log("时间清空");
        return;
      }
      fansQsActive.value = 0;
      proxy
        .http({
          method: "get",
          path: "/user/getFansData",
          params: {
            userId: store.state.user._id,
            t1: Date.parse(fansQsTime.value[0]),
            t2: Date.parse(fansQsTime.value[1]),
          },
        })
        .then((res) => {
          console.log(res.data)
          if (res.code == 200) {
            //   修改配置项 然后重新渲染
            option.xAxis.data = getYearAndMonthAndDay(
              fansQsTime.value[0],
              fansQsTime.value[1]
            );

            option.series[0].data.length = 0;
            option.series[1].data.length = 0;
            res.data.forEach((item) => {
              option.series[0].data.push(item.b);
              option.series[1].data.push(item.a);
            });
            let myChart = echarts.init(document.getElementById("FansQs"));
            myChart.setOption(option);
          }
        });
    };
    // 粉丝趋势活跃item
    let fansQsActive = ref(0);
    // 点击fansQsItem执行的方法
    const clickItem = async (num) => {
      if (num == fansQsActive.value) {
        return;
      }
      // 需要修改时间选择器的 值
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      let time = new Date(year, month, day,0,0,0,0);
      let result = [null, time];
      if (num == 1) {
        result[0] = new Date(Date.parse(time) - 6 * 1000 * 60 * 60 * 24);
      } else if (num == 2) {
        result[0] = new Date(Date.parse(time) - 29 * 1000 * 60 * 60 * 24);
      }

      fansQsTime.value = result;

      await getFansQs();

      fansQsActive.value = num;
    };

    // 判断日期是否禁用的方法
    const isDisable = (data) => {
      return Date.parse(new Date()) < Date.parse(data);
    };

    // 获取一段时间内的年月日 传入时间对象
    const getYearAndMonthAndDay = (t1, t2) => {
      // 先获取单个时间的年月日
      const getData = (t) => {
        let year = t.getFullYear();
        let month = t.getMonth();
        let day = t.getDate();
        return `${year}-${month + 1}-${day}`;
      };
      let result = [];
      let time1 = Date.parse(t1);
      let time2 = Date.parse(t2);
      while (time1 <= time2) {
        result.push(getData(t1));
        time1 = time1 + 1000 * 60 * 60 * 24;
        t1 = new Date(time1);
      }
      return result;
    };

    // 粉丝列表的数据
    let fansList = reactive([]);
    // 获取粉丝总数 与粉丝列表 分页获取
    const getFansList = () => {
      proxy
        .http({
          method: "get",
          path: "/user/getFans",
          params: {
            userId: store.state.user._id,
            authorId: store.state.user._id,
          },
        })
        .then((res) => {
          if (res.code == 200) {
            fansList.push(...res.data);
          }
        });
    };
    // 点击关注或者取关
    const careAndNoCare = (index, id, cate) => {
      proxy
        .http({
          method: "get",
          path: "/user/care",
          params: {
            userId: store.state.user._id,
            authorId: id,
            cate,
          },
        })
        .then((res) => {
          if (res.code == 200) {
            fansList[index].isCare = !fansList[index].isCare;
          } else {
            proxy.$message.error("服务器异常 稍后再试");
          }
        });
    };

    getFansList();
    getHxData();
    clickItem(1);
    onMounted(() => {
      let myChart = echarts.init(document.getElementById("FansQs"));
      myChart.setOption(option);
    });

    return {
      headerActiveItem,
      fansQsTime,
      getFansQs,
      fansQsActive,
      clickItem,
      fansChangeData,
      fansCount,
      getHxData,
      option,
      isDisable,
      getYearAndMonthAndDay,
      getFansList,
      fansList,
      careAndNoCare,
    };
  },
};
</script>

<style lang="less" scoped>
.fans-con ::v-deep {
  box-sizing: border-box;
  // background-color: yellow;
  padding: 0px 32px 13px 32px;
  .fans-con-header {
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
  .fans-con-body {
    height: 1000px;
    padding: 55px 0px 100px 0px;
    .hx-title {
      padding: 32px 0px 22px;
      color: #222222;
      font-size: 16px;
      font-weight: 500;
    }
    .hx-Data-con {
      //   background-color: pink;
      display: flex;
      justify-content: space-around;
      .hx-data-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        .hx-data-item-title {
          font-size: 14px;
          color: #666666;
        }
        .hx-data-item-number {
          margin-top: 10px;
          font-size: 36px;
          color: #222222;
          font-weight: 500;
        }
      }
    }
    .qs-title {
      margin-top: 20px;
      margin-bottom: 10px;
    }
    .qs-header-con {
      //   background-color: pink;
      display: flex;
      align-items: center;

      .qs-time-title {
        font-size: 14px;
        color: #666666;
        margin-right: 20px;
      }
      .qs-time-item {
        margin-right: 20px;
        font-size: 14px;
        color: #222222;
        cursor: pointer;
      }
      .fansQsActiveItem {
        color: red;
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
    }
    #FansQs {
      margin-top: 20px;
      //   background-color: pink;
      width: 100%;
      height: 400px;
    }

    .fans-list {
      // background-color: pink;
      .fans-list-title {
        padding-top: 32px;
        font-size: 14px;
        color: #000000;
        & > span {
          margin: 0px 5px;
        }
      }
      .fansList-con {
        // background-color: pink;
        display: flex;
        margin-top: 10px;
        justify-content: flex-start;
        flex-wrap: wrap;
        justify-content: space-between;

        .fans-item {
          width: 238px;
          height: 238px;
          margin-right: 20px;
          margin-bottom: 20px;
          border: 1px solid #e8e8e8;
          border-radius: 5px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: all 0.5s;
          &:hover {
            box-shadow: 0 2px 25px rgb(0 0 0 / 15%);
          }

          .img-con {
            margin-top: 20px;
            margin-bottom: 20px;
            height: 80px;
            width: 80px;
            overflow: hidden;
            border-radius: 50%;
            img {
              height: 80px;
              width: 80px;
            }
          }
          .fans-username {
            font-size: 16px;
            color: #505050;
            margin-bottom: 20px;
            line-height: 32px;
          }
          button {
            cursor: pointer;
            height: 32px;
            font-size: 14px;
            color: #222222;
            padding: 0px 16px;
            background-color: #ffffff;
            border-radius: 5px;
            outline: none;
            border: 1px solid #999999;
            // &:hover{
            //   background-color: #FFF2F2;
            // }
          }
          .noCare {
            border: 1px solid red;
            background-color: red;
            color: white;
            &:hover {
              background-color: #f04142;
            }
          }
        }
      }
    }
  }
}
</style>