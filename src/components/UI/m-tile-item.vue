<template>
    <div class="tiles">
          <div class="tile-item" v-for="item in items" :key="item.id">
              <div class="tile-item-head">
                  <h2>{{$t(item.title)}}</h2>
              </div>
              <div class="tile-item-body">
                  <p class="text-accent-1">
                      {{$t(item.details)}}
                  </p>
              </div>
          </div>
    </div>
</template>

<script>
export default {
    props:{
        items:{
            type: Array,
            required: true
        }
    }
}
</script>

<style>

</style>