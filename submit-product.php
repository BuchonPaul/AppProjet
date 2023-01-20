<?php
require_once("api_connect.php");
require_once("api.php");
add_product($_POST["product-name"],$_POST["quantity"],$_POST["unite"]);
?>



