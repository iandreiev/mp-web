<template>
  <div id="login">
        <MNavbar />
     <MLoginModal />
    <MFooter />

  </div>
</template>

<script>
import MLoginModal from "../components/m-login";
import MNavbar from "../components/m-navbar";
import MFooter from "../components/m-footer";
import {mapState} from "vuex"

export default {
  components:{
    MLoginModal,
    MNavbar,
    MFooter
  },
  computed:{
    ...mapState(['auth'])
  },
  mounted(){
    
    if(!this.auth){
      this.$store.commit('SHOW_LOGIN', true)
    }
    else if(this.auth){
      this.$store.commit('SHOW_LOGIN', false)

    }
  }
}
</script>

<style>

</style>