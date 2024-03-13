<?php
$_POST = json_decode(file_get_contents("php://input"), true);
echo var_dump($_POST);  // эта команда берет те данные которые приходят с клиента превращает их в строку и отображает
// это тот response который будет приходить с сервера
