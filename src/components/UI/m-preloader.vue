<template>
    <div class="preloader" v-if="isLoading == false">
        <div class="preloader-logo"></div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data(){
        return{
            
        }
    },
    props:{},
    computed:{
        ...mapState(["isLoading"])
    },
    mounted(){
         document.onreadystatechange = () => {
        if (document.readyState == "complete") { 
          this.$store.commit("IS_LOADING", true)
        } 
      }
    }    
}
</script>