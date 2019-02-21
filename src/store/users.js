const axios = require('axios');

export default {
  state: {
    users: null
  },
  mutations: {
    setUsers(state, payload) {
      state.users = payload;
    },
    addUser(state, user) {
      state.users.push(user);
    },
    editUser(state, user) {
      const id = user.id;
      const editedUser = state.users.find(user => user._id == id);
      editedUser.name = user.name;
      editedUser.age = user.age;
    },
    deleteUser(state, id) {
      const index = state.users.findIndex(user => user._id == id);
      state.users.splice(index, 1);
    }
  },
  actions: {
    async fetchUsers({
      commit
    }) {
      console.log('fetch users');
      commit('setLoading', true);
      commit('clearError');

      try {
        const users = await axios.get('http://localhost:3000/api/users');
        commit('setUsers', users.data);

        commit('setLoading', false);
      } catch (error) {
        commit('setLoading', false);
        commit('setError', error);
        console.log(error.message)
      }
    },

    async addUser({
      commit
    }, user) {
      console.log('add user');
      commit('setLoading', true);
      commit('clearError');

      try {
        const result = await axios.post('/api/users', user);
        commit('addUser', result.data);
        commit('setLoading', false);
      } catch (error) {
        commit('setLoading', false);
        commit('setError', error);
        console.log(error.message)
      }
    },

    async editUser({
      commit
    }, user) {
      console.log('add user');
      commit('setLoading', true);
      commit('clearError');

      try {
        await axios.put('/api/users', user);
        commit('editUser', user);
        commit('setLoading', false);
      } catch (error) {
        commit('setLoading', false);
        commit('setError', error);
        console.log(error.message)
      }
    },

    async deleteUser({
      commit
    }, id) {
      try {
        console.log('delete user');
        commit('setLoading', true);
        commit('clearError');

        await axios.delete(`http://localhost:3000/api/users/${id}`);
        commit('deleteUser', id);

        commit('setLoading', false);
      } catch (error) {
        commit('setLoading', false);
        commit('setError', error);
        console.log(error.message)
      }
    }
  },
  getters: {
    getUsers(state) {
      return state.users;
    }
  }
}