<template>
    <div v-el:wrap @touchstart="start" @touchmove="move" @touchend="end" @transitionend="transitionend" class="slider-wrap">
        <div class="slider-content" :style="contStyle">
            <slot></slot>
        </div>
        <div class="slider-points" v-show="showPoints">
            <span class="point" v-for="page in pages" :class="{on: $index == currentIndex}"></span>
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
            position: relative;
            width: 100%;
            height: 100%;
        }
        .slider-item{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            font-size: 40px;
            text-align: center;
            background: #ddd;
        }
        .slider-points{
            position: absolute;
            z-index: 3;
            bottom: 10px;
            left: 50%;
            -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
            .point{
                width: 8px;
                height: 8px;
                display: inline-block;
                border-radius: 100%;
                background: #000;
                opacity: .2;
                margin: 0 3px;
            }
            .on{
                background: #fff;
            }
        }
    }
</style>
<script>
    export default{
        data(){
            return{
                showPoints: false,
                pages: 0,
                touchObj: {},
                contStyle: '',
                currentIndex: 0,
                currentX: 0,
                wrapWidth: 0,
                childLength: 0
            }
        },
        methods:{
            start: function(e){
                if(this.childLength <= 1){
                    return;
                }
                e.preventDefault();
                var touch = e.touches[0];
                this.touchObj.startX = touch.pageX;
                this.touchObj.startY = touch.pageY;
                this.touchObj.touchState = true;
                this.touchObj.startDate = Date.now();
            },
            move: function(e){
                if(!this.touchObj.touchState){
                    return;
                }
                var touch = e.touches[0];
                this.touchObj.moveX = touch.pageX - this.touchObj.startX;
                if(Math.abs(this.touchObj.moveX)>=5){
                    if(this.childLength === 2){
                        if(this.touchObj.moveX > 0){
                            this.childStyle('next')
                        }else if(this.touchObj.moveX < 0){
                            this.childStyle('prev')
                        }
                    }
                    e.preventDefault();
                    this.contStyle = '-webkit-transform: translate3d('+(this.touchObj.moveX)+'px, 0, 0)';
                }
            },
            end: function(e){
                if(!this.touchObj.touchState){
                    return;
                }
                e.preventDefault();
                this.touchObj.touchState = false;
                var endDate = Date.now(),
                    duration = endDate - this.touchObj.startDate,
                    direction = 0;
                if(duration < 300 && Math.abs(this.touchObj.moveX)>=5 || Math.abs(this.touchObj.moveX) >= this.wrapWidth/2){
                    direction = this.touchObj.moveX > 0 ? 1 : -1;
                    if(this.currentIndex - direction < 0){
                        this.currentIndex = this.childLength - 1
                    }else if(this.currentIndex - direction >= this.childLength){
                        this.currentIndex = 0
                    }else{
                        this.currentIndex -= direction;
                    }
                }
                this.currentX = direction * this.wrapWidth;
                this.contStyle = '-webkit-transform: translate3d('+this.currentX+'px, 0, 0);-webkit-transition: transform 300ms ease';
            },
            transitionend: function(){
                this.childStyle();
                this.contStyle = '';
            },
            childStyle: function(status){
                var child = this.$children;
                for(var i = 0; i < this.childLength; i++){
                    child[i].$el.style = ''
                }
                var prev = this.currentIndex === 0 ? this.childLength - 1 : this.currentIndex - 1,
                    next = this.currentIndex === this.childLength - 1 ? 0 : this.currentIndex + 1;
                child[this.currentIndex].$el.style = 'z-index: 2';
                if(status == 'next'){
                    child[next].$el.style = '-webkit-transform: translate3d(100%, 0, 0)';
                }else if(status == 'prev'){
                    child[prev].$el.style = '-webkit-transform: translate3d(-100%, 0, 0)';
                }else{
                    child[prev].$el.style = '-webkit-transform: translate3d(-100%, 0, 0)';
                    child[next].$el.style = '-webkit-transform: translate3d(100%, 0, 0)';
                }
            }
        },
        ready: function(){
            var wrapDom = this.$els.wrap,
                child = this.$children;
            this.wrapWidth = wrapDom.clientWidth;
            this.childLength = child.length;
            this.childStyle();
            this.showPoints = true;
            this.pages = this.childLength;
        }
    }
</script>
