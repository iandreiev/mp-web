<template>
  <div id="user-projects user-projects-page">
    <div class="user-container">
        <div class="user-sidebar">
             <ul class="user-sidebar-nav">
          <router-link
            v-for="(item, index) in routes"
            :key="index"
            :to="item.path"
            v-slot="{ href, navigate, isActive, isExactActive }"
          >
            <li
              @click="navigate"
              :href="href"
              class="user-sidebar-nav-item"
              :class="[
                isActive && 'user-sidebar-nav-item--active',
                isExactActive && 'user-sidebar-nav-item--exact-active',
              ]"
            >
              <span
                :class="
                  (isActive && `ic ic_${item.icon} ic--active`) ||
                  `ic ic_${item.icon} `
                "
              ></span>
              <!-- <a :href="href" >{{ $t(item.title) }}</a> -->
              {{$t(item.title)}}
              
            </li>
          </router-link>
        </ul>
        </div>
        <!-- Dropdown start -->

      <div class="dropdown-nav" @click="showMiniNav = !showMiniNav">
        <div class="dropdown-nav-choose-current">
          <div class="dropdown-nav-current">
          <div :class="`ic ic_${curPage.icon}`"></div>
          <p class="text-dark">{{$t(curPage.title)}}</p>
        </div>
        <div class="ic ic_arrow_down" :class="{'ic_arrow_down-active' : showMiniNav}"></div>
        </div>
      </div>
      <div class="dropdown-nav-items" :class="{'dropdown-nav-items--active':showMiniNav}">
        <ul>
           <router-link
            v-for="(item, index) in routes"
            :key="index"
            :to="item.path"
            v-slot="{ href, navigate, isActive, isExactActive }"
          >
            <li
              class="user-sidebar-nav-item"
              :class="[
                isActive && 'user-sidebar-nav-item--active',
                isExactActive && 'user-sidebar-nav-item--exact-active',
              ]"
            >
              <span
                :class="
                  (isActive && `ic ic_${item.icon} ic--active`) ||
                  `ic ic_${item.icon} `
                "
              ></span>
              <a :href="href" @click="navigate">{{ $t(item.title) }}</a>
            </li>
          </router-link>
        </ul>
      </div>
      <!-- Dropdown end -->
        <div class="user-card" id="user-projects ">
           <MTabs>
               <MTabItem :selected="true" :name="$t('active')">
                  <div class="empties" v-if="Object.keys(userprojects).length == []">
                <p class="text-accent-1">{{$t('emptyProjects')}}</p>
                <router-link class="btn btn-regular" :to="{name: 'Projects'}">{{$t('viewProjects')}}</router-link>
              </div>
                    <div class="row catalogue-panel-column" v-else>
               <MProjectCard 
               v-for="(i,index) in filteredProjects(1)"
               :projType="1"
          :key="index"
          :id="i.id"
:title="i.title"
          :title_en="i.title_en"
          :title_ch="i.title_ch"
          :category="i.category"
          :description="i.description"
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
          :userfunded="i.userfunded"
          :userID="user.id"
                    :active="i.active"
          :type="i.type"
          :projectBrief_ch="i.projectBrief_ch"
          :projectBrief="i.projectBrief"
          :projectBrief_en="i.projectBrief_en"
          :invested="i.invested"
          :percentag="i.percentage"

               />
            </div>
               </MTabItem>
               <MTabItem  :name="$t('fundrising')">
                    <div class="row catalogue-panel-column" >
               <MProjectCard 
               v-for="(i,index) in filteredProjects(3)"
          :key="index"
               :projType="3"
          :id="i.id"
:title="i.title"
          :title_en="i.title_en"
          :title_ch="i.title_ch"
          :category="i.category"
          :description="i.description"
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
          :userfunded="i.userfunded"
          :userID="user.id"
          :active="i.active"
          :type="i.type"
          :projectBrief_ch="i.projectBrief_ch"
          :projectBrief="i.projectBrief"
          :projectBrief_en="i.projectBrief_en"
          :invested="i.invested"
          :percentag="i.percentage"
               />
            </div>
               </MTabItem>
           </MTabs>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import MProjectCard from "../../components/m-panel-project-card"
import MTabs from "../../components/UI/m-tabs"
import MTabItem from "../../components/UI/m-tabs-item"

export default {
          metaInfo() {
      return {title: this.$t('pProjects')}
    },
    components:{

        MProjectCard,
        MTabs,
        MTabItem
    },
    data(){
        return{
            modalShow: false,
            payShow: false,
            showMiniNav: false,
      curPage:{
        icon: 'projects',
        title: 'pProjects'
      }
        }
    },
props:{
    routes:{
        type: Array,
        required: true
    },
        borderProfile:{
        type:Boolean
    },
    borderLogout:{
        type:Boolean
    },
    user:{
        type:Object,
        required: true
    }
},
methods:{
     showNavItems(){
      this.showMiniNav = !this.showMiniNav
    },
    filteredProjects(type){
    let data = this.userprojects

    return data.filter(data => data.type === type)
  },
},
computed: {
  ...mapState(["userprojects","projects"]),
  
},
mounted(){
  let uID = this.user.id === undefined ? this.user.userID : this.user.id === undefined ? this.user.userID : ''

  let getProjects = {
    url: `users/projects/${uID}`,
    method:"get"
  }

  console.log(getProjects)

  this.$http(getProjects)
  .then((res)=>{
    console.log('project res:', res)
    this.$store.commit("SAVE_USER_PROJECTS", res.data)
  })
}
}
</script>

<style>

</style>