<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Event extends CI_Controller {
	private $custUrl = 'event/';
	private $headerUrl = 'event/';
	private $footerUrl = 'member/';
		
	public function __construct(){
	    parent::__construct();	      
	    $this->load->helper('form');
    	$this->load->helper('url');
    	
	    $this->load->model('headmodel');
		$this->load->model('eventmodel');
		$this->load->model('newsmodel');
		$this->load->model('loginmodel');
		$this->load->model('custdatabase');	
		$this->load->model('mycurl');
		
		// Check Login Information From The Session
	    //$this->headmodel->loginCheck();
	}
	
	public function index()
	{
		$header_data = array();
		$header_data['page'] = 'Event';
		$header_data['headerData'] = $this->headmodel->getHeaderData();
		
		$header_data['eventlist'] = $this->eventmodel->GetEventList();
		$header_data['newslist'] = $this->newsmodel->GetTopFiveNews();
		
		$output = $this->load->view($this->headerUrl.'header',$header_data,true); 	
		$output .= $this->load->view($this->custUrl.'event',$header_data,true); 
		$output .= $this->load->view($this->footerUrl.'footer',$header_data,true);           
		$this->output->set_output($output);
	}
	
	public function newevent()
	{
		$header_data = array();
		$header_data['page'] = 'Event';
		$header_data['headerData'] = $this->headmodel->getHeaderData();
		$output = $this->load->view($this->headerUrl.'header',$header_data,true); 	
		$output .= $this->load->view($this->custUrl.'newevent',$header_data,true); 
		$output .= $this->load->view($this->footerUrl.'footer',$header_data,true);           
		$this->output->set_output($output);
	}
	
	
	public function GetEventList(){	
	    $data = $this->eventmodel->GetEventList();
	    echo json_encode($data);    
	}
		
	public function SaveEventInfo(){
	    $get=file_get_contents('php://input');
	    $json_get=json_decode($get);
	    foreach ($json_get as $row)
	    {
	        $event_id = $row->event_id;
	        $start_date = $row->start_date;
		    $end_date = $row->end_date;
		    $start_time = $row->start_time;
		    $end_time = $row->end_time;
		    $event_location = $row->event_location;
			$event_name = $row->event_name;
			$event_details = $row->event_details;
	    }
			
	    $data = array(
	    	'event_id' => $event_id,
		    'member_id' => $this->session->userdata('id'),
		    'start_date' => $start_date,
		    'end_date' => $end_date,
		    'start_time' => $start_time,
		    'end_time' => $end_time,
		    'event_location' => $event_location,
			'event_name' => $event_name,
			'event_details' => $event_details
		);
	    
	    $data = $this->eventmodel->SaveEventInfo($event_id, $data);
	    echo json_encode($data);
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */