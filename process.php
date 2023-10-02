<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    // Construct the email message
    $to = "dungnguyen_2025@depauw.edu";
    $subject = "New Contact Form Submission";
    $message_body = "Name: $name\nEmail: $email\nMessage:\n$message";
    $headers = "From: $email";

    // Send the email
    if (mail($to, $subject, $message_body, $headers)) {
        // Email sent successfully
        http_response_code(200);
    } else {
        // Email sending failed
        http_response_code(500);
    }
} else {
    // If the script is accessed directly, display an error
    echo "Access denied.";
}
?>
