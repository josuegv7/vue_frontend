<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="/home">Depot</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            
            <b-nav-item href="/items">Items</b-nav-item>
            <b-nav-item href="/projects">Projects</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">


            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template slot="button-content">
                <em>User</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item @click="signOut">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";

export default {
   methods: {
     signOut() {
      const path = "http://127.0.0.1:5000/auth";
      var bearer_Token = this.$cookies.get("TOKEN");
      var config = { headers: {'Content-Type': 'application/json', Authorization : `Bearer ${bearer_Token.replace(/"/g,"")}`} } 
      axios
        .delete(path, config)
        .then(res => {
          this.msg = JSON.parse(res.data);
          this.$cookies.remove("TOKEN");
          this.$router.push('/home');
        })
        .catch(err => {
          return err;
        });
    },
   }
}
</script>