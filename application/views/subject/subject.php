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
	</style>
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper" ng-controller="SubjectCtrl">
       <!-- Content Header (Page header) -->
        <section class="content-header">
          <h1>Subject Details<small>Control Panel</small></h1>
          <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">Subject</li>
          </ol>
        </section>
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
              <div class="box">
	              <div class="nav-tabs-custom">
	                <!-- Tabs within a box -->
	                <ul class="nav nav-tabs pull-right">
	                  <li class="active"><a href="#teacher_list" data-toggle="tab">SUBJECT LIST</a></li>
	                  <li><a href="#my_profile" data-toggle="tab">MY PROFILE</a></li>
	                  <li><a href="#my_class_routine" data-toggle="tab">MY CLASS ROUTINE</a></li>
	                  <li class="pull-left header"><i class="fa fa-book"></i> Subject</li>
	                </ul>
	                <div class="tab-content no-padding">
	                  <div class="tab-pane fade in active" id="teacher_list" style="position: relative; height: 650px; padding: 5px;">
	                  	<div class="row">
                            <div class="col-xs-12 col-sm-12 center tab-pane fade in">
                                <div class="ng-scope text-left">
                                    <button class="btn btn-success margin-bottom-5" ng-click="OpenAddSubjectModal()"><i class="fa fa-plus fa-lg"></i> Add New Subject</button>
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
                        <!-- Start Add Subject Modal View -->
						<script type="text/ng-template" id="AddSubjectModalView">
								<div class="modal-header">
									<div class="row">
										<div class="col-xs-11 col-sm-11 col-md-11 ">
											<h3 class="modal-title">Add Subject</h3>
										</div>
										<div class=" col-xs-1 col-sm-1 col-md-1 ">
											<button type="button" class="close" aria-label="Close" ng-click="cancel()"><span aria-hidden="true"><i class="fa fa-close"></i></span></button>
										</div>
									</div>
								</div>
								<form role="form" name="module" class="form-horizontal" ng-submit="subject.add()">
									<div class="modal-body">
										<div role="form" class="form-horizontal">
											<div class="padding-10">									
												<div class="row">
													<div class="col-md-12">
														<div class="row margin-bottom-10">
															<div class="col-md-3">
																<div class="">
																	<label class="control-label">Subject Name</label>
																</div>
															</div>
															<div class="col-md-9">
																<div class="">
																	<input type="text" ng-model="SubjectEntity.subject_name" required class="form-control">
																</div>
															</div>
														</div>
														<div class="row margin-bottom-10">
															<div class="col-md-3">
																<div class="">
																	<label class="control-label">Subject Code</label>
																</div>
															</div>
															<div class="col-md-9">
																<div class="">
																	<input type="text" ng-model="SubjectEntity.subject_code" required class="form-control">
																</div>
															</div>
														</div>
														<div class="row margin-bottom-10">
															<div class="col-md-3">
																<div class="">
																	<label class="control-label">Assign to Class</label>
																</div>
															</div>
															<div class="col-md-9">
																<div class="">
																	<select ng-change="FilterClassSection()" ng-model="SubjectEntity.class_id" class="form-control" class="width-100">
																		<option ng-repeat="row in classlist" ng-selected="{{row.class_id == SubjectEntity.class_id}}" value="{{row.class_id}}">
																			{{row.class_name}}
																		</option>
																	</select>
																</div>
															</div>
														</div>
														<div class="row margin-bottom-10">
															<div class="col-md-3">
																<div class="">
																	<label class="control-label">Section/Group</label>
																</div>
															</div>
															<div class="col-md-9">
																<div class="">
																	<select ng-model="SubjectEntity.section_id" class="form-control" class="width-100">
																		<option ng-repeat="row in sectionlist" ng-selected="{{row.section_id == SubjectEntity.section_id}}" value="{{row.section_id}}">
																			{{row.section_name}}
																		</option>
																	</select>
																</div>
															</div>
														</div>
														<div class="row">
															<div class="col-md-3">
																<div class="">
																	<label class="control-label">Is Optional</label>
																</div>
															</div>
															<div class="col-md-9">
																<div class="margin-top-5">
																	<input type="checkbox" class="minimal" ng-model="SubjectEntity.is_optional"/>
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
						
						<!-- Start Add Subject Modal View -->
						<script type="text/ng-template" id="EditSubjectModalView">
								<div class="modal-header">
									<div class="row">
										<div class="col-xs-11 col-sm-11 col-md-11 ">
											<h3 class="modal-title">Edit Subject</h3>
										</div>
										<div class=" col-xs-1 col-sm-1 col-md-1 ">
											<button type="button" class="close" aria-label="Close" ng-click="cancel()"><span aria-hidden="true"><i class="fa fa-close"></i></span></button>
										</div>
									</div>
								</div>
								<form role="form" name="module" class="form-horizontal" ng-submit="subject.edit()">
									<div class="modal-body">
										<div role="form" class="form-horizontal">
											<div class="padding-10">									
												<div class="row">
													<div class="col-md-12">
														<div class="row margin-bottom-10">
															<div class="col-md-3">
																<div class="">
																	<label class="control-label">Subject Name</label>
																</div>
															</div>
															<div class="col-md-9">
																<div class="">
																	<input type="text" ng-model="SubjectEntity.subject_name" required class="form-control">
																</div>
															</div>
														</div>
														<div class="row margin-bottom-10">
															<div class="col-md-3">
																<div class="">
																	<label class="control-label">Subject Code</label>
																</div>
															</div>
															<div class="col-md-9">
																<div class="">
																	<input type="text" ng-model="SubjectEntity.subject_code" required class="form-control">
																</div>
															</div>
														</div>
														<div class="row margin-bottom-10">
															<div class="col-md-3">
																<div class="">
																	<label class="control-label">Assign to Class</label>
																</div>
															</div>
															<div class="col-md-9">
																<div class="">
																	<select ng-change="FilterClassSection()" ng-model="SubjectEntity.class_id" class="form-control" class="width-100">
																		<option ng-repeat="row in classlist" ng-selected="{{row.class_id == SubjectEntity.class_id}}" value="{{row.class_id}}">
																			{{row.class_name}}
																		</option>
																	</select>
																</div>
															</div>
														</div>
														<div class="row margin-bottom-10">
															<div class="col-md-3">
																<div class="">
																	<label class="control-label">Section/Group</label>
																</div>
															</div>
															<div class="col-md-9">
																<div class="">
																	<select ng-model="SubjectEntity.section_id" class="form-control" class="width-100">
																		<option ng-repeat="row in sectionlist" ng-selected="{{row.section_id == SubjectEntity.section_id}}" value="{{row.section_id}}">
																			{{row.section_name}}
																		</option>
																	</select>
																</div>
															</div>
														</div>
														<div class="row">
															<div class="col-md-3">
																<div class="">
																	<label class="control-label">Is Optional</label>
																</div>
															</div>
															<div class="col-md-9">
																<div class="margin-top-5">
																	<input type="checkbox" class="minimal" ng-model="SubjectEntity.is_optional"/>
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
	                  </div>
	                  
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