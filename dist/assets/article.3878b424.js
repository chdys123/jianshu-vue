import{o as e,V as a,X as t,a2 as s,a9 as n,Q as l,R as i,S as c,U as o,T as r,r as d,W as m,a4 as u,a3 as h,c as v,Z as g,_ as p,a0 as C,a1 as k,aa as f,$ as I}from"./vendor.2b14f918.js";import{_}from"./index.420421d8.js";import{w as y,h as T}from"./handerTime.c1674a62.js";import"./popover2.1d03c9ce.js";const b={class:"comment-haslogon"},A=["textContent"],H={class:"btn-con"};const P={components:{comment:_({props:{value:{}},setup(e,a){let t=null;return{f1:e=>{t&&clearTimeout(t),t=setTimeout((()=>{a.emit("change",e.target.innerText)}),500)},f2:()=>{console.log("点击了"),a.emit("add",{})}}}},[["render",function(n,l,i,c,o,r){return e(),a("div",b,[t("div",{class:"comment-input",contenteditable:"true",placeholder:"说点什么吧...",textContent:s(i.value),onInput:l[0]||(l[0]=e=>c.f1(e))},null,40,A),t("div",H,[t("button",{class:"comment-btn",onClick:l[1]||(l[1]=e=>c.f2())},"评论")])])}],["__scopeId","data-v-21a8989b"]]),webHeader:y},setup(){n();let{proxy:e}=I(),a=l();i();let t=!!localStorage.user,s=t?JSON.parse(localStorage.user):null,d=c({});const{handlerTime1:m,handlerTime2:u}=T();o((()=>a.fullPath),((e,t)=>{"/article"==a.path&&U(a.query.id)}));let h=c([]);const v=()=>{e.http({method:"get",path:"comment/web/find",params:{id:d._id,start:(L.value-1)*O.value,size:O.value}}).then((e=>{200==e.code&&(h.length=0,h.push(...e.data),w.value=e.count)}))};let g=r("");let p=r(""),C=r();let k=r("");let f=r(!1);const _=()=>{e.http({method:"get",path:"/user/isCollect",params:{userId:s._id,articleId:d._id}}).then((e=>{f.value=e.data}))};let y=r(!1);const b=()=>{e.http({method:"get",path:"/user/isStar",params:{userId:s._id,articleId:d._id}}).then((e=>{y.value=e.data}))};let A=c({});const H=a=>{e.http({method:"get",path:"/user/getmsg",params:{id:a}}).then((e=>{200==e.code&&Object.assign(A,e.data)}))};let P=r();const x=()=>{e.http({method:"get",path:"user/isCare",params:{userId:s._id,authorId:d.authorId}}).then((e=>{P.value=e.data}))};let M=c([]);const S=()=>{e.http({method:"get",path:"/article/userHotArticle",params:{id:d.authorId}}).then((e=>{M.push(...e.res)}))};let w=r(0),L=r(1),O=r(10);const U=t=>{let s=t||a.query.id;h.length=0,M.length=0,e.http({method:"get",path:"/article/findOne",params:{id:s}}).then((e=>{Object.assign(d,e.data),document.title=d.title})).then((()=>{v(),_(),b(),H(d.authorId),x(),S()}))};return U(),{pageSize:O,commentTotal:w,currentPage:L,handleCurrentChange:e=>{v()},id1:C,isLogin:t,user:s,handlerTime:u,handlerTime2:m,article:d,commentForArticle:g,commentForComment:p,change1:e=>{g.value=e},change2:e=>{p.value=e},addComment:()=>{if(!g.value.trim())return;let a={username:s.username,userId:s._id,avatar:s.avatar,author:d.author,authorId:d.authorId,articleTitle:d.title,articleId:d._id,content:g.value,createTime:Date.now(),hasCForComment:!1};e.http({method:"post",path:"/comment/add",params:a}).then((a=>{200==a.code&&(e.$message.success("评论成功"),d.comment+=1,g.value="",v())}))},addComment2:(a,t)=>{p.value.trim()&&e.http({method:"post",path:"/comment/update",params:{aId:e.$route.query.id,id:t,comment:{userId:s._id,username:s.username,avatar:s.avatar,content:p.value,createTime:Date.now(),BcId:a?a.userId:"",BcName:a?a.username:"",BcAvatar:a?a.avatar:"",BcContent:a?a.content:""}}}).then((a=>{200==a.code&&(p.value="",e.$message.success("回复成功"),v())}))},comments:h,getComment:v,clickHf:e=>{e==C.value?C.value="":C.value=e},openHf:k,clickMoreHf:e=>{e==k.value?k.value="":k.value=e},toUserMainPage:a=>{e.$router.push({path:"/authod",query:{id:a}})},isCollect:f,getIsCollect:_,collect:()=>{let a=null;a=f.value?2:1,e.http({method:"get",path:"/user/collect",params:{userId:s._id,articleId:d._id,cate:a}}).then((e=>{f.value=e.data}))},isStar:y,getIsStar:b,star:()=>{let a=null;a=y.value?2:1,e.http({method:"get",path:"/user/star",params:{userId:s._id,articleId:d._id,cate:a}}).then((e=>{y.value=e.data,e.data?d.star++:d.star--}))},toComment:()=>{let e=document.getElementById("js-con");window.scrollTo(0,e.clientHeight+50+66)},author:A,getAuthorData:H,isCare:P,getIsCare:x,careOrNoCare:()=>{let a=null;a=P.value?2:1,e.http({method:"get",path:"/user/care",params:{userId:s._id,authorId:d.authorId,cate:a}}).then((a=>{200==a.code?P.value=a.data:e.$message.error("服务器出现异常")}))},hotArticle:M,getHotArticle:S,toArticle:a=>{console.log("点击了"),a!==d._id&&U(a),e.$router.push({path:"/article",query:{id:a}})},getAllData:U}}},x=e=>(C("data-v-cbe47f2a"),e=e(),k(),e),M={class:"web-con"},S={class:"web-content"},w={class:"fixed"},L=[x((()=>t("i",{class:"iconfont icon-pinglun"},null,-1))),x((()=>t("span",null,"评论",-1)))],O={key:0},U={key:1,class:"hasCollected"},j={class:"left-con"},z={id:"js-con"},B={class:"msg"},N={class:"time"},q=["innerHTML"],$={class:"comment-title"},F={class:"comment-write"},D={class:"avatar"},E=["src"],J={key:1,class:"img2"},Q={class:"lqbz"},R={key:1,class:"comment-nologin"},V=[x((()=>t("p",null,[f("请先 "),t("span",null,"登录"),f(" 之后发表评论~")],-1)))],W={class:"comment-con"},X=["onClick"],Z=["src"],G={class:"item-right"},K={class:"item-right-con1"},Y=["onClick"],ee={class:"item-right-content"},ae={class:"item-right-con2"},te=["onClick"],se={class:"item-createTime"},ne={key:0,class:"item-hfk1"},le={key:1,class:"item-item"},ie=["onClick"],ce=["src"],oe={class:"i-i-left"},re=["onClick"],de={class:"i-i-l-content"},me={key:0,class:"i-i-l-content-x"},ue={class:"i-i-l-b"},he=["onClick"],ve={class:"i-i-l-time"},ge={key:0,class:"item-hfk1"},pe={key:2,class:"item-right-con3"},Ce=["onClick"],ke=["onClick"],fe={class:"more-comment"},Ie={class:"right-con"},_e={class:"r-c-author-msg"},ye=["src"],Te={class:"r-c-a-m-name"},be={class:"r-c-a-m-desc"},Ae={key:0},He=x((()=>t("div",{class:"tdrmzp"},[t("span",null," TA的热门作品 ")],-1))),Pe={class:"r-list-con"},xe=["onClick"],Me={key:0,class:"r-list-imgcon"},Se=["src"],we={class:"msg-con"},Le={class:"title"},Oe={class:"msg-con-msg"},Ue={class:"m-c-m-t"};var je=_(P,[["render",function(n,l,i,c,o,r){const C=d("web-header"),k=d("comment"),I=d("el-pagination"),_=d("el-backtop");return e(),a(g,null,[t("div",M,[m(C),t("div",S,[t("div",w,[t("div",{class:"fixed-item",onClick:l[0]||(l[0]=(...e)=>c.star&&c.star(...e))},[t("i",{class:u(["iconfont icon-dianzan",{hasStared:c.isStar}])},null,2),t("span",{class:u({hasStared:c.isStar})},s(c.article.star),3)]),t("div",{class:"fixed-item",onClick:l[1]||(l[1]=(...e)=>c.toComment&&c.toComment(...e))},L),t("div",{class:"fixed-item",onClick:l[2]||(l[2]=(...e)=>c.collect&&c.collect(...e))},[t("i",{class:u(["iconfont icon-shoucang",{hasCollected:c.isCollect}])},null,2),c.isCollect?h("",!0):(e(),a("span",O,"收藏")),c.isCollect?(e(),a("span",U,"已收藏")):h("",!0)])]),t("div",j,[t("div",z,[t("h1",null,s(c.article.title),1),t("div",B,[t("span",N,s(c.handlerTime(c.article.createTime)),1),t("span",{onClick:l[3]||(l[3]=e=>c.toUserMainPage(c.article.authorId)),class:"authod"},s(c.article.author),1)]),t("div",{innerHTML:c.article.content,class:"article-content"},null,8,q)]),t("div",$,"评论  "+s(c.article.comment),1),t("div",F,[t("div",D,[c.isLogin?(e(),a("img",{key:0,src:c.user.avatar,class:"img1"},null,8,E)):h("",!0),c.isLogin?h("",!0):(e(),a("div",J))]),t("div",Q,[c.isLogin?(e(),v(k,{key:0,value:c.commentForArticle,onChange:c.change1,onAdd:c.addComment},null,8,["value","onChange","onAdd"])):h("",!0),c.isLogin?h("",!0):(e(),a("div",R,V))])]),t("div",W,[(e(!0),a(g,null,p(c.comments,(n=>(e(),a("div",{key:n._id,class:"item"},[t("div",{class:"avatar",onClick:e=>c.toUserMainPage(n.userId)},[t("img",{src:n.avatar,alt:"",class:"img1"},null,8,Z)],8,X),t("div",G,[t("div",K,[t("div",{class:"name",onClick:e=>c.toUserMainPage(n.userId)},s(n.username),9,Y)]),t("div",ee,s(n.content),1),t("div",ae,[t("span",{class:"item-right-hf",onClick:e=>c.clickHf(n._id)},"回复",8,te),t("span",se,s(c.handlerTime2(n.createTime)),1)]),n._id==c.id1?(e(),a("div",ne,[c.isLogin?(e(),v(k,{key:0,value:c.commentForComment,onChange:c.change2,onAdd:e=>c.addComment2(null,n._id)},null,8,["value","onChange","onAdd"])):h("",!0)])):h("",!0),n._id==c.openHf?(e(),a("div",le,[(e(!0),a(g,null,p(n.forComment,(l=>(e(),a("div",{key:l._id,class:"item-item-con"},[t("div",{class:"item-item-img-con",onClick:e=>c.toUserMainPage(l.userId)},[t("img",{src:l.avatar},null,8,ce)],8,ie),t("div",oe,[t("div",{class:"i-i-l-name",onClick:e=>c.toUserMainPage(l.userId)},s(l.username),9,re),t("div",de,[f(s(l.content)+" ",1),""!=l.BcId?(e(),a("span",me,"回复@"+s(l.BcName)+":"+s(l.BcContent),1)):h("",!0)]),t("div",ue,[t("span",{class:"i-i-l-hf",onClick:e=>c.clickHf(l._id)},"回复",8,he),t("span",ve,s(c.handlerTime2(l.createTime)),1)]),l._id==c.id1?(e(),a("div",ge,[c.isLogin?(e(),v(k,{key:0,value:c.commentForComment,onChange:c.change2,onAdd:e=>c.addComment2(l,n._id)},null,8,["value","onChange","onAdd"])):h("",!0)])):h("",!0)])])))),128))])):h("",!0),0!=n.forComment.length?(e(),a("div",pe,[n._id!==c.openHf?(e(),a("span",{key:0,onClick:e=>c.clickMoreHf(n._id)},"查看全部回复",8,Ce)):h("",!0),n._id==c.openHf?(e(),a("span",{key:1,onClick:e=>c.clickMoreHf(n._id),class:"sq"},"收起",8,ke)):h("",!0)])):h("",!0)])])))),128))]),t("div",fe,[m(I,{background:"",layout:"prev, pager, next",total:c.commentTotal,currentPage:c.currentPage,"onUpdate:currentPage":l[4]||(l[4]=e=>c.currentPage=e),onCurrentChange:c.handleCurrentChange},null,8,["total","currentPage","onCurrentChange"])])]),t("div",Ie,[t("div",_e,[t("div",{class:"r-c-a-m-c",onClick:l[5]||(l[5]=e=>c.toUserMainPage(c.article.authorId))},[t("img",{src:c.author.avatar,alt:""},null,8,ye)]),t("div",Te,s(c.author.username),1),t("div",be,s(c.author.desc),1),c.user._id!==c.article.authorId?(e(),a("div",Ae,[c.isCare?(e(),a("button",{key:0,class:"rcam-gz",onClick:l[6]||(l[6]=(...e)=>c.careOrNoCare&&c.careOrNoCare(...e))}," 已关注 ")):h("",!0),c.isCare?h("",!0):(e(),a("button",{key:1,class:"rcam-gz rcam-gz1",onClick:l[7]||(l[7]=(...e)=>c.careOrNoCare&&c.careOrNoCare(...e))}," 关注 "))])):h("",!0)]),He,t("div",Pe,[(e(!0),a(g,null,p(c.hotArticle,(n=>(e(),a("div",{key:n._id,class:"r-list",onClick:e=>c.toArticle(n._id)},["无封面"!=n.coverType?(e(),a("div",Me,[t("img",{src:n.coverImg[0]},null,8,Se)])):h("",!0),t("div",we,[t("div",Le,s(n.title),1),t("div",Oe,[t("span",null,s(n.read)+"阅读",1),t("span",Ue,s(c.handlerTime(n.createTime)),1)])])],8,xe)))),128))])])])]),m(_)],64)}],["__scopeId","data-v-cbe47f2a"]]);export{je as default};
