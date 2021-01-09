<template>
    <div id="usernameform" class="container p-2 p-3 mt-2 rounded">
        <div class="row mt-2">
            <div class="col-12 col-md-6 mx-auto">
                <div class="bg-light shadow mt-5">
                    <div class="w-100" style="background-color: #2F4F4F">
                       <p class="h3 text-center text-white p-2">ADMIN LOGIN</p>
                   </div>
                    <div class="form-group p-3">
                        <label for="username">Username:</label>
                        <input type="text" name="" id="username" class="form-control" placeholder="Username" v-model="username">
                    
                        <label for="password">Password:</label>
                        <input type="password" name="Password" id="password" class="form-control" placeholder="Password" v-model="password">
                        <p id="showresult" class="text-danger"></p>
                        <button class="btn border border-secondary mt-3 w-25" v-on:click="adminLogin">Login</button>
                    </div>
                </div>
            </div>
        </div>        
    </div>
    
</template>

<script>
export default {
    name: "Adminlogin",

    data(){
        return {
            username: "",
            password: "",
            admin: "online"
        }

    },
    methods: {
        adminLogin() {
            if ((this.username == "tabitha") && (this.password== "1234")) {
                window.location = '/adminside/addfood'   
                localStorage.setItem("AdminOnline", JSON.stringify(this.admin))
            } else if ((this.username == "") && (this.password == "")){
                document.getElementById("showresult").innerHTML = "Admin must input the necessary information to login";
            } else {
                document.getElementById("showresult").innerHTML = "Incorrect Password";
            }
        }
    }
    
}
</script>

<style scoped>
.wineimg {
    height: 350px;
}

#usernameform {
    background-image: url("../assets/bg4.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 400px;
} 

</style>