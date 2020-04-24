<template>
    		<div class="card" >
					
						<div class="card-body msg_card_body flex-fill" id="message"	>
					
						</div>
							<div id="menuCall" style="z-index:2; padding-bottom: 20px;">
								<span class="btn btn-success">30:20</span>
									<button  v-on:click="setVideo(!camera, micro)"  type="button" class="btn mn btn-outline-secondary">
									<i :class="{'fa-video': camera, 'fa-video-slash': !camera}" class="fa fa-lg"></i>  
								</button>
									<button v-on:click="setVideo(camera, !micro)" type="button" class="btn mn btn-outline-secondary">
									<i :class="{'fa-microphone': micro, 'fa-microphone-slash': !micro}" class="fa fa-lg"></i>  
								</button>
									<button type="button" class="btn mn btn-outline-secondary">
									<i class="fas fa-desktop fa-lg"></i>  
								</button>
									<button v-on:click="changeOpt(1)" type="button" :class="{ 'btn-outline-secondary': !chatOpt, 'btn-secondary': chatOpt}" class="btn mn">
									<i class="fas fa-comments fa-lg"></i>
								</button>
									<button v-on:click="changeOpt(2)" type="button" :class="{ 'btn-outline-secondary': !listOpt, 'btn-secondary': listOpt}" class="btn mn">
									<i class="fa fa-user fa-lg"></i>  
								</button>
									<button type="button" class="btn mn btn-danger">
									<i class="fa fa-phone fa-lg"></i>  
								</button>
							</div>
						
						<div class="row flex-row">
								<div class="you">
									<img :src="'https://media.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0?e=2159024400&v=beta&t=C7KMOtnrJwGrMXmgIk2u1B8a7VRfgxMwXng9cdP9kZk'" v-if="!camera" alt="" class="rounded">
  									<video class="rounded" v-else id="video" :srcObject.prop="videoUser" autoplay > </video>
								</div>
								<!-- <div class="">
  									<img src="../../assets/img1.jpg" class="rounded" alt="...">
								</div>
								<div class="">
  									<img src="../../assets/img1.jpg" class="rounded" alt="...">
								</div>
								<div class="">
  									<img src="../../assets/img1.jpg" class="rounded" alt="...">
								</div>
								<div class="">
  									<img src="../../assets/img1.jpg" class="rounded" alt="...">
								</div>
								<div class="">
  									<img src="../../assets/img1.jpg" class="rounded" alt="...">
								</div>
								<div class="">
  									<img src="../../assets/img1.jpg" class="rounded" alt="...">
								</div>
								<div class="">
  									<img src="../../assets/img1.jpg" class="rounded" alt="...">
								</div>
								<div class="">
  									<img src="../../assets/img1.jpg" class="rounded" alt="...">
								</div> -->
								<!-- <div class="">
  									<img src="	" class="rounded" alt="...">
								</div> -->
						</div>
					</div>
</template>

<script>

  export default {
         name: 'index',
	 data(){
		 return{
			 userAvatar: localStorage.avatar,
			 camera: false,
			 micro: false,
				 chatOpt:0,
				 listOpt:0,
				 videoUser: '',
				 videoSent: Object,
		 }
	 },
	 mounted(){
		//  this.loadVideo();
	 },
	 methods:{
		 setVideo(camera, micro){
			 this.camera=camera;
		if(camera)
		 navigator.mediaDevices.getUserMedia({audio: false, video: camera
		 })
				 .then(stream=>{
					 this.videoUser=stream;					
				 })
				 .catch(err=> console.log(err));
		else
			this.videoUser.getTracks().forEach(function(track) {
  					track.stop();
			});
		 },
		 changeOpt(val)
		 {
				 if(val==1)
					{
					this.chatOpt= 1- this.chatOpt;
					this.listOpt = 0;	
					this.$emit('changeOpt', this.chatOpt)
					} 
				if(val==2)
				{
					this.listOpt = 2-this.listOpt;
					this.chatOpt= 0;
					this.$emit('changeOpt', this.listOpt);
					}
					
		 }
	 } 
	  }
</script>
<style scoped>
.you{
	border: 1px solid red;
	border-radius: 5px;
	max-height: 127px;
}
.row{
  flex-wrap: nowrap;
}
</style>