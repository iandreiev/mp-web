<template>
  <div id="catalogue-page">
    <MNavbar />
    <MSection :id="'catalogue-inner'">
      <div class="sizedbox"></div>
     <div v-for="i in categories" :key="i.id">
            <h1 class="catalogue-heading">
              {{
                id == i.id
                  ? locale == "en-gb"
                    ? i.title_en
                    : locale == "ru"
                    ? i.title
                    : locale == "zh-cn"
                    ? i.title_ch
                    : "Unknown"
                  : ""
              }}
            </h1>
          </div>
      <div class="empties" v-if="Object.keys(projects).length == 0">
        <h1 class="text-accent-1">{{$t('noProjectsInCat')}}</h1>
      </div>
      <div class="row catalogue-column" v-else>
        <MProjectCard
          v-for="i in projects"
          :key="i.id"
          :id="i.id"
          :title="i.title"
          :title_en="i.title_en"
          :title_ch="i.title_ch"
          :category="i.category"
          :projectBrief="i.projectBrief"
          :projectBrief_en="i.projectBrief_en"
          :projectBrief_ch="i.projectBrief_ch"
          :image="i.image"
          :location="i.location"
          :location_en="i.location_en"
          :location_ch="i.location_ch"
          :funded="i.funded"
          :pledged="i.pledged"
          :backers="i.backers"
          :createdAt="i.createdAt"
          :entrance="i.entrance"
          :annual="i.annual"
          :return="i.return"
          :cost="i.cost"
        />
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
import MProjectCard from "../components/m-project-card";
import { mapState } from 'vuex';

export default {
   metaInfo() {
      return {title: this.$t('Projects')}
    },
  components: {
    MSection,
    MNavbar,
    MButton,
    MFooter,
    MProjectCard,
  },
  data() {
    return {
      projects: [],
      id: this.$route.params.id
    };
  },
  computed: mapState(["categories","locale"]),
  mounted(){
    let options = {
      url: `projects/cat/${this.id}`,
      method: "get"
    }

    this.$http(options)
    .then((res)=>{
      this.projects = res.data
    })
  }
};
</script>

<style lang="scss">
@media  screen and (min-width:360px) and (max-width: 767px){
.sizedbox{
  display: block;
  height: 60px;
}
}

</style>