		<!-- ******CONTENT****** --> 
		<style style="text/css">
			.form-group {
			    margin-left: 0px !important;
			    margin-right: 0px !important;
			}
			.form-group {
			    margin-bottom: 15px;
			}
			.modal-footer {
			    border-top: 1px solid #e5e5e5;
			    padding: 15px 15px 15px 0px !important;
			    text-align: left !important;
			}
			
		</style>
		
        <div class="content container" ng-controller="EventsCtrl">
            <div class="page-wrapper">
                <header class="page-heading clearfix">
                    <h1 class="heading-title pull-left">New Events&nbsp;(&nbsp;<a href="javascript:void(0)" ng-click="load()"><i class="fa fa-refresh"></i></a>&nbsp;)</h1>
                    <div class="breadcrumbs pull-right">
                        <ul class="breadcrumbs-list">
                            <li class="breadcrumbs-label">You are here:</li>
                            <li><a href="<?php echo $headerData['base_url'];?>home">Home</a><i class="fa fa-angle-right"></i></li>
                            <li class="current">New Event</li>
                        </ul>
                    </div><!--//breadcrumbs-->
                </header> 
                <div class="page-content">
                	<div class="row page-row">
                        <div class="events-wrapper col-md-6 col-sm-5">     
                        	<article class="events-item page-row has-divider clearfix" ng-repeat="row in eventlist">
                                <div class="date-label-wrapper col-md-1 col-sm-2">
                                    <p class="date-label">
                                        <span class="month">{{row.event_month}}</span>
                                        <span class="date-number">{{ row.start_date | date:'dd'}}</span>
                                    </p>
                                </div><!--//date-label-wrapper-->
                                <div class="details col-md-11 col-sm-10">
                                    <h3 class="title">{{row.event_name}}&nbsp;<a href="javascript:void(0)" ng-click="edit(row)"><i class="fa fa-pencil-square"></i></a></h3>
                                    <p class="meta">
                                    	<span class="time"><i class="fa fa-clock-o"></i>{{row.start_time | date: 'h:mm a'}} - {{row.end_time | date: 'h:mm a'}}</span>
                                    	<span class="location"><i class="fa fa-map-marker"></i><a href="javascript:void(0)">{{row.event_location}}</a></span>
                                    </p>  
                                    <p class="desc text-justify">{{row.event_details}}</p>                       
                                </div><!--//details-->
                            </article><!--//events-item-->                         
                        </div><!--//events-wrapper-->
                        
                        <aside class="page-sidebar  col-md-5 col-md-offset-1 col-sm-5 col-sm-offset-1">                    
                            <article class="contact-form page-row">
                        		<form role="form" name="frmEvent" class="form-horizontal" ng-submit="event.save()">
	                            	<div class="row">
	                            		<div class="col-xl-12 col-md-12 col-sm-5">
			                                <div class="form-group start_date">
			                                    <label for="start_date">Start Date<span class="required">*</span></label>
			                                    <div class='input-group start_date'>                                               															
													<input type="text" class="form-control" required
													ng-model="EventEntity.start_date" 
													datepicker-popup="dd/MM/yyyy"
													show-weeks="false" 
													show-button-bar="false"
													is-open="start_date.opened">
													<span class="input-group-addon">
														<span class="glyphicon glyphicon-calendar"></span>
													</span>
												</div>
			                                </div>
			                                
			                                <div class="form-group end_date">
			                                    <label for="end_date">End Date<span class="required">*</span></label>
			                                    <div class='input-group end_date'>                                               															
													<input type="text" class="form-control" required
													ng-model="EventEntity.end_date" 
													datepicker-popup="dd/MM/yyyy"
													show-weeks="false" 
													show-button-bar="false"
													is-open="end_date.opened">
													<span class="input-group-addon">
														<span class="glyphicon glyphicon-calendar"></span>
													</span>
												</div>
			                                </div>
			                                <div class="form-group start_time" ng-class="{'has-error': frmEvent.start_time.$invalid}">
			                                    <label for="start_time">Start Time<span class="required">*</span></label>
			                                    <div class='input-group start_time'> 
													<input type="text" class="form-control" size="8" 
													ng-model="EventEntity.start_time" name="EventEntity.start_time" 
													bs-timepicker>
													<span class="input-group-addon">
														<span class="glyphicon glyphicon-time"></span>
													</span>
												</div>
			                                </div>
			                                <div class="form-group end_time" ng-class="{'has-error': frmEvent.end_time.$invalid}">
			                                    <label for="end_time">End Time<span class="required">*</span></label>
			                                    <div class='input-group end_time'>                                               															
													<input type="text" class="form-control" size="8"
													ng-model="EventEntity.end_time" name="EventEntity.end_time"
													bs-timepicker>
													<span class="input-group-addon">
														<span class="glyphicon glyphicon-time"></span>
													</span>
												</div>
			                                </div>
			                                
			                                <div class="form-group event_location">
			                                    <label for="event_name">Event Location</label>
			                                    <input id="event_name" type="text" ng-model="EventEntity.event_location" class="form-control" placeholder="Enter your event location" required>
			                                </div>
			                                			                                
			                                <div class="form-group event_name">
			                                    <label for="event_name">Event Name</label>
			                                    <input id="event_name" type="text" ng-model="EventEntity.event_name" class="form-control" placeholder="Enter your event name" required>
			                                </div>
			                                
			                                <div class="form-group event_details">
			                                    <label for="event_details">Event Details</label>
			                                    <textarea id="event_details" ng-model="EventEntity.event_details" rows="6" class="form-control" placeholder="Enter your event details" required></textarea>
			                                </div>
	                            		</div>
	                            	</div>
	                                <!--//form-group-->
	                                <div class="modal-footer">
										<button type="submit" class="btn btn-theme"><i class="fa fa-check"></i> Submit</button>
									</div>
	                            </form>                  
	                        </article>
                        </aside>
                    </div>
                </div><!--//page-content-->
            </div><!--//page--> 
        </div><!--//content-->
    </div><!--//wrapper-->