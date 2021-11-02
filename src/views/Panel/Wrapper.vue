<template>
  <div id="panel">
    <MNavbar />
    <MSection :id="'user'">
      <router-view
        :borderLogout="borderLogout"
        :borderProfile="borderProfile"
        :routes="routes"
        :user="user"
      />
    </MSection>
    <MSection :id="'show-recs'">
      <div v-if="showRecs == true">
        <h1 class="rec-head">{{ $t("recomendations") }}</h1>
        <div id="user-projects">
          <div class="row catalogue-column">
            <MProjectItem
              v-for="i in projects"
              :key="i.id"
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
              :projectBrief_ch="i.projectBrief_ch"
              :projectBrief="i.projectBrief"
              :projectBrief_en="i.projectBrief_en"
              :invested="i.invested"
              :pledged="i.pledged"
              :backers="i.backers"
              :createdAt="i.createdAt"
              :entrance="i.entrance"
              :annual="i.annual"
              :return="i.return"
              :cost="i.cost"
            />
          </div>
        </div>
      </div>
      <div v-else></div>
    </MSection>
    <MFooter />
  </div>
</template>

<script>
import MNavbar from "../../components/m-navbar";
import MFooter from "../../components/m-footer";
import MSection from "../../components/UI/m-section";
import MProjectItem from "../../components/m-project-card";
import { mapState } from "vuex";
export default {
  components: {
    MNavbar,
    MFooter,
    MSection,
    MProjectItem,
  },

  data() {
    return {
      pageRoute: "UserProjects",
      showRecs: false,
      borderProfile: true,
      borderLogout: false,

      routes: [
        {
          path: "/me/profile",
          title: "pProfile",
          icon: "user",
        },
        {
          path: "/me/projects",
          title: "pProjects",
          icon: "projects",
        },
        {
          path: "/me/wallet",
          title: "pWallet",
          icon: "wallet",
        },
        {
          path: "/me/messages",
          title: "pMessages",
          icon: "chat",
        },
        {
          path: "/me/settings",
          title: "pSettings",
          icon: "settings",
        },
        {
          path: "/me/affilate",
          title: "pAffilate",
          icon: "affilate",
        },
        // {
        //   path: "/me/bidding",
        //   title: "pBid",
        //   icon: "bid",
        // },
        {
          path: "/me/history",
          title: "pHistory",
          icon: "history",
        },
        {
          path: "/me/logout",
          title: "pLogout",
          icon: "logout",
        },
      ],
    };
  },
  computed: {
    ...mapState(["user", "auth", "projects", "locale"]),
    checkId() {
      let id = 0;
      if (this.user.id === undefined) {
        id = this.user.userID;
      } else if (this.user.userID === undefined) {
        id = this.user.id;
      }

      return id;
    },
  },

  methods: {
    getNew() {
      if (this.checkId !== undefined) {
        let getNotify = {
          url: `${"notifications/user/" + this.checkId}`,
          method: "get",
        };

        let getMsg = {
          url: `${"chat/" + this.checkId}`,
          method: "get",
        };
        this.$http(getNotify)
          .then((res) => {
            this.$store.commit("SAVE_NOTIFICATIONS", res.data);
          })
          .catch((err) => {
            console.log(err);
          });

        this.$http(getMsg).then((res) => {
          this.$store.commit("SAVE_MESSAGES", res.data);
        });
      }
    },
  },
  mounted() {
    console.log(this.checkId);

    let getProjects = {
      url: "projects",
      method: "get",
    };

    let getCategories = {
      url: "categories",
      method: "get",
    };

    this.$http(getProjects).then((res) => {
      this.$store.commit("SAVE_PROJECTS", res.data);
    });
    this.$http(getCategories).then((res) => {
      this.$store.commit("SAVE_CATEGORIES", res.data);
    });

    setInterval(() => {
      this.getNew();
    }, 30000);
  },
  watch: {
    $route(to, from) {
      let page = this.$route.name;

      if (page == "UserProjects") {
        this.showRecs = true;
      } else {
        this.showRecs = false;
      }
    },
  },
};
</script>

<style>
.rec-head {
  text-align: center;
}
</style>