<template>
  <div>
    <form @submit.prevent="submit">
      <div class="form-field">
        <label for="login">Login:</label>
        <input type="text" id="login" v-model="user.login" required />
      </div>
      <div class="form-field">
        <label for="first_name">First Name:</label>
        <input type="text" id="first_name" v-model="user.first_name" />
      </div>
      <div class="form-field">
        <label for="last_name">Last Name:</label>
        <input type="text" id="last_name" v-model="user.last_name" />
      </div>
      <div class="form-field">
        <label for="email">Email:</label>
        <input type="text" id="email" v-model="user.email" required />
      </div>
      <div v-if="error" class="error-msg">
        {{ error }}
      </div>
      <div class="footer-part">
        <button class="btn" type="submit">Submit</button>
        <button class="btn" @click="closeModal">Close Modal</button>
      </div>
    </form>
  </div>
</template>
<script>
/* eslint-disable */
import userApiService from "../services/userApiService";
import UserApiService from "../services/userApiService";

export default {
  name: "form-component",
  props: {
    targetUserId: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      user: {
        id: null,
        first_name: "",
        last_name: "",
        login: "",
        email: "",
      },
      error: "",
    };
  },
  methods: {
    refreshUsers() {
      this.$emit("refreshUsers");
    },
    closeModal() {
      this.$emit("closeModal");
    },
    fetchTargetUserData() {
      UserApiService.get(this.targetUserId)
        .then((res) => {
          this.user = res.data;
          console.log(res);
        })
        .catch((err) => {
          this.error = err;
          console.log(err);
        });
    },
    updateUserData() {
      userApiService
        .update(this.targetUserId, this.user)
        .then( () => {
          this.refreshUsers();
          this.closeModal();
          this.error = "";
        })
        .catch((err) => {
          console.log(err);
          if (err.response?.data) {
            this.error = err.response.data.error;
          }
        });
    },
    createNewUser() {
      userApiService
        .create(this.user)
        .then(() => {
          this.refreshUsers();
          this.closeModal();
          this.error = "";
        })
        .catch((err) => {
          console.log(err);
          if (err.response?.data) {
            this.error = err.response.data.error;
          }
        });
    },
    submit() {
      if (this.targetUserId) {
        this.updateUserData();
      } else {
        this.createNewUser();
      }
    },
  },
  beforeMount() {
    if (this.targetUserId) {
      this.fetchTargetUserData();
    }
  },
};
</script>
<style scoped>
.footer-part {
  display: flex;
  justify-content: space-between;
}
.btn {
  width: 150px;
  height: 30px;
  background-color: rgb(53, 206, 53);
  border-radius: 10px;
}
.btn:hover {
  background-color: green;
  color: white;
}
.form-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
.form-field > input {
  height: 20px;
  border-radius: 6px;
  border: solid 1px;
  padding-left: 4px;
}
.form-field > label {
  margin-bottom: 4px;
}
.error-msg {
  padding: 8px;
  margin-bottom: 20px;
  background-color: rgb(236, 119, 119);
  color: rgb(110, 4, 4);
  border-radius: 10px;
  border: solid 1px;
}
</style>
