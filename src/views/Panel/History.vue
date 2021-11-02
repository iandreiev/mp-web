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
      <div class="user-card">
        <div class="empties" v-if="Object.keys(history).length == []">
          <p class="text-accent-1">{{ $t("emptyHistory") }}</p>
          <router-link class="btn btn-regular" :to="{ name: 'Projects' }">{{
            $t("viewProjects")
          }}</router-link>
        </div>
        <table class="table table-bidding" v-else>
          <thead>
            <th>ID</th>
            <th>{{ $t("createdAt") }}</th>
            <th>{{ $t("action") }}</th>
            <th>{{ $t("amount") }}</th>
            <th>{{ $t("status") }}</th>
          </thead>
          <tbody>
            <router-link
              tag="tr"
              :to="{ path: `/me/history/${i.id}`, props: { id: i.id } }"
              v-for="i in history"
              :key="i.id"
            >
              <td>{{ i.id }}</td>
              <td>{{ i.createdAt | moment("DD.MM.YYYY") }}</td>
              <td>
                {{
                  i.action == "buy"
                    ? $t("buy")
                    : i.action == "sell"
                    ? $t("sell")
                    : i.action == "withdraw"
                    ? $t("withdraw")
                    : i.action
                }}
              </td>
              <td>
                <div class="icon-row">
                  {{ i.amount }}
                  <div class="ic ic_mnp"></div>
                </div>
              </td>
              <td>
                {{
                  i.proviso == 200
                    ? $t("Enrollment")
                    : i.proviso == 201
                    ? $t("Provided")
                    : i.proviso == 401
                    ? $t("Canceled")
                    : i.proviso
                }}
              </td>
            </router-link>
          </tbody>
        </table>

        <div class="table-mobile">
          <router-link
            tag="div"
            class="table-mobile-item"
            :to="{ path: `/me/history/${i.id}`, props: { id: i.id } }"
            v-for="i in history"
            :key="i.id"
          >
            <div class="col-6">
              <div class="table-mobile-item--title">ID:</div>
              <div class="table-mobile-item--title">{{ $t("createdAt") }}</div>
              <div class="table-mobile-item--title">{{ $t("action") }}</div>
              <div class="table-mobile-item--title">{{ $t("amount") }}</div>
              <div class="table-mobile-item--title">{{ $t("status") }}</div>
            </div>
            <div class="col-6">
              <div class="table-mobile-item--body">{{ i.id }}</div>
              <div class="table-mobile-item--body">
                {{ i.createdAt | moment("DD.MM.YYYY") }}
              </div>
              <div class="table-mobile-item--body">
                {{
                  i.action == "buy"
                    ? $t("buy")
                    : i.action == "sell"
                    ? $t("sell")
                    : i.action
                }}
              </div>
              <div class="table-mobile-item--body">
                <div class="icon-row">
                  {{ i.amount }}
                  <div class="ic ic_mnp"></div>
                </div>
              </div>
              <div class="table-mobile-item--body">
                {{
                  i.proviso == 200
                    ? $t("Enrollment")
                    : i.proviso == 201
                    ? $t("Provided")
                    : i.proviso == 401
                    ? $t("Canceled")
                    : i.proviso
                }}
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
   metaInfo() {
      return {title: this.$t('pHistory')}
    },
  props: {
    routes: {
      type: Array,
      required: true,
    },
    borderProfile: {
      type: Boolean,
    },
    borderLogout: {
      type: Boolean,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showMiniNav: false,
      curPage: {
        icon: "history",
        title: "pHistory",
      },
    };
  },
  methods: {
    showNavItems() {
      this.showMiniNav = !this.showMiniNav;
    },
  },
  computed: mapState(["history"]),
  mounted() {
    let Logs = "logs/";
    let uID = this.user.id;

    let getLogs = {
      url: `${Logs + uID}`,
      method: "get",
    };
    this.$http(getLogs)
      .then((res) => {
        this.$store.commit("SAVE_HISTORY", res.data);
        console.log(res);
      })
      .catch((err) => {
        let res = err.response.status;

        if (res == 400 || res == 404) {
          this.$store.commit("SAVE_HISTORY", []);
        }
      });
  },
};
</script>

<style>
</style>