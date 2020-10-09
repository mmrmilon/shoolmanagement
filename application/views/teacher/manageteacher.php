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
      
      <!-- ******CONTENT****** --> 
        <div class="content container" ng-controller="ManageTeacherCtrl">
            <div class="page-wrapper">
                <header class="page-heading clearfix">
                    <h1 class="heading-title pull-left">Manage Teachers</h1>
                    <div class="breadcrumbs pull-right">
                        <ul class="breadcrumbs-list">
                            <li class="breadcrumbs-label">You are here:</li>
                            <li><a href="<?php echo $headerData['base_url'];?>home">Home</a><i class="fa fa-angle-right"></i></li>
                            <li class="current">Manage Teacher</li>
                        </ul>
                    </div><!--//breadcrumbs-->
                </header> 
                <div class="page-content">
                    <div class="row page-row">
                        <div class="course-wrapper col-md-12 col-sm-12">                         
                            <article class="course-item">
                                <div class="tabbed-info page-row">    
                                	<ul class="nav nav-tabs">
					                  	<li class="active"><a href="#teacher_list" data-toggle="tab">MANAGE TEACHERS</a></li>
					                  	<li><a href="#my_class_routine" data-toggle="tab">CLASS ROUTINE</a></li>
						            </ul>
                                    <div class="tab-content">
                                    	<!-- Manage Teacher -->
                                        <div class="tab-pane active" id="teacher_list">
                                        	<div class="row">
					                            <div class="col-xs-12 col-sm-12 center tab-pane fade in">
					                            	<div class="ng-scope text-left">	   
					                            		<button class="btn btn-success margin-bottom-5" ng-click="OpenAddModal()"><i class="fa fa-plus fa-lg"></i> Add New Teacher</button>                         
						                        		<div class="grid" ui-grid="gridOptions" ui-grid-auto-resize ui-grid-resize-columns>
									                        <div class="grid-msg-overlay" ng-hide="!loading">
									                          <div class="msg">
									                            <span>
									                              <i class="fa fa-spinner fa-spin white"></i>
									                            </span>
									                          </div>
									                        </div>
									                    </div>
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
										<button type="submit" class="btn btn-success"><i class="fa fa-check"></i> Save</button>
										<button class="btn btn-success" type="button" ng-click="cancel()"><i class="fa fa-close"></i> Cancel</button>
									</div>
								</form>
							</script>
						<!------------- END --------------->
						
                                        </div>
                                        <!-- End Manage Teacher -->
                                                                                
                                        <!-- Student Mark Sheet -->
                                        <div class="tab-pane" id="my_class_routine">
                                        </div>
                                        <!-- End Student Mark Sheet -->
                                        
                                        
                                    </div>
                                </div><!--//tabbed-info-->                     
                            </article><!--//course-item-->                                              
                        </div><!--//course-wrapper-->
                    </div><!--//page-row-->
                </div><!--//page-content-->
            </div><!--//page--> 
        </div><!--//content-->
    </div><!--//wrapper-->