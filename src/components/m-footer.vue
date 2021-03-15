<template>
  <div class="footer">
    <div class="container" v-show="isMobile == false">
      <div class="row">
        <div class="col-2 logo-wrapper">
          <div class="footer-item ">
            <div class="footer-logo" @click="toHome"></div>
          </div>
        </div>
        <div class="col-8  list-wrapper">
          <div class="footer-item">
            <div class="row">
              <ul class="footer-list">
                <router-link v-for="(i,index) in routes" :key="index"
                :to="i.path"
                v-slot="{ href, navigate, isActive, isExactActive }"
              >
                <li
                  :class="[
                    isActive && 'footer-link-active',
                    isExactActive && 'footer-link-exact-active',
                  ]"
                  class="footer-link"
                >
                  <a :href="href" @click="navigate">{{ $t(i.title) }}</a>
                </li>
              </router-link>
              </ul>
            </div>
            <div class="row copyright-wrapper">
                <p class="text-accent-1">Monopoly Life© 2020</p>
            </div>
            <div class="row copyright-wrapper">
              <p class="text-accent-1">Developed:</p>
              <div class="rro-logo"></div>
            </div>
          </div>
        </div>
        <div class="col-2">
          <div class="footer-item ">
            <div class="row phones">
              <div class="col ">
                <p>{{$t('footerFirstPhoneTitle')}}</p>
                <b>{{setup[0].phone_1}}</b>
              </div>
            </div>
            <div class="row phones">
              <div class="col ">
                <p>{{$t('footerFirstSecondTitle')}}</p>
                <b>{{setup[0].phone_2}}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-show="isMobile == true">
      <div class="row">
        <div class="col-2 logo-wrapper">
          <div class="footer-item ">
            <div class="footer-logo" @click="toHome"></div>
          </div>
        </div>
        <div class="col-8  list-wrapper">
          <div class="footer-item">
            <div class="row">
              <ul class="footer-list">
                <router-link v-for="(i,index) in routes" :key="index"
                :to="i.path"
                v-slot="{ href, navigate, isActive, isExactActive }"
              >
                <li
                  :class="[
                    isActive && 'footer-link-active',
                    isExactActive && 'footer-link-exact-active',
                  ]"
                  class="footer-link"
                >
                  <a :href="href" @click="navigate">{{ $t(i.title) }}</a>
                </li>
              </router-link>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-2">
          <div class="footer-item ">
            <div class="row phones">
              <div class="col ">
                <p>{{$t('footerFirstPhoneTitle')}}</p>
                <b>{{setup[0].phone_1}}</b>
              </div>
            </div>
            <div class="row phones">
              <div class="col ">
                <p>{{$t('footerFirstSecondTitle')}}</p>
                <b>{{setup[0].phone_2}}</b>
              </div>
            </div>
          </div>
        </div>
        <div class="col-8">
                      <div class="row copyright-wrapper">
                <p class="text-accent-1">Monopoly Life© 2020</p>
            </div>
            <div class="row copyright-wrapper">
              <p class="text-accent-1">Developed:</p>
              <div class="rro-logo"></div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data(){
    return{
      routes:[
              {path:'/', title:'Home'},
              {path:'/projects', title:'Projects'},
              {path:'/about', title:'About'},
              {path:'/contacts', title:'Contacts'},
          ],
    }
  },
  methods:{
    toHome(){
      this.$router.push({name: 'Home'})
    }
  },
  computed:mapState(["setup", "isMobile"])
};
</script>

<style>
</style>