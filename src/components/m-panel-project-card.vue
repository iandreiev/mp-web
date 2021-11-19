<template>
  <div class="col-6">
    <MCard :cardClass="'card-light'" v-show="type == projType">
      <div class="card-container">
        <div class="card-meta">
          <div v-for="i in categories" :key="i.id">
            <p>
              {{
                category == i.id
                  ? locale == "en-gb"
                    ? i.title_en
                    : locale == "ru"
                    ? i.title
                    : locale == "zh-cn"
                    ? i.title_ch
                    : "Unknown"
                  : ""
              }}
            </p>
          </div>
          <p>
            {{
              locale == "en-gb"
                ? location_en
                : locale == "ru"
                ? location
                : locale == "zh-cn"
                ? location_ch
                : "Unknown"
            }}
          </p>
        </div>
      </div>
      <div class="card-container">
        <h2 v-on:click="toProject">
          {{
            locale == "en-gb"
              ? title_en
              : locale == "ru"
              ? title
              : locale == "zh-cn"
              ? title_ch
              : "Unknown"
          }}
        </h2>
        <p>id:{{ id }}</p>
      </div>

      <img class="card-image" :src="image" alt="" />
      
      <div class="card-container user-fundraising" v-show="type == 1">
        <MProgressBar :length="projectProgress(funded,cost)" />
      </div>
      <div class="card-container" v-if="type == 3">
        <div class="row">
          <div class="col-6" id="fund-col-1">
          <p>{{$t('fundCost')}}:</p>
          <p>{{$t('fundInvested')}}:</p>
          <p>{{$t('fundShare')}}:</p>
          <p>{{$t('fundDate')}}:</p>
        </div>
        <div class="col-6" id="fund-col-2" style="display:flex;flex-direction:column;align-items: flex-start;">
          <div class="icon-row">
            <p>{{cost}}</p>
            <div class="ic ic_mnp"></div>
          </div>
          <div class="icon-row">
            <p>{{userfunded}}</p>
            <div class="ic ic_mnp"></div>
          </div>
         <p class="number">{{percentag}}%</p>
          <p class="number">{{moment(createdAt).format("d.M.y")}}</p>
        </div>
        </div>
      </div>
      <div class="card-container" v-show="type == 1">
        <div class="card-business-meta">
          <div class="card-business-meta-item">
              <p>{{ $t("funded") }}</p>

           <div class="row">
            <b>{{ funded }}</b>

              <div class="ic ic_mnp"></div>
           </div>

          </div>
          <div class="card-business-meta-item">
            <p>{{ $t("pledged") }}</p>
             <div class="row">
            <b>{{ pledged }}</b>
              <div class="ic ic_mnp"></div>
             </div>
          </div>

          <div class="card-business-meta-item">
            <b>{{  moment(createdAt).fromNow() }}</b>
            <p>{{ $t("daysago") }}</p>
          </div>
        </div>
      </div>
      <div class="card-container" v-show="type == 1">
        <div class="card-row">
          <div class="col">
            <p>{{ $t("userTotalFunds") }}</p>
            <div class="meta-value">
              <p>{{ userfunded }}</p>
              <div class="ic ic_mnp"></div>
            </div>
          </div>
          <div class="col">
            <MButton :btnClass="'btn btn-regular'" @click="projectOpen(id)">{{
              $t("increase")
            }}</MButton>
          </div>
        </div>
      </div>
    </MCard>

    <MModal @keyup.esc="closeModalProject" v-show="id == currentUserProject" :id="`participate`">
      <div class="modal-head">
        <div class="modal-box"></div>
        <div class="modal-close-wrapper" @click="closeModalProject()">
          <label for="activeModal" class="ic-close">
            <input type="checkbox" name="" id="activeModal" />
            <div class="line line--1"></div>
            <div class="line line--2"></div>
          </label>
        </div>
      </div>
      <MModalBody>
        <div class="modal-card-project">
          <h2>
            {{
              locale == "en-gb"
                ? title_en
                : locale == "ru"
                ? title
                : locale == "zh-cn"
                ? title_ch
                : "Unknown"
            }}
          </h2>

          <div class="modal-card-project-meta">
            <div class="row project-meta">
              <p class="text-accent-1">id: {{ id }}</p>
            </div>
            <div class="row project-meta">
              <div class="ic ic_location"></div>
              <p class="text-accent-1">
                {{
                  locale == "en-gb"
                    ? location_en
                    : locale == "ru"
                    ? location
                    : locale == "zh-cn"
                    ? location_ch
                    : "Unknown"
                }}
              </p>
            </div>
          </div>

          <div class="modal-card-project-image">
            <img :src="image" alt="" />
          </div>

          <div class="col">
            <div class="row">
              <p class="text-dark">{{ $t("numberSharesInProject") }}</p>
            </div>
              <div class="row minimum-entrance">
              <p class="text-accent-1">{{ $t("minimum") }}</p>
              <div class="ic-row">
                <p class="text-dark">{{ project.entrance }}</p>
                <div class="ic ic_mnp"></div>
              </div>
            </div>
           

            <div class="row">
              <div class="form-control">
                <input
                  type="range"
                  :min="0"
                  :step="10"
                  :max="100"
                  v-model="payData.shareSize"
                  @change="calculateRange"
                  id=""
                />
                  <div class="circles-wrapper">
                    <div class="circles">
                                    <div class="circle" v-for="(i,index) in 10" :key="index">
                 
                </div>
                  </div>
                  </div>
              </div>

            </div>

            <div class="row">
              <p class="text-accent-1">{{ $t("total") }}</p>
              <div class="ic-row">
                <p class="text-dark">{{ calcPrice }}</p>
                <div class="ic ic_mnp"></div>
              </div>
            </div>


            <div class="row form-controller-row" v-if="isMobile==false">
              <div class="input-percent">
                <div class="form-controller">
                  <input type="text" name="percent" v-model="payData.shareSize" @change="calculateRange" placeholder="0%" id="percent">
                  <div class="ic-wrapper ic_percent"></div>
                </div>
              </div>
              <div class="input-summ">
                <div class="form-controller">
                  <input type="text" name="percent" v-model="payData.amount" @change="calculatePrice" placeholder="0 MNP" id="percent">
                  <div class="ic-wrapper ic_mnp"></div>
                </div>
              </div>

              <MButton :btnClass="'btn btn-modal btn-regular'" @click="postEstimate">{{
                $t("estimateSumm")
              }}</MButton>
            </div>

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
                    <p class="estimation-name" 
                    :class="{'text-accent':payData.paySystem == item.payment_system.id}"
                    >
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
                @click="payOpen"
                >{{ $t("pay") }}</MButton
              >
            </div>
             <div class="row form-controller-col" v-if="isMobile == true">
              <div class="input-percent">
                <div class="form-controller">
                  <input type="text" name="percent" v-model="payData.shareSize" @change="calculateRange" placeholder="0%" id="percent">
                  <div class="ic-wrapper ic_percent"></div>
                </div>
              </div>
              <div class="input-summ">
                <div class="form-controller">
                  <input type="text" name="percent" v-model="payData.amount" @change="calculatePrice" placeholder="0%" id="percent">
                  <div class="ic-wrapper ic_mnp"></div>
                </div>
              </div>

                            <MButton
                :btnClass="'btn btn-modal btn-regular'"
                @click="postEstimate"
                >{{ $t("estimateSumm") }}</MButton
              >
          </div>
          </div>
        </div>
      </MModalBody>
    </MModal>

    <MModal :id="`payout`" v-if="showPayout">
      <div class="modal-head">
        <div class="modal-box"></div>
        <div class="modal-logo"></div>
        <div class="modal-close-wrapper" @click="closeModalPayout()">
          <label for="activeModal" class="ic-close">
            <input type="checkbox" name="" id="activeModal" />
            <div class="line line--1"></div>
            <div class="line line--2"></div>
          </label>
        </div>
      </div>
      <MModalBody>
        <div class="col-12 payout-col">
          <h2>{{ $t("Payment") }}</h2>
          <p class="text-accent-1 subtitle">{{ $t("moderCheck") }}</p>
          <h3>{{ $t("btcAddress") }}</h3>
          <h3 class="text-accent btcAddress">
            {{setup[0].address}}
          </h3>
          <h3>
            {{ $t("toPurchase") }}
            <div class="icon-row">
              <p>{{ calcPrice }}</p>
              <div class="ic ic_mnp"></div>
            </div>
          </h3>
          <MButton
            @click="letPay(calcPrice, range)"
            :btnClass="'btn btn-regular'"
            >{{ $t("iPaid") }}</MButton
          >
        </div>
      </MModalBody>
    </MModal>

    <MModal :id="`thanks`" v-if="showThanks">
      <div class="modal-head">
        <div class="modal-box"></div>
        <div class="modal-logo--muted"></div>
        <div class="modal-close-wrapper" @click="closeModalThanks()">
          <label for="activeModal" class="ic-close">
            <input type="checkbox" name="" id="activeModal" />
            <div class="line line--1"></div>
            <div class="line line--2"></div>
          </label>
        </div>
      </div>
      <MModalBody>
        <div class="ic ic_check"></div>
        <p class="text-accent-1 congrats">{{ $t("congrats") }}</p>
        <h1 class="project-title">
          {{
            locale == "en-gb"
              ? title_en
              : locale == "ru"
              ? title
              : locale == "ch"
              ? title_ch
              : "Unknown"
          }}
        </h1>

        <MButton :btnClass="`btn btn-regular`" @click="toProjects">{{
          $t("toCatalog")
        }}</MButton>
        <MButton :btnClass="`btn btn-flat`" @click="toMain">{{
          $t("toHome")
        }}</MButton>
      </MModalBody>
    </MModal>
    <getBTC />

  </div>
</template>

<script>
var moment = require("moment")
import MCard from "../components/UI/m-card";
import MProgressBar from "../components/UI/m-progressbar";
import MButton from "../components/UI/m-button";
import MModal from "../components/UI/modal/m-modal";
import getBTC from "../components/getBTC"
import MModalBody from "../components/UI/modal/m-modal-body.vue";
import MInputText from "../components/UI/form/m-input-text";
import { mapState } from "vuex";
const PAY_API = "https://sandbox.ps.grow.mybuilder.site/";
import axios from "axios";

export default {
  props: [
    "id",
    "userID",
    "title",
    "title_ch",
    "title_en",
    "userfunded",
    "annual",
    "invested",
    "cost",
    "return",
    "cost",
    "category",
    "location",
    "location_en",
    "location_ch",
    "image",
    "projectBrief",
    "projectBrief_en",
    "projectBrief_ch",
    "funded",
    "pledged",
    "backers",
    "createdAt",
    "entrance",
    "type",
    "active",
    "percentag",
    "projType"
  ],
  components: {
    MCard,
    MProgressBar,
    MButton,
    MModal,
    MModalBody,
    MInputText,
    getBTC

  },
  data() {
    return {
      range: 0,
      percentage: null,
      sharingSize: null,
      project: [],
      errors:[],
      status: null,
      moment: moment,
      calcPrice: 0,
      pageData: {
        id: this.id,
        title: this.title,
        category: this.category,
        location: this.location,
        image: this.image,
        description: this.description,
        funded: this.funded,
        pledged: this.pledged,
        backers: this.backers,
        createdAt: this.created_at,
        entrance: this.entrance,
        return: this.return,
        annual: this.annual,
        cost: this.cost,
        invested: this.invested,
      },
      payData: {
        userID: this.$store.state.user.id,
        projectID: this.id,
        amount: 10,
        type: 2,
        rate_btc: this.rateBTC,
        shareSize: 10,
        fiat: "",
        paySystem: "",
        API_TYPE: 'increase'
      },
      estimate: "",
    };
  },
  methods: {
    // PAYMENT METHODS 
     postEstimate() {
      let options = {
        url: `${PAY_API}payment-systems/estimate`,
        method: "post",
        data: {
          amount: Number(this.payData.amount),
          coin: "usdt",
        },
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      };

      if (this.payData.amount > 0) {
        axios(options).then((res) => (this.estimate = res.data));
      } else {
        console.error("MUST BE GREATER THAN NULL");
      }
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
    payOpen() {
      if (this.payData.amount > this.project.cost) {
        this.errors.push("maxAmount");
      }

      if (this.payData.amount == 0) {
        this.errors.push("nullAmount");
      }

      if (this.payData.amount < this.project.entrance) {
        this.errors.push("minAmount");
      } else {
        this.postInvoice();
        // this.$store.commit("SHOW_PAYOUT", true);
        this.$store.commit("SHOW_PROJECT", false);
        this.$store.commit("SET_CURRENT_PRODUCT", this.payData);
        this.estimate = "";
      }
    },
    //Toggle estimation
    toggleEstimate(item, system) {
      this.payData.fiat = system;
      this.payData.paySystem = item.payment_system.id;
    },
    // PAYMENT METHODS /end
    calculatePrice(){
     this.payData.shareSize = (100 * this.payData.amount)/this.cost 
    },
    calculateRange(){
      this.payData.amount = (this.cost * this.payData.shareSize)/100
    },
    projectProgress(funded,cost){
       return (funded/cost)*100 > 100 ? (cost/cost)*100 : (funded/cost)*100
      },

    projectOpen(id) {
      this.$store.commit("SHOW_PROJECT", true);
      this.$store.commit("CURRENT_MODAL_PROJECT", id)
    },
  closeModalProject() {
      this.$store.commit("SHOW_PROJECT", false);
      this.$store.commit("CURRENT_MODAL_PROJECT", null)
    },
    closeModalThanks() {
      this.$store.commit("SHOW_THANKS", false);
    },
    closeModalPayout() {
      this.$store.commit("SHOW_PAYOUT", false);

    },
    toProjects() {
      this.$store.commit("SHOW_THANKS", false);
      this.$router.push({ name: "Projects" });
    },
    toMain() {
      this.$store.commit("SHOW_THANKS", false);
      this.$router.push({ name: "Home" });
    },
    toProject() {
      this.$router.push({
        name: "ProjectItem",
        params: { id: this.id, data: this.pageData },
        props: { data: this.pageData },
      });
    },
  },
  computed: {
    ...mapState([
      "categories",
      "locale",
      "showProject",
      "showPayout",
      "showThanks",
      "isMobile",
      "setup",
      "rateBTC",
      "accessToken",
      "currentUserProject"
    ]),
  },
  
  mounted() {
    let options = {
      url: `projects/${this.id}`,
      method: "get",
    };

    this.$http(options).then((res) => {
      this.project = res.data;
    });
  },
};
</script>

<style>
/* .catalogue-column{
  align-items: flex-end;
} */

.payout-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  /* width: 340px; */
}

</style>

