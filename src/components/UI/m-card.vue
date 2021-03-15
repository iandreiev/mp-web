<template>
  <div :class="`card ${cardClass}`">
      <slot></slot>
  </div>
</template>

<script>
export default {
    props:["cardClass"]
}
</script>

<style>

</style>