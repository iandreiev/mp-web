<template>
  <div id="framework">
    <MNavbar />
    <MSection :id="'checkbox'">
        <div class="row">
            <div class="col-12">
                <h1>Tabs</h1>
                <hr>
            </div>
        </div>
        <div class="row">
            <MInputCheckbox :id="'checkbox'" v-model="checkbox" :checboxText="'Test checkbox'" />
            <p>{{checkbox}}</p>
        </div>
        <div class="row">
            <MInputRadio :id="'radio'" v-model="picked" :variant="'Male'" />
            <MInputRadio :id="'radio'" v-model="picked" :variant="'Female'"/>
        </div>
        <div class="row">
            <h2>File input</h2>

            <MInputFile v-model="file"></MInputFile>
        </div>
    </MSection>
    <MSection :id="'tabs'">
                <div class="row">
            <div class="col-12">
                <h1>Tabs</h1>
                <hr>
            </div>
        </div>

        <div>
            <MTabs>
                <MTabItem :selected="true" name="Tab 1">
                    kek1
                </MTabItem>
           <MTabItem name="Tab 2">
                    kek2
                </MTabItem>
            </MTabs>
        </div>
    </MSection>
    <MSection :id="'jumbotron'">
        <h1>Monopoly UI</h1>
    </MSection>
    <MSection :id="'modal'">
        <h1>Modal</h1>
        <MButton :btnClass="'btn btn-regular'" @click="showModal = true">Show modal</MButton>
        <MModal v-if="showModal">
            <MModalHead @close="showModal = false" />
            <MModalBody>

                <div class="col">
                <h1>Login</h1>

                    <MInputText v-model="test" :label="'LAbel'" :placeholder="'Введите логин'" :id="'login'" />
                    <MInputPassword v-model="password" :label="'Password'" :placeholder="'Введите пароль'" :id="'login'" />
                    <router-link to="#">I forget a password</router-link>
                </div>
            </MModalBody>
            <MModalFooter :position="'modal-footer-space-between'">
                <router-link to="#">Register</router-link>
                <MButton :btnClass="'btn btn-regular'">Login</MButton>
            </MModalFooter>
        </MModal>
    </MSection>
    <MSection :id="'user-status'">
        <div class="row">
            <div class="col-12">
                <h1>Статус пользователя</h1>
                <hr>
            </div>
        </div>
    </MSection>
    <MSection :id="'grid'">
        <div class="row">
            <div class="col-12">
                <h1>Система сеток</h1>
                <p class="text-accent-1">
                    Отзывчивая система сеток, разработанная под нужды проекта.
                </p>
                <hr>
            </div>
        </div>
    </MSection>
    <MSection :id="'texts'">
        <div class="row">
            <div class="col-12">
                <h1>Тексты</h1>
                <p class="text-accent-1">
                    Описание
                </p>
                <hr>
            </div>
        </div>
    </MSection>
    <MSection :id="'cards'">
        <div class="row">
            <div class="col-12">
                <h1>Карточки</h1>
                <p class="text-accent-1">
                    Описание
                </p>
                <hr>
            </div>
        </div>
    </MSection>
    <MSection :id="'tiles'">
        <div class="row">
            <div class="col-12">
                <h1>Тайлы</h1>
                <p class="text-accent-1">
                    Описание
                </p>
                <hr>
            </div>
        </div>
    </MSection>
    <MSection :id="'forms'">
        <div class="row">
            <div class="col-12">
                <h1>Формы</h1>
                <p class="text-accent-1">
                    Описание
                </p>
                <hr>

                <div class="row">
                    <MInputText 
                        v-model="phone"
                        :classStatus="'error'"
          :placeholder="'Type your phone'"
          :label="'Phone'"
          :id="'phone'"
                    />
                </div>
            </div>
        </div>
    </MSection>
    <MSection :id="'buttons'">
        <div class="row">
            <div class="col-12">
                <h1>Кнопки</h1>
                <p class="text-accent-1">
                    Описание
                </p>
                <hr>
            </div>
        </div>
    </MSection>
    <MFooter />
  </div>
</template>

<script>
import MButton from "../components/UI/m-button";
import MInputText from "../components/UI/form/m-input-text";
import MInputPassword from "../components/UI/form/m-input-password";
import MNavbar from "../components/m-navbar";
import MProgressBar from "../components/UI/m-progressbar";
import MCard from "../components/UI/m-card";
import MFooter from "../components/m-footer";
import MAccordion from "../components/UI/m-accordion";
import MTileItem from "../components/UI/m-tile-item";
import MSection from "../components/UI/m-section";
import MModal from "../components/UI/modal/m-modal"
import MModalHead from "../components/UI/modal/m-modal-head"
import MModalBody from "../components/UI/modal/m-modal-body"
import MModalFooter from "../components/UI/modal/m-modal-footer"
import MTabs from "../components/UI/m-tabs"
import MTabItem from "../components/UI/m-tabs-item"
import MInputCheckbox from "../components/UI/form/m-input-checkbox"
import MInputRadio from "../components/UI/form/m-input-radio"
import MInputFile from "../components/UI/form/m-input-file"
export default {
  metaInfo: {
    title: "MonopolyUI",
  },
  data(){
      return{
          test: null,
          password: null,
          showModal:false,
          phone:null,
          checkbox:null,
          picked:null,
          file:null
      }
  },
  methods:{
  },
  components: {
    MButton,
    MInputText,
    MInputPassword,
    MNavbar,
    MProgressBar,
    MCard,
    MFooter,
    MAccordion,
    MTileItem,
    MSection,
    MModal,
    MModalHead,
    MModalBody,
    MModalFooter,
    MTabs,
    MTabItem,
    MInputCheckbox,
    MInputRadio,
    MInputFile
  }
};
</script>

<style>
</style>