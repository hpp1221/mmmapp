$(function(){
    var productid=getQueryString("productid");

    getProduct(productid);
    function getProduct(productid){
        $.ajax({
            url:"http://182.254.146.100:3000/api/getproduct?productid="+productid,
            success:function(data){
                //console.log(data);
                var html = template("productInfoTmp",data);
                $(".product-info").html(html);
                getGreatComment(productid);
            }
        });
    }
    function getGreatComment(productid){
        $.ajax({
            url:"http://182.254.146.100:3000/api/getproductcom?productid="+productid,
            success:function(data){
                //console.log(data);
                var html = template("greatComment",data);
                $(".product-com-list").html(html);
            }
        });
    }



    //首页/。。。/这里
    getCategory(productid);
    function getCategory(productid){
        $.ajax({
            url:"http://182.254.146.100:3000/api/getproduct?productid="+productid,
            success:function(data){
                var char = data.result[0].productName;
                char =char.slice(0,3);
                $(".product-title  ol li:last-child").html(char);
                //var html = template('classifyTmp',data)
                //    $(".product-title").html(html);
                //

                //这里可以从此处得到分类id，然后通过分类id去找对应的返回值，也就是去下一个函数可以得到分类名称
                //怎么和下一个函数建立联系，就可以在此函数里调用下一个函数。
                var categoryId = data.result[0].categoryId;
                getCategory1(categoryId);
            }
        });
    }
    function getCategory1(categoryId){
        $.ajax({
            url:"http://182.254.146.100:3000/api/getcategorybyid?categoryid="+categoryId,
            success:function(data){
                var category = data.result[0].category;
                $(".product-title  ol li:nth-of-type(2) > a ").html(category);
            }
        });
    }

    //获取地址上的参数的值
        function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = location.search.substr(1).match(reg);
        if (r != null) return unescape(decodeURI(r[2])); return null;
    }
})