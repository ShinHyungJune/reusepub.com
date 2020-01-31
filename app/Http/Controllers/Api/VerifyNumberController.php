<?php

namespace App\Http\Controllers\Api;

use App\Mail\VerifyNumberCreated;
use App\Mail\VerifyNumbers\create;
use App\VerifyNumber;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;

class VerifyNumberController extends ApiController
{
    public function store(Request $request)
    {
        $request->validate([
           "email" => "required|email|unique:users",
        ]);

        $verifyNumber = VerifyNumber::updateOrCreate([
            "email" => $request->email
        ],[
            "email" => $request->email,
            "number" => random_int(1000,9999),
            "verified" => false
        ]);

        Mail::to($request->email)->send(new VerifyNumberCreated($verifyNumber));

        return $this->respondSuccessfully(null, __("response.verifyNumber")["send mail"]);
    }

    public function show($id)
    {
        //
    }


    public function update(Request $request)
    {
        $request->validate([
            "email" => "required|email|unique:users|max:255",
            "number" => "required|max:255",
        ]);

        $verifyNumber = VerifyNumber::where('email', $request->email)->where('number', $request->number)->first();

        if(!$verifyNumber)
            return $this->respondNotFound(__("response.verifyNumber")["do not match"]);

        $verifyNumber->update([
            "verified" => true
        ]);

        return $this->respondSuccessfully($verifyNumber, __("response.verifyNumber")["verified"]);
    }

    public function destroy($id)
    {
        //
    }
}
