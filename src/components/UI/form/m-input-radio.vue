<template>
    <div class="form-controller">
        <label :for="id">{{label}}</label>
        <input type="radio" :value="variant" :name="id" :id="id" :checked="picked => variant" @change="e => picked = e.target.value"  >
    </div>
</template>

<script>
export default {
props:["id", "variant","label"],
data(){
    return{
    }
}
}
</script>

<style>

</style>