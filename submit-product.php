<?php
// Connexion à la base de données
$host = "127.0.0.1:3306";
$user = "u693686849_admin";
$password = "Base2donnée";
$dbname = "u693686849_cook_project";
$conn = new mysqli($host, $user, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Récupérer les données du formulaire
$product_name = $_POST["product-name"];
$quantity = $_POST["quantity"];
$unite = $_POST["unite"];

// Préparer la requête d'insertion
$sql = "INSERT INTO product (name, quantity, unite) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sds", $product_name, $quantity, $unite);

// Exécuter la requête
if ($stmt->execute()) {
    echo "Product added successfully.";
    header("Location: index.html");
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Fermeture de la connexion
$conn->close();
?>



