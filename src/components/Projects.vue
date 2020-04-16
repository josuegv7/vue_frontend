<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h2>Projects</h2>
        <hr/>
        <br />
        <br />
        <alert :message="message" v-if="showMessage"></alert>
        <button type="button" class="btn btn-success btn-sm" v-b-modal.item-modal>Add Project</button>
        <br />
        <br />
        <table class="table table-hover table-responsive">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Items</th>
              <th scope="col">Start Date</th>
              <th scope="col">Project Status</th>
              <th scope="col">Completed Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in msg" v-bind:key="project._id">
              <td class="stickyColumn">{{ project.name }}</td> 
              <td>{{ project.items }}</td>
              <td>{{ new Date(project.project_startDate).toDateString()}}</td>
              <td>{{ project.status }}</td>
              <td>{{ new Date(project.project_completedDate).toDateString()}}</td>
              <td>
                <div class="btn-group" role="group">
                  <button
                    type="button"
                    class="btn btn-warning btn-sm"
                    v-b-modal.project-update-modal
                    @click="editProject(project)"
                    size="sm"
                  >Update</button>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="onDeleteProject(project)"
                    size="sm"
                  >Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
<!-- ADD PROJECT MODEL START-->
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

        <b-form-group id="form-items-group" label="Select Items:" label-for="form-items-input">
          <b-form-checkbox-group
            id="form-items-input"
            v-model="addProjectForm.items"
            required
          >
          <DropDownItems></DropDownItems>
          </b-form-checkbox-group>
        </b-form-group>

        <b-form-group id="form-items-group" label="Select Status:" label-for="form-status-input">
          <b-form-select
            id="form-status-input"
            required
            :options="options"
            v-model="addProjectForm.project_status">
          </b-form-select>
        </b-form-group>

        <b-form-group
          id="form-project_startDate-group"
          label="Project Start Date:"
          label-for="form-project_startDate-input"
        >

        <vc-date-picker
            id="form-project_startDate-input" 
            v-model="addProjectForm.project_startDate"
            mode="popover"
            color="red"
        />      
      </b-form-group>
      
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-modal>
<!-- ADD PROJECT MODEL END -->

<!--  EDIT PROJECT START -->
    <b-modal ref="editProjectModal" id="project-update-modal" title="Update" hide-footer>
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
        
        <b-form-group id="form-items-edit-group" label="Items:" label-for="form-items-edit-input">
          <b-form-checkbox-group
            id="form-items-edit-input"
            v-model="editProjectForm.items"
            required
          >
          <DropDownItems></DropDownItems>
          </b-form-checkbox-group>
        </b-form-group>

        <b-form-group id="form-status-edit-group" label="Status:" label-for="form-status-edit-input">
          <b-form-select
            id="form-status-edit-input"
            required
            :options="options"
            v-model="editProjectForm.status"
            ></b-form-select>
        </b-form-group>

        <b-form-group id="form-project_completedDate-edit-group" label="Project Completed Date:" label-for="form-project_completedDate-edit-input">
          <vc-date-picker
            id="form-project_completedDate-edit-input" 
            v-model="editProjectForm.project_completedDate"
            mode="popover"
            color="red"
            is-dark
          /> 
        </b-form-group>

        <b-button-group>
          <b-button type="submit" variant="primary">Update</b-button>
          <b-button type="reset" variant="danger">Cancel</b-button>
        </b-button-group>
      </b-form>
    </b-modal>
<!--  EDIT PROJECT END -->
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
        status: "",
        project_startDate: null
      },
      editProjectForm: {
        id: "",
        name: "",
        items: "",
        status: "",
        project_startDate: "",
        project_completed: "",
        project_completedDate: ""
      },
      message: "",
      showMessage: false,
      options: [
          { value: "Pending", text: 'Pending' },
          { value: "In Progress", text: 'In Progress' },
          { value: "Completed", text: 'Completed' },
          { value: "Cancelled", text: 'Cancelled' },
      ]
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
      this.addProjectForm.project_startDate = "";
      this.addProjectForm.status = "";
      this.addProjectForm.project_completed = "";
      this.addProjectForm.project_completedDate = "";
      this.editProjectForm.name = "";
      this.editProjectForm.items = "";
      this.editProjectForm.project_startDate= "";
      this.editProjectForm.status= "";
      this.editProjectForm.project_completed= "";
      this.editProjectForm.project_completedDate= "";
    },
    getProjects() {
      const path = "https://calm-savannah-34971.herokuapp.com/projects/myProjectList";
      let authToken = this.$cookies.get("TOKEN");
      let config = { headers: {'Content-Type': 'application/json', authToken : `${authToken.replace(/"/g,"")}`} } 
      axios
        .get(path, config)
        .then(res => {
          // console.log("RES: ", res.data.projectList)
          this.msg = res.data.projectList;
        })
        .catch(err => {
          return err;
        });
    },
    addProject(payload) {
        const path = `https://calm-savannah-34971.herokuapp.com/projects/myProjectList/add`;
        var authToken = this.$cookies.get("TOKEN");
        var config = { headers: {'Content-Type': 'application/json', authToken : ` ${authToken.replace(/"/g,"")}`} } 
        // console.log("Add Project Payload: ", payload)
        axios
        .post(path, payload, config)
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
      let project_Id = payload._id
      const path = `https://calm-savannah-34971.herokuapp.com/projects/myProjectList/edit/${project_Id}`;
      var authToken = this.$cookies.get("TOKEN");
      var config = { headers: {'Content-Type': 'application/json', authToken : `${authToken.replace(/"/g,"")}`} } 
      axios
        .patch(path, payload, config)
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
      let project_Id  = payload._id
      const path = `https://calm-savannah-34971.herokuapp.com/projects/myProjectList/delete/${project_Id}`;
      let authToken = this.$cookies.get("TOKEN");
      let config = { headers: {'Content-Type': 'application/json', authToken : ` ${authToken.replace(/"/g,"")}`} }
      axios
        .delete(path, config)
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
        project_startDate: this.addProjectForm.project_startDate,
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
        items : this.editProjectForm. items,
        project_status : this.editProjectForm.status,
        project_completedDate : this.editProjectForm.project_completedDate,
        _id: this.editProjectForm._id
      };

      this.updateProject(payload);
    },
    onResetUpdate(evt) {
      evt.preventDefault();
      this.$refs.editProjectModal.hide();
      this.initForm();
      this.getProjects();
    },
    onDeleteProject(project) {
      const payload = {
        _id: project._id
      };
      // console.log(payload)
      this.removeProject(payload);
    },
  },
  created() {
    this.getProjects();
  }
};
</script>



<style scoped>
  table tr { font-size: .7rem; }
</style>