<template>
  <div id="contacts">
    <MNavbar />

    <MSection :id="'contacts-item'">
      <div class="row">
        <div class="col-6">
          <h1>{{$t('Contacts')}}</h1>
          <div class="row">
            <div class="col-6">
              <MTileItemMini :title="$t('footerFirstPhoneTitle')">
                <h2>{{setup[0].phone_1}}</h2>
              </MTileItemMini>
              <MTileItemMini :title="$t('lawAddress')">
                <p class="text-accent-1">
                  {{
                    locale == 'ru'
                    ? setup[0].location :
                    locale == 'en' 
                    ? setup[0].location_en :
                    locale == 'ch' 
                    ? setup[0].location_ch :
                    "Unknown language"
                  }}
                </p>
              </MTileItemMini>
              <MTileItemMini :title="$t('bills')">
                <p class="text-accent-1">
                  {{
                    locale == 'ru'
                    ? setup[0].companyTitle :
                    locale == 'en' 
                    ? setup[0].companyTitle_en :
                    locale == 'ch' 
                    ? setup[0].companyTitle_ch :
                    "Unknown language"
                  }}
                </p>
                                <p class="text-accent-1">
                 {{
                                       locale == 'ru'
                    ? setup[0].companyReq :
                    locale == 'en' 
                    ? setup[0].companyReq_en :
                    locale == 'ch' 
                    ? setup[0].companyReq_ch :
                    "Unknown language"
                 }}
                </p>
                 <p class="text-accent-1">
                     {{
                       locale == 'ru'
                    ? setup[0].companyId :
                    locale == 'en' 
                    ? setup[0].companyId_en :
                    locale == 'ch' 
                    ? setup[0].companyId_ch :
                    "Unknown language"
                     }}
                 </p>
              </MTileItemMini>
            </div>
            <div class="col-6">
                 <MTileItemMini :title="$t('footerFirstSecondTitle')">
                                <h2>{{setup[0].phone_2}}</h2>

              </MTileItemMini>
                               <MTileItemMini :title="$t('iLogin')">
                <p class="text-accent-1">
                    {{setup[0].email}}
                </p>
              </MTileItemMini>
              <MTileItemMini>
               <MButton  v-if="auth == true" :btnClass="'btn btn-regular'">{{$t('msgType')}}</MButton>
              </MTileItemMini>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="map-wrapper">
            <iframe
              id="gmap_canvas"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=%D0%9A%D0%B0%D1%88%D0%B8%D1%80%D1%81%D0%BA%D0%BE%D0%B5%20%D1%88%D0%BE%D1%81%D1%81%D0%B5,%20%D0%B4%D0%BE%D0%BC%203,%20%D0%BA%D0%BE%D1%80%D0%BF%D1%83%D1%81%202,%20%D1%81%D1%82%D1%80%D0%BE%D0%B5%D0%BD%D0%B8%D0%B5%209+(Monopoly%20Life)&amp;t=h&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
            ></iframe>
          </div>
        </div>
      </div>
    </MSection>

    <MFooter />
  </div>
</template>

<script>
import MSection from "../components/UI/m-section";
import MNavbar from "../components/m-navbar";
import MButton from "../components/UI/m-button";
import MFooter from "../components/m-footer";
import MTileItemMini from "../components/UI/m-mini-tile";
import { mapState } from 'vuex';

export default {
          metaInfo() {
      return {title: this.$t('Contacts')}
    },
  components: {
    MSection,
    MNavbar,
    MFooter,
    MButton,
    MTileItemMini,
  },
  computed:{
    ...mapState([
      "setup",
      "locale",
      "auth"
    ])
  },
 
};
</script>

<style>
</style>