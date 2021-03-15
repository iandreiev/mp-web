<template>
  <div id="btc"></div>
</template>

<script>
const URL = "https://api.coindesk.com/v1/bpi/currentprice.json"
import axios from "axios";

export default {
    mounted(){
        let options = {
            url: URL,
            method: "GET"
        }

         setInterval(()=>{
             axios(options)
        .then((res)=>{
            this.$store.commit("saveRateBTC", res.data.bpi.USD.rate_float)
        })
         }, 60000)
    }
}
</script>

<style>

</style>