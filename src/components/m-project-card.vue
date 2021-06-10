<template>
  <div class="col-6 h-m-b-2" v-on:click="toProject">
    <MCard :cardClass="'card-light'" >
      <div class="card-container">
        <div class="card-meta">
          <div v-for="i in filteredCats(category)" :key="i.id">
          <p>{{locale == 'en-gb' ? i.title_en : locale == 'ru' ? i.title : locale == 'zh-cn' ? i.title_ch : "Unknown"}}</p>
          </div>
          <div class="row location-row">
            <div class="ic ic_location"></div>
          <p>{{locale == 'en-gb' ? location_en : locale == 'ru' ? location : locale == 'zh-cn' ? location_ch : "Unknown"}}</p>

          </div>
        </div>
      </div>
      <div class="card-container">
        <h2>{{locale == 'en-gb' ? title_en : locale == 'ru' ? title : locale == 'zh-cn' ? title_ch : "Unknown"}}</h2>
        <p>{{$t('createdAt') + ": " + moment(createdAt).fromNow()}}</p>
      </div>

      <img
        class="card-image"
        :src="image"
        alt=""
      />
      <div class="card-container">
        <p>{{locale == 'en-gb' ? substrText(projectBrief_en, 0, 200) : locale == 'ru' ? substrText(projectBrief, 0, 200) : locale == 'zh-cn' ? substrText(projectBrief_ch, 0, 200) : "Unknown"}}</p>
      </div>
      <div class="card-container">
        <MProgressBar :length="projectProgress(funded,cost)" />
      </div>
      <div class="card-container">
        <div class="card-business-meta">
          <div class="card-business-meta-item">
            <div class="row">
              <b>{{funded}}</b>
              <div class="ic ic_mnp"></div>
            </div>

            <p>{{$t('funded')}}</p>
          </div>
          <div class="card-business-meta-item">
            <div class="row">
              <b>{{pledged}}</b>
              <div class="ic ic_mnp"></div>
            </div>
            <p>{{$t('pledged')}}</p>
          </div>
          <div class="card-business-meta-item">
            <b>{{backers}}</b>
            <p>{{$t('backers')}}</p>
          </div>
         
          <div class="card-business-meta-item">
            <div class="row">
            <b>{{entrance}}</b>
                            <div class="ic ic_mnp"></div>

            </div>
            <p>{{$t('entrance')}}</p>
          </div>
        </div>
      </div>
    </MCard>

    
  </div>
</template>

<script>
var moment = require("moment")
import MCard from "../components/UI/m-card"
import MProgressBar from "../components/UI/m-progressbar"
import MButton from "../components/UI/m-button"
import { mapState } from 'vuex'

const URL = "https://us-central1-monopoly-life.cloudfunctions.net/app/"

export default {
    props:["id","title", "title_ch", "title_en", "annual","returns","cost","category","showModal","location", "location_ch", "location_en", "image","projectBrief_en", "projectBrief_ch", "projectBrief","funded","pledged","backers","createdAt","entrance"],
    components:{
        MCard,
        MProgressBar,
        MButton,
      
    },
    data(){
      return{
        cats:[],
         range: null,
        percentage: null,
        sharingSize: null,
        moment:moment,
        pageData:{
          id: this.id,
          title: this.title,
          title_en: this.title_en,
          title_ch: this.title_ch,
          category: this.category,
          location: this.location,
          location_en: this.location_en,
          location_ch: this.location_ch,
          image: this.image,
          description: this.description,
          funded: this.funded,
          pledged: this.pledged,
          backers: this.backers,
          createdAt: this.created_at,
          entrance: this.entrance,
          returns: this.returns,
          annual:this.annual,
          cost: this.cost
        }
      }
    },
    methods:{
      substrText(text,from,to){
        return text.substring(from,to)+'...'
      },
      projectProgress(funded,cost){
        return (funded/cost)*100 > 100 ? (cost/cost)*100 : (funded/cost)*100
      },
       toProject(){
        this.$router.push({name: 'ProjectItem', params:{id: this.id, data:this.pageData}, props:{data:this.pageData}})
      },
       modalOpen(){
        this.showModal = true
      },
      modalClose(){
        this.showModal = false
      },    
       filteredCats(id){
      let cats = this.categories

      return cats.filter(cats => cats.id === id)
    }
    },
    
    computed:{
      ...mapState(["categories","locale"]),
   

    },
    
};
</script>

<style lang="scss">
.h-m-b-2{
  margin-bottom: 15px;
}

.catalogue-panel-column{
  .col-6{
    margin: 8px;
  }
}
</style>