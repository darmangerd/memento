<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MListController;
use App\Http\Controllers\LanguageController;

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


Route::get('/lists', [MListController::class, 'index']);
Route::post('/list', [MListController::class, 'store']);

Route::get('/users', [UserController::class, 'index']);

Route::get('/languages', [LanguageController::class, 'index']);
