<template>
  <div>
    <scenceCase class="mobile"></scenceCase>

    <iframe
        id="iframeId" :src="url" frameborder="0" class="pc iframe"  scrolling="auto">
    </iframe>
  </div>

</template>

<script>
/* eslint-disable */
export default{
  data(){
      return{
        url:'https://wlive-mc.sportsdt.com/wlive/t_sandbox/index.shtml?id=2083732'
      }
    },
    mounted(){
      this.join()
    },
    methods: {
      join(){
        var id = this.$route.params.id
        // console.log(id);
        this.url='https://wlive-mc.sportsdt.com/wlive/t_sandbox/index.shtml?id='+id
      }
    }

}
</script>

<style>
.iframe {
    position: absolute;
    left: 0;
    right: 0;
    top: 18%;
    bottom: 0;
    width: 40%;
    height: 100%;
    background: #fff;
    overflow-y: hidden;
    margin: 0 auto;
}
</style>
