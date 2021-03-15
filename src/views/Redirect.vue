<template>
  <div id="home" class="homepage">
    <MNavbar />
    <div class="container whitespace">
        <h1>Вы будете перенаправлены..</h1>
    </div>
    <MFooter />
  </div>
</template>

<script>
import MNavbar from "../components/m-navbar";
import MFooter from "../components/m-footer";
import MButton from "../components/UI/m-button";
export default {
    components:{
        MButton,
    MNavbar,
    MFooter,
    }
}
</script>

<style>

</style>