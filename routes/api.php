<?php

use App\Http\Controllers\EventController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/event/event-filter', [EventController::class, 'eventFilter'])->name('eventFilter');
Route::post('/event', [EventController::class, 'add'])->name('addEvent');
Route::get('/event', [EventController::class, 'getAll'])->name('getAllEvent');
Route::get('/event/trashed', [EventController::class, 'getAllTrashedEvent'])->name('getAllTrashedEvent');
Route::get('/event/{id}', [EventController::class, 'getById'])->name('getEventById');
Route::patch('/event/{id}', [EventController::class, 'update'])->name('updateEvent');
Route::delete('/event/trash/{id}', [EventController::class, 'trash'])->name('trashEvent');
Route::delete('/event/delete/{id}', [EventController::class, 'delete'])->name('deleteEvent');

