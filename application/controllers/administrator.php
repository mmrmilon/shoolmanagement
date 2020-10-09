<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Administrator extends CI_Controller {
	private $custUrl = 'admin/';
	private $headerUrl = 'admin/';
	private $footerUrl = 'member/';
		
	public function __construct(){
	    parent::__construct();	      
	    $this->load->helper('form');
    	$this->load->helper('url');
    	
	    $this->load->model('headmodel');
		$this->load->model('adminmodel');
		$this->load->model('loginmodel');
		$this->load->model('custdatabase');	
		$this->load->model('mycurl');
		
		// Check Login Information From The Session
	    //$this->headmodel->loginCheck();
	}
	
	public function index()
	{
		if(($this->session->userdata('logged_in')==true) && ($this->session->userdata('id') != ""))
		{	
			$header_data = array();
			$header_data['page'] = 'Administrator';
			$header_data['headerData'] = $this->headmodel->getHeaderData();
			$output = $this->load->view($this->headerUrl.'header',$header_data,true); 	
			$output .= $this->load->view($this->custUrl.'admin',$header_data,true); 
			$output .= $this->load->view($this->footerUrl.'footer',$header_data,true);           
			$this->output->set_output($output);
		}
		else
		{
			redirect(config_item('base_url').'login');
			//$rurl=config_item('base_url').'member/home';
			//redirect($rurl);
		}
	}
	
	//Angular JS functions goes here.....
	public function GetEventRecords() {
		$data = $this->adminmodel->GetEventList();
		echo json_encode($data);
		//$this->output->set_content_type('application/json')->set_output(json_encode($data));
	}
	
	public function GetMessageRecords() {
		$data = $this->adminmodel->GetMessageList();
		echo json_encode($data);
		//$this->output->set_content_type('application/json')->set_output(json_encode($data));
	}
	
	public function SaveMessages(){
	    $get=file_get_contents('php://input');
	    $json_get=json_decode($get);
	    foreach ($json_get as $row)
	    {
	        $message_id = $row->message_id;
	        $member_id = $row->member_id;
	        $msg_title = $row->msg_title;
		    $msg_details = $row->msg_details;
	    }
	    
	    $data = array(
	        'message_id' => $message_id,
	        'member_id' => $member_id,
		    'msg_title' => $msg_title,
		    'msg_details' => $msg_details,
		);
	    
	    $data = $this->adminmodel->SaveMessages($message_id, $member_id, $msg_title, $msg_details);
	    echo json_encode($data);
	    
	    //$data = $this->studentmodel->GetRollNumber();	    
	    //$this->output->set_content_type('application/json')->set_output(json_encode($data));
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */