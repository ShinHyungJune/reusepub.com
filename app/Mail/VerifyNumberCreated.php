<?php

namespace App\Mail;

use App\VerifyNumber;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class VerifyNumberCreated extends Mailable implements ShouldQueue, Renderable
{
    use Queueable, SerializesModels;

    public $verifyNumber;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(VerifyNumber $verifyNumber)
    {
        $this->verifyNumber = $verifyNumber;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from("ssa4141@naver.com", config("app.name"))
            ->subject(__("mail.verifyNumber")["created"])
            ->markdown('emails.verifyNumber.created');
    }
}
