<h3 class="title">
    <span>Créer un nouvel utilisateur</span>
</h3>
<?php if (isset($msg_crud)) {
    echo "<p class=\"msg\">$msg_crud</p>";
}?>

<form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>" class="create f-col">
    <input name="lastname" type="text" placeholder="nom" required>
    <input name="name" type="text" placeholder="prénom" required>
    <input name="age" type="number" placeholder="âge" class="input" min="1" max="140">
    <input name="email" type="mail" placeholder="mail" class="input">
    <div class="f-row">
      <input name="create_user" type="submit" value="create user !" class="btn">
    </div>
</form>
