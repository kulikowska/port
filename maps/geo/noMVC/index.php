<?php
    $sp = explode('/', $_SERVER['SCRIPT_NAME']);
    $remoteHost = 'http://' . 'tvws.' . 'azurewebsites.net' ;
    //$remoteHost = 'wsd';
    if ($sp[2] == 'Login') {
        $apiUrl = $remoteHost . "/Auth/" . $sp[2] .'?' . $_SERVER['QUERY_STRING'];
    } else {
        $apiUrl = $remoteHost . "/Api/" . $sp[2] .'?' . $_SERVER['QUERY_STRING'];
    }

    $ch = curl_init($apiUrl);

    curl_setopt($ch, CURLOPT_URL, $apiUrl);
    curl_setopt($ch, CURLOPT_HEADER, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $response = curl_exec($ch);
    $info = curl_getinfo($ch);

    $headers = get_headers_from_curl_response($response);

    header('conn: '.  $headers['conn'] );
    header('acct: '.  $headers['acct'] );
    header('apiKey: '.   $headers['apiKey'] );
    $body = substr($response, strpos($response, "\r\n\r\n"));
    //echo ($apiUrl);
    echo ($body);

    function get_headers_from_curl_response($response)
    {
        $headers = array();

        $header_text = substr($response, 0, strpos($response, "\r\n\r\n"));

        foreach (explode("\r\n", $header_text) as $i => $line)
            if ($i === 0)
                $headers['http_code'] = $line;
            else
            {
                list ($key, $value) = explode(': ', $line);

                $headers[$key] = $value;
            }

        return $headers;
    }
?>
