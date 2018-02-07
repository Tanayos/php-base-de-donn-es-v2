<?php

$db = connectDB("localhost", "base_test_1", "root", "root");

function getUser($id) {
  global $db;
  $sql = "SELECT * FROM users WHERE id = :id";
  $statement = $db->prepare($sql);
  $statement->bindParam(":id", $id, PDO::PARAM_INT);
  $statement->execute();
  return $statement->fetch(PDO::FETCH_OBJ);
}

function getUsers() {
  global $db;
  $sql = "SELECT * FROM users";
  $exec = $db->query($sql);
  return $exec->fetchAll(PDO::FETCH_OBJ);
}

function updateUser() {
  global $db;

  $sql = "UPDATE users SET lastname = :lastname, name = :name, age = :age, email = :email WHERE id = :id";

  $age = $_POST["age"] !== "" ? (int)$_POST["age"] : null;
  $email = $_POST["email"] !== "" ? $_POST["email"] : null;

  $statement = $db->prepare($sql);
  $statement->bindParam(":id", $_POST["id"], PDO::PARAM_INT);
  $statement->bindParam(":lastname", $_POST["lastname"], PDO::PARAM_STR);
  $statement->bindParam(":name", $_POST["name"], PDO::PARAM_STR);
  $statement->bindParam(":email", $email, PDO::PARAM_STR);
  $statement->bindParam(":age", $age, PDO::PARAM_INT);
  $check = $statement->execute();
}

function deleteUser() {
  global $db;

  foreach ($_POST["delete_user_ids"] as $id) {
    // debug($id);
    $sql = "DELETE FROM users WHERE id = :id";
    $statement = $db->prepare($sql);
    $statement->bindParam(":id", $id, PDO::PARAM_INT);
    $res = $statement->execute();
    $msg_crud = ($res === true) ? "suppression ok" : "soucis suppression";
  }
  header("Location: index.php");
}

function createUser() {
  global $db;

  $sql = "INSERT INTO users (name, lastname, email, age)
    VALUES (:name, :lastname, :email, :age)";

  $age = (int)$_POST["age"];
  $age = $_POST["age"] !== "" ? $_POST["age"] : null;
  $email = $_POST["email"] !== "" ? $_POST["email"] : null;

  $statement = $db->prepare($sql);
  $statement->bindParam(":name", $_POST["name"], PDO::PARAM_STR);
  $statement->bindParam(":lastname", $_POST["lastname"], PDO::PARAM_STR);
  $statement->bindParam(":email", $email, PDO::PARAM_STR);
  $statement->bindParam(":age", $age, PDO::PARAM_INT);
  $res = $statement->execute();
  $msg_crud = ($res === true) ? "insertion ok" : "soucis à l'insertion";
  header("Location: index.php");
}
