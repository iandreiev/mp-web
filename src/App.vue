<template>
  <div id="app">
    <transition
    name="fade"
      mode="out-in"
      @beforeLeave="beforeLeave"
      @enter="enter"
      @afterEnter="afterEnter"
    >
      <router-view />
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from "vuex";
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "",
    // all titles will be injected into this template
    titleTemplate: "%s | Monopoly Life",
  },
  data() {
    return {
      prevHeight: 0,
      locale: JSON.parse(localStorage.locale),
    };
  },
  methods: {
    getSetup() {
      let getSetup = {
        url: "setup",
        method: "get",
      };

      this.$http(getSetup).then((res) => {
        this.$store.commit("SAVE_SETUP", res.data);

        this.getToken();
      });
    },
    getToken() {
      const PAY_API = "https://api.staging.iserverbot.ru/v1/";
      const REFRESH_TOKEN = this.setup[0].wallet;

      let options = {
        url: `${PAY_API}auth/access-token`,
        method: "post",
        headers: {
          Authorization: `Bearer ${REFRESH_TOKEN}`,
        },
      };

      axios(options)
        .then((res) => {
          this.$store.commit("REFRESH_TOKEN", res.data.access_token);
        })
        .catch((err) => console.log(err));
    },
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = "auto";
    },
    checkIfUserBanned(){
      let options = {
        url: `users/${this.$store.state.user.userID}`,
        method:'get'
      }

      this.$http(options)
      .then(res=>{
        let data = res.data
        if(data.role != 3){
          this.$store.commit('SAVE_USER',res.data)
        }
        if(data.role == 3){
          this.$store.commit('logout')
          alert('Вы нарушили правила сервиса Ваш аккаунт заблокирован. По всем вопросам обращаться к администрации сервиса')
          this.$router.push({name: 'Home'})
        }
      })

    }
  },
  created() {
    if (screen.width <= 760) {
      this.$store.commit("IS_MOBILE", true);
    } else {
      this.$store.commit("IS_MOBILE", false);
    }
  },
  computed: {
    ...mapState(["showLangs", "setup", "accessToken", "auth"]),
  },
  watch: {},
  mounted() {
    this.$store.dispatch("getUserIP");
    this.$i18n.locale = this.locale;
    this.getSetup();

    if(this.auth == true){
          setInterval(()=>{
      this.checkIfUserBanned()
      
    },30*1000)
    }
},
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>