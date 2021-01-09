<template>
    <div>
       <div class="container-fluid p-1 wrapper">
           <div class="row w-100">
               <div class="col-12 col-md-3 p-2">
                    <div class="inside shadow mt-4 mx-auto"></div>
                    <div class="inside2 shadow mt-4 mx-auto"></div>                    
               </div>
               <div class="col-12 shadow bg-light col-md-6 mx-auto p-0 mt-5" style="z-index: 1000">
                   <div class="w-100 p-3" style="background-color: #2F4F4F">
                       <p class="h3 text-center text-white">Transaction</p>
                   </div>
                   <div class="p-3">
                        <div class="form-group">
                            <label for="bankacctname" class="pt-3">Account Name:</label>
                            <input type="text" name="bankacctname" id="bankacctname" class="form-control" placeholder="Account Name" v-model="bankacctname">
                            <div class="form-group form-inline mt-3">
                                <label for="bankacctno">Account Number:</label>
                                <input type="text" name="bankacctno" id="bankacctno" class="form-control ml-md-3" v-model="bankacctno">
                                <label for="acctpin" class="ml-md-3">Pin:</label>
                                <input type="password" name="bankacctpin" id="bankacctpin" class="form-control ml-md-3" v-model="bankacctpin">
                            </div>
                            <label for="phonenumber" class="">Phone Number</label>
                            <input type="text" name="phonenumber" id="phonenumber" class="form-control"  v-model="phonenumber">
                            <label for="address" class="">Shipping Address</label>
                            <input type="text" name="address" id="address" class="form-control"  v-model="address">
                            <p id="showresult"></p>
                            <div class="mx-auto text-center">
                                <button class="btn text-white w-25 mt-3" style="background-color: #2F4F4F" @click="
                                buyCart">Buy</button>
                            </div>
                         </div>
                   </div>
               </div>
               <div class="col-12 col-md-3 p-1">
                   <div class="inside3 shadow mt-4 mx-auto"></div>
                    <div class="inside4 shadow mt-4 mx-auto"></div>
               </div>
           </div>
        </div>         
    </div>
</template>

<script>
export default {
    name: "ConfirmUser",
    data() {
        return {
            getUserArray: [],
            onlineuser: "",
            bankacctname: "",
            bankacctno: "",
            bankacctpin: "",
            address: "",
            getCart: "",
            phonenumber: "",
            transactionsArray: [],
            getCartItem: "",
        }
      
    },
    methods: {
        buyCart() {
            if (localStorage.getItem("Transactions") != null) {    
                this.transactionsArray = JSON.parse(localStorage.getItem("Transactions"));                
            } else {
                this.transactionsArray = [];
            }
            if ((this.bankacctname == "") && (this.bankacctno == "") && (this.bankacctpin == "") && (this.address == "") && (this.phonenumber == "")) {
                document.getElementById("showresult").innerHTML = "Please input your details";                
            } else {
                this.getUserArray = JSON.parse(localStorage.getItem("UserDetails"));
                this.onlineuser = JSON.parse(sessionStorage.getItem("UserOnline"));
                this.getCart = JSON.parse(localStorage.getItem("Cart"));
                this.getCartItem = JSON.parse(localStorage.getItem("CartItem"));
                let index = this.getUserArray.findIndex(user => user.acctname == this.onlineuser )
                window.location = `useracct/${this.getUserArray[index].acctname}`;
                let getuser = this.getCart.filter(trans => trans.customer == this.onlineuser && trans.status == "Available");
                for (let i = 0; i < getuser.length; i++) {
                    console.log(getuser.length[i]);
                    let transObj = {customer: getuser[i].customer, foodname: getuser[i].foodname, price: getuser[i].price, quantity: getuser[i].quantity, total: getuser[i].total, bankacctname: this.bankacctname, bankacctno: this.bankacctno, bankacctpin: this.bankacctpin, phonenumber: this.phonenumber, address: this.address};  
                    let {transactionsArray} = this;
                    this.transactionsArray = [...transactionsArray, transObj];         
                }  
                localStorage.setItem("Transactions", JSON.stringify(this.transactionsArray));
                let showme = this.getCart.findIndex(show => show.customer == this.onlineuser);
                this.getCart.splice(showme);
                localStorage.setItem("Cart", JSON.stringify(this.getCart));
                let indexTwo =  this.getCartItem.findIndex(item => item.customer == this.onlineuser);
                this.getCartItem[indexTwo].cartitem = 0;
                localStorage.setItem("CartItem", JSON.stringify(this.getCartItem));                
            }      
        }
    }
}
</script>

<style scoped>
input {
    background-color: transparent;
    border-right: 0px solid black;
    border-left: 0px solid black;
    border-bottom: 1px solid silver;
    border-top: 1px solid silver;
}

.wrapper {
    height: 90vh;
}

.up {
    height: 200px;
    width: 200px;
    border-radius: 100%;
    margin-top: 90%;
   
}
.inside {
    height: 100px;
    width: 100px;
    border-radius: 100%;
    margin-top: 20%;
    background-color: #2F4F4F;
     position: relative;
    animation-name: example !important;
    animation-duration: 4s;
    animation-iteration-count: infinite;
}

.inside2 {
    height: 100px;
    width: 100px;
    border-radius: 100%;
    margin-top: 20%;
    background-color: #2F4F4F;
    position: relative;
    animation-name: example2 !important;
    animation-duration: 3s;
    animation-iteration-count: infinite;
}
.inside3 {
    height: 100px;
    width: 100px;
    border-radius: 100%;
    margin-top: 20%;
    background-color: #2F4F4F;
    position: relative;
    animation-name: example3 !important;
    animation-duration: 3s;
    animation-iteration-count: infinite;
}
.inside4 {
    height: 100px;
    width: 100px;
    border-radius: 100%;
    margin-top: 20%;
    background-color: #2F4F4F;
    position: relative;
    animation-name: example4 !important;
    animation-duration: 3s;
    animation-iteration-count: infinite;
}
.up:hover {
    background-color:darkslategray !important;
    cursor: pointer;
}


    @keyframes example {
        0%   {background-color:black; left:0px; top:0px;}
        25%  {background-color:darkslategray; left:200px; top:0px;}
        50%  {background-color:rgb(44, 44, 228); left:200px; top:200px;}
        75%  {background-color:green; left:0px; top:200px;}
        100% {background-color:gray; left:0px; top:0px;}
    }

    @keyframes example2 {
        0%   {background-color:black; left:0px; top:10px;}
        25%  {background-color:darkslategray; left:0px; top:200px;}
        50%  {background-color:blue; left:100px; top:100px;}
        75%  {background-color:green; left:200px; top:100px;}
        100% {background-color:red; left:300px; top:300px;}
    }

    @keyframes example3 {
        0%   {background-color:black; right:0px; top:0px;}
        25%  {background-color:darkslategray; right:200px; top:0px;}
        50%  {background-color:rgb(44, 44, 228); right:200px; top:200px;}
        75%  {background-color:green; right:0px; top:200px;}
        100% {background-color:gray; right:0px; top:0px;}
    }

    @keyframes example4 {
        0%   {background-color:black; right:0px; top:10px;}
        25%  {background-color:darkslategray; right:0px; top:200px;}
        50%  {background-color:blue; right:100px; top:100px;}
        75%  {background-color:green; right:200px; top:100px;}
        100% {background-color:red; right:300px; top:300px;}
    }

</style>