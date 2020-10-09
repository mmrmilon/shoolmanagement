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
    <link rel="stylesheet" href="assets/plugins/font-awesome/css/font-awesome.css">
    <link href="<?php echo $headerData['assets'];?>assets/plugins/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="assets/plugins/flexslider/flexslider.css">
    <link href="<?php echo $headerData['assets'];?>assets/plugins/flexslider/flexslider.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="assets/plugins/pretty-photo/css/prettyPhoto.css">
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
	<script src="<?php echo $headerData['assets']?>angular/js/moment.min.js"></script>
	<script src="<?php echo $headerData['assets']?>angular/js/ng-file-upload-shim.min.js"></script>
	<script src="<?php echo $headerData['assets']?>angular/js/ng-file-upload.min.js"></script>
	<script src="<?php echo $headerData['assets']?>angular/js/ui-bootstrap-tpls.min.js"></script>
	<script src="<?php echo $headerData['assets']?>angular/js/xeditable.min.js"></script>
	<script src="<?php echo $headerData['assets']?>angular/js/angular-sanitize.js"></script>
	<script src="<?php echo $headerData['assets']?>angular/js/angular-touch.min.js"></script>
	<script src="<?php echo $headerData['assets']?>angular/js/angular-animate.min.js"></script>		
	<script src="<?php echo $headerData['assets']?>angular/js/angular-route.js"></script>
	<script src="<?php echo $headerData['assets']?>angular/js/textAngular.min.js"></script>
	<script src="<?php echo $headerData['assets']?>angular/js/ng-csv.js"></script>
	
	
    
	<script type="text/javascript" src="http://static.fusioncharts.com/code/latest/fusioncharts.js"></script>
    <script type="text/javascript" src="http://static.fusioncharts.com/code/latest/themes/fusioncharts.theme.ocean.js"></script>
    <script type="text/javascript" src="<?php echo $headerData['assets']?>angular/js/angular-fusioncharts.js"></script>
    <!-- chart 
    <script src="<?php echo $headerData['assets']?>angular/js/fusioncharts.js"></script>
    <script src="<?php echo $headerData['assets']?>angular/js/fusioncharts.charts.js"></script>
    <script src="<?php echo $headerData['assets']?>angular/js/angular-fusioncharts.min.js"></script>
    
    <script src="<?php echo $headerData['assets']?>angular/js/d3.min.js"></script>
    <script src="<?php echo $headerData['assets']?>angular/js/nv.d3.min.js"></script>
    <script src="<?php echo $headerData['assets']?>angular/js/angular-nvd3.js"></script>
    -->
    
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
    <script src="<?php echo $headerData['assets'];?>angular/controllers/angular-alumni.js"></script>
    <style type="text/css">
	.dropdown-menu {
	    padding: 5px 5px 5px 5px!important;
	}
	.dropdown-menu table thead tr.h6{
		height: 25px !important;
	}
	</style>
</head> 

<body class="home-page" ng-app="SonaichandiSchool">
    <div class="wrapper">
		
		<!-- ******CONTENT****** --> 
        <div class="content container" ng-controller="AlumniCtrl">
            <div class="page-wrapper">
                <header class="page-heading clearfix">
                    <h1 class="heading-title pull-left">The Alumni Society</h1>
                    <div class="breadcrumbs pull-right">
                        <ul class="breadcrumbs-list">
                            <li class="breadcrumbs-label">You are here:</li>
                            <li><a href="<?php echo $headerData['base_url'];?>member/home">Home</a><i class="fa fa-angle-right"></i></li>
                            <li class="current">Alumni</li>
                        </ul>
                    </div><!--//breadcrumbs-->
                </header> 
                <div class="page-content">
                    <div class="row page-row">
                        <aside class="page-sidebar col-md-2 col-sm-3 affix-top">                    
                            <section class="widget">
                                <ul class="nav">
                                    <li class="active"><a href="<?php echo $headerData['base_url'];?>alumni">Alumni</a></li>
                                    <li><a href="<?php echo $headerData['base_url'];?>alumni/member">Members</a></li>
                                    <li><a href="<?php echo $headerData['base_url'];?>alumni/register">Register</a></li>
                                </ul>                    
                            </section><!--//widget-->
                        </aside><!--//page-sidebar-->
                        
                        <!--content-wrapper-->
                        <div class="content-wrapper col-md-10 col-sm-9">
                        	<!-- <div fusioncharts width="400" height="250" type="column2d" ="{{myDataSource}}" > </div> -->
							<!-- <fusioncharts width="800" height="600" type="pie3d" datasource="{{myDataSource}}"></fusioncharts> -->   
							<div class="form-group phone">
                                    <label for="date_of_birth">Date of Birth<span class="required">*</span></label>
                                    <div class='input-group date_of_birth'>                                               															
										<input type="text" class="form-control"
										ng-model="RegisterEntity.date_of_birth" 
										datepicker-popup="dd/MM/yyyy"
										show-weeks="false" 
										is-open="picker.opened"
										close-text="Close" 
										show-button-bar="false"
										ng-required="true">										
										<span class="input-group-addon">
											<span class="glyphicon glyphicon-calendar"></span>
										</span>										
									</div>
                                </div>                 	                         
                        </div>
                        <!--//content-wrapper-->
                                         
                    </div><!--//page-row-->
                </div><!--//page-content-->
            </div><!--//page--> 
        </div><!--//content-->
    </div><!--//wrapper-->
<!-- ******FOOTER****** --> 
    <footer class="footer">
        <div class="footer-content">
            <div class="container">
                <div class="row">
                <div class="footer-col col-md-3 col-sm-4 about">
                    <div class="footer-col-inner">
                        <h3>About</h3>
                        <ul>
                            <li><a href="about.html"><i class="fa fa-caret-right"></i>About us</a></li>
                            <li><a href="contact.html"><i class="fa fa-caret-right"></i>Contact us</a></li>
                            <li><a href="privacy.html"><i class="fa fa-caret-right"></i>Privacy policy</a></li>
                            <li><a href="terms-and-conditions.html"><i class="fa fa-caret-right"></i>Terms & Conditions</a></li>
                        </ul>
                    </div><!--//footer-col-inner-->
                </div><!--//foooter-col-->
                <div class="footer-col col-md-6 col-sm-8 newsletter">
                    <div class="footer-col-inner">
                        <h3>Join our mailing list</h3>
                        <p>Subscribe to get our weekly newsletter delivered directly to your inbox</p>
                        <form class="subscribe-form">
                            <div class="form-group">
                                <input type="email" class="form-control" placeholder="Enter your email" />
                            </div>
                            <input class="btn btn-theme btn-subscribe" type="submit" value="Subscribe">
                        </form>
                        
                    </div><!--//footer-col-inner-->
                </div><!--//foooter-col--> 
                <div class="footer-col col-md-3 col-sm-12 contact">
                    <div class="footer-col-inner">
                        <h3>Contact us</h3>
                        <div class="row">
                            <p class="adr clearfix col-md-12 col-sm-4">
                                <i class="fa fa-map-marker pull-left"></i>        
                                <span class="adr-group pull-left">       
                                    <span class="street-address">College Green</span><br>
                                    <span class="region">56 College Green Road</span><br>
                                    <span class="postal-code">BS16 AP18</span><br>
                                    <span class="country-name">UK</span>
                                </span>
                            </p>
                            <p class="tel col-md-12 col-sm-4"><i class="fa fa-phone"></i>0800 123 4567</p>
                            <p class="email col-md-12 col-sm-4"><i class="fa fa-envelope"></i><a href="#">enquires@website.com</a></p>  
                        </div> 
                    </div><!--//footer-col-inner-->            
                </div><!--//foooter-col-->   
                </div>   
            </div>        
        </div><!--//footer-content-->
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
    
    <!-- Javascript --> 
    <script type="text/javascript" src="<?php echo $headerData['assets'];?>assets/plugins/jquery-1.11.2.min.js"></script>
    <script type="text/javascript" src="<?php echo $headerData['assets'];?>assets/plugins/jquery-migrate-1.2.1.min.js"></script>
    <script type="text/javascript" src="<?php echo $headerData['assets'];?>assets/plugins/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="<?php echo $headerData['assets'];?>assets/plugins/bootstrap-hover-dropdown.min.js"></script> 
    <script type="text/javascript" src="<?php echo $headerData['assets'];?>assets/plugins/back-to-top.js"></script>
    <script type="text/javascript" src="<?php echo $headerData['assets'];?>assets/plugins/jquery-placeholder/jquery.placeholder.js"></script>
    <script type="text/javascript" src="<?php echo $headerData['assets'];?>assets/plugins/pretty-photo/js/jquery.prettyPhoto.js"></script>
    <script type="text/javascript" src="<?php echo $headerData['assets'];?>assets/plugins/flexslider/jquery.flexslider-min.js"></script>
    <script type="text/javascript" src="<?php echo $headerData['assets'];?>assets/plugins/jflickrfeed/jflickrfeed.min.js"></script> 
    <script type="text/javascript" src="<?php echo $headerData['assets'];?>assets/js/main.js"></script>    
</body>
</html>