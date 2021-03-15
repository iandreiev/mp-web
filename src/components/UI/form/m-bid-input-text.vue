<template>
    <div :class="`bid-controller`">
        <label :for="id">{{label}}</label>
        <input type="text" :class="classStatus" :value="value" :name="id" :placeholder="placeholder" :id="id" v-on:input="$emit('input', $event.target.value)">
    </div>
</template>

<script>
export default {
    props:["value", "classStatus", "disabled", "id", "value", "label", "placeholder"],
    data(){
        return{}
    }
}
</script>

<style>

</style>