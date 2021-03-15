<template>
  <div id="about-page">
    <MNavbar />

    <MSection :id="'questions'">
      <MTileItem :items="questions" />
    </MSection>

    <MSection :id="'about-cta'">
      <div class="row" v-if="isMobile == false">
        <div class="col-6 baseline-content">
         <h2 v-html="$t('aboutCTA')"></h2>
          <MButton :btnClass="`btn btn-regular`" @click="toProjects">{{ $t("aboutBtn") }}</MButton>
        </div>
        <div class="col-6 flex-end-content">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/webfontshost.appspot.com/o/Monopoly%2Fblueman.svg?alt=media&token=6aea7e9d-153b-484f-9c88-b24291510601"
            alt=""
          />
        </div>
      </div>
      <div class="row" v-if="isMobile == true">
        <div class="col-12" style="display:flex; flex-direction:column;justify-content:center;padding: 8px; text-align: center;">
            <i18n path="aboutCTA" tag="h2">
              <br>
            </i18n>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/webfontshost.appspot.com/o/Monopoly%2Fblueman.svg?alt=media&token=6aea7e9d-153b-484f-9c88-b24291510601"
            alt=""
          />
          <MButton :btnClass="`btn btn-regular`" @click="toProjects">{{ $t("aboutBtn") }}</MButton>
        </div>
      </div>
    </MSection>

    <MFooter />
  </div>
</template>

<script>
import MSection from "../components/UI/m-section";
import MNavbar from "../components/m-navbar";
import MButton from "../components/UI/m-button";
import MFooter from "../components/m-footer";
import MTileItem from "../components/UI/m-tile-item";
import { mapState } from "vuex";

export default {
  metaInfo: {
    title: "О проекте",
  },
  components: {
    MSection,
    MNavbar,
    MFooter,
    MTileItem,
    MButton,
  },

  data() {
    return {
      questions: [
        {
          id: 1,
          title: "chooseBusinessTitle",
          details: "chooseBusinessText",
        },
        {
          id: 2,
          title: "diversificationTitle",
          details: "diversificationText",
        },
        {
          id: 3,
          title: "paymentTitle",
          details: "paymentText",
        },
        {
          id: 4,
          title: "incomeTitle",
          details: "incomeText",
        },
        {
          id: 5,
          title: "speculationTitle",
          details: "speculationText",
        },
        {
          id: 6,
          title: "risksTitle",
          details: "risksText",
        },
      ],
    };
  },
  computed: {
    ...mapState(["isMobile"]),
  },
  methods:{
    toProjects(){
      this.$router.push({name:'Projects'})
    }
  }
};
</script>

<style >
.only-mobile-about {
  display: flex;
  text-align: center;
}
</style>