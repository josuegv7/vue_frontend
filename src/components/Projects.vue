<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h2>Projects</h2>
        <hr />
        <br />
        <br />
        <alert :message="message" v-if="showMessage"></alert>
        <button type="button" class="btn btn-success btn-sm" v-b-modal.item-modal>Add Item</button>
        <br />
        <br />
        <table class="table table-hover table-responsive">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Items</th>
              <th scope="col">Start Date</th>
              <th scope="col">Project Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in msg" v-bind:key="item._id.$oid">
              <td class="stickyColumn">{{ item.name }}</td>
              <td>{{ item.items }}</td>
              <td>{{ item.project_date }}</td>
              <td>{{ item.project_status }}</td>
              <!-- <td>{{ item._id.$oid }}</td> -->
              <td>
                <div class="btn-group" role="group">
                  <button
                    type="button"
                    class="btn btn-warning btn-sm"
                    v-b-modal.item-update-modal
                    @click="editItem(item)"
                    size="sm"
                  >Update</button>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="onDeleteProject(item)"
                    size="sm"
                  >Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <b-modal ref="addProjectModal" id="item-modal" title="Add a new project" hide-footer>
      <b-form @submit="onSubmit" @reset="onReset" class="w-100">
        <b-form-group id="form-name-group" label="Name:" label-for="form-name-input">
          <b-form-input
            id="form-name-input"
            type="text"
            v-model="addProjectForm.name"
            required
            placeholder="Enter Name"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="form-items-group" label="items:" label-for="form-items-input">
          <b-form-checkbox-group
            id="form-items-input"
            v-model="addProjectForm.items"
            required
            placeholder="Enter items"
          >
            <DropDownItems></DropDownItems>
          </b-form-checkbox-group>
        </b-form-group>

        <b-form-group
          id="form-project_date-group"
          label="Project Date:"
          label-for="form-project_date-input"
        >
          <b-form-input
            id="form-project_date-input"
            type="text"
            v-model="addProjectForm.project_date"
            required
            placeholder="Enter Project Date"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="form-project_status-group"
          label="Project Status:"
          label-for="form-project_status-input"
        >
          <b-form-input
            id="form-project_status-input"
            type="text"
            v-model="addProjectForm.project_status"
            required
            placeholder="Enter Project Status"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-modal>
    <b-modal ref="editProjectModal" id="item-update-modal" title="Update" hide-footer>
      <b-form @submit="onSubmitUpdate" @reset="onResetUpdate" class="w-100">
        <b-form-group id="form-name-edit-group" label="Name:" label-for="form-name-edit-input">
          <b-form-input
            id="form-name-edit-input"
            type="text"
            v-model="editProjectForm.name"
            required
            placeholder="Enter name"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="form-price-edit-group" label="Price:" label-for="form-price-edit-input">
          <b-form-input
            id="form-price-edit-input"
            type="text"
            v-model="editProjectForm.items"
            required
            placeholder="Enter price"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="form-price-quantity-group"
          label="Qunatity:"
          label-for="form-qunatity-edit-input"
        >
          <b-form-input
            id="form-quantity-edit-input"
            type="text"
            v-model="editProjectForm.project_date"
            required
            placeholder="Enter quantity"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="form-store-quantity-group"
          label="Store:"
          label-for="form-store-edit-input"
        >
          <b-form-input
            id="form-store-edit-input"
            type="text"
            v-model="editProjectForm.project_status"
            required
            placeholder="Enter store"
          ></b-form-input>
        </b-form-group>
        <b-button-group>
          <b-button type="submit" variant="primary">Update</b-button>
          <b-button type="reset" variant="danger">Cancel</b-button>
        </b-button-group>
      </b-form>
    </b-modal>
  </div>
</template>


<script>
import axios from "axios";
import Alert from "./Alert.vue";
import DropDown from "./DropdownItems.vue";

export default {
  name: "Project",
  data() {
    return {
      msg: "",
      addProjectForm: {
        name: "",
        items: "",
        project_date: "",
        project_status: ""
      },
      editProjectForm: {
        id: "",
        name: "",
        items: "",
        prject_date: "",
        project_status: ""
      },
      message: "",
      showMessage: false
    };
  },
  components: {
    alert: Alert,
    DropDownItems: DropDown
  },
  methods: {
    initForm() {
      this.addProjectForm.name = "";
      this.addProjectForm.items = "";
      this.addProjectForm.project_date = "";
      this.addProjectForm.project_status = "";
      this.editProjectForm.name = "";
      this.editProjectForm.items = "";
      this.editProjectForm.project_date = "";
      this.editProjectForm.project_status = "";
    },
    getProjects() {
      const path = "http://127.0.0.1:5000/projects";
      axios
        .get(path)
        .then(res => {
          this.msg = JSON.parse(res.data);
        })
        .catch(err => {
          return err;
        });
    },
    addProject(payload) {
        console.log(payload)
        const path = `http://127.0.0.1:5000/project`;
      axios
        .post(path, payload)
        .then(() => {
          this.getProjects();
          this.message = "Project added!";
          this.showMessage = true;
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err);
          this.getProjects();
        });
    },
    updateProject(payload) {
      const path = `http://127.0.0.1:5000/project`;
      // eslint-disable-next-line
      //console.log(payload)
      axios
        .put(path, payload)
        .then(() => {
          this.getProjects();
          this.message = "Project Updated";
          this.showMessage = true;
        })
        .catch(err => {
          // eslint-disable-next-line
          console.error(err);
          this.getProjects();
        });
    },
    removeProject(payload) {
      const path = `http://127.0.0.1:5000/project`;
      // eslint-disable-next-line
      console.log(payload)
      axios
        .delete(path, { params: payload })
        .then(() => {
          this.getProjects();
          this.message = "Project was deleted";
          this.showMessage = true;
        })
        .catch(err => {
          // eslint-disable-next-line
          console.error(err);
          this.getProjects();
        });
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs["addProjectModal"].hide();
      const payload = {
        name: this.addProjectForm.name,
        items: this.addProjectForm.items,
        project_date: this.addProjectForm.project_date,
        project_status: this.addProjectForm.project_status
      };
      this.addProject(payload);
      this.initForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addProjectModal.hide();
      this.initForm();
    },
    editProject(project) {
      this.editProjectForm = project;
    },
    onSubmitUpdate(evt) {
      evt.preventDefault();
      this.$refs["editProjectModal"].hide();
      const payload = {
        name: this.editProjectForm.name,
        price: this.editProjectForm.items,
        quantity: this.editProjectForm.project_date,
        store: this.editProjectForm.project_status,
        _id: this.editProjectForm._id.$oid
      };

      this.updateItem(payload);
    },
    onResetUpdate(evt) {
      evt.preventDefault();
      this.$refs.editProjectModal.hide();
      this.initForm();
      this.getProjects();
    },
    onDeleteProject(project) {
      const payload = {
        name: project.name,
        price: project.items,
        quantity: project.project_date,
        store: project.project_status,
        _id: project._id.$oid
      };

      this.removeProject(payload);
    },
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
    this.getProjects();
  }
};
</script>



<style scoped>
  table tr { font-size: .7rem; }
</style>