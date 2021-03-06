//alert('测试一下');


//安装vue  axios  bootstrap
//index.html里引入 <script> vue axios bootstrap
//index.html里引入 <script> 百度地图api
//创建vue实例
//在vue的生命周期中添加外部api（百度地图）


/*
 *初始化实例vm
*/

var vm = new Vue({
	el: '#app' ,
	methods:{
		test(){
			alert('测试一下');
		},
	},
	//在生命函数里加入其他api并设置好
	mounted(){
		//创建map实例
		var map = new BMap.Map("mapBox")
		//创建坐标点
		var point1 = new BMap.Point(113.452174,23.37766);
		//初始化实例
		map.centerAndZoom(point1,15);
		
		//设置地图
		//开启鼠标滚轮
		map.enableScrollWheelZoom(true);
/***********************************************************/
		/*数组数据*/	
/***********************************************************/
		//坐标点数值数组
		//var coordinates = [];
		//覆盖物数组
		//var markers = [];

/***********************************************************/
		/*原始点覆盖物*/
/***********************************************************/
		//创建原始点覆盖物
		var marker1 = new BMap.Marker(point1);
		//添加到map
		map.addOverlay(marker1);


/***********************************************************/
		/*普通图文信息*/
/***********************************************************/
		//创建信息窗口
		var sContent=
		"<h4 style='margin:0 0 5px 0;padding:0.2em 0'>仲恺农业工程学院</h4>" + 
		"<img style='float:right;margin:4px' id='imgDemo' src='img/1.jpeg' width='139' height='104' title='你学校'/>" + 
		"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>广州市白云区钟落潭镇山卡拉大学</p>";
		//初始化信息窗口
		var infoWindow = new BMap.InfoWindow(sContent);
		//给覆盖物添加信息窗口事件
		marker1.addEventListener("mouseover",function(){
			this.openInfoWindow(infoWindow);
		});
		marker1.addEventListener("mouseout",function(){
			this.closeInfoWindow(infoWindow);
		});

/***********************************************************/
		/*自定义点覆盖物*/
/***********************************************************/
		//创建自定义点覆盖物
		//创建坐标点
		var me = new BMap.Point(113.433055,23.374381);
		//设置点覆盖物
		var myPointOverlay = new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/fox.gif",new BMap.Size(300,157));
		//初始化创建点覆盖物
		var marker2 = new BMap.Marker(me,{icon:myPointOverlay});	//利用点覆盖物传参，输入坐标和自定义点图标
		//添加自定义点覆盖物到map
		map.addOverlay(marker2);

/***********************************************************/
		/*百度地图引入外部搜索功能信息窗口api*/
/***********************************************************/
		//创建搜索信息框
		var searchContent = {
			title : "仲恺" ,
			width : 350 ,
			height : 105 ,
			panel : "panel" ,
			enableAutoPan : true ,
			searchTypes : [
				//需要在index中引入这些功能
				//否则会报错 BMAPLIB_TAB_SEARCH  is not defind
				BMAPLIB_TAB_SEARCH,   //周边检索
				BMAPLIB_TAB_TO_HERE,  //到这里去
				BMAPLIB_TAB_FROM_HERE //从这里出发
			] ,
		};
		//初始化搜索信息框
		var searchInfoWindow = new BMapLib.SearchInfoWindow(map,sContent,searchContent);
		//添加双击事件
		marker1.addEventListener("click",function(){
			searchInfoWindow.open(marker1);
		});
/***********************************************************/
		/*鼠标事件*/
/***********************************************************/


/***********************************************************/
		/*地图界面右键菜单*/
/***********************************************************/

		//右键菜单的callback函数(一定要在设置菜单内容的上面)
		var addSomeOverlay = function(e){
			//循环右键添加的覆盖物的次数
			for(var i=0; i < vm.markers.length; i++){
				//添加原始点覆盖物到map
				map.addOverlay(vm.markers[i]);	
			}
		};

		//设置菜单内容（对象数组）
		var txtMenuItem = [
		{
			text : "添加",
			callback : addSomeOverlay,		//添加点覆盖物的方法
		},
		{
			text : "编辑",
			callback : function(){alert("编译信息窗口内容")},
		}
		];
		//创建页面的右键菜单
		var mapMenu = new BMap.ContextMenu();
		//循环把信息添加添加进菜单
		for(let i=0; i < txtMenuItem.length; i++){
			mapMenu.addItem(new BMap.MenuItem(txtMenuItem[i].text,txtMenuItem[i].callback,100));
		}
		//使用事件监听器，打开右键菜单
		//并把坐标点和覆盖物传入对象数组
		map.addEventListener("rightclick",function(e){
			//使用百度地图内置api的事件对象的方法，判断点击的是覆盖物还是地图
			if(e.overlay){
				console.log('右键点击的是覆盖物，此次点击不会创建坐标数据');
				/***********************************************************/
				/*覆盖物右键菜单*/
				/*(给用户添加的覆盖物添加右键菜单失败，使用到异步？生命周期？)*/
				/*给后台定义的覆盖物添加点击事件，修改data中show值也会undefined，使用到生命周期？*/
				/*为什么csn那篇东西里会不使用到其他的生命周期....辣鸡*/
				/***********************************************************/
/*
				//右键添加、移除、编辑点覆盖物
				//创建右键菜单
				var markerMenu = new BMap.ContextMenu();
				//设置菜单(1、设置点击选中菜单某项时执行的方法 2、添加进右键菜单栏)
				var removeMarker = function(e,ee,marker1){
					map.removeOverlay(marker1);		//删除覆盖物函数
				};
				var addMyMarker = function(){
					console.log(vm.test);
					alert('测试一下');
				};
				
				var writeNewInfo = function(){
					alert(vm.msg);
					//创建信息窗口
					var writeSomething=
					"<h4 style='margin:0 0 5px 0;padding:0.2em 0'>添加新内容</h4>" + 
					"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>快！写tm的</p>" +
					"<input type='text'/>";
					//初始化信息窗口
					var writeInfoWindow = new BMap.InfoWindow(writeSomething);
					//给覆盖物添加信息窗口事件
					marker1.openInfoWindow(writeInfoWindow);
				};
				markerMenu.addItem(new BMap.MenuItem('删除',removeMarker.bind(marker1)) );
				markerMenu.addItem(new BMap.MenuItem('添加',addMyMarker) );		
				markerMenu.addItem(new BMap.MenuItem('编辑',writeNewInfo) );	
				//markerMenu.addItem(new BMap.MenuItem('测试',vm.test) );	
*/
				//右键菜单添加到覆盖物上
				/*for(let i = 0 ; i < vm.markers.length ; i++){
					vm.markers[i].addContextMenu(markerMenu);
					console.log(markers[i]);
				};*/
				/*marker1.addContextMenu(markerMenu);*/
			}else{
						this.addContextMenu(mapMenu);		//右键事件监听器，添加右键
						//alert(e.point.lng + "," + e.point.lat);
						vm.coordinates.push({						//获取右键点击的坐标
							lng : e.point.lng,
							lat : e.point.lat,
						});
						vm.markers.push(new BMap.Marker(new BMap.Point(e.point.lng,e.point.lat)));
					}
				});



				/*
				 *把数据数组化
				 *	1、点坐标points
				 *	2、覆盖物markers
				 *循环遍历，实现多个数值和操作
				 *	for来添加事件监听器
				 *信息窗口对象数组化
				 *	1、参数（坐标、内容--标题 正文 图片）
				 *右键编辑
				 *	1、显示input输入框
				 *	2、上传信息到对象数组push
				 *
				 *watch监控marker数组数据的变化，实现即时添加方法。
				 *	1、右键菜单（删除、编辑、信息窗口）
				 *	2、单击，路线搜寻
				 *
				 *以上完成
				 *编辑数据库，并接上
				*/



	},
	data:{
		msg:'测试一下',

		coordinates:[],
		markers:[],
		in_show:false,
		markerMsg:[
			
		],
		remenber:'',	//用于存放右键点击覆盖物添加信息时，存下点击覆盖物的坐标信息
		remenberIndex:0,

	},
	computed:{


	},
	methods:{
		//按钮提交事件
		commitMsg(){
			var intTitle = document.getElementById('intTitle');
			var intContent = document.getElementById('intContent');

			//获取输入狂中的内容push给相应的数据库中
			vm.markerMsg.push({
				title:intTitle.value,
				content:intContent.value,
				lngMsg:vm.remenber.point.lng,
				latMsg:vm.remenber.point.lat,
			});
			vm.remenber='';	//清空掉这个暂存坐标信息
		},
	},
	//在mouned生命周期里，无法像data那样直接使用vm.function，而控制台看vm这个对象时能看到function是直接挂载在了vm对象上的
	//直接赋值也会undefined，但是在function里却能console出来，简直神奇，也就是能看不能用？？？用return也不能跑这里的function
	watch:{
		markers:{
			handler(){
				console.log(this.markers);				
				/***********************************************************/
				//鼠标事件，覆盖添加打开信息窗口
				//因为在watch监控器里，所以当数据没有发生变化的时候，内容无法刷新
				var mouseoverEseay = this.markers[this.markers.length-1].getPosition();
				var inputSomething1=
					"<h4 style='margin:0 0 5px 0;padding:0.2em 0'>当前坐标是"+
					mouseoverEseay.lng+
					"，"+
					mouseoverEseay.lat+
					"</h4>";
				var inputInfoWindow = new BMap.InfoWindow(inputSomething1);
				//鼠标覆盖打开信息窗口，先判断是否打开了右键输入窗口
				//获取当前覆盖物坐标进行判断
				this.markers[this.markers.length-1].addEventListener("mouseover",function(){
					this.openInfoWindow(inputInfoWindow);
				});
				//给点添加鼠标事件
				this.markers[this.markers.length-1].addEventListener("mouseout",function(){
					this.closeInfoWindow(inputInfoWindow);
					//vm.markers.my='';
					//vm.remenberIndex = 0;
				});	
				/***********************************************************/
				//右键添加菜单
				//创建右键菜单
				var inputMenu = new BMap.ContextMenu();
				//设置右键菜单方法和内容
				var inputNewInfo = function(e,ee,marker){
					//创建信息窗口
					var inputSomething2=
					"<h4 style='margin:0 0 5px 0;padding:0.2em 0'>右键，添加新内容</h4>" + 
					"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>快！鼠标点击了右键，写tm的</p>" +
					"输入标题：<input type='text' id='intTitle'/>"+
					"</br>"+
					"输入内容：<input type='text' id='intContent'/>"+
					"</br>"+
					"<button onclick='vm.commitMsg()'>添加</button>";
					//把当前覆盖物的坐标存起来
					vm.remenber = marker;

					//初始化信息窗口
					var rinputInfoWindow = new BMap.InfoWindow(inputSomething2);
					//给覆盖物添加信息窗口事件
					marker.openInfoWindow(rinputInfoWindow);


				};
				//使用if判断当前覆盖物是否有数据，有就菜单有编辑删除等功能
				inputMenu.addItem(new BMap.MenuItem('监控添加',inputNewInfo) );
				this.markers[this.markers.length-1].addContextMenu(inputMenu);
							
			},	
		},
		markerMsg:{
			handler(){
				/***********************************************************/
				//鼠标事件，覆盖添加打开信息窗口
				//因为在watch监控器里，所以当数据没有发生变化的时候，内容无法刷新
				//console.log(vm.inputSomething);
					var inputSomething = "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>"+
								vm.markerMsg[vm.remenberIndex].title+"</h4>" + 
								"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>"+
								vm.markerMsg[vm.remenberIndex].content+
								"</p>" ;
				var inputInfoWindow = new BMap.InfoWindow(inputSomething);
				
				//鼠标覆盖打开信息窗口，先判断是否打开了右键输入窗口
				//获取当前覆盖物坐标进行判断
				this.markers[this.markerMsg.length-1].addEventListener("mouseover",function(){
					//vm.markers.my='1';
					
					//获取覆盖物坐标，不能用鼠标事件对象的e，这个事件对象不是覆盖物的
					var mouseoverMsg = this.getPosition();
					var thisMouseOver = vm.markers.findIndex(function(item,index){
						return item.point.lng==mouseoverMsg.lng;
					});

					vm.remenberIndex = thisMouseOver+1;
					console.log(thisMouseOver);
					console.log(inputSomething);
					this.openInfoWindow(inputInfoWindow);
				});

				//给点添加鼠标事件
				this.markers[0].addEventListener("mouseout",function(){
					this.closeInfoWindow(inputInfoWindow);
					//vm.markers.my='';
					//vm.remenberIndex = 0;
				});	
			},
			deep:true
		},

	},
})