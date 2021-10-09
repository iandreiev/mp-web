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

export default {
  components:{
    MLoginModal,
    MNavbar,
    MFooter
  },
  mounted(){
    this.$store.commit('SHOW_LOGIN', true)
  }
}
</script>

<style>

</style>