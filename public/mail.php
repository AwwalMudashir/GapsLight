<?php
//get data from form  
$name = $_POST['userName'];
$email= $_POST['userEmail'];
$message= $_POST['userMessage'];
$to = "awwalmudashir@gmail.com";
$subject = "Mail From website";
$txt ="Name = ". $name . "\r\n  Email = " . $email . "\r\n Message =" . $message;
$headers = "From: gapslight.com.ng" . "\r\n";
if($email!=NULL){
    mail($to,$subject,$txt,$headers);
}
//redirect
header("Location:thankyou.html");
?>