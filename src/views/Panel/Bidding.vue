<template>
  <div id="user user-bidding">
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
            <div class="user-card-heading">
               <div class="form-controller">
                    <select class="select" v-model="selected" name="choose-bid" id="bidding">
                    <option class="option" value="Sell">Sell</option>
                    <option class="option" value="Buy">Buy</option>
                    <option class="option" value="All">All</option>
                </select>
               </div>

                <MButton :btnClass="'btn btn-regular'" @click="toCreateBid">CREATE</MButton>
            </div>

            <div class="user-card-body">
                
                <div v-if="Object.keys(bids).length == []">
                    <p>У вас пока нет ставок. Но вы можете её создать</p>
                </div>
                                    <table v-else-if="Object.keys(bids).length > 0" class="table table-bidding">
                    <thead>
                        <th>ID</th>
                        <th>Share Size</th>
                        <th>Cost</th>
                        <th>Operation</th>
                        <th>Comment</th>
                    </thead>
                    <tbody>
                        <router-link tag="tr" :to="{path:`/me/bidding/bid/${i.id}`, params:{id:i.id}}" v-for="i in bids" :key="i.id">

                            <td>{{i.id}}</td>
                            <td>{{i.shareSize}}</td>
                            <td>{{i.price}}</td>
                            <td>{{i.type_1}}</td>
                            <td>{{i.comment}}</td>
                            
                        </router-link>
                                 
                    </tbody>
                </table>

                <div class="table-mobile">
                        <router-link tag="div" class="table-mobile-item" :to="{path:`/me/bidding/bid/${i.id}`, params:{id:i.id}}" v-for="i in user.bids" :key="i.id">
                            <div class="col-6">
                                <div class="table-mobile-item--title">ID: </div>
                                <div class="table-mobile-item--title">{{$t('bidShareSize')}}</div>
                                <div class="table-mobile-item--title">{{$t('bidCost')}}</div>
                                <div class="table-mobile-item--title">{{$t('bidOperation')}}</div>
                                <div class="table-mobile-item--title">{{$t('bidComment')}}</div>
                            </div>
                            <div class="col-6">
                                 <div class="table-mobile-item--body">{{i.id}}</div>
                                <div class="table-mobile-item--body">{{i.shareSize}}</div>
                                <div class="table-mobile-item--body">{{i.cost}}</div>
                                <div class="table-mobile-item--body">{{i.operation}}</div>
                                <div class="table-mobile-item--body">{{i.comment}}</div>
                            </div>
                        </router-link>
                    </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MButton from "../../components/UI/m-button"
export default {
         metaInfo() {
      return {title: this.$t('pBid')}
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
        type: Object,
        required: true
    }
},
components:{
    MButton
},
data(){
    return{
        selected: null,
         showMiniNav: false,
      curPage:{
        icon: 'bid',
        title: 'Bidding'
      }
    }
},
methods:{
    toCreateBid(){
        this.$router.push({name: 'CreateBid'});
    },
    showNavItems(){
      this.showMiniNav = !this.showMiniNav
    }
},
computed: mapState(["bids"]),
mounted(){
    
    
    let options = {
        url: "bid",
        method: "get"
    }

    this.$http(options)
    .then((res)=>{
        this.$store.commit("SAVE_BIDS", res.data)
    })
}

}
</script>

<style>

</style>