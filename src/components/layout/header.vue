<template>
     <div class="nav-side-menu ">
    <div class="brand" >TEAMS</div>

        <div class="menu-list">
  
            <ul id="menu-content" class="menu-content collapse out">
                <li class="">
                  <a href="/chat">
                      <div >
                         <i class="fa fa-envelope fa-lg"></i>  
                      </div>
                 <span> Hộp thư  </span>
                  </a>
                </li>
                      <li class="active">
                  <a href="/allGroup">
                      <div>
                         <i class="fa fa-users fa-lg"></i>  
                      </div>
                 <span> Nhóm 
                   
                    </span>
                  </a>
                </li>
                  
                      <li class="">
                  <a href="/files">
                      <div>
                         <i class="fa fa-file fa-lg"></i>  
                      </div>
                 <span> File  </span>
                  </a>
                </li>
            </ul>
        
     </div>
 	<div class="menu-footer">
					<ul>
           
							<img :src="'http://localhost:3000/user/'+username+'.jpg'" class="rounded-circle user_img_msg">
            <li class="" @click="signout()">
                  <a href="#">
                      <div>
                         <i class="fa fa-sign-out-alt fa-lg"></i> 
                      </div>
                 <span> Đăng xuất  </span>
                  </a>
                </li>
          </ul>
						</div>
     </div>
</template>
<script>
export default {
  data()
  {
    return {
      username: localStorage.username,
    }
  },
  methods:{
    signout(){
      localStorage.clear();
     window.location.href = '/';
    }
  }
}
</script>
<style  scoped>
 .nav-side-menu {
  width: 5vw;
  overflow: auto;
  font-size: 12px;
  font-weight: 200;
  background-color: #2e353d;
  position: fixed;
  top: 0px;
  height: 100vh;
  color: #e1ffff;
}
.user_img_msg{
  max-width: 70px;
}
.nav-side-menu .brand {
  background-color: #23282e;
  line-height: 50px;
  display: block;
  /* text-align: center; */
  font-size: 14px;
}
.nav-side-menu .toggle-btn {
  display: none;
}
.nav-side-menu ul,
.nav-side-menu li {
  list-style: none;
  padding: 0px;
  margin: 0px;
  line-height: 35px;
  cursor: pointer;
  /*    
    .collapsed{
       .arrow:before{
                 font-family: FontAwesome;
                 content: "\f053";
                 display: inline-block;
                 padding-left:10px;
                 padding-right: 10px;
                 vertical-align: middle;
                 float:right;
            }
     }
*/
}
.nav-side-menu ul :not(collapsed) .arrow:before,
.nav-side-menu li :not(collapsed) .arrow:before {
  font-family: FontAwesome;
  content: "\f078";
  display: inline-block;
  padding-left: 10px;
  padding-right: 10px;
  vertical-align: middle;
  /* float: right; */
}
.nav-side-menu ul .active,
.nav-side-menu li .active {
  border-left: 3px solid #d19b3d;
  background-color: #4f5b69;
}
.nav-side-menu ul .sub-menu li.active,
.nav-side-menu li .sub-menu li.active {
  color: #d19b3d;
}
.nav-side-menu ul .sub-menu li.active a,
.nav-side-menu li .sub-menu li.active a {
  color: #d19b3d;
}
.nav-side-menu ul .sub-menu li,
.nav-side-menu li .sub-menu li {
  background-color: #181c20;
  border: none;
  line-height: 28px;
  border-bottom: 1px solid #23282e;
  margin-left: 0px;
}
.nav-side-menu ul .sub-menu li:hover,
.nav-side-menu li .sub-menu li:hover {
  background-color: #020203;
}
.nav-side-menu ul .sub-menu li:before,
.nav-side-menu li .sub-menu li:before {
  font-family: FontAwesome;
  content: "\f105";
  display: inline-block;
  padding-left: 10px;
  padding-right: 10px;
  vertical-align: middle;
}
.nav-side-menu li {
  padding-left: 0px;
  border-left: 3px solid #2e353d;
  border-bottom: 1px solid #23282e;
}
.nav-side-menu li a {
  text-decoration: none;
  color: #e1ffff;
}
.nav-side-menu li a i {
 
}
.nav-side-menu li:hover {
  border-left: 3px solid #d19b3d;
  background-color: #4f5b69;
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  -ms-transition: all 1s ease;
  transition: all 1s ease;
}
@media (max-width: 767px) {
  .nav-side-menu {
    position: relative;
    width: 100%;
    margin-bottom: 10px;
  }

  .brand {
    text-align: left !important;
    font-size: 22px;
    padding-left: 20px;
    line-height: 50px !important;
  }
}
.menu-list{
  /* height:79vh; */
}
.menu-footer{
  /* height:12vh */
  /* top:700px !important; */
}
@media (min-width: 767px) {
  .nav-side-menu .menu-list .menu-content {
    display: block;
  }
}

</style>