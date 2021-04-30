<template>
  <div id="pass-reset">
            <div class="col-4" v-show="status == ''">
                <div class="logo-muted"></div>
                <h1>{{$t('RecoveryTitle')}}</h1>
                <MInputPassword :label="$t('newPass')" v-model="changePassword" :placeholder="$t('typePassword')" />
                <MInputPassword :label="$t('repeatPassword')" v-model="repeatPassword" :placeholder="$t('repeatPassword')" />
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
                  @click="resetPass"
                  v-if="
                    passwordsFilled &&
                    !notSamePasswords &&
                    passwordValidation.valid
                  "
                  >{{ $t("save") }}</MButton
                >
            </div>
            <div class="col-4" v-show="status == 'ok'">
                <h1>{{$t('changedPassword')}}</h1>
            </div>

            <MFooter />
  </div>
</template>

<script>
import MButton from "../components/UI/m-button"
import MInputPassword from "../components/UI/form/m-input-password"
import MFooter from  "../components/m-footer"
export default {
    components:{
        MButton,
        MInputPassword,
        MFooter
    },
     metaInfo() {
      return {title: this.$t('RecoveryTitle')}
    },
    data(){
        return{
            cypher: this.$route.params.encodedEmail,
            email: null,
             rules: [
        { message: "oneLower", regex: /[a-z]+/ },
        { message: "oneUpper", regex: /[A-Z]+/ },
        { message: "charMin", regex: /.{8,}/ },
        { message: "oneNumber", regex: /[0-9]+/ },
      ],
      changePassword: null,
      repeatPassword: null,
      submitted: false,
      status: ''
        }
    },
    methods:{
        resetPass(){
            let password = this.repeatPassword
            let options = {
                url: `users/setPasswordEmail/${password}/${this.email}`,
                method: "patch",
                headers:{
                    'Content-Type':'x-www-form-urlencoded'
                }
            }

            this.$http(options)
            .then((res)=>{
                this.status = 'ok'
                setTimeout(()=>{
                    this.$router.push({name: 'Home'})
                },2000)
            })
            .catch((err)=>{
                this.status = err
            })
        }
    },
    mounted(){
        this.email = window.atob(this.cypher)
    },
    computed:{
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
    }
}
</script>

<style>

</style>