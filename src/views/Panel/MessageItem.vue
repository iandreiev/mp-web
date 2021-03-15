<template>
  <div id="messages">
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
          <p class="text-dark">{{$t(curPage.title)}}</p>
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
        <div class="user-card-heading">
        <div class="ic-row">
            <div class="ic-arr-back"></div>
            <p class="text-accent-1 back-text" v-on:click="toBack">{{$t('back')}}</p>
        </div>
        <div class="row close-msg">
            <div class="user-verify" v-show="chatData[0].type == 2">
                 <div class="ic ic_check"></div>
                       <p>{{$t('msgClosed')}}</p>
            </div>
          <MButton :btnClass="'btn btn-regular'" v-show="chatData[0].type == 1 || chatData[0].type == 0" @click="toAppSolve">{{$t('msgClose')}}</MButton>

        </div>
        </div>
        <div class="messages-section">
          <div class="messages-header">
            <div class="messages-header-title">{{chatData[0].chatTitle}}</div>

            <div class="messages-meta">
              <div class="messages-meta-item">
                <p class="text-accent-1">{{$t('msgId')}}: {{id}}</p>
              </div>
              <div class="messages-meta-item">
                <p class="text-accent-1">{{$t('msgStatus')}}: </p>
                <p class="text-dark">{{chatData[0].type == 1 ? $t('open') : chatData[0].type == 2 ? $t('closed') : chatData[0].type == 0 ? "В ожидании ответа" : ""}}</p>
              </div>
            </div>
          </div>
          <div class="messages-wrapper">
            <div class="messages-item" :class="{'toMe-item': i.userID == user.id}" v-for="i in messages" :key="i.id">
              <div class="messages-bulb" :class="{ 'toMe': i.userID == user.id }">
                {{ i.content }}
              </div>
              <div class="messages-date">
                  <p class="text-accent-1">{{moment(i.createdAt).fromNow()}}</p>
              </div>
              <!-- <div class="messages-avatar">
                  <img :src="i.avatar" width="32" alt="">
              </div> -->
            </div>
          </div>
          <div class="messages-footer" v-show="chatData[0].type == 1 || chatData[0].type == 0">
            <textarea 
              name="typeMessage"
              id="typeMessage"
              :placeholder="$t('msgType')"
              v-model="msg"
            ></textarea>
            <MButton :btnClass="'btn btn-regular'" @click="sendMsg">{{$t('msgSend')}}</MButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MButton from "../../components/UI/m-button";
var moment = require("moment")

export default {
   metaInfo() {
      return {title: this.$t('pMessages')}
    },
  components: {
    MButton,
  },
  props: {
    routes: {
      type: Array,
      required: true,
    },
    id: {
      type: Number,
    },
    user: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
        appSolved: false,
        showBtn: true,
      moment: moment,
        status: 'Открыта',
        showMiniNav: false,
        msg:null,
      curPage:{
        icon: 'chat',
        title: 'Messages'
      },
      messages: [],
      chatData: []
    };
  },
  methods: {
      toAppSolve(){
          
          let options = {
            url: `${"chat/setType/"+this.id}`,
            method:"patch"
          }

          let reloadChat = {
            url: `${"chat/current/"+this.id}`,
            method: "get"
          }

          this.$http(options)
          .then((res)=>{
            console.log(res.data)
            this.$http(reloadChat)
            .then((res)=>{
              this.chatData = res.data
            })
          })

      },
      sendMsg(){

        let dataMsg = {
          content: this.msg,
          userID:  this.user.id, 
          fromID: 77, 
          chatID: this.id,
          type: 1
        }
 
        let options = {
          url: `${"msg"}`,
          method: "post",
          data: dataMsg
        }

        let reload = {
           url: "msg/user/chat/" + this.id,
      method: "get"
        }

        this.$http(options)
        .then((res)=>{
          
          this.$http(reload)
          .then((res)=>{
            this.messages = res.data

            this.msg = null
          })
        })

      },
      toBack(){
          this.$router.go(-1)
      },
      showNavItems(){
      this.showMiniNav = !this.showMiniNav
    },
    
  },
  computed:{
    ...mapState(["locale"])
  },
  mounted(){

    let options = {
      url: `${"msg/user/chat/" + this.id}`,
      method: "get"
    }

    let getChat = {
      url: `${"chat/current/"+this.id}`,
            method: "get"
    }

    this.$http(getChat)
    .then((res)=>{
      this.chatData = res.data
    })

    this.$http(options)
    .then((res)=>{
      this.messages = res.data
    })
  }
};
</script>

<style>
</style>