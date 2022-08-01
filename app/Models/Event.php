<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use SoftDeletes;

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];


    /**
     * dynamic attributes that should be appended for serialization.
     *
     * @var array<int, string>
     */
    protected $appends = ['status'];

    /**
     * get value for appended status column based on event end date.
     *
     * @return string
     */
    public function getStatusAttribute()
    {
        $status = '';
        $now = strtotime(date('Y-m-d H:i:s'));
        if(strtotime($this->attributes['start_date']) > $now)
            $status = 'Upcoming';
        elseif(strtotime($this->attributes['end_date']) <= $now)
            $status = 'Finished';
        elseif(strtotime($this->attributes['start_date']) <= $now && strtotime($this->attributes['end_date']) > $now)
            $status = 'Running';
        
        return $status;
    }
}
