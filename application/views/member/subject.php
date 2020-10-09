      <style>
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
		.margin-bottom-5 {
		    margin-bottom: 5px;
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
	                  <li class="active"><a href="#teacher_list" data-toggle="tab">Subject List</a></li>
	                  <li><a href="#my_profile" data-toggle="tab">MY PROFILE</a></li>
	                  <li><a href="#my_class_routine" data-toggle="tab">MY CLASS ROUTINE</a></li>
	                  <li class="pull-left header"><i class="fa fa-users"></i> Teachers</li>
	                </ul>
	                <div class="tab-content no-padding">
	                  <div class="tab-pane fade in active" id="teacher_list" style="position: relative; height: 650px; padding: 5px;">
	                  	<div class="row">
                            <div class="col-xs-12 col-sm-12 center tab-pane fade in">
                                <div class="ng-scope text-left">
                                    <button class="btn btn-success margin-bottom-5" ng-click="addRow()"><i class="fa fa-plus fa-lg"></i> Add New Subject</button>
                                    <div class="grid" ui-grid="gridOptions" ui-grid-pagination ui-grid-exporter ui-grid-resize-columns>
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