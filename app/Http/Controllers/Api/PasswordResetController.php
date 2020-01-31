<?php

namespace App\Http\Controllers\Api;

use App\Mail\PasswordResetTokenCreated;
use App\PasswordReset;
use App\ResetPassword;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class PasswordResetController extends ApiController
{
    public function reset(Request $request)
    {
        $this->validate($request, [
            "email" => "required|email|string|max:255",
            "password" => "required|string|confirmed|min:8"
        ]);

        $passwordReset = PasswordReset::where("email", $request->email)->where("token", $request->token)->first();

        if(!$passwordReset)
            return $this->respondForbidden();

        $user = User::where("email", $request->email)->first();

        $user->password = Hash::make($request->password);

        $user->save();

        PasswordReset::where("email", $request->email)->where("token", $request->token)->delete();

        return $this->respond(["message" => __("passwords.reset")]);
    }

    public function sendMail(Request $request)
    {
        $this->validate($request, [
            "email" => "required|email|string|max:255"
        ]);

        if(!User::where("email", $request->email)->exists())
            return $this->respondNotFound(__("passwords.user"));

        $token = Str::random(60);

        PasswordReset::updateOrCreate([
            "email" => $request->email
        ],[
            "email" => $request->email,
            "token" => $token
        ]);

        Mail::to($request->email)->send(new PasswordResetTokenCreated($token));

        return $this->respondCreated(null, __("passwords.sent"));
    }
}
