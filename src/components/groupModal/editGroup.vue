<template>
      <div class="modal-mask" >
                        <div class="modal-wrapper">
                            <div class="modal-container">

                            <div class="modal-header">
                                <slot name="header">
                           <input v-if="!groupJoin" v-model="nameOfGroup" type="text" class="form-data" style="width:100%" placeholder="Tên nhóm">
                           <h6 v-if="groupJoin" style="text-align:center">Nhóm: <b>{{groupJoin.name}}</b></h6>
                                </slot>
                            </div>
                            <!-- <div class="modal-body">
                                <slot name="body">
                               {{groupCodeJoin}}
                                </slot>
                            </div> -->
                            <div class="modal-body">
                                <slot name="body">
                                 <input type="text" v-model="userSearch" @keyup="findUser()" class="form-data" placeholder="Thêm người" > 
                                 <!-- <button class="btn btn-success" style="width:15%" @click="addUser()" ><i class="fa fa-plus"></i></button> -->
                                  <div v-if="userSearch" class="arrUsr" > 
                                    <p v-if="!notFind" >Không tìm thấy hoặc người này đã thêm</p>
                                    <p v-for="(usr, id) in listUserSearch" :key="id" @click="addUser(usr)" class="usr-in">{{usr}}</p>
                                  </div>
                                 <!-- <div v-if="errFind" style="background-color:pink; padding:5px, margin:3px" > {{errFind}} <i class="fa fa-warning"></i> </div> -->
                                 
                                 <div  class="listUser" >
                                     <span v-for="(usr, index) in listUserPush" :key="index" @click="listUserPush.splice(index,1);" class="user-in">{{usr}} <i class="fa fa-trash"></i></span>
                                 </div>
                                </slot>
                            </div>
                            <div class="modal-footer">
                                <slot name="footer">
                    
                                <button id="cls" class="btn btn-dark" @click="$emit('close', false)">
                                    Close
                                </button>
                                 <button @click="submit()" class="btn btn-primary" >
                                    Submit
                                </button>
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
       props:['groupJoin'],

       data(){
           return{
               axiosConfig:{
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          token: localStorage.token
      }},
      listUserSearch: [],
       username: localStorage.username,
        listUserPush: [],
        nameOfGroup: '',
         userSearch: '',
      notFind: 1,
           }},
           methods:{
             findUser(){
                this.notFind= 1;  
        if(timeout)
        	clearTimeout(timeout);
			   timeout = setTimeout(()=>{
            this.findServer();
				}, 700);

             },
             findServer()
             {
            
               this.listUserSearch = [];
                      if((this.userSearch.trim()))
                      axios.post("http://localhost:3000/user/search", {username: this.userSearch}, this.axiosConfig).then((res)=>{
                        var arr=[];
                        for(var i in res.data)
                          {
                            if(res.data[i].username != this.username)
                            if(!this.groupJoin)
                            {
                                if(this.listUserPush.indexOf(res.data[i].username) == -1)
                                    arr.push(res.data[i].username) 
                            }
                            else
                            if(this.listUserPush.indexOf(res.data[i].username) == -1 && this.groupJoin.members.indexOf(res.data[i].username) == -1)
                            arr.push(res.data[i].username) 
                          };
                        this.listUserSearch = arr;
                        this.notFind = arr.length; 
                      });
                      else
                      this.listUserSearch=[];
                     

             },
               addUser(usr){
                this.userSearch=''; 
                this.listUserPush.push(usr);
                this.listUserSearch= [];
                },
            
               submit(){
                 var upLen ;
                 if(this.groupJoin) 
                 {
              upLen=     {
                    roomId: this.groupJoin._id,
                  members: this.listUserPush,
                  action: 1
                 }}
                 else{
                   upLen = {
                     owner: this.username,
                     name: this.nameOfGroup,
                     members: this.listUserPush,
                     action: 0                   }
                 
                  } 
                      axios.post("http://localhost:3000/editRoom",upLen, this.axiosConfig).then(res=>{
                        if(res.data)
                          {
                            this.$emit('editGroup', res.data);
                       
                          }
                      })
               },
               remove(usr){
                   this.listUserPush.splice(this.listUserPush.indexOf(usr));
               }
           }}
     
</script>
<style  scoped>
.usr-in{
    padding: 4px;
    margin: 8px;
    color: black;
    border-radius: 2px;
 
}
.usr-in:hover{
 background-color: #f3f2f1;
 cursor: pointer;
}
.arrUsr{
  z-index: 90; position: fixed; border:2px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.33);
      width: 510px;
      height: auto;
         background: white;
}
.listUser{
    padding-top:5px;
    height: 100px;
    overflow-y: scroll;
}
.user-in{
   background-color: pink; 
    padding: 2px;
    margin: 8px;
    color: black;
    border-radius: 5px;
}
.user-in:hover{
    cursor: pointer;
    background-color: lightsalmon;
}
.form-data{

width: 100%;
margin-bottom: 10px;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;

    -webkit-transition: border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
    transition: border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
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
  font-family: Helvetica, Arial, sans-serif;
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