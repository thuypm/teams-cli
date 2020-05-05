<template>
    	<div class="card" >
					
						<div class="card-body msg_card_body flex-fill" id="message"	>
							<div v-for="(message, index) in listMess" :key="index" > 
									<div class="d-flex justify-content-end mb-4" v-if="message.sent == username">
								<div class="msg_cotainer_send">
										{{message.content}}
									<span class="msg_time_send">{{message.time| DAY()}}</span>
								</div>	
							<div class="img_cont_msg">
								<img v-bind:src="'../../assets/' + message.sent +'.jpg'" class="rounded-circle user_img_msg">
								</div>
							</div>
							<div class="d-flex justify-content-start mb-4" v-else >
								<div class="t_mimg_consg">
									<img v-bind:src="'../../assets/' + message.sent +'.jpg'" class="rounded-circle user_img_msg">
								</div>
								<div class="msg_cotainer">
									{{message.content}}
									<span class="msg_time">{{message.time| DAY()}}</span>
								</div>
							</div>
							</div>
							<div v-show ="typing">
							<div class="d-flex justify-content-start mb-4">

								<div class="msg_cotainer" style="background-color: pink">
									<b> Đang nhập..... </b>
								</div>
							</div>
							</div>
						</div>
							
						
						<div class="card-footer">
							<div class="input-group">
								<div class="input-group-append">
									<span class="input-group-text attach_btn"><i class="fa fa-paperclip"></i></span>
								</div>
								<textarea name="" class="form-control type_msg" placeholder="Type your message..."  @keyup="areTyping($event)" @keyup.enter ="send" v-model="content"></textarea>
								<div class="input-group-append" v-on:click ="send">
									<span class="input-group-text send_btn"><i class="fa fa-paper-plane" ></i></span>
								</div>
							</div>
						</div>
					</div>
</template>
<script>
import axios from 'axios';
// import io from 'socket.io-client';
// var socket = io.connect('http://localhost:3000');
var timeout;
     export default {
		 props: ['roomId', 'socket'],
         name: 'index',
  	    components: {

	  },
	   data(){
		
	return{
	isActive: false,
	selectMessID: '',
	friends:[],
	listMess:[
		{
			sent: 'img1',
			content:'đây là một tin nhắn từ lol',
			time: new Date(),
			type: 'text'
		},
			{
			sent: 'img2',
			content:'đây là một tin ',
			time: new Date(),
			type: 'text'
		},
		
	],
	numberOfMess: Number,
	content: '',
	     username: localStorage.username, 
	typing: false,
		}
		 },

 created(){
			// this.loadData();
			this.socket.on('ib_mess', (ibMess)=>{
				this.typing = false;
				this.listMess.push(ibMess);
				this.$nextTick(function(){
						var messageBox =  document.getElementById('message');
						messageBox.scrollTop = messageBox.scrollHeight
					})
			})
		 },
 filters: {
  /** Viết hoa chữ đầu tiên */
  DAY: function (time) {
  		var d= new Date();
						var reTime = new Date(time); 
				var time = reTime.getHours() + ":" + reTime.getMinutes();
				var day = reTime.getDate()+',th ' +(reTime.getMonth() +1)+ ',' + reTime.getFullYear();	
    return time + '  ' + day;
  }
},
	methods:{
		
	// loadData(){
	// 		var user = JSON.parse(localStorage.user);
	// 		this.username = user.username;
	// 		socket.emit('get_connect', user.username);
	// 	},
	// getMess(friend){
	
	// 	this.selectMessID = friend.messID;
	// 	this.selectPerson = friend;
	// 	this.$nextTick(function(){
	// 		var deselect = document.getElementsByClassName('active')[0];
	// 		if(deselect)
	// 			deselect.classList.remove('active');

	// 	var select =  document.getElementById(friend.friendUsername);
	// 	if(select)
	// 	select.classList.add("active");
	// 	})
	// 	socket.emit('getFriendMess', friend.messID);
	// },
	send(){
		  var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
		if(this.content.trim() != '')
			{
			this.socket.emit('send_mess',this.roomId, {
			type: 'text',
			content: this.content,
			sent: this.username,
			time: utc
			
		});
		this.content = '';

		
			}
	},
	areTyping(event){
	// 	var self = this;
	// 	if(event.keyCode != 13 && event.which != 13)
	// {	 socket.emit('typing' , self.username, self.selectMessID, true);
		
    //     if(timeout)
    //     	clearTimeout(timeout);
	// 		   timeout = setTimeout(function(){
	// 				socket.emit("typing",self.username, self.selectMessID, false)
	// 			}, 3000);
		  
	// 	   }
	},
	// },
	mounted: function () {
	var self = this;
			// socket.on('res_connect', function(data){
			// 	self.friends = data.friends;
			// 	localStorage.user = JSON.stringify(data);
			// 	if(self.friends.length	!= 0){
			// 		self.getMess(self.friends[0]);
			// 	}
			// })
			// socket.on('res_select', function(value){
			// self.listMess= value.message;
			// self.$nextTick(function(){	
			// 			var messageBox =  document.getElementById('message');
			// 			messageBox.scrollTop = messageBox.scrollHeight
			// 		})
			
			// });
			// socket.on('typing', function(who, status){
			// if(who != self.username && status == true)
			// 			{	
			// 			self.typing = true;	
			// 					self.$nextTick(function(){
			// 			var messageBox =  document.getElementById('message');
			// 			messageBox.scrollTop = messageBox.scrollHeight
			// 		})
								
				//		}	
			// if(status == false)
			// 			self.typing = false;
			// 	})
	

	}}

    }
</script>
<style  scoped>
.type_msg{
border:0
}
.card-footer{
	/* border: 1px solid #2c3e50 */
}
.input-group{
	border-radius: 0;
}
.input-group-text{
	background: #2c3e50;
	color: #fff;
	border-radius: 0;
}
.input-group-text:hover{
	background-color: #435f7a;
}
   .user_img_msg{
        height: 40px;
        width: 40px;
        border:1.5px solid #f5f6fa;
    
    }
   .msg_cotainer{
        min-width: 85px;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10px;
    /* border-radius: 5px; */
    background-color: #ffffff;
    padding: 10px;
    position: relative;
    }
    .msg_cotainer_send{
        min-width: 85px;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 10px;
    /* border-radius: 5px; */
    background-color: #2c3e50;
	color: #fff;
    padding: 10px;
    position: relative;
    }
    .msg_time{
    position: absolute;
    left: 0;
    bottom: -15px;
    color: #000;
    font-size: 10px;
    }
    .msg_time_send{
    position: absolute;
    right:0;
    bottom: -15px;
    color: #000;
    font-size: 10px;
    }
    .msg_head{
    position: relative;
    }
</style>