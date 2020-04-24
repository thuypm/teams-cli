<template>
            		<ul class="contacts">
						 <li v-for="(usr, index) in users" :key="index" v-bind:id="usr.username">
							<div class="d-flex bd-highlight">
								<div class="img_cont">
									<img v-bind:src="'../../assets/' + friend.friendUsername+'.jpg'" class="rounded-circle user_img">
									<span class="online_icon"></span>
								</div>
								<div class="user_info">
									<span>{{usr.username}}</span>
									<!-- <p>sửa sau</p> -->
								</div>
							</div>
						</li>
                           		</ul>
</template>
<script>
export default {
    data()
    {
        return{
                users: [{
                    username: 'img1',

                },
                {
                    username: 'img2',

                }
                ]
        }
    }
}
</script>