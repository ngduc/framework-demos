/*Shows toolbar batch*/
function showToolbarBatch(button,option){
	if(arguments.length==1)
		option = button;
	if(option=="cart" && !$$("cart").dataCount())
		dhx.delay($$("topBar").showBatch,$$("topBar"),["empty_cart"],250);
	else{
		dhx.delay($$("topBar").showBatch,$$("topBar"),[option],250);
		if(option=="store"){
			var topActiveOption = $$("tabs").getValue();
			$$(topActiveOption).show();
		}
	}
}
/* Show 'Selected Book' view*/
function showDescription(id,title){
	var data = this.item(id);
	$$("bookInfo").data = dhx.copy(data);
	$$("bookInfo").refresh();
	$$("bookDescription").define("src","data/description/"+id+".txt");
	showToolbarBatch("back");
    $$("selectedBook").show();
	$$("viewname").setValue(title);
	return true;
}

/*Adds book to cart*/
function addToCart(){
	var order = $$("bookInfo").data;
	if($$("cart").item(order.id)){
		dhx.alert({
			height:231,
			width:250,
			css:"alert",
			title:order.title,
			message:"The book is aleardy  <br/> in the cart!"
		});
	}else{
		order.count = 1;
		$$("cart").add(order);
	}
	$$("cart").show();
	$$("bottomTabbar").define("selected","cart");
	$$("bottomTabbar").refresh();
	showToolbarBatch("cart");
}
/*Calculates the total price of an order*/
function getTotal(){
	var totalPrice = 0;
	var totalCount = 0;
	this.each(function(item){
		totalPrice += item.count * parseFloat(item.price);
		totalCount += item.count;
	});
	if(totalCount)
		$$("total").setValue(totalCount+" book"+(totalCount==1?"":"s")+", $ "+Math.round(totalPrice*100)/100);
	showToolbarBatch("","cart");
}

/*Order confirmation*/
 function showOrderConfirm(){
	var data = {};
	data.title ="Saving Order";
	data.message = "Do you want to save<br/> the order?";
	data.callback = function(result) {
		if (result) 
			$$('cart').clearAll();
	};
	showConfirm(data);
}

/*Remove confirmation*/
function showRemoveConfirm(id){
	var data = {};
	data.title ="The Last Item";
	data.message = "Do you want to remove<br/> the book from<br/> the order?";
	data.callback = function(result) {
		if (result) 
			$$('cart').remove(id);
		else{
			$$('cart').item(id).count = 1;
			$$('cart').refresh(id);
		}
	};
	showConfirm(data);
}

/*displays confirm window*/
function showConfirm(args){
	dhx.confirm({
		height:231,
		width:250,
		title: args.title,
		css:"confirm",
		message: args.message,
		labelOk:"Yes",
		labelCancel:"No",
		callback:args.callback
	});
}

function getImage(obj){
	return "data/imgs/"+obj.category.replace(/\'./,"")+"/"+obj.id+".jpg";
}

