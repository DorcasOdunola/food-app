<template>
    <div>
        <div class="container text-white" style="background-color: #2F4F4F">
            <h2 class="text-center p-2">CUSTOMER'S ORDER</h2>
            <div class="row">
                <div class="accordion w-100" id="accordionExample"><br>
                    <div class="card bg-light" v-bind:key="i" v-for="(user, i) in getUser">
                        <div class="card-header w-100" id="headingThree">
                            <h2 class="mb-0">
                                <button class="btn btn-link btn-block text-left collapsed button" type="button" data-toggle="collapse" :data-target="'#collapse'+i" aria-expanded="false" aria-controls="collapseThree" @click="getTransUser(user.acctname)">
                                {{user.name}}
                                </button>
                            </h2>
                        </div>
                        <div v-bind:id="'collapse' + i" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                        <div class="card-body text-muted"  style="background-color: #2F4F4F">
                           <table class="table w-100 table-striped text-center table-inverse table-responsive-md text-white">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Phone No</th>
                                        <th>Food Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th>Address</th>
                                        <th>Acct Name</th>
                                        <th>Acct No</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-bind:key="i" v-for="(trans, i) in transAll">
                                        <td scope="row">{{trans.customer}}</td>
                                        <td>{{trans.phonenumber}}</td>
                                        <td>{{trans.foodname}}</td>
                                        <td>{{trans.price}}</td>
                                        <td>{{trans.quantity}}</td>
                                        <td>{{trans.total}}</td>
                                        <td>{{trans.address}}</td>
                                        <td>{{trans.bankacctname}}</td>
                                        <td>{{trans.bankacctno}}</td>
                                    </tr>
                                </tbody>
                            </table>
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
    name: "UserTrans",
    data() {
        return {
            getTrans: '',
            getUser: '',
            transAll: "",
        }
    }, 
    mounted() {
        this.getAllTrans();
        this.getUserTrans();
    },
    methods: {
        getAllTrans() {
            this.getTrans = JSON.parse(localStorage.getItem("Transactions"))
        },
        getUserTrans() {
            this.getUser = JSON.parse(localStorage.getItem("UserDetails"));
        },
        getTransUser(acctname) {
            this.transAll = this.getTrans.filter(user => user.customer == acctname);
        }
    }
}
</script>

<style scoped>
    /* .button {
        
    }    */

    

</style>