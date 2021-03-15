<template>
  <label class="file-select">
    <div class="select-button"  :class="{'file-selected':value}" :style="{'background-image':`url(${view })`}">
      <div class="file-selected" v-if="value">
          
          <!-- <p>Selected File: {{ value.name }}</p> -->
        <div class="for-mouseover">
         <button class="file-delete" @click="removeFile">Удалить файл</button>
        </div>

      </div>
      <div class="file-non-select" v-else>
          <div class="ic-select-file"></div>
            <p class="text-dark">Загрузить файл</p>
          </div>
    </div>
    <input v-on:input="$emit('input', $event.target.leading)" type="file" @change="handleFileChange" />
    
    <div class="progress" v-if="leadingData != null">
      <progress :value="uploadLeading" :max="100"></progress>
    </div>

    <div v-if="leadingData != null">
       <button class="btn-o btn-o-regular" type="button" @click="onUploadLeading"  >Upload file</button>
    </div>
  </label>
</template>

<script>
import firebase from "firebase";
import { mapState } from 'vuex';

export default {
  props: {
    value: File,
    description: String,
    formId: Number
  },
    data(){
        return{
            view: null,
            uploadLeading:0,
            leadingData: null,
            leading: null
        }
    },
    computed:{
    },
  methods: {
    handleFileChange(e) {
      this.$emit('input', e.target.files[0])

      const file = e.target.files[0]
      this.view = URL.createObjectURL(file)
      this.leadingData = file
    },
     onUploadLeading() {
      this.leading = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.leadingData.name}`)
        .put(this.leadingData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadLeading =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadLeading = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.leading = url;
            this.$store.commit(`SAVE_PASSPORT_${this.formId}`, url)
          });
        }
      );
    },
    removeFile(){
        this.value = null
    },
    
  }
}
</script>

<style lang="scss">
  .progress{
    width: 200px;
    padding: 0.5rem;
    progress{
      width: inherit;
    }
  }

</style>

