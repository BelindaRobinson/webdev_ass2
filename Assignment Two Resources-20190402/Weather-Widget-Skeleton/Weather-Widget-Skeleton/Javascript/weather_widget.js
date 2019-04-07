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

		sortbycity		:	null,
		sortbymax		:	null,
		cityentry		:	null,
		cityfind		:	null,
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
		_ui.cityentry = document.createElement("input");
		_ui.cityentry.type = "text";
		_ui.cityentry.size = 22;
		
		_ui.cityfind = document.createElement("button");
		_ui.cityfind.innerHTML = "Search";
		_ui.cityfint.onclick = function() {
			_addcityname(_ui.cityentry.value);
			_ui.cityentry.value = "";
		}

		_ui.sortbycity = document.createElement("button");
		_ui.sortbycity.innerHTML = "Sort by City";
		_ui.sortbycity.onclick = function() {
			_dosort(1);
		}

		_ui.sortbymax = document.createElement("button");
		_ui.sortbymax.innerHTML = "Sort by Max";
		_ui.sortbymax.onclick = function() {
			_dosort(0);
		}

		_ui.toolbar.appendChild(_ui.cityentry);
		_ui.toolbar.appendChild(_ui.cityfind);
		_ui.toolbar.appendChild(_ui.sortbycity);
		_ui.toolbar.appendChild(_ui.sortbymax);

		_ui.list = document.createElement("div");

		_ui.container.appendChild(_ui.titlebar);
		_ui.container.appendChild(_ui.toolbar);
		_ui.container.appendChild(_ui.list);
	}

	var _addnewcity = function(city){
		for(i = 0; 1< _list.length; i++) {
			if(city == _list(i).getcity()) {
				alert("already ther");
				return;
			}
		}
		_request = new XMLHttpRequest();
		var url = "php/weather.php?location=" + location; // needs changing
		_request.open("GET", url, true);
		_request.onreadystatechange - _addnewcitylistitem;
		_request.send(city);
	}

	var _addnewcitylistitem = function(){
		if (_request.readyState == 4){
			if (_request.readyState == 200) {
				var data = JSON.parse(_request.responseText);
				if(data.length == 0){
					alert("no such city");
					return;
				}
				var a = data[0].name;				
				var b = data[0].minitemp;
				var c = data[0].maxtemp;n

				var witem = new weatherdata(a,b,c);
				_list.push(witem);
				_refreshlist();
			}
		}
	}

	var _refreshlist = function() {
		if(_ui.list == null)
			return;
		while(_ui.list.haschildnodes()){
			_ui.list.removechild(_ui.list.lastchild);			
		}

		if(_currentsortorder == 1){
			_list.sort(_citysort);
		}	else {
			_list.sort(_maxsort);
		}

		for(var i = 0; i < _list.length; i++){
			var wline = _list[i];
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

	var _maxsort = function(a,b){
		return a.getmax() - b.getmax();
	}

	var _citysort = function(a,b){
		return a.getcity() - b.getcity();
	}

	var _weathersort = function(a,b){
		if(a.getcity() > b.getcity())
			return 1;
		else if (a.getcity() < b.getcity())
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
	
	var weatherdate = function(location, minitemp, maxtemp){

		var _location = location;		
		var _minitemp = minitemp;
		var _maxtemp = maxtemp;

		var _ui = {
			dom_element		:	null,
			location_label	:	null,
			outlock_label	:	null,			
		};

		var _createUI = function(){

			_ui.dom_element = document.createElement("div");
			_ui.dom_element.classname = "slection";
			_ui.city_label = docunment.createElement("span");
			_ui.city_label.innerHTML = _city + " ";
			_ui.city_label.classname = "section_label";
			_ui.max_label = document.createElement("span");
			_ui.max_label.innerHTML = _max + " ";
			_ui.max_label.classname = "numeric";

			_ui.dom_element.appendChild(_ui.city_label);
			_ui.dom_element.appendChild(_ui.max_label);
		};

		this.getDomElement = function(){
			return _ui.dom_element;
		}

		this.getcity = function(){
			return _city;
		}	

		this.getminitemp = function(){
			return _minitemp;
		}

		this.getmax = function(){
			return _max;
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
	 
	 