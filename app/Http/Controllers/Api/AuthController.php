<?php

namespace App\Http\Controllers\Api;

use App\Traits\ImageTrait;
use App\User;
use App\VerifyNumber;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AuthController extends ApiController
{
    // use ImageTrait;

    /**
     * Create user
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [string] password_confirmation
     * @return [string] message
     */
    public function signup(Request $request)
    {

        $request->validate([
            'name' => 'required|string',
            /* "avatar" => "required|base64image|base64mimes:jpeg,png,jpg,gif,svg|base64max:2048", */
            'email' => 'required|string|email|unique:users',
            'password' => 'required|min:8|string|confirmed',
        ]);

        $veryNumber = VerifyNumber::where("email", $request->email)->where("verified", true)->first();

        if(!$veryNumber || !$veryNumber->verified)
            return $this->respondForbidden();

        DB::transaction(function() use($request) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            ]);

            // $this->storeBase64AndAddMedia($request->avatar, $user);

            VerifyNumber::where('email', $request->email)->first()->delete();
        });

        return $this->respondSuccessfully(null,"회원가입이 완료되었습니다.");
    }

    /**
     * Login user and create token
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [boolean] remember_me
     * @return [string] access_token
     * @return [string] token_type
     * @return [string] expires_at
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);
        $credentials = request(['email', 'password']);

        if(!Auth::attempt($credentials))
            return response()->json([
                'message' => __('auth.invalid')
            ], 401);

        $user = $request->user();

        $tokenResult = $user->createToken('Personal Access Token');

        $token = $tokenResult->token;

        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);

        $token->save();

        $token = [
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ];

        return $this->respond(["user" => $user, "token" => $token]);
    }

    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();

        return $this->respondSuccessfully();
    }

    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return $this->respond($request->user());
    }
}
