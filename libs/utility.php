<?php

function enablePHPMaxErros() {
    ini_set('display_startup_errors', 1);
    ini_set('display_errors', 1);
    error_reporting(-1);
}

/**
 * Fonction de connexion au SGBD via le driver PDO
 *
 * Se connecte à la base de données indiquée
 *
 * @param  string  $db base de données courante
 * @param  string  $user user de mysql
 * @param  string  $pass  mot de passe mysql
 * @return mixed   object représentant l'instance
 * de connexion pdo à la base de données si pas de soucis, void sinon.
 */
function connectDB($host, $db, $user, $pass) {
  try {
      // utilisation du prefix mysql:
      $options = array(
        PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
      );
      $cnx = new PDO("mysql:host=$host;dbname=$db", $user, $pass, $options);
      return $cnx;

  } catch (PDOException $e) {
      print "Erreur !: " . $e->getMessage() . "<br/>";
      exit();
  }
}

/**
 * Fonction de debug
 *
 * Affiche un print_r ou var_dump formaté sur une valeur ou expression
 *
 * @since 0.1
 * @param  mixed  $val  valeur ou expression à deboguer
 * @param  integer $mode [description]
 * @return void    RAS
 */
function debug($val, $mode = 0) {
    echo '<pre style="background:#' . substr(md5(rand()), 0, 6) . '">';
    if ($mode === 1) {
        var_dump($val);
    } else {
        print_r($val);
    }
    echo "</pre>";
}

/**
 * Fonction de debug provoquant la fin du programme
 *
 * Affiche un print_r ou var_dump formaté sur une valeur ou expression
 * puis lance une instruction exit
 *
 * @since 0.1
 * @param  mixed   $val  valeur ou expression à deboguer
 * @param  integer   $mode si précisé, lance var_dump, sinon print_r
 * @return void    RAS
 */
function debugX($val, $mode = 0) {
    echo '<pre style="background:#' . substr(md5(rand()), 0, 6) . '">';
    if ($mode === 1) {
        var_dump($val);
    } else {
        print_r($val);
    }
    echo "</pre>";
    exit;
}
