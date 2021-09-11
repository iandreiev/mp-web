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
            <p class="user-card-heading-item">{{$t('pHistory')}}</p>
                    <div class="operation-section">
                        <div class="operation-row">
                            <p class="text-accent-1">{{$t('condition')}}</p>
                            <p class="text-dark">{{logs.proviso == 200 ? $t('Enrollment') : logs.proviso == 201 ? $t('Provided') : logs.proviso == 401 ? $t('Canceled') : logs.proviso}}</p>
                        </div>
                        <div class="operation-row">
                            <p class="text-accent-1">{{$t('IP')}}:</p>
                            <p class="text-dark">{{logs.ip}}</p>
                        </div>
                        <div class="operation-row">
                            <p class="text-accent-1">{{$t('date')}}</p>
                            <p class="text-dark">{{logs.createdAt | moment("d.MM.YY, hh:mm:ss")}}</p>
                        </div>
                        <div class="operation-row">
                            <p class="text-accent-1">{{$t('paymentMethod')}}</p>
                            <p class="text-dark">{{logs.payment == 101 ? "Coinpayments" : logs.payment == 102 ? "VISA" :logs.payment == 103 ? "Mastercard": logs.payment}}</p>
                        </div>
                    </div>
                    <div class="operation-button">
                        <MButton :btnClass="'btn btn-regular'" @click="back">{{$t('back')}}</MButton>
                    </div>
        </div>
    </div>
  </div>
</template>

<script>
import MButton from "../../components/UI/m-button"

export default {
        metaInfo() {
      return {title: this.$t('pHistory')}
    },
    components:{
        MButton
    },
props:{
    id:{
        type: String
    },
        borderProfile:{
        type:Boolean
    },
    borderLogout:{
        type:Boolean
    },
    routes:{
        type: Array,
        required: true
    },
    user:{
        type: Object,
        required: false
    }
},
data(){
    return{
        data: null,
         showMiniNav: false,
         logs:[],
      curPage:{
        icon: 'history',
        title: 'pHistory'
      }
    }
},
methods:{
    logout(){
        this.$router.push('/')
    },
    back(){
        this.$router.go(-1)
    },
    showNavItems(){
      this.showMiniNav = !this.showMiniNav
    }
},
mounted(){
    let Logs = "logs/item/"
    let id = this.id

    let getLogs = {
      url: `${Logs + id}`,
      method: "get"
    }
    this.$http(getLogs)
    .then((res)=>{
      this.logs = res.data
      console.log(res.data)
})
}
}
</script>

<style>

</style>