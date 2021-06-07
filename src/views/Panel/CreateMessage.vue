<template>
  <div id="user">
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
        <div id="create-message">
          <h2>{{$t('sendMsg')}}</h2>
          <div class="col-12">
            <div class="form-controller" id="form-create-chat">
              <input style="text-align: left;" type="text" name="title" id="title" :placeholder="$t('msgTitle')" v-model="chatData.chatTitle">

            </div>
            

            <div class="form-controller">
              <textarea
                class="full"
                name="problem"
                id="problem"
                :placeholder="$t('msgDescribe')"
                v-model="msgData.content"
                style="width:-webkit-fill-available;"
              ></textarea>
            </div>
            <!-- {{"ID: " + currentChatId}} -->

            <div class="h-f h-f-row-reverse">
              <MButton :btnClass="'btn btn-regular'" @click="createInstanceChatMsg"
                >{{$t('msgSend')}}</MButton
              >
              <MButton :btnClass="'btn-o btn-o-regular'" @click="cancel"
                >{{$t('cancel')}}</MButton
              >
            </div>

            <div class="user-verify" v-show="appSent == true">
              <div class="ic ic_check"></div>
              <p>{{$t('msgSent')}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MInputText from "../../components/UI/form/m-input-text";
import MButton from "../../components/UI/m-button";

export default {
   metaInfo() {
      return {title: this.$t('pMessages')}
    },
  components: {
    MInputText,
    MButton,
  },
  props: {
    routes: {
      type: Array,
      required: true,
    },
    user: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      text: null,
      problem: null,
      appSent: false,
      admin:77,
      chatCreated: false,
      currentChatId: null,
      showMiniNav: false,
      curPage:{
        icon: 'chat',
        title: 'Messages'
      },
      msgData: {
        content: null,
        userID: this.user.id,
        fromID: 77,
        chatID: null,
        type: 1,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      chatData: {
        type: 1,
        address: 77,
        chatTitle: null,
        userID: this.user.id,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
    };
  },
  methods: {
    getChats(){
      let options = {
        url: `${"chat/" + this.user.id}`,
      method: "get",
      }

      this.$http(options)
      .then(res=>this.$store.commit('SAVE_MESSAGES',res.data))
    },
        createInstanceChatMsg(){
      let createChat = {
        url:'chat',
        method:'post',
        data: this.chatData
      }


      let sendMessage = {
        url:'msg',
        method:'post',
        data: this.msgData
      }

    

      this.$http(createChat)
      .then((res)=>{
        this.msgData.chatID = res.data.id  
        console.log(this.msgData.chatID)
      })
      .then(()=>{
        this.$http(sendMessage)
        .then((res)=>{
          this.chatCreated = true
          console.log(res)
          this.$router.push({name: 'MessageItem', params:{id: this.msgData.chatID}, props:{id: this.msgData.chatID},})
          this.getChats()
        })
      })
      
    },



    cancel() {
      this.$router.go(-1);
    },
    showNavItems(){
      this.showMiniNav = !this.showMiniNav
    },
  },
};
</script>

<style>
</style>