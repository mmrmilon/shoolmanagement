<?php 
//require_once APPPATH.'libraries/phpmailer/class.phpmailer.php';
class Headmodel extends CI_Model {
	function __construct(){
		//parent::Model();
		$this->load->library('session');
	}
	
	function getHeaderData(){
		$header_data=array();		
		$header_data['base_url']=config_item('base_url');
		$header_data['assets']=config_item('base_url').'assets/';
		$header_data['siteTitle']=config_item('siteTitle');
		$header_data['siteLogo']=config_item('siteLogo');
		$header_data['images']=config_item('base_url').'images/';	
		return $header_data;
	}	
	
	//login and package check
	function loginCheck($fromLogin=''){
		if(($this->session->userdata('logged_in')!=true) || ($this->session->userdata('id') == "")){		
			$refPath='http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
			$refPath=base64_encode($refPath);
			if($fromLogin !="home")
			redirect(config_item('base_url').'login?refPath='.$refPath);
		}else{
			return true;
		}	
	}
	
	/*
	function convertDateTo($cutOffDateTime){
		$cutOffDateTime=explode(' ', $cutOffDateTime);
		
		
		if($cutOffDateTime[2] == 'AM'){
			$dccutOffDateTime=str_replace('/','-',$cutOffDateTime[0])." ".$cutOffDateTime[1];
		}else{
			$hourex=explode(':', $cutOffDateTime[1]);
			$hour=$hourex[0];
			
			if($hour == 12){
				$hour=23;
			}else{
				$hour=$hour+12;
			}
			$dccutOffDateTime=str_replace('/','-',$cutOffDateTime[0])." ".$hour.":".$hourex[1].":".$hourex[2];		
		}
		
		return $dccutOffDateTime;
	}
	public function sendMailBySMTP($to, $subject, $message){
		$mail = new PHPMailer(true); // the true param means it will throw exceptions on errors, which we need to catch
		
		$mail->IsSMTP(); // telling the class to use SMTP
		
		try {
		  $mail->Host       = "mail.gmail.com"; // SMTP server
		  $mail->SMTPDebug  = 2;                     // enables SMTP debug information (for testing)
		  $mail->SMTPAuth   = true;                  // enable SMTP authentication
		  $mail->SMTPSecure = "ssl";                 // sets the prefix to the servier
		  $mail->Host       = "smtp.gmail.com";      // sets GMAIL as the SMTP server
		  $mail->Port       = 465;                   // set the SMTP port for the GMAIL server
		  $mail->Username   = '';  // GMAIL username
		  $mail->Password   = '';            // GMAIL password
		  $mail->AddReplyTo('');
		  $mail->AddAddress($to);
		  $mail->SetFrom('', config_item('siteTitle'));
		 
		  $mail->Subject = $subject;
		  // $mail->AltBody = 'To view the message, please use an HTML compatible email viewer!'; // optional - MsgHTML will create an alternate automatically
		  $mail->MsgHTML($message);
		  //$mail->AddAttachment('images/phpmailer.gif');      // attachment
		  //$mail->AddAttachment('images/phpmailer_mini.gif'); // attachment
		  if($mail->Send()){
		  	return true;
		  }else{
		  	return false;
		  }
		  
		} catch (phpmailerException $e) {
			return false;
		 // echo $e->errorMessage(); //Pretty error messages from PHPMailer
		} 
	}
	
	//login and package check
	function loginCheck($fromLogin=''){
		if(($this->session->userdata('logged_in')!=true) || ($this->session->userdata('id') == "")){		
			$refPath='http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
			$refPath=base64_encode($refPath);
			if($fromLogin !="home")
			redirect(config_item('base_url').'login?refPath='.$refPath);
		}else{
			return true;
		}	
	}
	
	//convert object to array
	function objectToArray($obj){
		$arr=array();
        $arrObj = is_object($obj) ? get_object_vars($obj) : $obj;
        foreach ($arrObj as $key => $val) {
                $val = (is_array($val) || is_object($val)) ? $this->objectToArray($val) : $val;
                $arr[$key] = $val;
        }
        return $arr;
	}
	
	function postCurlRequest($api_url, $userName, $apiKey){
		$ch = curl_init();
		curl_setopt( $ch, CURLOPT_HTTPHEADER, array ('Accept: application/json', 'Content-Length: 0') );
		curl_setopt( $ch, CURLOPT_URL, $api_url );
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
		curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, 0 );
		curl_setopt( $ch, CURLOPT_USERPWD, $userName.":".$apiKey);
		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );

		$response = curl_exec( $ch );

		return json_decode($response);	
	}*/
}
?>