<template>
    <div id="payment-topup">
          <MNavbar />
          <MSection :id="'payment-proccess'">
              {{info}}
             <div class="payment-section">
                  <h1 class="text-heading">Пополнение</h1>
                <div class="col estimation-col">
                    <div class="estimation-item-row">
                        <p class="text-accent-1">ID:</p>
                        <p>{{data.id}}</p>
                    </div>
                    <div class="estimation-item-row">
                        <p class="text-accent-1">Сумма платежа:</p>
                        <p>{{data.amount + " " +(data.fiat == 'usd' ? 'USD' : data.fiat == 'rub' ? 'RUR' : data.fiat)}}</p>
                    </div>
                    <div class="estimation-item-row">
                        <p class="text-accent-1">Платёжная система:</p>
                        <p>{{paymentSystem.name}}</p>
                    </div>
                    <div class="estimation-item-row">
                        <p class="text-accent-1">Статус:</p>
                        <p>{{data.status}}</p>
                    </div>
                </div>
                <MButton :btnClass="'btn btn-regular'" @click="toHome">На главную</MButton>
             </div>

          </MSection>
  <MFooter />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import MSection from "../components/UI/m-section";
import MFooter from "../components/m-footer";
import MButton from "../components/UI/m-button";
import MNavbar from "../components/m-navbar";
const PAY_API = "https://sandbox.ps.grow.mybuilder.site/"
import axios from "axios"

export default {
    props:{
        info:{
            type: Object
        }
    },
    data(){
        return{
            data:'',
            paymentSystem:'',
            id: this.$route.params.id
        }
    },
    computed:{
        ...mapState(["accessToken"]),
        setProduct(){
            
        }
    },
    methods:{
        toHome(){
            this.$router.push({name:'Home'})
        },
        getPaySystem(id){
            let options = {
                url:`${PAY_API}payment-systems/${id}`,
                method:'get',
                headers:{
                    Authorization: `Bearer ${this.accessToken}`
                }
            }

            axios(options)
            .then(res=>this.paymentSystem = res.data)
        },
        getInvoice(){
            let options = {
                url:`${PAY_API}invoices/${this.id}`,
                method: 'get',
                headers:{
                    Authorization: `Bearer ${this.accessToken}`
                }
            }

            axios(options)
            .then(res=>{
                this.data = res.data
                })
            .catch(err=>console.log(err))
        },
        setBalance(){
            let status = this.data.status


        }
    },
    created(){
             this.getInvoice()
              setTimeout(()=>{
                 this.getPaySystem(this.data.payment_system_id)
             },500)
    },
    mounted(){          
             let statusInterval = setTimeout(()=>{
                 this.getPaySystem(this.data.payment_system_id)
             },30000)
            

             if(this.data.status == 'COMPLETED'){
                 clearInterval(statusInterval)
             }else{
                 statusInterval
             }
    },
    components:{
        MFooter,
        MNavbar,
        MSection,
        MButton
    }
}
</script>

<style scoped>
  .text-heading{
    text-align:center;
    margin: 0 auto;
  }
</style>