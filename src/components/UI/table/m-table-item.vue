<template>
  <div>
    <tr v-for="(item, index) in item" :key="index">
      <td>{{ item.createdAt }}</td>
      <td>{{ item.topic }}</td>
      <td>{{ item.status }}</td>
      <td>{{ item.id }}</td>
    </tr>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Array,
      required: false,
    },
  },
};
</script>

<style>
</style>