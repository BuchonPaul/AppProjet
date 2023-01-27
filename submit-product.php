<?php
include("api.php");
echo('test');
var_dump(get_all_product());
add_product($_POST["product-name"],$_POST["quantity"],$_POST["unite"]);

?>



