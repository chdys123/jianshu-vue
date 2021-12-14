import{p as e,r as t,c as a,e as o,o as n,a as r,b as s,E as c,d as i,f as m,g as p,h as d,i as l,j as u,k as _,l as h,m as f,n as E,q as g,s as L,t as P,u as A,v as j,w as I,x as O,y as T,z as b,A as y,B as D,C as R,D as V,F as v,G as x,H as w,I as k,J as q,K as N,L as S,M as C,N as $,O as z,P as B}from"./vendor.c07be6c4.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const a of e)if("childList"===a.type)for(const e of a.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();var F=(e,t)=>{for(const[a,o]of t)e[a]=o;return e};var K=F({name:"app",setup(){e("ec",o)},mounted(){console.log("启动了")}},[["render",function(e,o,r,s,c,i){const m=t("router-view");return n(),a(m)}]]);const M={},U=function(e,t){return t&&0!==t.length?Promise.all(t.map((e=>{if((e=`/${e}`)in M)return;M[e]=!0;const t=e.endsWith(".css"),a=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${a}`))return;const o=document.createElement("link");return o.rel=t?"stylesheet":"modulepreload",t||(o.as="script",o.crossOrigin=""),o.href=e,document.head.appendChild(o),t?new Promise(((e,t)=>{o.addEventListener("load",e),o.addEventListener("error",t)})):void 0}))).then((()=>e())):e()},G=[{path:"",name:"index",component:()=>U((()=>import("./index.ea08a68f.js")),["assets/index.ea08a68f.js","assets/index.fb66f5d2.css","assets/vendor.c07be6c4.js","assets/handerTime.89250da6.js","assets/handerTime.e2d53d74.css"]),meta:{title:"简书"}},{path:"/article",name:"article",component:()=>U((()=>import("./article.16e3600b.js")),["assets/article.16e3600b.js","assets/article.c2ffa36e.css","assets/vendor.c07be6c4.js","assets/handerTime.89250da6.js","assets/handerTime.e2d53d74.css"]),meta:{title:"文章详情"}},{path:"/authod",name:"authod",component:()=>U((()=>import("./authod.cb0ca74d.js")),["assets/authod.cb0ca74d.js","assets/authod.e8fce16d.css","assets/vendor.c07be6c4.js","assets/handerTime.89250da6.js","assets/handerTime.e2d53d74.css"]),meta:{title:"作者主页"}},{path:"/serach",name:"serach",component:()=>U((()=>import("./serach.da780557.js")),["assets/serach.da780557.js","assets/serach.d2fd325b.css","assets/vendor.c07be6c4.js","assets/handerTime.89250da6.js","assets/handerTime.e2d53d74.css"])},{path:"/user",name:"user",component:()=>U((()=>import("./index1.51f3befc.js")),["assets/index1.51f3befc.js","assets/index1.f1d35f85.css","assets/vendor.c07be6c4.js"]),children:[{path:"menu",name:"menu",component:()=>U((()=>import("./menu.69d92554.js")),["assets/menu.69d92554.js","assets/menu.bee3d461.css","assets/vendor.c07be6c4.js"]),children:[{path:"mainPage",name:"mainPage",component:()=>U((()=>import("./index.5c1c7310.js")),["assets/index.5c1c7310.js","assets/vendor.c07be6c4.js"])},{path:"manger/article",name:"mangerArticle",component:()=>U((()=>import("./article.4b5da9bb.js")),["assets/article.4b5da9bb.js","assets/article.b389532c.css","assets/vendor.c07be6c4.js"])},{path:"manger/comment",name:"mangerComment",component:()=>U((()=>import("./comment.c9f2354e.js")),["assets/comment.c9f2354e.js","assets/vendor.c07be6c4.js"])},{path:"data/article",name:"dataArticle",component:()=>U((()=>import("./article.8cc51c1c.js")),["assets/article.8cc51c1c.js","assets/vendor.c07be6c4.js"])},{path:"data/fans",name:"dataFans",component:()=>U((()=>import("./fans.8a9a9a10.js")),["assets/fans.8a9a9a10.js","assets/fans.117a4145.css","assets/vendor.c07be6c4.js"])},{path:"setup",name:"setup",component:()=>U((()=>import("./index.daa6d3b2.js")),["assets/index.daa6d3b2.js","assets/index.1ceea499.css","assets/vendor.c07be6c4.js"])}]},{path:"create",name:"create",component:()=>U((()=>import("./index.ac01ec54.js")),["assets/index.ac01ec54.js","assets/index.686c83b1.css","assets/vendor.c07be6c4.js"])}]},{},{path:"/login",name:"Login",component:()=>U((()=>import("./index.8d418234.js")),["assets/index.8d418234.js","assets/index.1723dc75.css","assets/vendor.c07be6c4.js"])}],H=r({history:s(),routes:G});H.beforeEach(((e,t)=>!!localStorage.user||("Login"==e.name||{path:"/login"}))),H.afterEach(((e,t)=>{window.scrollTo(0,0)}));var J={install:e=>{const t=[k,q];[c,i,m,p,d,l,u,_,h,f,E,g,L,P,A,j,I,O,T,b,y,D,R,V,v,x,w].forEach((t=>{e.component(t.name,t)})),t.forEach((t=>{e.use(t)}))}},W={install:e=>{[N].forEach((t=>{e.component(t.name,t)}))}},Q=S({state:{user:{},test:0},mutations:{updateUser(e,t){e.user=t},updateTest(e,t){e.test=t}},actions:{},modules:{}});let X=C.create({baseURL:"http://139.155.71.189:3000",timeout:5e3});X.interceptors.request.use((e=>e),(e=>Promise.reject(error))),X.interceptors.response.use((e=>e),(e=>Promise.reject(error)));const Y=$(K);Y.config.globalProperties.http=async function(e={}){X.defaults.headers.common.Authorization="Bearer "+localStorage.getItem("token");let t=null;return"get"==e.method||"delete"==e.method?await X({method:e.method,url:e.path,params:e.params}).then((e=>{t=e.data})).catch((e=>{t=e})):"post"!=e.method&&"put"!=e.method||await X({method:e.method,url:e.path,data:e.params}).then((e=>{t=e.data})).catch((e=>{t=e})),t},Y.use(J).use(W).use(Q).use(z,C).use(H).use(B).mount("#app");export{F as _};
