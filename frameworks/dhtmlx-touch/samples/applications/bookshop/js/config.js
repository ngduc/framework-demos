var animateTop = {
		type:"slide",
		subtype:"out",
		direction:"top"
};
var animateBottom = {
		type:"slide",
		subtype:"out",
		direction:"bottom"
};
/*"storeViews" multiview -> "Featured products" view*/
var productsView = {
	id:"storeProducts",
	css: "treeBG",
	type:"clean",
	//animate:animateBottom,
	rows:[
		{
			template:"",
			css:"transparent",
			height:20
		},
		{
			/*pagelist with products list*/
			id:"featuredProdList",
			height:260,
			view:"pagelist",
			/*url:"data/products.json",
			datatype:"json",*/
			type:"Featured",
			scrollOffset:82 /*to stop scroll with 50px from the left edge of an item*/
		},
		{
			css:"transparent"
		}
		/*
		{
			//toolbar with "Brands label"
			view:"toolbar",
			css:"authors",
			height:38,
			elements:[{ view:"label",align:"center", label:"Authors"}]
		},
		{
			//pagelist with brands list
			id:"authors",
			view:"pagelist",
			layout:"x",
			type:"Authors",
			css:"",
			scrollOffset:40
		}*/
	]
};
/*"storeViews" multiview -> "Hot deals" view*/
var specialsView = {
	id:"storeHotDeals",
	css: "basicBG",
	view:"pagelist",
	scroll:"y",
	/*url:"data/books_specials.json",
	datatype:"json",*/
	type:"Books",
	//animate:animateBottom,
	scrollOffset:30 /*to stop scroll with 30px from the top edge of an item*/
};
/*"storeViews" multiview -> "Categories" view*/
var categoriesView = {
	id:"storeGenres",
	view:"list",
	/*url:"data/genres.json",
	datatype:"json",*/
	css:"basicBG categories",
	//animate:animateBottom,
	type:"Genres"
};
/*"storeViews" multiview -> "Categories" view*/
var categoriesBooksView = {
	id:"storeGenresBooks",
	view:"list",
	/*url:"data/genres.json",
	datatype:"json",*/
	css:"basicBG categories",
	type:"Books"
};
/* Selected Book view*/
dhx.protoUI({
	name:"activeTemplate"
}, dhx.ActiveContent, dhx.ui.template);

var bookView =  {
	id:"selectedBook",
	css:"basicBG",
	//animate:animateBottom,
	rows:[
		{
			id:"bookInfo",
			view:"activeTemplate",
			height:140,
			css:"transparent book_template",
			activeContent:{
				buybutton:{
					id:"buybutton",
					view:"button",
					width:125,
					height:32,
					css:"buy_button transparent",
					label:"Add to cart",
					click:"addToCart()"
				}
			},
			template:function(obj,common){
				var html = '<div class="book_img_cont""><img class="book_img" src="'+window.getImage(obj)+'"/></div>';
				html += '<div class="book_info_tmp">';
				html += '<div class="book_title">"'+obj.title+'"</div>';
				html += '<div class="book_author">by '+obj.author+'</div>';
				html += '<div class="book_price_tmp">Price: ';
				if(obj.old_price)
						html += '<div class="book_old_price_in">$ '+obj.oldprice+'</div>';
				html += '<div class="book_price_in">$ '+obj.price+'</div>';
				html += '</div>';
				html += common.buybutton(obj,common);
				html += '</div>';
				return html;
			}
		},
		{
			id:"bookDescription",
			view:"template",
			css:"transparent shadow description",
			scroll:"y"
		}
	]
};

/*"mainViews" -> "Store" view*/
var storeView = {
	id:"store",
	//animate:animateTop,
	/*"storeTabbar" tabbar*/
	view:"multiview",
	cells:[
		specialsView,
		productsView,
		categoriesView,
		categoriesBooksView,
		bookView
	]
};



/*Account view*/
dhx.rules.isEmail=function(value){
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(value);
};
 
var accountView =  {
	id:"account",
	view:"form",
	css:"treeBG account",
	//animate:animateTop,
	elements:[
		{ view:"label", label:"Name",height:28,css:"top"},
		{ view:"input",  id:"name",height:48,inputWidth:290},
		{ view:"label", label:"E-mail *",height:23},
		{ view:"input", id:"email",height:48,inputWidth:290},
		{ view:"label", label:"Password *",height:23},
		{ view:"input",type:"password", id:"password",height:48,inputWidth:290}/*,
		{ view:"label", label:"Phone",height:23},
		{ view:"input", id:"phone",height:48,inputWidth:290},*/,
		{ view:"button", type:"form",label:"Sign In", click:"$$('account').validate()",inputWidth:170,align:"center"}
	],
	rules:{
		email : dhx.rules.isEmail,
		password : dhx.rules.isNotEmpty
	}
};

/*Cart view*/
var cartView = {
	view: "activeList",
	//animate:animateTop,
	id:"cart",
	css:"basicBG",
	datatype:"json",
	activeContent:{
       count:{
            view:"counter",
			id:"countButton",
			css:"cart_counter transparent",
            min:0, 
			max:10,
            width:90,
			earlyInit:true
       }
    },
	type:"Cart"
};

/*top-level multiview - "mainViews"*/
var mainViews = { 
	view:"multiview",
	id:"mainViews",
	cells:[ 
		storeView,
		cartView,
		accountView
    ]
};
/*main layout configuration*/
var config = {
	//container:"appBox",
	rows:[
		{ 	
		 /*"mainBar" toolbar*/
			view: "toolbar", 
			height:43,
			id: "topBar",
			css: "topBar", 
			visibleBatch:"store",
			elements:[
				{ view:"segmented", id:"tabs",multiview:true, selected:"storeProducts",batch:"store", options:[
			   		{value:"storeHotDeals", label:"Hot Deals"},
		       		{value:"storeProducts", label:"Featured Products"},
		       		{value:"storeGenres", label:"Genres"}
				]},
				{view:"button", id:"back", css:"back",batch:"back",value:"Back",width:60},
				{ view:"label", css:"title",id:"viewname",batch:"back"},
				{ view:"label", label:"",width:50,batch:"back"},
				{ view:"label", label:"&nbsp;Total: ",batch:"cart",width:57},
				{ view:"label", id:"total",batch:"cart",align:"left"},
				{ view:"button",id:"buy",value:"Buy it now",width:100,batch:"cart",click:"showOrderConfirm()"},
				{ view:"label", css:"title", batch:"empty_cart",label:"Cart"},
				{ view:"label", css:"title", label:"Account",batch:"account"}
			]
		},
		mainViews,
		{ 	
		 /*"mainBar" toolbar*/
			view: "toolbar", 
			height:50,
			id: "bottomBar",
			css: "mainBar", 
			elements:[{ view: "tabbar", id:'bottomTabbar',selected: 'store',multiview:true, align:"center",inputWidth:320, options: [   
			          {src: 'images/store.png',srcSelected:"images/store_active.png",  value: 'store',  label: 'Store'},
					  { src: 'images/cart.png',srcSelected:"images/cart_active.png", value: 'cart',  label: 'Cart'},
			          { src: 'images/account.png',srcSelected:"images/account_active.png", value: 'account',  label: 'Account'}
			      ]
			}]
		}
	]
};
/*scrolls the view to the center*/
function scrollToCenter(){
	var count,itemSize,layout,scroll,x,y;
	count = this.dataCount();
	layout = this.config.layout;
	itemSize = (layout=="y"?this.type.height:this.type.width);
	scroll = count*itemSize/2+itemSize/2;
	x = (layout=="y"?0:scroll);
	y = (layout=="y"?scroll:0);
	this.scrollTo(x,y);
}
