<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Subject extends CI_Controller {
	private $custUrl = 'subject/';
	private $headerUrl = 'member/';
	private $footerUrl = 'member/';
		
	public function __construct(){
	    parent::__construct();	      
	    $this->load->helper('form');
    	$this->load->helper('url');
    	
	    $this->load->model('headmodel');
		$this->load->model('subjectmodel');
		$this->load->model('loginmodel');
		$this->load->model('custdatabase');	
		$this->load->model('mycurl');
		
		// Check Login Information From The Session
	    //$this->headmodel->loginCheck();
	}
	
	public function index()
	{
		redirect(config_item('base_url').'subject/managesubject');
	}	
	
	/*managesubject*/
	public function managesubject()
	{
		$header_data = array();
		$header_data['page'] = 'Subject';
		$header_data['headerData'] = $this->headmodel->getHeaderData();
		$output = $this->load->view($this->headerUrl.'header',$header_data,true); 	
		$output .= $this->load->view($this->custUrl.'subject',$header_data,true); 
		$output .= $this->load->view($this->footerUrl.'footer',$header_data,true);           
		$this->output->set_output($output);
	}
	
	public function GetSubjectList(){	
	    $data = $this->subjectmodel->GetSubjectList();
	    echo json_encode($data);
	    //$this->output->set_content_type('application/json')->set_output(json_encode($data));	    
	}
	
	public function GetClassList(){	
	    $data = $this->subjectmodel->GetClassList();
	    echo json_encode($data);    
	}
	
	public function GetSectionList(){
		$data = $this->subjectmodel->GetSectionList();
	    echo json_encode($data);  
	}
	
	
	public function SaveSubject(){
	    $get=file_get_contents('php://input');
	    $json_get=json_decode($get);
	    foreach ($json_get as $row)
	    {
	        $subject_id = $row->subject_id;
	        $subject_name =$row->subject_name;
	        $subject_code = $row->subject_code;
	        $class_id = $row->class_id;
	        $section_id = $row->section_id;
	        $is_optional = $row->is_optional;
	    }
	    
	    $data = array(
	        'subject_id' => $subject_id,
	        'subject_name' => $subject_name,
	        'subject_code' => $subject_code,
		    'class_id' => $class_id,
		    'section_id' => $section_id,
		    'is_optional' => $is_optional
	    );
	    
	    $data = $this->subjectmodel->SaveSubject($subject_id, $subject_name, $subject_code, $class_id, $section_id, $is_optional);
	    echo json_encode($data);
	    //$this->output->set_content_type('application/json')->set_output(json_encode($data));
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */