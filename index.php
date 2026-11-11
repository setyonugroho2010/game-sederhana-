<?php
declare(strict_types=1);

$games = require __DIR__ . '/includes/games.php';
$pageTitle = 'Game Jadul';
require __DIR__ . '/includes/header.php';
?>
<nav>
<?php foreach ($games as $key => $game): ?>
  <button type="button" data-g="<?= htmlspecialchars((string) $key, ENT_QUOTES) ?>"><?= htmlspecialchars($game['title']) ?></button>
<?php endforeach; ?>
</nav>
<div id="app"><div id="hud"></div><div id="stage"></div></div>
<div id="msg"></div>
<?php require __DIR__ . '/includes/footer.php'; ?>
