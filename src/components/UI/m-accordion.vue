<template>
  <div class="accordion" id="accoridon" role="presentation">
    <MAccordionItem
      v-for="item in content"
      :multiple="multiple"
      :item="item"
      :key="item.id"
      :groupId="groupId"
    ></MAccordionItem>
  </div>
</template>

<script>
import MAccordionItem from "../UI/m-accordion-item";

export default {
  components: {
    MAccordionItem,
  },
  props:{
      content:{
          type: Array,
          required: true
      },
      multiple:{
          type: Boolean,
          required: false
      }
  },
  data() {
    return {
      groupId: null,
    };
  },
  mounted() {
    this.groupId = this.$el.id;
  },
  methods: {
    toggle(event) {
      if (this.multiple) this.item.active = !this.item.active;
      else {
        this.$parent.$children.forEach((item, index) => {
          if (
            item.$el.id === event.currentTarget.parentElement.parentElement.id
          )
            item.item.active = !item.item.active;
          else item.item.active = false;
        });
      }
    },
  },
};
</script>

<style>
</style>