<?php

$res = json_decode(str_replace('\\', '', urldecode($_GET['data'])), true);

if(isset($res['type']))
{
    if($res['type'] == 'POST')
    {
        file_put_contents('move.json', json_encode($res['board']));
        exit();
    }
    else if($res['type'] == 'GET')
    {
        echo file_get_contents('move.json');
        
        exit();
    }
    else echo 0;
}

?>