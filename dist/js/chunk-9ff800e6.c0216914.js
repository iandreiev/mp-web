(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9ff800e6"],{"114b":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("button",{class:t.btnClass,attrs:{disabled:t.disabled},on:{click:function(e){return t.callback(e)}}},[t._t("default")],2)},i=[],c={props:["btnClass","disabled"],methods:{callback:function(t){this.$emit("click",t)}}},n=c,r=a("2877"),o=Object(r["a"])(n,s,i,!1,null,null,null);e["a"]=o.exports},"233c":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"user user-affilate"}},[a("div",{staticClass:"user-container"},[a("div",{staticClass:"user-sidebar"},[a("ul",{staticClass:"user-sidebar-nav"},t._l(t.routes,(function(e,s){return a("router-link",{key:s,attrs:{to:e.path},scopedSlots:t._u([{key:"default",fn:function(s){var i=s.href,c=s.navigate,n=s.isActive,r=s.isExactActive;return[a("li",{staticClass:"user-sidebar-nav-item",class:[n&&"user-sidebar-nav-item--active",r&&"user-sidebar-nav-item--exact-active"],attrs:{href:i},on:{click:c}},[a("span",{class:n&&"ic ic_"+e.icon+" ic--active"||"ic ic_"+e.icon+" "}),t._v(" "+t._s(t.$t(e.title))+" ")])]}}],null,!0)})})),1)]),a("div",{staticClass:"dropdown-nav",on:{click:function(e){t.showMiniNav=!t.showMiniNav}}},[a("div",{staticClass:"dropdown-nav-choose-current"},[a("div",{staticClass:"dropdown-nav-current"},[a("div",{class:"ic ic_"+t.curPage.icon}),a("p",{staticClass:"text-dark"},[t._v(t._s(t.curPage.title))])]),a("div",{staticClass:"ic ic_arrow_down",class:{"ic_arrow_down-active":t.showMiniNav}})])]),a("div",{staticClass:"dropdown-nav-items",class:{"dropdown-nav-items--active":t.showMiniNav}},[a("ul",t._l(t.routes,(function(e,s){return a("router-link",{key:s,attrs:{to:e.path},scopedSlots:t._u([{key:"default",fn:function(s){var i=s.href,c=s.navigate,n=s.isActive,r=s.isExactActive;return[a("li",{staticClass:"user-sidebar-nav-item",class:[n&&"user-sidebar-nav-item--active",r&&"user-sidebar-nav-item--exact-active"]},[a("span",{class:n&&"ic ic_"+e.icon+" ic--active"||"ic ic_"+e.icon+" "}),a("a",{attrs:{href:i},on:{click:c}},[t._v(t._s(t.$t(e.title)))])])]}}],null,!0)})})),1)]),a("div",{staticClass:"user-card"},[a("div",{staticClass:"row catalogue-column"},[t._m(0),a("div",{staticClass:"col-6"},[a("h2",[t._v(" "+t._s(t.$t("affilateTitle"))+" ")]),a("div",{staticClass:"sized-box"}),a("p",{staticClass:"text-accent-1"},[t._v(t._s(t.$t("affilateDescribe")))]),a("div",{staticClass:"sized-box"}),a("div",{staticClass:"row catalogue-column"},[a("p",{staticClass:"promo-code"},[t._v(t._s(t.user.email))]),a("input",{attrs:{type:"hidden",name:"",id:"affilate"},domProps:{value:t.user.email}}),a("MButton",{attrs:{btnClass:"btn btn-regular"},on:{click:t.copy}},[t._v(t._s(t.$t("copy")))])],1)])])])])])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-6"},[a("img",{attrs:{src:"https://firebasestorage.googleapis.com/v0/b/webfontshost.appspot.com/o/Monopoly%2FgetMoney.svg?alt=media&token=0fb3d9e7-3a6c-4564-a40c-7179e7e38ef0",alt:""}})])}],c=a("114b"),n=a("a4c7"),r=(a("e762"),{metaInfo:function(){return{title:this.$t("pAffilate")}},components:{MButton:c["a"],MInputText:n["a"]},props:{routes:{type:Array,required:!0},borderProfile:{type:Boolean},borderLogout:{type:Boolean},user:{type:Object,required:!0}},data:function(){return{showMiniNav:!1,curPage:{icon:"affilate",title:"Affilate Program"}}},methods:{showNavItems:function(){this.showMiniNav=!this.showMiniNav},copy:function(){var t=document.querySelector("#affilate");t.setAttribute("type","text"),t.select();try{var e=document.execCommand("copy"),a=e?"successful":"unsuccesful";alert("Code copied! ".concat(a))}catch(s){alert("Oops.. Unable to copy")}t.setAttribute("type","hidden"),window.getSelection().removeAllRanges()}}}),o=r,l=a("2877"),u=Object(l["a"])(o,s,i,!1,null,null,null);e["default"]=u.exports},a4c7:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:"form-controller"},[a("input",{class:t.classStatus,attrs:{type:"text",name:t.id,placeholder:t.placeholder,id:t.id},on:{input:function(e){return t.$emit("input",e.target.value)}}})])},i=[],c={props:["value","classStatus","disabled","id","label","placeholder"],data:function(){return{}}},n=c,r=a("2877"),o=Object(r["a"])(n,s,i,!1,null,null,null);e["a"]=o.exports},e762:function(t,e,a){"use strict";"function"===typeof TextDecoder&&new TextDecoder,"function"===typeof TextEncoder&&new TextEncoder;const s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",i=[...s];(t=>{let e={};t.forEach((t,a)=>e[t]=a)})(i),String.fromCharCode.bind(String),"function"===typeof Uint8Array.from&&Uint8Array.from.bind(Uint8Array)}}]);
//# sourceMappingURL=chunk-9ff800e6.c0216914.js.map