
<template>
  <div id="email-verification">
    <p>Status: {{status}}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
     metaInfo() {
      return {title: this.$t('pMail')}
    },
  data() {
    return {
      encodedEmail: "",
      status: "Подтверждаем Email",
    };
  },
  props: {},
  components: {},
  mounted() {
    this.encodedEmail = this.$route.params.encodedEmail;
    let mail = window.atob(this.encodedEmail)

    let options = {
      url: `mail/approve/${mail}`,
      method: "get"
      
    };
    this.$http(options).then((res) => {
      if (res.data.kind == "ok") {
        this.status = "Email подтверждён";
        let getUser = {
          url: `users/getUser/${this.user.userID}`,
          method: "get",
        };

        this.$http(getUser).then((res) => {
          this.$store.commit("SAVE_USER", res.data);
        });
          this.$router.push({name: "Home"})

      } else {
          this.status = 'Произошла нетипичная ошибка'
          console.log(res)
      }
    })
    .catch((err)=>{
        this.status = err
        console.log(err)
    })
  },
  computed: {
      ...mapState(["user","auth"])
  },
  methods: {
    decodeLink(email) {
      return window.atob(email);
    },
  },
  created() {},
};
</script>