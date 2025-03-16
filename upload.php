<?php
header("Content-Type: application/json");

$host = "localhost";
$user = "root";
$pass = "";
$db = "portfolio";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Database connection failed."]);
    exit;
}

$target_dir = "uploads/";
if (!is_dir($target_dir)) {
    mkdir($target_dir, 0777, true);
}

$target_file = $target_dir . basename($_FILES["image"]["name"]);
$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
$allowed = ["jpg", "jpeg", "png", "gif"];

if (!in_array($imageFileType, $allowed)) {
    echo json_encode(["status" => "error", "message" => "Only JPG, JPEG, PNG & GIF files are allowed."]);
    exit;
}

if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
    $stmt = $conn->prepare("INSERT INTO images (filename) VALUES (?)");
    $stmt->bind_param("s", $target_file);
    $stmt->execute();
    $stmt->close();
    echo json_encode(["status" => "success", "message" => "Image uploaded successfully!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error uploading file."]);
}

$conn->close();
?>
