<template>
  <div id="catalogue-page">
    <MNavbar />
    <MSection :id="'catalogue-inner'">
      <h1 class="text-heading">{{ $t('projects') }}</h1>

      <div class="categories-wrapper">
        <ul class="categories-items">
          <li
            class="categories-item"
            v-for="item in categories"
            :key="item.id"
            @click="toCat(item.id)"
          >{{ locale == 'en-gb' ? item.title_en : locale == 'ru' ? item.title : locale == 'zh-cn' ? item.title_ch : "Unknown" }}</li>
        </ul>
      </div>

      <div class="row catalogue-column">
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
import MProjectCard from "../components/m-project-card"

import axios from "axios"
import { mapState } from "vuex"


export default {
  metaInfo() {
    return { title: this.$t('Projects') }
  },
  components: {
    MSection,
    MNavbar,
    MButton,
    MFooter,
    MProjectCard
  },
  methods: {
    updatePaused(event) {
      this.videoElement = event.target;
      this.paused = event.target.paused;
    },
    play() {
      this.videoElement.play();
    },
    pause() {
      this.videoElement.pause();

    },
    setCat(id) {
      let data = this.categories

      return data.forEach(function (item) {
        if (id == item.id) {
          return item.title
        } else { }
      })
    },
    toProjects() {
      this.$router.push({ name: 'Projects' })
    },
    toCat(obj) {
      this.$router.push({ name: 'CategoryPageProjects', params: { id: obj } })
    },
    getSlides() {
      let options = {
        url: 'slider',
        method: 'get'
      }

      this.$http(options)
        .then(res => this.slider = res.data)
    }

  },
  mounted() {
    this.getSlides()
    let getProjects = {
      url: "projects",
      method: "get"
    }

    let getCategories = {
      url: "categories",
      method: "get"
    }

    let getSetup = {
      url: "setup",
      method: "get"
    }

    this.$http(getProjects)
      .then((res) => {
        this.$store.commit("SAVE_PROJECTS", res.data)

      })
    this.$http(getCategories)
      .then((res) => {
        this.$store.commit("SAVE_CATEGORIES", res.data)
      })

  },
  computed: {
    ...mapState(["projects", "categories", "locale", "isMobile", "setup"]),
    playing() {
      return !this.paused;
    },
  },
}
</script>

<style scoped>
.text-heading {
  text-align: center;
}
</style>