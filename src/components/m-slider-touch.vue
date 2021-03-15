<template>
  <div>
      <carousel :loop="true" ref="mp-carousel" :speed="2000" :autoplay="false"  :perPageCustom="[[375,1],[480, 1], [768, 1]]">
          <slide v-for="i in data" :key="i.arrange">
              <div class="slide-text-wrapper">
              <h1 v-html="locale == 'ru' ? i.title : locale == 'en-gb' ? i.title_en : locale == 'zh-cn' ? i.title_ch : i.title"></h1>
              <p v-html="locale == 'ru' ? i.subtitle : locale == 'en-gb' ? i.subtitle_en : locale == 'zh-cn' ? i.subtitle_ch : i.subtitle"></p>
        <MButton :btnClass="`btn btn-regular`" @click="toProjects(i.url)">{{$t('go')}}</Mbutton>
<div class="slide-image-wrapper">
          <div class="slide-image" v-bind:style="{ backgroundImage: 'url(' + i.media + ')' }"></div>

</div>
          </div>
          </slide>

      </carousel>
      <div class="slider-controllers">
                <div class="controller" @click="SlideCarousel('prev')">
                    <div class="controller-wrapper" style="padding-right: 7px;">
                        <div class="ic ic_prev"></div>
                    </div>
                </div>
                <div class="controller" @click="SlideCarousel('next')">
                    <div class="controller-wrapper" style="padding-left: 7px;">
                        <div class="ic ic_next" ></div>
                    </div>
                </div>
            </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MButton from "../components/UI/m-button"

export default {
    props:["data"],
    components:{
        MButton
    },
    data(){
        return{
            nextIcon: "<div class=\"controller\"><div class=\"controller-wrapper\"><div class=\"ic ic_next\"></div> </div> </div>",
            prevIcon: "<div class=\"controller\"><div class=\"controller-wrapper\"><div class=\"ic ic_prev\"></div> </div> </div>",
        }
    },
    methods:{
SlideCarousel(value) {
    const carousel = this.$refs['mp-carousel'];
    const currentPage = carousel.currentPage;
    const pageCount = carousel.pageCount;
    if (value == 'prev') {
        currentPage != 0 ? carousel.goToPage(currentPage - 1) : carousel.goToPage(pageCount - 1);
    } else {
        currentPage < pageCount - 1 ? carousel.goToPage(currentPage + 1) : carousel.goToPage(0);
    }
},
toProjects(link){
    this.$router.push({name: link})
}
    },
    computed:{
        ...mapState(["locale"])
    }
}
</script>

<style>

</style>