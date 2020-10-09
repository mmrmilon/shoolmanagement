      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper" ng-app="exam">
       <!-- Content Header (Page header) -->
        <section class="content-header">
          <h1>Exam Details<small>Control Panel</small></h1>
          <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">Exam</li>
          </ol>
        </section>
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
              <div class="box">
	              <div class="nav-tabs-custom">
	                <!-- Tabs within a box -->
	                <ul class="nav nav-tabs pull-right">
	                  <li class="active"><a href="#exam_details" data-toggle="tab">EXAM SCHEDULE</a></li>
	                  <li><a href="#exam_routine" data-toggle="tab">EXAM ROUTINE</a></li>
	                  <li><a href="#grade_details" data-toggle="tab">GRADE DETAILS</a></li>
	                  <li><a href="#result_processing" data-toggle="tab">RESULT PROCESSING</a></li>
	                  <li class="pull-left header"><i class="fa fa-th"></i> Exam Details</li>
	                </ul>
	                <div class="tab-content no-padding">
	                  <div class="tab-pane fade in active" id="exam_details" style="position: relative; height: 300px; padding: 5px;">
	                  	<div ng-controller="ExamCtrl">
						  <table class="table table-bordered table-hover table-condensed table-responsive">
						  	<thead>
					            <tr>
					                <th ng-click="sortBy='exam_name';reverse=!reverse"><a href="#" >Exam Name</a><span class="fa fa-sort center-block"></span></th>
					                <th ng-click="sortBy='exam_type';reverse=!reverse"><a href="#" >Exam Type</a><span class="fa fa-sort center-block"></span></th>
					                <th class="text-center" ng-click="sortBy='start_date';reverse=!reverse"><a href="#" >Start Date</a><span class="fa fa-sort pull-right"></span></th>
					                <th class="text-center" ng-click="sortBy='end_date';reverse=!reverse"><a href="#" >End Date</a><span class="fa fa-sort pull-right"></span></th>
					                <th class="text-center" ng-click="sortBy='exam_year';reverse=!reverse"><a href="#" >Exam Year</a><span class="fa fa-sort pull-right"></span></th>
					                <th class="text-center">Action</th>
					            </tr>
					        </thead>
					        <tbody>
							    <tr ng-repeat="exam in exams | filter:customerFilter | orderBy:sortBy:reverse">
							      <td>
							        <span editable-text="exam.exam_name" e-name="exam_name" e-form="rowform" onbeforesave="checkExamName($data, exam.exam_id)" e-required>
							          {{ exam.exam_name || 'empty' }}
							        </span>
							      </td>
							      <td>
							        <span editable-text="exam.exam_type" e-name="exam_type" e-form="rowform">
							          {{ exam.exam_type || 'empty' }}
							        </span>
							      </td>
							      <td class="text-center">
							        <span editable-bsdate="exam.start_date" e-name="start_date" e-datepicker-popup="dd-MMMM-yyyy" e-show-weeks="false" e-form="rowform" onbeforesave="checkExamDate($data, exam.exam_id)" e-required>
							          {{ (exam.start_date | date:"dd/MM/yyyy") || 'empty' }}
							        </span>
							      </td>
							      <td class="text-center">
							      	<span editable-bsdate="exam.end_date" e-name="end_date" e-datepicker-popup="dd-MMMM-yyyy" e-show-weeks="false" e-form="rowform" onbeforesave="checkExamDate($data, exam.exam_id)" e-required>
							          {{ (exam.end_date | date:"dd/MM/yyyy") || 'empty' }}
							        </span>
							      </td>
							      <td class="text-center">
							        <span editable-text="exam.exam_year" e-name="exam_year" e-form="rowform" onbeforesave="checkExamYear($data, exam.exam_id)" e-required>
							          {{ exam.exam_year || 'empty' }}
							        </span>
							      </td>
							      <td style="white-space: nowrap; width: 10%;" class="text-center">
							        <!-- form -->
							        <form editable-form name="rowform" onbeforesave="updateExamDetails($data, exam.exam_id)" ng-show="rowform.$visible" class="form-buttons form-inline" shown="inserted == exam">
							          <button type="submit" ng-disabled="rowform.$waiting" class="btn btn-primary">Save</button>
							          <button type="button" ng-disabled="rowform.$waiting" ng-click="rowform.$cancel()" class="btn btn-default">Cancel</button>
							        </form>
							        <div class="buttons" ng-show="!rowform.$visible">
							          <button class="btn btn-primary" ng-click="rowform.$show()"><i class="fa fa-pencil fa-lg"></i> Edit</button>
							        </div>  
							      </td>
							    </tr>
						    </tbody>
						  </table>						
						  <button class="btn btn-primary" ng-click="addExamSchedule()"><i class="fa fa-plus fa-lg"></i>&nbsp;New Exam Schedule</button>
						</div>
	                  </div><!-- End Exam Details -->
	                  
	                  <div class="tab-pane fade in" id="exam_routine" style="position: relative; height: 300px; padding: 5px;">
	                  	<p class="center">Comming Soon....</p>
	                  </div><!-- End Exam Routine -->
	                  
	                  <div class="tab-pane fade in" id="grade_details" style="position: relative; height: 300px; padding: 5px;">
	                  </div><!-- End Exam Details -->
	                  
	                  <div class="tab-pane fade in" id="result_processing" style="position: relative; height: 300px; padding: 5px;">
	                  </div><!-- End Exam Details -->
	                </div>
	              </div><!-- /.nav-tabs-custom -->              	
              </div><!-- /.box -->
            </div><!-- /.col -->
          </div><!-- /.row -->
        </section>
      </div>
      <!-- /.content-wrapper -->