<template>
  <div>
    <b-container>
      <h2>Sign Up </h2>
      <alert :message="message" v-if="showMessage" variant="danger"></alert>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Name:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.name"
            required
            placeholder="Enter a Username"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Password:" label-for="input-3">
          <b-form-input type="password" id="input-3" v-model="form.password" required></b-form-input>
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
        email: "",
        name: "",
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
    createUser(payload) {
      const path = `http://localhost:3000/user/create`;
      // const path = `https://calm-savannah-34971.herokuapp.com/user/create`
      axios
        .post(path, payload)
        .then((response) => {
        // eslint-disable-next-line
        const status = response.status;
        const header = response.headers.authtoken;
        // eslint-disable-next-line
        if(status === 200){
            // eslint-disable-next-line
            this.$cookies.set('TOKEN', header);
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
        name: this.form.name,
        password: this.form.password
      };
      this.createUser(payload);
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.name = "";
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