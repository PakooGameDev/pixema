<?php

   namespace App\Http\Controllers;

   use App\Models\User;
   use Illuminate\Http\Request;
   use Carbon\Carbon;

   class VerificationController extends Controller
   {
       public function verify(Request $request, $token)
       {
           $user = User::where('verification_token', $token)->first();
           if (!$user) {
               return response()->json(['message' => 'Invalid verification token'], 404);
           }

           $user->email_verified_at = Carbon::now();
           $user->verification_token = null;
           $user->save();

           return response()->json(['message' => 'Email verified successfully!']);
       }
   }
