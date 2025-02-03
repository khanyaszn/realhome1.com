<?php
// Database connection details
$servername = "localhost"; // 
$username = "khanya"; // 
$database = "realhome"; // Ensure this matches your database name

// to Create connection
$conn = new mysqli($servername, $username, $password, $database);

// to Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

// to Prepare SQL statement to insert data
$sql = "INSERT INTO ContactMessages (name, email, message) VALUES (?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $name, $email, $message);

if ($stmt->execute()) {
    echo "Message sent successfully!";
} else {
    echo "Error: " . $conn->error;
}

// to Close connection
$stmt->close();
$conn->close();
?>
