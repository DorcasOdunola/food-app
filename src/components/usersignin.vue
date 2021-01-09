<template>
    <div>
       <div class="container p-2 mt-5">
           <div class="row mt-3">
               <div class="col-12 shadow bg-light col-md-6 mx-auto p-0">
                   <div class="w-100" style="background-color: #2F4F4F;">
                       <p class="h3 text-center text-white p-2">Create Account</p>
                   </div>
                    <div class="form-group p-0 pr-3">
                        <div class="m-3 mt-4">
                            <input type="text" name="Name" id="Name" class="form-control m-2 mb-3" placeholder="Name" v-model="nameuser" required>

                            <input type="text" name="username" id="username" class="form-control m-2 mb-3" placeholder="Username" v-model="uusername" required>

                            <input type="email" name="email" id="email" class="form-control m-2 mb-3" placeholder="cresteatery@gmail.com" v-model="useremail">
                            <input type="number" name="number" id="number" class="form-control m-2 mb-3" placeholder="07037752076" v-model="userno" required>
                                
                            <input type="password" name="password" id="password" class="form-control m-2 mb-3" placeholder="password" v-model="userpass" required>

                            <input type="password" name="conpassword" id="conpassword" class="form-control m-2" placeholder="Confirm Password" v-model="userconpass" required>

                        </div>
                    
                        <p id="displayincorrect" class="text-danger"></p>
                        <p id="displaycorrect" class="text-success"></p>
                        <button class="btn mt-2 ml-4 btn-sm" @click="addUser" style="border:1px solid #2F4F4F;color:#2F4F4F;">Create Account</button>
                        <router-link to="/userlogin">
                            <input type="button" value="Login"  class="btn text-white mt-2 ml-3 btn-sm" style="background-color: #2F4F4F;">
                            <!-- <button class="btn text-white mt-2 ml-3 btn-sm" style="background-color: #2F4F4F;">Login</button> -->
                        </router-link>
                        <div class="mx-auto text-center mt-3">
                            <img src="../assets/checked.png" alt="">
                            <span>Do you have an account already?</span>
                            <router-link to="/userlogin" class="pl-2">Sign In</router-link>
                        </div>
                   </div>
               </div>
           </div>
       </div>

    </div>
</template>

<script>
export default {
    name: "UserSignin",
    data() {
        return {
            nameuser: "",
            uusername: "",
            useremail: "",
            userno: "",
            userpass: "",
            userconpass: "",
            userArray: [],
            userId: 0,
            itemArray: [],
            cartitem: 0,
        }
    },
    methods: {
        addUser() {
            if (localStorage.getItem("UserDetails") != null) {
                this.userArray = JSON.parse(localStorage.getItem("UserDetails"));              
            } else {
                this.userArray = [];     
            }

            if (localStorage.getItem("CartItem") != null) {
                this.itemArray = JSON.parse(localStorage.getItem("CartItem"));                
            } else {
                this.itemArray = [];
            }

            if ((this.nameuser != "") && (this.uusername != "") && (this.useremail != "") && (this.userno != "") && (this.userpass != "") && (this.userconpass != "")) {
                if ((this.userpass == this.userconpass)) {
                    let findusername = this.userArray.find(user => (user.acctname == this.uusername) )
                    if (findusername) {
                        document.getElementById("displaycorrect").innerHTML = "";
                        document.getElementById("displayincorrect").innerHTML = "Username already exist. Kindly use another username";
                    } else {
                        document.getElementById("displaycorrect").innerHTML = "Account created successfully";
                        document.getElementById("displayincorrect").innerHTML = "";
                        let userObj = {name: this.nameuser, acctname: this.uusername, acctemail: this.useremail, phoneno: this.userno, pass: this.userpass, conpass: this.userconpass};
                        let {userArray} = this;
                        this.userArray = [...userArray, userObj];
                        localStorage.setItem("UserDetails", JSON.stringify(this.userArray));
                        let itemObj = {customer: this.uusername, cartitem: this.cartitem};
                        let {itemArray} = this;
                        this.itemArray = [...itemArray, itemObj];
                        localStorage.setItem("CartItem", JSON.stringify(this.itemArray));
                        sessionStorage.setItem("UserOnline", JSON.stringify(this.uusername));
                        window.location = "/FoodMenu"
                        this.nameuser = "";
                        this.uusername = "";
                        this.useremail = "";
                        this.userno = "";
                        this.namepass = "";
                        this.userpass = "";
                        this.userconpass = "";
                        
                    }
                } else if((this.userpass != this.userconpass)){
                    document.getElementById("displayincorrect").innerHTML = "Password must be the same";
                    document.getElementById("displaycorrect").innerHTML = "";
                }
            } else if((this.nameuser == "") && (this.uusername == "") && (this.useremail == "") && (this.userno == "") && (this.userpass == "") && (this.userconpass == "")) {
                document.getElementById("displayincorrect").innerHTML = "Please, input your details to create an account";
                document.getElementById("displaycorrect").innerHTML = "";
            }
        }
    }
    
}
                        
</script>

<style scoped>

</style>