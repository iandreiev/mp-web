<template>
  <div id="login-mobile">
    <MModal :id="`login-form`" v-if="showLogin">
      <MModalHead tabindex="0" @close="closeLogin" />
      <MModalBody>
        <div class="col-12">
          <h2 class="form-title">{{ $t("LoginTitle") }}</h2>

          <MInputText
            v-model="email"
            :label="'LAbel'"
            :placeholder="$t('type') + $t('iLogin')"
            :id="'email'"
          />
          <MInputPassword
            v-model="password"
            :label="'Password'"
            :placeholder="$t('type') + $t('iPassword')"
            :id="'password'"
          />
          <small class="text-danger">{{ $t(errText) }}</small>
          <div class="reset-password">
            <MButton :btnClass="'btn btn-flat'" @click="openRecovery">{{
              $t("forgetPassword")
            }}</MButton>
          </div>
        </div>
      </MModalBody>
      <MModalFooter :position="'modal-footer-space-between'">
        <MButton :btnClass="'btn btn-flat'" @click="openRegister">{{
          $t("RegisterTitle")
        }}</MButton>
        <button
          @click="toProfile()"
          :disabled="password == null"
          class="btn btn-regular"
        >
          {{ $t("auth") }}
        </button>

        <!-- <MButton :btnClass="'btn-o btn-o-regular'" v-if="isMobile == false" @click="gAuth">{{$t('google')}}</MButton> -->
      </MModalFooter>
    </MModal>
    <MModal v-if="showWrong">
      <MModalHead @close="closeWrongModal" />
      <MModalBody>
        <div class="">
          <p class="text-accent-1">
            {{ $t("wrongPassword") }}
          </p>
        </div>
      </MModalBody>
    </MModal>
    <MRegister />

    <MModal :id="'reset-password'" v-if="isReset">
      <MModalHead @close="closeRecovery" />
      <MModalBody>
        <div class="col-12">
          <h2 class="form-title">{{ $t("RecoveryTitle") }}</h2>
          <MInputText
            v-model="email"
            :label="'LAbel'"
            :placeholder="$t('type') + $t('iLogin')"
            :id="'email'"
          />
          <MButton :btnClass="'btn btn-regular'" @click="sendRecoveryEmail">{{
            $t("send")
          }}</MButton>
        </div>
      </MModalBody>
    </MModal>

    <MModal :id="'mail-sent'" v-if="isMailSent">
      <MModalHead @close="closeMailSent" />
      <MModalBody>
        <div class="col-12 mail-sent">
          <h2 class="form-title">{{ $t("RecoveryTitle") }}</h2>
          <div class="ic ic_mail"></div>
          <p class="text-accent-1">
            {{ $t("mailSent") }}
          </p>
        </div>
      </MModalBody>
    </MModal>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapState } from "vuex";
import MModal from "../components/UI/modal/m-modal";
import MModalHead from "../components/UI/modal/m-modal-head";
import MModalBody from "../components/UI/modal/m-modal-body";
import MModalFooter from "../components/UI/modal/m-modal-footer";
import MRegister from "../components/m-register";
import MButton from "../components/UI/m-button";
import MInputText from "../components/UI/form/m-input-text";
import MInputPassword from "../components/UI/form/m-input-password";
export default {
  components: {
    MModal,
    MModalHead,
    MModalBody,
    MModalFooter,
    MButton,
    MInputText,
    MInputPassword,
    MRegister,
  },
  props: {
    regButton: {
      type: Function,
    },
  },
  // name: "login",
  data() {
    return {
      email: null,
      password: null,
      validated: 0,
      error: false,
      errText: "",
    };
  },
  methods: {
    closeWrongModal() {
      this.$store.commit("SHOW_WRONG", false);
    },
    openRegister() {
      this.$store.commit("SHOW_LOGIN", false);
      this.$store.commit("SHOW_REGISTER", true);
    },
    closeLogin() {
      this.$store.commit("SHOW_LOGIN", false);
    },
    sendRecoveryEmail() {
      let options = {
        url: `mail/send/reset/${this.email}`,
        method: "get",
        headers: {
          "Content-Type": "x-www-form-urlencoded",
        },
      };
      this.$http(options)
        .then((res) => {
          this.$store.commit("IS_MAIL_SENT", true);
          setTimeout(() => {
            this.$store.commit("IS_MAIL_SENT", false);
            this.$store.commit("IS_RESET", false);
          }, 2000);
        })
        .catch((err) => {
          alert(err);
        });
    },
    closeRecovery() {
      this.$store.commit("IS_RESET", false);
    },
    openRecovery() {
      this.$store.commit("SHOW_LOGIN", false);
      this.$store.commit("IS_RESET", true);
    },
    closeMailSent() {
      this.$store.commit("IS_MAIL_SENT", false);
    },
    toProfile() {
      let form = {
        email: this.email,
        password: this.password,
      };
      let options = {
        url: "users/login",
        method: "post",
        data: form,
      };
      this.$http(options)
        .then((res) => {
          let data = res.data;

          if (data.role != 3) {
            if (Object.keys(data).length > 0) {
              this.$store.commit("SAVE_USER", res.data);
              let getWallet = {
                url: `/users/${res.data.id}/wallet`,
                method: "get",
              };

              this.$http(getWallet)
                .then((res) => {
                  this.$store.commit("SAVE_USER_WALLET", res.data);
                  this.$store.commit("SHOW_LOGIN", false);
                })
                .catch((err) => {});

              setTimeout(() => {
                this.$router.push({ name: "Profile" });

                window.location.reload();
              }, 1000);
            } else {
              this.error = true;
              this.errText = "passFalse";
            }
          }
          if (data.role == 3) {
            alert(
              "Вы нарушили правила сервиса Ваш аккаунт заблокирован. По всем вопросам обращаться к администрации сервиса"
            );
          }
        })
        .catch((err) => {
          let response = err.response.status;

          if (response == 500) {
            this.err = true;
            this.errText = "LoginPassCompare";
          }
        });
    },
  },
  computed: {
    ...mapState([
      "showLogin",
      "isMobile",
      "isMailSent",
      "showRegister",
      "showWrong",
      "isReset",
    ]),
  },
};
</script>

<style>
.modal {
  width: 400px;
}
</style>