<template>
  <div id="home" class="homepage">
    <MPreloader />
    <MNavbar />
    <MSection :id="'slider'">
      <MSlider :data="slider" />
    </MSection>
    <MSection :id="'projects'">
      <div class="row">
        <MHeading>
          <h1>{{$t('projects')}}</h1>
            <p class="text-accent-1 subheading">
              {{$t('projectLeading')}}
            </p>
        </MHeading>
      </div>

      <div class="categories-wrapper">
        <ul class="categories-items">
          <li class="categories-item" v-for="item in categories" :key="item.id" @click="toCat(item.id)">{{locale == 'en-gb' ? item.title_en : locale == 'ru' ? item.title : locale == 'zh-cn' ? item.title_ch : "Unknown"}}</li>
        </ul>
      </div>

      <div class="row catalogue-column flex-wrap" id="catalogue">
        <MProjectCard
          v-for="i in projects.slice(0,4)"
          :key="i.id"
          :id="i.id"
          :title="i.title"
          :title_en="i.title_en"
          :title_ch="i.title_ch"
          :category="i.category"
          :description="i.description"
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
      <div class="btn-sector--center">
        <MButton :btnClass="`btn btn-regular`" @click="toProjects" >{{$t('view')}}</MButton>
      </div>
    </MSection>
    <MSection :id="'how-it-works'">
      <div class="row catalogue-column">
        <MHeading>
          <h1>{{$t('landingTitleHowItWorks')}}</h1>
        </MHeading>
      </div>
      <div class="row catalogue-column">
        <div class="col-6 business-info">
          <h1>{{$t('whatIsCroudfundingTitle')}}</h1>
          <p>
            {{$t('whatIsCroudfundingText')}}
          </p>
        </div>
        <div class="col-6 ">
          <div class="video-wrapper">
            <div class="c-btn" v-show="paused" v-if="isMobile == false">
              <div class="c-btn-wrapper">
                <div  class="c-btn-wrapper-ic ic_play"></div>
                <!-- <div v-show="play" class="c-btn-wrapper-ic ic_check"></div> -->
              </div>
            </div>
            <video @canplay="updatePaused" @playing="updatePaused" @pause="updatePaused" src="https://firebasestorage.googleapis.com/v0/b/monopoly-31fb9.appspot.com/o/Monopoly_prew_2%20(1).mp4?alt=media&token=3ac645ea-e4e4-4b0c-9cc6-e75d1e30d8b3" controls></video>
          </div>
        </div>
      </div>

      <div class="comp-reversed">
        <div class="comp-1"></div>
      </div>

      <div class="row catalogue-column">
        <div class="col-6">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/webfontshost.appspot.com/o/Monopoly%2Fpeople_phone.svg?alt=media&token=de8fa17c-0767-49bc-b987-4614698b1e73"
            alt=""
          />
        </div>
        <div class="col-6 business-info">
          <h1>{{$t('buyShareInProjectTitle')}}</h1>
          <p>
            {{$t('buyShareInProjectText')}}
          </p>
        </div>
      </div>
      <div class="comp">
        <div class="comp-2"></div>
      </div>

      <div class="row catalogue-column">
        <div class="col-6 business-info order-2">
          <h1>{{$t('depositMoneyTitle')}}</h1>
          <p>
           {{$t('depositMoneyText')}}
          </p>
        </div>
        <div class="col-6 order-1">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/webfontshost.appspot.com/o/Monopoly%2Fpeople_grow.svg?alt=media&token=f80c90ff-b205-4534-81b7-1b627787c876"
            alt=""
          />
        </div>
      </div>
      <div class="comp">
        <div class="comp-3"></div>
      </div>
      <div class="row catalogue-column" v-if="isMobile == false">
        <div class="col-6 order-2">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/webfontshost.appspot.com/o/Monopoly%2Fpeople_happy.svg?alt=media&token=02a0f210-743b-4754-8021-0e38e78b71e4"
            alt=""
          />
        </div>
        <div class="col-6 business-info order-1">
          <h1> {{$t('getPassiveTitle')}}</h1>
          <p>
            {{$t('getPassiveText')}}
          </p>
        </div>
      </div>
       <div class="row catalogue-column" v-if="isMobile == true">
        <div class="col-6 order-1">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/webfontshost.appspot.com/o/Monopoly%2Fpeople_happy.svg?alt=media&token=02a0f210-743b-4754-8021-0e38e78b71e4"
            alt=""
          />
        </div>
        <div class="col-6 business-info order-2">
          <h1> {{$t('getPassiveTitle')}}</h1>
          <p>
            {{$t('getPassiveText')}}
          </p>
        </div>
      </div>
            <div class="comp">
        <div class="comp-2"></div>
      </div>
      <div class="row catalogue-column">
         <div class="col-6 business-info order-2">
          <h1> {{$t('areYouReadyEmpireTitle')}}</h1>
          <p>
           {{$t('areYouReadyEmpireText')}}
          </p>
          <div class="section-button">
            <MButton :btnClass="'btn btn-regular'" @click="toProjects">{{$t('chooseBusiness')}}</MButton>
          </div>
        </div>
        <div class="col-6 order-1">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/webfontshost.appspot.com/o/Monopoly%2Fpeople_build.svg?alt=media&token=b39f646a-7707-46f5-9d76-0dc3fa8403ac"
            alt=""
          />
        </div>
       
       
      </div>
    </MSection>

    <MFooter />
  </div>
</template>

<script>
import MNavbar from "../components/m-navbar";
import MButton from "../components/UI/m-button";
import MHeading from "../components/UI/m-heading";
import MSection from "../components/UI/m-section";
import MProjectCard from "../components/m-project-card";
import MFooter from "../components/m-footer";
import MSlider from "../components/m-slider-touch";
import MPreloader from "../components/UI/m-preloader"

import axios from "axios"
import { mapState } from 'vuex';

export default {
  metaInfo() {
      return {title: this.$t('Home')}
    },
  components: {
    MSlider,
    MButton,
    MNavbar,
    MSection,
    MProjectCard,
    MHeading,
    MFooter,
    MPreloader
  },
  data() {
    return {
      cats:[],
      videoElement:null,
      paused:null,
      lang: JSON.parse(localStorage.locale),
      slider:[],
      slides: [
     
        {
          id: 1,
          title: "slide1Title",
          leading: "slide1Text",
          image:
            "https://firebasestorage.googleapis.com/v0/b/webfontshost.appspot.com/o/Monopoly%2Fposter-1-min.png?alt=media&token=1d8e09fa-8967-45f7-981c-eee15602f3bc",
        },
        {
          id: 2,
          title: "slide2Title",
          leading:
            "slide2Text",
          image:
            "https://firebasestorage.googleapis.com/v0/b/webfontshost.appspot.com/o/Monopoly%2Fposter-2-min.png?alt=media&token=6b801f59-c263-4a2c-86c7-ca9d264c4f6d",
        },
           {
          id: 3,
          title: `slide3Title`,
          leading: `slide3Title`,
          image:
            "https://firebasestorage.googleapis.com/v0/b/webfontshost.appspot.com/o/Monopoly%2Fposter-3-min.png?alt=media&token=a6eabe14-600a-4697-acb2-05b33b0fff91",
        },
        
      ],
      
    };
  },
  methods:{
   
    updatePaused(event){
      this.videoElement = event.target;
      this.paused = event.target.paused;
    },
    play(){
      this.videoElement.play();
    },
    pause(){
      this.videoElement.pause();

    },
    setCat(id){
      let data = this.categories 

      return data.forEach(function(item){
        if(id == item.id){
          return item.title
        } else {}
      })
    },
    toProjects(){
      this.$router.push({name:'Projects'})
    },
    toCat(obj){
      this.$router.push({name: 'CategoryPageProjects', params:{id:obj}})
    },
    getSlides(){
      let options = {
        url: 'slider',
        method:'get'
      }

      this.$http(options)
      .then(res=>this.slider = res.data)
    }
  
  },
  mounted(){
    this.getSlides()
      let getProjects = {
      url: "projects",
      method: "get"
    }

    let getCategories = {
      url: "categories",
      method:"get"
    }

    let getSetup = {
      url: "setup",
      method: "get"
    }

      this.$http(getProjects)
    .then((res)=>{
      this.$store.commit("SAVE_PROJECTS", res.data)

    })
     this.$http(getCategories)
    .then((res)=>{
            this.$store.commit("SAVE_CATEGORIES", res.data)

    })
  },
  computed:{
    ...mapState(["projects","categories","locale", "isMobile", "setup"]),
    playing(){
      return !this.paused;
    },
  },
  
  
};
</script>

<style lang="scss">
  .flex{
    &-wrap{
      flex-wrap: wrap;
    }
  }
  .col-6{
    width: 48%;
  }
</style>