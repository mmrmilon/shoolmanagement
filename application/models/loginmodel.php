<?php class Loginmodel extends CI_Model {
	function __construct(){
		//parent::Model();
		$this->load->database();
	}

	function getHeaderData(){
		$this->load->library('Session');
		// $this->load->library('encrypt');
		
		$res=$this->db->get('settings')->result();
		$header_data=array();		
		$header_data['base_url']=config_item('base_url');
		$header_data['assets']=config_item('base_url').'assets/';
		$header_data['images']=config_item('base_url').'images/';					
		$header_data['meta_keywords']=$res[0]->value;					
		$header_data['meta_description']=$res[1]->value;					
		return $header_data;		
	}	
	
	// User Validation
	function login($username, $password)
	{
		$this->db->where('email_address', $username);
		$this->db->where('password', $password);
        $query=$this->db->get('member');
		$exists=$query->num_rows(); 
		if($exists > 0){
			return $query->row();
		}else{
			return '';
		}
	}
	
	//set member 
	function setRememberMe($userName,$userPass){
		setcookie("cookOscNTUname", $userName, time()+60*60*24*7, "/"); /////7 for expired in 7 days
		setcookie("cookOscNTUpass", $userPass, time()+60*60*24*7, "/");  /////7 for expired in 7 days	
	}	
}
?>