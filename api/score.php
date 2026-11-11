<?php
declare(strict_types=1);

// GET  -> {"bb":123,"sn":40,...}
// POST -> {"game":"bb","score":123}  (disimpan hanya jika lebih tinggi)
header('Content-Type: application/json; charset=utf-8');

$games = array_keys(require __DIR__ . '/../includes/games.php');
$dir   = __DIR__ . '/../storage';
if (!is_dir($dir)) {
    mkdir($dir, 0755, true);
}

$fp = fopen($dir . '/scores.json', 'c+');
if ($fp === false) {
    http_response_code(500);
    echo json_encode(['error' => 'storage']);
    exit;
}
flock($fp, LOCK_EX);
$data = json_decode(stream_get_contents($fp) ?: '{}', true);
if (!is_array($data)) {
    $data = [];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $in    = json_decode(file_get_contents('php://input'), true);
    $game  = is_array($in) ? ($in['game'] ?? '') : '';
    $score = is_array($in) ? ($in['score'] ?? null) : null;

    if (!in_array($game, $games, true) || !is_int($score) || $score < 0 || $score > 10000000) {
        http_response_code(400);
        echo json_encode(['error' => 'invalid']);
        exit;
    }
    if ($score > ($data[$game] ?? 0)) {
        $data[$game] = $score;
        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, json_encode($data));
    }
}

flock($fp, LOCK_UN);
fclose($fp);
echo json_encode((object) $data);
