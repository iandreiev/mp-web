<template>
  <div id="app" >
    <transition
    
      name="fade"
      mode="out-in"
      @beforeLeave="beforeLeave"
      @enter="enter"
      @afterEnter="afterEnter"
    >
      <router-view  />
    </transition>
   
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "",
    // all titles will be injected into this template
    titleTemplate: "%s | Monopoly Life",
  },
  data() {
    return {
      prevHeight: 0,
      locale: JSON.parse(localStorage.locale)
    };
  },
  methods: {
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = "auto";
    },
  },
  created() {
    if (screen.width <= 760) {
      this.$store.commit("IS_MOBILE", true);
    } else {
      this.$store.commit("IS_MOBILE", false);
    }
  },
  computed: {
    ...mapState(['showLangs'])
  },
  watch: {
    
  },
  mounted(){
this.$i18n.locale = this.locale
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}


</style>