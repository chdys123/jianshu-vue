// 按需引入组件
import { ElMessage, ElDialog, ElButton ,ElSwitch,ElContainer,ElHeader,ElAside,ElMain,ElMenu,
ElSubMenu,ElMenuItem,ElCard,ElForm,ElFormItem,ElInput,ElUpload,ElCol,ElRadio,ElScrollbar,ElTable,ElTableColumn,ElPagination,ElPopconfirm,ElPopover,ElDatePicker,ElMessageBox,ElTooltip,ElDrawer,ElBacktop} from 'element-plus'
//引入elementui样式
import 'element-plus/dist/index.css'

export default {
    install: (app) => {
        // 标签调用
        const components = [
            ElDialog,
            ElButton,
            ElSwitch,
            ElContainer,ElHeader,ElAside,ElMain,
            ElMenu,ElSubMenu,ElMenuItem,
            ElCard,
            ElForm,ElFormItem,ElInput,
            ElUpload,ElCol,ElRadio,ElScrollbar,
            ElPopconfirm,
            ElTable,ElTableColumn,ElPagination,ElPopover,
            ElDatePicker,ElTooltip,ElDrawer,
            ElBacktop
        ]
        // 方法调用
        const plugins = [
            ElMessage,
            ElMessageBox
        ]
        components.forEach(component => {
            app.component(component.name, component)
        })
        plugins.forEach(plugin => {
            app.use(plugin)
        })
    }
}
