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
        <div class="bid-container">
          <div class="col bid-form-container">
            <p class="text-accent-1">What you want to do?</p>
            <div class="row">
              <label class="radio radio-before">
  <span class="radio__input">
    <input type="radio" value="sell" v-model="stepOne" name="radio">
    <span class="radio__control"></span>
  </span>
  <span class="radio__label">Sell</span>
</label>
              
              <label class="radio radio-before">
  <span class="radio__input">
    <input type="radio" value="buy" v-model="stepOne" name="radio">
    <span class="radio__control"></span>
  </span>
  <span class="radio__label">Buy</span>
</label>
            </div>
          </div>

          <div class="col  bid-form-container" v-if="stepOne == 'sell'">
              <p class="text-accent-1">Terms of sale</p>

              <div class="row">
                                <label class="radio radio-before">
  <span class="radio__input">
    <input type="radio" value="market" v-model="stepTwo" name="radio">
    <span class="radio__control"></span>
  </span>
  <span class="radio__label">Market sell</span>
</label>
              <label class="radio radio-before">
  <span class="radio__input">
    <input type="radio" value="direct" v-model="stepTwo" name="radio">
    <span class="radio__control"></span>
  </span>
  <span class="radio__label">Direct selling</span>
</label>
              </div>
          </div>

          <div class=" bid-form-container" v-else-if="stepOne == 'buy'">

                  <MBidInputText v-model="projectId" :id="'projectId'" :label="'Project ID'" />
              <MBidInputText v-model="shareSize" :id="'shareSize'" :label="'Share size'" />
              <MBidInputText v-model="price" :id="'price'" :label="'Price'" />
            <MTextArea :data="comment" v-model="comment" />
            <MButton :btnClass="'btn btn-regular'" @click="createBid">Send Request</MButton>

          </div>

        <div v-else>Choose one</div>

        <div v-if="stepTwo == 'market'">
            <div class="col-6">
 <MBidInputText v-model="projectId" :id="'projectId'" :label="'Project ID'" />
              <MBidInputNum v-model="shareSize" :id="'shareSize'" :label="'Share size'" />
              <MBidInputNum v-model="price" :id="'price'" :label="'Price'" />
            <MTextArea :data="comment" v-model="comment" />
            <MButton :btnClass="'btn btn-regular'" @click="createBid">Send Request</MButton>
            </div>
           
        </div>
        <div v-else-if="stepTwo == 'direct'">

           <div class="row catalogue-column">
            <MBidInputNum v-model="projectId" :id="'projectId'" :label="'Project ID'" />
            <MBidInputText v-model="buyerId" :id="'buyerId'" :label="'Buyer ID'" />

           </div>
              <MBidInputNum v-model="shareSize" :id="'shareSize'" :label="'Share size'" />
              <MBidInputNum v-model="price" :id="'price'" :label="'Price'" />
            <MTextArea :data="comment" v-model="comment" />
            <MButton :btnClass="'btn btn-regular'" v-on:click="createBid">Send Request</MButton>
        </div>

        
        

        </div>
      </div>
    </div>

    <MModal v-if="showModal">
        <MModalHead  @close="showModal = false" />
        <MModalBody>
            <div v-html="status"></div>
        </MModalBody>
    </MModal>
  </div>
</template>

<script>
import MButton from "../../components/UI/m-button"
import MBidInputText from "../../components/UI/form/m-bid-input-text"
import MBidInputNum from "../../components/UI/form/m-bid-input-number"
import MTextArea from "../../components/UI/form/m-textarea"
import MModal from "../../components/UI/modal/m-modal"
import MModalHead from "../../components/UI/modal/m-modal-head"
import MModalBody from "../../components/UI/modal/m-modal-body"

import axios from "axios";

const BASEURL = "https://us-central1-monopoly-life.cloudfunctions.net/app/"
const BID = "bid"

export default {
   metaInfo() {
      return {title: this.$t('pBid')}
    },
  components:{
      MButton,
      MBidInputText,
      MBidInputNum,
      MTextArea,
      MModalBody,
      MModalHead,
      MModal
  },
  data() {
    return {
      stepOne: null,
      stepTwo: null,
      projectId: null,
      shareSize: null,
      buyerId:null,
      price: null,
      comment:null,
      showModal:false,

      comment:{
          id: 'comment',
          placeholder: 'set comment',
          name: 'comment',
          label: 'Comment:'
      },
       showMiniNav: false,
      curPage:{
        icon: 'bid',
        title: 'Bidding'
      }
    };
  },
  props: {
    routes: {
      type: Array,
      required: true,
    },
        borderProfile:{
        type:Boolean
    },
    borderLogout:{
        type:Boolean
    },
    user: {
      type: Object,
      required: true,
    },
  },
  computed:{
      logic(){
          if(this.stepOne == 'buy'){
              this.stepTwo = null
          }
      }
  },
  methods:{
    showNavItems(){
      this.showMiniNav = !this.showMiniNav
    },
    createBid(){
      let body = {
              type_1: this.stepOne,
              type_2: this.stepTwo,
              comment: this.comment,
              price: this.price,
              projectId: this.projectId,
              buyerId: this.buyerId,
              shareSize: this.shareSize,
              userID: this.user.userID
          }
      
      let options = {
        url: "bid",
        method: "post",
        data:body
      }

      this.$http(options)
      .then((res)=>{
                  this.status = `<h1>All is set!</h1>`
          this.showModal = true
      })
.catch((err)=>{
                             this.status = `<h1>Error!</h1>`
          this.showModal = true
          })

    },

  }
};
</script>

<style>
</style>