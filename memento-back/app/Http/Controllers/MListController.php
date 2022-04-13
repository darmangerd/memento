<?php

namespace App\Http\Controllers;

use App\Models\MList;
use Illuminate\Http\Request;

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

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
