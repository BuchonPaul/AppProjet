<?php
$host = "127.0.0.1:3306";
$user = "u693686849_admin";
$password = "Base2donnée";
$dbname = "u693686849_cook_project";
$CONN = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
function get_all_product(){
    $sql = "SELECT * FROM product";
    $result = $GLOBALS['CONN']->query($sql);
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
var_dump(get_all_product());
$CONN->close();

?>
