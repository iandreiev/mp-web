<template>
    <div>
        <input type="checkbox" class="styled-checkbox" :name="id" :id="id"  :checked="!!isChecked" @change="e => isChecked = e.target.checked" v-on:input="$emit('input', $event.target.checked)">
        <label :for="id">{{checkboxText}}</label>

    </div>
</template>

<script>
export default {
props:["id", "checkboxText"],
data(){
    return{
        isChecked: false
    }
}
}
</script>

<style>

</style>