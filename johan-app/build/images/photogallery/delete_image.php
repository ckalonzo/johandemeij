<? 
require_once("http://www.johandemeij.com/manage-cms/security.php");
require_once('http://www.johandemeij.com/Connections/euronet.php');

echo"SELECT imageName FROM ck_album_photos WHERE `ck_album_photos`.`id` = $postID";

echo $postID = $_GET['id'];
echo $albmum_id = $_GET['album'];


echo $query = "SELECT imageName FROM ck_album_photos WHERE `ck_album_photos`.`id` = $postID";
$result = mysql_query($query) or die(mysql_error());

while (list($imageName) = mysql_fetch_row($result)) { 
$myFile = $imageName;
unlink($myFile);
}

$query1 = "DELETE FROM ck_album_photos WHERE `ck_album_photos`.`id` = $postID";
$result1 = mysql_query($query1) or die(mysql_error());


header("Location: ../../manage-cms/album_photos.php?id=$albmum_id");

?>