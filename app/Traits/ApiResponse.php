<?php

namespace App\Traits;

use Exception;
use Symfony\Component\HttpFoundation\Response;

trait ApiResponse {

    /**
     * API Response
     * @var array<string, dynamic>
    */
    private $response = array(
        'responseData' => array(
            'data' => "",
            'message' => "",
        ),
        'responseCode' => Response::HTTP_OK
    );

    public function setResponseData($data)
    {
       $this->response['responseData']['data'] = $data;
    }

    public function getResponseData()
    {
        return $this->response['responseData']['data'];
    }

    public function setResponseMessage($message)
    {
       $this->response['responseData']['message'] = $message;
    }

    public function getResponseMessage()
    {
        return $this->response['responseData']['message'];
    }

    public function setResponseCode($code)
    {
       $this->response['responseCode'] = $code;
    }

    public function getResponseCode()
    {
        return $this->response['responseCode'];
    }

    public function catchException(Exception $ex)
    {
        $this->setResponseMessage($ex->getMessage());
        $this->setResponseCode(array_key_exists($ex->getCode(), Response::$statusTexts)? $ex->getCode():500);
    }

    public function apiResponse() {
        return response()->json($this->response['responseData'], $this->response['responseCode']);
    }
}