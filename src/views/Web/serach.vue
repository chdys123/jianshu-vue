<template>
    <web-header></web-header>
    <div class="serach-con">
        123456

    </div>
</template>

<script>

import {ref,reactive} from "vue"
import {useRoute,useRouter} from "vue-router"
import webHeader from "../../components/webHeader.vue"
export default {
    components:{
        webHeader
    },
    setup() {
        
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

