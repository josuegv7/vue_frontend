<template>
  <b-container class="bv-example-row">
    <b-row><h2>Overview:</h2></b-row>
    <b-row>
      <b-col>
        <b-card no-body v-b-toggle.accordion-1 class="overflow-hidden" style="background: #00709E;">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img src="../assets/inventory.png" class="rounded-0"></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body title="Inventory">
              </b-card-body>
            </b-col>
          </b-row>
          <b-row>
            <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel" style="background: white;">
                <Inventory />
            </b-collapse>
          </b-row>
        </b-card>
      </b-col>
      <b-col>
        <b-card no-body class="overflow-hidden" style="max-width: 540px; background-image: linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%);">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img src="../assets/projects.png" class="rounded-0"></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body title="Projects">
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col>
        <b-card no-body class="overflow-hidden" style="max-width: 540px; background-image: linear-gradient(to right, #f83600 0%, #f9d423 100%);">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img src="../assets/cost.png" class="rounded-0"></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body title="Costs">
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Items from './Items.vue'

import Vue from 'vue'
export default Vue.extend({
    components: {
        Inventory: Items
      },
})
</script>