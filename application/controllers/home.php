<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller {
	private $userType = 'member/';
		
	public function __construct(){
	    parent::__construct();	      
	    $this->load->helper('form');
    	$this->load->helper('url');
    	
	    $this->load->model('headmodel');
		$this->load->model('membermodel');
		$this->load->model('newsmodel');		
		$this->load->model('eventmodel');
		$this->load->model('alumnimodel');
		$this->load->model('loginmodel');
		$this->load->model('custdatabase');	
		$this->load->model('mycurl');
		
		// Check Login Information From The Session
	    //$this->headmodel->loginCheck();
	}
	
	public function index()
	{
		$header_data = array();
		$header_data['page'] = 'Dashboard';
		$header_data['headerData'] = $this->headmodel->getHeaderData();
		
		//Read data from db
		$header_data['member'] = $this->membermodel->getLoginDetails($this->session->userdata('id'));
		$header_data['newslist'] = $this->newsmodel->GetTopFiveNews();
		$header_data['eventlist'] = $this->eventmodel->GetTopFiveEvent();
		
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