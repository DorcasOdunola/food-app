<template>  
    <div>
        <div id="background" class="container-fluid">
          <div class="row">
            <div class="col-12 mx-auto text-center mt-5 pt-5">
                <h1 class="text-center text-white pt-5 mt-5">Welcome to Crest Eatery!!!</h1>
                <h4 class="text-light"><i>...We serve you with maximum satisfaction</i></h4>       
            </div>
          </div>
        </div>
    </div>
    
</template>

<script>
export default {
    name: "LandingPage"
    
}
</script>

<style scoped>

    #background {
        background-image: url(../assets/bg1.jpg);
        background-blend-mode: color-burn;
        background-color: rgba(0, 0, 0, 0.1);
        height: 90vh;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        margin-top: 4.8%;
    }
    #link {
        background-color: white;
     
    }
    h1 {
        font-size: 40pt;
        color: #2F4F4F !important;
    }

</style>