<!DOCTYPE html>  
<html lang="en"> 
<head>
    <title>Sonaichandi High School</title>
    <!-- Meta -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">    
    <link rel="shortcut icon" href="favicon.ico"> 
     
    <!-- Global CSS -->
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700' rel='stylesheet' type='text/css'>  
    <!-- Bootstrap 3.3.4 -->
    <link href="<?php echo $headerData['assets'];?>bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />    
     
    <!-- Plugins CSS -->    
    <link href="<?php echo $headerData['assets'];?>assets/plugins/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
    <link href="<?php echo $headerData['assets'];?>assets/plugins/flexslider/flexslider.css" rel="stylesheet" type="text/css" />
    <link href="<?php echo $headerData['assets'];?>assets/plugins/pretty-photo/css/prettyPhoto.css" rel="stylesheet" type="text/css" /> 
    <!-- Theme CSS -->  
    <link href="<?php echo $headerData['assets'];?>css/styles.css" rel="stylesheet" type="text/css" />    
    
	
    <!-- jQuery UI 1.11.2 -->
	<script src="<?php echo $headerData['assets'];?>bootstrap/js/jquery-2.2.0.min.js"></script>
    <script src="<?php echo $headerData['assets'];?>bootstrap/js/jquery-ui-1.11.4.min.js"></script>
	<script src="<?php echo $headerData['assets'];?>bootstrap/js/bootstrap.min.js"></script>
	
	<!-- Angular JS -->
	<script src="<?php echo $headerData['assets']?>angular/js/angular.min.js"></script>
		
    <!-- Angular JS Fusion Chart -->
    <script src="<?php echo $headerData['assets']?>angular/js/fusioncharts.js"></script>
    <script src="<?php echo $headerData['assets']?>angular/js/fusioncharts.charts.js"></script>
    <script src="<?php echo $headerData['assets']?>angular/js/angular-fusioncharts.min.js"></script>
    		
    <!-- Load custome angular data reader controller -->
    <script src="<?php echo $headerData['assets'];?>angular/controllers/angular-home.js"></script>
    
    <style type="text/css">
	.home-page .testimonials img {
	  margin-top: 10px;
	}
	.footer {
	    height: auto !important;
	}

	p.dot3 {
		width:240px;
		height: 120px;
		/*padding: 15px 20px 10px 20px;
		overflow: hidden; */
	}
	
	.home-page .news .news-item {
	    margin-bottom: 0px !important;
	    padding-left: 115px;
	    position: relative;
	}
	
	</style>
</head> 

<body class="home-page" ng-app="HomePage">
    <div class=""> <!-- wrapper -->
        <!-- ******HEADER****** --> 
        <header class="header">  
            <div class="top-bar" style="border-top: 2px solid #2f506c;"></div><!--//to-bar-->
            <div class="header-main container">
                <h1 class="logo col-md-4 col-sm-4">
                    <a href="<?php echo $headerData['base_url'];?>member/home">
                    	<img id="logo" src="<?php echo $headerData['assets'];?>images/school_logo.png" alt="Logo">
                    </a>
                </h1><!--//logo-->           
                <div class="info col-md-8 col-sm-8">
                    <ul class="menu-top navbar-right hidden-xs">
                    	<?php if(($this->session->userdata('logged_in')==true) && ($this->session->userdata('id') != "")){?>
	                        <li><b>(&nbsp;Welcome <?php echo $this->session->userdata('fullname');?>&nbsp;)</b></li>
			            <?php }?>
                        <li class="divider"><a href="<?php echo $headerData['base_url'];?>home"><i class="fa fa-home"> Home</i></a></li>
                        <li>
                        	<?php if(($this->session->userdata('logged_in')==true) && ($this->session->userdata('id') != "")){?>
	                        <a href="<?php echo $headerData['base_url'];?>logout">
			                  <i class="fa fa-sign-out">&nbsp;Sign-out</i>
			                </a>
			                <?php } else {?>
			                <a href="<?php echo $headerData['base_url'];?>login">
			                  <i class="fa fa-sign-in">&nbsp;Sign-in</i>
			                </a>
			                <?php }?> 
		                </li>                        
                    </ul><!--//menu-top-->
                    <br />
                    <div class="contact pull-right">
                        <p class="phone"><i class="fa fa-mobile"></i>+8801735 691497</p> 
                        <p class="email"><i class="fa fa-envelope"></i>info@sonaichandihighschool.edu.bd</p>
                    </div><!--//contact-->
                </div><!--//info-->
            </div><!--//header-main-->
        </header><!--//header-->
        
        <!-- ******NAV****** -->
        <nav class="main-nav" role="navigation">
            <div class="container">
                <div class="navbar-header">
                    <button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button><!--//nav-toggle-->
                </div><!--//navbar-header-->            
                <div class="navbar-collapse collapse" id="navbar-collapse">
                    <ul class="nav navbar-nav">
                        <li class="active nav-item"><a href="<?php echo $headerData['base_url'];?>home"><i class="fa fa-home"></i>&nbsp;Home</a></li>
                        <?php if($this->session->userdata('username')=="admin" || $this->session->userdata('username')=="superadmin"){?>
                        <li class="nav-item dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="0" data-close-others="false" href="#">Teachers&nbsp;<i class="fa fa-angle-down"></i></a>
                            <ul class="dropdown-menu">
                                <li><a href="<?php echo $headerData['base_url'];?>teacher">Teachers</a></li>
                                <?php if($this->session->userdata('role')== "teacher"){?>
                                <li><a href="<?php echo $headerData['base_url'];?>teacher/myprofile">My Profile</a></li>
                                <?php }?>
                                <li><a href="<?php echo $headerData['base_url'];?>teacher/manageteacher">Manage Student</a></li>         
                            </ul>
                        </li>		
                        <li class="nav-item dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="0" data-close-others="false" href="#">Students&nbsp;<i class="fa fa-angle-down"></i></a>
                            <ul class="dropdown-menu">
                                <li><a href="<?php echo $headerData['base_url'];?>student">Students</a></li>
                                <li><a href="<?php echo $headerData['base_url'];?>student/managestudent">Manage Student</a></li>         
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="0" data-close-others="false" href="#">News <i class="fa fa-angle-down"></i></a>
                            <ul class="dropdown-menu">
                                <li><a href="<?php echo $headerData['base_url'];?>news">News List</a></li>
                                <li><a href="<?php echo $headerData['base_url'];?>news/addnews">Add News</a></li>         
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="0" data-close-others="false" href="#">Events <i class="fa fa-angle-down"></i></a>
                            <ul class="dropdown-menu">
                                <li><a href="<?php echo $headerData['base_url'];?>event">Event List</a></li>
                                <li><a href="<?php echo $headerData['base_url'];?>event/newevent">New Event</a></li>
                            </ul>
                        </li>  
                        <?php } else {?>
                        	<li class="nav-item"><a href="<?php echo $headerData['base_url'];?>teacher">Teachers</a></li>
                        	<li class="nav-item"><a href="<?php echo $headerData['base_url'];?>student">Students</a></li>
                        	<li class="nav-item"><a href="<?php echo $headerData['base_url'];?>news">News</a></li>
                        	<li class="nav-item"><a href="<?php echo $headerData['base_url'];?>event">Events</a></li>
                        <?php }?>              
                        <li class="nav-item"><a href="<?php echo $headerData['base_url'];?>alumni"><!-- <i class="fa fa-th-list"></i>&nbsp; -->Alumnus</a></li> 
                        <?php if($this->session->userdata('username')=="admin" || $this->session->userdata('username')=="superadmin"){?>                       
                        <li class="nav-item"><a href="<?php echo $headerData['base_url'];?>administrator">&nbsp;Administrator</a></li>
                        <?php }?>
                        <li class="nav-item"><a href="<?php echo $headerData['base_url'];?>contact">Contact</a></li>
                    </ul><!--//nav-->
                </div><!--//navabr-collapse-->
            </div><!--//container-->
        </nav><!--//main-nav-->
		<!-- ******CONTENT****** --> 
        <div class="content container">
            <div id="promo-slider" class="slider flexslider">
                <ul class="slides">
                	<li>
                        <img src="<?php echo $headerData['assets'];?>images/banner/banner.jpg"  alt="" />
                    </li>
                	<li>
                        <img src="<?php echo $headerData['assets'];?>images/banner/banner00.jpg"  alt="" />
                    </li>
                	<li>
                        <img src="<?php echo $headerData['assets'];?>images/banner/banner01.jpg"  alt="" />
                        <p class="flex-caption">
                            <span class="main" >Pared Ground</span>
                            <br />
                            <span class="secondary clearfix" >
                            	Annual sports pared in our school
                            </span>
                        </p>
                    </li>
                	<li>
                        <img src="<?php echo $headerData['assets'];?>images/banner/banner02.jpg"  alt="" />
                        <p class="flex-caption">
                            <span class="main" >Science Laboratory</span>
                            <br />
                            <span class="secondary clearfix" >
                            	A science laboratory is a big room in a school that has tables, sinks, beakers and chemicals ready for experiments to be conducted
                            </span>
                        </p>
                    </li>
                    <!-- 
                    <li>
                        <img src="<?php echo $headerData['assets'];?>images/banner/slide-1.jpg"  alt="" />
                        <p class="flex-caption">
                            <span class="main" >Join College Green Online</span>
                            <br />
                            <span class="secondary clearfix" >Choose from over 100 online and offline courses</span>
                        </p>
                    </li>
                    <li>
                        <img src="<?php echo $headerData['assets'];?>images/banner/slide-2.jpg"  alt="" />
                        <p class="flex-caption">
                            <span class="main" >Come to our Open Days</span>
                            <br />
                            <span class="secondary clearfix" >Donec accumsan nunc sed ipsum dapibus consectetur</span>
                        </p>
                    </li>
                    <li>
                        <img src="<?php echo $headerData['assets'];?>images/banner/slide-3.jpg"  alt="" />
                        <p class="flex-caption">
                            <span class="main" >Discover online courses</span>
                            <br />
                            <span class="secondary clearfix" >Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
                        </p>
                    </li>
                    <li>
                        <img src="<?php echo $headerData['assets'];?>images/banner/slide-4.jpg"  alt="" />
                        <p class="flex-caption">
                            <span class="main" >Nam ultricies accumsan pellentesque</span>
                            <br />
                            <span class="secondary clearfix" >In justo orci, ornare vitae nulla sed, suscipit suscipit augue</span>
                        </p>
                    </li>
                     -->
                </ul><!--//slides-->
            </div><!--//flexslider-->
            <section class="promo box box-dark">        
                <div class="col-md-12">
                	<h1 class="section-heading">About Sonaichandi High School</h1>
                    <p class="text-justify">
                    The Sonaichandi high school started their academic curriculums in 1966. It was affiliated with the Board of Secondary & Higher Secondary education, Rajshahi. 
                    The activities of the school began on the verenda of a dochala room made of tile on the north side of the famous Sonaichandi Hat. 
                    At the beginning it was a private school. At that time there was no allocation of government fund for the school. 
                    So, the school continued with the assistance and cooperation from the farmer, businessmen, men of other professions and others living in Sonaichandi. 
                    At present it is a nongovernment school. It has a long tradition and reputation of spreading the light of education. 
                    Throughout the country the school has produced thousands of qualified citizens to serve the nation. 
                    The school has been fostering its tradition for more than 50 years. As for today Sonaichandi high school have more 500 students from six to ten class levels. 
                    More than 16 teachers have been appointed to take care of teaching of the students. There is big bonsai tree and a big popular play ground in front of the school.
                    </p>   
                </div>
            </section><!--//promo-->
            <section class="news">
                <h1 class="section-heading text-highlight"><span class="line">Latest News</span></h1>     
                <div class="carousel-controls">
                    <a class="prev" href="#news-carousel" data-slide="prev"><i class="fa fa-caret-left"></i></a>
                    <a class="next" href="#news-carousel" data-slide="next"><i class="fa fa-caret-right"></i></a>
                </div><!--//carousel-controls--> 
                <div class="section-content clearfix">
                    <div id="news-carousel" class="news-carousel carousel slide">
                        <div class="carousel-inner">
                        	<?php 
                        	$htmlString = '';
                        	$count = 0;
                        	$total_item = count($newslist);
                        	foreach($newslist as $row)
                        	{
                        		if($row->serial_no < 3 && $count < 1){
                        			$htmlString .= '<div class="item active">';
                        		}
                        		$htmlString .= '<div class="col-md-4 news-item">';
                                    $htmlString .= '<h2 class="title"><a href="news-single.html">'. $row->head_line .'</a></h2>';
                        			if($row->news_photo == '')
                                    {
                                    	$htmlString .= '<img class="thumb" src="'.$headerData['assets'].'images/news/no_image_available.png"  alt="" />';
                                    }
                                    else 
                                    {
                                    	$htmlString .= '<img class="thumb" src="'.$headerData['assets'].'images/news/'. $row->news_photo .'"  alt="" />';
                                    }
                                    $htmlString .= '<p class="text-justify after dot3">'. $row->details;
                                    $htmlString .= '<a class="read-more" href="news-single.html">Read more<i class="fa fa-chevron-right"></i></a></p>';
                                $htmlString .= '</div>'; 
                                if(($row->serial_no) % 3 == 0 && $total_item > 3){
                                	$htmlString .= '</div>';
                                	$htmlString .= '<div class="item">';
                                }
                                else if($row->serial_no % 3 == 0){
                                	$htmlString .= '</div>';
                                }
                                
                                $count++;
                        	}
                        	// add closing tag
                        	if($total_item % 3 > 0){
                        		$htmlString .= '</div>';
                        	}
                        	
                        	echo $htmlString;
                        	?>
                        </div><!--//carousel-inner-->
                    </div><!--//news-carousel-->  
                </div><!--//section-content-->     
            </section><!--//news-->
            <div class="row cols-wrapper">
                <div class="col-md-3">
                    <section class="events">
                        <h1 class="section-heading text-highlight"><span class="line">Events</span></h1>
                        <div class="section-content">
                        <?php foreach($eventlist as $event){?>	
                        	<div class="event-item">
                                <p class="date-label">
                                    <span class="month"><?php echo $event->event_month;?></span>
                                    <span class="date-number"><?php echo $event->event_day;?></span>
                                </p>
                                <div class="details">
                                    <h2 class="title"><?php echo $event->event_name;?></h2>
                                    <p class="time"><i class="fa fa-clock-o"></i>
                                    	<?php echo date('h:i A', strtotime($event->start_date.' '.$event->start_time));?>&nbsp;-&nbsp;
                                    	<?php echo date('h:i A', strtotime($event->end_date.' '.$event->end_time));?>
                                    </p>
                                    <p class="location"><i class="fa fa-map-marker"></i><?php echo $event->event_location;?></p>                            
                                </div><!--//details-->
                            </div><!--event-item--> 							
						<?php } ?>
                            <a class="read-more" href="<?php echo $headerData['base_url'];?>event">All events<i class="fa fa-chevron-right"></i></a>
                        </div><!--//section-content-->
                    </section><!--//events-->
                </div><!--//col-md-3-->
                <div class="col-md-6" ng-controller="HomeCtrl">
                    <section class="course-finder">
                        <h1 class="section-heading text-highlight"><span class="line">Alumni Summary</span></h1>
                        <div class="section-content">
                            <fusioncharts width="525" height="400" type="pie3d" datasource="{{myDataSource}}"></fusioncharts>
                            <a class="read-more" href="<?php echo $headerData['base_url'];?>alumni/member">View all member<i class="fa fa-chevron-right"></i></a>
                        </div><!--//section-content-->
                    </section><!--//course-finder-->
                </div>
                <div class="col-md-3">
                    <section class="links">
                        <h1 class="section-heading text-highlight"><span class="line">Sonaichadi High School</span></h1>
                        <div class="section-content">
		                	<h6 class="box-title">Sonaichandi, Nachole, Chapai Nawabgonj</h5>
		                	<h6 class="box-title">School Code - 8503021301</h5>
		                	<h6 class="box-title">Post Code - 6310, EIIN - 124430</h5>
		                	<hr>
		                	<h5 class="box-title"><i class="fa fa-phone">&nbsp;</i>&nbsp;+8801735 691497</h4>
		                	<h6 class="box-title"><i class="fa fa-envelope">&nbsp;</i>&nbsp;info@sonaichandihighschool.edu.bd</h5>
		                	<h6 class="box-title"><i class="fa fa-external-link-square">&nbsp;</i>&nbsp;www.sonaichandihighschool.edu.bd</h5>
                        </div><!--//section-content-->
                    </section><!--//links-->
                    <section class="testimonials">
                        <h1 class="section-heading text-highlight"><span class="line"> Testimonials</span></h1>
                        <div class="carousel-controls">
                            <a class="prev" href="#testimonials-carousel" data-slide="prev"><i class="fa fa-caret-left"></i></a>
                            <a class="next" href="#testimonials-carousel" data-slide="next"><i class="fa fa-caret-right"></i></a>
                        </div><!--//carousel-controls-->
                        <div class="section-content">
                            <div id="testimonials-carousel" class="testimonials-carousel carousel slide">
                                <div class="carousel-inner">
                                    <div class="item active">
                                        <blockquote class="quote">
                                            <p class="text-justify"><i class="fa fa-quote-left"></i>
                                            	The thing I like best about Sonaichandi High School is the big environment and the close relationships that are developed with both the students and the teachers.  
                                            	The teachers here are really cool, easy to talk to, and they will do whatever they can to help you succeed.
											</p>
                                        </blockquote>
                                        <div class="row">
                                            <p class="people col-md-8 col-sm-3 col-xs-8">
                                            	<span class="name">Mizanur Rahman</span><br />
                                            	<!-- <span class="title">Software Engineer</span><br /> -->
                                            	<span class="title">SSC, 2003</span>
                                            </p>
                                            <img class="profile col-md-4 pull-right img-circle" src="<?php echo $headerData['assets'];?>images/testimonials/mizanur.png"  alt="" />
                                        </div>                 
                                    </div><!--//item-->
                                    
                            </div><!--//testimonials-carousel-->
                        </div><!--//section-content-->
                    </section><!--//testimonials-->
                </div><!--//col-md-3-->
            </div><!--//cols-wrapper-->
        </div>
		<!--//content-->		
    </div><!--//wrapper-->
	<!-- ******FOOTER****** --> 
    <footer class="footer">        
        <div class="bottom-bar">
            <div class="container">
                <div class="row">
                    <small class="copyright col-md-6 col-sm-12 col-xs-12">Copyright @ 2015 Sonaichandi High School. All rights reserved.</small>
                    <ul class="social pull-right col-md-6 col-sm-12 col-xs-12">
                        <li><a href="javascript:void(0);"><i class="fa fa-twitter"></i></a></li>
                        <li><a href="javascript:void(0);"><i class="fa fa-facebook"></i></a></li>
                        <li><a href="javascript:void(0);"><i class="fa fa-linkedin"></i></a></li>
                        <li><a href="javascript:void(0);"><i class="fa fa-google-plus"></i></a></li>
                        <li class="row-end"><a href="javascript:void(0);"><i class="fa fa-rss"></i></a></li>
                    </ul><!--//social-->
                </div><!--//row-->
            </div><!--//container-->
        </div><!--//bottom-bar-->
    </footer><!--//footer-->
    
    <!-- Javascript --         
    <script type="text/javascript" src="<?php echo $headerData['assets'];?>assets/plugins/jquery-1.11.2.min.js"></script>
    <script type="text/javascript" src="<?php echo $headerData['assets'];?>assets/plugins/jquery-migrate-1.2.1.min.js"></script>
    <script type="text/javascript" src="<?php echo $headerData['assets'];?>assets/plugins/bootstrap/js/bootstrap.min.js"></script>
    --> 
    <script type="text/javascript" src="<?php echo $headerData['assets'];?>assets/plugins/bootstrap-hover-dropdown.min.js"></script> 
    <script type="text/javascript" src="<?php echo $headerData['assets'];?>assets/plugins/back-to-top.js"></script>
    <script type="text/javascript" src="<?php echo $headerData['assets'];?>assets/plugins/jquery-placeholder/jquery.placeholder.js"></script>
    <script type="text/javascript" src="<?php echo $headerData['assets'];?>assets/plugins/pretty-photo/js/jquery.prettyPhoto.js"></script>
    <script type="text/javascript" src="<?php echo $headerData['assets'];?>assets/plugins/flexslider/jquery.flexslider-min.js"></script>
    <script type="text/javascript" src="<?php echo $headerData['assets'];?>assets/plugins/jflickrfeed/jflickrfeed.min.js"></script> 
    <script type="text/javascript" src="<?php echo $headerData['assets'];?>assets/js/main.js"></script>
    <script type="text/javascript" src="<?php echo $headerData['assets'];?>js/jquery.dotdotdot.js"></script>    
    <script type="text/javascript" language="javascript">
			$(function() {
				$('.dot3').dotdotdot({
					after: 'a.read-more'
				});
			});
	</script>            
</body>
</html>