<template>
  <div id="payment">
    <MNavbar />
    <MSection :id="'payment-proccess'">
      <div class="payment-section">
        <h1 class="text-heading">Оплата</h1>
        <div
          v-if="currentProduct.projectID == 'topup'"
          class="col estimation-product"
        >
          <div class="estimation-item-row">
            <p class="text-accent-1">ID:</p>
            <p>{{ currentProduct.userID }}</p>
          </div>
          <div class="estimation-item-row">
            <p class="text-accent-1">Тип:</p>
            <p>
              {{
                currentProduct.API_TYPE == "topup"
                  ? "Пополнение счета"
                  : currentProduct.API_TYPE
              }}
            </p>
          </div>
        </div>
        <div
          v-if="currentProduct.projectID != 'topup'"
          class="col estimation-product"
        >
          <div class="estimation-item-row">
            <p class="text-accent-1">ID:</p>
            <p>{{ project.id }}</p>
          </div>
          <div class="estimation-item-row">
            <p class="text-accent-1">Название:</p>
            <p>{{ project.title }}</p>
          </div>
          <div class="estimation-item-row">
            <p class="text-accent-1">Размер доли:</p>
            <p>{{ currentProduct.shareSize }}%</p>
          </div>
        </div>
        <div class="col estimation-col">
          <div class="estimation-item-row">
            <p class="text-accent-1">ID:</p>
            <p>{{ data.id }}</p>
          </div>
          <div class="estimation-item-row">
            <p class="text-accent-1">Сумма платежа:</p>
            <p>
              {{
                data.amount +
                " " +
                (data.fiat == "usd"
                  ? "USD"
                  : data.fiat == "rub"
                  ? "RUR"
                  : data.fiat)
              }}
            </p>
          </div>
          <div class="estimation-item-row">
            <p class="text-accent-1">Платёжная система:</p>
            <p>{{ paymentSystem.name }}</p>
          </div>
          <div class="estimation-item-row">
            <p class="text-accent-1">Статус:</p>
            <p>{{ data.status }}</p>
          </div>
        </div>
        <div class="row">
          <MButton :btnClass="'btn btn-regular'" @click="toHome"
            >Главная</MButton
          >
          <MButton :btnClass="'btn btn-regular'" @click="toHome"
            >В каталог</MButton
          >
          <MButton
            v-if="data.status == 'COMPLETED'"
            :btnClass="'btn btn-regular'"
            @click="generatePDF"
            >Квитанция</MButton
          >
        </div>
      </div>

      {{ setProduct() }}
    </MSection>
    <MFooter />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import MSection from "../components/UI/m-section";
import MFooter from "../components/m-footer";
import MButton from "../components/UI/m-button";
import MNavbar from "../components/m-navbar";
const PAY_API = "https://api.staging.iserverbot.ru/v1/";
import axios from "axios";
import { jsPDF } from "jspdf";
import logo from "@/assets/img/logo_reg.png";

export default {
  data() {
    return {
      data: "",
      project: "",
      paymentSystem: "",
      id: this.$route.params.id,
      test: "",
      getInvoiceData: setInterval(() => {
        this.getInvoice();
        console.log("Started");
      }, 10000),
    };
  },
  computed: {
    ...mapActions(["getUserIP"]),
    ...mapState([
      "accessToken",
      "currentProduct",
      "rateBTC",
      "user",
      "user_ip",
    ]),
  },
  methods: {
    doTx(data) {
      let options = {
        url: "doTx",
        method: "post",
        data: data,
      };

      this.$http(options)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
    sendLogs(type, action) {
      let data = {
        type: type,
        userID: this.user.id,
        createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        amount: this.data.amount,
        proviso: 201,
        status: 2,
        payment: this.paymentSystem.name,
        action: action,
        ip: this.user_ip.ip,
      };

      let options = {
        url: "logs",
        method: "post",
        data: data,
      };

      this.$http(options)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
    // getWallet() {
    //   let options = {
    //     url: `users/${this.currentProduct.userID}/wallet`,
    //     method: "get",
    //   };

    //   this.$http(options).then((res) => {
    //     this.$store.commit("SAVE_USER_WALLET", res.data);
    //   });
    // },
    getUserInfo() {
      let options = {
        url: `users/${this.currentProduct.userID}`,
        method: "get",
      };

      this.$http(options).then((res) => {
        this.$store.commit("SAVE_USER", res.data);
      });
    },
    getProjects() {
      let options = {
        url: "projects",
        method: "get",
      };

      this.$http(options).then((res) =>
        this.$store.commit("SAVE_PROJECTS", res.data)
      );
    },
    getUserProjects() {
      let options = {
        url: `users/projects/${this.currentProduct.userID}`,
        method: "get",
      };

      this.$http(options).then((res) => {
        this.$store.commit("SAVE_USER_PROJECTS", res.data);
      });
    },
    setProduct() {
      if (this.data.status == "COMPLETED") {
        // set the project
        clearInterval(this.getInvoiceData);

        if (this.currentProduct.API_TYPE == "buy") {
          let data = {
        userID: this.user.id,
        type: 1,
        amount: this.data.amount,
        rate_btc: this.rateBTC,
        projectID: this.currentProduct.projectID,
        shareSize: this.currentProduct.shareSize,
        createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
      }

          this.doPay();
          this.getUserProjects();
          this.getProjects();
          this.sendLogs(1, "pay");
          this.doTx(data);
        }
        if (this.currentProduct.API_TYPE == "increase") {
                    let data = {
        userID: this.user.id,
        type: 1,
        amount: this.data.amount,
        rate_btc: this.rateBTC,
        projectID: this.currentProduct.projectID,
        shareSize: this.currentProduct.shareSize,
        createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
      }

          this.doIncrease();
          this.getProjects();
          this.getUserProjects();
          this.doTx(data);
        }
        if (this.currentProduct.API_TYPE == "topup") {
                    let data = {
        userID: this.user.id,
        type: 1,
        amount: this.data.amount,
        rate_btc: this.rateBTC,
        projectID: 522,
        shareSize: 522,
        createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
      }

          this.doTopUp();
          this.getWallet();
          this.doTx(data);
          this.sendLogs(1, "topup");
          
        }

        return;
      }
    },
    doIncrease() {
      let options = {
        url: "buy/increase",
        method: "patch",
        data: {
          userID: this.currentProduct.userID,
          projectID: this.currentProduct.projectID,
          userfunded: this.data.amount,
          type: 1,
          active: 1,
          shareSize: this.currentProduct.shareSize,
          percentage: this.currentProduct.shareSize,
        },
      };

      this.$http(options).then((res) => console.log(res.data, "INCREASED"));
    },
    doTopUp() {
      let options = {
        url: `users/topup/${this.currentProduct.userID}`,
        method: "patch",
        data: {
          summ: this.currentProduct.amount,
        },
      };

      axios(options).then((res) => console.log(res));
    },
    doPay() {
      let options = {
        url: "buy",
        method: "post",
        data: {
          userID: this.currentProduct.userID,
          projectID: this.currentProduct.projectID,
          userfunded: Number(this.data.amount),
          type: 1,
          active: 1,
          shareSize: this.currentProduct.shareSize,
          percentage: this.currentProduct.shareSize,
        },
      };

      console.log(options);

      this.$http(options).then((res) => console.log(res.data, "BOUGHT"));
    },
    toHome() {
      this.$router.push({ name: "Home" });
      clearInterval(this.getInvoiceData);
      this.$store.commit("SET_CURRENT_PRODUCT", {});
    },
    // PDF GENERATOR
    generatePDF() {
      let id = this.data.id;
      let projectID = this.project.projectID;
      let amount = this.data.amount;
      let date = new Date().toISOString().slice(0, 19).replace("T", " ");
      const doc = new jsPDF({
        orientation: "portait",
        unit: "px",
        format: [300, 300],
      });
      doc.addImage(logo, "PNG", 130, 20, 40, 15);
      //ID
      doc.text("Bill #" + id, 120, 60);
      if (
        this.currentProduct.API_TYPE == "buy" ||
        this.currentProduct.API_TYPE == "increase"
      ) {
        doc.text("Project ID:", 30, 80);
        doc.text(this.project.id.toString(10), 180, 80);
        //   //Title
        doc.text("Project Name:", 30, 100);
        doc.text(this.project.title_en, 180, 100);
        // Share
        doc.text("Your share:", 30, 160);
        doc.text(this.currentProduct.shareSize + " %", 180, 160);
      }

      //Date
      doc.text("Date:", 30, 120);
      doc.text(date, 180, 120);
      //Amount
      doc.text("Amount:", 30, 140);
      doc.text(this.data.amount.toString(10) + " " + this.data.coin, 180, 140);

      // Paymnt
      doc.text("Payment system:", 30, 180);
      doc.text(this.paymentSystem.name, 180, 180);
      //Paymnt
      doc.text("Type:", 30, 200);
      doc.text(this.currentProduct.API_TYPE, 180, 200);
      doc.text("monopolylife.ru", 110, 240);

      doc.save(`bill-${id}-${date}`);
    },
    // PDF GENERATOR /end
    getPaySystem(id) {
      let options = {
        url: `${PAY_API}payment-systems/${id}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      };

      axios(options).then((res) => (this.paymentSystem = res.data));
    },
    getInvoice() {
      let options = {
        url: `${PAY_API}invoices/${this.id}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      };

      axios(options)
        .then((res) => {
          this.data = res.data;
        })
        .catch((err) => console.log(err));
    },
    getWallet(){
      let options = {
        url: `users/${this.user.id}/wallet`,
        method:'get'
      }

      this.$http(options)
      .then(res=>{this.$store.commit('SAVE_USER_WALLET', res.data)})
    },
    getProject() {
      let options = {
        url: `projects/${this.currentProduct.projectID}`,
        method: "get",
      };

      this.$http(options).then((res) => (this.project = res.data));
    },
    // reloadStates(){
    //   let data = [
    //     {
    //       endpoint: `users/${this.user.id}/wallet`,
    //       method:'get',
    //       state: 'SAVE_USER_WALLET',
    //     }
    //   ]
      
    //   this.$store.dispatch('reloadUserState', data)
    // }
  },
  created() {
    this.getProject();

    this.getInvoice();
    setTimeout(() => {
      this.getPaySystem(this.data.payment_system_id);
    }, 800);
  },
  mounted() {
   
  },

  components: {
    MFooter,
    MNavbar,
    MSection,
    MButton,
  },
};
</script>

<style scoped>
.text-heading {
  text-align: center;
  margin: 0 auto;
}
</style>