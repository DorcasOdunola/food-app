<template>
    <div>
        <div class="container mt-5">
            <div class="row p-2 w-100 text-white mx-auto mt-5" style="background-color: #2F4F4F">
                <div class="col-3 mx-auto mt-4">
                    <router-link to="/adminside/addfood" class="nav-link h4 initialism p-0">
                        <p>Add Food</p>
                    </router-link>
                </div>
                <div class="col-3 mt-4">
                    <router-link to="/adminside/userlists" class="nav-link h4 initialism p-0">
                        <p>Users</p>
                    </router-link>
                </div>
                <div class="col-3 mt-4">
                    <router-link to="/adminside/usertrans" class="nav-link h4 initialism p-0">
                        <p>Orders</p>
                    </router-link>
                </div>
            </div>
        </div>
        <h3 class="text-center p-1">CREST EATERY'S ADMIN BlOCK</h3>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "AdminSide"
}
</script>


<style scoped>
    p {
        color: white !important;
        text-decoration: none;
    }

    p:hover {
        text-decoration: none !important;
    }

</style>