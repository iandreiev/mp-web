<template>
  <div>
    <div class="tabs">
      <ul class="tabs-nav">
        <li
          class="tab"
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{ 'tab-active': tab.isActive }"
        >
          <a :href="tab.href" @click="selectTab(tab)">
            {{ tab.name }}
          </a>
        </li>
      </ul>
    </div>

    <div class="tabs-details">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [],
    };
  },
  created() {
    this.tabs = this.$children;
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach((tab) => {
        tab.isActive = tab.name == selectedTab.name;
      });
    },
  },
};
</script>

<style>
</style>