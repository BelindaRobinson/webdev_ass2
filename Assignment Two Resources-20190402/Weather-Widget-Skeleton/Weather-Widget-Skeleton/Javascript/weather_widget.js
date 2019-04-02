/*
 * Constructor function for a WeatherWidget instance.
 * 
 * container_element : a DOM element inside which the widget will place its UI
 *
 */
 
function WeatherWidget(container_element){

	var _list = [];
	var _request ;
	var _currentsortorder = 1;

	var _ui = {

		sortbylocation	:	null,
		sortbyid		:	null,
		nameentry		:	null,
		namefind		:	null,
		container		:	null,
		titlebar		:	null,
		toolbar			:	null,
		list 			: 	null,	

	};

	var _createUI = function(){
		
		_ui.container = container_element;
		_ui.container.classname = "monitor";
		_ui.titlebar = document.createElement("div");
		_ui.titlebar.classname = "title";
		_ui.titlebar.label = document.createElement("span");
		_ui.titlebar.label.innerHTML = "name";
		_ui.titlebar.appendChild(_ui.titlebar.label);

		_ui.toolbar = document.createElement("div");
		_ui.nameentry = document.createElement("input");

		_ui.namefind = document.createElement("button");

		_ui.sortbylocation = document.createElement("button");

		_ui.sortbyid = document.createElement("button");

		_ui.toolbar.appendChild(_ui.nameentry);

		_ui.list = document.createElement("div");

		_ui.container.appendChild(_ui.titlebar);
		_ui.container.appendChild(_ui.toolbar);
		_ui.container.appendChild(_ui.list);
	}

	var _addnewname = function(location){
		_request = new XMLHttpRequest();
		var url = "php/weather.php?location=" + location;
	}

	var _addnewweatherlistitem = function(){
		if (_request.readyState == 4){
			if (_request.readyState == 200) {
				var data = JSON.parse(_request.responseText);
				if(data.length == 0){
					alert("location not vaild");
					return;
				}
				var a = data[0].name;
				var b = data[0].outlock;
				var c = data[0].minitemp;
				var d = data[0].maxtemp;

				var item = new weatherdate(a,b,c,d);
				_list.push(item);
				_refreshweatherlist();
			}
		}
	}

	var _refreshweatherlist = function() {
		if(_ui.list == null)
			return;
		while(_ui.list.haschildnodes()){
			_ui.list.removechild(_ui.list.lastchild);
		}

		if(_currentsortorder == 1){
			_list.sort(_locationsort);
		}	else {
			_list.sort(_currentsort);
		}

		for(var i = 0; i < _list.length; i++){
			var line = _list[i];
			_ui.list.appendChild(line.getDomElement());
		}

	}

	var _dosort = function(sortby){
		if(sortby == 1){
			_currentsortorder = 1;
		}
		else {
			_currentsortorder = 0;
		}

		_refreshweatherlist();
	}

	var _locationsort = function(a,b){
		return a.getlocation() - b.getlocation();
	}

	var _currentsort = function(a,b){
		if(a.getcurrent() > b.getcurrent())
			return 1;
		else if (a.getcurrent() < b.getcurrent())
			return -1;
		else
			return 0;
	}
	//declare the data properties of the object 

	/**
		//declare an inner object literal to represent the widget's UI
		//write a function to create and configure the DOM elements for the UI
		var _createUI = function(container){S
		
		}
	*/
	
	
	//add any other methods required for the functionality
	
	 
	 /**
	  * private method to intialise the widget's UI on start up
	  * this method is complete
	  */
	  var _initialise = function(container_element){
	  	_createUI(container_element);
	  	}
	  	
	  	_initialise(container_element);
	/*********************************************************
	* Constructor Function for the inner WLine object to hold the 
	* full weather data for a town
	********************************************************/
	
	var weatherdate = function(location, outlock, minitemp, maxtemp){

		var _location = location;
		var _outlock = outlock;
		var _minitemp = minitemp;
		var _maxtemp = maxtemp;

		var _ui = {
			dom_element		:	null,
			location_label	:	null,
			outlock_label	:	null,			
		};

		var _createUI = function(){
			_ui.dom_element = document.createElement("div");

			_ui.dom_element.appendChild(_ui.location_label);
			_ui.dom_element.appendChild(_ui.phone_label);
		};

		this.getDomElement = function(){
			return _ui.dom_element;
		}

		this.getlocation = function(){
			return _location;
		}

		this.getoutlock = function(){
			return _outlock;
		}

		this.getminitemp = function(){
			return _minitemp;
		}

		this.getmaxtemp = function(){
			return _maxtemp;
		}

		_createUI();

		
		//_request = new XMLHttpRequest();
		//var url = "php/weather.php?location=" + location;
		
		//declare the data properties for the object
		
		//declare an inner object literal to represent the widget's UI


		//write a function to create and configure the DOM elements for the UI
		//var _createUI = function(container){
		
		//}
		
		//Add any remaining functions you need for the object
	
		//_createUI() method is called when the object is instantiated
		//_createUI();


	 
  	};  //this is the end of the constructor function for the WLine object 
	
	
	//  _initialise method is called when a WeatherWidget object is instantiated
	// _initialise(container_element);
}
	 
//end of constructor function for WeatherWidget 	 
	 
	 