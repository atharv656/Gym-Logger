<?php
//  $path = 'data.txt';
 if (isset($_POST['submit'])) {
    $fh = fopen($path,"a+");
    $string = $_POST['submit'];
    fwrite($fh,$string); // Write information to the file
    fclose($fh); // Close the file
 }
?>