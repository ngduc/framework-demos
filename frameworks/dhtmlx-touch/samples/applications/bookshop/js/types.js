/**Store Tab**/

/*Featured products*/
dhx.Type(dhx.ui.pagelist, {
	name:"Featured",
	height:257,
	width:157,
	margin:0,
	padding:0,
	template:function(obj){
		return "<div class='tmp_products'><img class='tmp_products_img' src='"+window.getImage(obj)+"'><div class='tmp_products_title'><div class='price'>$ "+obj.price+"</div></div></div>";
	}
});


function booksTemplate(obj,arrow){
	var html = '<div class="book_img_cont""><img class="book_img" src="'+window.getImage(obj)+'"/></div>';
	html += '<div class="book_info">';
	html += '<div class="book_title">"'+obj.title+'"</div>';
	html += '<div class="book_author">by '+obj.author+'</div>';
	html += '<div class="book_price">Price: ';
	if(obj.oldprice)
			html += '<div class="book_old_price_in">$ '+obj.oldprice+'</div>';
	html += '<div class="book_price_in">$ '+obj.price+'</div>';
	html += '</div>';
	html += '</div>';
	if(arrow)
		html += '<div class="item_arrow"></div>';
	return html;

}
/*Hot deals*/
var booksType = {
	name:"Books",
	height:140,
	//width:"auto",
	margin:0,
	padding:0,
	css:"books",
	template:function(obj){
		var html = '<div class="book_img_cont""><img class="book_img" src="'+window.getImage(obj)+'"/></div>';
		html += '<div class="book_info">';
		html += '<div class="book_title">"'+obj.title+'"</div>';
		html += '<div class="book_author">by '+obj.author+'</div>';
		html += '<div class="book_price">Price: ';
		if(obj.oldprice)
				html += '<div class="book_old_price_in">$ '+obj.oldprice+'</div>';
		html += '<div class="book_price_in">$ '+obj.price+'</div>';
		html += '</div>';
		html += '</div>';
		html += '<div class="item_arrow"></div>';
		return html;
	}
};

dhx.Type(dhx.ui.pagelist,booksType);
dhx.Type(dhx.ui.list,booksType );
/*Cart*/
dhx.protoUI({
	name:"activeList"
}, dhx.ui.list, dhx.ActiveContent);

dhx.Type(dhx.ui.list, {
	name:"Cart",
	padding:3,
	height:140,
	margin:0,
	css:"cart",
	width:"auto",
	template:function(obj,common){
		var html = '<div class="book_img_cont""><img class="book_img" src="'+window.getImage(obj)+'"/></div>';
		html += '<div class="book_info">';
		html += '<div class="book_title">"'+obj.title+'"</div>';
		html += '<div class="book_author">by '+obj.author+'</div>';
		html += '<div class="book_price">';
		if(obj.oldprice)
				html += '<div class="book_old_price_in">$ '+obj.oldprice+'</div>';
		html += '<div class="book_price_in">$ '+obj.price+'</div>';
		html += common.count(obj,common);
		html += '</div>';
		html += '</div>';
		return html;
	}
});

dhx.Type(dhx.ui.list, {
	name:"Genres",
	template:"#genre#",
	css:"genre",
	height:32
});

dhx.Type(dhx.ui.list, {
	name:"GenresBooks",
	template:"#title# #author#",
	css:"genre_book"
});