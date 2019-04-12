/*
 * Constructor function for a WeatherWidget instance.
 * 
 * container_element : a DOM element inside which the widget will place its UI
 *
 */
 
function WeatherWidget(container_element){

	//declare the data properties of the object 


	var _list = [];  		// an array of the cities available for selection
	var _request;     		// the XHR request object
	var _sortOrder = 1;		// the sort order for the array contents
	
	var _widgetUI = { 	// an inner object literal representing the widgit's UI

		selectTown 	: 	null,    // a drop down list of cities
		sortByTown 	: 	null,    // a radio button to select a sort parameter
		sortByTemp 	: 	null, 	 // a radio button to select a sort parameter
		container 	: 	null,    // a container for all of the UI elements 
		titlebar 	: 	null, 	 // a div to organise UI elements
		toolbar 	: 	null, 	 // a div to organise UI elements
		UI_list 	: 	null,    // the div to hold the widget object UIs

	};

	
		//write a function to create and configure the DOM elements for the UI
		var _createUI = function(container_element){
		
			console.log("_createUI");
			_widgetUI.container = container_element;
			_widgetUI.container.className = "monitor";

			_widgetUI.titlebar = document.createElement("div");
			_widgetUI.titlebar.className = "title";
			_widgetUI.titlebar.label = document.createElement("span");
			_widgetUI.titlebar.label.innerHTML = "Select Town:";
			_widgetUI.titlebar.appendChild(_widgetUI.titlebar.label);
			
			_widgetUI.toolbar = document.createElement("div");
			_widgetUI.toolbar.label = document.createElement("span");
			_widgetUI.toolbar.label.innerHTML = "Sort by", "town", "Max temp";
			_widgetUI.toolbar.appendChild(_widgetUI.toolbar.label);

			_widgetUI.UI_list = document.createElement("div");
			_widgetUI.UI_list.className = "list";

			_widgetUI.selectTown = document.createElement("select");
			selectOption = document.createElement("option");
			selectOption.value = "select";
			selectOption.innerHTML = "Select Town";
			_widgetUI.selectTown.appendChild(selectOption);
			selectionForm = document.createElement("form");
			_widgetUI.sortByTown = document.createElement("input");
			_widgetUI.sortByTown.type = "radio";
			_widgetUI.sortByTown.name = "sorter";
			selectionForm.appendChild(_widgetUI.sortByTown);
			_widgetUI.sortByTemp = document.createElement("input");
			_widgetUI.sortByTemp.type ="radio";
			_widgetUI.sortByTemp.name = "sorter";
			selectionForm.appendChild(_widgetUI.sortByTemp);

			_widgetUI.titlebar.appendChild(_widgetUI.selectTown);
			_widgetUI.toolbar.appendChild(selectionForm);


			// adding the three components to the _widgetUI container
			_widgetUI.container.appendChild(_widgetUI.titlebar);
			_widgetUI.container.appendChild(_widgetUI.toolbar);
			_widgetUI.container.appendChild(_widgetUI.UI_list);

		}
	
	
		//add any other methods required for the functionality
	

		var _addNewWeather = function(weatherUpdate){


		//otherwise make an AJAX request
		_request = new XMLHttpRequest();
		var url = "php/getWeatherInfo.php?weather=" + weatherUpdate;
		//  etc. usual AJAX setup and send
	}
	
	/**
	 *  AJAX Callback function 
	 *  Checks if data was returned
	 *  if yes then create a new WeatherData item with the data and add to _list array
	 *  calls _updateWeatherData to update the UI display with the new data
	 */
	 	var _addNewWeatherData = function(){
		
			if (_request.readyState == 4) {
				if (_request.status == 200) {
					var data = JSON.parse(_request.responseText);
					if(data.length == 0){
						alert("No weather data");
						return;
					}
					var t = data[0].wtown;
					var o = data[0].woutlook;
					var n = data[0].wmin;
					var x = data[0].wmax;
				
					var witem = new Wdata(t,o,n,x); 	//create a Wdata instance
					_list.push(witem);   		//add it to the _list array
					_updateWeatherData();  	//refresh the UI display on the page

				}
			}
		}
		

	 
	 	var _updateWeatherData = function() {
	 		//first remove all child nodes of the WidgetUI.list div
	 		if(_widgetUI.list == null)
	 			return;
	 		while(_widgetUI.list.hasChildNodes()){
	 			_widgetUI.list.removeChild(_widgetUI.list.lastChild);
	 		}
		 
		//make sure the data is correctly sorted

			if(_sortOrder == 1){
	 			_list.sort(_townSort);
	 		} else {
	 			_list.sort(_tempSort);
	 		}
	 	
	 	//add all items back to the UI
	 		for(var i = 0; i < _list.length; i++){
	 			var wdata = _list[i];
	 			_widgetUI.list.appendChild(wdata.getDomElement());
	 		}
	 	} 


		 var _doSort = function(sortBy){
			if(sortBy == 1){
			_sortOrder = 1;	 	
			}
			else{
				_sortOrder = 0;
			}
				_updateWeatherData();
		}
		
		/**
		 *  Comparator functions for sorting phonelist items
		 */	  
	   
	   
	   var _townSort = function(a,b){
		   return a.getTown() - b.getTown();
	   }
	   
	   var _tempSort = function(a, b){
		   if(a.getTemp() > b.getTemp())
			   return 1;
		   else if (a.getTemp() < b.getTemp())
			   return -1;
		   else
			   return 0;
		   }
   


	 
	 /**
	  * private method to intialise the widget's UI on start up
	  * this method is complete
	  */
	  var _initialise = function(container_element){
	  	_createUI(container_element);
	  	}
	  	
	 	//  _initialise method is called when a WeatherWidget object is instantiated
		 _initialise(container_element);
		}
			 
	/*********************************************************
	* Constructor Function for the inner Wdata object to hold the 
	* full weather data for a town
	********************************************************/
	
	var Wdata = function(wtown, woutlook, wmin, wmax){
		
		//declare the data properties for the object

		var _town = wtown;
		var _outlook = woutlook
		var _minTemp = wmin;
		var _maxTemp = wmax;
		
		//declare an inner object literal to represent the widget's UI

		var _widgetUI = {
			dom_element : null,
			town_label : null,
			minTemp_value : null,
			maxTemp_value : null,
			woutlook_text : null,
		}

		//write a function to create and configure the DOM elements for the UI
		var _createUI = function(){
		
			_widgetUI.dom_element = document.createElement("div");
			_widgetUI.town_label = document.createElement("div");
			_widgetUI.minTemp_value = document.createElement("div");
			_widgetUI.maxTemp_value = document.createElement("div");
			_widgetUI.woutlook_text = document.createElement("div");

			_widgetUI.dom_element.appendChild(_widgetUI.town_label);
			_widgetUI.dom_element.appendChild(_widgetUI.minTemp_value);
			_widgetUI.dom_element.appendChild(_widgetUI.maxTemp_value);
			_widgetUI.dom_element.appendChild(_widgetUI.woutlook_text);
		};


		this.getDomElement = function(){
			return _widgetUI.dom_element;
		}
	
		this.getTownLabel = function(){
			return _town;
		}	
	
		this.getOutlook = function(){
			return _outlook;
		}
		
		this.getMinTemp = function(){
			return _minTemp;
		}
	
		this.getMaxTemp = function(){
			return _maxTemp;
		}	

		
		//Add any remaining functions you need for the object
	
		//_createUI() method is called when the object is instantiated
		_createUI();

	 
  	};  //end of the constructor function for the Wdata object 
	
	 
//end of WeatherWidget constructor function 