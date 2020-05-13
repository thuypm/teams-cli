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
var io = require('socket.io-client')
// import io from 'socket.io-client';
var socket = io.connect('http://thuypm.tk:3000');
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
	
.screen{
	  	  display: flex;
  justify-content: center;
  /* height: 200px; */
  /* height:100% */
 /* height: calc(100% - 300px);*/
 height: -moz-calc(100vh - 155px);
 height: -webkit-calc(100vh - 155px); 
}
textarea{
	  font-family: verdana;
}

#menuCall{
		  opacity: 0;
		  position: absolute;
		bottom: calc( 150px);
		  background: #fff;
		padding: 20px 40px 20px 40px;
		border-radius: 2px;
		box-shadow:0 6px 6px 0 rgba(0,0,0,0.2),0 6px 6px 0 rgba(0,0,0,0.19) !important;
margin-bottom: 20px;
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
