<?php
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

function add_product($pn,$q,$u){
    $sql = "INSERT INTO product (name, quantity, unite) VALUES (?, ?, ?)";
    $stmt = $GLOBALS['CONN']->prepare($sql);
    $stmt->bind_param("sds", $pn, $q, $u);
    if ($stmt->execute()) {
        header("Location: index.html");
    } else {
        print_error($sql . "<br>" . $GLOBALS['CONN']->error);
    }
}

function print_error($e){
    header("Location: error.php?error="+$e);
}
$CONN->close();

?>
