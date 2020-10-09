<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Student extends CI_Controller {
	private $custUrl = 'student/';
	private $headerUrl = 'student/';
	private $footerUrl = 'member/';
		
	public function __construct(){
	    parent::__construct();	      
	    $this->load->helper('form');
    	$this->load->helper('url');
    	
	    $this->load->model('headmodel');
		$this->load->model('studentmodel');
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
		$header_data['page'] = 'Student';
		$header_data['headerData'] = $this->headmodel->getHeaderData();
		
		$header_data['newslist'] = $this->newsmodel->GetTopFiveNews();
		$header_data['eventlist'] = $this->eventmodel->GetTopFiveEvent();
		
		$output = $this->load->view($this->headerUrl.'header',$header_data,true); 	
		$output .= $this->load->view($this->custUrl.'student',$header_data,true); 
		$output .= $this->load->view($this->footerUrl.'footer',$header_data,true);           
		$this->output->set_output($output);
	}	
	
	public function managestudent()
	{
		if(($this->session->userdata('logged_in')==true) && ($this->session->userdata('id') != ""))
		{
			$header_data = array();
			$header_data['page'] = 'Student';
			$header_data['headerData'] = $this->headmodel->getHeaderData();
			$output = $this->load->view($this->headerUrl.'header',$header_data,true); 	
			$output .= $this->load->view($this->custUrl.'managestudent',$header_data,true); 
			$output .= $this->load->view($this->footerUrl.'footer',$header_data,true);           
			$this->output->set_output($output);
		}
		else
		{
			redirect(config_item('base_url').'login');
		}
	}
	
	//Angular JS functions goes here.....
	public function GetStudentRecords() {
		$data = $this->studentmodel->GetStudentList();
		echo json_encode($data);
		//$this->output->set_content_type('application/json')->set_output(json_encode($data));
	}
	
	public function StudentRecords() {
		$class_id = trim($_POST['class_id']);
		$section_id = trim($_POST['section_id']);
		$data = $this->studentmodel->StudentList($class_id, $section_id);
		echo json_encode($data);
	}
	
	public function GetParentList(){
		$data = $this->studentmodel->GetParentList();
	    echo json_encode($data);  
	}
	
	public function GetGenderList(){	
	    $data = $this->studentmodel->GetGenderList();
	    echo json_encode($data);    
	}
	
	public function GetReligionList(){	
	    $data = $this->studentmodel->GetReligionList();
	    echo json_encode($data);    
	}
	
	public function GetStatusList(){	
	    $data = $this->studentmodel->GetStatusList();
	    echo json_encode($data);    
	}
	
	public function GetClassList(){	
	    $data = $this->studentmodel->GetClassList();
	    echo json_encode($data);    
	}
	
	public function GetSectionList(){
		$data = $this->studentmodel->GetSectionList();
	    echo json_encode($data);  
	}
	
	
	public function SaveStudentEnrolment(){
	    $get=file_get_contents('php://input');
	    $json_get=json_decode($get);
	    foreach ($json_get as $row)
	    {
	        $enrolment_id = $row->enrolment_id;
	        $roll_no = $row->roll_no;
	        $first_name = $row->first_name;
		    $last_name = $row->last_name;
		    $parents_id = $row->parents_id;
		    $father_name = $row->father_name;
		    $mother_name = $row->mother_name;
		    $address = $row->address;
		    $mobile_no = $row->mobile_no;
		    $gender_id = $row->gender_id;
			$religion_id = $row->religion_id;
			$date_of_birth = $row->date_of_birth;
			$profile_photo = $row->profile_photo;
			$enrolment_year = $row->enrolment_year;
			$status_id = $row->status_id;
	    }
	    
	    $data = array(
	        'roll_no' => $roll_no,
	        'first_name' => $first_name,
		    'last_name' => $last_name,
		    'parents_id' => $parents_id,
		    'gender_id' => $gender_id,
			'religion_id' => $religion_id,
			'date_of_birth' => $date_of_birth,
			'profile_photo' => $profile_photo,
			'enrolment_year' => $enrolment_year,
			'status_id' => $status_id,
		);
	    
	    $data = $this->studentmodel->SaveStudentEnrolment($enrolment_id, $roll_no, $first_name, $last_name, $parents_id, $father_name, $mother_name, $address, $mobile_no, $gender_id, $religion_id, $date_of_birth, $profile_photo, $enrolment_year, $status_id);
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