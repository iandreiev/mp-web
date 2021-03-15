<template>
  <div id="user user-affilate">
    <div class="user-container">
        <div class="user-sidebar">
             <ul class="user-sidebar-nav">
          <router-link
            v-for="(item, index) in routes"
            :key="index"
            :to="item.path"
            v-slot="{ href, navigate, isActive, isExactActive }"
          >
            <li
              @click="navigate"
              :href="href"
              class="user-sidebar-nav-item"
              :class="[
                isActive && 'user-sidebar-nav-item--active',
                isExactActive && 'user-sidebar-nav-item--exact-active',
              ]"
            >
              <span
                :class="
                  (isActive && `ic ic_${item.icon} ic--active`) ||
                  `ic ic_${item.icon} `
                "
              ></span>
              <!-- <a :href="href" >{{ $t(item.title) }}</a> -->
              {{$t(item.title)}}
              
            </li>
          </router-link>
        </ul>
        </div>
         <!-- Dropdown start -->

      <div class="dropdown-nav" @click="showMiniNav = !showMiniNav">
        <div class="dropdown-nav-choose-current">
          <div class="dropdown-nav-current">
          <div :class="`ic ic_${curPage.icon}`"></div>
          <p class="text-dark">{{curPage.title}}</p>
        </div>
        <div class="ic ic_arrow_down" :class="{'ic_arrow_down-active' : showMiniNav}"></div>
        </div>
      </div>
      <div class="dropdown-nav-items" :class="{'dropdown-nav-items--active':showMiniNav}">
        <ul>
           <router-link
            v-for="(item, index) in routes"
            :key="index"
            :to="item.path"
            v-slot="{ href, navigate, isActive, isExactActive }"
          >
            <li
              class="user-sidebar-nav-item"
              :class="[
                isActive && 'user-sidebar-nav-item--active',
                isExactActive && 'user-sidebar-nav-item--exact-active',
              ]"
            >
              <span
                :class="
                  (isActive && `ic ic_${item.icon} ic--active`) ||
                  `ic ic_${item.icon} `
                "
              ></span>
              <a :href="href" @click="navigate">{{ $t(item.title) }}</a>
            </li>
          </router-link>
        </ul>
      </div>
      <!-- Dropdown end -->
        <div class="user-card">
            <div class="row catalogue-column">
                <div class="col-6">
                    <img src="https://firebasestorage.googleapis.com/v0/b/webfontshost.appspot.com/o/Monopoly%2FgetMoney.svg?alt=media&token=0fb3d9e7-3a6c-4564-a40c-7179e7e38ef0" alt="">
                </div>
                <div class="col-6">
                    <h2>
                        {{$t('affilateTitle')}}
                    </h2>
                    <div class="sized-box"></div>
                    <p class="text-accent-1">{{$t('affilateDescribe')}}</p>
                    <div class="sized-box"></div>
                    <div class="row catalogue-column">
                        <p class="promo-code">{{user.email}}</p>
                        <input type="hidden" name="" :value="user.email" id="affilate">
                        <MButton :btnClass="'btn btn-regular'" @click="copy">{{$t('copy')}}</MButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import MButton from "../../components/UI/m-button.vue"
import MInputText from "../../components/UI/form/m-input-text"

import {Base64} from "js-base64"
export default {
         metaInfo() {
      return {title: this.$t('pAffilate')}
    },
    components:{
        MButton,
        MInputText
    },
props:{
    routes:{
        type: Array,
        required: true
    },
    borderProfile:{
        type:Boolean
    },
    borderLogout:{
        type:Boolean
    },
    user:{
        type: Object,
        required: true
    }
},

data(){
    return{
         showMiniNav: false,
      curPage:{
        icon: 'affilate',
        title: 'Affilate Program'
      }
    }
},
methods:{
    showNavItems(){
      this.showMiniNav = !this.showMiniNav
    },
    copy(){
        let toCopy = document.querySelector('#affilate');

        toCopy.setAttribute('type','text')
        toCopy.select();

        try{
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccesful';
            alert(`Code copied! ${msg}`) 
        } catch(err) {
            alert('Oops.. Unable to copy')
        }

        toCopy.setAttribute('type','hidden')
        window.getSelection().removeAllRanges()
}
},


}
</script>

<style>

</style>