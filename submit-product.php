<?php
require_once("api.php");
require_once("api_connect.php");

var_dump(get_all_product());
add_product($_POST["product-name"],$_POST["quantity"],$_POST["unite"]);

?>



