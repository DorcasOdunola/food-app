<template>
    <div>
        <div id="background" class="container-fluid text-center p-2">
            <div class="row mt-5 w-100">
                <div class="col-12 text-center pt-5 mt-3">
                    <p class="text-right h1 crest pt-5">Crest Eatery</p>
                    <p class="text-right h5 pt-5 serve"><i>....We serve you with maximum satisfaction</i></p>
                </div>
            </div>
        </div>
        <div class="container mt-5 p-1 pt-5" v-if="verify">
            <h3 class="text-center">All Foods</h3>
            <hr class="w-25">
            <router-link to="/cart">
                <div class="mt-4 mb-3 fixed">
                    <span class="float-right text-info h5 color">{{cartitem}}</span>
                    <img src="../assets/cart2.png" alt="cart" class="float-right mt-2"><br>
                </div>
            </router-link>
            <div class="row w-100 pb-3 p-3">
                <div class="col-12 col-md-3 mt-2 p-1" v-bind:key="i" v-for="(food, i) in collectFood">
                    <div class="card-deck mb-3 mt-2 w-100">
                        <div class="card mycard">
                           
                            <img class="card-img-top w-100 same" :src="require(`../foodimages/${food.picture}`)" alt="">
                            
                            <div class="">
                                <span class="card-text rounded text-small pl-3" style="color: #2F4F4F; font-size: 10pt">{{food.status}}</span>
                                <span class="card-text p-1 rounded float-right" style="color: #2F4F4F; font-size: 10pt">₦{{food.foodprice}}(per plate)</span>
                            </div>
                            <div class="card-body">
                                <span class="card-title h5">{{food.foodname}}</span><br>
                                <span class="text-small small">Available from:{{food.timefrom}} to {{food.timeto}}</span>
                                <p v-bind:id="'showresult' + i" class="text-small small"></p>
                                <div class="mt-2">
                                    <button class="btn text-white ml-1 btn-sm mybtn" style="background-color: #2F4F4F" @click="addToCart(food, i)">Add to Cart</button>
                                </div>
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
    name: "FoodMenu",
    data() {
        return {
            collectFood: "", 
            cartArray: [],
            onlineuser: "",
            verify: false,
            quantity: 1,
            cartid: 0,
            cartitem: "",
            cartamtArray: [],
        }
    },
    mounted() {
        this.getFood();
    },
    methods: {
        getFood() {
            this.collectFood = JSON.parse(localStorage.getItem("FoodDetails"));
            this.onlineuser = JSON.parse(sessionStorage.getItem("UserOnline"));
            let collect = JSON.parse(localStorage.getItem("CartItem"));
            this.verify = !this.verify;
            let getTime = new Date();
            if (sessionStorage.getItem("UserOnline") == null) {
                this.cartitem = 0;
            } else {
              let ind = collect.findIndex(each => each.customer == this.onlineuser);
              if (ind == -1) {
                this.cartitem = 0;
              } else {
                this.cartitem = collect[ind].cartitem;
              }   
            }
            for (let i = 0; i < this.collectFood.length; i++) {
                let hrs = getTime.getHours();
                let changetimefrm = parseInt(this.collectFood[i].timefrom.slice(0,2));
                let changetimeto = parseInt(this.collectFood[i].timeto.slice(0,2));
                if (hrs >= changetimefrm && hrs<=changetimeto) {
                    this.collectFood[i].status = "Available";
                    localStorage.setItem("FoodDetails", JSON.stringify(this.collectFood));                  
                } else {
                    this.collectFood[i].status = "Not Available";
                    localStorage.setItem("FoodDetails", JSON.stringify(this.collectFood));
                }        
            }
        },
        addToCart(fudd, i) {

            if (localStorage.getItem("Cart") != null) {
                this.cartArray = JSON.parse(localStorage.getItem("Cart"))
            }
            this.onlineuser = JSON.parse(sessionStorage.getItem("UserOnline"));
            this.cartamtArray = JSON.parse(localStorage.getItem("CartItem"));            
            let myget = this.cartArray;
            let findFood = myget.find(mapcarts=>(mapcarts.foodname==fudd.foodname) && (mapcarts.customer == this.onlineuser));
            if(findFood){
               document.getElementById(`showresult${i}`).innerHTML = ("This food item is already in your cart");
               console.log(i);
            //    alert("This food item is already in your cart!!")
            } else{
                if (sessionStorage.getItem("UserOnline") == null) {
                    alert("User should please login before adding to cart.")
                } else {
                    let index = this.cartamtArray.findIndex(item => item.customer == this.onlineuser);
                    this.cartitem = this.cartamtArray[index].cartitem+=1;
                    localStorage.setItem("CartItem", JSON.stringify(this.cartamtArray));
                    let cartObj = {customer:this.onlineuser, foodname: fudd.foodname, price: fudd.foodprice, quantity: this.quantity, total: fudd.foodprice, status: fudd.status, picture: fudd.picture};
                    let {cartArray} = this;
                    this.cartArray = [...cartArray, cartObj];
                    document.getElementById(`showresult${i}`).innerHTML = "Successfuly Added to Cart";
                    localStorage.setItem("Cart", JSON.stringify(this.cartArray)); 
                }
            }             
        }
    },   
}
</script>

<style scoped>
    #background {
        background-image: url("../assets/bg2.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        height: 80vh
    }

    .crest {
        font-size: 45pt;
        color: #2F4F4F !important;
    }

    .serve {
        color: #2F4F4F !important;
    }

    .color {
        color: #2F4F4F !important;
    }
    hr {
        border: 10px;
        height: 10px;
        border-radius: 50px;
        background-color: #2F4F4F;
    }

    .small {
        font-size: 9pt;
    }

    .mycard {
        border-top-left-radius: 5px;
        border-bottom-right-radius: 20px;
        border-top-right-radius: 50px;
        border-bottom-left-radius: 50px; 

        transition: 0.5s ease;
        cursor: pointer;
    }

    .mycard:hover {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
       transform: scale(1.09);
        color: #2F4F4F;
    }
    .mybtn:hover {
        background-color: transparent !important;
        border: 1px solid  #2F4F4F;
        color: #2F4F4F !important;
    }
    .fixed {
        position: sticky;
        top: 100px;
        left: 93%;
    }

    .same {
        height: 150px;
    }

</style>