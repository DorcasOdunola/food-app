<template>
    <div>
        <div class="container p-2 mt-3">
           <div class="row mt-5">
               <div class="col-12 shadow bg-light col-md-6 mx-auto p-0 mt-5">
                   <div class="w-100 p-3" style="background-color: #2F4F4F;">
                       <p class="h3 text-center text-white">User Login</p>
                   </div>
                   <div class="p-3">
                        <div class="form-group">
                            <label for="username" class="pt-3">Username</label>
                            <input type="text" name="username" id="username" class="form-control" placeholder="Username" v-model="logusername">
                            
                            <label for="password" class="pt-3">Password</label>
                            <input type="password" name="password" id="password" class="form-control" placeholder="password" v-model="logpassword">
                            <p id="displayIncorrect" class="text-danger p-1"></p>
                            <button class="btn btn-light mt-2 ml-3 text-white" style="background-color: #2F4F4F;" @click="getUserDetails">Login</button>
                            <div class="mx-auto text-center">
                                <img src="../assets/checked.png" alt="">
                                <span>You don't have an account yet?</span>
                                <router-link to="/usersignin" class="pl-2">Sign Up</router-link>
                            </div>
                        </div>
                    </div>
               </div>
           </div>
        </div>
    </div>
    
</template>

<script>
export default {
    name: "UserLogin",
    data() {
        return {
            collectUser: "",
            logusername: "",
            logpassword: "",
            useronline: "",
            itemArray: [],
            cartitem: 0,

        }
    },
    methods: {
        getUserDetails() {
            if (localStorage.getItem("CartItem") != null) {
                this.itemArray = JSON.parse(localStorage.getItem("CartItem"));                
            } else {
                this.itemArray = [];
            }
            console.log(this.loginout);
            this.collectUser = JSON.parse(localStorage.getItem("UserDetails"));
            console.log(this.collectUser);
            let index = this.collectUser.findIndex(a => a.acctname==this.logusername && a.pass==this.logpassword);
           if (index != -1) {
               this.useronline = this.logusername;
               let findItem = this.itemArray.find(item => item.customer == this.useronline);
               window.location = "/FoodMenu";
                if (findItem) {
                    sessionStorage.setItem("UserOnline", JSON.stringify(this.useronline));
                    return                    
                } else {
                    let itemObj = {customer: this.useronline, cartitem: this.cartitem};
                    let {itemArray} = this;
                    this.itemArray = [...itemArray, itemObj];
                    localStorage.setItem("CartItem", JSON.stringify(this.itemArray));
                    sessionStorage.setItem("UserOnline", JSON.stringify(this.useronline));
                  
                }
           } else {
               document.getElementById("displayIncorrect").innerHTML = "Incorrect username and Password";
           }
        }
    }
    
}
</script>

<style scoped>

</style>