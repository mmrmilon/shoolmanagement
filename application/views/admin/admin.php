      <style>
		.modal-dialog {
		    width: 500px !important;
		}
		.message-modal .modal-dialog{
			width: 950px !important;
		}
		
		.ta-editor{
			height: 250px;
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
		.header-cell{
			border:1px solid #d4d4d4;
			background-color: #d4d4d4;
		}
		.table > tbody > tr > td {
		    border-top: 1px solid #ddd;
		    line-height: 1.42857;
		    padding: 8px;
		    vertical-align: middle !important;
		}
		
		
	</style>
      
      <!-- ******CONTENT****** --> 
        <div class="content container" ng-controller="AdministrativeCtrl">
            <div class="page-wrapper">
                <header class="page-heading clearfix">
                    <h1 class="heading-title pull-left">Administrative Details</h1>
                    <div class="breadcrumbs pull-right">
                        <ul class="breadcrumbs-list">
                            <li class="breadcrumbs-label">You are here:</li>
                            <li><a href="<?php echo $headerData['base_url'];?>home">Home</a><i class="fa fa-angle-right"></i></li>
                            <li class="current">Administrator</li>
                        </ul>
                    </div><!--//breadcrumbs-->
                </header> 
                <div class="page-content">
                    <div class="row page-row">
                        <div class="course-wrapper col-md-12 col-sm-12">                         
                            <article class="course-item">
                                <div class="tabbed-info page-row">    
                                	<ul class="nav nav-tabs">
						                <li class="active"><a href="#messages_list" data-toggle="tab">Messages</a></li>
						            </ul>
                                    <div class="tab-content">
                                        <div class="tab-pane active" id="messages_list">
                                        	<div class="row">
												<div class="col-xs-12 col-sm-12 center tab-pane fade in">
													<div class="ng-scope text-left">	   
														<button class="btn btn-success margin-bottom-5" ng-click="OpenNewMessageModal()"><i class="fa fa-plus fa-lg"></i> New Message</button>                         
														<div  class="table-responsive grid">
															<table cellspacing="1" cellpadding="5" class="table table-bordered table-hover table-condensed  table-striped header-fixed table-condensed table-bordered" style="width:100%;">
																<thead>
																	 <tr>                                    	
																		<th class="text-left header-cell">From</th>
																		<th class="text-left header-cell">Title</th>
																		<th class="text-nowrap text-center header-cell">Message Details</th>
																		<th class="text-center header-cell">Created On</th>
																		<th class="text-center header-cell">Action</th>
																	</tr>	
																</thead>
																<tbody>                        																
																	<tr ng-repeat="row in messages">
																			<td valign="middle">{{row.msg_from}}</td>
																			<td valign="middle" align="left" ng-bind-html="row.msg_title"></td>
																			<td align="left" ng-bind-html="row.msg_details"></td>
																			<td valign="middle" align="left">{{row.msg_date }}</td>
																			<td valign="middle" class="text-center">
																				<button id="editBtn" type="button" class="btn btn-success button-small" 
																				ng-click="OpenMessageModal(row)" >
																				<i class=" fa fa-pencil"></i> Edit
																				</button> 
																			</td>
																	  </tr>
																  </tbody>
																  <div class="grid-msg-overlay testt" ng-hide="!loading" style="border:1px solid #c1dad7">
																	  <div class="msg">
																		<span>
																		  <i class="fa fa-spinner fa-spin white"></i>
																		</span>
																	  </div>
																 </div>
															  </table>
														  </div>
													</div>                               
												</div>
											</div>
													
										<!-- Start generate password Modal View -->
										<script type="text/ng-template" id="AddNewMessageModalView">
												<div class="modal-header">
													<div class="row">
														<div class="col-xs-11 col-sm-11 col-md-11 ">
															<h3 class="modal-title">Add Message</h3>
														</div>
														<div class=" col-xs-1 col-sm-1 col-md-1 ">
															<button type="button" class="close" aria-label="Close" ng-click="cancel()"><span aria-hidden="true"><i class="fa fa-close"></i></span></button>
														</div>
													</div>
												</div>
												<form role="form" name="module" class="form-horizontal" ng-submit="messages.save()">
													<div class="modal-body">
														<div role="form" class="form-horizontal">
															<div class="padding-10">									
																<div class="row">
																	<div class="col-md-12">
																		<div class="row">
																			<div class="col-md-12">
																				<div class="">
																					<label class="control-label">Title</label>
																					<input type="text" ng-model="MessageEntity.msg_title" required class="form-control">
																				</div>
																			</div>
																		</div>
																		<div class="row">
																			<div class="col-md-12">
																				<div class="">
																					<label class="control-label">Details</label>
																					<div class="angulareditor" text-angular="text-angular" name="MessageEntity.msg_details" ng-model="MessageEntity.msg_details"></div>
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
                                        
                                    </div>
                                </div><!--//tabbed-info-->                     
                            </article><!--//course-item-->                                              
                        </div><!--//course-wrapper-->
                    </div><!--//page-row-->
                </div><!--//page-content-->
            </div><!--//page--> 
        </div><!--//content-->
    </div><!--//wrapper-->