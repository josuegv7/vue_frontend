<template>
  <div>
    <b-form-select v-model="selected" :options="options" size="sm" class="mt-3" v-bind:value="selected">{{selected}}</b-form-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      options: [
          { value: "Pending", text: 'Pending' },
          { value: "In Progress", text: 'In Progress' },
          { value: "Completed", text: 'Completed' },
          { value: "Cancelled", text: 'Cancelled' },
      ]
    };
  }
};
</script>