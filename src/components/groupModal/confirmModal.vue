<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header"></slot>
        </div>
        <!-- <div class="modal-body">
                                <slot name="body">
                               {{groupCodeJoin}}
                                </slot>
        </div>-->
        <div class="modal-body">
          <slot name="body">
            <H3 v-if="option==1">Bạn muốn rời nhóm <b>{{group.name}}</b>  ?</H3>
            <H3 v-else>Bạn muốn xóa nhóm <b>{{group.name}}</b> ?</H3>
          </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button id="cls" class="btn btn-dark" @click="$emit('close', false)">Hủy</button>
            <button @click="$emit('comfimDel', false)" class="btn btn-primary">Xác nhận</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import axios from 'axios'
 var timeout;
export default {
       props:['group', 'option'],
       data(){
           return{
            axiosConfig: {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          token: localStorage.token
        }
      },
      message: "",
      username: localStorage.username,
           }},
           methods: {
             submit()
             {
               
             }
           }
               

}
     
</script>
<style  scoped>
.usr-in {
  padding: 4px;
  margin: 8px;
  color: black;
  border-radius: 2px;
}
.usr-in:hover {
  background-color: #f3f2f1;
  cursor: pointer;
}
.arrUsr {
  z-index: 90;
  position: fixed;
  border: 2px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.33);
  width: 510px;
  height: auto;
  background: white;
}
.listUser {
  padding-top: 5px;
  height: 100px;
  overflow-y: scroll;
}
.user-in {
  background-color: pink;
  padding: 2px;
  margin: 8px;
  color: black;
  border-radius: 5px;
}
.user-in:hover {
  cursor: pointer;
  background-color: lightsalmon;
}
.form-data {
  width: 100%;
  margin-bottom: 10px;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;

  -webkit-transition: border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 600px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  /* font-family: Helvetica, Arial, sans-serif; */
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  /* margin: 20px 0; */
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>