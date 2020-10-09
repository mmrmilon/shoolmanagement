		<!-- ******CONTENT****** --> 
		 <div class="content container">
            <div class="page-wrapper">
                <header class="page-heading clearfix">
                    <h1 class="heading-title pull-left">Events</h1>
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
                        <div class="events-wrapper col-md-8 col-sm-7">       
                        	<?php foreach($eventlist as $event){?>
                            <article class="events-item page-row has-divider clearfix">
                                <div class="date-label-wrapper col-md-1 col-sm-2">
                                    <p class="date-label">
                                        <span class="month"><?php echo $event->event_month;?></span>
                                        <span class="date-number"><?php echo $event->event_day;?></span>
                                    </p>
                                </div><!--//date-label-wrapper-->
                                <div class="details col-md-11 col-sm-10">
                                    <h3 class="title"><?php echo $event->event_name;?></h3>
                                    <p class="meta">
                                    	<span class="time"><i class="fa fa-clock-o"></i>
                                    		<?php echo date('h:i A', strtotime($event->start_date.' '.$event->start_time));?>&nbsp;-&nbsp;
                                    		<?php echo date('h:i A', strtotime($event->end_date.' '.$event->end_time));?>
                                    	</span>
                                    	<span class="location"><i class="fa fa-map-marker"></i>
                                    		<a href="javascript:void(0);"><?php echo $event->event_location;?></a>
                                    	</span>
                                    </p>  
                                    <p class="desc text-justify">
                                    	<?php echo $event->event_details;?>
									</p>                       
                                </div><!--//details-->
                            </article><!--//events-item-->							
							<?php } ?>                            
                        </div><!--//events-wrapper-->
                        
                        <aside class="page-sidebar  col-md-3 col-md-offset-1 col-sm-4 col-sm-offset-1">                    
                            <section class="widget has-divider">
                                <h3 class="section-heading text-highlight"><span class="line">Sonaichadi High School</span></h3>
                                <div class="section-content">
				                	<p class="text-justify">Sonaichandi, Nachole, Chapai Nawabgonj</p>
				                	<p class="text-justify">School Code - 8503021301</p>
				                	<p class="text-justify">Post Code - 6310, EIIN - 124430</p>
				                	<hr>
				                	<h6 class="text-justify"><i class="fa fa-phone">&nbsp;</i>&nbsp;+8801735 691497</h6>
				                	<p class="text-justify"><i class="fa fa-envelope">&nbsp;</i>&nbsp;info@sonaichandihighschool.edu.bd</p>
				                	<p class="text-justify"><i class="fa fa-external-link-square">&nbsp;</i>&nbsp;www.sonaichandihighschool.edu.bd</p>
		                        </div><!--//section-content-->
                            </section><!--//widget-->
                            <section class="widget has-divider">
                                <h3 class="title">Latest News</h3>
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
                        </aside>
                    </div><!--//page-row-->
                </div><!--//page-content-->
            </div><!--//page--> 
        </div><!--//content-->
    </div><!--//wrapper-->