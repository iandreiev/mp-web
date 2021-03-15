<template>
  <div id="project-item-page">
    <MNavbar />
    
<MSection :id="'project-item'">
      <div class="col-12">
        <div class="row catalogue-column">
          <div class="col-7">
            <img v-if="isMobile == false" :src="project.image" alt="" />
            <p class="text-accent-1 project-page-col">
              {{
                locale == "en-gb"
                  ? project.projectBrief_en
                  : locale == "ru"
                  ? project.projectBrief
                  : locale == "zh-cn"
                  ? project.projectBrief_ch
                  : "Unknown"
              }}
            </p>
            <div v-if="isMobile == true" class="col business-videos">
              <h3>{{ $t("videos") }}</h3>

              <p class="text-accent-1" v-if="Object.keys(videos).length == []">
                {{ $t("notVideos") }}
              </p>
              <p
                class="p-link text-accent-1"
                @click="openPlayer(i.id, i.title, i.caption, i.file, i.type)"
                v-for="(i, index) in videos"
                :key="index"
              >
                {{ i.title }}
              </p>
            </div>
            <div v-if="userauth == true">
              <MButton :btnClass="'btn btn-regular'" @click="projectOpen">{{
                $t("participate")
              }}</MButton>
            </div>
            <div v-else>
              <p class="text-accent">{{ $t("registerToBuy") }}</p>
            </div>
          </div>
          <div class="col-5">
            <div class="row">
              <div class="ic-row" v-on:click="toBack">
                <div class="ic-arr-back"></div>
                <p class="text-accent-1 back-text">{{ $t("back") }}</p>
              </div>
            </div>

            <h1 class="project-page-title">
              {{
                locale == "en-gb"
                  ? project.title_en
                  : locale == "ru"
                  ? project.title
                  : locale == "zh-cn"
                  ? project.title_ch
                  : "Unknown"
              }}
            </h1>
            <div class="row h-m-b-4" v-if="isMobile == true">
              <p>
                {{ $t("daysago") + ": " + moment(project.createdAt).fromNow() }}
              </p>

              <div class="row location-row business-meta-location">
                <div class="ic ic_location"></div>

                <p class="text-accent-1">
                  {{
                    locale == "en-gb"
                      ? project.location_en
                      : locale == "ru"
                      ? project.location
                      : locale == "zh-cn"
                      ? project.location_ch
                      : "Unknown"
                  }}
                </p>
              </div>
            </div>
            <div class="row h-m-b-4" v-if="isMobile == true">
              <img :src="project.image" alt="" />
            </div>

            <div class="col" v-if="isMobile == false">
              <p v-if="isMobile == true">
                {{ $t("daysago") + ": " + moment(project.createdAt).fromNow() }}
              </p>

              <div class="location-row">
                <div class="ic ic_location"></div>

                <p class="text-accent-1">
                  {{
                    locale == "en-gb"
                      ? project.location_en
                      : locale == "ru"
                      ? project.location
                      : locale == "zh-cn"
                      ? project.location_ch
                      : "Unknown"
                  }}
                </p>
              </div>
            </div>
            <div class="col">
              <div class="row project-page-row">
                <p class="text-accent-1">ID</p>
                <p class="icon-row">{{ project.id }}</p>
              </div>

              <div class="row project-page-row">
                <p class="text-accent-1">{{ $t("annualYield") }}:</p>
                <div class="icon-row">
                  <p>{{ project.annual }}</p>
                  <div class="ic ic_mnp"></div>
                </div>
              </div>
              <div class="row project-page-row">
                <p class="text-accent-1">{{ $t("expectedAnnualReturn") }}:</p>
                <div class="icon-row">
                  <p>{{ project.returns }}</p>
                  <div class="ic ic_mnp"></div>
                </div>
              </div>

              <div class="row project-page-row">
                <p class="text-accent-1">{{ $t("totalProjectCost") }}:</p>
                <div class="icon-row">
                  <p>{{ project.cost }}</p>
                  <div class="ic ic_mnp"></div>
                </div>
              </div>
            </div>
            <div class="col">
              <MProgressBar
                :length="projectProgress(project.funded, project.cost)"
              />
            </div>
            <div class="container">
              <div class="business-meta">
                <div class="business-meta-item">
                  <div class="icon-row">
                    <b>{{ project.funded }}</b>
                    <div class="ic ic_mnp"></div>
                  </div>
                  <p class="text-accent-1">{{ $t("funded") }}</p>
                </div>
                <div class="business-meta-item">
                  <div class="icon-row">
                    <b>{{ project.pledged }}</b>
                    <div class="ic ic_mnp"></div>
                  </div>
                  <p class="text-accent-1">{{ $t("pledged") }}</p>
                </div>
                <div class="business-meta-item">
                  <b>{{ project.backers }}</b>
                  <p class="text-accent-1">{{ $t("backers") }}</p>
                </div>
                <div class="business-meta-item" v-if="isMobile == false">
                  <b>{{ moment(project.createdAt).fromNow() }}</b>
                  <p class="text-accent-1">{{ $t("daysago") }}</p>
                </div>
              </div>
            </div>
            <div v-if="isMobile == false" class="col business-videos">
              <h3>{{ $t("videos") }}</h3>

              <p class="text-accent-1" v-if="Object.keys(videos).length == []">
                {{ $t("notVideos") }}
              </p>

              <p
                class="text-accent-1 p-link"
                v-for="(i, index) in videos"
                @click="openPlayer(i.id, i.title, i.caption, i.file, i.type)"
                :key="index"
              >
                {{ i.title }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </MSection>
    <MFooter />

    <MModal @keyup.esc="closePlayer" v-if="isPlayer" :id="'player'">
      <div class="modal-head">
        <div class="modal-box"></div>
        <div class="modal-close-wrapper" @click="closePlayer()">
          <label for="activeModal" class="ic-close">
            <input type="checkbox" name="" id="activeModal" />
            <div class="line line--1"></div>
            <div class="line line--2"></div>
          </label>
        </div>
      </div>
      <MModalBody>
        <div class="player">
          <iframe
            width="480"
            height="360"
            :src="video.file"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <div class="player-meta">
            <p class="player-meta-title">{{ video.title }}</p>
            <p class="text-accent-1 player-meta-caption">{{ video.caption }}</p>
          </div>
        </div>
      </MModalBody>
    </MModal>

    <MModal
      @keyup.esc="closeModalProject"
      :id="`participate`"
      v-if="showProject"
    >
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
                ? project.title_en
                : locale == "ru"
                ? project.title
                : locale == "zh-cn"
                ? project.title_ch
                : "Unknown"
            }}
          </h2>

          <div class="modal-card-project-meta">
            <div class="row project-meta">
              <p class="text-accent-1">id: {{ project.id }}</p>
            </div>
            <div class="row project-meta">
              <div class="ic ic_location"></div>
              <p class="text-accent-1">
                {{
                  locale == "en-gb"
                    ? project.location_en
                    : locale == "ru"
                    ? project.location
                    : locale == "zh-cn"
                    ? project.location_ch
                    : "Unknown"
                }}
              </p>
            </div>
          </div>

          <div class="modal-card-project-image">
            <img :src="project.image" alt="" />
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
                    <div
                      class="circle"
                      v-for="(i, index) in 10"
                      :key="index"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row form-controller-row" v-if="isMobile == false">
              <div class="input-percent">
                <div class="form-controller">
                  <input
                    type="text"
                    name="percent"
                    v-model="payData.shareSize"
                 @change="calculateRange"
                    placeholder="0%"
                    id="percent"
                  />
                  <div class="ic-wrapper ic_percent"></div>
                </div>
              </div>
              <div class="input-summ">
                <div class="form-controller">
                  <input
                    type="text"
                    name="percent"
                    v-model="payData.amount"
                   @change="calculatePrice"
                    placeholder="0"
                    id="percent"
                  />
                  <div class="ic-wrapper ic_mnp"></div>
                </div>
              </div>

              <MButton
                :btnClass="'btn btn-modal btn-regular'"
                @click="postEstimate"
                >{{ $t("estimateSumm") }}</MButton
              >
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
                    <p class="estimation-name">
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
                  <input
                    type="text"
                    name="percent"
                    v-model="payData.shareSize"
                    @change="calculateRange"
                    placeholder="0%"
                    id="percent"
                  />
                  <div class="ic-wrapper ic_percent"></div>
                </div>
              </div>
              <div class="input-summ">
                <div class="form-controller">
                  <input
                    type="text"
                    name="percent"
                    v-model="payData.amount"
                    @change="calculatePrice"
                    placeholder="0%"
                    id="percent"
                  />
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
    <getBTC />
  </div>
</template>

<script>
import MAccordion from "../components/UI/m-accordion";

import MSection from "../components/UI/m-section";
import MNavbar from "../components/m-navbar";
import MButton from "../components/UI/m-button";
import MFooter from "../components/m-footer";
import MProgressBar from "../components/UI/m-progressbar";
import MModal from "../components/UI/modal/m-modal";
import MModalBody from "../components/UI/modal/m-modal-body.vue";
import MInputText from "../components/UI/form/m-input-text";
import getBTC from "../components/getBTC";
import { mapState } from "vuex";
const PAY_API = "https://api.staging.iserverbot.ru/v1/";
var moment = require("moment");
import axios from "axios";

export default {
  metaInfo() {
    return {
      title:
        this.locale == "en-gb"
          ? this.project.title_en
          : this.locale == "ru"
          ? this.project.title
          : this.locale == "zh-cn"
          ? this.project.title_ch
          : "Unknown",
    };
  },
  components: {
    MSection,
    MNavbar,
    MButton,
    MFooter,
    MProgressBar,
    MModal,
    MModalBody,
    MInputText,
    getBTC,
    MAccordion,
  },
  data() {
    return {
      project:'',
      payData: {
        userID: this.$store.state.user.id,
        projectID: this.$route.params.id,
        amount: 10,
        type: 2,
        rate_btc: this.rateBTC,
        shareSize: 10,
        fiat: "",
        paySystem: "",
        API_TYPE: 'buy'
      },
      estimate: "",
      userauth: this.$store.state.auth,
      moment: moment,
      video: {
        id: null,
        file: null,
        title: null,
        caption: null,
        type: null,
      },
    }
  },
  computed: {
    ...mapState([
      "categories",
      "locale",
      "isPlayer",
      "isMobile",
      "videos",
      "showProject",
      "showPayout",
      "showThanks",
      "setup",
      "rateBTC",
      "accessToken",
    ])
  },
  methods: {
       calculatePrice(){
     this.payData.shareSize = (100 * this.payData.amount)/this.project.cost 
    },
    calculateRange(){
      this.payData.amount = (this.project.cost * this.payData.shareSize)/100
    },
    //   calculcateRange() {
    //   // Range field (%)
    //   let p = (this.payData.amount * 100) / this.project.cost;
    //   this.payData.amount = p;
    // },
    
     projectProgress(funded,cost){
        return (funded/cost)*100 > 100 ? (cost/cost)*100 : (funded/cost)*100
      },
    toBack() {
      this.$router.go(-1);
    },
    modalOpen() {
      let auth = this.userauth;
      if ((auth = true)) {
        this.showModal = true;
      } else {
      }
    },
    toProjects() {
      this.$store.commit("SHOW_THANKS", false);
      this.$router.push({ name: "Projects" });
    },
    toMain() {
      this.$store.commit("SHOW_THANKS", false);
      this.$router.push({ name: "Home" });
    },
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
        this.$store.commit("SHOW_PROJECT", true);
        this.$store.commit("SET_CURRENT_PRODUCT", this.payData);
        this.estimate = "";
      }
    },
    projectOpen() {
      this.$store.commit("SHOW_PROJECT", true);
    },
    openPlayer(id, title, caption, file, type) {
      this.video = {
        id: id,
        title: title,
        caption: caption,
        file: file,
        type: type,
      };
      this.$store.commit("IS_PLAYER", true);
    },
    closePlayer() {
      this.$store.commit("IS_PLAYER", false);
    },
    closeModalProject() {
      this.$store.commit("SHOW_PROJECT", false);
    },
    closeModalThanks() {
      this.$store.commit("SHOW_THANKS", false);
    },
    closeModalPayout() {
      this.$store.commit("SHOW_PAYOUT", false);
    },
    //Toggle estimation
    toggleEstimate(item, system) {
      this.payData.fiat = system;
      this.payData.paySystem = item.payment_system.id;
      item.payment_system.name = item.payment_system.name + " (Selected)";
    },
  },
  mounted() {
    let options = {
      url: `projects/${this.$route.params.id}`,
      method: "get",
    };

    this.$http(options).then((res) => {
      this.project = res.data;
      console.log(res.data);
    });

    let getVideos = {
      url: `videos/${this.$route.params.id}`,
      method: "get",
    };

    this.$http(getVideos)
      .then((res) => {
        this.$store.commit("SAVE_VIDEOS", res.data);
      })
      .catch((err) => {
        this.$store.commit("SAVE_VIDEOS", []);
      });
  },
  updated() {
    this.calculatePrice
  },
};
</script>

<style lang="scss" scoped>
.payout-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  /* align-items: flex-end; */

  /* width: 340px; */
}

.location-row {
  align-items: center;
  .ic {
    margin-right: 8px;
  }
}
</style>
