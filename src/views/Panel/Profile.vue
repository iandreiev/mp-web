<template>
  <div id="user">
    <MPreloader />

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
              {{ $t(item.title) }}
            </li>
          </router-link>
        </ul>
      </div>
      <!-- Dropdown start -->

      <div class="dropdown-nav" @click="showMiniNav = !showMiniNav">
        <div class="dropdown-nav-choose-current">
          <div class="dropdown-nav-current">
            <div :class="`ic ic_${curPage.icon}`"></div>
            <p class="text-dark">{{ $t(curPage.title) }}</p>
          </div>
          <div
            class="ic ic_arrow_down"
            :class="{ 'ic_arrow_down-active': showMiniNav }"
          ></div>
        </div>
      </div>
      <div
        class="dropdown-nav-items"
        :class="{ 'dropdown-nav-items--active': showMiniNav }"
      >
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
      <div class="user-card" :class="{ borderProfile: first }">
        <div class="user-card-head">
          <div class="row user-row">
            <div class="col">
              <div class="user-avatar">
                <img :src="user.avatar" alt="" />
              </div>
            </div>
            <div class="col user-meta">
              <div class="user-displayname">
                {{ user.name + " " + user.surname }}
              </div>
              <div class="row">
                <div class="user-meta-item">
                  <p class="text-accent-1">ID:</p>
                  <p class="text-dark">{{ userid }}</p>
                </div>
                <div class="user-meta-item">
                  <p class="text-accent-1">{{ $t("userStatus") }}</p>
                  <p class="text-dark">
                    {{
                      user.status == 0
                        ? $t("User")
                        : user.status == 1
                        ? $t("Admin")
                        : user.status == 2
                        ? $t("Moderator")
                        : user.status == 3
                        ? $t("Banned")
                        : user.status == 4
                        ? $t("Golden")
                        : user.status == 5
                        ? $t("Platinum")
                        : user.status == 6
                        ? $t("Silver")
                        : $t("User")
                    }}
                  </p>
                </div>
                <div class="user-meta-item">
                  <p class="text-accent-1">{{ $t("userRating") }}</p>
                  <p class="text-dark">
                    {{
                      user.rating == 0
                        ? $t("Default")
                        : user.rating == 1
                        ? $t("Golden")
                        : user.rating == 2
                        ? $t("Platinum")
                        : user.rating == 3
                        ? $t("Silver")
                        : $t("Default")
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="user-card-body">
          <div class="user-finance">
            <div class="user-finance-item">
              <div class="ic ic_fund"></div>
              <p class="text-accent-1">{{ $t("userTotalFunds") }}</p>
              <p class="result">${{ user.funds }}</p>
            </div>
            <div class="user-finance-item">
              <div class="ic ic_total_share"></div>
              <p class="text-accent-1">{{ $t("userTotalShare") }}</p>
              <p class="result">{{ user.percents }} %</p>
            </div>
            <div class="user-finance-item">
              <div class="ic ic_incoming"></div>
              <p class="text-accent-1">{{ $t("userAvgReturns") }}</p>
              <p class="result">
                {{ (withdraws[0].returns / 100000) * 100 }} %
              </p>
            </div>
            <div class="user-finance-item">
              <div class="ic ic_total_return"></div>
              <p class="text-accent-1">{{ $t("userTotalReturns") }}</p>
              <p class="result">{{ withdraws[0].returns }} MNP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MPreloader from "../../components/UI/m-preloader";

export default {
  metaInfo() {
    return { title: this.$t("pProfile") };
  },
  components: {
    MPreloader,
  },
  props: {
    routes: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      borderProfile: null,
      showMiniNav: false,
      curPage: {
        icon: "user",
        title: "pProfile",
      },
      stats: {
        avgReturn: 0,
      },
    };
  },
  methods: {
    showNavItems() {
      this.showMiniNav = !this.showMiniNav;
    },
  },
  mounted() {
    let getUserStats = {
      url: `users/stats/${this.userid}`,
      method: "get",
    };

    let getProjectsStats = {
      url: "stats/projects/",
      method: "get",
    };

    let getReturns = {
      url: `users/returns/${this.userid}`,
      method: "get",
    };

    this.$http(getUserStats).then((res) => {
      this.$store.commit("SAVE_INVEST", res.data);
    });

    this.$http(getProjectsStats).then((res) => {
      this.$store.commit("SAVE_STAT", res.data);
    });

    this.$http(getReturns).then((res) => {
      this.$store.commit("SAVE_WITHDRAWS", res.data);
    });

    // if(this.user == []){
    //   this.$store.commit("IS_LOADING", false)
    // }else{
    //   this.$store.commit("IS_LOADING", true)

    // }

    this.$store.commit("IS_FIRST", true);
  },
  computed: {
    ...mapState(["user","investings", "stat", "withdraws", "last", "first"]),
    userid(){
      return this.user.id === undefined ? this.user.userID : this.user.id === undefined ? this.user.userID : this.user.id
    }
  },
  watch: {
    $route(to, from) {
      let page = this.$route.name;
      console.log(page);
      if (page == "Profile") {
        this.curPage = "Profile";
      } else {
      }
    },
  },
};
</script>

<style>
</style>