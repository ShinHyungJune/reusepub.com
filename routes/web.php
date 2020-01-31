<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/mail', function() {
    $verifyNumber = \App\VerifyNumber::create([
        "email" => "ssa4141@naver.com",
        "number" => "7490"
    ]);

    return new App\Mail\VerifyNumberCreated($verifyNumber);
});

Route::get('/', function () {
    return view('app');
});

Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
