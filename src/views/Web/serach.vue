<template>
    <div class="serach-con">
        <div>
            <span>文章</span>
            <span>用户</span>
        </div>

    </div>
</template>

<script>

import {ref,reactive} from "vue"
import {useRoute,useRouter} from "vue-router"
import webHeader from "../../components/webHeader.vue"
export default {
    
    setup() {
        document.title="搜索"
        
    },
}
</script>

<style scoped lang="less">
    .serach-con{
        padding-top: 66px;
        width: 1066px;
        height: 100px;
        background-color: pink;
        margin: 0 auto;
    }

</style>

