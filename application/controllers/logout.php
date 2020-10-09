<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Logout extends CI_Controller {
	
	public function __construct(){
	        parent::__construct();
    		$this->load->helper('url');
	        $this->load->library('session');
			$this->load->model('headmodel');
	}
	
	public function index(){
		$header_data = array();		
		$header_data['headerData'] = $this->headmodel->getHeaderData();
		$loginid = $this->session->userdata('id');		
		$this->session->sess_destroy();
		//echo '<script>alert("After logout this URL will redirected to mother plugin site.");</script>';
		//redirect(config_item('base_url').'login');
		redirect(config_item('base_url').'home');
	}
}