<?PHP
     //BUILD THE FILE INFORMATION
$filename = $_GET['f'];
$filename = str_replace(" ", "%20", $filename);
$fsize = filesize($fullPath);
header('Content-disposition: attachment; filename='.$filename.'');
header('Content-type:image/gif');
header('Content-type:image/jpeg');
header('Content-type:image/x-png');
//header("Content-length: $fsize");
header("Cache-control: private"); //use this to open files directly

readfile(''.$filename.'');


//header('Content-disposition: attachment; filename=huge_document.pdf');
//header('Content-type: application/pdf');
//readfile('huge_document.pdf');