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
    	$(function () {
        	var url = window.location.href;
            url = url.split("#");
            $("div#navbar-collapse .nav a").each(function () {
            	if (url[0] == (this.href)) {
                	$(this).closest("li").addClass("active");
                } else {
                	$(this).closest("li").removeClass("active");
                }
            });

			// using for long text .....
            $('.dot3').dotdotdot({
				after: 'a.read-more'
			});
		});
	</script>            
</body>
</html>