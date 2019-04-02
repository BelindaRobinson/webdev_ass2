<?php

    try {
        $con = new PDO('mysql:host=mysql.cms.waikato.ac.nz;dbname=br43','br43','my11138820sql');
    }   catch (PDOException $e) {
        echo "db not connected" . $e->getMessage();
    }
    
    /**************************
	 * Add your code to connect to your database here
	 */
	 
    $location = $_GET['location'];
    
    $query = "select * from location"

    $result = $con->query($query);
	
	

   /***************************
    * 
    * Add code here to query the DB for weather information for the given town
    * 
    * Construct a PHP array object containing the weather data 
    * and return as JSON
    * 
    */
   
	


