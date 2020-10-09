		<!-- ******CONTENT****** --> 
        <div class="content container" ng-controller="StudentCtrl">
            <div class="page-wrapper">
                <header class="page-heading clearfix">
                    <h1 class="heading-title pull-left">Students</h1>
                    <div class="breadcrumbs pull-right">
                        <ul class="breadcrumbs-list">
                            <li class="breadcrumbs-label">You are here:</li>
                            <li><a href="<?php echo $headerData['base_url'];?>home">Home</a><i class="fa fa-angle-right"></i></li>
                            <li class="current">Students</li>
                        </ul>
                    </div><!--//breadcrumbs-->
                </header> 
                <div class="page-content">                 
                    <div class="row page-row">                     
                        <div class="team-wrapper col-md-9 col-sm-7">
                        	<div class="row page-row">
                            	<div class="col-xs-12 col-md-1 col-sm-2">
									<div class="" style="margin-top: 8px">
										<label class="control-label">Class</label>
									</div>
								</div>
								<div class="col-xs-12 col-md-4 col-sm-3">
									<div class="">
										<select name="class_id" ng-disabled="new_student" ng-model="class_id" class="form-control width-100" required>
											<option ng-repeat="row in classlist" ng-selected="{{row.class_id == class_id}}" value="{{row.class_id}}">
												{{row.class_name}}
											</option>
										</select>
									</div>
								</div>
								<div class="col-xs-12 col-md-1 col-sm-2">
									<div class="" style="margin-top: 8px">
										<label class="control-label">Section</label>
									</div>
								</div>
								<div class="col-xs-12 col-md-4 col-sm-3">
									<div class="">
										<select name="section_id" ng-disabled="class_id == ''? true:false" 
										ng-model="section_id" 
										ng-change="ManageStudents()"
										class="form-control width-100" required>
											<option ng-repeat="row in sectionlist" ng-selected="{{row.section_id == section_id}}" value="{{row.section_id}}">
												{{row.section_name}}
											</option>
										</select>
									</div>
								</div>
                  				<div class="col-xs-12 col-md-2 col-sm-3">
                  					<button class="btn btn-success margin-bottom-5" 
                  					ng-click="SearchStudents()"
                  					ng-disabled="section_id == ''? true:false">
                  					<i class="fa fa-search fa-lg"></i> Search</button>
                  				</div>                        
                            </div>  
                            <hr>                             	
                            <div class="row page-row">
                            	<div class="col-md-4 col-sm-6 col-xs-8 margin-bottom-5" ng-repeat="row in students">
	                                <figure class="thumb col-md-4 col-sm-5 col-xs-6" ng-if="row.profile_photo != null && row.profile_photo != 'no image'">
	                                    <img class="img-responsive" src="<?php echo $headerData['assets'];?>images/students/{{row.profile_photo}}" alt="" />
	                                </figure>
	                                <figure class="thumb col-md-4 col-sm-5 col-xs-6" ng-if="(row.profile_photo == null || row.profile_photo == 'no image') && row.gender_name == 'Male'">
	                                    <img class="img-responsive" src="<?php echo $headerData['assets'];?>images/students/male.png" alt="" />
	                                </figure>
	                                <figure class="thumb col-md-4 col-sm-5 col-xs-6" ng-if="(row.profile_photo == null || row.profile_photo == 'no image') && row.gender_name == 'Female'">
	                                    <img class="img-responsive" src="<?php echo $headerData['assets'];?>images/students/female.png" alt="" />
	                                </figure>
	                                <div class="details col-md-8 col-sm-7 col-xs-6">
	                                    <b>{{row.first_name}}&nbsp;{{row.last_name}}</b>
	                                    <p>Roll:&nbsp;{{row.roll_no}}</p>                                
	                                </div>
                                </div>                                
                                <div class="col-md-12 col-sm-12 col-xs-12 text-center" ng-show="!students.length">    
                                	<span class="text-danger"><b>Student not found!</b></span>                          
                                </div>                         
                            </div>
                        </div><!--//team-wrapper-->
                        <aside class="page-sidebar  col-md-3 col-sm-4">      
                            <section class="widget has-divider">
                                <h3 class="title">Other News</h3>
                                <?php foreach($newslist as $row){?> 
                                <article class="news-item row">       
                                    <figure class="thumb col-md-2 col-sm-3 col-xs-3">
                                        <?php if($row->news_photo == ''){?>
                                         <img src="<?php echo $headerData['assets'];?>images/news/no_image_available.jpg" alt="no image">
                                         <?php }
                                         else {?>
                                        	<img src="<?php echo $headerData['assets'];?>images/news/<?php echo $row->news_photo;?>" alt="no image"> 	
                                         <?php }?>                                        
                                    </figure>
                                    <div class="details col-md-10 col-sm-9 col-xs-9">
                                        <h4 class="title"><a href="<?php echo $headerData['base_url'];?>news/details/<?php echo $row->news_id;?>"><?php echo $row->head_line;?></a></h4>
                                    </div>
                                </article><!--//news-item-->
                                <?php } ?>
                            </section><!--//widget-->
                            <section class="widget">
                                <h3 class="title">Events</h3>
                                <?php foreach($eventlist as $event){?>
                                <article class="events-item row page-row">                                    
                                        <div class="date-label-wrapper col-md-3 col-sm-4 col-xs-4">
                                            <p class="date-label">
                                                <span class="month"><?php echo $event->event_month;?></span>
                                                <span class="date-number"><?php echo $event->event_day;?></span>
                                            </p>
                                        </div><!--//date-label-wrapper-->
                                        <div class="details col-md-9 col-sm-8 col-xs-8">
                                            <h5 class="title"><?php echo $event->event_name;?></h5>  
                                            <p class="time text-muted">
                                            	<span class="time"><i class="fa fa-clock-o"></i>
		                                    		<?php echo date('h:i A', strtotime($event->start_date.' '.$event->start_time));?>&nbsp;-&nbsp;
		                                    		<?php echo date('h:i A', strtotime($event->end_date.' '.$event->end_time));?>
		                                    	</span><br/>
		                                    	<span class="location"><i class="fa fa-map-marker"></i>
		                                    		<a href="javascript:void(0);"><?php echo $event->event_location;?></a>
		                                    	</span>
											</p>                  
                                        </div><!--//details-->                                    
                                </article>
                                <?php } ?>                                 
                            </section><!--//widget-->
                        </aside>
                    </div><!--//page-row-->
                </div><!--//page-content-->
            </div><!--//page--> 
        </div><!--//content-->
    </div><!--//wrapper-->