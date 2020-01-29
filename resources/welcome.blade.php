<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        @include('common.noindex')
        
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Laravel</title>
        @auth
        <meta name="isLogedin" content="true">
        <meta name="LogedUserId" content="{{ Auth::user()->id }}">
        <meta name="userName" content="{{ Auth::user()->first_name }}">

        @endauth
        @guest
        <meta name="isLogedin" content="false">
        <meta name="userName" content="NoUser">

        @endguest
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="{{ asset('css/app.css') }}" type="text/css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css" >
    </head>
    <body class="home_view v2 simple-header p1  new_home ng-scope">        
        <div id="root"></div>
        <script src="/js/app.js"></script>
        
    </body>
</html>
