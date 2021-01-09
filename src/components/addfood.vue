<template>
    <div>
        <div class="container p-1 cont">
            <div class="form-group col-12 col-md-7 mx-auto mt-2 bg-light shadow p-0">
                <div class="w-100 p-2" style="background-color: #2F4F4F">
                    <p class="h3 text-center text-white">Food Details</p>
                </div>
                <div class="p-3 w-100">
                    <label for="foodname">Food Name:</label>
                    <input type="text" name="foodname" id="foodname" class="form-control col-12 col-md-12" placeholder="Food Name" v-model="foodname">
                    <label for="foodname">price:</label>
                    <input type="number" name="price" id="price" class="form-control col-12 col-md-12" placeholder="price(per plate)" v-model="price">
                    <p class="pt-md-2">Time:</p>          
                    <div class="form-group form-inline">
                            <label for="fromtime">From:</label>
                            <input type="time" name="foodfromtime" id="fromtime" class="form-control ml-md-3" v-model="timefrom">
                            <label for="totime" class="pl-md-5">To:</label>
                            <input type="time" name="totime" id="totime" class="form-control ml-md-3" v-model="timeto">
                    </div>
                    <input type="file" name="filepic" id="filepic"><br>
                    <button class="btn btn-light m-3" v-on:click=addFoodDetails>Add Details</button>
                        
                    <router-link to="/adminside/editfood">
                            <button class="btn text-white m-1" style="background-color: #2F4F4F">Edit Details</button>
                    </router-link>

                    <p id="displayadded" class="text-success"></p>
                    <p id="displaynotadded" class="text-danger"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AddFood",
    data() {
        return {
            foodname: "",
            timefrom: "",
            timeto: "",
            picture: "",
            price: "",
            foodArray: []

        }
    },
    mounted() {
        this.checkAdmin()
    },
    methods: {
        checkAdmin() {
            if (localStorage.getItem("AdminOnline") == null) {
                window.location = `/adminside`;
            }
        },
        addFoodDetails() {
            if (localStorage.getItem("FoodDetails") != null) {
                this.foodArray = JSON.parse(localStorage.getItem("FoodDetails"))
            } else {
                this.foodArray = []    
            }
            
            if ((this.foodname != "") && (this.price != "") && (this.timefrom != "") && (this.timeto != "")) {
                let foodimg = document.getElementById("filepic").files[0].name
                this.picture = foodimg;
                let foodObj = {foodname: this.foodname, timefrom: this.timefrom, timeto: this.timeto, picture: foodimg, foodprice: this.price, status: "Available"};
                let {foodArray} = this;
                this.foodArray = [...foodArray, foodObj];
                localStorage.setItem("FoodDetails", JSON.stringify(this.foodArray));
                document.getElementById("displayadded").innerHTML = "Food Successfully Added";
                document.getElementById("displaynotadded").innerHTML = "";
                this.foodname = "";
                this.timefrom = "";
                this.timeto = "";
                this.foodimg = "";
                this.price = "";
                this.picture = "";
            } else {
                document.getElementById("displaynotadded").innerHTML = "Pls input the food details";
                 document.getElementById("displayadded").innerHTML = "";
            }
        }
    }


}
</script>

<style scoped>
    .cont {
        background-image: url("../assets/bg4.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }
    

</style>