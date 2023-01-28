<?php 
require_once("api.php");
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Test Page</title>
    </head>
        <body>
            <h1>Hello World!</h1>
            <form action="submit-product.php" method="post">
                <label for="product-name">Nom du produit:</label>
                <input type="text" id="product-name" name="product-name">
                <br>
                <label for="quantity">Quantité:</label>
                <input type="number" id="quantity" name="quantity">
                <br>
                <label for="unite">Unité:</label>
                <select id="unite" name="unite">
                    <option value="unité">Unité</option>
                    <option value="g">g</option>
                    <option value="L">L</option>
                </select>
                <br>
                <input type="submit" value="Soumettre">
            </form>
        <?php 
            $table = var_dump(json_decode(get_all_product()));
            foreach(json_decode(get_all_product()) as $key=>$value) {
                var_dump("<p>".$value."</p>");
            }
        ?>
        <table>
            <caption>Inventaire</caption>
            <tr> <th>Id</th> <th>Nom</th> <th>Quantity</th> <th>Unité</th></tr>
            <?php 
            foreach(json_decode(get_all_product()) as $key=>$value) {
                echo("<tr> <td>".$value['id']."</td> <td>".$value['product_name']."</td> <td>".$value['quantity']."</td> <td>".$value['unite']."</td> </tr>");
            }
            ?>
            <tr> <td>Chaton</td> <td>2 mois</td> <td>40 €</td> </tr>
        </table>
        </body>
    </html>
<script>
    const apiKey = "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"; // Replace with your actual API key
    const prompt = "au commencement, dieu";

    async function generateText() {
        const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                "model": "text-davinci-003",    
                "prompt": prompt,
                "temperature": 0.1,
                "max_tokens": 45
            })
        });

        const json = await response.json();
        console.log(json.choices[0].text);
    }

    generateText();

</script>