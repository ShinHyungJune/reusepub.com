<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;

class Project extends Model implements HasMedia
{
    use HasMediaTrait;

    protected $fillable = ["title", "body"];

    public function registerMediaCollections()
    {
        $this->addMediaCollection("css")->useDisk("s3");

        $this->addMediaCollection("js")->useDisk("s3");

        $this->addMediaCollection("img")->useDisk("s3");
    }
}
