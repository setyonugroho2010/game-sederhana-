<?php
declare(strict_types=1);
// Urutan penting: core dulu, game, lalu main.
$scripts = [
    'assets/js/core.js',
    'assets/js/games/blockblast.js',
    'assets/js/games/snake.js',
    'assets/js/games/game2048.js',
    'assets/js/main.js',
];
foreach ($scripts as $s): ?>
<script src="<?= $s ?>?v=<?= filemtime(__DIR__ . '/../' . $s) ?>"></script>
<?php endforeach; ?>
</body>
</html>
