<template>
  <v-layout row justify-center>
    <v-dialog :value="state" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Add user</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field v-model="name" label="Name" clearable></v-text-field>
            <v-text-field v-model="age" label="Age" clearable></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="cancel">Close</v-btn>
          <v-btn color="success" @click="createUser">Create user</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      age: "",
      state: false
    };
  },
  methods: {
    cancel() {
      this.name = "";
      this.age = "";
      this.state = false;
    },
    createUser() {
      this.$store.dispatch("addUser", { name: this.name, age: this.age });
      this.cancel();
    }
  }
};
</script>

<style>
</style>
