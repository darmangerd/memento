<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return array
     */
    public function index(Request $request)
    {
        $user = $request->user();

        return [
            'id' => $user->id,
            'email' => $user->email,
            'lists' => $user->lists
        ];
    }

    public function sign_up(Request $request)
    {
        $validator = Validator::make([
            ...$request->all(),
            'email' => strtolower($request->get('email'))
        ], [
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'min:5', 'confirmed']
        ]);

        if ($validator->fails()) {
            return response()->json([
                "errors" => $validator->errors()
            ], 400);
        }

        $user = new User;
        $user->email = $request->get('email');
        $user->password = Hash::make($request->get('password'));
        $user->save();

        return [
            'email' => $user->email,
            'id' => $user->id
        ];
    }

    public function sign_in(Request $request)
    {
        $error = response()->json(["errors" => [
            'email' => 'Wrong email or password'
        ]], 401);

        $user = User::where([
            'email' => $request->get('email')
        ])->first();

        if (!isset($user)) {
            return $error;
        }

        if (!Hash::check($request->get('password'), $user->password)) {
            return $error;
        }

        $user->tokens()->delete();
        $token = $user->createToken($user->id);

        return [
            'token' => $token->plainTextToken,
            'email' => $user->email,
            'id' => $user->id
        ];
    }

    public function sign_out(Request $request)
    {
        $request->user()->tokens()->delete();
        return ['status' => 'ok'];
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
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}
