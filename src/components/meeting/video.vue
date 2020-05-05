<template>
  <div class="card">
    <div class="card-body msg_card_body flex-fill" id="message">
      <!-- {{roomId}} -->
    </div>
    <div id="menuCall" style="z-index:2; padding-bottom: 20px;">
      <span class="btn btn-success">30:20</span>
      <button
        v-on:click="setVideo(!camera, micro)"
        type="button"
        class="btn mn btn-outline-secondary"
      >
        <i :class="{'fa-video': camera, 'fa-video-slash': !camera}" class="fa fa-lg"></i>
      </button>
      <button
        v-on:click="setVideo(camera, !micro)"
        type="button"
        class="btn mn btn-outline-secondary"
      >
        <i :class="{'fa-microphone': micro, 'fa-microphone-slash': !micro}" class="fa fa-lg"></i>
      </button>
      <button type="button" class="btn mn btn-outline-secondary">
        <i class="fas fa-desktop fa-lg"></i>
      </button>
      <button
        v-on:click="changeOpt(1)"
        type="button"
        :class="{ 'btn-outline-secondary': !chatOpt, 'btn-secondary': chatOpt}"
        class="btn mn"
      >
        <i class="fas fa-comments fa-lg"></i>
      </button>
      <button
        v-on:click="changeOpt(2)"
        type="button"
        :class="{ 'btn-outline-secondary': !listOpt, 'btn-secondary': listOpt}"
        class="btn mn"
      >
        <i class="fa fa-user fa-lg"></i>
      </button>
      <button type="button" class="btn mn btn-danger">
        <i class="fa fa-phone fa-lg"></i>
      </button>
    </div>

    <div class="row flex-row">
      <div class="you vid">
        <div v-if="!camera">
          <img :src="'http://localhost:3000/user/'+username+'.jpg'" class="usr_img rounded-circle" />
          <p style="padding-top: 15px; margin:0">{{username}}</p>
        </div>

        <video class="rounded" v-else id="video" :srcObject.prop="videoUser" muted autoplay></video>
      </div>
      <div v-for="(video, i) in listVideo" :key="i" class="vid">
        <video class="rounded" id="video" :srcObject.prop="video.stream" autoplay></video>
      </div>
      <div v-for="(usr, index) in listFriend" :key="index" class="vid">
        <div>
          <img :src="'http://localhost:3000/user/'+'thuypm'+'.jpg'" class="usr_img rounded-circle" />
          <p style="padding-top: 15px; margin:0">{{usr.username}}</p>
        </div>
      </div>
      <!-- <div class="ls">
									<img :src="'https://media.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0?e=2159024400&v=beta&t=C7KMOtnrJwGrMXmgIk2u1B8a7VRfgxMwXng9cdP9kZk'" v-if="!camera" alt="" class="rounded">
  									<video class="rounded" v-else id="video" :srcObject.prop="videoUser" autoplay > </video>
      </div>-->
    </div>
  </div>
</template>

<script>
var Peer = require("simple-peer");
var myPeer = [];
var peer = [];
export default {
  props: ["roomId", "socket"],
  name: "index",
  data() {
    return {
      username: localStorage.username,
      listFriend: [],
      listCli: [],
      myToken: "",
      camera: false,
      micro: false,
      chatOpt: 0,
      listOpt: 0,
      videoUser: "",
      videoSent: Object,
      listVideo: []
    };
  },
  created() {
    // this.socket.emit('newUser', this.roomId, this.username);
    this.socket.on("newUser", (listUser, username, Id) => {
      if (Id != this.socket.id)
        this.listFriend.push({
          username: username,
          Id: Id
        });
      else {
        this.listFriend = listUser;
      }
     this.listFriend;
      this.listCli =  this.listFriend.slice(0, this.listFriend.length);
      // console.log(this.listCli);
    });
    this.socket.on("onVideo", (token, Id) => {
      if (Id != this.socket.id) {
        const found = this.listFriend.findIndex(element => element.Id == Id);
        if (found != -1) this.listFriend.splice(found, 1);
        var p = new Peer({ trickle: false });
        var i = peer.push(p);
        peer[i - 1].signal(token);
        peer[i - 1].on("signal", tk => {
          this.socket.emit("res_video", Id, tk);
        });
        peer[i - 1].on("stream", stream => {
          this.listVideo.push({
            stream: stream,
            Id: Id
          });
        });
        peer[i - 1].on("error", err => console.log("error", err));
        // peer[i - 1].on("end", () => {
        //   // console.log(this.listVideo[i - 1]);
        //   this.listVideo[i - 1].getTracks().forEach(function(track) {
        //     track.stop();
        //   });
        //   this.listVideo.splice(i - 1, 1);
        // });
        // console.log(this.listFriend);
      }
    });
    this.socket.on("res_video", (Id, tk) => {
      if (Id != this.socket.id) {
        var vt = this.listCli.findIndex(element => element.Id == Id);
        console.log(vt);
        myPeer[vt].signal(tk);
      }
    });
  },
  methods: {
    setVideo(camera, micro) {
      this.camera = camera;
      this.micro = micro;
      if (camera || micro)
        navigator.mediaDevices
          .getUserMedia({ audio: micro, video: camera })
          .then(stream => {
            this.videoUser = stream;
            this.listCli.forEach((e, index) =>{
              myPeer[index] = new Peer({
                initiator: true,
                trickle: false,
                stream: stream
              });
              myPeer[index].on("signal", token => {
                this.socket.emit("onVideo", e.Id, token);
              });

              //  myPeer[index].on("stream", stream=>{
              //    console.log('bat video tro lại');
              //    this.listVideo.push({
              //      Id: 'lol', stream:stream
              //    })
              //     this.listFriend.splice(index);
              //  })
            });
            // if(peer.length)
            // peer.forEach((e,ind)=>{
             
            //   e.addStream(stream,()=>{
            //       console.log('da them video')
            //   });
            // })
    
          })
          .catch(err => console.log(err));
      else
        this.videoUser.getTracks().forEach(function(track) {
          track.stop();
          myPeer.end(() => {
            console.log("ket thuc");
          });
        });
    },
    changeOpt(val) {
      if (val == 1) {
        this.chatOpt = 1 - this.chatOpt;
        this.listOpt = 0;
        this.$emit("changeOpt", this.chatOpt);
      }
      if (val == 2) {
        this.listOpt = 2 - this.listOpt;
        this.chatOpt = 0;
        this.$emit("changeOpt", this.listOpt);
      }
    }
  }
};
</script>
<style scoped>
/* .btn-secondary{
	background: #2e353d;;
}
.btn-outline-secondary:hover{
	background: #2e353d;;
} */
.usr_img {
  padding-top: 10px;
  width: 70px;
}
.you {
  border: 1px solid red;
}
.vid {
  border-radius: 5px;
  margin: 3px;
  height: 127px;
  width: 180px;
}
.row {
  flex-wrap: nowrap;
}
</style>