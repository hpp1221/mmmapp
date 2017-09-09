/**
 * Created by hpp on 2017/6/25.
 */
$(function() {
    var brandtitleid = getQueryString("brandtitleid");
    getBrandList(brandtitleid);
    //getBrandProduct(brandtitleid);

    function getBrandList(brandtitleid) {
        $.ajax({
            url: "http://182.254.146.100:3000/api/getbrand",
            data: {
                "brandtitleid": brandtitleid
            },
            success: function (data) {
                var html = template("brandListTmp", data);
                $('.sortlist').html(html);
            }
        })
    }

    getBrandProduct(brandtitleid);
    function getBrandProduct(brandtitleid){
        $.ajax({
            url: "http://127.0.0.1:3000/api/getbrandproductlist",
            data: {
                "brandtitleid": brandtitleid,
                "pagesize":4
            },
            success: function (data) {
                var html = template("brandProductTmp", data);
                $('.product-list').html(html);
                getBrandProductCom(data.result[0])
            }
        })
    }
    function getBrandProductCom(product) {
        $.ajax({
            url: "http://127.0.0.1:3000/api/getproductcom",
            data: {
                "productid": product.productId
            },
            success: function (data) {

                console.log(data);
                data={"productImg":product.productImg,"productName":product.productName,"result":data.result};
                console.log(data);
                var html = template("brandProductComTmp", data);
                $('.product-com').html(html);
            }
        })
    }


    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = location.search.substr(1).match(reg);
        if (r != null) return unescape(decodeURI(r[2])); return null;
    }
})