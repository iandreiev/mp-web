<template>
  <div id="user">
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
        <div class="user-card">
           <h2>Что должно быть здесь?</h2>
        </div>
    </div>
  </div>
</template>

<script>
import MButton from "../../components/UI/m-button"

export default {
         metaInfo() {
      return {title: this.$t('pBid')}
    },
    components:{
        MButton
    },
props:{
    id:{
        type: Object
    },
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
        type: Object,
        required: false
    }
},
data(){
    return{
        id: this.$route.params.id,
         showMiniNav: false,
      curPage:{
        icon: 'bid',
        title: 'Bidding'
      }
    }
},
methods:{
    logout(){
        this.$router.push('/')
    },
    showNavItems(){
      this.showMiniNav = !this.showMiniNav
    }
}
}
</script>

<style>

</style>