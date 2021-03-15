<template>
  <button :class="btnClass" :disabled="disabled"  @click="callback($event)">
      <slot></slot>
  </button>
</template>

<script>
export default {
    props:["btnClass", "disabled",],
    methods:{
        callback(e){
            this.$emit('click',e)
        }
    }
}
</script>

<style>

</style>