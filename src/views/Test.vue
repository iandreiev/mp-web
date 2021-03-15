<template>
  <div id="home" class="homepage">
    <MNavbar />
    <div class="container whitespace">

        <MButton @click="generatePDF">GENERATE</MButton>

    </div>
    <MFooter />
  </div>
</template>

<script>
import MButton from "../components/UI/m-button";
import MInputText from "../components/UI/form/m-input-text";
import MInputPassword from "../components/UI/form/m-input-password";
import MNavbar from "../components/m-navbar";
import MProgressBar from "../components/UI/m-progressbar";
import MCard from "../components/UI/m-card";
import MFooter from "../components/m-footer";
import MAccordion from "../components/UI/m-accordion";
import MTileItem from "../components/UI/m-tile-item";
import { mapState } from 'vuex';
const URL = "https://api.staging.iserverbot.ru/v1/"
const MURL = "http://localhost:8000/"
import { jsPDF } from "jspdf";
import logo from '@/assets/img/logo_reg.png'

export default {
      metaInfo: {
      title: 'Design System',
    },
  components: {
    MButton,
    MInputText,
    MInputPassword,
    MNavbar,
    MProgressBar,
    MCard,
    MFooter,
    MAccordion,
    MTileItem,
  },
  data() {
    return {
      test: null,
      activeAccordion: false,
      date:null,
      invoice:'',
      ps:'',
      test:{
        amount: 3,
        coin: 'usdt',
        country_code:'RUS',
        fiat:'rub',
        lang_id: 'ru',
        payment_system_id: 27,
        // callback_url:`${MURL}`,
        // redirect_url:`${MURL}redirect`
      },
      bank:{
        refreshToken:'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhMjVjZjJiMy0yNjY0LTQ4ZTYtOTg4ZC1mOGYwZDgyMjBlOGQiLCJpYXQiOjE2MTIyODEzNzAsImlzcyI6ImNoYXRleC1pZCIsInN1YiI6InVzZXIiLCJ1aWQiOjI3NiwidmVyIjoxLCJyZXMiOlsxXSwidHlwIjoxfQ.J_mgS_7lSRngmQn6mZHMnQq5j_C0RV-qIde_sFu3PlTduSuaF0D5sX7kuauCEHpIFObS46tA2PGjoWx5c6CJLA',
        accessToken:'',
        user:'',
        balance:'',
        invoices:''
      }
    };
  },
  methods: {
    // PDF GENERATOR
    generatePDF(){
        let project = {
          id: '12432',
          title:'Booking shelf',
          amount: '123',
          coin: 'btc',
          payment_id: 'AI4F3A',
          shareSize: '33',
          type: 'buy',
          payment_system: 'Payoneer'
        }
        let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const doc = new jsPDF({
                orientation: "portait",
                unit: "px",
                format: [300,300]
            });
            doc.addImage(logo, 'PNG',130, 20, 40, 15)
            //ID
            doc.text('Bill #'+project.payment_id, 120, 60)
            doc.text('Project ID:', 30, 80)
            doc.text(project.id, 180, 80)
          //Title
            doc.text('Project Name:', 30, 100)
            doc.text(project.title, 180, 100)
            //Date
            doc.text('Date:', 30, 120)
            doc.text(date, 180, 120)
        //Amount
            doc.text('Amount:', 30, 140)
            doc.text(project.amount + ' ' + project.coin, 180, 140)
            //Share
            doc.text('Your share:', 30, 160)
            doc.text(project.shareSize + ' %', 180, 160)
            //Paymnt
            doc.text('Payment system:', 30, 180)
            doc.text(project.payment_system, 180, 180)
            //Paymnt
            doc.text('Type:', 30, 200)
            doc.text(project.type, 180, 200)
            doc.text('monopolylife.ru', 110, 240)



            doc.save(`bill-${project.id}-${project.payment_id}-${date}`);
    },
    // PDF GENERATOR /end
    toggle() {
      alert("Button clicked");
    },
    toggleBrand() {
      alet("Brandbutton");
    },
    toggleAccordion(event) {
      event.target.classList.toggle("arrow-up");
    },
    getInvoices(){
      let options = {
        url:`${URL}invoices`,
        method:'get',
        headers:{
          Authorization:`Bearer ${this.bank.accessToken}`
        }
      }

      this.$http(options)
      .then(res=>this.bank.invoices = res.data)
      .catch(err=>console.log(err))
    },
    getPaymentSystem(){
      let options = {
        url:`${URL}payment-systems/estimate`,
        method:'post',
        data:{
          amount: 3,
          coin:"btc"
        },
        headers:{
          Authorization:`Bearer ${this.bank.accessToken}`
        }
      }

      this.$http(options)
      .then(res=>this.ps = res.data)
      .catch(err=>console.log(err))
    },
    postInvoice(){
      let options = {
        url:`${URL}invoices`,
        method:'post',
        data: this.test,
        headers:{
          Authorization:`Bearer ${this.bank.accessToken}`
        }
      }

      this.$http(options)
      .then(res=>this.invoice = res.data)
      .catch(err=>console.log(err))
    },
    makePay(){
      window.location.href = this.invoice.payment_url
    },
    getAccessToken(){
      let options = {
        url:`${URL}auth/access-token`,
        method:'post',
        headers:{
          Authorization:`Bearer ${this.bank.refreshToken}`
        }
      }

      this.$http(options)
      .then(res=>this.bank.accessToken = res.data.access_token)
    },
    getUserData(){
     let options = {
        url:`${URL}me`,
        method:'get',
        headers:{
          Authorization:`Bearer ${this.bank.accessToken}`
        }
      }

      this.$http(options)
      .then(res=>this.bank.user = res.data)
    }
  },
  computed:{
    ...mapState(["locale"]),
    genDate(from){
      let date = from - new Date.now()

      this.date = date
    }
  },
  mounted(){
    this.getAccessToken()
    setTimeout(()=>{
      this.getUserData()
      this.getInvoices()
      this.getPaymentSystem()
    },1000)
  }
};
</script>

<style>
</style>