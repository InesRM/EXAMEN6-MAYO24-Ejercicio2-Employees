<?php
	
	$data = json_decode($_POST['data']);

	//echo json_encode($data);

	$fichero = "../tmp/" . $data -> lastname . $data -> firstname . ".json";

	if(file_exists($fichero)){ //Comprueba si el fichero existe, si existe lo borra para que no lo sobreescriba
		unlink($fichero);
	}

	$fd = fopen($fichero,"a+"); //Crea dicho fichero
    
	fputs($fd,json_encode($data));
	
	fclose($fd);
	
	echo "Employee: ". $data -> firstname . " " . $data -> lastname . " saved";
    
?>