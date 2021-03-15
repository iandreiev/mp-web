<template>
  <div :class="`modal-footer ${position}`">
      <slot></slot>
  </div>
</template>

<script>
export default {
    props:["position"]
}
</script>

<style>

</style>