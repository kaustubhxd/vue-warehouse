<template>
  <div id="navbar" :style="`height : ${navbarHeight}px`"  >
    <img id='logo' :style="`display : ${logoDisplay}`" src="@/assets/logo.svg" alt="">
    <div id='pusher' :style="`width: ${pusherWidth}`"> </div>
      <p id='logo-text' class='noselect' :style="`color: ${logoTextColor}`">basespace</p> 
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
      return {
        navbarHeight : 50,
        logoDisplay  : 'block',
        pusherWidth  : '0',
        logoTextColor : 'black'
      }
    },
    computed: {
        ...mapGetters(['getListingScrollTop'])
    },
    watch: {
        '$store.state.listingScrollTop': {
                immediate: true,
                deep : true,
                handler() {
                  var scrollTop = this.$store.state.listingScrollTop
                  // console.log(scrollTop)
                  var rangeMin = 150;
                  if(scrollTop < rangeMin){
                    this.navbarHeight = 50
                    this.logoDisplay = 'block'
                    this.pusherWidth = '0'
                    this.logoTextColor = 'black'
                  }else if(scrollTop >= rangeMin){
                    this.navbarHeight = 30
                    this.logoDisplay = 'none'
                    this.pusherWidth = 'calc(50% - 70px)'
                    this.logoTextColor = '#ed3333'
                  }
                }
        }
    }
}
</script>

<style lang='scss' scoped>
#navbar {
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
    padding: 10px;
    margin-bottom: 2px;
    display: flex;
    font-family: 'Comfortaa', 'sans-serif';
    transition: height 0.7s ease;

    #logo-text{
      font-size: 25px;
      align-self: center;
      transition: color 0.7s ease;
    }

    #pusher{
      transition: width 0.7s ease;
    }

    #logo{
      width: 50px;
    }
}
</style>