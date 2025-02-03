<?php
// how to connect to database
$servername = "localhost"; 
$username = "khanya"; // MySQL username
$dbname = "realhome"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $message = mysqli_real_escape_string($conn, $_POST['message']);
    $submitted_at = date('Y-m-d H:i:s'); // Current timestamp

    // SQL query to insert the data into the contact_form table
    $sql = "INSERT INTO contact_form (name, email, message, submitted_at) 
            VALUES ('$name', '$email', '$message', '$submitted_at')";

    if ($conn->query($sql) === TRUE) {
        echo "Message sent successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    $conn->close();
}
?>

