
$(function(){
    var categoryId = getQueryString("categoryid");
    var pageid=getQueryString("pageid")||1;
    //getProductList(categoryId,pageid);
    function getProductList(categoryId,paged){
        $.ajax({
            url:"http://182.254.146.100:3000/api/getproductlist",
            data:{"categoryid":categoryId,
                "pageid":pageid||1
            },
            success:function(data){
                //console.log(data);
                var page = Math.ceil(data.totalCount / data.pagesize);
                var pageLi="";
                for(var i = 0;i<page;i++){
                    var url = "productList.html?categoryid="+categoryId+"&pageid="+(i+1);
                    pageLi +="<li><a href="+url+"> 第"+(i+1)+"/"+(page)+"ҳ</a></li>";

                }
                $("#dLabel").html("第"+pageid+"/"+page+"页");
                var prevpageid,nextpageid;
                if(pageid<=1){
                    prevpageid=1;
                }else{
                    prevpageid = pageid-1;
                }
                if(pageid>= page){
                    nextpageid=page;
                }else{
                    nextpageid = parseInt(pageid)+1;
                }

                var char ="第"+pageid+"/"+page+"页";


                var prevUrl ="moneyctrl.html?categoryid="+categoryId+"&pageid="+(prevpageid);
                var nextUrl ="moneyctrl.html?categoryid="+categoryId+"&pageid="+(nextpageid);
                $(".page-prev").attr("href",prevUrl);
                $(".page-next").attr("href",nextUrl);

                $("#dLabel").html(char+'<span class="caret"></span>');
                $(".dropdown-menu").html(pageLi);

            }
        });

    }

    var pageid=getQueryString("pageid")||0;
    getMoneyCtrl(pageid);
    function getMoneyCtrl(pageid){
        $.ajax({
            url:"http://182.254.146.100:3000/api/getmoneyctrl",
            data:{
                "pageid":pageid||0
            },
            success:function(data){
                var html =template("moneyCtrlTmp",data);
                //console.log(html);
                $(".moneyCtrl-list").html(html);
                var page = Math.ceil(data.totalCount / data.pagesize);
                console.log(page);
                var pageLi="";
                for(var i = 0;i<page;i++){
                    var url = "moneyctrl.html?pageid="+i;
                    pageLi +="<li><a href="+url+"> 第"+(i+1)+"/"+(page)+"页</a></li>";
                }

                $("#dLabel").html("第"+(parseInt(pageid)+1)+"/"+page+"页");

                var prevpageid,nextpageid;
                if(pageid<=0){
                    prevpageid=0;
                }else{
                    prevpageid = pageid-1;
                }
                if(pageid >= page - 1){

                    nextpageid=page - 1;
                    //nextpageid=nextpageid-1;
                }else{
                    nextpageid = parseInt(pageid)+1;
                }
                //var ppp=parseInt(pageid);
                //var char ="第"+(1)+"/"+(page)+"页";


                var prevUrl ="moneyctrl.html?pageid="+(prevpageid);
                var nextUrl ="moneyctrl.html?pageid="+(nextpageid);
                $(".page-prev").attr("href",prevUrl);
                $(".page-next").attr("href",nextUrl);

                //$("#dLabel").html(char+'<span class="caret"></span>');
                $(".dropdown-menu").html(pageLi);

            }
        });

    }
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = location.search.substr(1).match(reg);
        if (r != null) return unescape(decodeURI(r[2])); return null;
    }
})