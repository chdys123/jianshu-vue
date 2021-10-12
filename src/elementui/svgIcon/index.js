// 按需引入图标
import { Edit } from '@element-plus/icons'


export default{
    install:(app)=>{
        // 标签调用
        const icons=[
            Edit
        ]
        icons.forEach((item)=>{
            app.component(item.name,item)
        })
    }
}