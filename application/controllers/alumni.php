<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Alumni extends CI_Controller {
	private $custUrl = 'alumni/';
	private $headerUrl = 'alumni/';
	private $footerUrl = 'member/';
		
	public function __construct(){
	    parent::__construct();	      
	    $this->load->helper('form');
    	$this->load->helper('url');
    	
	    $this->load->model('headmodel');
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
		$header_data['page'] = 'Student';
		$header_data['headerData'] = $this->headmodel->getHeaderData();
		$output = $this->load->view($this->headerUrl.'header',$header_data,true); 	
		$output .= $this->load->view($this->custUrl.'alumni',$header_data,true); 
		$output .= $this->load->view($this->footerUrl.'footer',$header_data,true);           
		$this->output->set_output($output);
	}
	
	public function member()
	{
		$header_data = array();
		$header_data['page'] = 'Student';
		$header_data['headerData'] = $this->headmodel->getHeaderData();
		$output = $this->load->view($this->headerUrl.'header',$header_data,true); 	
		$output .= $this->load->view($this->custUrl.'member',$header_data,true); 
		$output .= $this->load->view($this->footerUrl.'footer',$header_data,true);           
		$this->output->set_output($output);
	}
	
	public function register()
	{
		$header_data = array();
		$header_data['page'] = 'Student';
		$header_data['headerData'] = $this->headmodel->getHeaderData();
		$output = $this->load->view($this->headerUrl.'header',$header_data,true); 	
		$output .= $this->load->view($this->custUrl.'register',$header_data,true); 
		$output .= $this->load->view($this->footerUrl.'footer',$header_data,true);           
		$this->output->set_output($output);
	}
	
	public function chartexample()
	{
		$header_data = array();
		$header_data['page'] = 'Student';
		$header_data['headerData'] = $this->headmodel->getHeaderData();
		//$output = $this->load->view($this->headerUrl.'header',$header_data,true); 	
		$output = $this->load->view($this->custUrl.'chartexample',$header_data,true); 
		//$output .= $this->load->view($this->footerUrl.'footer',$header_data,true);           
		$this->output->set_output($output);
	}
	
	
	public function GetAlumniSummary(){	
	    $data = $this->alumnimodel->GetAlumniSummary();
	    echo json_encode($data);    
	}
	
	public function GetAlumniList(){	
	    $data = $this->alumnimodel->GetAlumniList();
	    echo json_encode($data);    
	}
	
	public function GetGenderList(){	
	    $data = $this->alumnimodel->GetGenderList();
	    echo json_encode($data);    
	}
	
	public function SaveAlumniInfo(){
	    $get=file_get_contents('php://input');
	    $json_get=json_decode($get);
	    foreach ($json_get as $row)
	    {				
	        $register_id = $row->register_id;
	        $ssc_roll_no = $row->ssc_roll_no;
		    $full_name = $row->full_name;
		    $nick_name = $row->nick_name;
		    $passing_year = $row->passing_year;
		    $gender_id = $row->gender_id;
			$date_of_birth = $row->date_of_birth;
			$blood_group = $row->blood_group;
			$address = $row->address;
			$city = $row->city;
			$country = $row->country;
			$email = $row->email;			
			$mobile_no = $row->mobile_no;
			$password = $row->password;
			$confirm_password = $row->confirm_password;
			$profession = $row->profession;
			$designation = $row->designation;
			$company = $row->company;
			$company_address = $row->company_address;
	    }
			
	    $data = array(
	        'ssc_roll_no' => $ssc_roll_no,
		    'full_name' => $full_name,
		    'nick_name' => $nick_name,
		    'passing_year' => $passing_year,
		    'gender_id' => $gender_id,
			'date_of_birth' => $date_of_birth,
			'blood_group' => $blood_group,
			'address' => $address,
			'city' => $city,
	    	'country' => $country,
			'email' => $email,			
			'mobile_no' => $mobile_no,
			'password' => $password,
			'confirm_password' => $confirm_password,
			'profession' => $profession,
			'designation' => $designation,
			'company' => $company,
			'company_address' => $company_address
		);
	    
	    $data = $this->alumnimodel->SaveAlumniInfo($register_id, $data);
	    echo json_encode($data);
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */