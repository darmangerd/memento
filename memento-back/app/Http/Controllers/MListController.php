<?php

namespace App\Http\Controllers;

use App\Models\MList;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return MList::all();
    }

    public function one($id) {
        return MList::with(['creator', 'lang_source', 'lang_def'])->find($id);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $words = $request->get("words");
        $words = array_reduce($words, function ($prev, $item) {
            if (!empty($item[0]) && !empty($item[1])) {
                $prev[] = $item;
            }
            return $prev;
        }, []);

        $validator = Validator::make([
            ...$request->all(),
            'words' => $words
        ], [
            'name' => ['required', 'min:3', 'max:25'],
            'words' => ['required', "array", "between:3,500"],
            'lang_source' => ['required', 'exists:languages,id'],
            'lang_def' => ['required', 'exists:languages,id']
        ]);

        if ($validator->fails()) {
            return response()->json([
                "errors" => $validator->errors()
            ], 400);
        }

        $name = $request->get("name");
        $lang_source = $request->get("lang_source");
        $lang_def = $request->get("lang_def");

        $list = new MList;

        $list->name = $name;
        $list->words = json_encode($words);
        $list->lang_source = $lang_source;
        $list->lang_def = $lang_def;

        $list->save();

        return $list;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MList  $mList
     * @return \Illuminate\Http\Response
     */
    public function show(MList $mList)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MList  $mList
     * @return \Illuminate\Http\Response
     */
    public function edit(MList $mList)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MList  $mList
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MList $mList)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MList  $mList
     * @return \Illuminate\Http\Response
     */
    public function destroy(MList $mList)
    {
        //
    }
}
