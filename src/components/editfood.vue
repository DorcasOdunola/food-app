<template>
    <div>
        <div id="background" class="container-fluid p-2">
            <div class="container mt-5 p-1">
                <div class="row w-100 pb-3">
                    <div class="col-12 col-md-3" v-bind:key="i" v-for="(food, i) in collectFood">
                        <div class="card-deck mb-3">
                            <div class="card">
                                <img class="card-img-top" :src="require(`../foodimages/${food.picture}`)" alt="">
                                <div class="float-right">
                                    <span class="card-text bg-primary p-1 rounded text-white">₦{{food.foodprice}}(per plate)</span>
                                </div>
                                <div class="card-body">
                                    <h4 class="card-title">{{food.foodname}}</h4>
                                    <p class="card-text">
                                        <span>Available from:{{food.timefrom}} to {{food.timeto}}</span>
                                    </p>
                                    <span class="card-text bg-success rounded p-1">{{food.status}}</span>
                                    <div class="mt-2">
                                        <button class="btn border border-danger fordelete" @click="deleteFood(i)">Delete</button>
                                        <button class="btn border border-success ml-2 forsave" data-toggle="modal" data-target="#modelId" @click="editFood(i, food.foodname, food.timefrom, food.timeto, food.status)">Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="modelId">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Details</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <label for="foodname">Food Name:</label>
                            <input type="text" name="foodname" id="foodname" class="form-control col-12 col-md-10" placeholder="Food Name" v-model="myObj.foodname">
                            <p class="pt-md-2">Time:</p>          
                            <div class="form-group form-inline">
                                <label for="fromtime">From:</label>
                                <input type="time" name="foodfromtime" id="fromtime" class="form-control ml-md-3" v-model="myObj.timefrom">
                                <label for="totime" class="pl-md-5">To:</label>
                                <input type="time" name="totime" id="totime" class="form-control ml-md-3" v-model="myObj.timeto">
                            </div>
                            <label for="stat">Status:</label>
                            <input type="text" name="Status" id="stat" class="form-control ml-md-3" v-model="myObj.statfood">                           
                             <input type="file" name="filepic" id="filepic"><br>
                        </div>
                    </div>
                    <div class="modal-footer">
                         <p id="showupdate"></p>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="saveFood(myObj.index, myObj.foodname, myObj.timefrom, myObj.timeto, myObj.statfood)">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "EditFood",
    data() {
        return {
            collectFood: "",
            myObj: {
                index: "",
                foodname: "",
                timefrom: "",
                timeto: "",
                statfood: "",
            },         
        }
    },
    mounted() {
        this.getFood()
    },
    methods: {
        getFood() {
            this.collectFood = JSON.parse(localStorage.getItem("FoodDetails"));     
        },
        deleteFood(i) {
            this.collectFood.splice(i, 1);
           localStorage.setItem("FoodDetails", JSON.stringify(this.collectFood));
        },

        
        editFood(i, n, onetime, twotime, stat) {
            document.getElementById("showupdate").innerHTML = "";
            this.myObj.index = i;
           this.myObj.foodname = n;
           this.myObj.timefrom = onetime;
           this.myObj.timeto = twotime;
           this.myObj.statfood = stat;
           console.log(this.myObj);   
        },
        saveFood(i, na, firstime, secondtime, statt) {
            document.getElementById("showupdate").innerHTML = "Update Successful"
            const element = this.collectFood[i];
            element.foodname = na;
            element.timefrom = firstime;
            element.timeto = secondtime;
            element.status = statt;
            localStorage.setItem("FoodDetails", JSON.stringify(this.collectFood));
            // alert("Update Successful")          
        }
    }
    
    
}
</script>

<style>
     #background {
        background-image: url("../assets/bg3.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        /* height: 70vh */
    }

    .crest {
        font-size: 45pt;
    }

    .fordelete:hover {
        background-color: red;
        color: white;
    }

    .forsave:hover {
        background-color: green;
        color: white;
    }

</style>