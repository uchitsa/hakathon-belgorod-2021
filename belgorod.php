<?php

$db = new SQLite3("welcome.db");

$db->exec("CREATE TABLE IF NOT EXISTS users(id TEXT, last_event TEXT)");
$userId = json_decode(file_get_contents('php://input'), true)['session']['user_id'];
if ($db->querySingle("SELECT id FROM users WHERE id='$userId'") != $userId) {
    $db->exec("INSERT INTO users (id) VALUES ('$userId')");
}
$db->close();
$request_message = json_decode(file_get_contents('php://input'), true);

function error_message($request_message)
{
    return [
        'response' => [
            'text' => "Произошла ошибка, попробуйте снова!",
            'tts' => "Произошла ошибка, попробуйте снова!",
            'end_session' => FALSE
        ],
        'session' => [
            'user_id' => $request_message['session']['user_id'],
            'session_id' => $request_message['session']['session_id'],
            'message_id' => $request_message['session']['message_id']
        ],
        'version' => $request_message['version']
    ];
}

function getLast($userId)
{
    $db = new SQLite3("welcome.db");
    $last = $db->querySingle("SELECT last_event FROM users WHERE id='$userId'");
    $db->close();
    return $last;
}
function setLast($userId, $last)
{
    $db = new SQLite3("welcome.db");
    $db->querySingle("UPDATE users SET last_event = '$last' WHERE id='$userId'");
    $db->close();
}

function forecast($request_message, $last = 0)
{
    $result = file_get_contents("https://elpodzayv.000webhostapp.com/proxy.php?type=events");
    $result = json_decode($result, true)["events"];
    $request_message = json_decode(file_get_contents('php://input'), true);
    $text = "Вот ближайшее мероприятия: \n";
    $data = $result[$last];
    $text .= $data['name'] . "\n" . $data['description'] . "\n" . date("d-m-Y", $data['start'] / 1000);
    $text .= "\nСкажи 'ещё', что бы узнать о другом мероприятии";
    return [
        'response' => [
            'text' => $text,
            'tts' => $text,
            'end_session' => FALSE,
            'buttons' => []
        ],
        'session' => [
            'user_id' => $request_message['session']['user_id'],
            'session_id' => $request_message['session']['session_id'],
            'message_id' => $request_message['session']['message_id']
        ],
        'version' => $request_message['version']
    ];
}

$first = $request_message['request']['nlu']['tokens'][0];
$second = $request_message['request']['nlu']['tokens'][1];
$third = $request_message['request']['nlu']['tokens'][2];
$four = $request_message['request']['nlu']['tokens'][3];

$firstWords = ["ближайшее", "ближайшее", "включи", "мероприятия", "мероприятие"];
$secondWords = ["мероприятия", "мероприятие"];
if (in_array($first, $firstWords) && in_array($second, $secondWords)) {
    $response_message = forecast($request_message);
} else if ($request_message['request']['command'] === "еще") {
    setLast($userId, getLast($userId) + 1);
    $last = getLast($userId);
    $response_message = forecast($request_message, $last);
}
$firstWords = ["хочу", "запусти", "включи", "открой"];
$secondWords = ["skill", "скилл", "навык"];
$thirdWords = ["культура"];

if (in_array($first, $firstWords) && in_array($second, $secondWords) && in_array($third, $thirdWords)) {
    $response_message = [
        'response' => [
            'text' => "Welcome Белгород! Я могу подсказать тебе ближайшие мероприятия. Ну давай, спроси меня.",
            'tts' => "Welcome Белгород! Я могу подсказать тебе ближайшие мероприятия. Ну давай, спроси меня.",
            'end_session' => FALSE,
            'buttons' => []
        ],
        'session' => [
            'user_id' => $request_message['session']['user_id'],
            'session_id' => $request_message['session']['session_id'],
            'message_id' => $request_message['session']['message_id']
        ],
        'version' => $request_message['version']
    ];
}

header('Content-Type: application/json');
echo json_encode($response_message);
// echo json_encode(error_message($request_message));