<? 
require_once("../security.php");
require_once('../../Connections/euronet.php');

$postID = $_GET['id'];
$albmum_id = $_GET['album'];

//echo"SELECT imageName FROM `johandem_wrd1`.`ck_album_photos` WHERE `ck_album_photos`.`id` = $postID";
$query = "SELECT back_cover FROM ck_cds WHERE id = $postID";
$result = mysql_query($query) or die(mysql_error());

while (list($back_cover) = mysql_fetch_row($result)) { 
$myFile = $back_cover;
unlink($myFile);
}

$query1 = "UPDATE ck_cds SET `back_cover` = '' WHERE `ck_cds`.`id` =$postID";
$result1 = mysql_query($query1) or die(mysql_error());


header("Location: ../update_cd.php?id=$postID");

?>