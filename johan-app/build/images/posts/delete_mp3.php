<? 
require_once("../security.php");
require_once('../../Connections/euronet.php');

$postID = $_GET['id'];
$albmum_id = $_GET['album'];

//echo"SELECT imageName FROM `johandem_wrd1`.`ck_album_photos` WHERE `ck_album_photos`.`id` = $postID";
$query = "SELECT music_name FROM ck_presentation_music WHERE id = $postID";
$result = mysql_query($query) or die(mysql_error());

while (list($score) = mysql_fetch_row($result)) { 
$myFile = $score;
unlink("../music/".$myFile);
}

$query1 = "DELETE FROM ck_presentation_music WHERE `ck_presentation_music`.`id` = $postID";
$result1 = mysql_query($query1) or die(mysql_error());


header("Location: ../update_presentation.php?id=$postID");

?>