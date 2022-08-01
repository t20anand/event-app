<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddEventRequest;
use App\Http\Requests\EventFilterRequest;
use App\Models\Event;
use App\Traits\ApiResponse;
use Carbon\Carbon;
use Exception;
use GuzzleHttp\Psr7\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class EventController extends Controller
{
    use ApiResponse;

    /**
     * filters for events with conditions.
     * 
     * @var array<string, array<dynamic>>
     */
    private $eventFilter = [
        'All' => [
            'conditions'=>[]
        ],
        'Finished'  => [
            'conditions'=>[
                ['column'=>'end_date', 'operator'=>'<=', 'days_to_add'=>0], 
            ]
        ],
        'Finished within last 7 days'  => [
            'conditions'=>[
                ['column'=>'end_date', 'operator'=>'>=', 'days_to_add'=>-7],
                ['column'=>'end_date', 'operator'=>'<=', 'days_to_add'=>0], 
            ]
        ],
        'Upcoming'  => [
            'conditions'=>[
                ['column'=>'start_date', 'operator'=>'>', 'days_to_add'=>0], 
            ]
        ],
        'Upcoming within 7 days'  => [
            'conditions'=>[
                ['column'=>'start_date', 'operator'=>'<=', 'days_to_add'=>+7],
                ['column'=>'start_date', 'operator'=>'>=', 'days_to_add'=>0], 
            ]
        ],
    ];

    /**
     * return listing of all events.
     *
     * @return \Illuminate\Http\Response
     */
    public function eventFilter()
    {
        try {

            $this->setResponseData(array_keys($this->eventFilter));

        } catch (Exception $ex) {
            $this->catchException($ex);
        }

        return $this->apiResponse();
    }

    /**
     * store new event.
     *
     * @param  App\Http\Requests\AddEventRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function add(AddEventRequest $request)
    {
        try {
            $requestData = $request->validated();

            $event = new Event();
            $event->title = $requestData['title'];
            $event->desc = $requestData['desc'];
            $event->start_date = $requestData['start_date'];
            $event->end_date = $requestData['end_date'];
            $event->save();

            $this->setResponseData($event);
            $this->setResponseMessage('Event created successfully.');

        } catch (Exception $ex) {
            $this->catchException($ex);
        }

        return $this->apiResponse();
    }

    /**
     * update the specified event.
     *
     * @param  App\Http\Requests\AddEventRequest  $request
     * @param  string  $id
     * @return \Illuminate\Http\Response
     */
    public function update(AddEventRequest $request, string $id)
    {
        try {
            $event = Event::find($id);
            if(!$event) {
                throw new Exception('Invalid Request.', Response::HTTP_BAD_REQUEST);
            }

            $requestData = $request->validated();

            $event->title = $requestData['title'];
            $event->desc = $requestData['desc'];
            $event->start_date = $requestData['start_date'];
            $event->end_date = $requestData['end_date'];
            $event->save();

            $this->setResponseData($event);
            $this->setResponseMessage('Event updated successfully.');

        } catch (Exception $ex) {
            $this->catchException($ex);
        }

        return $this->apiResponse();
    }

    /**
     * trash the specified event.
     *
     * @param  string  $id
     * @return \Illuminate\Http\Response
     */
    public function trash(string $id)
    {
        try {
            $event = Event::find($id);
            if(!$event) {
                throw new Exception('Invalid Request.', Response::HTTP_BAD_REQUEST);
            }

            $event->delete();

            $this->setResponseMessage('Event trashed successfully.');

        } catch (Exception $ex) {
            $this->catchException($ex);
        }

        return $this->apiResponse();
    }

    /**
     * permanently delete the specified event.
     *
     * @param  string  $id
     * @return \Illuminate\Http\Response
     */
    public function delete(string $id)
    {
        try {
            $event = Event::withTrashed()->find($id);
            if(!$event) {
                throw new Exception('Invalid Request.', Response::HTTP_BAD_REQUEST);
            }

            $event->forceDelete();

            $this->setResponseMessage('Event deleted permanently.');

        } catch (Exception $ex) {
            $this->catchException($ex);
        }

        return $this->apiResponse();
    }

    /**
     * return the specified event.
     *
     * @param  string  $id
     * @return \Illuminate\Http\Response
     */
    public function getById(string $id)
    {
        try {
            $event = Event::find($id);
            if(!$event) {
                throw new Exception('No record found.', Response::HTTP_NOT_FOUND);
            }

            $this->setResponseData($event);

        } catch (Exception $ex) {
            $this->catchException($ex);
        }

        return $this->apiResponse();
    }

    /**
     * return listing of all events.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAll(EventFilterRequest $request)
    {
        try {
            $validated = $request->validated();
            $eventFilter = $validated['event_filter'] ?? 'All';

            $event = new Event();

            $conditions = $this->eventFilter[$eventFilter]['conditions'];

            foreach($conditions as $key=>$value) {
                $daysToAdd = $value['days_to_add'];
                $date = $date = date_create('now');
                date_add($date,date_interval_create_from_date_string("{$daysToAdd} days"));
                $date = date_format($date, 'Y-m-d H:i:s');

                $event = $event->where($value['column'], $value['operator'], $date);
            }
            
            // TODO
            // \DB::enableQueryLog();
            $event = $event->get();
            // print_r(\DB::getQueryLog());

            $this->setResponseData($event);

        } catch (Exception $ex) {
            $this->catchException($ex);
        }

        return $this->apiResponse();
    }

    /**
     * return a listing of all trashed events.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllTrashedEvent()
    {
        try {
            $event = Event::onlyTrashed()->get();

            $this->setResponseData($event);

        } catch (Exception $ex) {
            $this->catchException($ex);
        }

        return $this->apiResponse();
    }
  
}
