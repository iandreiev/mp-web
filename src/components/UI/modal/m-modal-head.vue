<template>
  <div class="modal-head">
      <div class="modal-box"></div>
      <div class="modal-logo--muted"></div>
      <div class="modal-close-wrapper" @click="$emit('close')">
          <label for="activeModal" class="ic-close">
              <input type="checkbox" v-model="ifVisible" name="" id="activeModal" >
              <div class="line line--1"></div>
              <div class="line line--2"></div>
          </label>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            ifVisible: false
        }
    },
    methods:{
        toggleModal(){
            this.ifVisible = !this.ifVisible

            console.log(this.ifVisible)
        }
    }
}
</script>

<style>

</style>