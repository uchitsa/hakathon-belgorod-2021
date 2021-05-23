<?php
if ($_GET['type'] === "articles"){
    $url = 'https://cultreg.ru/api/1.0/articles';
    $url = "articles.json";
}
if ($_GET['type'] === "streams"){
    $url = 'https://cultreg.ru/api/1.0/streams';
    $url = "streams.json";
}
if ($_GET['type'] === "places"){
    $url = 'https://cultreg.ru/api/1.0/places';
    $url = "places.json";
}
if ($_GET['type'] === "events"){
    $url = 'https://cultreg.ru/api/1.0/events';
    $url = "events.json";
}
if ($_GET['type'] === "products"){
    $url = 'https://storefront.cultreg.ru/api/1.0/products';
    $url = "products.json";
}
if ($_GET['type'] === "masters"){
    $url = 'https://storefront.cultreg.ru/api/1.0/masters';
    $url = "masters.json";
}
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$response = file_get_contents($url);
header('Content-Type: application/json');
echo json_encode(json_decode($response, true));