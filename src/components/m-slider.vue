<template>
  <div class="slider">
      <transition name="fade">
          <div class="slide"  @mouseover="trigger" v-for="(i,index) in [data]" :key="index">
          <div class="slide-text-wrapper">
              <h1>{{currentSlide.title}}</h1>
              <p>{{currentSlide.leading}}</p>
        <MButton :btnClass="`btn btn-regular`" >View Projects</Mbutton>

          </div>
          <img :src="currentSlide.image" alt="">
      </div>
      </transition>

                  <div class="slider-controllers">
                <div class="controller"  @click="prev">
                    <div class="controller-wrapper">
                        <div class="ic ic_prev"></div>
                    </div>
                </div>
                <div class="controller"  @click="next">
                    <div class="controller-wrapper">
                        <div class="ic ic_next" ></div>
                    </div>
                </div>
            </div>
  </div>
</template>

<script>
import MButton from "../components/UI/m-button"
export default {
    components:{
        MButton
    },
    props:["data"],
    data(){
        return{
            timer:null,
            currentIndex:0,
            hovered:false
        }
    },
    mounted(){
        this.startSlide();
    },
    methods:{
        startSlide(){
            this.timer = setInterval(this.next, 6000);
        },
        next(){
            this.currentIndex += 1;
        },
        prev(){
            this.currentIndex -= 1;
        },
        trigger(){
            setTimeout(()=>{
                this.hovered = true;
            })
        }
    },
    computed:{
        currentSlide(){
            return this.data[Math.abs(this.currentIndex)% this.data.length]
        }
    }
}
</script>

<style>

</style>