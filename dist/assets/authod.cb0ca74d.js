import{Q as a,T as e,S as s,U as r,r as l,V as t,X as c,W as i,a2 as n,a4 as d,Z as o,_ as u,Y as m,ab as v,a6 as h,a8 as g,a3 as p,a0 as k,a1 as C,o as f,$ as y}from"./vendor.c07be6c4.js";import{w as I,h as A}from"./handerTime.89250da6.js";import{_ as b}from"./index.936426dd.js";const w={components:{webHeader:I},setup(){let{proxy:l}=y(),t=a(),c=!!localStorage.user,i=c?JSON.parse(localStorage.user):null,n=e(t.query.id);const{handlerTime1:d}=A();let o=s({}),u=e(0);let m=s([]),v=s([]);const h=()=>{l.http({method:"get",path:"/article/find",params:{authorId:n.value}}).then((a=>{m.length=0,m.push(...a.res)}))},g=()=>{l.http({method:"get",path:"/user/getCollect",params:{userId:n.value}}).then((a=>{v.length=0,v.push(...a.res)}))};let p=e();const k=()=>{l.http({method:"get",path:"user/isCare",params:{userId:i._id,authorId:n.value}}).then((a=>{p.value=a.data}))};let C=s([]);const f=()=>{l.http({method:"get",path:"/article/userHotArticle",params:{id:n.value}}).then((a=>{C.length=0,C.push(...a.res)}))},I=()=>{n.value=t.query.id,l.http({method:"get",path:"/user/getmsg",params:{id:n.value}}).then((a=>{o=Object.assign(o,a.data),document.title=o.username+"的主页"})),h(),g(),k(),f(),_.length=0,T(),O.length=0,L()};r((()=>t.fullPath),((a,e)=>{"/authod"==t.path&&I()}));let b=e(!1),w=e(1),_=s([]),O=s([]);const T=()=>{l.http({method:"get",path:"/user/getFans",params:{authorId:n.value,userId:i._id}}).then((a=>{_.push(...a.data)}))},L=()=>{l.http({method:"get",path:"/user/getCare",params:{authorId:n.value,userId:i._id}}).then((a=>{O.push(...a.data)}))};return I(),{id:n,isLogin:c,user:i,handlerTime:d,toArticle:a=>{l.$router.push({path:"/article",query:{id:a}})},toAuthor:a=>{l.$router.push({path:"/authod",query:{id:a}})},author:o,articleOrLike:u,clickAOrL:a=>{u.value=a},getArticle:h,getLiked:g,article:m,articleLiked:v,getIsCare:k,isCare:p,careOrNoCare:()=>{let a=null;a=p.value?2:1,l.http({method:"get",path:"/user/care",params:{userId:i._id,authorId:n.value,cate:a}}).then((e=>{200==e.code?(p.value=e.data,2==a?o.fans--:o.fans++):l.$message.error("服务器出现异常")}))},hotArticle:C,getHotArticle:f,getPageData:I,drawer:b,drawerActive:w,fansArr:_,careArr:O,getFans:T,careAndNoCare:(a,e,s,r)=>{l.http({method:"get",path:"/user/care",params:{userId:i._id,authorId:s,cate:r}}).then((s=>{200==s.code?(1==a?(_[e].isCare=1==r,1==r?_[e].fansCount++:_[e].fansCount--):(O[e].isCare=1==r,1==r?O[e].fansCount++:O[e].fansCount--),i._id==o._id&&(1==r?o.careId++:o.careId--)):l.$message.error("出现异常稍后再试")}))},getCare:L,clickDrawerFansOrCare:a=>{a!=w.value&&(1==a?(_.length=0,T(),w.value=a):(O.length=0,L(),w.value=a))},clickFansOrCare:a=>{b.value=!0,1==a?(_.length=0,T(),w.value=a):(O.length=0,L(),w.value=a)}}}},_=a=>(k("data-v-71219a16"),a=a(),C(),a),O={class:"web-con"},T={class:"web-content"},L={class:"left-con"},N={class:"author-msg"},z={class:"img-con"},F=["src"],B={class:"msg-right"},$={class:"msg-r-name"},j={class:"msg-r-con1"},q={class:"msg-star"},D={class:"msg-sz"},S=_((()=>c("span",{class:"msg-wz"},"获赞",-1))),V={class:"msg-sz"},x=_((()=>c("span",{class:"msg-wz"},"粉丝",-1))),H={class:"msg-sz"},P=_((()=>c("span",{class:"msg-wz"},"关注",-1))),U={class:"msg-right-desc"},J=_((()=>c("span",null,"简介:  ",-1))),Q={key:0},W={key:1},X={class:"author-tabBar"},Y={class:"r-list-con"},Z=_((()=>c("div",{class:"r-list-con-h"},"近期最热文章",-1))),E=["onClick"],G={key:0,class:"r-list-imgcon"},K=["src"],M={class:"msg-con"},R={class:"title"},aa={class:"msg-con-msg"},ea={class:"m-c-m-t"},sa={class:"author-content"},ra=["data-id","onClick"],la={class:"item-left"},ta={class:"title"},ca={key:0,class:"zw"},ia={key:1,class:"img-con"},na=["src"],da=["src"],oa=["src"],ua=["src"],ma={class:"msg"},va={key:0,class:"item-right"},ha=["src"],ga=["data-id","onClick"],pa={class:"item-left"},ka={class:"title"},Ca={key:0,class:"zw"},fa={key:1,class:"img-con"},ya=["src"],Ia=["src"],Aa=["src"],ba=["src"],wa={class:"msg"},_a={key:0,class:"item-right"},Oa=["src"],Ta={class:"right-con"},La={key:0,class:"likeBtn-con"},Na={key:1,class:"likeBtn-con"},za={class:"drawer-tabar"},Fa={class:"drawer-body"},Ba={class:"list-con fans-con"},$a=["onClick"],ja=["src"],qa={class:"fans-msg"},Da=["onClick"],Sa={class:"fans-fansCount"},Va=["onClick"],xa=["onClick"],Ha={class:"list-con careId-con"},Pa=["onClick"],Ua=["src"],Ja={class:"fans-msg"},Qa=["onClick"],Wa={class:"fans-fansCount"},Xa=["onClick"],Ya=["onClick"];var Za=b(w,[["render",function(a,e,s,r,k,C){const y=l("web-header"),I=l("el-scrollbar"),A=l("el-drawer"),b=l("el-backtop");return f(),t(o,null,[c("div",O,[i(y),c("div",T,[c("div",L,[c("div",N,[c("div",z,[c("img",{src:r.author.avatar,alt:""},null,8,F)]),c("div",B,[c("div",$,n(r.author.username),1),c("div",j,[c("div",q,[c("span",D,n(r.author.star),1),S]),c("div",{class:"msg-star",onClick:e[0]||(e[0]=a=>r.clickFansOrCare(1))},[c("span",V,n(r.author.fans),1),x]),c("div",{class:"msg-star",onClick:e[1]||(e[1]=a=>r.clickFansOrCare(2))},[c("span",H,n(r.author.careId),1),P])]),c("div",U,[J,!r.author.desc?(f(),t("span",W,"这个人很懒什么都没留下")):(f(),t("span",Q,n(r.author.desc),1))])])]),c("div",X,[c("span",{class:d({"active-tabBar":0==r.articleOrLike}),onClick:e[2]||(e[2]=a=>r.clickAOrL(0))},"文章",2),c("span",{onClick:e[3]||(e[3]=a=>r.clickAOrL(1)),class:d({"active-tabBar":1==r.articleOrLike})},"收藏",2),c("div",Y,[Z,(f(!0),t(o,null,u(r.hotArticle,(a=>(f(),t("div",{key:a._id,class:"r-list",onClick:e=>r.toArticle(a._id)},["无封面"!=a.coverType?(f(),t("div",G,[c("img",{src:a.coverImg[0]},null,8,K)])):p("",!0),c("div",M,[c("div",R,n(a.title),1),c("div",aa,[c("span",null,n(a.read)+"阅读",1),c("span",ea,n(r.handlerTime(a.createTime)),1)])])],8,E)))),128))])]),c("div",sa,[i(v,null,{default:m((()=>[h(c("div",null,[(f(!0),t(o,null,u(r.article,(a=>(f(),t("div",{key:a._id,class:"item","data-id":a._id,onClick:e=>r.toArticle(a._id)},[c("div",la,[c("span",ta,n(a.title),1),"无封面"==a.coverType?(f(),t("div",ca)):p("",!0),"四图"==a.coverType?(f(),t("div",ia,[c("div",null,[c("img",{src:a.coverImg[0]},null,8,na)]),c("div",null,[c("img",{src:a.coverImg[1]},null,8,da)]),c("div",null,[c("img",{src:a.coverImg[2]},null,8,oa)]),c("div",null,[c("img",{src:a.coverImg[3]},null,8,ua)])])):p("",!0),c("div",ma,[c("span",null,n(a.author),1),c("span",null,n(a.comment)+"条评论 ",1),c("span",null,n(r.handlerTime(a.createTime)),1)])]),"单图"==a.coverType?(f(),t("div",va,[c("img",{src:a.coverImg[0]},null,8,ha)])):p("",!0)],8,ra)))),128))],512),[[g,0==r.articleOrLike]])])),_:1}),i(v,null,{default:m((()=>[h(c("div",null,[(f(!0),t(o,null,u(r.articleLiked,(a=>(f(),t("div",{key:a._id,class:"item","data-id":a._id,onClick:e=>r.toArticle(a._id)},[c("div",pa,[c("span",ka,n(a.title),1),"无封面"==a.coverType?(f(),t("div",Ca)):p("",!0),"四图"==a.coverType?(f(),t("div",fa,[c("div",null,[c("img",{src:a.coverImg[0]},null,8,ya)]),c("div",null,[c("img",{src:a.coverImg[1]},null,8,Ia)]),c("div",null,[c("img",{src:a.coverImg[2]},null,8,Aa)]),c("div",null,[c("img",{src:a.coverImg[3]},null,8,ba)])])):p("",!0),c("div",wa,[c("span",null,n(a.author),1),c("span",null,n(a.comment)+"条评论 ",1),c("span",null,n(r.handlerTime(a.createTime)),1)])]),"单图"==a.coverType?(f(),t("div",_a,[c("img",{src:a.coverImg[0]},null,8,Oa)])):p("",!0)],8,ga)))),128))],512),[[g,1==r.articleOrLike]])])),_:1})])]),c("div",Ta,[r.user._id!==r.id?(f(),t("div",La,[h(c("button",{class:"btn1",onClick:e[4]||(e[4]=(...a)=>r.careOrNoCare&&r.careOrNoCare(...a))}," 关注 ",512),[[g,0==r.isCare]]),h(c("button",{class:"btn2",onClick:e[5]||(e[5]=(...a)=>r.careOrNoCare&&r.careOrNoCare(...a))}," 已关注 ",512),[[g,1==r.isCare]])])):p("",!0),r.user._id==r.id?(f(),t("div",Na)):p("",!0)])]),i(A,{modelValue:r.drawer,"onUpdate:modelValue":e[8]||(e[8]=a=>r.drawer=a),"with-header":!1},{default:m((()=>[c("div",za,[c("span",{class:d(["drawer-tabar-span",{"drawer-tabar-active":1==r.drawerActive}]),onClick:e[6]||(e[6]=a=>r.clickDrawerFansOrCare(1))},"粉丝"+n(r.author.fans),3),c("span",{onClick:e[7]||(e[7]=a=>r.clickDrawerFansOrCare(2)),class:d({"drawer-tabar-active":2==r.drawerActive})},"关注"+n(r.author.careId),3)]),c("div",Fa,[i(I,null,{default:m((()=>[h(c("div",Ba,[(f(!0),t(o,null,u(r.fansArr,((a,e)=>(f(),t("div",{key:a.id,class:"item-con"},[c("div",{class:"ImgCon",onClick:e=>r.toAuthor(a.id)},[c("img",{src:a.avatar},null,8,ja)],8,$a),c("div",qa,[c("span",{class:"fans-name",onClick:e=>r.toAuthor(a.id)},n(a.username),9,Da),c("span",Sa,n(a.fansCount)+"粉丝",1)]),a.isCare?p("",!0):(f(),t("button",{key:0,class:"nocare-btn",onClick:s=>r.careAndNoCare(1,e,a.id,1)}," 关注 ",8,Va)),a.isCare?(f(),t("button",{key:1,class:"care-btn",onClick:s=>r.careAndNoCare(1,e,a.id,2)}," 已关注 ",8,xa)):p("",!0)])))),128))],512),[[g,1==r.drawerActive]]),h(c("div",Ha,[(f(!0),t(o,null,u(r.careArr,((a,e)=>(f(),t("div",{key:a.id,class:"item-con"},[c("div",{class:"ImgCon",onClick:e=>r.toAuthor(a.id)},[c("img",{src:a.avatar},null,8,Ua)],8,Pa),c("div",Ja,[c("span",{class:"fans-name",onClick:e=>r.toAuthor(a.id)},n(a.username),9,Qa),c("span",Wa,n(a.fansCount)+"粉丝",1)]),a.isCare?p("",!0):(f(),t("button",{key:0,class:"nocare-btn",onClick:s=>r.careAndNoCare(2,e,a.id,1)}," 关注 ",8,Xa)),a.isCare?(f(),t("button",{key:1,class:"care-btn",onClick:s=>r.careAndNoCare(2,e,a.id,2)}," 已关注 ",8,Ya)):p("",!0)])))),128))],512),[[g,2==r.drawerActive]])])),_:1})])])),_:1},8,["modelValue"])]),i(b)],64)}],["__scopeId","data-v-71219a16"]]);export{Za as default};
