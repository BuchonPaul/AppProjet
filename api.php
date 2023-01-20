<?php
// Connexion à la base de données
$host = "ip";
$user = "user";
$password = "mdp";
$dbname = "name";
$conn = new mysqli($host, $user, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Requête pour récupérer les données de la table "product"
$sql = "SELECT * FROM product";
$result = $conn->query($sql);

// Vérifier s'il y a des résultats
if ($result->num_rows > 0) {
    // Boucle pour créer un tableau des résultats
    $data = array();
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    // Encode le tableau en format JSON
    echo json_encode($data);
} else {
    echo "0 results";
}

// Fermeture de la connexion
$conn->close();
?>
