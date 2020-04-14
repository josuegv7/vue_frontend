<template>
  <b-container class="bv-example-row">
    <b-row><h2>Overview:</h2></b-row>
    <!-- <b-row>
      <b-col>
        <b-card no-body v-b-toggle.accordion-1 class="overflow-hidden" style="background: #00709E;">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img :src="require('../assets/inventory.png')" class="rounded-0" style="width:45%; padding:5%"></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body title="Inventory">
              </b-card-body>
            </b-col>
          </b-row>
          <b-row>
            <b-collapse id="accordion-1"  accordion="my-accordion" role="tabpanel" style="background: white;">
                <Inventory />
            </b-collapse>
          </b-row>
        </b-card>
      </b-col>
    </b-row> -->
    
    <!-- <b-row>
      <b-col>
        <b-card no-body v-b-toggle.accordion-9 class="overflow-hidden" style="max-width: 540px; background-image: linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%);">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img :src="require('../assets/projects.png')" class="rounded-0" style="width:45%; padding:5%"></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body title="Projects">
              </b-card-body>
            </b-col>
          </b-row>
          <b-row>
            <b-collapse id="accordion-9" visible accordion="my-accordion" role="tabpanel" style="background: white;">
                <Projects />
            </b-collapse>
          </b-row>
        </b-card>
      </b-col>
    </b-row> -->
    
    
<b-row>
      <b-col>
        <b-card no-body v-b-toggle.accordion-1 class="overflow-hidden" style="max-width: 540px; background-image: linear-gradient(to right, #f83600 0%, #f9d423 100%);">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img :src="require('../assets/inventory.png')" class="rounded-0" style="width:45%; padding:5%"></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body title="Inventory">
              </b-card-body>
            </b-col>
          </b-row>
          <b-row>
            <b-collapse id="accordion-1"  accordion="my-accordion" role="tabpanel" style="background: white;">
                <inventory />
            </b-collapse>
          </b-row>
        </b-card>
      </b-col>
      <b-col>
        <b-card no-body v-b-toggle.accordion-2 class="overflow-hidden" style="max-width: 540px; background-image: linear-gradient(to right, #f83600 0%, #f9d423 100%);">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img :src="require('../assets/projects.png')" class="rounded-0" style="width:45%; padding:5%"></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body title="Projects">
              </b-card-body>
            </b-col>
          </b-row>
          <b-row>
            <b-collapse id="accordion-4"  accordion="my-accordion" role="tabpanel" style="background: white;">
                <Projects/>
            </b-collapse>
          </b-row>
        </b-card>
      </b-col>
    </b-row>    
    <!-- BOTTOM ROW -->
    <b-row>
      <b-col>
        <b-card no-body v-b-toggle.accordion-3 class="overflow-hidden" style="max-width: 540px; background-image: linear-gradient(to right, #f83600 0%, #f9d423 100%);">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img :src="require('../assets/projects2.png')" class="rounded-0" style="width:45%; padding:5%"></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body title="Files">
              </b-card-body>
            </b-col>
          </b-row>
          <b-row>
            <b-collapse id="accordion-3"  accordion="my-accordion" role="tabpanel" style="background: white;">
                <Files />
            </b-collapse>
          </b-row>
        </b-card>
      </b-col>
      <b-col>
        <b-card no-body v-b-toggle.accordion-4 class="overflow-hidden" style="max-width: 540px; background-image: linear-gradient(to right, #f83600 0%, #f9d423 100%);">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img :src="require('../assets/cost.png')" class="rounded-0" style="width:45%; padding:5%"></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body title="Costs">
              </b-card-body>
            </b-col>
          </b-row>
          <b-row>
            <b-collapse id="accordion-4"  accordion="my-accordion" role="tabpanel" style="background: white;">
                <div><h1>Cost</h1></div>
            </b-collapse>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Items from './Items.vue'
import Projects from './Projects.vue'
import Files from './Files.vue'


import Vue from 'vue'
export default Vue.extend({
    components: {
        Inventory: Items,
        Projects: Projects,
        Files: Files
      },
})
</script>