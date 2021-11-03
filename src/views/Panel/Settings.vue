<template>
  <div id="user user-profile">
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
        <div class="row catalogue-column">
          <div class="col wallet-meta">
            <div class="addPhoto">
              <img
                :src="user.avatar"
                @mouseover="addphoto = true"
                @mouseleave="addphoto = false"
                width="200"
                alt=""
              />
              <div
                class="addPhoto_uploader"
                @mouseover="addphoto = true"
                @mouseleave="addphoto = false"
                :class="{ 'addPhoto_uploader-active': addphoto }"
              >
                <div class="addPhoto_uploader-wrapper">
                  <label for="avatar" class="avatar-select">
                    <div class="ic ic_add"></div>

                    <input
                      type="file"
                      @change="previewAvatar"
                      name="avatar"
                      id="avatar"
                    />
                  </label>
                </div>
              </div>
            </div>

            <p class="wallet-meta-name">{{ user.name + " " + user.surname }}</p>
            <p class="text-accent-1">id: {{ user.userID }}</p>
            <div class="wallet-meta-status">
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
          </div>
          <div class="col tab-wrapper">
            <MTabs>
              <MTabItem
                :id="'personal'"
                :selected="true"
                :name="$t('personalData')"
              >
                <div class="withdraw-section">
                  <div class="col">
                    <MInputText
                      style="width: 300px"
                      :label="$t('firstName')"
                      v-model="user.name"
                      :placeholder="user.name || $t('firstName')"
                    />
                    <MInputText
                      style="width: 300px"
                      :label="$t('surname')"
                      v-model="user.surname"
                      :placeholder="user.surname || $t('surname')"
                    />
                    <MInputText
                      style="width: 300px"
                      :label="$t('lastName')"
                      v-model="user.fathername"
                      :placeholder="user.fathername || $t('lastName')"
                    />
                  </div>
                  <div class="col">
                    <div class="form-controller" v-show="isMobile == true">
                      <input
                        type="text"
                        name="percent"
                        v-model="user.phone"
                        :placeholder="user.phone || $t('phone')"
                        id="phone"
                      />
                      <div
                        @click="openPhoneVerification"
                        :class="'ic-wrapper ic_' + phoneStatus.icon"
                      ></div>
                    </div>
                    <div class="form-controller" v-show="isMobile == true">
                      <input
                        type="text"
                        name="percent"
                        v-model="user.email"
                        :placeholder="user.email || $t('email')"
                        id="phone"
                      />
                      <div
                        @click="openEmailVerification"
                        :class="'ic-wrapper ic_' + emailStatus.icon"
                      ></div>
                    </div>
                    <div class="d-flex d-flex-row a-c">
                      <div
                        class="status"
                        v-show="isMobile == false"
                        id="status-phone"
                        @click="openPhoneVerification"
                      >
                        <div :class="'ic ic_' + phoneStatus.icon"></div>
                        <p class="text-accent-1">
                          {{ $t(phoneStatus.status) }}
                        </p>
                      </div>
                      <MInputText
                        style="width: 300px"
                        v-show="isMobile == false"
                        v-model="user.phone"
                        :label="$t('phone')"
                        :placeholder="user.phone || $t('phone')"
                      />
                    </div>
                    <div class="d-flex d-flex-row a-c">
                      <div
                        v-show="isMobile == false"
                        class="status"
                        id="status-email"
                        @click="openEmailVerification"
                      >
                        <div :class="'ic ic_' + emailStatus.icon"></div>
                        <p class="text-accent-1">
                          {{ $t(emailStatus.status) }}
                        </p>
                      </div>
                      <MInputText
                        style="width: 300px"
                        v-show="isMobile == false"
                        :label="'E-Mail'"
                        v-model="user.email"
                        :placeholder="user.email || 'E-Mail'"
                      />
                    </div>
                    <MInputText
                      style="width: 300px"
                      :label="$t('taxID')"
                      v-model="user.card"
                      :placeholder="user.card || $t('taxID')"
                    />
                  </div>
                  <div class="row catalogue-column choose-sex">
                    <label class="radio radio-before">
                      <span class="radio__input">
                        <input
                          type="radio"
                          value="1"
                          v-model="user.sex"
                          name="radio"
                        />
                        <span class="radio__control"></span>
                      </span>
                      <span class="radio__label">{{ $t("male") }}</span>
                    </label>
                    <label class="radio radio-before">
                      <span class="radio__input">
                        <input
                          type="radio"
                          value="0"
                          v-model="user.sex"
                          name="radio"
                        />
                        <span class="radio__control"></span>
                      </span>
                      <span class="radio__label">{{ $t("female") }}</span>
                    </label>
                  </div>
                  <div class="meta-button">
                    <MButton
                      :btnClass="'btn btn-regular'"
                      @click="renderData"
                      >{{ $t("save") }}</MButton
                    >
                  </div>
                </div>
              </MTabItem>
              <MTabItem :name="$t('verification')">
                <div class="withdraw-section">
                  <div class="row catalogue-column">
                    <MInputFile
                      :formId="1"
                      v-model="passport1"
                      :description="$t('passport1')"
                    ></MInputFile>
                    <MInputFile
                      :formId="2"
                      v-model="passport2"
                      :description="$t('passport2')"
                    ></MInputFile>
                    <MInputFile
                      :formId="3"
                      v-model="passport3"
                      :description="$t('passport2')"
                    ></MInputFile>
                  </div>

                  <div v-if="(user.isVerified == 1)" class="user-verify">
                    <div class="ic ic_check"></div>
                    <p>{{ $t("verificationSuccess") }}</p>
                  </div>

                  <div v-else></div>

                  <div class="meta-button">
                    <MButton
                      @click="savePassports"
                      :btnClass="'btn btn-regular'"
                      >{{ $t("save") }}</MButton
                    >
                  </div>
                </div>
              </MTabItem>
              <MTabItem :name="$t('password')">
                <MInputPassword
                  :label="'New password'"
                  v-model="changePassword"
                  :placeholder="$t('typePassword')"
                  :id="'password'"
                />
                <MInputPassword
                  :label="'Repeat password'"
                  v-model.lazy="repeatPassword"
                  :placeholder="$t('repeatPassword')"
                  :id="'repeat-password'"
                />
                <transition name="hint" appear>
                  <div
                    v-if="passwordValidation.errors.length > 0 && !submitted"
                    class="hints"
                  >
                    <p
                      v-for="(error, index) in passwordValidation.errors"
                      :key="index"
                    >
                      {{ $t(error) }}
                    </p>
                  </div>
                </transition>
                <div class="matches" v-if="notSamePasswords">
                  <p class="text-danger">{{ $t("passDontMatch") }}</p>
                </div>
                <MButton
                  :btnClass="'btn btn-regular'"
                  @click="savePassword"
                  v-if="
                    passwordsFilled &&
                    !notSamePasswords &&
                    passwordValidation.valid
                  "
                  >{{ $t("save") }}</MButton
                >
              </MTabItem>
            </MTabs>
          </div>
        </div>
      </div>
    </div>
    <notifications group="settings" position="top right" />
    <MModal :id="'phone-verify'" v-if="isPhoneVerify">
      <MModalHead @close="closePhoneVerify" />
      <MModalBody>
        <div class="col-12" v-if="SMSTrue == false">
          <h2 class="form-title">{{ $t("smsTitle") }}</h2>

          <MInputText
            v-model="verifyCode"
            :classStatus="{ error: codeError.status }"
            :placeholder="$t('codeSMS')"
          />
          <p class="text-danger" v-if="codeError.status == true">
            {{ codeError.text }}
          </p>
          <div class="h-f h-f-j-c">
            <MButton :btnClass="'btn btn-regular'" @click="verifyPhone"
              >ОК</MButton
            >
          </div>
        </div>
        <div class="col-12" v-if="SMSTrue == true">
          <div class="ic ic_check"></div>
          <p class="text-accent-1">{{ $t("smsVerified") }}</p>
        </div>
      </MModalBody>
    </MModal>
    <MModal :id="'email-veification'" v-if="isEmailVerify">
      <MModalHead @close="closeMailVerify" />
      <MModalBody>
        <div
          style="
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          "
        >
          <div class="ic ic_mail"></div>
          <p class="text-accent">{{ $t("MailSent") }}</p>
        </div>
      </MModalBody>
    </MModal>
  </div>
</template>

<script>
import MInputText from "../../components/UI/form/m-input-text";
import MTabs from "../../components/UI/m-tabs";
import MTabItem from "../../components/UI/m-tabs-item";
import MButton from "../../components/UI/m-button";
import MInputRadio from "../../components/UI/form/m-input-radio";
import MInputFile from "../../components/UI/form/m-input-file";
import MInputPassword from "../../components/UI/form/m-input-password";
import { Base64 } from "js-base64";
import firebase, { storage } from "firebase";
import { mapState } from "vuex";
import MModal from "../../components/UI/modal/m-modal";
import MModalHead from "../../components/UI/modal/m-modal-head";
import MModalBody from "../../components/UI/modal/m-modal-body";

export default {
  metaInfo() {
    return { title: this.$t("pSettings") };
  },
  components: {
    MInputText,
    MTabs,
    MTabItem,
    MButton,
    MInputRadio,
    MInputFile,
    MInputPassword,
    MModal,
    MModalHead,
    MModalBody,
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
      SMSTrue: false,
      addphoto: false,
      showMiniNav: false,
      verifyCode: null,
      codeError: {
        status: false,
        text: "",
      },
      emailStatus: {
        icon: null,
        status: null,
      },
      phoneStatus: {
        icon: null,
        status: null,
      },
      curPage: {
        icon: "settings",
        title: "pSettings",
      },
      //pic data
      passport1: null,
      passport2: null,
      passport3: null,

      previewPassport1: null,
      previewPassport2: null,
      previewPassport3: null,

      previewPassport1Value: null,
      previewPassport2Value: null,
      previewPassport3Value: null,

      passportData1: null,
      passportData2: null,
      passportData3: null,

      uploadPassport1: null,
      uploadPassport2: null,
      uploadPassport3: null,
      // end
      btcAddress: null,
      MNPS: null,
      BTCS: null,
      avatarUpload: 0,
      avatarCorrect: false,
      avatarUrl: null,
      passportOne: null,
      passportTwo: null,
      changePassword: null,
      repeatPassword: null,
      submitted: false,
      rules: [
        { message: "oneLower", regex: /[a-z]+/ },
        { message: "oneUpper", regex: /[A-Z]+/ },
        { message: "charMin", regex: /.{8,}/ },
        { message: "oneNumber", regex: /[0-9]+/ },
      ],
    };
  },
  mounted() {
    // let token = this.user.token
    //   let result = Base64.decode(token)
    //     console.log(result)
  },
  methods: {
    reloadInstance(url, state) {
      let options = {
        url: url,
        method: "get",
      };

      this.$http(options).then((res) => {
        this.$store.commit(state, res.data);
      });
    },
    closeMailVerify() {
      this.$store.commit("IS_EMAIL", false);
    },
    previewAvatar(event) {
      this.$emit("input", event.target.files[0]);

      const file = event.target.files[0];

      this.user.avatar = URL.createObjectURL(file);
      this.avatarCorrect = true;
      const storageRef = firebase.storage().ref(`${file.name}`).put(file);

      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.avatarUpload =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          this.$notify({
            group: "settings",
            title: "Avatar can't be uploaded",
            text: error,
            type: "warn",
            duration: 10000,
          });
        },
        () => {
          this.avatarUpload = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.avatarUrl = url;

            let body = {
              avatar: url,
            };

            let options = {
              url: `users/setAvatar/${this.userid}`,
              method: "patch",
              data: body,
            };

            this.$http(options)
              .then((res) => {
                let getUser = {
                  url: `users/getUser/${this.userid}`,
                  method: "get",
                };

                this.$http(getUser).then((res) => {
                  this.$store.commit("SAVE_USER", res.data);
                });
                this.$notify({
                  group: "settings",
                  type: "success",
                  title: this.$t("successTitle"),
                  text: "Avatar loaded",
                });
              })
              .catch((err) => {
                console.log(err);
              });
          });
        }
      );
    },
    uploadAvatarToFirebase() {},
    savePassports() {
      let body = {
        passport_1: this.passport_1,
        passport_2: this.passport_2,
        passport_3: this.passport_3,
      };

      let options = {
        url: `users/setPassport/${this.userid}`,
        method: "patch",
        data: body,
      };

      this.$http(options)
        .then((res) => {
          let getUser = {
            url: `users/getUser/${this.userid}`,
            method: "get",
          };

          this.$http(getUser).then((res) => {
            this.$store.commit("SAVE_USER", res.data);
          });
          this.$store.commit("SAVE_PASSPORT_1", this.passport_1);
          this.$store.commit("SAVE_PASSPORT_2", this.passport_2);
          this.$store.commit("SAVE_PASSPORT_3", this.passport_3);
          this.$notify({
            group: "settings",
            type: "success",
            title: this.$t("successTitle"),
            text: this.$t("passportSavedText"),
          });
          console.log(res)
        })
        .catch((err) => {
          this.$notify({
            group: "settings",
            type: "error",
            title: this.$t("errorTitle"),
            text: this.$t("passportErrorText"),
          });
        });
    },
    savePassword() {
      let data = {
        password: this.repeatPassword,
      };

      let options = {
        url: `users/setPassword/${this.repeatPassword}/${this.userid}`,
        method: "patch",
        headers: {
          "Content-Type": "x-www-form-url-encoded",
        },
      };

      this.$http(options)
        .then((res) => {
          console.log(res);

          let getUser = {
            url: `users/getUser/${this.userid}`,
            method: "get",
          };

          this.$http(getUser).then((res) => {
            console.log(res);
            this.$store.commit("SAVE_USER", res.data);
            this.$notify({
              group: "settings",
              type: "success",
              title: this.$t("successTitle"),
              text: this.$t("passwordSavedText"),
            });
          });
        })

        .catch((err) => {
          this.$notify({
            group: "settings",
            type: "error",
            title: this.$t("errorTitle"),
            text: this.$t("passwordErrorText"),
          });
        });
    },
    renderData() {
      let form = {
        name: this.user.name,
        surname: this.user.surname,
        fathername: this.user.fathername,
        phone: this.user.phone,
        email: this.user.email,
        sex: this.user.sex,
        taxid: this.user.taxid,
      };

      let options = {
        url: `users/${this.userid}`,
        method: "patch",
        data: form,
      };

      this.$http(options)
        .then((res) => {
          let getUser = {
            url: `users/getUser/${this.userid}`,
            method: "get",
          };

          this.$http(getUser).then((res) => {
            this.$store.commit("SAVE_USER", res.data);
          });

          this.$notify({
            group: "settings",
            type: "success",
            title: this.$t("successTitle"),
            text: this.$t("personalSavedText"),
          });
        })
        .catch((err) => {
          this.$notify({
            group: "settings",
            type: "error",
            title: this.$t("errorTitle"),
            text: this.$t("personalErrorText"),
          });
        });
    },

    showNavItems() {
      this.showMiniNav = !this.showMiniNav;
    },
    openEmailVerification() {
      if (this.emailStatus.icon == "danger") {
        this.$store.commit("IS_EMAIL", true);

        let options = {
          url: `mail/send/confirm/${this.user.email}`,
          method: "get",
          headers: {
            "Content-Type": "x-www-form-urlencoded",
          },
        };

        this.$http(options).then((res) => {
          console.log(res);
        });
      }
      if (this.emailStatus.icon == "check") {
      }
    },
    openPhoneVerification() {
      if (this.phoneStatus.icon == "danger") {
        let body = {
          id: this.user.userID,
          phone: this.user.phone,
        };

        let options = {
          url: "sms/send",
          method: "POST",
          data: body,
        };

        this.$http(options)
          .then((res) => {
            this.$store.commit("IS_PHONE", true);
          })
          .then(() => {
            this.reloadInstance(`users/getUser/${this.user.userID}`, "SAVE_USER");
          });
      }
      if (this.phoneStatus.icon == "check") {
      }
    },
    closePhoneVerify() {
      this.$store.commit("IS_PHONE", false);
    },
    verifyPhone() {
      let options = {
        url: "sms/approve",
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: "post",
        data: {
          code: this.verifyCode,
          id: this.userid,
        },
      };

      this.$http(options)
        .then((res) => {
          console.log(res);
          if (res.data.kind == "not_equal") {
            this.codeError.status = true;
            this.codeError.text = "wrongCode";
          }

          if (res.data.kind == "ok") {
            this.SMSTrue = true;

            let getUser = {
              url: `users/getUser/${this.userid}`,
              method: "get",
            };

            this.$http(getUser).then((res) => {
              this.$store.commit("SAVE_USER", res.data);
            });

            setTimeout(() => {
              this.$store.commit("IS_PHONE", false);
            }, 3000);
          }
        })
        .catch((err) => {
          this.codeError.status = true;
          this.codeError.text = "smsError";
        });
    },
  },
  computed: {
    ...mapState([
      "passport_1",
      "passport_2",
      "passport_3",
      "isPhoneVerify",
      "isEmailVerify",
      "isMobile",
    ]),
        userid(){
      return this.user.id === undefined ? this.user.userID : this.user.id === undefined ? this.user.userID : this.user.id
    },
    isFieldEmpty(err) {
      if (this.verifyCode === "") {
        this.codeError.status = false;
        this.codeError.text = "";
      }
      if (err) {
        console.log(err);
      }

      return;
    },
    checkEmail() {
      if (this.user.isEmailVerified == null || this.user.isEmailVerified == 0) {
        this.emailStatus.icon = "danger";
        this.emailStatus.status = "mailWasNotVerified";
      }

      if (this.user.isEmailVerified == 1) {
        this.emailStatus.icon = "check";
        this.emailStatus.status = "mailVerified";
      }

      if (this.user.isPhoneVerified == null || this.user.isPhoneVerified == 0) {
        this.phoneStatus.icon = "danger";
        this.phoneStatus.status = "phoneWasNotVerified";
      }

      if (this.user.isPhoneVerified == 1) {
        this.phoneStatus.icon = "check";
        this.phoneStatus.status = "phoneVerified";
      }

      return;
    },
    notSamePasswords() {
      if (this.passwordsFilled) {
        return this.changePassword !== this.repeatPassword;
      } else {
        return false;
      }
    },
    passwordsFilled() {
      return this.changePassword !== "" && this.repeatPassword !== "";
    },
    passwordValidation() {
      let errors = [];

      for (let condition of this.rules) {
        if (!condition.regex.test(this.changePassword)) {
          errors.push(condition.message);
        }
      }
      if (errors.length === 0) {
        return { valid: true, errors };
      } else {
        return { valid: false, errors };
      }
    },
  },
  created() {
    this.checkEmail;
    this.isFieldEmpty;
  },
};
</script>

<style lang="scss">
.choose-sex {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 24px;
}
@media screen and (min-width: 360px) and (max-width: 767px) {
  .choose-sex {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 24px;
  }
  .meta-button {
    display: flex;
    justify-content: center;
  }
}
//  .btn-show{
//      right: 34%;
//  }
</style>