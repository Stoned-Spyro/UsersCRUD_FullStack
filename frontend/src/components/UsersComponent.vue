<template>
  <div class="user-component">
    <table v-if="users.length > 0" class="users-table">
      <caption>
        User List
      </caption>
      <thead>
        <tr class="header-row">
          <th>ID</th>
          <th>Login</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="data-row">
          <td>{{ user.id }}</td>
          <td>{{ user.login }}</td>
          <td>{{ user.first_name }}</td>
          <td>{{ user.last_name }}</td>
          <td>{{ user.email }}</td>
          <td class="btn-cell">
            <button class="user-table-btn edit-btn" @click="editUser(user.id)">
              Edit User
            </button>
          </td>
          <td class="btn-cell">
            <button
              class="user-table-btn delete-btn"
              @click="deleteUser(user.id)"
            >
              Delete User
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <h3 v-else>Currently, there is no users. Try to create one!</h3>
    <button class="create-new-btn" @click="showModal('create-user')">
      Create New User
    </button>
    <modal-component
      v-if="currentShownModal === 'create-user'"
      @close="closeModal"
    >
      <template #header>
        <h2>Create New User</h2>
      </template>
      <template #body>
        <form-component
          @refreshUsers="retrieveUsers"
          @closeModal="closeModal"
        ></form-component>
      </template>
    </modal-component>
    <modal-component
      v-if="currentShownModal === 'edit-user'"
      @close="closeModal"
    >
      <template #header>
        <h2>Update User</h2>
      </template>
      <template #body>
        <form-component
          @refreshUsers="retrieveUsers"
          @closeModal="closeModal"
          :targetUserId="currentTargetUser"
        ></form-component>
      </template>
    </modal-component>
  </div>
</template>
<script>
import UserApiService from "../services/userApiService";
import ModalComponent from "./ModalComponent.vue";
import FormComponent from "./FormComponent.vue";

export default {
  name: "users-component",
  components: {
    ModalComponent,
    FormComponent,
  },
  data() {
    return {
      users: [],
      currentTargetUser: null,
      currentShownModal: null,
    };
  },
  methods: {
    retrieveUsers() {
      UserApiService.getAll()
        .then((res) => {
          this.users = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
      console.log("test");
    },
    deleteUser(userId) {
      UserApiService.delete(userId)
        .then(() => {
          this.retrieveUsers();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    editUser(userId) {
      this.currentTargetUser = userId;
      this.showModal("edit-user");
    },

    showModal(modalName) {
      this.currentShownModal = modalName;
    },
    closeModal() {
      this.currentShownModal = null;
    },
  },
  beforeMount() {
    this.retrieveUsers();
  },
};
</script>
<style scoped>
.users-table {
  margin-top: 12px;
  border: 1px solid black;
  height: 100%;
  width: 100%;
  table-layout: auto;
  border-collapse: collapse;
  border-spacing: 1px;
  text-align: left;
}
.users-table > caption {
  font-weight: 700;
  text-align: left;
  margin-bottom: 8px;
}
.header-row > th {
  border: 1px solid black;
  background-color: #eceff1;
  color: #000000;
  padding: 5px;
}
.data-row > td {
  border: 1px solid black;
  background-color: #ffffff;
  color: #000000;
  padding: 5px;
}
.user-component {
  margin: 12px;
  padding: 12px;
  border-radius: 10px;
  border: solid 1px;
  -webkit-box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.41);
  -moz-box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.41);
  box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.41);
}

.user-table-btn {
  width: 100%;
  border-radius: 10px;
}

.delete-btn {
  background-color: rgb(236, 56, 56);
}
.delete-btn:hover {
  background-color: rgb(175, 4, 4);
  color: white;
}
.edit-btn {
  background-color: rgb(236, 236, 125);
}
.edit-btn:hover {
  background-color: rgb(163, 163, 0);
  color: white;
}
.create-new-btn {
  margin-top: 20px;
  width: 200px;
  height: 30px;
  background-color: rgb(53, 206, 53);
  border-radius: 10px;
}
.create-new-btn:hover {
  background-color: green;
  color: white;
}
.btn-cell {
  width: 100px;
}
</style>
