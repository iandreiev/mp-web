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
  
  },
  mounted(){
  
  }
}
</script>

<style>

</style>