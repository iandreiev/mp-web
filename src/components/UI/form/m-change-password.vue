<template>
   <div id="change-password">
        <div class="form-controller">
        <input :type="type"  :name="id" :placeholder="placeholder" :id="id" v-on:input="$emit('input', $event.target.value)">
        <button class="btn-show ic-show" v-on:click="showPassword()"></button>
   </div>
        <div class="form-controller">
        <input :type="type"  :name="id" :placeholder="placeholder" :id="id" v-on:input="$emit('input', $event.target.value)">
        <button class="btn-show ic-show" v-on:click="showPassword()"></button>
   </div>
   </div>
</template>

<script>
export default {
    props:["value", "disabled", "id", "label", "placeholder"],
    data(){
        return{
            type: 'password',
            btnText: 'Show'
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