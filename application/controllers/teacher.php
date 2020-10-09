<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Teacher extends CI_Controller {
	private $custUrl = 'teacher/';
	private $headerUrl = 'teacher/';
	private $footerUrl = 'member/';
		
	public function __construct(){
	    parent::__construct();	      
	    $this->load->helper('form');
    	$this->load->helper('url');
    	
	    $this->load->model('headmodel');
		$this->load->model('teachermodel');
		$this->load->model('newsmodel');
		$this->load->model('eventmodel');
		$this->load->model('loginmodel');
		$this->load->model('custdatabase');	
		$this->load->model('mycurl');
		
		// Check Login Information From The Session
	    //$this->headmodel->loginCheck();
	}
	
	public function index()
	{
		$header_data = array();
		$header_data['page'] = 'Teacher';
		$header_data['headerData'] = $this->headmodel->getHeaderData();
		
		$header_data['teachers'] = $this->teachermodel->GetTeacherList();
		$header_data['newslist'] = $this->newsmodel->GetTopFiveNews();
		$header_data['eventlist'] = $this->eventmodel->GetTopFiveEvent();
		
		$output = $this->load->view($this->headerUrl.'header',$header_data,true); 	
		$output .= $this->load->view($this->custUrl.'teacher',$header_data,true); 
		$output .= $this->load->view($this->footerUrl.'footer',$header_data,true);           
		$this->output->set_output($output);
	}
	
	public function manageteacher()
	{
		if(($this->session->userdata('logged_in')==true) && ($this->session->userdata('id') != ""))
		{
			$header_data = array();
			$header_data['page'] = 'Manage Teacher';
			$header_data['headerData'] = $this->headmodel->getHeaderData();
			$output = $this->load->view($this->headerUrl.'header',$header_data,true); 	
			$output .= $this->load->view($this->custUrl.'manageteacher',$header_data,true); 
			$output .= $this->load->view($this->footerUrl.'footer',$header_data,true);           
			$this->output->set_output($output);
		}
		else
		{
			redirect(config_item('base_url').'login');
		}
	}
	
	//Angular JS functions goes here.....
	public function GetTeacherRecords() {
		$data = $this->teachermodel->GetTeacherList();
		echo json_encode($data);
		//$this->output->set_content_type('application/json')->set_output(json_encode($data));
	}
		
	public function GetGenderList(){	
	    $data = $this->teachermodel->GetGenderList();
	    echo json_encode($data);    
	}
	
	public function GetReligionList(){	
	    $data = $this->teachermodel->GetReligionList();
	    echo json_encode($data);    
	}
	
	public function GetDesignationList(){	
	    $data = $this->teachermodel->GetDesignationList();
	    echo json_encode($data);    
	}
	
	public function SaveTeacherInfo(){
	    $get=file_get_contents('php://input');
	    $json_get=json_decode($get);
	    foreach ($json_get as $row)
	    {				
	        $teacher_id = $row->teacher_id;
	        $first_name = $row->first_name;
		    $last_name = $row->last_name;
		    $address = $row->address;
		    $mobile_number = $row->mobile_number;
		    $gender_id = $row->gender_id;
			$religion_id = $row->religion_id;
			$date_of_birth = $row->date_of_birth;
			$joining_date = $row->joining_date;
			$leaving_date = $row->leaving_date;
			$profile_photo = $row->profile_photo;
			$designation_id = $row->designation_id;
			$is_active = $row->is_active;
	    }
	    
	    $data = array(
	        'first_name' => $first_name,
		    'last_name' => $last_name,
		    'address' => $address,
		    'mobile_number' => $mobile_number,
		    'gender_id' => $gender_id,
			'religion_id' => $religion_id,
			'date_of_birth' => $date_of_birth,
			'joining_date' => $joining_date,
			'leaving_date' => $leaving_date,
			'designation_id' => $designation_id,
	    	'profile_photo' => $profile_photo,
			'is_active' => $is_active
		);
	    
	    $data = $this->teachermodel->SaveTeacherInfo($teacher_id, $data);
	    echo json_encode($data);
	    
	    //$data = $this->studentmodel->GetRollNumber();	    
	    //$this->output->set_content_type('application/json')->set_output(json_encode($data));
	}
	
	/*Start manage students section here ....*/
	public function GetEnrolmentStudents(){
		$new_student = trim($_POST['new_student']);
		$class_id = trim($_POST['class_id']);
		$section_id = trim($_POST['section_id']);
		$enrolment_year = date("y");
		if($new_student)
			$status = 'New'; // New means student enrolment
		else 
			$status = 'Published'; // means that result is already published now time to move the student to the next class
			
		$data = array('new_student' => $new_student,'class_id' => $class_id,'section_id' => $section_id);
		
		$data = $this->studentmodel->GetEnrolmentStudents($enrolment_year, $status, $class_id, $section_id);
	    echo json_encode($data);
	}
	
	public function ProceedToNextClasses(){
	    $get=file_get_contents('php://input');
	    $json_get=json_decode($get);	    
	    $data = $this->studentmodel->ProceedToNextClass($json_get->data);
	    echo json_encode($data);
	}
	/*End manage students section here ....*/
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */