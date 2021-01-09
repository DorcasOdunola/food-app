<template>
    <div class="all mt-5">
        <div id="background" class="container-fluid text-center p-2 mt-5">
             <div class="row mt-5 w-100">
                <div class="col-12 text-center pt-5">
                    <p class="text-center h1 crest pt-5">Crest Eatery</p>
                    <h4 class="text-light serve"><i>...We serve you with maximum satisfaction</i></h4>
                </div>
            </div>
        </div>
        <p id="showempty" class="text-muted text-center h3 pt-3 pb-3"></p>
        <div class="container mt-5 p-0" id="showallcart" v-show="verify">
            <div class="container w-100 mt-5">
                <h4 class="text-center pt-3 pb-3">{{this.user}} Shopping Cart</h4>
                <p class="text-right text-warning">Dear {{this.user}}, kindly delete foods that you don't intend buying from your carts and you won't be able to buy foods that are not available.</p>
                <div>
                    <button class="btn btn-success float-right mb-3" @click="checkOut">Checkout</button><br>
                    <p class="fixed">
                        <span>Total:</span>
                        <span id="showtotal"></span>
                    </p>
                </div>
                <div class="row p-0 w-100 mx-auto text-muted d-none d-md-flex">
                    <div class="col-12 col-md-5"><h3>Food Items</h3></div>
                    <div class="col-12 col-md-2 text-center"><h3>Price</h3></div>
                     <div class="col-12 col-md-3 text-center"><h3>Quantity</h3></div>
                      <div class="col-12 col-md-1 text-center"><h3>Total</h3></div>
                </div>
                <div class="row w-100 mx-auto p-md-3 bg-white mb-3 mt-md-0 cartrow d-none d-md-flex" v-bind:key="i" v-for="(allcart, i) in getall">
                    <div class="col-12 col-md-5 p-md-1 d-md-flex border-right text-center">
                        <img :src="require(`../foodimages/${allcart.picture}`)" class="col-12 col-md-5 p-1">
                        <div class="ml-5 ml-md-3 mt-md-4">
                            <span class="h5 text-center">{{allcart.foodname}}</span> <br>
                            <span class="text-muted text-center">{{allcart.status}}</span> <br>
                            <button class="btn">
                                <img src="../assets/remove.png">
                                <span class="text-warning" @click="deleteCart(allcart.foodname, allcart.customer)">Remove</span>
                            </button>
                        </div>
                        <div class="mx-auto mt-4 pl-5 d-none d-md-block">
                            <img src="../assets/cart.png" alt="">
                        </div>
                    </div>
                    <div class="col-12 col-md-2 pt-md-4 border-right text-center">₦{{allcart.price}} (per plate)</div>
                    <div class="col-12 col-md-3 text-center border-right mx-auto">
                        <div class="d-flex ml-4 ml-md-0 mt-md-3 text-center">
                            <h3 class="text-white ml-5 mt-4 reduceme" @click="addQuantity(allcart.foodname, allcart.customer, allcart.price, allcart.quantity)">+</h3>
                            <p class="p-1 mt-4">{{allcart.quantity}}</p>
                            <h3 class="text-white p-0 mt-4 reduceme" @click="reduceQuantity(allcart.foodname, allcart.customer, allcart.price, allcart.quantity)">-</h3>
                        </div>                          
                    </div>
                    <div class="col-12 col-md-1 pt-md-4 text-center mx-auto">
                        <p id="showtotal text-center">
                        <span class="d-block d-md-none">Total:</span>₦{{allcart.total}}</p>
                    </div>
                </div>
            </div>          
        </div>
        <div class="container p-3">
            <div class="row w-100 mx-auto bg-white m-5 cartrow d-flex d-md-none" v-bind:key="i" v-for="(allcart, i) in getall">
                    <div class="col-6 border-bottom">
                        <img :src="require(`../foodimages/${allcart.picture}`)" class="col-12 col-md-5 p-1">
                    </div>
                    <div class="col-6 border-bottom">
                        <span class="h5 text-center">{{allcart.foodname}}</span> <br>
                        <span class="text-muted text-center">{{allcart.status}}</span> <br>
                        <span>₦{{allcart.price}} (per plate)</span><br>
                        <span class="d-block d-md-none">Total:₦{{allcart.total}}</span>
                    </div>
                    <hr>
                    <div class="row w-100 p-0">
                        <div class="col-2 p-3 border-right">
                            <img src="../assets/cart.png" alt="">
                        </div>
                        <div class="col-5">
                            <button class="btn p-0 mt-4">
                                <img src="../assets/remove.png">
                                <span class="text-warning" @click="deleteCart(allcart.foodname, allcart.customer)">Remove</span>
                            </button>
                        </div>
                        <div class="col-5">
                            <div class="d-flex ml-md-0 mt-md-3 text-center">
                                <h3 class="text-white mt-4 reduceme" @click="addQuantity(allcart.foodname, allcart.customer, allcart.price, allcart.quantity)">+</h3>
                                <p class="p-1 mt-4">{{allcart.quantity}}</p>
                                <h3 class="text-white p-0 mt-4 reduceme" @click="reduceQuantity(allcart.foodname, allcart.customer, allcart.price, allcart.quantity)">-</h3>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
       
    </div>
</template>

<script>
export default {
    name: "Cart",
    data() {
        return{
            getCart: "",
            onlineuser: "",
            getall: "",
            verify: false,
            verify2: false,
            getQuantity: 1,
            showtotal: 0,
            username: "",
            password: "",
            total: 0,
            user: '',
        }
    },
     mounted() {
        this.getMyCart();
    },

    methods: {
        getMyCart(){
            this.getCart = JSON.parse(localStorage.getItem("Cart"));
            this.onlineuser = JSON.parse(sessionStorage.getItem("UserOnline"));
            if (this.onlineuser == null) {
                window.location = "/UserLogin";
                alert("User should please log in before you view your cart.") ; 
                document.getElementById("emptycart").style.display = "none";                
            }
            let getuser = JSON.parse(localStorage.getItem("UserDetails"))
            if (this.getCart == null || this.getCart.length == 0) {
                document.getElementById("showempty").innerHTML = "Cart is empty";
            } else {
                this.getall = this.getCart.filter(c => c.customer == this.onlineuser);
                let findIndex = getuser.findIndex(find => find.acctname == this.onlineuser);
                this.user = getuser[findIndex].name
                if (this.getall.length == 0) {
                    document.getElementById("showempty").innerHTML = "Your Cart is empty";
                } else {
                    this.verify = true; 
                    document.getElementById("showempty").innerHTML = "";  
                }          
            }
            this.calTotal();
        },
        calTotal(){
            this.total = 0;
            let getCartT = JSON.parse(localStorage.getItem("Cart"));
            let getallT = getCartT.filter(total => total.customer == this.onlineuser);
            getallT.map(t => {
                this.total += Number(t.price)*t.quantity;
            });
            document.getElementById("showtotal").innerHTML = Number(this.total);
        },
        deleteCart(fdname, cust) {
            let collectItem = JSON.parse(localStorage.getItem("CartItem"));
            let allCartItems = JSON.parse(localStorage.getItem("Cart"));
            this.onlineuser = JSON.parse(sessionStorage.getItem("UserOnline"));
            let index = allCartItems.findIndex(carts => (carts.foodname == fdname) && (carts.customer == cust));
            allCartItems.splice(index, 1);
            console.log(collectItem);
            let ind = collectItem.findIndex(item => item.customer == this.onlineuser);
            console.log(ind);
            collectItem[ind].cartitem-=1;
            localStorage.setItem("CartItem", JSON.stringify(collectItem));
            localStorage.setItem("Cart", JSON.stringify(allCartItems));
            this.updateCart(); 
        }, 
        addQuantity(fdname, cust, price, quantity) {
            let cartItems = JSON.parse(localStorage.getItem("Cart"));
            let index = cartItems.findIndex(carts => (carts.foodname == fdname) && (carts.customer == cust));
            cartItems[index].quantity += 1;
            cartItems[index].total = (price*(quantity+1));
            localStorage.setItem("Cart", JSON.stringify(cartItems));
            this.updateCart();
            
        },
        reduceQuantity(fdname, cust, price, quantity) {
            if (quantity == 1) {
                return;
            } else if(quantity >=1) {
                let cartItems = JSON.parse(localStorage.getItem("Cart"));
                let index = cartItems.findIndex(carts => (carts.foodname == fdname) && (carts.customer == cust));
                cartItems[index].quantity -= 1;
                cartItems[index].total = (price*(quantity-1))
                localStorage.setItem("Cart", JSON.stringify(cartItems));
                this.updateCart();
            }
        },
        updateCart(){
            this.getCart = JSON.parse(localStorage.getItem("Cart"));
            this.getall = this.getCart.filter(c => c.customer == this.onlineuser);
            this.calTotal();
        },
       
        checkOut() {
            window.location = '/ConfirmUser';             
        }

    }
}
</script>

<style scoped>

    .all {
        background-color: rgba(168,168,168, 0.1);

    }
     #background {
        background-image: url("../assets/bg3.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        height: 70vh
    }

    .crest {
        font-size: 50pt;
        color: #2F4F4F;
    }

    .serve {
        color: #2F4F4F !important;
    }

    #showme {
        background-color: white;
    }

    .reduceme {
        width: 40px;
        height: 30px;
        background-color: #2F4F4F;
        cursor: pointer;
    }

    h3 {
        font-size: 15pt;
    }
    button {
        outline: none;
    }

    .cartrow {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

        transition: all 0.5s ease-in-out 0s;
    }

    .cartrow:hover {
        border-top-left-radius: 30px;
        border-bottom-right-radius: 30px;
        margin-left: 15px !important;
    }

    .fixed {
        position: sticky;
        top: 100px;
        left: 93%;
    }

</style>