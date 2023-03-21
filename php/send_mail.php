<?php

$surname = $_POST["surname"];
$given_name = $_POST["given_name_"];
$email = $_POST["emailt"];
$message = $_POST["message"];

require "vendor/autoload.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

$mail = new PHPMailer(true);

$mail ->isSMTP();
$mail ->SMTPAuth = true;

$mail->Host = "smtp.goneo.de"
$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
$mail->Port = 465;

$mail->Username = "";
$mail->Password = "";

$mail->setForm($email, $surname, $given_name);
$mail->addAddress("alexandros.moussiopoulos@am-digital-solutions.de");

$mail->Subject = $surname;
$mail->Body = $message;

$mail->send();

