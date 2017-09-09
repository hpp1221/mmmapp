$(function(){
	getCategory();
	function getCategory(){
		$.ajax({
		url:"http://182.254.146.100:3000/api/getcategorytitle",
		json:"jsonp",
		success:function(data){
			console.log(data);
			var html = template("categoryTitleTmp",data);
			$("#category").html(html);

			$(".panel-group>.panel-default>.panel-heading>h4>a").click(function(){
				var titleid= $(this).attr("data-titleid");
				$.ajax({
					url:"http://182.254.146.100:3000/api/getcategory",
					json:"jsonp",
					data:{"titleid":titleid},
					success:function(data){
						console.log(data);
						var innerHTML= template("categoryTmp",data);
						var xzq="#"+titleid+" .panel-body .row";
						$(xzq).html(innerHTML);
					}
				});
			})
		}
	});
	}
})