<template>
  <div id="changelog">
      <MNavbar />
        <MSection :id="'changelog'">
            <div class="col-12">
                <div class="row">
                    <h1>Changelog</h1>
                </div>
            </div>
<br>
            <div class="col-12">
                <div class="col">
                    <p class="text-accent-1">17.11.2020</p>
                    <h2>Начата разработка личного кабинета пользователя</h2>
                      <br>
                      <h4>Готово</h4>
                    <p class="text-dark">Страница профиля</p>
                    <p class="text-dark">Страница кошелька</p>
                    <p class="text-dark">Страница сообщений</p>
                    <p class="text-dark">Страница выхода</p>
                    <p class="text-dark">Компонент Tabs</p>
                    <p class="text-dark">Страница настроек</p>
                    <p class="text-dark">Страница Bidding (логика при создании)</p>
                    <p class="text-dark">Страница Affilate program</p>
                    <p class="text-dark">Загрузка фото с превью</p>
                    <p class="text-dark">Ширина текста у заголовка на слайдере</p>
                
                    <br>  
                    <h4>TODO:</h4>
                    <p class="text-dark">Страница проектов</p>
                    <p class="text-dark">Удаление фото</p>
                    <p class="text-dark">Компоненты Radio, Checbox, Tables</p>
                    <p class="text-dark">Выровнять формы</p>
                    <p class="text-dark">Вывести проекты на Bidding</p>
                    <br>
                    <h4>Примерная дата и время выполнения: 17.11.2020 18:00 GMT+2</h4>
                    <h4 class="text-accent-1">Потрачено времени на проект за день: 3 часа</h4>
                    <h4 class="text-accent-1">Суммарно потрачено на проект времени на проект: 30 часов</h4>
                </div>
            </div>
            <br>
            <div class="col-12">
                <div class="col">
                    <h2>Баги</h2>
                    <br>
                    <p class="text-dark">Кнопка вызова модального окна Login может отрабатывать некорректно. TODO: Пробросить $emit на шаг назад</p>
                </div>
            </div>
            <br>
            <div class="col-12">
                <div class="col">
                    <h2>Не работает</h2>
                    <br>
                    <p class="text-dark">Респонсивность реализована на часть. Нужно проработать все компоненты перед тем, как делать респонсив</p>
                </div>
            </div>
        </MSection>
      <MFooter />
  </div>
</template>

<script>
import MNavbar from "../components/m-navbar"
import MFooter from "../components/m-footer"
import MSection from "../components/UI/m-section"
export default {
    metaInfo:{
        title:'Changelog'
    },
components:{
    MNavbar,
    MFooter,
    MSection
}
}
</script>

<style>

</style>