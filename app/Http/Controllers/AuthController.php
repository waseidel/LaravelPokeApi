<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
  use HttpResponses;

  public function login(LoginUserRequest $request)
  {
    if(!Auth::attempt($request->only('email', 'password'))) {
      return $this->error('', 'Credentials do not match', 401);
    }
    return $request->user();
  }

  public function register(StoreUserRequest $request)
  {
    $user = User::create([
      'name' => $request->name,
      'email' => $request->email,
      'password' => Hash::make($request->password)
    ]);

    return $user;
  }

  public function logout()
  {
    return Auth::logout();
  }
}
