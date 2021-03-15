<template>
<div id="register-mobile">
      <MModal :id="'register'" v-if="showRegister">
            <MModalHead v-on:key.esc="closeModal" tabindex="0" @close="closeModal" />
            <MModalBody>

                <div class="col-12">
                <h2 class="form-title">{{$t('RegisterTitle')}}</h2>

                    <MInputText v-model="form.email" :label="'LAbel'" :placeholder="$t('type') + $t('iLogin') " :id="'email'" />
                    <MInputText v-model="form.name" :label="'LAbel'" :placeholder="$t('type')+ $t('iName')" :id="'name'" />
                    <MInputText v-model="form.surname" :label="'LAbel'" :placeholder="$t('type')+ $t('iSurname')" :id="'surname'" />
                    <MInputPassword v-model="form.password" :label="'Password'" :placeholder="$t('type')+ $t('iPassword')" :id="'password'" />
                    <MInputPassword v-model.lazy="form.repeatPassword" :label="'Password'" :placeholder="$t('repeatPassword')" :id="'password'" />
                        <small v-if="notSamePasswords" class="text-danger">{{ $t("passDontMatch") }}</small>
                    
                    <transition name="hint" appear>
                  <div style="display:flex;flex-direction:column;"
                    v-if="passwordValidation.errors.length > 0 && !submitted"
                                      >
                    <small class="text-danger"
                      v-for="(error, index) in passwordValidation.errors"
                      :key="index"
                    >
                      {{ $t(error) }}
                    </small>
                  </div>
                </transition>
                    <MInputText v-model="form.referral" :label="'Affilate'" :placeholder="$t('type')+ $t('iAffilate')" :id="'affilate'" />
                   <div class="checkbox checkbox-center">
    
    <input class="styled-checkbox" v-model="terms" id="styled-checkbox-1" type="checkbox" value="true">
    <label  @click="terms = !terms" for="styled-checkbox-1">{{$t('agreeTerms')}}</label>
  </div>
                </div>
            </MModalBody>
            <MModalFooter :position="'modal-footer-space-between'">
                <MButton :btnClass="'btn btn-flat'" @click="openLogin()">{{$t('auth')}}</MButton>
                <!-- <transition name="hint" appear>
                <MButton v-if="terms == true" :btnClass="'btn btn-regular'" @click="toRegister()">{{$t('RegisterTitle')}}</MButton>
                </transition> -->
                <button @click="toRegister()" :disabled="terms == false" class="btn btn-regular">{{$t('RegisterTitle')}}</button>
            </MModalFooter>
        </MModal>

        <MLogin />
</div>
</template>

<script>
import MModal from "../components/UI/modal/m-modal"
import MModalHead from "../components/UI/modal/m-modal-head"
import MModalBody from "../components/UI/modal/m-modal-body"
import MModalFooter from "../components/UI/modal/m-modal-footer"
import MLogin from "../components/m-login"
import MButton from "../components/UI/m-button"
import MInputText from "../components/UI/form/m-input-text"
import MInputPassword from "../components/UI/form/m-input-password"
import MInputCheckbox from "../components/UI/form/m-input-checkbox"
import { mapState } from 'vuex'
export default {
    components:{
        MModal,
        MModalHead,
        MModalBody,
        MModalFooter,
        MButton,
        MInputText,
        MInputPassword,
        MLogin,
        MInputCheckbox
    },

    data(){
        return{
                terms: false,
rules: [
        { message: "oneLower", regex: /[a-z]+/ },
        { message: "oneUpper", regex: /[A-Z]+/ },
        { message: "charMin", regex: /.{8,}/ },
        { message: "oneNumber", regex: /[0-9]+/ },
      ],
            form:{
                email:null,
                password:null,
                name:null,
                surname:null,
                isEmailVerified: 0,
                isPhoneVerified: 0,
                isVerified: 0,
                referral: null,
                repeatPassword: null,
                status: 0,
                rating: 7,
                avatar: "https://medgoldresources.com/wp-content/uploads/2018/02/avatar-placeholder.gif"
            },
            accept: false,
             submitted: false,
        }
    },
    methods:{
         openLogin(){
           this.$store.commit("SHOW_REGISTER", false)
           this.$store.commit("SHOW_LOGIN", true)
    },
        toRegister(){
            let options = {
                url: "users/reg",
                method:"post",
                data: this.form
            }

            this.$http(options)
            .then((res)=>{
                if(res.data.message == "exists"){
                    alert('User exists')
                } else {
                this.$store.commit("SAVE_USER", res.data)

                let getWallet = {
                    url: `/users/${res.data.id}/wallet`,
                    method: "get"
                }

                this.$http(getWallet)
                .then((res)=>{
                    console.log(res.data)
                    this.$store.commit("SAVE_USER_WALLET", res.data)
                })
                 .catch((err)=>{
                      console.log(err)
                    })
                    this.$store.commit("SHOW_REGISTER",false)
                     this.$router.push({name: "UserWrapper"})
                }
            })
            .catch((err)=>{
                console.log(err.response.status)
            })

        },
        closeModal(){

                  this.$store.commit("SHOW_REGISTER", false)
            // this.$store.commit("SHOW_LOGIN", false)
        },
        closeWrongModal(){
            this.$store.commit("SHOW_WRONG", false)
        }
    },
   
    computed:{
        ...mapState(["showRegister","showLogin","showWrong"]),
          notSamePasswords() {
      if (this.passwordsFilled) {
        return this.form.password !== this.form.repeatPassword;
      } else {
        return false;
      }
    },
        passwordFilled(){
            return this.form.password !== "" && this.form.repeatPassword !== "";
        },
        passwordValidation(){
            let errors = [];

            for(let condition of this.rules){
                 if (!condition.regex.test(this.form.password)) {
          errors.push(condition.message);
        }
            }
             if (errors.length === 0) {
        return { valid: true, errors };
      } else {
        return { valid: false, errors };
      }
        }
    },
  
}
</script>

<style>

</style>