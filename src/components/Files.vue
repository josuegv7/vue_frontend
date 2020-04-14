<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h2>Files</h2>
        <hr />
        <br />
        <br />
        <alert :message="message" v-if="showMessage"></alert>
        <button
          type="button"
          class="btn btn-success btn-sm"
          v-b-modal.file-modal
        >
          Add File
        </button>
        <br />
        <br />
        <table class="table table-hover table-responsive">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Date Uploaded</th>
              <th scope="col">Type</th>
              <th scope="col">Open</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="file in msg" v-bind:key="file._id">
              <td class="stickyColumn">{{ file.filename }}</td>
              <td>{{ new Date(file.uploadDate).toDateString() }}</td>
              <td>{{ file.contentType }}</td>
              <td>     
                  <button
                    type="button"
                    class="btn btn-warning btn-sm"
                    v-b-modal.display-file-modal
                    @click="openFile(file)"
                    size="sm"
                  >
                    Open
                  </button>
              </td>
              <td>
                <div class="btn-group" role="group">
                  <b-button
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="onDeleteFile(file)"
                    size="sm"
                    >Delete</b-button
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- ADD FILE MODAL: -->
    <b-modal ref="addFilemModal" id="file-modal" title="Add a new file" hide-footer>
        <b-form @submit="onSubmit" @reset="onReset" class="w-100" enctype="multipart/form-data">
            <b-form-file
            v-model="uploadFileForm.name"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Add file here..."
            ></b-form-file>
            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
    </b-modal>
    <!-- DISPLAY MODAL: -->
    <b-modal v-if="fileType !== 'application/pdf'" ref="displayFileModal" id="display-file-modal" title="View Image" hide-footer>
       <h4>File:</h4>
       <b-img :src="img" fluid alt="Image"></b-img>
    </b-modal>
    <b-modal v-else ref="displayFileModal" id="display-file-modal" title="View File" hide-footer>
       <h4>PDF:</h4>
        <pdf             
            @num-pages="pageCount = $event"
			@page-loaded="currentPage = $event"
            :src="img"
        ></pdf>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import pdf from "vue-pdf";
import Alert from "./Alert.vue";

export default {
  name: "Ping",
  data() {
    return {
     fileType: "",
      msg: "",
      img: "",
      uploadFileForm: {
          name: ""
      },
      message: "",
      showMessage: false,
      currentPage: 0,
      pageCount: 0,
    };
  },
  components: {
    alert: Alert,
    pdf
  },
  methods: {
    initForm() {
      this.uploadFileForm.name = "";
    },
    getFiles() {
      const path = `http://localhost:3000/files/getfile`;
      axios
        .get(path)
        .then(res => {
          this.msg = res.data;
        })
        .catch(err => {
          return err;
        });
    },
    uploadFile(payload){
        const path = `http://localhost:3000/files/upload`;
        var authToken = this.$cookies.get("TOKEN");
        var config = { headers: {'Content-Type': 'multipart/form-data', authToken : `${authToken.replace(/"/g,"")}`} } 
        axios
            .post(path, payload, config)
            .then(()=>{
                 // eslint-disable-next-line
                this. getFiles();
                this.message = "File added!";
                this.showMessage = true;
            })
            .catch(err => {
            // eslint-disable-next-line
            console.log(err);
            this. getFiles();
            return err;
            });
        },
    openFile(payload){
        let fileName = payload.filename;
        let fileType = payload.contentType;
        const path = `http://localhost:3000/files/open/${fileName}`;
        axios
            .get(path, payload)
            .then((res) => {
            // console.log("RES:", res)
            this.img = res.config.url;
            this.fileType = fileType;
            this.fileName =fileName;
            this.getFiles();
            this.message = "File Opened";
            this.showMessage = true;
            // if(this.fileType == 'application/pdf'){
            //     // let pdfSrc = pdf.createLoadingTask(this.img)
            //     let pdfSrc =this.img

            //     this.pdfSrc.then(pdf=>{
            //     this.numPages =pdf.numPages
            //     })
            // }
            })
            .catch((err) => {
            // eslint-disable-next-line
            console.error(err);
            this.getFiles();
            });
        },
    deleteFile(payload){
        let fileID = payload._id
        const path = `http://localhost:3000/files/delete/${fileID}`;
              axios
      .delete(path)
      .then(() => {
          this.getFiles();
          this.message = "File was deleted";
          this.showMessage = true;
        })
        .catch(err => {
          // eslint-disable-next-line
          console.error(err);
          this.getFiles();
        });
    },
    onSubmit(evt) {
        evt.preventDefault();
        this.$refs["addFilemModal"].hide();
        let file = this.uploadFileForm.name;
        let formData = new FormData();
        formData.append('file', file);
        this.uploadFile(formData);
    },
    onReset(evt) {
        evt.preventDefault();
        this.$refs.addFilemModal.hide();
        this.initForm();
    },
    onDeleteFile(file) {
      const payload = {
        _id: file._id
      };
      this.deleteFile(payload);
    }
  },
  created() {
    this.getFiles();
  }
};
</script>

<style scoped>
table tr {
  font-size: 0.7rem;
}
</style>
