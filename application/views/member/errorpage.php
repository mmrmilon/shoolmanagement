<?php 
	if (isset($_POST['status_code'])){	
		$codeid = $_POST['status_code'];	
	}else{
		$codeid = 404;
	}
	
	if (isset($_POST['heading'])){	
		$header = $_POST['heading'];	
	}else{
		$header = 'Invalid page request';
	}
	
	if (isset($_POST['msg'])){	
		$msg = "Sorry. The error has occurred. Your request cannot be processed at this moment.
		Sorry !!! there occured an error and your request can not be proceed at this moment.";	
	}else{
		$msg = "Sorry !!! The page you request is not available.";
	}
?>

<div id="content">
	<div style="margin:20px;">
		<div class="pageHeader">
			<div class="section" style="margin-top:10px;">
				<h2 class="newAttendee"><?php echo $codeid;?> : <?php echo $header;?></h2>
				<table width="100%" class="dashboardRecentAttende" style="width:100%">
					<tr>
			            <td align="left" style="">			
							<div class="errorMessageDiv">
								<?php echo $msg;?>
							</div>		
						</td>
		            </tr>				
				</table>			
			</div>
		</div>	
	</div>
</div>
           