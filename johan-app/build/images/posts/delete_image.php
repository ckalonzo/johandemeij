<? 
require_once("../security.php");
require_once('../../Connections/euronet.php');

$postID = $_GET['id'];
$albmum_id = $_GET['album'];

//echo"SELECT imageName FROM `johandem_wrd1`.`ck_album_photos` WHERE `ck_album_photos`.`id` = $postID";
$query = "SELECT imageName FROM `johandem_wrd1`.`ck_post_images` WHERE `ck_post_images`.`id` = $postID";
$result = mysql_query($query) or die(mysql_error());

while (list($imageName) = mysql_fetch_row($result)) { 
$myFile = $imageName;
unlink($myFile);
}

$query1 = "DELETE FROM ck_post_images WHERE `ck_post_images`.`id` = $postID";
$result1 = mysql_query($query1) or die(mysql_error());


header("Location: ../update_post.php?id=$albmum_id");

?>