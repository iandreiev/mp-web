<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="(item, index) in table" :key="index">
          {{ item.title }}
        </th>
      </tr>
    </thead>
    <tbody>
        <slot></slot>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    table: {
      type: Array,
      required: false,
    },
  },
};
</script>

<style>
</style>