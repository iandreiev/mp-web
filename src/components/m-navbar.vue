<template>
  <div >
    <div class="navbar-mobile" :class="{ 'make-blue': showNav }">
      <div
        class="logo-blend"
        @click="toHome"
        :class="{ unvisible: showNav }"
      ></div>
      <div
        class="lang-selector"
        @click="isLangDrop = !isLangDrop"
        :class="{ unvisible: showNav }"
       
      >
        <div class="lang-selector-item">
          <img
            :src="
              locale == 'ru'
                ? 'https://ak.picdn.net/shutterstock/videos/6483341/thumb/1.jpg'
                : locale == 'en-gb'
                ? 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png'
                : locale == 'zh-cn'
                ? 'https://cdn.britannica.com/90/7490-004-BAD4AA72/Flag-China.jpg'
                : locale
            "
            alt=""
          />
          <p class="lang-title">
            {{
              locale == "ru"
                ? "RU"
                : locale == "en-gb"
                ? "EN"
                : locale == "zh-cn"
                ? "CH"
                : locale
            }}
          </p>
          <div class="ic ic_dropdown"></div>
        </div>
      </div>

      <div
        class="lang_dropdown"
        :class="{ 'lang_dropdown--active': isLangDrop }"
      >
        <div @click="setLocale('ru')" class="lang_dropdown-item">
          <img
            src="https://ak.picdn.net/shutterstock/videos/6483341/thumb/1.jpg"
            alt=""
          />
          <p>RU</p>
        </div>
        <div @click="setLocale('en-gb')" class="lang_dropdown-item">
          <img src="../assets/flags/uk.png" alt="" />
          <p>EN</p>
        </div>
        <div @click="setLocale('zh-cn')" class="lang_dropdown-item">
          <img
            src="https://cdn.britannica.com/90/7490-004-BAD4AA72/Flag-China.jpg"
            alt=""
          />
          <p>CH</p>
        </div>
      </div>
      <div @click="openLogin()" v-if="auth == false">
        <div class="ic ic-navbar-user ic_user"></div>
      </div>
      <div
        v-else
        @click="toProfile"
        class="navbar-mobile-user"
        :class="{ unvisible: showNav }"
      >
        <img :src="user.avatar" alt="" />
      </div>
      <div
        class="nav-btn"
        @click="showNav = !showNav"
        :class="{ 'nav-btn-active': showNav }"
      >
        <input type="checkbox" name="showNav" id="" v-model="showNav" />
        <div class="line line-1"></div>
        <div class="line line-2"></div>
        <div class="line line-3"></div>
      </div>
    </div>
    <div
      class="navbar-mobile-wrapper"
      :class="{ 'navbar-mobile-wrapper-active': showNav }"
    >
      <div class="logo-white"></div>
      <ul class="navbar-mobile-links">
        <router-link
          v-for="(i, index) in routes"
          :key="index"
          :to="i.path"
          v-slot="{ href, navigate, isActive, isExactActive }"
        >
          <li
            :class="[
              isActive && 'navbar-mobile-link-active',
              isExactActive && 'navbar-mobile-link-exact-active',
            ]"
            class="navbar-mobile-link"
          >
            <a :href="href" @click="navigate">{{ $t(i.title) }}</a>
          </li>
        </router-link>
      </ul>

      <div class="navbar-mobile-footer">
        <div class="navbar-mobile-footer-item">
          <p>{{ $t("footerFirstPhoneTitle") }}</p>
          <b>+7 (999) 43-32-12</b>
        </div>
        <div class="navbar-mobile-footer-item">
          <p>{{ $t("footerFirstSecondTitle") }}</p>
          <b>+7 (999) 43-32-12</b>
        </div>
      </div>
    </div>
    <div class="navbar">
      <!-- MOBILE END  -->
      <div class="container">
        <div class="row">
          <div class="col-12 navbar-logo-regular-wrapper">
            <div class="navbar-logo-regular" @click="toHome"></div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 navbar-item-wrapper">
            <div class="navbar-item">
              <div class="navbar-logo-default" @click="toHome"></div>
              <div class="lang-selector" v-click-outside="cancelLang" @click="toggleLang()">
                <div class="lang-selector-item">
                  <img
                    :src="
                      locale == 'ru'
                        ? 'https://ak.picdn.net/shutterstock/videos/6483341/thumb/1.jpg'
                        : locale == 'en-gb'
                        ? 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png'
                        : locale == 'zh-cn'
                        ? 'https://cdn.britannica.com/90/7490-004-BAD4AA72/Flag-China.jpg'
                        : ''
                    "
                    alt=""
                  />
                  <p class="lang-title">
                    {{
                      locale == "ru"
                        ? "RU"
                        : locale == "en-gb"
                        ? "EN"
                        : locale == "zh-cn"
                        ? "CH"
                        : "RU"
                    }}
                  </p>
                  <div class="ic ic_dropdown"></div>
                </div>
              </div>

              <div
                class="lang_dropdown"
                :class="{ 'lang_dropdown--active': showLangs }"
              >
                <div class="lang_dropdown-item" @click="setLocale('ru')">
                  <img
                    src="https://ak.picdn.net/shutterstock/videos/6483341/thumb/1.jpg"
                    alt=""
                  />
                  <p>RU</p>
                </div>
                <div class="lang_dropdown-item" @click="setLocale('zh-cn')">
                  <img
                    src="https://cdn.britannica.com/90/7490-004-BAD4AA72/Flag-China.jpg"
                    alt=""
                  />
                  <p>CH</p>
                </div>
                <div class="lang_dropdown-item" @click="setLocale('en-gb')">
                  <img src="../assets/flags/uk.png" alt="" />
                  <p>EN</p>
                </div>
              </div>
            </div>
            <div class="navbar-item">
              <ul class="navbar-links">
                <router-link
                  v-for="(i, index) in routes"
                  :key="index"
                  :to="i.path"
                  v-slot="{ href, navigate, isActive, isExactActive }"
                >
                  <li
                    :class="[
                      isActive && 'navbar-link-active',
                      isExactActive && 'navbar-link-exact-active',
                    ]"
                    class="navbar-link"
                  >
                    <a :href="href" @click="navigate">{{ $t(i.title) }}</a>
                  </li>
                </router-link>
              </ul>
            </div>
            <div class="navbar-item" v-if="auth == false">
 <div class="navbar-search-wrapper">
                <div class="search-input-group">
                                  <div class="btn-search ic_search"></div>
                <input
                  autocomplete="off"
                  @keyup.delete="
                    selected = {};
                    keyword = '';
                  "
                  @keydown.down="moveDown"
                  @keydown.up="moveUp"
                  @keydown.enter="onSelect(filteredItems[highlight])"
                  @input="onInput($event.target.value)"
                  @blur="keyword = ''"
                  type="text"
                  name="search"
                  id="search"
                  :placeholder="$t('Search')"
                  class="search"
                  v-model="kword"
                />
                </div>
                <div
                  v-show="kword && !selected.title"
                  class="navbar-search-wrapper-box"
                >
                  <p v-show="filteredItems.length == 0" class="text-accent-1">
                    {{$t('NotFoundSearch') + kword}}
                  </p>

                  <div
                    @click="onSelect(item, item.id)"
                    @mouseenter="highlight = i"
                    class="item"
                    :class="{ highlight: i == highlight }"
                    v-for="(item, i) in filteredItems"
                    :key="item.id"
                  >
                    {{
                      locale == "ru"
                        ? item.title
                        : locale == "en-gb"
                        ? item.title_en
                        : locale == "zh-cn"
                        ? item.title_ch
                        : "Unknown lang"
                    }}
                  </div>
                </div>
              </div>
              <!-- <MButton :btnClass="`btn btn-regular`" @click="showModal = true">Login</MButton> -->
              <MButton :btnClass="`btn btn-regular`" v-on:click="openLogin()">{{
                $t("LoginTitle")
              }}</MButton>
              
            </div>

            <div class="navbar-item" v-else-if="auth == true">
              <div class="navbar-search-wrapper">
                <div class="search-input-group">
                                  <div class="btn-search ic_search"></div>
                <input
                  autocomplete="off"
                  @keyup.delete="
                    selected = {};
                    keyword = '';
                  "
                  @keydown.down="moveDown"
                  @keydown.up="moveUp"
                  @keydown.enter="onSelect(filteredItems[highlight])"
                  @input="onInput($event.target.value)"
                  @blur="keyword = ''"
                  type="text"
                  name="search"
                  id="search"
                  :placeholder="$t('Search')"
                  class="search"
                  v-model="kword"
                />
                </div>
                <div
                  v-show="kword && !selected.title"
                  class="navbar-search-wrapper-box"
                >
                  <p v-show="filteredItems.length == 0" class="text-accent-1">
                    {{$t('NotFoundSearch') + kword}}
                  </p>

                  <div
                    @click="onSelect(item, item.id)"
                    @mouseenter="highlight = i"
                    class="item"
                    :class="{ highlight: i == highlight }"
                    v-for="(item, i) in filteredItems"
                    :key="item.id"
                  >
                    {{
                      locale == "ru"
                        ? item.title
                        : locale == "en-gb"
                        ? item.title_en
                        : locale == "zh-cn"
                        ? item.title_ch
                        : "Unknown lang"
                    }}
                  </div>
                </div>
              </div>

              <div class="navbar-user">
                <div class="navbar-user-meta-course">
                  <div class="navbar-user-meta-course-item">
                    <p class="text-accent-1 item-title">{{ $t("course") }}</p>
                    <div class="row">
                      <div class="icon-row">
                        <p>1</p>
                        <div class="ic ic-usdt"></div>
                      </div>
                      <p style="margin:0px 4px;">=</p>
                      <div class="icon-row">
                        <p>1</p>
                        <div class="ic ic_mnp"></div>
                      </div>
                    </div>
                  </div>
                  <div class="navbar-user-meta-course-item">
                    <p class="text-accent-1 item-title">{{ $t("balance") }}</p>
                    <div class="icon-row">
                      <p>{{
                        wallet.balance > 0
                          ? wallet.balance
                          : wallet.balance == null
                          ? 0
                          : ""
                      }}</p>

                      <div class="ic ic_mnp"></div>
                    </div>
                  </div>
                </div>
                <div class="navbar-user-meta" v-click-outside="cancelUserMenu" @click="toggleUserMenu()">
                  <div class="counter" v-if="getListOfNotifications != 0">
                    {{getListOfNotifications}}
                  </div>
                  <div class="navbar-user-meta-avatar">
                    <img :src="user.avatar" alt="" />
                  </div>
                  <p class="navbar-user-meta-name">
                    {{ user.name + " " + user.surname }}
                  </p>
                </div>
                <div
                  class="dropdown"
                  :class="{ 'dropdown--active': showUserNav }"
                >
                  <ul class="dropdown-links">
                    <router-link
                      v-for="(i, index) in panelRoutes"
                      :key="index"
                      :to="i.path"
                      v-slot="{ href, navigate, isActive, isExactActive }"
                    >
                      <li
                        :class="[
                          isActive && 'dropdown-links-item-active',
                          isExactActive && 'dropdown-links-item-exact-active',
                        ]"
                        class="dropdown-links-item"
                      >
                        <a :href="href" @click="navigate">{{ $t(i.title) }}</a>
                      </li>
                    </router-link>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MLoginModal />
    <MRegisterModal />
  </div>
</template>

<script>
var moment = require("moment");

import firebase from "firebase";
import { mapState } from "vuex";

import MButton from "../components/UI/m-button";
import MLoginModal from "../components/m-login";
import MRegisterModal from "../components/m-register";
export default {
  components: { MButton, MLoginModal, MRegisterModal,  },
  directives:{
    
  },
  data() {
    return {
      showModal: false,
      isLangDrop: false,
      showRegister: false,
      dataList: [],
      kword: "",
      selected: {},
      highlight: 0,
      test: false,
      lang: null,
      // auth: false,
      moment: moment,
      isDropDown: false,
      showNav: false,
      email: null,
      username: null,
      name: null,
      surname: null,
      avatar: null,
      token: null,
      // user: [],
      error: [],
      routes: [
        { path: "/", title: "Home" },
        { path: "/projects", title: "Projects" },
        { path: "/about", title: "About" },
        { path: "/contacts", title: "Contacts" },
      ],
      panelRoutes: [
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
          icon: "msg",
        },
        {
          path: "/me/settings",
          title: "pSettings",
          icon: "settings",
        },
        {
          path: "/me/affilate",
          title: "pAffilate",
          icon: "exclude",
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
  methods: {
        cancelLang(){
      this.$store.commit('SET_DROPDOWN_LANG', false)
    },
    toggleLang(){
      this.$store.commit('SET_DROPDOWN_LANG', true)
    },
    toggleUserMenu(){
      this.$store.commit('SET_DROPDOWN_USER', true)
    },
    cancelUserMenu(){
      this.$store.commit('SET_DROPDOWN_USER', false)
    },
    setLocale(locale) {
      this.$i18n.locale = locale;
      moment.locale(locale);
      this.$store.commit("SAVE_LOCALE", locale);
      this.isLangDrop = false;
    },
    openDrop() {
      this.isDropDown = !this.isDropDown;
    },
    openLang() {
      this.isLangDrop = !this.isLangDrop;
    },
    openLogin() {
      this.$store.commit("SHOW_LOGIN", true);
    },
    openRegister() {
      this.$store.commit("SHOW_REGISTER", true);

    },
    openNav() {
      this.showNav = !this.showNav;
    },
    toProfile() {
      this.$router.push({ name: "Profile" });
    },
    toHome() {
      this.$router.push({ name: "Home" });
    },
    onInput(value) {
      if (value === "") this.selected = {};

      if (this.filteredItems.length == 1 && this.highlight) this.highlight = 0;

      this.test = /^[ а-яА-я]/.test(this.keyword);
    },
    onSelect(val, id) {
      this.selected = val;
      this.kword = this.selected.title;

      this.highlight = 0;

      this.$router.push({ name: "ProjectItem", params: { id: id } });
    },
    mark(word) {
      const regex = new RegExp("(" + this.keyword + ")", "gi");
      return word.replace(regex, "<mark>$1</mark>");
    },
    moveUp() {
      if (!this.kword) return;
      this.highlight =
        this.highlight - 1 < 0
          ? this.filteredItems.length - 1
          : this.highlight - 1;

    },
    moveDown() {
      if (!this.kword) return;
      this.highlight = (this.highlight + 1) % this.filteredItems.length;
    },
    gAuth() {
      const provider = new firebase.auth.GoogleAuthProvider();
      const BASEURL =
        "https://us-central1-monopoly-life.cloudfunctions.net/app";
      const USERS = "/users";
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((res) => {
          (this.email = res.user.email), (this.username = res.user.displayName);
          this.name = res.additionalUserInfo.profile.given_name;
          this.surname = res.additionalUserInfo.profile.family_name;
          this.avatar = res.additionalUserInfo.profile.picture;
          this.locale = res.additionalUserInfo.profile.locale;
          this.token = res.credential.idToken;

          let body = {
            username: this.username,
            email: this.email,
            name: this.name,
            surname: this.surname,
            avatar: this.avatar,
            locale: this.locale,
            token: this.token,
            password: this.token,
            isVerified: false,
            isEmailVerified: true,
            isPhoneVerified: false,
          };
          let access = {
            url: BASEURL + USERS,
            method: "post",
            data: body,
          };

          this.$http(access)
            .then((res) => {
              this.$store.commit("SAVE_USER", res.data);

              let getWallet = {
                url: `${BASEURL + "/users/" + res.data.id + "/wallet"}`,
                method: "get",
              };

              this.$http(getWallet)
                .then((res) => {
                  this.$store.commit("SAVE_USER_WALLET", res.data);
                })
                .catch((err) => {
                  console.log(err);
                });
              this.$router.push({ name: "UserWrapper" });
            })
            .catch((err) => {
              this.error = err;
            });
        });
    },
    getMessages(){
          this.auth == true ? this.$store.dispatch('getUserMsgs', this.user.id) : ''
    },
        getMessagesCounter(){
          this.auth == true ? this.$store.dispatch('getUserMsgsCount', this.user.id) : ''
    },
    getNots(){
        this.auth == true ? this.$store.dispatch('getUserNots', this.user.id) : console.log('login first')
    }
  },
  computed: {
    ...mapState([
      'messages',
      'notifications',
      "user",
      "auth",
      "wallet",
      "locale",
      "setup",
      "isSearch",
      "locale",
      "showLangs",
      "showUserNav",
      "msg_counter"
    ]),
    getListOfNotifications(){
      let nots = this.notifications
      let msg =  parseInt(this.msg_counter.result)
      let not = nots.filter(i=>i.type == 1).length
      console.log('Notification all:', msg+not)
      return msg + not
    },
    filteredItems() {
      if (this.locale == "ru") {
        return this.dataList
          .filter((item) => {
            return item.title.toLowerCase().includes(this.kword.toLowerCase());
          })
          .slice(0, 10);
      }

      if (this.locale == "en-gb") {
        return this.dataList
          .filter((item) => {
            return item.title_en
              .toLowerCase()
              .includes(this.kword.toLowerCase());
          })
          .slice(0, 10);
      }

      if (this.locale == "zh-cn") {
        return this.dataList
          .filter((item) => {
            return item.title_ch
              .toLowerCase()
              .includes(this.kword.toLowerCase());
          })
          .slice(0, 10);
      }
    },
  },
  mounted() {
    this.lang = JSON.parse(localStorage.locale)
    let options = {
      url: "projects",
      method: "get",
    };

    this.$http(options).then((res) => {
      this.dataList = res.data;
    });

    this.getNots()
    this.getMessages()
    this.getMessagesCounter()
  },
};
</script>

<style>
</style>