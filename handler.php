<?php
$to = "albert@gorda.capital";

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["act"]) && $_POST["act"] == "form") {
    $name = $_POST["firstname"];
    $surname = $_POST["surname"];
    $emailContact = $_POST["email"];
    
    $subject = "New form submission"; 
    $body = "$name $surname,\nEmail: $emailContact";
    
    $headers = "From: your_email@example.com"; 
    $send = mail($to, $subject, $body, $headers);
    if (!$send) {
        echo json_encode(['success' => true]);
        exit();
    } else {
        echo json_encode(['success' => false]);
        exit();
    }
}
?>