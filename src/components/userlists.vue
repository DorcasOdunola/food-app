<template>
    <div>
        <div class="container text-white" style="background-color: #2F4F4F">
            <div class="row-100">
                <h2 class="text-center p-2">CREST EATERY CUSTOMER</h2>
                <table class="table text-white w-100 table-striped text-center table-inverse table-responsive-md">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-bind:key="i" v-for="(user, i) in getUser">
                            <td scope="row">{{user.name}}</td>
                            <td>{{user.acctname}}</td>
                            <td>{{user.phoneno}}</td>
                            <td>{{user.acctemail}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "UserLists",
    data(){
        return {
            getUser: ''
        }
    },
    mounted() {
        this.getAllUser()
    },
    methods: {
        getAllUser() {
            this.getUser = JSON.parse(localStorage.getItem("UserDetails"));
        }
    }
}
</script>

<style scoped>

</style>