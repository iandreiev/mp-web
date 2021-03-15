<template>
  <div class="mini-tiles">
      <div class="mini-tile-item">
          <div class="mini-tile-item-head">
              <h3 class="mini-tile-title">{{title}}</h3>
          </div>
          <div class="mini-tile-item-body">
              <slot></slot>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props:["title"]
}
</script>

<style>

</style>