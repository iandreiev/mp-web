<template>
  <div id="user user-messages">
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
      <div class="user-card">
        <div class="messages-section">
          <MTabs>
            <MTabItem :selected="true" :name="$t('notifications')">
              <div
                class="empties"
                v-if="Object.keys(notifications).length == []"
              >
                <p class="text-accent-1">{{ $t("emptyNotifications") }}</p>
              </div>
              <div
                class="notifications"
                v-else-if="Object.keys(notifications).length > 0"
              >
                <div
                  class="notification-item"
                  v-for="(item, index) in notifications.slice(0, 12)"
                  :key="index"
                >
                  <div class="col icon-wrapper">
                    <div
                      class="ic ic_bell"
                      :class="{ ic_bell_active: item.type }"
                    ></div>
                  </div>
                  <div class="col-12">
                    <div class="notification-item-row">
                      <p
                        class="notification-item-message"
                        :class="{
                          'notification-item-message--active': item.type,
                        }"
                      >
                        {{ item.content }}
                      </p>
                      <p class="text-accent-1 notification-item-date">
                        {{ item.createdAt | moment("DD.MM.YYYY") }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="notifications-mobile" v-else>
                <div
                  class="notification-item"
                  v-for="(item, index) in notifications.slice(0, 12)"
                  :key="index"
                >
                  <div class="row notification-head">
                    <div class="icon-wrapper">
                      <div
                        class="ic ic_bell"
                        :class="{ ic_bell_active: item.new }"
                      ></div>
                    </div>

                    <p class="text-accent-1">
                      {{
                        item.createdAt | moment("dddd, MMMM Do YYYY, h:mm:ss a")
                      }}
                    </p>
                  </div>
                  <div class="row">
                    <p
                      class="notification-item-message"
                      :class="{
                        'notification-item-message--active': item.type,
                      }"
                    >
                      {{ item.content }}
                    </p>
                  </div>
                </div>
              </div>
            </MTabItem>
            <MTabItem :name="$t('messages')">
              <MButton
                :btnClass="'btn btn-regular app-button'"
                @click="toCreate"
                >{{ $t("sendMsg") }}</MButton
              >
              <div class="empties" v-if="Object.keys(messages).length == []">
                <p class="text-accent-1">{{ $t("emptyMessages") }}</p>
              </div>
              <div
                class="app-table-wrapper"
                v-else-if="Object.keys(messages).length > 0"
              >
                <table class="table">
                  <thead>
                    <th v-for="(item, index) in messages" :key="index">
                      {{ $t(item.title) }}
                    </th>
                  </thead>
                  <tbody>
                    <router-link
                      tag="tr"
                      :to="{
                        name: 'MessageItem',
                        params: { id: item.id },
                        props: { id: item.id },
                      }"
                      v-for="(item, index) in messages"
                      :key="index"
                    >
                      <td>{{ item.createdAt | moment("DD.MM.YYYY") }}</td>
                      <td>{{ item.chatTitle }}</td>
                      <td>
                        {{
                          item.type == 1
                            ? $t("open")
                            : item.type == 2
                            ? $t("closed")
                            : ""
                        }}
                      </td>
                      <td>{{ item.id }}</td>
                    </router-link>
                  </tbody>
                </table>
              </div>

              <div class="table-mobile" v-else>
                <router-link
                  tag="div"
                  class="table-mobile-item"
                  :to="{
                    name: 'MessageItem',
                    params: { id: item.id },
                    props: { id: item.id },
                  }"
                  v-for="(item, index) in messages"
                  :key="index"
                >
                  <div class="col-6">
                    <div class="table-mobile-item--title">
                      {{ $t("createdAt") }}
                    </div>
                    <div class="table-mobile-item--title">
                      {{ $t("topic") }}
                    </div>
                    <div class="table-mobile-item--title">
                      {{ $t("status") }}
                    </div>
                    <div class="table-mobile-item--title">ID:</div>
                  </div>
                  <div class="col-6">
                    <div class="table-mobile-item--body">
                      {{
                        item.createdAt | moment("dddd, MMMM Do YYYY, h:mm:ss a")
                      }}
                    </div>
                    <div class="table-mobile-item--body">
                      {{ item.chatTitle }}
                    </div>
                    <div class="table-mobile-item--body">
                      {{
                        item.type == 1
                          ? $t("open")
                          : item.type == 0
                          ? $t("closed")
                          : ""
                      }}
                    </div>
                    <div class="table-mobile-item--body">{{ item.id }}</div>
                  </div>
                </router-link>
              </div>

              <div class="fab-wrapper">
                <div class="fab fab-regular" @click="toCreate">+</div>
              </div>
            </MTabItem>
          </MTabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//TODO: Pagination

import MTabs from "../../components/UI/m-tabs";
import MTabItem from "../../components/UI/m-tabs-item";
import MTable from "../../components/UI/table/m-table";
import MTableItem from "../../components/UI/table/m-table-item";
import MButton from "../../components/UI/m-button";
import { mapState } from "vuex";

export default {
  metaInfo() {
    return { title: this.$t("pMessages") };
  },
  components: {
    MTabs,
    MTabItem,
    MTable,
    MTableItem,
    MButton,
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
      required: false,
    },
  },
  data() {
    return {
      table: [
        { title: "Created At" },
        { title: "Topic" },
        { title: "Status" },
        { title: "Number" },
      ],
      showMiniNav: false,
      curPage: {
        icon: "chat",
        title: "Messages",
      },
    };
  },
  methods: {
    setNotifType(id, type) {
      let options = {
        url: `notifications/${id}/0`,
        method: "patch",
      };
      let getNotify = {
        url: `${"notifications/user/" + this.user.id}`,
        method: "get",
      };

      if (type == 0) {
      } else {
        this.$http(options)
          .then((res) => {})
          .then(() => {
            this.$http(getNotify).then((res) => {
              this.$store.commit("SAVE_NOTIFICATIONS", res.data);
            });
          })
          .catch((err) => {
            console.error("Піймав на вила");
          });
      }
    },

    toCreate() {
      this.$router.push({ name: "CreateMessage" });
    },
    showNavItems() {
      this.showMiniNav = !this.showMiniNav;
    },
  },
  computed: mapState(["messages", "notifications"]),
  mounted() {
    setTimeout(() => {
      let notifs = this.notifications;

      notifs.forEach((i) => {
        this.setNotifType(i.id, i.type);
      });
    }, 5000);

    let getNotify = {
      url: `${"notifications/user/" + this.user.id}`,
      method: "get",
    };

    let getMsg = {
      url: `${"chat/" + this.user.id}`,
      method: "get",
    };

    this.$http(getNotify).then((res) => {
      this.$store.commit("SAVE_NOTIFICATIONS", res.data);
    });

    this.$http(getMsg).then((res) => {
      console.log(res.data)
      this.$store.commit("SAVE_MESSAGES", res.data);
    });
  },
};
</script>

<style>
</style>