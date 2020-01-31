<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Project;
use Illuminate\Http\Request;

class ProjectController extends ApiController
{
    public function store(Request $request)
    {
        $request->validate([
            "title" => "required|string|max:255",
            "body" => "nullable|string|max:5000"
        ]);

        dd($request->imgs);

        if($request->imgs){
            $imgs = json_decode($request->imgs, true);
        }

        $project = Project::create([
            "title" => $request->title,
            "body" => $request->body
        ]);



        return $this->respondSuccessfully(new ProjectResource($project));
    }
}
