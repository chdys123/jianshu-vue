import{_ as e}from"./index.936426dd.js";import{T as a,r as s,V as l,X as t,W as n,Y as u,$ as i,o as r,a0 as c,a1 as o,aa as d}from"./vendor.c07be6c4.js";const m={setup(){const{proxy:e}=i();return{isCollapse:a(!1),activeIndex:a(e.$route.path),toCreate:()=>{let a=e.$router.resolve({path:"/user/create"});window.open(a.href,"_blank")}}}},f=e=>(c("data-v-663968be"),e=e(),o(),e),p={class:"menu-con"},x={class:"menu-left"},v=f((()=>t("i",{class:"el-icon-magic-stick"},null,-1))),_=f((()=>t("span",{class:"home-menu-title"},"主页",-1))),g=f((()=>t("i",{class:"el-icon-magic-stick"},null,-1))),h=f((()=>t("span",{class:"home-menu-title"},"创作",-1))),b=f((()=>t("i",{class:"el-icon-reading"},null,-1))),k=f((()=>t("span",{class:"home-menu-title"},"管理",-1))),F=d("   作品管理"),w=d("   评论管理"),C=f((()=>t("i",{class:"el-icon-reading"},null,-1))),I=f((()=>t("span",{class:"home-menu-title"},"数据",-1))),$=d("   作品数据"),j=d("   粉丝数据"),E=f((()=>t("i",{class:"el-icon-magic-stick"},null,-1))),y=f((()=>t("span",{class:"home-menu-title"},"设置",-1))),P={class:"menu-right"},T={class:"menu-right-con"};var V=e(m,[["render",function(e,a,i,c,o,d){const m=s("el-menu-item"),f=s("el-sub-menu"),V=s("el-menu"),W=s("router-view"),X=s("el-scrollbar");return r(),l("div",p,[t("div",x,[n(V,{"default-active":c.activeIndex,"background-color":"#F8F8F8","text-color":"#222222","active-text-color":"#FF5E5E",router:"",collapse:c.isCollapse},{default:u((()=>[n(m,{index:"/user/menu/mainPage"},{default:u((()=>[v,_])),_:1}),n(m,{index:"/user/create"},{default:u((()=>[g,h])),_:1}),n(f,{index:"/user/menu/manger"},{title:u((()=>[b,k])),default:u((()=>[n(m,{index:"/user/menu/manger/article"},{default:u((()=>[F])),_:1}),n(m,{index:"/user/menu/manger/comment"},{default:u((()=>[w])),_:1})])),_:1}),n(f,{index:"/user/menu/data"},{title:u((()=>[C,I])),default:u((()=>[n(m,{index:"/user/menu/data/article"},{default:u((()=>[$])),_:1}),n(m,{index:"/user/menu/data/fans"},{default:u((()=>[j])),_:1})])),_:1}),n(m,{index:"/user/menu/setup"},{default:u((()=>[E,y])),_:1})])),_:1},8,["default-active","collapse"])]),t("div",P,[t("div",T,[n(X,null,{default:u((()=>[n(W)])),_:1})])])])}],["__scopeId","data-v-663968be"]]);export{V as default};
