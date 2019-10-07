<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h2>Items</h2>
        <hr />
        <br />
        <br />
        <alert :message="message" v-if="showMessage"></alert>
        <button type="button" class="btn btn-success btn-sm" v-b-modal.item-modal>Add Item</button>
        <br />
        <br />
        <table   class="table table-hover table-responsive">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Store</th>
              <!-- <th scope="col">ID</th> -->
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in msg" v-bind:key="item._id.$oid">
              <td class="stickyColumn">{{ item.name }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.store }}</td>
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
                    @click="onDeleteItem(item)"
                    size="sm"
                  >Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <b-modal ref="addItemModal" id="item-modal" title="Add a new item" hide-footer>
      <b-form @submit="onSubmit" @reset="onReset" class="w-100">
        <b-form-group id="form-name-group" label="Name:" label-for="form-name-input">
          <b-form-input
            id="form-name-input"
            type="text"
            v-model="addItemForm.name"
            required
            placeholder="Enter Name"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="form-price-group" label="Price:" label-for="form-price-input">
          <b-form-input
            id="form-price-input"
            type="text"
            v-model="addItemForm.price"
            required
            placeholder="Enter price"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="form-quantity-group" label="Quantity:" label-for="form-quantity-input">
          <b-form-input
            id="form-quantity-input"
            type="text"
            v-model="addItemForm.quantity"
            required
            placeholder="Enter quantity"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="form-store-group" label="Store:" label-for="form-store-input">
          <b-form-input
            id="form-store-input"
            type="text"
            v-model="addItemForm.store"
            required
            placeholder="Enter store"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-modal>
    <b-modal ref="editItemModal" id="item-update-modal" title="Update" hide-footer>
      <b-form @submit="onSubmitUpdate" @reset="onResetUpdate" class="w-100">
        <b-form-group id="form-name-edit-group" label="Name:" label-for="form-name-edit-input">
          <b-form-input
            id="form-name-edit-input"
            type="text"
            v-model="editForm.name"
            required
            placeholder="Enter name"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="form-price-edit-group" label="Price:" label-for="form-price-edit-input">
          <b-form-input
            id="form-price-edit-input"
            type="text"
            v-model="editForm.price"
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
            v-model="editForm.quantity"
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
            v-model="editForm.store"
            required
            placeholder="Enter store"
          ></b-form-input>
        </b-form-group>
        <b-button-group>
          <b-button type="submit" variant="primary" size="sm">Update</b-button>
          <b-button type="reset" variant="danger" size="sm">Cancel</b-button>
        </b-button-group>
      </b-form>
    </b-modal>
  </div>
</template>




<script>
import axios from "axios";
import Alert from "./Alert.vue";


export default {
  name: "Ping",
  data() {
    return {
      msg: "",
      addItemForm: {
        name: "",
        price: "",
        quantity: "",
        store: ""
      },
      editForm: {
        id: "",
        name: "",
        price: "",
        quantity: "",
        store: ""
      },
      message: "",
      showMessage: false
    };
  },
  components: {
    alert: Alert
  },
  methods: {
    initForm() {
      this.addItemForm.name = "";
      this.addItemForm.price = "";
      this.addItemForm.quantity = "";
      this.addItemForm.store = "";
      this.editForm.name = "";
      this.editForm.price = "";
      this.editForm.quantity = "";
      this.editForm.store = "";
    },
    getItems() {
      const path = "http://127.0.0.1:5000/items";
      var bearer_Token = this.$cookies.get("TOKEN");
      var config = { headers: {'Content-Type': 'application/json', Authorization : `Bearer ${bearer_Token.replace(/"/g,"")}`} } 
      axios
        .get(path, config)
        .then(res => {
          this.msg = JSON.parse(res.data);
        })
        .catch(err => {
          return err;
        });
    },
    addItem(payload) {
      const path = `http://127.0.0.1:5000/item`;
      var bearer_Token = this.$cookies.get("TOKEN");
      console.log(bearer_Token)
      var config = { headers: {'Content-Type': 'application/json', Authorization : `Bearer ${bearer_Token.replace(/"/g,"")}`} } 
      axios
        .post(path, payload, config)
        .then(() => {
          this.getItems();
          this.message = "Item added!";
          this.showMessage = true;
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err);
          this.getItems();
        });
    },
    updateItem(payload) {
      const path = `http://127.0.0.1:5000/item`;
      var bearer_Token = this.$cookies.get("TOKEN");
      var config = { headers: {'Content-Type': 'application/json', Authorization : `Bearer ${bearer_Token.replace(/"/g,"")}`} } 
      axios
        .put(path, payload, config)
        .then(() => {
          this.getItems();
          this.message = "Item Updated";
          this.showMessage = true;
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.error(err);
          this.getItems();
        });
    },
    removeItem(payload) {
      const path = `http://127.0.0.1:5000/item`;
      var delete_Object = {params: payload }
      var bearer_Token = this.$cookies.get("TOKEN");
      var config = { headers: {'Content-Type': 'application/json', Authorization : `Bearer ${bearer_Token.replace(/"/g,"")}`} } 
      axios
      .delete(path, delete_Object, config)
      .then(() => {
          this.getItems();
          this.message = "Item was deleted";
          this.showMessage = true;
        })
        .catch(err => {
          // eslint-disable-next-line
          console.error(err);
          this.getItems();
        });
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs["addItemModal"].hide();
      const payload = {
        name: this.addItemForm.name,
        price: this.addItemForm.price,
        quantity: this.addItemForm.quantity,
        store: this.addItemForm.store
      };
      this.addItem(payload);
      this.initForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addItemModal.hide();
      this.initForm();
    },
    editItem(item) {
      this.editForm = item;
    },
    onSubmitUpdate(evt) {
      evt.preventDefault();
      this.$refs["editItemModal"].hide();
      const payload = {
        name: this.editForm.name,
        price: this.editForm.price,
        quantity: this.editForm.quantity,
        store: this.editForm.store,
        _id: this.editForm._id.$oid
      };

      this.updateItem(payload);
    },
    onResetUpdate(evt) {
      evt.preventDefault();
      this.$refs.editItemModal.hide();
      this.initForm();
      this.getItems();
    },
    onDeleteItem(item) {
      const payload = {
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        store: item.store,
        _id: item._id.$oid
      };
  
      this.removeItem(payload);
    }
  },
  created() {
    this.getItems();

  }
};
</script>

<style scoped>
  table tr { font-size: .7rem; }
</style>