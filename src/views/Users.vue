<template>
  <v-container v-if="users">
    <!-- USERS LIST -->
    <v-card>
      <v-card-title>
        <h1>Users list</h1>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="users" :search="search" hide-actions>
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.age }}</td>
          <td>
            <v-btn
              @click="editUser(props.item._id, props.item.name, props.item.age)"
              flat
              icon
              color="teal"
            >
              <v-icon size="21">edit</v-icon>
            </v-btn>
          </td>
          <td>
            <v-btn @click="deleteUser(props.item._id)" flat icon color="red">
              <v-icon size="21">close</v-icon>
            </v-btn>
          </td>
        </template>
        <v-alert
          slot="no-results"
          :value="true"
          color="error"
          icon="warning"
        >Your search for "{{ search }}" found no results.</v-alert>
      </v-data-table>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="addUser()" color="info">Add user</v-btn>
      </v-card-actions>
    </v-card>
    <!-- DIALOGS -->
    <edit-user-dialog :user="user" ref="editUserDialog"></edit-user-dialog>
    <add-user-dialog ref="addUserDialog"></add-user-dialog>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import EditUserDialog from "../components/EditUserDialog.vue";
import AddUserDialog from "../components/AddUserDialog.vue";
export default {
  data() {
    return {
      user: {},
      search: "",
      headers: [
        {
          text: "Name",
          align: "left",
          value: "name"
        },
        { text: "Age", value: "age" },
        { text: "Edit", value: "age", sortable: false },
        { text: "Delete", value: "age", sortable: false }
      ]
    };
  },
  computed: {
    ...mapGetters(["loading", "getUsers"]),
    users() {
      return this.getUsers;
    }
  },
  methods: {
    addUser() {
      this.$refs.addUserDialog.state = true;
    },
    editUser(id, name, age) {
      this.user = {
        id,
        name,
        age
      };
      this.$refs.editUserDialog.state = true;
    },
    deleteUser(id) {
      this.$store.dispatch("deleteUser", id);
    }
  },
  components: {
    EditUserDialog,
    AddUserDialog
  }
};
</script>

