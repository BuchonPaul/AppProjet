<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>WireFrameProjet crustace</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300&display=swap" rel="stylesheet"> 
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="../assets/icon/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="../assets/icon/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="../assets/icon/favicon-16x16.png"
    />
    <link rel="stylesheet" href="../css/wireframe.css" />
  </head>
  <body>
    <header>
        <a href="index.php">
            <div class='logo'>
                <p>Logo</p>
            </div>
        </a>
        <div class='title'>
            <p>Nom Application</p>
        </div>
    </header>
    <div class="top-button">
        <img src="../assets/icon/ampoule.png">
        <p>Aide</p>
    </div>
    <?php
    for($i = 0; $i <4; $i++){
        echo("
        <a href='info.html'>
            <div class='card'>
                <div class='top'>
                    <div class='name'>
                        <p>Nom de l'espèce</p>
                    </div>
                    <img src='../assets/icon/info.svg'>
                </div>
                <div class='image'></div>
            </div>
        </a>"
        );
    }
    ?>
    <footer>
        <div class="search">
            <img src='../assets/icon/loupe.png'>
            <p>Recherche</p>
        </div>
    </footer>
  </body>
</html>
