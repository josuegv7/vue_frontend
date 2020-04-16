<template>
    <div class="container">
        <div class="row">
            <div>
               
                    <b-form @submit="onSubmit" @reset="onReset" class="w-100" enctype="multipart/form-data">
                        <b-form-file
                        v-model="uploadFileForm.name"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                        ></b-form-file>
                        <b-button type="submit" variant="primary">Submit</b-button>
                    </b-form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default{
    data(){
        return{
            uploadFileForm: {
                name: ""
            }
        }
    },
    methods:{
        initForm() {
            this.uploadFileForm.name = "";
        },
        uploadFile(payload){
            console.log("uploadFile Payload: ", payload)
            const path = `https://calm-savannah-34971.herokuapp.com/files/upload`;
            const config = {headers: {'content-type': 'multipart/form-data'}}
            axios
                .post(path, payload, config)
                .then(res=>{
                    console.log("RES: ", res)
                })
        .catch(err => {
        // eslint-disable-next-line
          console.log(err);
          return err;
        });
        },
        onSubmit(evt) {
            evt.preventDefault();
            let file = this.uploadFileForm.name;
            let formData = new FormData();
            formData.append('file', file);

            // const payload = {
            //     file: this.uploadFileForm.name
            // };
            console.log("onSubmit Payload: ", formData)
            this.uploadFile(formData);
            // this.initForm();
          
        //   &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
          // let files = this.$refs.uploadBtn.files
            // let formData = new FormData()

            // // if you want to upload multiple files at once loop 
            // // through the array of files
            // formData.append('attachment', files[0])
            // axios.post(url, formData).then(response => ...)
        },
        onReset(evt) {
            evt.preventDefault();
            this.initForm();
        }
    }
}
</script>