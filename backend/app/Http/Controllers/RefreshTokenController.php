<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;


class RefreshTokenController extends Controller
{
    public function refresh(Request $request)
    {
        try {
            $token = Auth::refresh($request->input('token'));
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Throwable $e) {
            return response()->json(['error' =>  $e->getMessage()], 500);
        }

        return response()->json(['access_token' => $token]);
    }
}
