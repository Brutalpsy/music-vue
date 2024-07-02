import{_ as v,o as i,c as d,a as e,t as n,p as D,u,q as _,x as g,y as q,z as h,j as p,s as b,r as l,k as N,n as f,m as y,h as w,w as E,b as x,f as I,A as z,F as B,g as L}from"./index-Cju7tG9q.js";const M={name:"Comment",props:{comment:{type:Object,required:!0}}},U={class:"p-6 bg-gray-50 border border-gray-200"},$={class:"mb-5"},A={class:"font-bold"};function V(o,s,a,c,t,r){return i(),d("li",U,[e("div",$,[e("div",A,n(a.comment.userName),1),e("time",null,n(a.comment.datePosted),1)]),e("p",null,n(a.comment.content),1)])}const Y=v(M,[["render",V]]),j={name:"Song",components:{AppComment:Y},computed:{...D(u),..._(u,["userLoggedIn"]),..._(g,["playing","isPlayingCurrentSong"]),sortedComments(){return this.comments.slice().sort((o,s)=>this.sort=="1"?new Date(s.datePosted)-new Date(o.datePosted):new Date(o.datePosted)-new Date(s.datePosted))}},methods:{...q(g,["newSong"]),async addComment({comment:o},{resetForm:s}){this.comment_in_submittion=!0,this.comment_show_alert=!0,this.comment_alert_varient="bg-blue-500",this.comment_alert_message="Please wait! Your comment is being submitted.",await h.add({content:o,songId:this.$route.params.id,userName:p.currentUser.displayName,datePosted:new Date().toString(),uid:p.currentUser.uid}),this.song.comment_count+=1,await b.doc(this.$route.params.id).update({comment_count:this.song.comment_count}),this.comment_in_submittion=!1,this.comment_alert_varient="bg-green-500",this.comment_alert_message="Comment added!",s(),await this.getComments()},async getComments(){const o=await h.where("songId","==",this.$route.params.id).get();this.comments=[],o.forEach(s=>{this.comments.push({...s.data(),docId:s.id})})}},data(){return{sort:"1",song:{},comments:[],schema:{comment:"required|min:3|max:250"},comment_in_submittion:!1,comment_show_alert:!1,comment_alert_varient:"bg-blue-500",comment_alert_message:"Please wait! Your comment is being submitted."}},async beforeRouteEnter(o,s,a){const c=await b.doc(o.params.id).get();a(t=>{if(!c.exists){t.$router.push({name:"home"});return}t.song=c.data(),t.getComments();const{sort:r}=t.$route.query;t.sort=r==="1"||r==="2"?r:"1"})},watch:{sort(o){o!==this.$route.query.sort&&this.$router.push({query:{sort:o}})}}},F={class:"w-full mb-8 py-14 text-center text-white relative"},O=e("div",{class:"absolute inset-0 w-full h-full box-border bg-contain music-bg",style:{"background-image":"url(/assets/img/song-header.png)"}},null,-1),R={class:"container mx-auto flex items-center"},G={class:"z-50 text-left ml-8"},H={class:"text-3xl font-bold"},J={class:"song-price"},K={class:"container mx-auto mt-6",id:"comments"},Q={class:"bg-white rounded border border-gray-200 relative flex flex-col"},T={class:"px-6 pt-6 pb-5 font-bold border-b border-gray-200"},W={class:"card-title"},X=e("i",{class:"fa fa-comments float-right text-green-400 text-2xl"},null,-1),Z={class:"p-6"},ee=["disabled"],te=e("option",{value:"1"},"Latest",-1),oe=e("option",{value:"2"},"Oldest",-1),se=[te,oe],ne={class:"container mx-auto"};function re(o,s,a,c,t,r){const C=l("vee-field"),S=l("ErrorMessage"),k=l("vee-form"),P=l("app-comment");return i(),d("main",null,[e("section",F,[O,e("div",R,[e("button",{id:"play-btn",onClick:s[0]||(s[0]=N(m=>o.newSong(t.song),["prevent"])),type:"button",class:"z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"},[e("i",{class:f(["fas",{"fa-play":!o.isPlayingCurrentSong(t.song),"fa-pause":o.isPlayingCurrentSong(t.song)}])},null,2)]),e("div",G,[e("div",H,n(t.song.modified_name),1),e("div",null,n(t.song.genre),1),e("div",J,n(o.$n(1,"currency")),1)])])]),e("section",K,[e("div",Q,[e("div",T,[e("span",W,n(o.$tc("song.commentCount",t.song.comment_count,{count:t.song.comment_count})),1),X]),e("div",Z,[t.comment_show_alert?(i(),d("div",{key:0,class:f([t.comment_alert_varient,"text-white text-center font-bold p-4 mb-4"])},n(t.comment_alert_message),3)):y("",!0),o.userLoggedIn?(i(),w(k,{key:1,"validation-schema":t.schema,onSubmit:r.addComment},{default:E(()=>[x(C,{as:"textarea",name:"comment",class:"block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4",placeholder:"Your comment here..."}),x(S,{class:"text-red-600",name:"comment"}),e("button",{type:"submit",disabled:t.comment_in_submittion,class:"py-1.5 px-3 rounded text-white bg-green-600 block"}," Submit ",8,ee)]),_:1},8,["validation-schema","onSubmit"])):y("",!0),I(e("select",{"onUpdate:modelValue":s[1]||(s[1]=m=>t.sort=m),class:"block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"},se,512),[[z,t.sort]])])])]),e("ul",ne,[(i(!0),d(B,null,L(r.sortedComments,m=>(i(),w(P,{comment:m,key:m.id},null,8,["comment"]))),128))])])}const ie=v(j,[["render",re]]);export{ie as default};