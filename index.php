<?php include "inc/head.php"; ?>

<p>
    Créer les formulaires pour ajouter / lister / editer / supprimer les users et les bills ...<br>
    stockés en base de données.<br>
    Les valeurs sont récupérées par le serveur PHP.<br>
    La connexion à la base est assurée par un objet PDO.<br>
    Requis: préparer les requêtes SQL.<br>
    <b>Etape 1</b>: pour users, coder une version synchrone.<br>
    <b>Etape 2</b>: pour bills, proposer une version asynchrone du programme.
</p>
<p>
    En savoir plus sur les injections SQL @ Computerphile :<br>
    <a>https://www.youtube.com/watch?v=_jKylhJtPmI</a>
</p>

<h2 class="title">Sync : Users</h2>
<?php include "modules/users/form.php"; ?>
<?php include "modules/users/tabler.php"; ?>

<hr>

<h2 class="title">Async : Bills</h2>
<?php include "modules/bills/form.html"; ?>
<?php include "modules/bills/tabler.php"; ?>

<?php include "inc/footer.php"; ?>
