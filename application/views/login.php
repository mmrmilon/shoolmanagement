<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">	
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="description" content="Login Panel" />
	<meta name="author" content="" />

	<title>Login | Sonaichandi High School</title>	

	<link rel="stylesheet" href="<?php echo $headerData['assets'];?>login/js/jquery-ui/jquery-ui-1.10.3.custom.min.css">
	<link rel="stylesheet" href="<?php echo $headerData['assets'];?>login/css/entypo.css">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Noto+Sans:400,700,400italic">
	<!-- FontAwesome 4.3.0 -->
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <!-- Ionicons 2.0.0 -->
    <link href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css" /> 
	<link rel="stylesheet" href="<?php echo $headerData['assets'];?>login/css/bootstrap.css">
	<link rel="stylesheet" href="<?php echo $headerData['assets'];?>login/css/login-core.css">
	<link rel="stylesheet" href="<?php echo $headerData['assets'];?>login/css/login-theme.css">
	<link rel="stylesheet" href="<?php echo $headerData['assets'];?>login/css/login-forms.css">

	<script src="<?php echo $headerData['assets'];?>login/js/jquery-1.11.0.min.js"></script>
	<link rel="shortcut icon" href="assets/images/favicon.png">
</head>
<body class="page-body login-page login-form-fall" data-url="http://neon.dev">

<!-- This is needed when you send requests via Ajax -->
<script type="text/javascript">
var baseurl ='<?php echo $headerData['base_url'];?>';
</script>

<div class="login-container">
	
	<div class="login-header login-caret">
		
		<div class="login-content" style="width:100%;">
			
			<a href="<?php echo $headerData['base_url'];?>login" class="logo">
				<img src="<?php echo $headerData['assets'];?>/images/logo.png" height="60" alt="" />
			</a>			
			<p class="description">
            	<h2 style="color:#cacaca; font-weight:100;">Shonaichandi High School</h2>
           </p>			
			<!-- progress bar indicator -->
			<div class="login-progressbar-indicator">
				<h3>43%</h3>
				<span>logging in...</span>
			</div>
		</div>		
	</div>
	
	<div class="login-progressbar">
		<div></div>
	</div>
	
	<div class="login-form">
		
		<div class="login-content">
			
			<div class="form-login-error">
				<h3>Invalid login</h3>
				<p>Please enter correct email and password!</p>
			</div>
			
			<form method="post" role="form" id="form_login">				
				<div class="form-group">					
					<div class="input-group">
						<div class="input-group-addon">
							<i class="fa fa-user"></i>
						</div>						
						<input type="text" class="form-control" name="email" id="email" placeholder="Email" autocomplete="off" data-mask="email" />
					</div>					
				</div>
				
				<div class="form-group">					
					<div class="input-group">
						<div class="input-group-addon">
							<i class="fa fa-key"></i>
						</div>						
						<input type="password" class="form-control" name="password" id="password" placeholder="Password" autocomplete="off" />
					</div>				
				</div>
				
				<div class="form-group">					
					<div class="input-group">
						<div class="input-group-addon">
							<i class="fa fa-cog"></i>
						</div>						
						<label for="remember_me" class="remember"><input type="checkbox" checked="checked" name="remember_me" id="remember_me"> Remember my login on this computer</label>
					</div>				
				</div>
				
				<div class="form-group">
					<button type="submit" class="btn btn-primary btn-block btn-login">
						<i class="fa fa-sign-in"></i>
						Login
					</button>
				</div>
			</form>

			<style>
            td {
                border: 1px solid rgba(204, 204, 204, 0.1) !important;
            }
            th {
                border: 1px solid rgba(204, 204, 204, 0.1) !important;
                background-color:rgba(235, 235, 235, 0) !important;
            }
            .remember{float: left;margin-left: 14px;}
            .icon-hover { cursor:pointer;}
            </style>
            <script>
                function copy( email , password)
                {
                    document.getElementById("email").value  =   email;
                    document.getElementById("password").value  =   password;
                }
            </script>
            <!-- 

            <div class="panel panel-primary" style="background-color:rgba(255, 255, 255, 0);border-color: rgba(235, 235, 235, 0.14);">
                <div class="panel-heading" style="background-color:rgba(255, 255, 255, 0.16);border-color: rgba(204, 204, 204, 0.08);">
            		<div class="panel-title">User acceptance testing credentials</div>
            		<div class="panel-options">
            			<a href="#" data-rel="collapse"><i class="fa fa-minus"></i></a>
            			<a href="#" data-rel="close"><i class="fa fa-times"></i></a>
            		</div>
            	</div>
            		
            	<div class="panel-body with-table">
            		<table class="table table-bordered table-responsive">
	            		<thead>
	            			<tr>
	            				<th>Email Address</th>
	                			<th>Password</th>
	                			<th>Copy</th>
	            			</tr>
	            		</thead>
            		
	            		<tbody>
	            			<tr>
	            				<td>admin@sonaichandihighschool.com</td>
	            				<td>abc123</td>
	                            <td>
	                                <i class="fa fa-clipboard icon-hover tooltip-default" onclick="copy('admin@sonaichandihighschool.com' , 'abc123')"
	                                    data-toggle="tooltip" data-placement="top" title="" data-original-title="copy"></i>
	                            </td>
	            			</tr>
	            			<tr>
	            				<td>teacher@sonaichandihighschool.com</td>
	            				<td>abc123</td>
	                            <td>
	                                <i class="fa fa-clipboard icon-hover tooltip-default" onclick="copy('teacher@sonaichandihighschool.com' , 'abc123')"
	                                     data-toggle="tooltip" data-placement="top" title="" data-original-title="copy"></i>
	                            </td>
	            			</tr>
	            			<tr>
	            				<td>student@sonaichandihighschool.com</td>
	            				<td>abc123</td>
	                            <td>
	                                <i class="fa fa-clipboard icon-hover tooltip-default" onclick="copy('student@sonaichandihighschool.com' , 'abc123')"
	                                     data-toggle="tooltip" data-placement="top" title="" data-original-title="copy"></i>
	                            </td>
	            			</tr>
	            			<tr>
	            				<td>parent@sonaichandihighschool.com</td>
	            				<td>abc123</td>
	                            <td>
	                                <i class="fa fa-clipboard icon-hover tooltip-default" onclick="copy('parent@sonaichandihighschool.com' , 'abc123')"
	                                     data-toggle="tooltip" data-placement="top" title="" data-original-title="copy"></i>
	                            </td>
	            			</tr>
	            		</tbody>
            		</table>
            	</div>
            </div>  
            -->	
			
			<div class="login-bottom-links">
				<a href="<?php echo $headerData['base_url'];?>login/forgotpassword" class="link">Forgot Your Password ?</a>
			</div>
			
		</div>
		
	</div>
	
</div>

	<!-- Bottom Scripts -->
	<script src="<?php echo $headerData['assets'];?>login/js/main-gsap.js"></script>
	<script src="<?php echo $headerData['assets'];?>login/js/jquery-ui-1.10.3.minimal.min.js"></script>
	<script src="<?php echo $headerData['assets'];?>login/js/bootstrap.js"></script>
	<script src="<?php echo $headerData['assets'];?>login/js/joinable.js"></script>
	<script src="<?php echo $headerData['assets'];?>login/js/resizeable.js"></script>
	<script src="<?php echo $headerData['assets'];?>login/js/neon-api.js"></script>
	<script src="<?php echo $headerData['assets'];?>login/js/jquery.validate.min.js"></script>
	<script src="<?php echo $headerData['assets'];?>login/js/neon-login.js"></script>
	<script src="<?php echo $headerData['assets'];?>login/js/neon-custom.js"></script>
	<script src="<?php echo $headerData['assets'];?>login/js/neon-demo.js"></script>


</body>
</html>