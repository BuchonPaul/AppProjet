<?php
$host = "127.0.0.1:3306";
$user = "u693686849_admin";
$password = "Base2donnée";
$dbname = "u693686849_cook_project";
$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function get_all_product(){
    global $conn;
    $sql = "SELECT * FROM product";
    $result = $conn ->query($sql);
    if ($result->num_rows > 0) {
        $data = array();
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        return json_encode($data);
    } else {
        
        return "0 results";
    }
}

function test($test){
    return $test;
}

function add_product($pn,$q,$u){
    global $conn;
    $sql = "INSERT INTO product (product_name, quantity, unite)
    VALUES
    ('$pn', '$q', '$u');";
    $result = $conn ->query($sql);
    if (!$result) {
        print_error($conn->error);
    }
    // else
    // global $conn;
    // $sql = "INSERT INTO product (name, quantity, unite) VALUES (?, ?, ?)";
    // $stmt = $conn->prepare($sql);
    // $stmt->bind_param("sds", $pn, $q, $u);
    // if ($stmt->execute()) {
    //     echo "Product added successfully.";
    // } else {
    //     echo "Error: " . $sql . "<br>" . $conn->error;
    // }
}

function print_error($e){
    header("Location: error.php?error="+$e);
}
//$conn->close();

?>
