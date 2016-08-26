<template>
    <div v-el:wrap @touchstart="start" @touchmove="move" @touchend="end" class="slider-wrap">
        <div class="slider-content" :style="contStyle">
            <div class="slider-item">1</div>
            <div class="slider-item">2</div>
            <div class="slider-item">3</div>
            <div class="slider-item">4</div>
        </div>
    </div>
</template>
<style lang="less">
    .slider-wrap{
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .slider-content{
            width: 400%;
            height: 100%;
        }
        .slider-item{
            float: left;
            width: 25%;
            height: 100%;
            font-size: 40px;
            text-align: center;
            background: #ddd;
        }
    }
</style>
<script>
    export default{
        data(){
            return{
                touchObj: {},
                contStyle: '',
                currentIndex: 0,
                currentX: 0
            }
        },
        methods:{
            start: function(e){
                var touch = e.touches[0];
                this.touchObj.startX = touch.pageX;
                this.touchObj.startY = touch.pageY;
                this.touchObj.touchState = true;
                this.touchObj.startDate = new Date();
            },
            move: function(e){
                var touch = e.touches[0];
                this.touchObj.moveX = touch.pageX - this.touchObj.startX;
                this.contStyle = 'transform: translate3d('+(this.touchObj.moveX + this.touchObj.currentX)+'px, 0, 0)'
            },
            end: function(e){
                var wrapDom = this.$els.wrap,
                    wrapWidth = wrapDom.clientWidth;
                this.currentIndex += this.touchObj.moveX > 0 ? 1 : -1;

                this.touchObj.currentX = this.currentIndex*wrapWidth;
                this.contStyle = 'transform: translate3d('+this.touchObj.currentX+'px, 0, 0);transition:transform 300ms ease'
            }
        },
        components:{
//            'other-component':OtherComponent,
//            HeaderComponent,
        }
    }
</script>
