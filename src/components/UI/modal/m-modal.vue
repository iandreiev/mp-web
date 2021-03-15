<template>
 <transition name="modal" >
    <div class="modal-overlay" id="modal">
      <div class="modal" :id="`modal-${id}`">
          <slot></slot>
      </div>
  </div>
 </transition>
</template>

<script>
export default {
  props:{
    id:String
  },
  data(){
    return{
            isVisible: false
    }
  }
}
</script>

<style>

</style>