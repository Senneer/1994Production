<?php 
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];

    $mailMessage = " ".$name." ".$phone." ".$message;

    mail('senneerr@gmail.com', 'Test', $mailMessage);
?>