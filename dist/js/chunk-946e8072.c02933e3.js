(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-946e8072"],{"99af":function(t,s,e){"use strict";var a=e("23e7"),o=e("d039"),r=e("e8b5"),i=e("861d"),n=e("7b0b"),c=e("50c4"),l=e("8418"),d=e("65f0"),u=e("1dde"),p=e("b622"),v=e("2d00"),h=p("isConcatSpreadable"),f=9007199254740991,w="Maximum allowed index exceeded",m=v>=51||!o((function(){var t=[];return t[h]=!1,t.concat()[0]!==t})),_=u("concat"),C=function(t){if(!i(t))return!1;var s=t[h];return void 0!==s?!!s:r(t)},g=!m||!_;a({target:"Array",proto:!0,forced:g},{concat:function(t){var s,e,a,o,r,i=n(this),u=d(i,0),p=0;for(s=-1,a=arguments.length;s<a;s++)if(r=-1===s?i:arguments[s],C(r)){if(o=c(r.length),p+o>f)throw TypeError(w);for(e=0;e<o;e++,p++)e in r&&l(u,p,r[e])}else{if(p>=f)throw TypeError(w);l(u,p++,r)}return u.length=p,u}})},ad3a:function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"footer"},[e("div",{directives:[{name:"show",rawName:"v-show",value:0==t.isMobile,expression:"isMobile == false"}],staticClass:"container"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-2 logo-wrapper"},[e("div",{staticClass:"footer-item "},[e("div",{staticClass:"footer-logo",on:{click:t.toHome}})])]),e("div",{staticClass:"col-8  list-wrapper"},[e("div",{staticClass:"footer-item"},[e("div",{staticClass:"row"},[e("ul",{staticClass:"footer-list"},t._l(t.routes,(function(s,a){return e("router-link",{key:a,attrs:{to:s.path},scopedSlots:t._u([{key:"default",fn:function(a){var o=a.href,r=a.navigate,i=a.isActive,n=a.isExactActive;return[e("li",{staticClass:"footer-link",class:[i&&"footer-link-active",n&&"footer-link-exact-active"]},[e("a",{attrs:{href:o},on:{click:r}},[t._v(t._s(t.$t(s.title)))])])]}}],null,!0)})})),1)]),t._m(0),t._m(1)])]),e("div",{staticClass:"col-2"},[e("div",{staticClass:"footer-item "},[e("div",{staticClass:"row phones"},[e("div",{staticClass:"col "},[e("p",[t._v(t._s(t.$t("footerFirstPhoneTitle")))]),e("b",[t._v(t._s(t.setup[0].phone_1))])])]),e("div",{staticClass:"row phones"},[e("div",{staticClass:"col "},[e("p",[t._v(t._s(t.$t("footerFirstSecondTitle")))]),e("b",[t._v(t._s(t.setup[0].phone_2))])])])])])])]),e("div",{directives:[{name:"show",rawName:"v-show",value:1==t.isMobile,expression:"isMobile == true"}],staticClass:"container"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-2 logo-wrapper"},[e("div",{staticClass:"footer-item "},[e("div",{staticClass:"footer-logo",on:{click:t.toHome}})])]),e("div",{staticClass:"col-8  list-wrapper"},[e("div",{staticClass:"footer-item"},[e("div",{staticClass:"row"},[e("ul",{staticClass:"footer-list"},t._l(t.routes,(function(s,a){return e("router-link",{key:a,attrs:{to:s.path},scopedSlots:t._u([{key:"default",fn:function(a){var o=a.href,r=a.navigate,i=a.isActive,n=a.isExactActive;return[e("li",{staticClass:"footer-link",class:[i&&"footer-link-active",n&&"footer-link-exact-active"]},[e("a",{attrs:{href:o},on:{click:r}},[t._v(t._s(t.$t(s.title)))])])]}}],null,!0)})})),1)])])]),e("div",{staticClass:"col-2"},[e("div",{staticClass:"footer-item "},[e("div",{staticClass:"row phones"},[e("div",{staticClass:"col "},[e("p",[t._v(t._s(t.$t("footerFirstPhoneTitle")))]),e("b",[t._v(t._s(t.setup[0].phone_1))])])]),e("div",{staticClass:"row phones"},[e("div",{staticClass:"col "},[e("p",[t._v(t._s(t.$t("footerFirstSecondTitle")))]),e("b",[t._v(t._s(t.setup[0].phone_2))])])])])]),t._m(2)])])])},o=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"row copyright-wrapper"},[e("p",{staticClass:"text-accent-1"},[t._v("Monopoly Life© 2020")])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"row copyright-wrapper"},[e("p",{staticClass:"text-accent-1"},[t._v("Developed:")]),e("div",{staticClass:"rro-logo"})])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"col-8"},[e("div",{staticClass:"row copyright-wrapper"},[e("p",{staticClass:"text-accent-1"},[t._v("Monopoly Life© 2020")])]),e("div",{staticClass:"row copyright-wrapper"},[e("p",{staticClass:"text-accent-1"},[t._v("Developed:")]),e("div",{staticClass:"rro-logo"})])])}],r=e("2f62"),i={data:function(){return{routes:[{path:"/",title:"Home"},{path:"/projects",title:"Projects"},{path:"/about",title:"About"},{path:"/contacts",title:"Contacts"}]}},methods:{toHome:function(){this.$router.push({name:"Home"})}},computed:Object(r["b"])(["setup","isMobile"])},n=i,c=e("2877"),l=Object(c["a"])(n,a,o,!1,null,null,null);s["a"]=l.exports},bdcf:function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"pass-reset"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:""==t.status,expression:"status == ''"}],staticClass:"col-4"},[e("div",{staticClass:"logo-muted"}),e("h1",[t._v(t._s(t.$t("RecoveryTitle")))]),e("MInputPassword",{attrs:{label:t.$t("newPass"),placeholder:t.$t("typePassword")},model:{value:t.changePassword,callback:function(s){t.changePassword=s},expression:"changePassword"}}),e("MInputPassword",{attrs:{label:t.$t("repeatPassword"),placeholder:t.$t("repeatPassword")},model:{value:t.repeatPassword,callback:function(s){t.repeatPassword=s},expression:"repeatPassword"}}),e("transition",{attrs:{name:"hint",appear:""}},[t.passwordValidation.errors.length>0&&!t.submitted?e("div",{staticClass:"hints"},t._l(t.passwordValidation.errors,(function(s,a){return e("p",{key:a},[t._v(" "+t._s(t.$t(s))+" ")])})),0):t._e()]),t.notSamePasswords?e("div",{staticClass:"matches"},[e("p",{staticClass:"text-danger"},[t._v(t._s(t.$t("passDontMatch")))])]):t._e(),t.passwordsFilled&&!t.notSamePasswords&&t.passwordValidation.valid?e("MButton",{attrs:{btnClass:"btn btn-regular"},on:{click:t.resetPass}},[t._v(t._s(t.$t("save")))]):t._e()],1),e("div",{directives:[{name:"show",rawName:"v-show",value:"ok"==t.status,expression:"status == 'ok'"}],staticClass:"col-4"},[e("h1",[t._v(t._s(t.$t("changedPassword")))])]),e("MFooter")],1)},o=[],r=(e("99af"),e("b85c")),i=e("114b"),n=e("9478"),c=e("ad3a"),l={components:{MButton:i["a"],MInputPassword:n["a"],MFooter:c["a"]},metaInfo:function(){return{title:this.$t("RecoveryTitle")}},data:function(){return{cypher:this.$route.params.encodedEmail,email:null,rules:[{message:"oneLower",regex:/[a-z]+/},{message:"oneUpper",regex:/[A-Z]+/},{message:"charMin",regex:/.{8,}/},{message:"oneNumber",regex:/[0-9]+/}],changePassword:null,repeatPassword:null,submitted:!1,status:""}},methods:{resetPass:function(){var t=this,s=this.repeatPassword,e={url:"/users/setPassword/".concat(s,"/").concat(this.email),method:"patch",headers:{"Content-Type":"x-www-form-urlencoded"}};this.$http(e).then((function(s){t.status="ok",setTimeout((function(){t.$router.push({name:"Home"})}),2e3)})).catch((function(s){t.status=s}))}},mounted:function(){this.email=window.atob(this.cypher)},computed:{notSamePasswords:function(){return!!this.passwordsFilled&&this.changePassword!==this.repeatPassword},passwordsFilled:function(){return""!==this.changePassword&&""!==this.repeatPassword},passwordValidation:function(){var t,s=[],e=Object(r["a"])(this.rules);try{for(e.s();!(t=e.n()).done;){var a=t.value;a.regex.test(this.changePassword)||s.push(a.message)}}catch(o){e.e(o)}finally{e.f()}return 0===s.length?{valid:!0,errors:s}:{valid:!1,errors:s}}}},d=l,u=e("2877"),p=Object(u["a"])(d,a,o,!1,null,null,null);s["default"]=p.exports}}]);
//# sourceMappingURL=chunk-946e8072.c02933e3.js.map