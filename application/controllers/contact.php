<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Contact extends CI_Controller {
	private $custUrl = 'contact/';
	private $headerUrl = 'member/';
	private $footerUrl = 'member/';
		
	public function __construct(){
	    parent::__construct();	      
	    $this->load->helper('form');
    	$this->load->helper('url');
    	
	    $this->load->model('headmodel');
		$this->load->model('membermodel');
		$this->load->model('newsmodel');		
		$this->load->model('eventmodel');
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
		
		$output = $this->load->view($this->headerUrl.'header',$header_data,true); 	
		$output .= $this->load->view($this->custUrl.'contact',$header_data,true); 
		$output .= $this->load->view($this->footerUrl.'footer',$header_data,true);          
		$this->output->set_output($output);
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */