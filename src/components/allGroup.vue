<template>
  <div class="row">
    <div class="col-1custom" style="z-index:999">
      <Header />
    </div>

    <editGroup
      v-show="showModal"
      @editGroup="editGroup"
      @close="showModal=false;"
      :groupJoin="groupJoin"
    />
    <confirm v-if="groupDel" @close="groupDel=null" @comfimDel="confirmDel()" :option="delOption" :group="groupDel" />
    <div v-if="showNotice" class="notice" style="margin-top: 20px">
      <div style="background: #2c3e50">
        <h5 style="padding: 5px;color: #fff"><b>Thông báo</b> </h5>
      </div >
      <h4 style="padding: 10px 5px 5px 5px">{{showNotice}}</h4>
    </div>
    <div class="col-11custom">
      <div class="row">
        <div class="d-flex flex-row-reverse">
          <div class="p-2">
            <button @click="showModal = true; groupJoin=null" class="btn btn-primary">
              <i class="fa fa-plus"></i> Tạo nhóm mới
            </button>
          </div>
          <div class="p-2">
            <input
              style="padding: .375rem .75rem; margin:0"
              type="text"
              v-model="groupCode"
              class
              placeholder="Nhập code nhóm"
            />
            <button @click="join()" class="btn btn-outline-success">
              <i class="fa fa-user"></i> Tham gia
            </button>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-around" style="flex-wrap:wrap">
        <div class="card" style="width: 18rem;" v-for="(group, index) in groups" :key="index">
          <div
            v-if="group.owner == username"
            @click="groupDel=group; delOption = 2; indexDel=index"
            style="position: absolute; right:0;"
          >
            <button class="btn btn-outline-danger">
              <i class="fa fa-trash"></i>
            </button>
          </div>
          <div> 
            <!-- :src="'http://thuypm.tk:3000/room/'+group._id+'/'+group._id+'.jpg'" -->
            <img
              class="card-img-top"
             :src="'http://thuypm.tk:3000/room/unknown.jpg'"
              alt="Card image cap"
            />
            <!-- <div class="upImg" @click="upImg(group, index)">
              <label >
                <i class="fa fa-camera"></i>
              </label>
              <h5>Thay ảnh</h5>
            </div>-->
            <span></span>
          </div>

          <div class="card-body">
            <h5 class="card-title">{{group.name}}</h5>
            <button @click="groupJoin = group; showModal = true" class="btn btn-outline-success">
              <i class="fa fa-plus"></i>
            </button>
            <a :href="'/meeting/'+group._id" class="btn btn-outline-dark">
              <b>Tham gia</b>
            </a>
            <button @click="groupDel=group; delOption = 1;indexDel=index" class="btn btn-outline-danger">
              <i class="fa fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import header from "./layout/header.vue";
import editGroup from "./groupModal/editGroup";
import axios from "axios";
import confirmModal from "./groupModal/confirmModal";
export default {
  components: {
    Header: header,
    editGroup: editGroup,
    confirm: confirmModal
  },
  data() {
    return {
      showNotice: "",
      axiosConfig: {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          token: localStorage.token
        }
      },
      username: localStorage.username,
      delOption: 1,
      groupDel: null,
      indexDel: -1,
      showModal: false,
      groupCode: "",
      groupJoin: Object,
      groups: []
    };
  },
  created() {
    //  console.log(localStorage.token);
    this.loadData();
  },
  methods: {
 confirmDel(){
   var upLen = {
     action:  this.delOption +1,
     roomId: this.groupDel._id,
     username: this.username,
     members: [this.username]
   }
  // upLen.action = this.delOption +1;
         axios
        .post("http://thuypm.tk:3000/room/editRoom", upLen, this.axiosConfig)
        .then(res => {
          if (!res.data) {
            this.Notice("Có lỗi xảy ra, vui lòng thử lại sau");
          } else {
            if(this.delOption == 1)
            this.Notice("Đã rời nhóm " + this.groupDel.name);
            else
            this.Notice("Đã xóa nhóm "+ this.groupDel.name);
            this.groupDel = null;
            this.groups.splice(this.indexDel, 1);
          }
        });
 },
    Notice(notice) {
      this.showNotice = notice;
      setTimeout(() => {
        this.showNotice = "";
      }, 2000);
    },
    join() {
      var upLen = {
        action: 1,
        roomId: this.groupCode,
        members: [this.username]
      };
      var indx = this.groups.findIndex(x => x._id == this.groupCode);
      if (indx != -1) {
        this.Notice("Bạn đã join nhóm này");
        return;
      }
      axios
        .post("http://thuypm.tk:3000/room/editRoom", upLen, this.axiosConfig)
        .then(res => {
          if (!res.data) {
            this.Notice("Không tìm thấy nhóm này");
          } else {
            this.Notice("Thành Công");
            this.groups.push(res.data);
          }
        });
    },
    editGroup: function(data) {
      var indx = this.groups.findIndex(x => x._id === data._id);
      if (indx != -1) this.groups[indx] = data;
      else this.groups.push(data);
      this.showModal = false;
      this.Notice("thành công");
    },
    loadData() {
      axios
        .post(
          "http://thuypm.tk:3000/user/getAllMeeting",
          { username: this.username },
          this.axiosConfig
        )
        .then(res => {
          this.groups = res.data.content;
        });
    }
  }
};
</script>
<style scoped>
.upImg:hover {
  cursor: pointer;
  opacity: 1;
}



.card {
  margin: 2%;
}

.d-flex {
  width: 100%;
}
.card:hover {
  border: 2px solid #d19b3d;
}

.modal-mask {
  -webkit-transition: display 1s; /* Safari */
  transition: display 1s;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
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
  margin: 20px 0;
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