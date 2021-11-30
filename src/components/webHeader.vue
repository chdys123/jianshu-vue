<template>
  <div class="web-header">
    <div class="web-header-con">
      <div class="whcl">
        <h1>简书</h1>
      
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
      <div class="whcr">
        <div class="web-con-serch">
          <input type="text" />
          <i class="el-icon-search"></i>
        </div>
        <button class="logonBtn" v-if="!isLogin" @click="$router.push('/login')">登录</button>
        <div v-if="isLogin" class="avatar-con">
          <popover>
            <template #content1>
              <img :src="user.avatar" class="avatar" />
            </template>
            <template #content2>
              <div class="popover-content">
                <div @click="$router.push('/authod?id='+user._id)">个人主页</div>
                <div @click="$router.push('/user/menu/mainPage')">创作平台</div>
                <div >我的收藏</div>
                <div >退出登录</div>
              </div>
            </template>
          </popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive,getCurrentInstance ,watch} from "vue";
import popover from "./popover2.vue";
import { useRoute, useRouter } from 'vue-router'


export default {
  components: {
    popover,
  },
  setup() {
    let { proxy } = getCurrentInstance();
    let route=useRoute()
    let router=useRouter()
    let activeItem = ref(route.path!='/'?8:route.query.type);
    console.log("activeItem:",activeItem.value)

    if(route.fullPath==""||route.fullPath=="/"){
      activeItem.value=0
    }
  
    const getData = (index) => {
      activeItem.value = Number(index);
      proxy.$router.push("/?type="+index)
    };
    let isLogin = localStorage.user ? true : false;
    let user = !isLogin ? null : JSON.parse(localStorage.user);



    
    // watch(()=>route.fullPath,(newData,oldData)=>{
    //   console.log("变了")
    //   console.log(newData)
      
    //   if(route.path!="/"){
    //     activeItem.value=''
    //   }
    // })
  
    return {
        activeItem,
        getData,
        isLogin,
        user
    }
    
    
  },
  created(){
    // if(this.$route.path=='/'){
    //   this.activeItem=this.$route.query.type
    //   console.log("等于/",this.activeItem)
    // }else{
    //   this.activeItem=""
    //   console.log("不等于",this.activeItem)
    // }
  }
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
      width: 100%;
    }
  }

  @media screen and (min-width: 1335px) {
    .web-header-con {
      width: 1334px;
    }
  }
}
</style>