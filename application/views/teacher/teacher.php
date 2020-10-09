		<!-- ******CONTENT****** --> 
		 <div class="content container">
            <div class="page-wrapper">
                <header class="page-heading clearfix">
                    <h1 class="heading-title pull-left">Teachers</h1>
                    <div class="breadcrumbs pull-right">
                        <ul class="breadcrumbs-list">
                            <li class="breadcrumbs-label">You are here:</li>
                            <li><a href="<?php echo $headerData['base_url'];?>home">Home</a><i class="fa fa-angle-right"></i></li>
                            <li class="current">Events</li>
                        </ul>
                    </div><!--//breadcrumbs-->
                </header> 
                <div class="page-content">
                    <div class="row page-row">
                    	<div class="team-wrapper col-md-8 col-sm-7">
                    		<?php foreach($teachers as $teacher){?>
                        	<div class="row page-row" >
                                <figure class="thumb col-md-3 col-sm-4 col-xs-6">
                                	<?php if($teacher->profile_photo == "" && $teacher->gender_name == "Male"){?>
				                  		<img alt="User Image" class="img-responsive" src="<?php echo $headerData['assets'];?>images/teachers/no_image_men.jpg">
				                  	<?php } else if($teacher->profile_photo == "" && $teacher->gender_name == "Female"){?>
				                  		<img alt="User Image" class="img-responsive" src="<?php echo $headerData['assets'];?>images/teachers/no_image_female.jpg">					                  		
				                  	<?php } else {?>
				                  		<img alt="User Image" class="img-responsive" src="<?php echo $headerData['assets'];?>images/teachers/no_image_men.jpg">
				                  	<?php }?>
                                </figure>
                                <div class="details col-md-9 col-sm-8 col-xs-6">
                                    <h3 class="title"><?php echo $teacher->full_name;?></h3>
                                    <h4><?php echo $teacher->designation;?></h4>
                                    <p>Since&nbsp;<b><?php echo date('M. Y', strtotime($teacher->joining_date));?></b></p>
                                    <p class="text-justify"><?php echo $teacher->about;?></p>                                 
                                </div>                               
                            </div>
                            <?php } ?>
                    	</div>
                        <aside class="page-sidebar pull-right col-md-3 col-sm-4">                    
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