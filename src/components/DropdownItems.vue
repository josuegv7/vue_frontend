<template>
  <div>
      <b-form-checkbox
        v-for="item in msg"
        v-bind:key="item._id.$oid"
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
      const path = "http://127.0.0.1:5000/items";
      axios
        .get(path)
        .then(res => {
          this.msg = JSON.parse(res.data);
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