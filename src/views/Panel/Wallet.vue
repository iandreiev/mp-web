<template>
  <div id="user user-wallet">
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
        <div class="row catalogue-column">
          <div class="col wallet-meta">
            <img :src="user.avatar" width="200" alt="" />
            <p class="wallet-meta-name">{{ user.name + " " + user.surname }}</p>
            <p class="text-accent-1">id: {{ userid }}</p>
            <div class="wallet-meta-status">
                <p class="text-accent-1">{{$t('userStatus')}}</p>
                <p class="text-dark">{{ user.status == 0 ? $t('User') : user.status == 1 ? $t('Admin') : user.status == 2 ?  $t('Moderator') : user.status == 3 ? $t('Banned') : user.status == 4 ? $t('Golden') : user.status == 5 ? $t('Platinum') : user.status == 6 ? $t('Silver') : "User" }}</p>
            </div>
          </div>
          <div class="col tab-wrapper">
            <MTabs>
              <MTabItem :id="'balance'" :selected="true" :name="$t('bankDetails')">
                <div class="withdraw-section">
                  <MInputText
                    v-model="wallet.btcAddress"
                    :placeholder="btcAddress || wallet.btcAddress || 'BTC address'"
                  />
                  <div class="meta-button">
                    <MButton :btnClass="'btn btn-regular'">{{$t('save')}}</MButton>
                  </div>
                </div>
              </MTabItem>
              <MTabItem :id="'withdraw'" :name="$t('withdraw')">
                <div class="withdraw-section">
                  <div class="meta-balance">
                    <h3>{{$t('yourBalance')}} {{ wallet.balance }}</h3>

                    <div class="ic ic_mnp"></div>
                  </div>
                  <div class="sized-box"></div>

                  <div class="col">
                    <MInputText
                      v-model="wallet.btcAddress"
                      :placeholder="Object.keys(wallet).length > 0 ? wallet.btcAddress : 'BTC Address' "
                    />
                  </div>
                  <div class="col  catalogue-column">
                    <div class="row meta-withdraw">
                      <MInputText v-model.number="MNPS" :placeholder="'MNP'" />
                      <div class="ic-equal">
                        <div class="line"></div>
                        <div class="line"></div>
                      </div>
                      <MInputText v-model.number="MNPS" :placeholder="MNPS == null ? 'BTC' : MNPS > 0 ? MNPS : ''" />
                    </div>

                  
                  </div>

                    <div class="errors" v-if="errors.length">
                      <p class="text-danger" v-for="(i,index) in errors" :key="index">{{$t(i.err)}}</p>
                    </div>

                  <div class="meta-button">
                    <MButton @click="sendTicket()" :btnClass="'btn btn-regular'">{{$t('withdraw')}}</MButton>
                  </div>
                </div>
              </MTabItem>
              <MTabItem :id="'top-up'" :name="$t('topUp')">
                <MInputText v-model="payData.amount" :placeholder="$t('topUpSumm')"  />
                <MButton @click="estimatePayment" :btnClass="'btn btn-regular'">{{$t('estimateSumm')}}</MButton>
                       <div class="col main-col">
                         <p class="text-accent">{{$t('buyInstruction')}}</p>
              <div
                class="estimation-col estimation-item"
                v-for="(i, index) in estimate"
                :key="index"
              >
                <div class="col">
                  <p class="estimation-title">{{ i.fiat.full_name }}</p>
                </div>
                <div class="col">
                  <div
                    class="estimation-row estimation-topay"
                    @click="toggleEstimate(item, i.fiat.name)"
                    v-for="(item, index) in i.estimations"
                    :key="index"
                  >
                    <p class="estimation-name" :class="{'text-accent':payData.paySystem == item.payment_system.id}">
                      {{ item.payment_system.name }}
                    </p>
                    <p class="estimation-fiat">
                      {{
                        item.estimated_fiat_amount +
                        " " +
                        (i.fiat.name == "usd"
                          ? "USD"
                          : i.fiat.name == "rub"
                          ? "RUR"
                          : i.fiat.name)
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
                        <div class="col">
              <MButton
                v-if="Object.keys(payData.fiat).length > 0"
                :btnClass="'btn btn-modal btn-regular'"
                @click="toPay"
                >{{ $t("topUp") }}</MButton
              >
            </div>
              </MTabItem>
            </MTabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MInputText from "../../components/UI/form/m-input-text";
import MTabs from "../../components/UI/m-tabs";
import MTabItem from "../../components/UI/m-tabs-item";
import MButton from "../../components/UI/m-button";
import { mapState } from 'vuex';
const PAY_API = "https://api.staging.iserverbot.ru/v1/"
import axios from "axios"
export default {
   metaInfo() {
      return {title: this.$t('pWallet')}
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
    // user: {
    //   type: Array,
    //   required: false,
    // },
  },
  components: {
    MInputText,
    MTabs,
    MTabItem,
    MButton,
  },
  data() {
    return {
      payData:{
        userID: this.userid,
        API_TYPE: 'topup',
        projectID: 'topup',
        amount:0,
        coin:'usdt',
        fiat:'',
        paySystem: ''
      },
      
      BTC_RUR: '',
      estimate:'',
      btcAddress: null,
      MNPS: null,
      BTCS: null,
       showMiniNav: false,
      curPage:{
        icon: 'wallet',
        title: 'pWallet'
      },
      errors:[],
      ip:null
    };
  },
  methods:{
    //PAYMENT_SECTION
    estimatePayment(){
      let options ={
        url:`${PAY_API}payment-systems/estimate`,
        method:'post',
        data: {
          coin: this.payData.coin,
          amount: Number(this.payData.amount)
        },
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      }

      axios(options)
      .then(res=>{this.estimate = res.data
        console.log(res.data)
      })
    },
     postInvoice() {
      let options = {
        url: `${PAY_API}invoices`,
        method: "post",
        data: {
          amount: this.payData.amount,
          coin: "usdt",
          country_code: "RUS",
          fiat: this.payData.fiat,
          lang_id: "ru",
          payment_system_id: this.payData.paySystem,
        },
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      };

      axios(options).then((res) => {
        this.$router.push({ name: "Payout", params: { id: res.data.id } });
        window.open(res.data.payment_url, "_blank");
      });
    },
    toPay(){
       this.postInvoice();
        this.$store.commit("SET_CURRENT_PRODUCT", this.payData);
        console.log('TOPUP')
        this.estimate = "";
    },
        toggleEstimate(item, system) {
      this.payData.fiat = system;
      this.payData.paySystem = item.payment_system.id;
    },
     convertToBTC(summ, currency){
       let rate = this.rateBTC;
        let RubBtc = this.BTC_RUR

        if(currency == 'usd'){
          return ` (${(summ / rate).toFixed(5)} BTC)`
        }
        if(currency == 'rub'){
          return ` (${(summ / RubBtc).toFixed(5)} BTC)`
        }
        if(currency == 'eur'){}

    },
    //PAYMENT_SECTION /ends
    showNavItems(){
      this.showMiniNav = !this.showMiniNav
    },
    reloadWalet(){
      let options = {
        url: `users/${this.user.id}/wallet`,
        method: 'get'
      }

      this.$http(options)
      .then((res)=>{
        this.$store.commit("SAVE_USER_WALLET", res.data)
      })
    },
    saveInLogs(){
      let options = {
        url: 'logs',
        method:'post',
        data:{
          userID: this.userid,
          amount: this.MNPS,
            type: 2,
            ip: this.ip,
            proviso:200,
            action:'withdraw',
            status: 2,
            payment: 777
        }
      }

      this.$http(options)
      .then((res)=>{
        let getLogs = {
          url: 'logs/'+this.userid,
          method:'get'
        }
        this.$http(getLogs)
        .then((res)=>{
          this.$store.commit("SAVE_HISTORY",res.data)
        })
        .catch(err=>{
          console.log(err)
        })
      })
    },
    sendTicket(){
      this.errors = []
      let amount = this.MNPS 
      let balance = this.wallet.balance
      let address = this.wallet.btcAddress

      if(this.MNPS == null || this.MNPS == "") {
        this.errors.push({err:'notFilled'})
      }

      if(this.MNPS > balance){
        this.errors.push({err:'summOver'})
      }

      if(this.MNPS < 0){
        this.errors.push({err:'summMin'})
      }

      if(amount > 0 && amount < balance || amount == balance && amount != null || "" && address != null){
        let options = {
          url: 'ticket/withdrawal',
          method: 'post',
          data:{
            userID: this.userid,
            amount: amount,
            btcAddress: address,
            type: 2,
   
          }
        }


        this.$http(options)
        .then((res)=>{
          console.log(res)
          this.saveInLogs()
          this.reloadWalet()
          this.MNPS = null

        })
      }

     

    }
  },
  computed: {
    ...mapState(["wallet","user", "accessToken", "rateBTC"]),
       userid(){
      return this.user.id === undefined ? this.user.userID : this.user.id === undefined ? this.user.userID : this.user.id
    }
  },
  mounted(){
    let BTCRUR = {
      url: 'https://api.cryptonator.com/api/ticker/btc-rub',
      method: 'get'
    }

    let getIP = {
      url: 'https://json.geoiplookup.io/api',
      method: 'get'
    }

    this.$http(BTCRUR)
    .then(res=>this.BTC_RUR = res.data.ticker.price)

    this.$http(getIP)
    .then((res)=>{
      this.ip = res.data.ip
    })
  }
};
</script>

<style lang='scss'>
.errors{
  margin-left: 8px;
}
</style>