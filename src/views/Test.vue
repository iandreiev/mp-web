<template>
  <div id="ip">
    <!-- {{user_ip}} -->
    {{getListOfMessages}}
    {{getListOfNotifications}}
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  data(){
    return{
    }
  },
  computed:{
    ...mapActions(['getUserIP']),
    ...mapState(["user_ip",'user', 'auth', 'notifications', 'messages']),
    getListOfMessages(){
      let msgs = this.messages

      return msgs.filter(i=>i.type == 1).length
    },
    getListOfNotifications(){
      let nots = this.notifications

      return nots.filter(i=>i.type == 1).length
    }
  },
  methods:{
    getMessages(){
      this.$store.dispatch('getUserMsgs', this.user.userID)
    },
    getNots(){
      this.$store.dispatch('getUserNots', this.user.userID)
    }
  },
  mounted(){
    this.getMessages()
    this.getNots()
  }
}
</script>

<style>

</style>