<template>
  <div>
      <b-form-checkbox
        v-for="item in msg"
        v-bind:key="item._id"
        v-bind:value="item.name"        
        >
        {{ item.name }}
        </b-form-checkbox>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      msg: [],
      selected: []
    };
  },
  methods: {
    getItems() {
      const path = `http://localhost:3000/tools/myToolList`;
      let authToken = this.$cookies.get("TOKEN");
      let config = { headers: {'Content-Type': 'application/json', authToken : `${authToken.replace(/"/g,"")}`} } 
      axios
        .get(path, config)
        .then(res => {
          this.msg = res.data.toolList;
        })
        .catch(err => {
          return err;
        });
    }
  },
  created() {
    this.getItems();
  }
};
</script>