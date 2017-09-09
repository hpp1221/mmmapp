/**
 * Created by hpp on 2017/6/23.
 */
$(function(){
    getBaiCaiJia();
    var titleid=getQueryString("titleid");
    function getBaiCaiJia(){
        $.ajax({
            url:"http://182.254.146.100:3000/api/getbaicaijiatitle",
            success:function(data) {
                //console.log(data);
                var html = template("baicaijiaTitleTmp", data);
                $("#baicajia .title").html(html);
                $("#baicajia .title").find("ul>li").eq(0).addClass("active");

                var ulWidth = 40;
                var lis = $("#baicajia .title").find("ul>li");
                for (var i = 0; i < lis.length; i++) {
                    ulWidth += $(lis[i]).width();
                }
                $("#baicajia .title").find("ul").css("width", ulWidth + "px");
                setSwipe();
                getBaiCaiJiaData(0);
            }
        })
    }
    //列表数据
    //getBaiCaiJiaData(titleId);
    function getBaiCaiJiaData(titleid){
        $.ajax({
            url:"http://182.254.146.100:3000/api/getbaicaijiaproduct",
            data:{"titleid":titleid},
            success:function(data){
                //console.log(data);
                var html = template("baicaijiaDataTmp",data);
                $("#baicajia .content").html(html);
            }
        });
    }
    function setSwipe(){
        $("#baicajia .title").find("ul>li>a").on("click", function () {
            $("#baicajia .title").find("ul>li").removeClass("active");
            $(this).parent().addClass("active");

            var thisTitleId = $(this).data("titleid");
            //console.log(thisTitleId);
            var navs = $("#baicajia .title").find("ul>li");
            var swipeLeft = 0;
            for (var i = 0; i < thisTitleId; i++) {
                swipeLeft -= $(navs[i]).width();
            }
            //console.log(swipeLeft);
            if(swipeLeft>minPositon){
                swipeUl.css("transform", "translateX(" + swipeLeft + "px)");
                swipeUl.css("transition","all 0.2s");
            }
            else{
                swipeLeft=minPositon;
                swipeUl.css("transform", "translateX(" + swipeLeft + "px)");
                swipeUl.css("transition","all 0.2s");
            }
            currentX=swipeLeft;
            getBaiCaiJiaData(thisTitleId);
        });
        var startX,endX,movX;
        var currentX=0;
        var distanceX=0;
        var maxSwipe=0+100;
        var minSwipe= $("#baicajia .title").width()-$("#baicajia .title").find("ul").width()-100;
        var maxPosition=0;
        var minPositon=$("#baicajia .title").width()-$("#baicajia .title").find("ul").width();
        var swipeUl=$("#baicajia .title").find("ul");
        $("#baicajia .title").on("touchstart",function(e){
            //console.log(e);
            startX= e.originalEvent.touches[0].clientX;
        })
        $("#baicajia .title").on("touchmove",function(e){
            //console.log(e);
            moveX= e.originalEvent.touches[0].clientX;
            distanceX=moveX-startX;
            //console.log(distanceX);
            //当滑动距离超过最大就不让滑动了，小于最大距离就让其滑动。
            if((currentX+distanceX) < maxSwipe && (currentX+distanceX) > minSwipe){
                swipeUl.css("transform","translateX("+(currentX+distanceX)+"px)");
                swipeUl.css("transition","none");
            }

        })
        $("#baicajia .title").on("touchend",function(e){
            //console.log(e);
            endX= e.originalEvent.changedTouches[0].clientX;
            currentX+=distanceX;
            if(currentX>maxPosition){
                currentX=maxPosition;
                swipeUl.css("transform","translateX("+currentX+"px)");
                swipeUl.css("transition","all 0.2s");
            }else if(currentX<minPositon){
                currentX=minPositon;
                swipeUl.css("transform","translateX("+currentX+"px)");
                swipeUl.css("transition","all 0.2s");
            }
        })
    }
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = location.search.substr(1).match(reg);
        if (r != null) return unescape(decodeURI(r[2])); return null;
    }
})