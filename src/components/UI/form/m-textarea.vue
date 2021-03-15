<template>
<div class="bid-controller">
    <label :for="data.id">{{data.label}}</label>
  <textarea :name="data.name" :id="data.id" :placeholder="data.placeholder" v-on:input="$emit('input', $event.target.value)"></textarea>

</div>
</template>

<script>
export default {
    props:["data"]
}
</script>

<style>

</style>