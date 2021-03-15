<template>
  <div class="progressbar">
      <div class="progressbar-line" :style="{'width':`${length}%`}"></div>
  </div>
</template>

<script>
export default {
    props:["length"]
}
</script>

<style>

</style>