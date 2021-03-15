<template>
  <div id="catalogue-page">
      <MNavbar />
    <MSection :id="'catalogue-inner'">
        <h1 class="text-heading">{{$t('projects')}}</h1>
        
           <div class="categories-wrapper">
        <ul class="categories-items">
          <li class="categories-item" v-for="item in categories" :key="item.id" @click="toCat(item.id)">{{locale == 'en-gb' ? item.title_en : locale == 'ru' ? item.title : locale == 'zh-cn' ? item.title_ch : "Unknown"}}</li>
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
import {mapState} from "vuex"


export default {
         metaInfo() {
      return {title: this.$t('Projects')}
    },
    components:{
        MSection,
        MNavbar,
        MButton,
        MFooter,
        MProjectCard
    },
    data(){
        return{
                 
        }
    },
    computed:{
      ...mapState(["projects","categories","locale", "isMobile"]),
    },
    methods:{
       toCat(obj){
      this.$router.push({name: 'CategoryPageProjects', params:{id:obj}})
    },
    },
    mounted(){
// let getProjects = {
//       url: "projects",
//       method: "get"
//     }

//     let getCategories = {
//       url: "categories",
//       method:"get"
//     }

//     axios(getProjects)
//     .then((res)=>{
//       this.projects = res.data
//     })
//      axios(getCategories)
//     .then((res)=>{
//       this.cats = res.data
//     })
    }
}
</script>

<style scoped>
  .text-heading{
    text-align:center;
  }
</style>