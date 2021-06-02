<template>
  <div id="ip">
    {{user_ip}}
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
    ...mapState(["user_ip"])
  },
  mounted(){
  }
}
</script>

<style>

</style>