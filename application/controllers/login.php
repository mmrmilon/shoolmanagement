<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login extends CI_Controller {
	private $userType = 'admin/';
	public function __construct(){
		parent::__construct();
		//$this->headmodel->loginCheck();
		$this->load->library('session');
		$this->load->model('headmodel');
		$this->load->model('membermodel');
		$this->load->model('loginmodel');
		$this->load->model('custdatabase');
		$this->load->model('mycurl');
	}
	
	//login 
	public function index(){
		
		$header_data = array();	
		$header_data['page'] = 'User Login';	
		$header_data['headerData'] = $this->headmodel->getHeaderData();
		$ref=config_item('base_url').'member';
		if(isset($_REQUEST['refPath'])){
			$ref = base64_decode($_REQUEST['refPath']);
		}
		
		if($_POST)
		{
			if(isset($_REQUEST['username']))
			{
				$username	=trim($this->input->post('username'));
				$password	=trim($this->input->post('password'));
				$remember_me=$this->input->post('remember_me');
				
				$user=$this->loginmodel->login($username, $password);				
				$header_data['loginError'] = FALSE;
				
				if(!$user)
				{
					$header_data['loginError'] = true;
				}
				else
				{	
					$session_id = $this->session->userdata('session_id');						
					$newdata = array(
							'fullname'  => $user->first_name.' '.$user->last_name,
							'username'  => $user->user_name,
							'uEmail'  => $user->email_address,
							'id'  => $user->member_id,
							'role' => $user->user_role,
							'logged_in' => TRUE,
							'sessionid' => $session_id
						);
						
					$this->session->set_userdata($newdata);
					redirect(config_item('base_url').'member/home');		
				}
			}
		}
		$output = $this->load->view('login',$header_data,true);
		$this->output->set_output($output);				
	}
	
	public function ajax_login()
	{
		$username = trim($this->input->post('email'));
		$password = trim($this->input->post('password'));
		$remember_me=$this->input->post('remember_me');
		
		$user=$this->loginmodel->login($username, $password);				
		$header_data['loginError'] = FALSE;
		
		if(!$user)
		{
			$header_data['loginError'] = true;
      		echo json_encode(array('login_status' => 'invalid', 'first_name' => $user->first_name));
		}
		else
		{	
			$session_id = $this->session->userdata('session_id');						
			$newdata = array(
					'fullname'  => $user->first_name.' '.$user->last_name,
					'username'  => $user->user_name,
					'uEmail'  => $user->email_address,
					'id'  => $user->member_id,
					'role' => $user->user_role,
					'logged_in' => TRUE,
					'sessionid' => $session_id
				);
				
			$this->session->set_userdata($newdata);
			$rurl=config_item('base_url').'home';	
      		echo json_encode(array('login_status' => 'success', 'redirect_url' => $rurl));
		}
	}
		
}