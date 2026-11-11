<?php
declare(strict_types=1);
$css = 'assets/css/style.css';
?>
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title><?= htmlspecialchars($pageTitle ?? 'Game Jadul', ENT_QUOTES) ?></title>
<link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet">
<link rel="stylesheet" href="<?= $css ?>?v=<?= filemtime(__DIR__ . '/../' . $css) ?>">
</head>
<body>
