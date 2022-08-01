<?php

namespace Tests\Feature;

use App\Models\Event;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class EventTest extends TestCase
{
    
    /**
     * create new event test.
     *
     * @return void
     */
    public function test_creatEvent()
    {
        $event = new Event();
        $event->title = 'New Event '.collect()->range(1, 1000)->random();
        $event->desc = 'event description';
        $event->start_date = '2022-08-01 11:00:00';
        $event->end_date = '2022-08-05 12:00:00';
        $response = $this->json('post', '/api/event', ['title'=>$event->title, 'desc'=>$event->desc, 'start_date'=>$event->start_date, 'end_date'=>$event->end_date]);
        $response->assertStatus(200);

        $event = new Event();
        $event->title = 'New Event '.collect()->range(1, 1000)->random();
        $event->desc = 'event description';
        $event->start_date = '2022-08-01 11:00:00';
        $event->end_date = '2022-08-05 12:00:00';
        $response = $this->json('post', '/api/event', ['title'=>$event->title, 'desc'=>$event->desc, 'start_date'=>$event->start_date, 'end_date'=>$event->end_date]);
        $response->assertStatus(200);


        $event = new Event();
        $event->title = 'New Event '.collect()->range(1, 1000)->random();
        $event->desc = 'event description';
        $event->start_date = '2022-08-01 11:00:00';
        $event->end_date = '2022-08-05 12:00:00';
        $response = $this->json('post', '/api/event', ['title'=>$event->title, 'desc'=>$event->desc, 'start_date'=>$event->start_date, 'end_date'=>$event->end_date]);
        $response->assertStatus(200);

        $event = new Event();
        $event->title = 'New Event '.collect()->range(1, 1000)->random();
        $event->desc = 'event description';
        $event->start_date = '2022-08-01 11:00:00';
        $event->end_date = '2022-08-05 12:00:00';
        $response = $this->json('post', '/api/event', ['title'=>$event->title, 'desc'=>$event->desc, 'start_date'=>$event->start_date, 'end_date'=>$event->end_date]);
        $response->assertStatus(200);
    }

    /**
     * update event test.
     *
     * @return void
     */
    public function test_updateEvent()
    {
        $response = $this->json('get', '/api/event', ['event_filter'=>'All']);
        $response->assertStatus(200);
        $event = $response->getData()->data[0];


        $event->title = 'New Event '.collect()->range(1, 1000)->random();
        
        $response = $this->json('patch', '/api/event/'.$event->id, ['title'=>$event->title, 'desc'=>$event->desc, 'start_date'=>$event->start_date, 'end_date'=>$event->end_date]);
        $response->assertStatus(200);
    }

    /**
     * get event by id test.
     *
     * @return void
     */
    public function test_getEventById()
    {
        $response = $this->json('get', '/api/event', ['event_filter'=>'All']);
        $response->assertStatus(200);
        $event = $response->getData()->data[0];

        $eventId = $event->id;
        $response = $this->json('get', '/api/event/'.$eventId);
        $response->assertStatus(200)->assertJsonStructure([
            'data' => [
                'id',
                'title',
                'desc',
                'start_date',
                'end_date',
                'status'
            ],
            'message'
        ]);
    }
    
    /**
     * get all event list test.
     *
     * @return void
     */
    public function test_getEventList()
    {
        $response = $this->json('get', '/api/event/event-filter');
        $response->assertStatus(200)->assertJsonCount(5, 'data');
        
        foreach($response['data'] as $key=>$value) {
            $response = $this->json('get', '/api/event', ['event_filter'=>$value]);
            $response->assertStatus(200);
        }
    }

    /**
     * trash event by id test.
     *
     * @return void
     */
    public function test_trashEventById()
    {
        $response = $this->json('get', '/api/event', ['event_filter'=>'All']);
        $response->assertStatus(200);
        $event = $response->getData()->data[0];
        
        $eventId = $event->id;
        $response = $this->json('delete', '/api/event/trash/'.$eventId);
        $response->assertStatus(200);
    }

    /**
     * permanently delete event by id test.
     *
     * @return void
     */
    public function test_deleteEventById()
    {
        $response = $this->json('get', '/api/event', ['event_filter'=>'All']);
        $response->assertStatus(200);
        $event = $response->getData()->data[0];
        
        $eventId = $event->id;
        $response = $this->json('delete', '/api/event/delete/'.$eventId);
        $response->assertStatus(200);
    }

    /**
     * get all trashed event.
     *
     * @return void
     */
    public function test_getTrashedEvent()
    {
        $response = $this->json('get', '/api/event/trashed');
        $response->assertStatus(200);
    }
}
