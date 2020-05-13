<template>
<div class="card" >
	<div style="padding:3px">
		   <input type="text" class="form-control" placeholder="Tìm ai đó" >
	</div>
            		<ul class="contacts">
						 <li v-for="(usr, index) in members" :key="index" v-bind:id="usr.username">
							<div class="d-flex bd-highlight">
								<div class="img_cont " >
									<img v-bind:src="'http://thuypm.tk:3000/user/'+usr+'.jpg'" class="rounded-circle user_img">
									<span class="online_icon"></span>
									
								</div>
								<div class="user_info">
									<span>{{usr}}</span>
									<!-- <p>sửa sau</p> -->
								</div>
								<div class="ml-auto" style="padding-top:5px">
									<button class="btn btn-outline-secondary"><i class="fa fa-microphone" ></i>   </button>
										<button class="btn btn-outline-danger"><i class="fa fa-trash"></i>   </button>
										  
								</div>
							</div>
						</li>
                           		</ul>
</div>
</template>
<script>
    import axios from 'axios'
export default {
	props: ['roomId'],
    data()
    {
        return{
			  axiosConfig:{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    token: localStorage.token
				}},
				micro: false,
                members: [
				//	{
                //     username: 'img1',

                // },
                // {
                //     username: 'img2',

                // }
                ]
        }
    },
	created(){
		this.loadData();
	},

	methods: {
		loadData(){
			axios.post("http://thuypm.tk:3000/room/getRoom", {roomId: this.roomId}, this.axiosConfig).then((res)=>{
				// console.log(res.data);
				this.members = res.data.members;
			})
		}
	}
}
</script>
<style  scoped>
.user_info{
	  font-family: "proxima-nova", "Source Sans Pro", sans-serif;
	font-size: 18px;
}
	.img_cont{
			position: relative;
			/* height: 70px;
			width: 70px; */
	}
	.online_icon{
		position: absolute;
		height: 10px;
		width:10px;
		background-color: #4cd137;
		border-radius: 50%;
		bottom: 0em;
		right: 0.3em;
		border:1.5px solid white;
	}
	.offline{
		background-color: #c23616 !important;
	}
.user_img{
	max-width: 50px;
	border: 2px solid #fff
}
.contacts {
	padding:0
}
.user_info{
	padding-left: 5px;
}
 .contacts li{
			width: 100% !important;
			padding: 5px;
			margin-bottom: 15px !important;
			list-style-type:none;
		}
		 .contacts li:hover{
			 background: #fff;
		 }
</style>