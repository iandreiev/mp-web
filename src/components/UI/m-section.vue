<template>
  <div class="container whitespace" :id="id">
      <slot></slot>
  </div>
</template>

<script>
export default {
    props:["id"]
}
</script>

<style>

</style>