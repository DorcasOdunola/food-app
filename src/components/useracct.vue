<template>
    <div>
        <div class="container p-md-5 p-1 mt-5">
            <div class="p-2 p-md-4 all mt-3 d-md-flex">
                <div class="d-flex d-md-none d-block text-dark mt-3 phone text-center p-1">   
                    <router-link to="/cart">
                        <span class="showhite ml-4 mt-2">Cart</span>
                    </router-link>
                    
                    <span class="toggler showhite ml-3" data-toggle="collapse" data-target="#transtable" @click="getTrans">Transaction</span>
                                    
                    <router-link to="/foodmenu">
                        <span class="showhite ml-3">Menu</span>
                    </router-link>
                    
                    <router-link to="/userlogin">
                        <p class="ml-3">
                            <span><img src="../assets/logout.png" alt="logout logo"></span>
                        </p>
                    </router-link>
                </div>  
                <div class="col-12 col-md-2 d-none d-md-block">
                    <div class="p-1" style="height: 60vh ; background-color: #2F4F4F;">
                        <router-link to="/cart">
                            <p class="mt-5">View Cart</p>
                        </router-link>
                        <p id="trans" class="mt-5 toggler" data-toggle="collapse" data-target="#transtable" @click="getTrans">Check Transaction</p>

                        <router-link to="/foodmenu">
                                    <p class="mt-5">Menu</p>
                        </router-link>

                        
                        <p class="mt-5 pt-5 hover" @click="logout">
                            <span><img src="../assets/logout.png" alt="logout logo"></span>
                            <span class="span">Log Out</span>
                        </p>
                        
                    </div>
                </div>
                <div class="bg-light d-block d-md-flex w-100">
                    <div class="bg-light mt-2 alltwo w-100 mx-auto">
                        <div class="row">  
                            <div class="col-12 col-md-6 mx-auto">
                                <div class="mt-5">
                                    <img src="../assets/user.png" alt="usericon">
                                    <div>
                                        <span class="h5">{{$route.params.name}}</span><br>
                                        <span id="showname" class="h6"></span><br>
                                        <span id="showemail" class="h6"></span><br>
                                        <span id="shownumber" class="h6"></span> <br>                        
                                    </div>
                                </div>  
                            </div> 
                        </div>
                    </div>

                    <div class="col-12 col-md-7 collapse" id="transtable">
                        <div class="w-100 bg-light p-md-2 mt-3">
                            <table class="table table-striped w-100 p-md-3 mx-auto table-inverse table-responsive-md">
                                <thead class="thead-inverse w-100">
                                    <tr>
                                        <th>S/N</th>
                                            <th>Food Name</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                </thead>
                                <tbody>
                                    <tr v-bind:key="i" v-for="(trans, i) in displaytrans">
                                        <td>{{i+1}}</td>
                                        <td scope="row">{{trans.foodname}}</td>
                                        <td>{{trans.price}}</td>
                                        <td>{{trans.quantity}}</td>
                                        <td>{{trans.total}}</td>
                                    </tr>
                                </tbody>
                            </table>   
                        </div>
                    </div> 
                    <p id="showempty" class="text-danger h6 mr-auto"></p>
                </div>    
            </div>
        </div> 
    </div>    
</template>

<script>
export default {
    name: "UserAccount",
    data(){
        return {
            getUser: "",
            onlineuser: "",
            transactions: "",
            displaytrans: "",
        }
    },
    methods: {
        getCustomer() {
            this.getUser = JSON.parse(localStorage.getItem("UserDetails"));
            this.onlineuser = JSON.parse(sessionStorage.getItem("UserOnline"));
            if (this.onlineuser == null || this.onlineuser == undefined) {
                alert("User must login to view their profile!!!")
            } else {
                let index = this.getUser.findIndex(user => user.acctname == this.onlineuser)
                document.getElementById("showname").innerHTML = this.getUser[index].name;
                document.getElementById("showemail").innerHTML = this.getUser[index].acctemail;
                document.getElementById("shownumber").innerHTML = this.getUser[index].phoneno;
            } 
        },
        getTrans() {
            this.onlineuser = JSON.parse(sessionStorage.getItem("UserOnline"));
            this.transactions = JSON.parse(localStorage.getItem("Transactions"));
            if (this.transactions == null) {
                document.getElementById("transtable").style.display = "none";
                document.getElementById("showempty").style.display = "block";
                document.getElementById("showempty").innerHTML = "Your transaction detail is empty";
            } else {
                this.displaytrans = this.transactions.filter(trans => trans.customer == this.onlineuser);
                if (this.displaytrans.length == 0) {
                    document.getElementById("transtable").style.display = "none";
                    document.getElementById("showempty").style.display = "block"
                    document.getElementById("showempty").innerHTML = "Your transaction detail is empty"
                } else {
                    document.getElementById("transtable").style.display = "block";
                    document.getElementById("showempty").style.display = "none"
                }
            }
            
        },
        logout(){
            window.location = "/userlogin";
            sessionStorage.removeItem("UserOnline");
            this.loginOut = "LOGIN";
        }
    },

     mounted() {
        this.getCustomer();
    },
    
}
</script>

<style scoped>
    span {
       color: #2F4F4F; 
    }

    .all {
        background-color: #2F4F4F;
        height: 70vh;
        overflow-y: auto;
    }
    
    .alltwo {
        height: 95%;
    }
    ::-webkit-scrollbar {
        width: 0px;
    }

    #transtable {
        height: 100%;
    }

    #trans {
        cursor: pointer;
    }

    button {
        outline: none !important;
    }

    p {
        color: white;
        font-size: 12pt;
        text-decoration: none !important;
    }

    p:hover {
        color: white;
        text-decoration: underline !important;
    }

    .span {
        color: white;
        font-size: 12pt;
        text-decoration: none !important;
    }

    .span:hover {
        color: white;
        text-decoration: underline !important;
    }

    .showhite {
        color: white !important;
    }

    .position {
        position: fixed;
    }

    .hover {
        cursor: pointer;
    }

</style>