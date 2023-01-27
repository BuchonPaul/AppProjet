<?php
include("api.php");
echo('test');
var_dump($_POST["product-name"]);
add_product($_POST["product-name"],$_POST["quantity"],$_POST["unite"]);

?>



