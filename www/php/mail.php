<?php

function clean_string($data)
{
    return htmlspecialchars(stripslashes(trim($data)));
}

function json_response($data)
{
    header('Content-Type: application/json');
    http_response_code(200);
    echo(json_encode($data));
    die();
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    json_response([
        'status' => 'error',
        'message' => 'Method not allowed'
    ]);
}

try {
    $json = file_get_contents('php://input');
    $content = json_decode($json, true);

    $name = isset($content["name"]) ? clean_string($content["name"]) : '';
    $email = isset($content["email"]) ? clean_string($content["email"]) : '';
    $message = isset($content["message"]) ? clean_string($content["message"]) : '';

    if (!($name && $email && $message))
        json_response([
            'status' => 'error',
            'message' => 'Bad request'
        ]);

    // $sender = "bestsorbent@білевугілля.com";
    $sender = "bestsorbent@xn--90acdg3ada5d5fscf.com";

    $master = "vad.bondarchuk@gmail.com";
    // $master = "gram7gram.work@gmail.com";

    $subject = '[bilevugillia.com.ua] Вопрос';
    $now = date('Y-m-d H:i:s');

    $body = "Дата: " . $now . "\n"
        . "Имя: " . $name . "\n"
        . "Email: " . $email . "\n"
        . "Вопрос:\n" . $message;

    $headers = "Content-type: text/plain;charset=UTF-8\r\n"
        . 'From: ' . $sender . "\r\n"
        . 'X-Mailer: PHP/' . phpversion();

    mail($master, $subject, $body, $headers);

    $log = "date:" . $now . ";master=" . $master . ";subject=" . $subject . ";content=[" . $body . "]\n";

    file_put_contents('./__logs/mails.txt', $log, FILE_APPEND);

    json_response([
        'status' => 'success',
    ]);

} catch (\Exception $e) {
    json_response([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
