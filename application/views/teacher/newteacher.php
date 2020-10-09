      <style>
		.modal-dialog {
		    width: 500px !important;
		}
	    .grid {
	        max-height: 450px;
	        height: auto;
			width: 100%;
	    }
		.ui-grid-header-cell-row {
		    text-align: center;
		}
		div.ui-grid-cell button {
		    font-size: 12px;
		    margin-top: 4% !important;
		}
		.button-small {
		    padding: 2px 4px !important;
		}
		.margin-top-5 {
		    margin-top: 5px;
		}
		.margin-top-10 {
		    margin-top: 10px;
		}
		.margin-bottom-5 {
		    margin-bottom: 5px;
		}
		.margin-bottom-10 {
		    margin-bottom: 10px;
		}
		.grid-msg-overlay {
		  position: absolute;
		  top: 0;
		  bottom: 0;
		  width: 100%;
		  background: #fff;
		}
		
		.grid-msg-overlay .msg {
			background-color: #fff;
		    border: 1px solid #555;
		    border-radius: 4px;
		    display: table;
		    font-size: 24px;
		    height: 50px;
		    left: 50%;
		    opacity: 1;
		    position: absolute;
		    text-align: center;
		    top: 50px;
		    width: 50px;
		}
		
		.grid-msg-overlay .msg span {
		  display: table-cell;
		  vertical-align: middle;
		}
		.ui-grid-cell span {
			padding-left:1px;
		}
		div.ui-grid-cell input[type="checkbox"] {
		    margin: 4px 0 0 13px;
		    width: auto;
		}
		
		.ui-grid-header-cell input[type="checkbox"] {
    		line-height: normal;
    		margin: 8px 0 0 !important;
		}
		.bg-ghost-white {
		    background-color: #f4f4f5 !important;
		}
		.small-box:hover {
			color: #000000 !important
		}
		
.profile-picture {
    background-color: #fff;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    display: inline-block;
    max-width: 100%;
    padding: 4px;
}
.profile-user-info {
    display: table;
    margin: 0 auto;
    width: calc(100% - 24px);
}
.profile-info-row {
    display: table-row;
}
.profile-info-name {
    background-color: transparent;
    color: #667e99;
    font-weight: 400;
    padding: 6px 10px 6px 4px;
    text-align: right;
    vertical-align: middle;
    width: 110px;
}
.profile-info-name, .profile-info-value {
    border-top: 1px dotted #d5e4f1;
    display: table-cell;
}

.profile-info-value {
    padding: 6px 4px 6px 6px;
}
	</style>
	
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper" ng-controller="TeacherCtrl">
       <!-- Content Header (Page header) -->
        <section class="content-header">
          <h1>Teacher Details<small>Control Panel</small></h1>
          <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">Teacher</li>
          </ol>
        </section>
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
              <div class="box">
	              <div class="nav-tabs-custom">
	                <!-- Tabs within a box -->
	                <ul class="nav nav-tabs pull-right">
	                  <li class="active"><a href="#manage_teacher" data-toggle="tab">TEACHERS LIST</a></li>
	                  <li><a href="#teacher_list" data-toggle="tab" ng-click="ManageTeachers()">MANAGE TEACHERS</a></li>
	                  <li><a href="#my_profile" data-toggle="tab">MY PROFILE</a></li>
	                  <li><a href="#my_class_routine" data-toggle="tab">MY CLASS ROUTINE</a></li>
	                  <li class="pull-left header"><i class="fa fa-users"></i> Teachers</li>
	                </ul>
	                <div class="tab-content no-padding">
	                
	                   <div class="tab-pane fade in active" id="manage_teacher" style="position: relative; height: auto; padding: 5px;">
		                  	<div class="row">
	                            <div class="col-xs-12 col-sm-12 center tab-pane fade in">
	                            	<div class="col-lg-4 col-xs-6" ng-repeat="row in teachers">
						              <!-- small box -->
						              <div class="small-box bg-ghost-white">
						                <div class="inner">
						                  <h4>{{row.full_name}}</h4>
						                  <p>{{row.designation}}</p>
						                  <p>Since&nbsp;<b>{{row.joining_date | date:'MMM'}}</b>.<b>{{row.joining_date | date:'yyyy'}}</b></p>
						                </div>
						                <div class="icon">
						                  <div class="pull-left image">
								              <img alt="User Image" class="img-circle" src="http://localhost:8014/sonaichandihighschool/assets/dist/img/teacher_120x120.png">
								          </div>
						                </div>
						                <a class="small-box-footer" href="javascript:void(0)" ng-click="OpenDeatilModal(row)">
						                  More info <i class="fa fa-arrow-circle-right"></i>
						                </a>
						              </div>
						            </div>
            
	                            </div>
	                        </div>
	                        
	                        <!-- Start Details Modal View -->
							<script type="text/ng-template" id="DetailModalView">
								<div class="modal-header">
									<div class="row">
										<div class="col-xs-11 col-sm-11 col-md-11 ">
											<h3 class="modal-title">Teacher Profile</h3>
										</div>
										<div class=" col-xs-1 col-sm-1 col-md-1 ">
											<button type="button" class="close" aria-label="Close" ng-click="cancel()"><span aria-hidden="true"><i class="fa fa-close"></i></span></button>
										</div>
									</div>
								</div>
								<form role="form" name="frmEnrolment" class="form-horizontal">
									<div class="modal-body">
										<div role="form" class="form-horizontal">
											<div class="padding-10">									
												<div class="row">
													<div class="col-xs-12 col-sm-4 center">
														<span class="profile-picture">
															<img src="http://localhost:8014/sonaichandihighschool/assets/dist/img/teacher_120x120.png" alt="teacher details" class="img-responsive">
														</span>

														<div class="space space-4"></div>
														<!-- 
														<a class="btn btn-sm btn-block btn-success" href="#">
															<i class="ace-icon fa fa-plus-circle bigger-120"></i>
															<span class="bigger-110">Add as a friend</span>
														</a>
														-->
														<a class="btn btn-sm btn-block btn-primary" href="#">
															<i class="ace-icon fa fa-envelope-o bigger-110"></i>
															<span class="bigger-110">Send a message</span>
														</a>
													</div><!-- /.col -->

													<div class="col-xs-12 col-sm-8">
														<h4 class="blue">
															<span class="middle">{{DetailsEntity.full_name}}</span>
														</h4>

														<div class="profile-user-info">
															<div class="profile-info-row">
																<div class="profile-info-name"> Designation </div>
																<div class="profile-info-value">
																	<span>{{DetailsEntity.designation}}</span>
																</div>
															</div>

															<div class="profile-info-row">
																<div class="profile-info-name"> Address </div>

																<div class="profile-info-value">
																	<i class="fa fa-map-marker light-orange bigger-110"></i>
																	<span>{{DetailsEntity.address}}</span>
																</div>
															</div>

															<div class="profile-info-row">
																<div class="profile-info-name"> Age </div>

																<div class="profile-info-value">
																	<span>38</span>
																</div>
															</div>

															<div class="profile-info-row">
																<div class="profile-info-name"> Joined </div>

																<div class="profile-info-value">
																	<span>{{DetailsEntity.joining_date}}</span>
																</div>
															</div>
														</div>
													</div><!-- /.col -->
												</div>
												<div class="row">
													<div class="col-lg-12 col-xs-12 col-sm-12">
														<div class="widget-box transparent">
															<div class="widget-header widget-header-small">
																<h4 class="widget-title smaller">
																	<i class="ace-icon fa fa-check-square-o bigger-110"></i>
																	Little About Me
																</h4>
															</div>

															<div class="widget-body">
																<div class="widget-main">
																	<p>
																		My job is mostly lorem ipsuming and dolor sit ameting as long as consectetur adipiscing elit.
																	</p>
																	<p>
																		Sometimes quisque commodo massa gets in the way and sed ipsum porttitor facilisis.
																	</p>
																	<p>
																		The best thing about my job is that vestibulum id ligula porta felis euismod and nullam quis risus eget urna mollis ornare.
																	</p>
																	<p>
																		Thanks for visiting my profile.
																	</p>
																</div>
															</div>
														</div>
													</div>
													
												</div>
											</div>
										</div>
									</div>
								</form>
							</script>
						<!------------- END --------------->
	                        
	                  </div>
	                  <div class="tab-pane fade in" id="teacher_list" style="position: relative; height: 650px; padding: 5px;">
	                  	<div class="row">
                            <div class="col-xs-12 col-sm-12 center tab-pane fade in">
                                <div class="ng-scope text-left">
                                    <button class="btn btn-success margin-bottom-5" ng-click="OpenAddModal()"><i class="fa fa-plus fa-lg"></i> Add New Teacher</button>
                                    <div class="grid" ui-grid="gridOptions" ui-grid-edit></div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Start Add Modal View -->
						<script type="text/ng-template" id="AddModalView">
								<div class="modal-header">
									<div class="row">
										<div class="col-xs-11 col-sm-11 col-md-11 ">
											<h3 class="modal-title">Teacher Information</h3>
										</div>
										<div class=" col-xs-1 col-sm-1 col-md-1 ">
											<button type="button" class="close" aria-label="Close" ng-click="cancel()"><span aria-hidden="true"><i class="fa fa-close"></i></span></button>
										</div>
									</div>
								</div>
								<form role="form" name="frmEnrolment" class="form-horizontal" ng-submit="teacher.save()">
									<div class="modal-body">
										<div role="form" class="form-horizontal">
											<div class="padding-10">									
												<div class="row">
													<div class="col-md-12">
														<div class="row margin-bottom-10">
															<div class="col-md-3">
																<div class="">
																	<label class="control-label">First Name</label>
																</div>
															</div>
															<div class="col-md-9">
																<div class="">
																	<input type="text" ng-model="TeacherEntity.first_name" required class="form-control">
																</div>
															</div>
														</div>
														<div class="row margin-bottom-10">
															<div class="col-md-3">
																<div class="">
																	<label class="control-label">Last Name</label>
																</div>
															</div>
															<div class="col-md-9">
																<div class="">
																	<input type="text" ng-model="TeacherEntity.last_name" required class="form-control">
																</div>
															</div>
														</div>
														<div class="row margin-bottom-10">
															<div class="col-md-3">
																<div class="">
																	<label class="control-label">Date of Birth</label>
																</div>
															</div>
															<div class="col-md-9">
																<div class="">
																	<div class='input-group date'>                                               															
																		<input type="text" class="form-control" required
																		ng-model="TeacherEntity.date_of_birth" 
																		datepicker-popup="dd/MM/yyyy"
																		show-weeks="false" 
																		is-open="picker.opened">
																		<span class="input-group-addon">
																			<span class="glyphicon glyphicon-calendar"></span>
																		</span>
																	</div>
																</div>
															</div>
														</div>
														<div class="row margin-bottom-10">
															<div class="col-md-3">
																<div class="">
																	<label class="control-label">Joining Date</label>
																</div>
															</div>
															<div class="col-md-9">
																<div class="">
																	<div class='input-group date'>                                               															
																		<input type="text" class="form-control" required
																		ng-model="TeacherEntity.joining_date" 
																		datepicker-popup="dd/MM/yyyy"
																		show-weeks="false" 
																		is-open="joindatepicker.opened">
																		<span class="input-group-addon">
																			<span class="glyphicon glyphicon-calendar"></span>
																		</span>
																	</div>
																</div>
															</div>
														</div>
														<div class="row margin-bottom-10">
															<div class="col-md-3">
																<div class="">
																	<label class="control-label">Designation</label>
																</div>
															</div>
															<div class="col-md-9">
																<div class="">
																	<select name="designation_id" ng-model="TeacherEntity.designation_id" class="form-control width-100" required>
																		<option ng-repeat="row in designationlist" ng-selected="{{row.designation_id == TeacherEntity.designation_id}}" value="{{row.designation_id}}">
																			{{row.designation}}
																		</option>
																	</select>
																</div>
															</div>
														</div>
														<div class="row margin-bottom-10">
															<div class="col-md-3">
																<div class="">
																	<label class="control-label">Address</label>
																</div>
															</div>
															<div class="col-md-9">
																<div class="">
																	<input type="text" ng-model="TeacherEntity.address" required class="form-control">
																</div>
															</div>
														</div>
														<div class="row margin-bottom-10">
															<div class="col-md-3">
																<div class="">
																	<label class="control-label">Mobile No.</label>
																</div>
															</div>
															<div class="col-md-9">
																<div class="">
																	<input type="text" ng-model="TeacherEntity.mobile_number" required class="form-control">
																</div>
															</div>
														</div>
														<div class="row margin-bottom-10">
															<div class="col-md-3">
																<div class="">
																	<label class="control-label">Gender</label>
																</div>
															</div>
															<div class="col-md-9">
																<div class="">
																	<select name="gender_id" ng-model="TeacherEntity.gender_id" class="form-control width-100" required>
																		<option ng-repeat="row in genderlist" ng-selected="{{row.gender_id == TeacherEntity.gender_id}}" value="{{row.gender_id}}">
																			{{row.gender_name}}
																		</option>
																	</select>
																</div>
															</div>
														</div>
														<div class="row margin-bottom-10">
															<div class="col-md-3">
																<div class="">
																	<label class="control-label">Religion</label>
																</div>
															</div>
															<div class="col-md-9">
																<div class="">
																	<select name="religion_id" ng-model="TeacherEntity.religion_id" class="form-control width-100" required>
																		<option ng-repeat="row in religionlist" ng-selected="{{row.religion_id == TeacherEntity.religion_id}}" value="{{row.religion_id}}">
																			{{row.religion_name}}
																		</option>
																	</select>
																</div>
															</div>
														</div>														
													</div>
												</div>

											</div>
										</div>
									</div>
									<div class="modal-footer">
										<button type="submit" class="btn btn-default"><i class="fa fa-check"></i> Save</button>
										<button class="btn btn-default" type="button" ng-click="cancel()"><i class="fa fa-close"></i> Cancel</button>
									</div>
								</form>
							</script>
						<!------------- END --------------->
                        
	                  </div><!-- End Exam Details -->
	                  
	                  <div class="tab-pane fade in" id="my_profile" style="position: relative; height: 300px; padding: 5px;">
	                  	<p class="center">My profile page under development....</p>
	                  </div><!-- End My Profile -->
	                  
	                  <div class="tab-pane fade in" id="my_class_routine" style="position: relative; height: 300px; padding: 5px;">
	                  	<p class="center">My class routine page under development....</p>
	                  </div><!-- End My Class Routine -->
	                  
	                </div>
	              </div><!-- /.nav-tabs-custom -->              	
              </div><!-- /.box -->
            </div><!-- /.col -->
          </div><!-- /.row -->
        </section>
      </div>
      <!-- /.content-wrapper -->