<template>
  <div id="404-page" class="error-page">
          <h1>Идёт обновление сайта</h1>

      <!-- <div class="error-page-btn-wrapper">
    <MButton :btnClass="'btn btn-regular'" @click="toBack">{{$t('back')}}</MButton>
    <MButton :btnClass="'btn btn-flat'" @click="toHome">{{$t('toHome')}}</MButton>
      </div> -->

    <div class="error-man"></div>
    <div class="error-device"></div>
    <div class="error-locations"></div>
  </div>
</template>

<script>
import MButton from "../components/UI/m-button"

export default {
    components:{
        MButton
    },
    methods:{
        toBack(){
            this.$router.go(-1)
        },
        toHome(){
            this.$router.push({name:"Home"})
        }
    }
}
</script>

<style>

</style>