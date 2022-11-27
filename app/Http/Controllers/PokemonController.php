<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PokemonController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index(Request $request)
  {
    $tailUrl = 'pokemon';
    if ($request->offset && $request->limit) {
      $tailUrl = 'pokemon?offset=' . $request->offset . '&limit=' . $request->limit;
    }
    $baseUrl = env('API_ENDPOINT') . $tailUrl;
    $response = Http::get($baseUrl);
    return $response->body();
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    $baseUrl = env('API_ENDPOINT');
    $response = Http::get($baseUrl . '/pokemon/' . $id);
    return $response->body();
  }
}
