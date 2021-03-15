<template>
    <div class="form-controller">
        <!-- <label :for="id">{{placeholder}}</label> -->
        <input :type="type"  :name="id" :placeholder="placeholder" :id="id" v-on:input="$emit('input', $event.target.value)">
        <button class="btn-show ic-show" v-if="type == 'password'" v-on:click="showPassword()"></button>
        <button class="btn-show ic-hidden" v-if="type == 'text'" v-on:click="showPassword()"></button>
   </div>
</template>

<script>
export default {
    props:["value", "disabled", "id", "label", "placeholder"],
    data(){
        return{
            type: 'password',
            
        }
    },
    methods:{
        showPassword(){
            if(this.type === 'password') {
          this.type = 'text'
         

        //   this.btnText = 'Hide Password'
       } else {
          this.type = 'password'
         

        //   this.btnText = 'Show Password'
       }
        }
    }
}
</script>

<style>

</style>