<template>
   <div>
       <nav class="navbar navbar-light navbar-expand-sm bg-light p-0 fixed-top">
				<p class="navbar-brand">
					<router-link to="/" class="nav-brand pl-2 pb-0">
                        <img src="../assets/crest2.png" alt="Crest Eatery Logo">
                    </router-link>
				</p>

				<button class="navbar-toggler bg-light" data-toggle="collapse" data-target="#navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
						
					
				<div  class="collapse navbar-collapse justify-content-end p-0" id="navigation">
					<ul class="navbar-nav p-0">
						<li class="nav-item">
							<router-link to="/foodmenu" class="nav-link h4 initialism">
                                <p>Menu</p>
                            </router-link>
						</li>

						<li class="nav-item">
							<router-link to="/usersignin" class="nav-link h4 initialism">
                                <p>SignUp</p>
                            </router-link>
						</li>

						<li class="nav-item" @click="changeLoginDetails">
							<router-link to="/userlogin" class="nav-link h4 initialism">
                                <p>{{loginOut}}</p>
                            </router-link>
						</li>

						<li class="nav-item">
							<router-link to="/cart" class="nav-link h4 initialism">
                               <p>Cart</p>
                            </router-link>
						</li>

						<li class="nav-item" @click="getProfile">
							<router-link to="/useracct" class="nav-link h4 initialism">
                                <p>Profile</p>
                            </router-link>
						</li>

						<li class="nav-item">
							<router-link to="/adminside/addfood" class="nav-link h4 initialism">
                                <p>Admin</p>
                            </router-link>
						</li>
					</ul>
				</div>
			</nav>
   </div>
</template>

<script>
export default {
    name: "Navbar",
    data(){
        return {
            onlineuser: "",
            getUserArray: "",
            loginOut: "LOGIN",
        }
    },

    mounted() {
        this.checkLogin();
    },

    methods: {
        getProfile() {
            if (sessionStorage.getItem("UserOnline") == null) {
                alert("User should please login to view profile");
                window.location = "/UserLogin"
            } else {
                this.getUserArray = JSON.parse(localStorage.getItem("UserDetails"))
                this.onlineuser = JSON.parse(sessionStorage.getItem("UserOnline"));
                let index = this.getUserArray.findIndex(user => user.acctname == this.onlineuser)
                window.location = `useracct/${this.getUserArray[index].acctname}`
            }
        },

        checkLogin() {
            if (sessionStorage.getItem("UserOnline") == null) {
                this.loginOut = "LOGIN";
            } else {
                this.loginOut = "LOGOUT";
            }
        },
        changeLoginDetails() {
            if (this.loginOut == "Login") {
                window.location = "/UserLogin";
            } else if(this.loginOut == "LOGOUT") {
                window.location = "/userlogin";
                sessionStorage.removeItem("UserOnline");
                this.loginOut = "LOGIN";
            }
        }
        
    }
    
}
</script>

<style scoped>
    p {
        color: #2F4F4F !important;
    }

</style>