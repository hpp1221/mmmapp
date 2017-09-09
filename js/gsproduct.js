/**
 * Created by hpp on 2017/6/24.
 */
$(function(){
    getShop();
    getArea();
    getProduct(0,0);
    function getShop(){
        $.ajax({
            url:"http://182.254.146.100:3000/api/getgsshop",
            success:function(data){
                console.log(data);
                var html = template("gsproductShopTmp",data);
                $("#shop").html(html);
                $("#gsproduct .gsproduct-title").find("ul >li").eq(0).html("<a href='#shop' data-shopid="+data.result[0].shopId+">"+data.result[0].shopName+"<i></i></a>");
                $("#gsproduct .gsproduct-title").find("ul >li").eq(0).find("a").on("click",function(e){
                    e.preventDefault();
                  console.log($(this).attr("href")) ;
                    $($(this).attr("href")).toggle();
                    $($("#gsproduct .gsproduct-title").find("ul >li").eq(1).find("a").attr("href")).hide();
                })
                $("#shop > ul >li>a").on("click",function(){
                    var shopid= $(this).data("shopid");
                    $("#gsproduct .gsproduct-title").find("ul >li").eq(0).find("a").data("shopid",shopid);
                    var shopname= $(this).html();
                    $("#gsproduct .gsproduct-title").find("ul >li").eq(0).find("a").html(shopname+"<i></i>");
                    $('#shop').hide();
                getProduct(shopid,$("#gsproduct .gsproduct-title").find("ul >li").eq(1).find("a").data("areaid"));
                })
            }
        });
    }

    function getArea(){
        $.ajax({
            url:"http://182.254.146.100:3000/api/getgsshoparea",
            success:function(data){
                console.log(data);
                var html = template("gsproductAreaTmp",data);
                $("#area").html(html);
                console.log(data.result[0].areaName.substr(0,2));
                $("#gsproduct .gsproduct-title").find("ul >li").eq(1).html("<a href='#area' data-areaid=" + data.result[0].areaId + ">" + data.result[0].areaName.substr(0,2) + "<i></i></a>");
                //$("#gsproduct .gsproduct-title").find("ul >li").eq(1).html("<a href='#area' data-areaid="+data.result[0].areaId+">"+data.result[0].areaName.split('ги')[0]+"<i></i></a>");
                $("#gsproduct .gsproduct-title").find("ul >li").eq(1).find("a").on("click",function(e){
                    e.preventDefault();
                    $($(this).attr("href")).toggle();
                    $($("#gsproduct .gsproduct-title").find("ul >li").eq(0).find("a").attr("href")).hide();
                })
                $("#area > ul >li>a").on("click",function(){
                    //console.log(data);
                    var areaid= $(this).data("areaid");
                    $("#gsproduct .gsproduct-title").find("ul >li").eq(1).find("a").data("areaid",areaid);
                    var areaname= $(this).html();
                    $("#gsproduct .gsproduct-title").find("ul >li").eq(1).find("a").html(areaname+"<i></i>");
                    $('#area').hide();
                    getProduct($("#gsproduct .gsproduct-title").find("ul >li").eq(0).find("a").data("shopid"),areaid);
                })
            }
        });
    }
    function getProduct(shopid,areaid){
        $.ajax({
            url:"http://182.254.146.100:3000/api/getgsproduct",
            data:{"shopid":shopid,
            "areaid":areaid},
            success:function(data){
                console.log(data);
                var html = template("gsproductTmp",data);
                $(".gsproduct-list").html(html);
            }
        });
    }

})