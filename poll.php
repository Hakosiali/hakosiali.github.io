<?php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$dataDir = __DIR__ . '/data';
$file = $dataDir . '/polls.json';

if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0755, true);
}

function poll_safe_key($v) {
    return (is_string($v) && preg_match('/^[a-z0-9_-]{1,40}$/', $v)) ? $v : null;
}

$poll = poll_safe_key($_GET['poll'] ?? '');
$option = poll_safe_key($_GET['option'] ?? '');
$vote = ($_GET['vote'] ?? '') === '1';

if (!$poll) {
    http_response_code(400);
    echo json_encode(['error' => 'invalid poll id']);
    exit;
}

$fp = @fopen($file, 'c+');
if (!$fp) {
    http_response_code(500);
    echo json_encode(['error' => 'storage unavailable']);
    exit;
}

flock($fp, LOCK_EX);
$size = filesize($file);
$raw = $size > 0 ? fread($fp, $size) : '';
$data = json_decode($raw, true);
if (!is_array($data)) $data = [];

if (!isset($data[$poll]) || !is_array($data[$poll])) $data[$poll] = [];

if ($vote && $option) {
    $data[$poll][$option] = (isset($data[$poll][$option]) ? $data[$poll][$option] : 0) + 1;
    rewind($fp);
    ftruncate($fp, 0);
    fwrite($fp, json_encode($data));
    fflush($fp);
}

flock($fp, LOCK_UN);
fclose($fp);

echo json_encode(['poll' => $poll, 'results' => $data[$poll]]);
