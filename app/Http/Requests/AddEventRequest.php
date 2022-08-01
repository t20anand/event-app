<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title' => [
                'required',
                'max:255',
            ],
            'desc' => [
                'required',
            ],
            'start_date' => [
                'required',
                'date_format:Y-m-d H:i:s',
            ],
            'end_date' => [
                'required',
                'date_format:Y-m-d H:i:s',
                'after:start_date'
            ]
        ];
    }
}
