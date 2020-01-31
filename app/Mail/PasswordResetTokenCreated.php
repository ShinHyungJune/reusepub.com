<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class PasswordResetTokenCreated extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $token;

    public $url;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($token)
    {
        $this->token = $token;

        $this->url = config("app.url")."/passwordReset/".$this->token;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from("ssa4141@naver.com", config("app.name"))
            ->subject(__("passwords.sent"))
            ->markdown('emails.passwordResets.created');
    }
}
