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
	</style>
      
      <!-- ******CONTENT****** --> 
        <div class="content container" ng-controller="ManageStudentCtrl">
            <div class="page-wrapper">
                <header class="page-heading clearfix">
                    <h1 class="heading-title pull-left">Student Management</h1>
                    <div class="breadcrumbs pull-right">
                        <ul class="breadcrumbs-list">
                            <li class="breadcrumbs-label">You are here:</li>
                            <li><a href="<?php echo $headerData['base_url'];?>home">Home</a><i class="fa fa-angle-right"></i></li>
                            <li class="current">Manage Students</li>
                        </ul>
                    </div><!--//breadcrumbs-->
                </header> 
                <div class="page-content">
                    <div class="row page-row">
                        <div class="course-wrapper col-md-12 col-sm-12">                         
                            <article class="course-item">
                                <div class="tabbed-info page-row">    
                                	<ul class="nav nav-tabs">
						                <li class="active"><a href="#students_list" data-toggle="tab">Student Enrolment</a></li>
						                <li><a href="#upload_bulk_student" data-toggle="tab">Upload Bulk Student</a></li>
						                <li><a href="#manage_student" data-toggle="tab" ng-click="ManageStudents()">Manage Student</a></li>
						                <li><a href="#student_mark_sheet" data-toggle="tab">Student Mark Sheet</a></li>
						            </ul>
                                    <div class="tab-content">
                                    	<!-- Student Enrolment -->
                                        <div class="tab-pane active" id="students_list">
                                        	<div class="row">
					                            <div class="col-xs-12 col-sm-12 center tab-pane fade in">
					                            	<div class="ng-scope text-left">	   
					                            		<button class="btn btn-success margin-bottom-5" ng-click="OpenAddModal()"><i class="fa fa-plus fa-lg"></i> Add New Student</button>                         
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
															<h3 class="modal-title">Student Enrolment</h3>
														</div>
														<div class=" col-xs-1 col-sm-1 col-md-1 ">
															<button type="button" class="close" aria-label="Close" ng-click="cancel()"><span aria-hidden="true"><i class="fa fa-close"></i></span></button>
														</div>
													</div>
												</div>
												<form role="form" name="frmEnrolment" class="form-horizontal" ng-submit="enrolment.add()">
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
																					<input type="text" ng-model="EnrolmentEntity.first_name" required class="form-control">
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
																					<input type="text" ng-model="EnrolmentEntity.last_name" required class="form-control">
																				</div>
																			</div>
																		</div>
																		<div class="row margin-bottom-10">
																			<div class="col-md-3">
																				<div class="">
																					<label class="control-label">Father Name</label>
																				</div>
																			</div>
																			<div class="col-md-9">
																				<div class="">
																					<input type="text" ng-model="EnrolmentEntity.father_name" required class="form-control">
																				</div>
																			</div>
																		</div>
																		<div class="row margin-bottom-10">
																			<div class="col-md-3">
																				<div class="">
																					<label class="control-label">Mother Name</label>
																				</div>
																			</div>
																			<div class="col-md-9">
																				<div class="">
																					<input type="text" ng-model="EnrolmentEntity.mother_name" required class="form-control">
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
																						ng-model="EnrolmentEntity.date_of_birth" 
																						datepicker-popup="dd/MM/yyyy"
																						show-weeks="false" 
																						show-button-bar="false"
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
																					<label class="control-label">Gender</label>
																				</div>
																			</div>
																			<div class="col-md-9">
																				<div class="">
																					<select name="gender_id" ng-model="EnrolmentEntity.gender_id" class="form-control width-100" required>
																						<option ng-repeat="row in genderlist" ng-selected="{{row.gender_id == EnrolmentEntity.gender_id}}" value="{{row.gender_id}}">
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
																					<select name="religion_id" ng-model="EnrolmentEntity.religion_id" class="form-control width-100" required>
																						<option ng-repeat="row in religionlist" ng-selected="{{row.religion_id == EnrolmentEntity.religion_id}}" value="{{row.religion_id}}">
																							{{row.religion_name}}
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
																					<input type="text" ng-model="EnrolmentEntity.address" required class="form-control">
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
																					<input type="text" ng-model="EnrolmentEntity.mobile_no" required class="form-control">
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
                                        <!-- End Student Enrolment -->
                                        
                                        <!-- Upload Bulk Student -->
                                        <div class="tab-pane" id="upload_bulk_student">
                                        </div>
                                        <!-- End Upload Bulk Student -->
                                        
                                        <!-- Manage Student -->
                                        <div class="tab-pane" id="manage_student">
                                        	<p class="center">{{manage_student}}</p>
						                  	<div class="row">
						                  		<div class="col-xs-12 col-sm-12">
						                  			<div class="row">
						                  				<div class="col-xs-12 col-md-2 col-sm-3 text-right">
															<div class="" style="margin-top: 8px">
																<label class="control-label">From Class</label>
															</div>
														</div>
														<div class="col-xs-12 col-md-2 col-sm-3">
															<div class="">
																<select name="class_id" ng-disabled="new_student" ng-model="class_id" class="form-control width-100" required>
																	<option ng-repeat="row in classlist" ng-selected="{{row.class_id == class_id}}" value="{{row.class_id}}">
																		{{row.class_name}}
																	</option>
																</select>
															</div>
														</div>
														<div class="col-xs-12 col-md-2 col-sm-3 text-right">
															<div class="" style="margin-top: 8px">
																<label class="control-label">From Section</label>
															</div>
														</div>
														<div class="col-xs-12 col-md-2 col-sm-3">
															<div class="">
																<select name="section_id" ng-disabled="new_student || class_id == ''? true:false" 
																ng-model="section_id" 
																ng-change="ManageStudents()"
																class="form-control width-100" required>
																	<option ng-repeat="row in sectionlist" ng-selected="{{row.section_id == section_id}}" value="{{row.section_id}}">
																		{{row.section_name}}
																	</option>
																</select>
															</div>
														</div>
						                  				<div class="col-xs-12 col-md-4 col-sm-4 text-left">
						                  					<div class="checkbox" style="margin-left: 4px;">
										                        <label>
										                          <input ng-model="new_student" ng-change="LoadEnrolmentStudent(new_student)" type="checkbox" style="transform: scale(1.5);"/><strong>&nbsp;New Students</strong>
										                        </label>
									                      	</div>
						                  				</div>
						                  			</div>
						                  			
						                  			<div class="row">
														<div class="col-xs-12 col-md-2 col-sm-3 text-right">
															<div class="" style="margin-top: 8px">
																<label class="control-label">To Class</label>
															</div>
														</div>
														<div class="col-xs-12 col-md-2 col-sm-3">
															<div class="">
																<select name="to_class_id" ng-disabled="new_student" ng-model="to_class_id" class="form-control width-100" required>
																	<option ng-repeat="row in classlist" ng-selected="{{row.class_id == to_class_id}}" value="{{row.class_id}}">
																		{{row.class_name}}
																	</option>
																</select>
															</div>
														</div>
														<div class="col-xs-12 col-md-2 col-sm-3 text-right">
															<div class="" style="margin-top: 8px">
																<label class="control-label">To Section</label>
															</div>
														</div>
														<div class="col-xs-12 col-md-2 col-sm-3">
															<div class="">
																<select name="to_section_id" ng-disabled="new_student || to_class_id == ''? true:false" 
																ng-model="to_section_id" class="form-control width-100" required>
																	<option ng-repeat="row in sectionlist" ng-selected="{{row.section_id == to_section_id}}" value="{{row.section_id}}">
																		{{row.section_name}}
																	</option>
																</select>
															</div>
														</div>
						                  				<div class="col-xs-12 col-md-4 col-sm-4 text-left">
						                  					<button class="btn btn-success margin-bottom-5" 
						                  					ng-disabled="((gridOptionsManageStudent.data|filter:{ is_checked: true }).length >0 && (new_student || (class_id != '' && section_id != ''))? false:true)"
						                  					ng-click="ProceedtoNextClass()">
						                  					<i class="fa fa-certificate fa-lg"></i> Proceed to Next Class</button>
						                  				</div>
						                  			</div>                               
					                            </div>
					                            <div class="col-xs-12 col-sm-12 center tab-pane fade in">
					                            	<div class="ng-scope text-left">	                          
						                        		<div class="grid" ui-grid="gridOptionsManageStudent" ui-grid-auto-resize ui-grid-resize-columns>
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
                                        </div>
                                        <!-- End Manage Student -->
                                        
                                        <!-- Student Mark Sheet -->
                                        <div class="tab-pane" id="student_mark_sheet">
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