@extends('layouts/admin')
@section('admin-content')        
@include('admin/common/side')	

<div class="pcoded-content">
   <div class="pcoded-inner-content">
      <div class="main-body">
         <div class="page-wrapper">
            <div class="page-header">
               <div class="page-header-title">
                    <h4>Payment Gateway Manage</h4>
               </div>
               <div class="page-header-breadcrumb">
                  <ul class="breadcrumb-title">
                     <li class="breadcrumb-item">
                        <a href="{{route('admin.dashboard')}}" aria-label="Home">
                            <i class="icofont icofont-home"></i>
                        </a>
                     </li>
                     <li class="breadcrumb-item"><a href="#">Pages</a></li>
                     <li class="breadcrumb-item">Payment Gateway</li>                     
                  </ul>
               </div>
            </div>
            <div class="page-body">
               <div class="row">                 
                    <div class="col-sm-12">
                        <div class="card">
                            <div class="card-header table-card-header">  
                                <div class="row">
                                    <div class="col-sm-9 text-left">
                                        <h5>Payment Gateway Form</h5>
                                    </div>                          
                                    <div class="col-sm-3 text-right">
                                        <span class="text-danger">(*)Fields are Mandatory</span>
                                    </div>                          
                                </div>
                            </div>
                            <div class="card-block">
                                <form method="POST" action="{{url('admin/payment_gateway')}}" accept-charset="UTF-8" class="form-horizontal bordered" role="form">
                                    {{ csrf_field() }}

                                    @foreach($paymentGateway as $pay)                                        
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label text-right">{{$pay->site}} {{$pay->name}}<span class="text-danger">*</span></label>
                                            <div class="col-sm-6">
                                                <input type="text" name="{{$pay->site}}__{{$pay->name}}" value="{{$pay->value}}" class="form-control" aria-label="Edit" required>
                                            </div>
                                        </div>                               
                                    @endforeach

                                    <div class="form-group row">
                                        <div class="col-sm-12 text-center">
                                            <button type="submit" id="createuserbtn" class="btn btn-info btn-round">Submit</button>                                    
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="styleSelector"></div>
        </div>
    </div>
</div>  
 
@stop