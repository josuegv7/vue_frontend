<template>
  <div>
    <b-container>
      <h2>Sign In</h2>
      <alert :message="message" v-if="showMessage" variant="danger"></alert>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">

        <b-form-group id="input-group-1" label="Username:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.username"
            required
            placeholder="Enter a Username"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Password:" label-for="input-2">
          <b-form-input 
            type="password" 
            id="input-2" 
            v-model="form.password" 
            required
            placeholder="Enter a Username"
            ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import Alert from "./Alert.vue";



export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      show: true,
      message: "",
      showMessage: false
    };
  },
  components:{
    alert: Alert
  },
  methods: {
    SignInUser(payload) {
      const path = `http://127.0.0.1:5000/auth`;
      axios
        .post(path, payload)
        .then((response) => {
        // eslint-disable-next-line
        const status = response.status;
        if(status === 201){
            // eslint-disable-next-line
            this.$cookies.set('TOKEN', response.headers.jwt_auth_token);
            this.$router.push('/home');
        }
        else{
          this.message = response.data.Message
          this.showMessage = true
        }
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err);
        });
    },
    onSubmit(evt) {
      evt.preventDefault();
      const payload = {
        email: this.form.email,
        username: this.form.username,
        password: this.form.password
      };
      this.SignInUser(payload);
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.password = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>