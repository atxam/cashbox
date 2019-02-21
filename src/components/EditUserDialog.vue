<template>
  <v-layout row justify-center>
    <v-dialog :value="state" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field v-model="user.name" label="Name" clearable></v-text-field>
            <v-text-field v-model="user.age" label="Age" clearable></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="state = false">Close</v-btn>
          <v-btn color="success" @click="save()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: ["user"],
  data() {
    return {
      state: false
    };
  },
  methods: {
    save() {
      this.$store.dispatch("editUser", this.user);
      this.state = false;
    }
  }
};
</script>

<style>
</style>
