import axios from "axios"



// axios实例
let instance = axios.create({
    // baseURL: "http://localhost:3000",
    baseURL: "http://139.155.71.189:3000",
    timeout: 5000,
})

// 请求拦截器

instance.interceptors.request.use(config => {
    // console.log("请求拦截器")
    return config
}, err => {
    return Promise.reject(error)
})

// 响应拦截器

instance.interceptors.response.use(res => {
    // console.log("响应拦截器")
    return res
}, err => {
    return Promise.reject(error)
})

// 封装http请求方法
// 参数options 包含三个属性 method  path  params
async function http(options = {}) {

    instance.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");
    let result = null
    if (options.method == "get" || options.method == "delete") {
        await instance({
            method: options.method,
            url: options.path,
            params: options.params
        }).then(res => {
            result = res.data
        }).catch(err => {
            result = err
        })
    } else if (options.method == "post" || options.method == "put") {
        await instance({
            method: options.method,
            url: options.path,
            data: options.params
        }).then(res => {
            result = res.data

        }).catch(err => {
            result = err
        })
    }
    return result
}

export default http