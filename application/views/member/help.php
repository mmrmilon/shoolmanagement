<script type="text/javascript" src="<?php echo $headerData['base_url']; ?>hdwplayer/player/js/hdwplayer.js"></script>

<script type="text/javascript" charset="utf-8">
$(document).ready(function() {
	
	$(".help").live("click", function(event)
	{
		event.preventDefault();
		var videoFile=$(this).attr('rel');
		var Ques=$(this).html();
		$(this).videopopup({
			p_height: "375",
			p_width: "630",
			Ques: Ques
		});
		hdwplayer({ 
			id       : 'player',
			swf      : '<?php echo $headerData['base_url']; ?>hdwplayer/player/player.swf',
			width    : '630',
			height   : '360',
			type	 : 'video',
			video    : '<?php echo $headerData['base_url']; ?>help/'+videoFile,
			autoStart: 'true'
		});				
	});
			
});
</script>
<style type="text/css">
	/* .hideAll{
		display: none;
	} */
</style>
<div id="dialog" title="" style="display:none;"></div>
<div id="content" >
	<div style="margin:20px;">
		<div class="clear"></div>
        <div class="section" style="margin-top:10px;">
		<h2 class="newAttendee">Help / User Guide</h2>
        <table align="center" width="98%;" cellpadding="5" cellspacing="0">
        	<tr>
        		<td>Our plugins "<?php echo $headerData['siteTitle']; ?>"  help you to synchronize Accounts & Contacts, Products and Invoices Joomla to Zoho CRM. Here is the help menu. to view related video of questionnaire just click on the link bellow.</td>
        	</tr>
        	<tr><td>&nbsp;</td></tr>
				<tr>
					<td>
						<h1 class="pageH1">Zoho CRM Fields Customization</h1>
						<ul style="margin: 0px; padding: 0px 0px 0px 28px;border-left: 1px solid #ECECEC;border-bottom: 1px solid #ECECEC;border-right: 1px solid #ECECEC;line-height:20px;">
							<li><a title="Click to view video." href="javascript: void(0);" rel="crm setting.mp4" class="memName help">Create the following fields into Zoho CRM Accounts & Contacts, Products and Invoice modules under a new section "ZOHOnJoomla Plugin":</a>
								<ul style="line-height:20px;">									
									<li>"Joomla VirtueMart Id" Field type: Text and Length:255 </li>
								</ul>
							</li>
						</ul>
					</td>
				</tr>        	
				<tr>
					<td>
					<h1 class="pageH1">User Login</h1>
					<ul style="margin: 0px; padding: 0px 0px 0px 28px;border-left: 1px solid #ECECEC;border-bottom: 1px solid #ECECEC;border-right: 1px solid #ECECEC;line-height:20px;">
						<li><a title="Click to view video." href="javascript: void(0);" rel="login.mp4" class="memName help">How to Login?</a></li>
					</ul>
					</td>
				</tr>
				<tr>
					<td>
					<h1 class="pageH1">Plugin Portal Pre Configuration</h1>
					<ul style="margin: 0px; padding: 0px 0px 0px 28px;border-left: 1px solid #ECECEC;border-bottom: 1px solid #ECECEC;border-right: 1px solid #ECECEC;line-height:20px;">
						<li><a title="Click to view video." href="javascript: void(0);" rel="installingcomponent.mp4" class="memName help">How to download and install joomla component?</a></li>
						<li><a title="Click to view video." href="javascript: void(0);" rel="webservicesetting.mp4" class="memName help">How to set your Web Service Settings?</a></li>
						<li><a title="Click to view video." href="javascript: void(0);" rel="fieldmapping.mp4" class="memName help">How to create mapping with the CRM fields and joomla fields?</a></li>
						<li><a title="Click to view video." href="javascript: void(0);" rel="statusfieldmapping.mp4" class="memName help">How to create mapping with the CRM invoice status fields and joomla order status fields?</a></li>
						<li><a title="Click to view video." href="javascript: void(0);" rel="taxcodemapping.mp4" class="memName help">How to create mapping with the CRM tax and joomla tax fields?</a></li>
					</ul>
					</td>
				</tr>
				<tr>
					<td>
					<h1 class="pageH1">User Guide</h1>
					<ul style="margin: 0px 0px 20px 0px; padding: 0px 0px 0px 28px;border-left: 1px solid #ECECEC;border-bottom: 1px solid #ECECEC;border-right: 1px solid #ECECEC;line-height:20px;">
						<li style="color: red; font-weight: bold;">Your must mapping Account Name from Accounts and Contacts module under field mapping. </li>
						<li><a title="Click to view video." href="javascript: void(0);" rel="howtosyn.mp4" class="memName help">How to synchronize joomla order to CRM invoices?</a></li>
					</ul>
					</td>
				</tr> 
		</table>         
		</div>
	</div>
</div>
           