<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Member extends CI_Controller {
	private $userType = 'member/';
		
	public function __construct(){
	    parent::__construct();	      
	    $this->load->helper('form');
    	$this->load->helper('url');
    	
	    $this->load->model('headmodel');
		$this->load->model('membermodel');
		$this->load->model('alumnimodel');
		$this->load->model('loginmodel');
		$this->load->model('custdatabase');	
		$this->load->model('mycurl');
		
		// Check Login Information From The Session
	    //$this->headmodel->loginCheck();
	}
	
	public function index()
	{
		//$rurl=config_item('base_url').'login/index';
		//redirect($rurl);
		redirect(config_item('base_url').'member/home');
		
		/*$header_data = array();
		$header_data['page'] = 'Dashboard';
		$header_data['headerData'] = $this->headmodel->getHeaderData();
		$output = $this->load->view($this->userType.'home',$header_data,true);            
		$this->output->set_output($output);*/
	}
	
	public function home(){			
		/*if(($this->session->userdata('logged_in')==true) && ($this->session->userdata('id') != ""))
		{	
			$header_data = array();
			$header_data['page'] = 'Home';
			$header_data['headerData'] = $this->headmodel->getHeaderData();
			if($_POST)
			{
				if(isset($_REQUEST['username']))
				{
					$username	=trim($this->input->post('username'));
					$password	=trim($this->input->post('password'));
					$remember_me = $this->input->post('remember_me');
					$branch_id = $this->input->post('sel_branch_id');
									
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
								'logged_in' => TRUE,
								'sessionid' => $session_id
							);
							
						$this->session->set_userdata($newdata);
						redirect(config_item('base_url').'member/quotation/0/'.$branch_id);		
					}
				}
			}
			$header_data['CarModels'] = $CarModels = $this->membermodel->GetCarModels();
				if($CarModels){
					foreach ($CarModels as $row){
						$modelid = $row->model_id;
						break;
					}
				}
			$header_data['CarSubModels'] = $this->membermodel->GetCarSubModelByModelId($modelid); //GetCarSubModels();
				
			$header_data['Branchs'] = $this->membermodel->GetBranchDetails();
			           
			$this->output->set_output($output);
		}
		else
		{
			redirect(config_item('base_url').'login');
			//$rurl=config_item('base_url').'member/home';
			//redirect($rurl);
		}*/
		
		$header_data = array();
		$header_data['page'] = 'Dashboard';
		$header_data['headerData'] = $this->headmodel->getHeaderData();
		
		//Read data from db
		$header_data['member'] = $this->membermodel->getLoginDetails($this->session->userdata('id'));
		//var_dump($header_data['member']);
		
		//$output = $this->load->view($this->userType.'header',$header_data,true); 	
		//$output .= $this->load->view($this->userType.'home',$header_data,true); 
		//$output .= $this->load->view($this->userType.'footer',$header_data,true);   
		$output = $this->load->view($this->userType.'home',$header_data,true);         
		$this->output->set_output($output);
	}
	
	public function dashboard(){
		$header_data = array();
		$header_data['page'] = 'Dashboard';
		$header_data['headerData'] = $this->headmodel->getHeaderData();
		$output = $this->load->view($this->userType.'header',$header_data,true); 	
		$output .= $this->load->view($this->userType.'dashboard',$header_data,true); 
		$output .= $this->load->view($this->userType.'footer',$header_data,true);           
		$this->output->set_output($output);
	}
	
	public function GetAlumniSummary(){	
	    $data = $this->alumnimodel->GetAlumniSummary();
	    echo json_encode($data);    
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */