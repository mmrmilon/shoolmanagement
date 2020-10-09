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
        <div class="content container" ng-controller="AlumniRegisterCtrl">
            <div class="page-wrapper">
                <header class="page-heading clearfix">
                    <h1 class="heading-title pull-left">The Alumni Society</h1>
                    <div class="breadcrumbs pull-right">
                        <ul class="breadcrumbs-list">
                            <li class="breadcrumbs-label">You are here:</li>
                            <li><a href="<?php echo $headerData['base_url'];?>member/home">Home</a><i class="fa fa-angle-right"></i></li>
                            <li class="current">Register</li>
                        </ul>
                    </div><!--//breadcrumbs-->
                </header> 
                <div class="page-content">
                    <div class="row page-row">
                        <aside class="page-sidebar col-md-2 col-sm-3 affix-top">                    
                            <section class="widget">
                                <ul class="nav">
                                    <li><a href="<?php echo $headerData['base_url'];?>alumni">Alumni</a></li>
                                    <li><a href="<?php echo $headerData['base_url'];?>alumni/member">Members</a></li>
                                    <li class="active"><a href="<?php echo $headerData['base_url'];?>alumni/register">Register</a></li>
                                </ul>                    
                            </section><!--//widget-->
                        </aside><!--//page-sidebar-->
                        
                        <!--content-wrapper-->
                        <div class="content-wrapper col-md-10 col-sm-9">
                        	<article class="contact-form page-row">
                        		<h3 class="title">Get in touch</h3>
                        		<p>We'd love to hear from you. Please fill up the following form with your full information and submit, so that we can contact with you in any emergency.</p>
	                            <form role="form" name="frmEnrolment" class="form-horizontal" ng-submit="alumni.save()">
	                            	<div class="row">
	                            		<div class="col-xl-12 col-md-6 col-sm-5">
			                                <div class="form-group full_name">
			                                    <label for="full_name">Full Name<span class="required">*</span></label>
			                                    <input id="full_name" type="text" ng-model="RegisterEntity.full_name" class="form-control" placeholder="Enter your full name" required>
			                                </div><!--//form-group-->
	                            			<div class="form-group name">
			                                    <label for="ssc_roll_no">Roll No.</label>
			                                    <input id="ssc_roll_no" type="text" ng-model="RegisterEntity.ssc_roll_no" class="form-control" placeholder="Enter your ssc roll/registration no.">
			                                </div><!--//form-group-->
			                                <div class="form-group gender_id">
			                                    <label for="gender_id">Gender</label>
			                                    <select name="gender_id" ng-model="RegisterEntity.gender_id" class="form-control width-100" required>
													<option ng-repeat="row in genderlist" ng-selected="{{row.gender_id == RegisterEntity.gender_id}}" value="{{row.gender_id}}">
														{{row.gender_name}}
													</option>
												</select>
			                                </div><!--//form-group-->	
			                                <div class="form-group blood_group">
			                                    <label for="blood_group">Blood Group</label>
			                                    <input id="blood_group" type="text" ng-model="RegisterEntity.blood_group" class="form-control" placeholder="Enter your blood group">
			                                </div>
			                                <div class="form-group city">
			                                    <label for="city">City</label>
			                                    <input id="city" type="text" ng-model="RegisterEntity.city" class="form-control" placeholder="Enter your city">
			                                </div>
			                                <div class="form-group mobile_no">
			                                    <label for="mobile_no">Mobile No.<span class="required">*</span></label>
			                                    <input id="mobile_no" type="text" ng-model="RegisterEntity.mobile_no" class="form-control" placeholder="Enter your contact number" required>
			                                </div>
			                                <div class="form-group password">
			                                    <label for="password">Password<span class="required">*</span></label>
			                                    <input id="password" type="password" ng-model="RegisterEntity.password" class="form-control" placeholder="Enter your password" required>
			                                </div>
			                                <div class="form-group profession">
			                                    <label for="profession">Profession</label>
			                                    <input id="profession" type="text" ng-model="RegisterEntity.profession" class="form-control" placeholder="Enter your profession">
			                                </div>
			                                <div class="form-group company">
			                                    <label for="company">Work Station</label>
			                                    <input id="company" type="text" ng-model="RegisterEntity.company" class="form-control" placeholder="Enter your work station name">
			                                </div>
	                            		</div>
	                            		<div class="col-xl-12 col-md-6 col-sm-5">
			                                <div class="form-group nick_name">
			                                    <label for="nick_name">Nick Name</label>
			                                    <input id="nick_name" type="text" ng-model="RegisterEntity.nick_name"  class="form-control" placeholder="Enter your nick name">
			                                </div><!--//form-group-->			                                
	                            			<div class="form-group passing_year">
			                                    <label for="passing_year">Passing Year<span class="required">*</span></label>
			                                    <select name="passing_year" ng-model="RegisterEntity.passing_year" class="form-control width-100" required>
													<option ng-repeat="row in passingyearlist" ng-selected="{{row.passing_year == RegisterEntity.passing_year}}" value="{{row.passing_year}}">
														{{row.year_name}}
													</option>
												</select>
			                                </div><!--//form-group-->
			                                <div class="form-group phone">
			                                    <label for="date_of_birth">Date of Birth<span class="required">*</span></label>
			                                    <div class='input-group date_of_birth'>                                               															
													<input type="text" class="form-control" required
													ng-model="RegisterEntity.date_of_birth" 
													datepicker-popup="dd/MM/yyyy"
													show-weeks="false" 
													show-button-bar="false"
													is-open="picker.opened">
													<span class="input-group-addon">
														<span class="glyphicon glyphicon-calendar"></span>
													</span>
												</div>
			                                </div>		                                
			                                <div class="form-group address">
			                                    <label for="address">Address</label>
			                                    <input id="address" type="text" ng-model="RegisterEntity.address" class="form-control" placeholder="Enter your contact address">
			                                </div>
			                                 <div class="form-group country">
			                                    <label for="country">Country</label>
			                                    <input id="country" type="text" ng-model="RegisterEntity.country" class="form-control" placeholder="Enter your country name">
			                                </div>
			                                 <div class="form-group email">
			                                    <label for="email">Email Address</label>
			                                    <input id="email" type="email" ng-model="RegisterEntity.email" class="form-control" placeholder="Enter your email address">
			                                </div>
			                                <div class="form-group confirm_password">
			                                    <label for="confirm_password">Confirm Password<span class="required">*</span></label>
			                                    <input id="confirm_password" type="password" ng-model="RegisterEntity.confirm_password" class="form-control" placeholder="Enter your confirm password" required>
			                                </div>
			                                <div class="form-group designation">
			                                    <label for="designation">Designation</label>
			                                    <input id="designation" type="text" ng-model="RegisterEntity.designation" class="form-control" placeholder="Enter your designation">
			                                </div>
			                                <div class="form-group company_address">
			                                    <label for="company_address">Work Station Address</label>
			                                    <input id="company_address" type="text" ng-model="RegisterEntity.company_address" class="form-control" placeholder="Enter your work station address">
			                                </div>
	                            		</div>
	                            	</div>
	                                <!--//form-group-->
	                                <div class="modal-footer">
										<button type="submit" class="btn btn-theme"><i class="fa fa-check"></i> Submit</button>
									</div>
	                            </form>                  
	                        </article>                       	                         
                        </div>
                        <!--//content-wrapper-->    
                                        
                    </div><!--//page-row-->
                </div><!--//page-content-->
            </div><!--//page--> 
        </div><!--//content-->
    </div><!--//wrapper-->