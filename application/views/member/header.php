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
     
    <!-- FontAwesome 4.3.0 --
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <!-- Ionicons 2.0.0 --
    <link href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css" />    
    -->
     
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
    
    <!-- angular xeditable - text editor css -->
	<link href="<?php echo $headerData['assets']; ?>angular/css/xeditable.css" rel="stylesheet">
	<link href="<?php echo $headerData['assets']; ?>ui-grid/css/ui-grid.css" rel="stylesheet"/>
	<link href="http://ui-grid.info/release/ui-grid-unstable.css" rel="stylesheet">
	
    <!-- jQuery UI 1.11.2 -->
	<script src="<?php echo $headerData['assets'];?>bootstrap/js/jquery-2.2.0.min.js"></script>
    <script src="<?php echo $headerData['assets'];?>bootstrap/js/jquery-ui-1.11.4.min.js"></script>
	<script src="<?php echo $headerData['assets'];?>bootstrap/js/bootstrap.min.js"></script>
	<script src="<?php echo $headerData['assets']?>bootstrap/js/bootstrap-datetimepicker.min.js"></script>
	<script src="<?php echo $headerData['assets']?>bootstrap/js/bootstrap-timepicker.min.js"></script>
	
	<!-- Angular JS -->
	<script src="<?php echo $headerData['assets']?>angular/js/angular.min.js"></script>	
			
	<script src="<?php echo $headerData['assets']?>angular/js/angular-route.js"></script>
	<script src="<?php echo $headerData['assets']?>angular/js/moment.min.js"></script>
	<script src="<?php echo $headerData['assets']?>angular/js/ng-file-upload-shim.min.js"></script>
	<script src="<?php echo $headerData['assets']?>angular/js/ng-file-upload.min.js"></script>
	<script src="<?php echo $headerData['assets']?>angular/js/ui-bootstrap-tpls.min.js"></script>
	<script src="<?php echo $headerData['assets']?>angular/js/angular-sanitize.js"></script>
	<script src="<?php echo $headerData['assets']?>angular/js/angular-touch.min.js"></script>
	<script src="<?php echo $headerData['assets']?>angular/js/angular-animate.min.js"></script>
	<script src="<?php echo $headerData['assets']?>angular/js/textAngular.min.js"></script>
	
	
	
	<script src="<?php echo $headerData['assets']?>angular/js/ng-csv.js"></script>
	
    <!-- 
	<script type="text/javascript" src="http://static.fusioncharts.com/code/latest/fusioncharts.js"></script>
    <script type="text/javascript" src="http://static.fusioncharts.com/code/latest/themes/fusioncharts.theme.ocean.js"></script>
    <script type="text/javascript" src="<?php echo $headerData['assets']?>angular/js/angular-fusioncharts.js"></script>     
    -->
    <script src="<?php echo $headerData['assets']?>angular/js/fusioncharts.js"></script>
    <script src="<?php echo $headerData['assets']?>angular/js/fusioncharts.charts.js"></script>
    <script src="<?php echo $headerData['assets']?>angular/js/angular-fusioncharts.min.js"></script>
    
	<!-- 
	<script src="<?php echo $headerData['assets']?>angular/js/respond.min.js"></script>
    <script src="<?php echo $headerData['assets']?>angular/js/ObjectPath.js"></script>
    <script src="<?php echo $headerData['assets']?>angular/js/tv4.min.js"></script>	
	<script src="<?php echo $headerData['assets']?>angular/js/schema-form.js"></script>
	<script src="<?php echo $headerData['assets']?>angular/js/bootstrap-decorator.js"></script>
	-->
	 
	<!-- UI-Grid JS -->
	<script src="<?php echo $headerData['assets'];?>ui-grid/js/csv.js"></script>
	<script src="<?php echo $headerData['assets'];?>ui-grid/js/ui-grid.js"></script>
	<script src="<?php echo $headerData['assets'];?>ui-grid/js/vfs_fonts.js"></script>
		
    <!-- Load custome angular data reader controller -->
    <script src="<?php echo $headerData['assets'];?>angular/controllers/angular-route.js"></script>
    <script src="<?php echo $headerData['assets'];?>angular/controllers/angular-exam.js"></script>
    <script src="<?php echo $headerData['assets'];?>angular/controllers/angular-teacher.js"></script>
    <script src="<?php echo $headerData['assets'];?>angular/controllers/angular-students.js"></script>
    <script src="<?php echo $headerData['assets'];?>angular/controllers/angular-subject.js"></script>
    <script src="<?php echo $headerData['assets'];?>angular/controllers/angular-admin.js"></script>
    <script src="<?php echo $headerData['assets'];?>angular/controllers/angular-alumni.js"></script>
    <script src="<?php echo $headerData['assets'];?>angular/controllers/angular-alumni-member.js"></script>
    <script src="<?php echo $headerData['assets'];?>angular/controllers/angular-alumni-register.js"></script>-->
    <script src="<?php echo $headerData['assets'];?>angular/controllers/angular-event.js"></script>
    <script src="<?php echo $headerData['assets'];?>angular/controllers/angular-news.js"></script>
        
	<style type="text/css">
	
	/* Start date picker css*/
	div.input-group ul.dropdown-menu {
	    padding: 5px 5px 5px 5px !important;
	}
	.dropdown-menu table thead tr.h6{
		height: 25px !important;
	}
	/* End date picker css*/
	
	.footer {
	    height: auto !important;
	}
	
	p.dot3 {
		width:620px;
		max-height: 60px;
		/*padding: 15px 20px 10px 20px;
		overflow: hidden; */
	}
	
	.margin-bottom-5 {
	    margin-bottom: 5px;
	}
	</style>
</head> 

<body class="" ng-app="SonaichandiSchool">
    <div class=""> <!-- wrapper -->
        <!-- ******HEADER****** --> 
        <header class="header">  
            <div class="top-bar" style="border-top: 2px solid #2f506c;"></div><!--//to-bar-->
            <div class="header-main container">
                <h1 class="logo col-md-4 col-sm-4">
                    <a href="<?php echo $headerData['base_url'];?>home">
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
                        <li class="nav-item"><a href="<?php echo $headerData['base_url'];?>home"><i class="fa fa-home"></i>&nbsp;Home</a></li>
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
                        <li class="nav-item"><a href="<?php echo $headerData['base_url'];?>setting">&nbsp;Settings</a></li>
                        <?php }?>
                        <li class="nav-item"><a href="<?php echo $headerData['base_url'];?>contact">Contact</a></li>
                    </ul><!--//nav-->
                </div><!--//navabr-collapse-->
            </div><!--//container-->
        </nav><!--//main-nav-->