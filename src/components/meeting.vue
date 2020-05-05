<template>
    <div class="row" >
		<!-- <div>{{$route.params.id }}</div> -->
        <div class="col-1custom">
              <Header/>
        </div>
		<div :class="{'col-9custom': option, 'col-11custom': !option}">
			<Video @changeOpt="option=$event" :socket="socket" :roomId="$route.params.id" />
		</div>
				<div class=" col-2custom">
				<Chat v-if="option==1"  :socket="socket"  :roomId="$route.params.id"  />
				<ListUser v-if="option==2"  :socket="socket"  :roomId="$route.params.id" />
				</div>
	
</div>

</template>

<script>
import header from './layout/header.vue';
import video from './meeting/video';
import chat from './meeting/chat';
import listUser from './meeting/listUser';
import io from 'socket.io-client';


var socket = io.connect('http://localhost:3000');
  export default {
	
         name: 'index',
  	    components: {
			  Header:header,
			  Chat: chat,
			Video:video,
			ListUser:listUser
	  },
	  created(){
		 
		  this.socket.emit('join', this.username, this.$route.params.id);
	  },
	 data(){
		 return{
				 option:0,
				 socket: socket,
			     username: localStorage.username
		 }
	 } 
	  }
</script>
<style>
.col-2custom{
	
}
.card{
    /* height: 700px; */
	height: 100vh;
    /* border-radius: 15px !important; */
    background-color: #F3F4F4 !important;
}
.card-body{
	padding:0.25rem
}	
textarea{
	  font-family: verdana;
}
#menuCall{
		  opacity: 0;
		  /* top: 70vh;
		  position: fixed; */
		padding-top: 100px;
 -webkit-transition: opacity 1s; /* Safari */
 transition: opacity 1s;
	
}
#menuCall:hover{
	  opacity: 1;
	 
}
.card-footer{
	padding: 0;
}

.row .flex-row {
  overflow-x: scroll !important;
  white-space: nowrap;
}
.mn{
	padding-left: 20px;
	padding-right: 20px ;
	width: 70px;
}
.rounded{
	width: 180px !important;
	background-color: black;
	height: 125px;
	padding: 0 4px 0 4px
}
.input-group-append:hover{
cursor: pointer;
background: grey ;
}
</style>
