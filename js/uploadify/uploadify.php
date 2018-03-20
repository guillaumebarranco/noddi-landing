<?php
/*
Uploadify
Copyright (c) 2012 Reactive Apps, Ronnie Garcia
Released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
$GLOBALS['jpegquality'] = 90;

$targetFolder = 'img';




if (!empty($_FILES)) {

	$tempFile = $_FILES['Filedata']['tmp_name'];
	$targetPath = '../'.$targetFolder;
	
	$tab_name = explode(".", $_FILES['Filedata']['name']);
	$ext = $tab_name[count($tab_name)-1];
	array_pop($tab_name);
	$txt = implode('.', $tab_name);
	$tab_name[0] = str_replace(' ', '', $tab_name[0]);
	$name_file = time().'_'.$tab_name[0].".".$ext;
	$targetFile = rtrim($targetPath,'/') . '/' . $name_file;
	
	// Validate the file type
	$fileTypes = array('jpg','jpeg','gif','png', 'pdf'); // File extensions
	$fileParts = pathinfo($_FILES['Filedata']['name']);
	
	if (in_array($fileParts['extension'],$fileTypes)) {
		move_uploaded_file($tempFile,$targetFile);
		// list($poubelle, $URL_dest) = explode("../../", $targetFile);

		//si le fichier est un jpg et qu'il est un background d'un film -> on l'optimize

		if(  $fileParts['extension'] == 'jpg' || $fileParts['extension'] == 'jpeg'  ) {
			optimize_jpeg($targetFile);
		}

			echo $targetFolder .'/'.$name_file;	

	} else {
		echo 'Invalid file type.';
	}
}

function optimize_jpeg($file) {
	if(!isset($GLOBALS['jpegquality']) || !is_numeric($GLOBALS['jpegquality'])) {
		return false;
	}
	if($GLOBALS['jpegquality'] > 100 || $GLOBALS['jpegquality'] < 0) {
		$GLOBALS['jpegquality'] = 80;
	}
	list($w,$h) = @getimagesize($file);
	if(empty($w) || empty($h)) {
		return false;
	}
	$src = imagecreatefromjpeg($file);
	$tmp = imagecreatetruecolor($w,$h);
	imagecopyresampled($tmp,$src,0,0,0,0,$w,$h,$w,$h);
	$src = imagejpeg($tmp,$file,$GLOBALS['jpegquality']);
	imagedestroy($tmp);
	return true;
}

?>