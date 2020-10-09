<?php 

class Studentmodel extends CI_Model {
	function __construct(){
		//parent::Model();	
		$this->load->model('myxml');
	}
	
	// get student records
	function GetStudentList()
	{
		$sql = "SELECT se.*, 
		`g`.`gender_name`,
		`r`.`religion_name`,
		`s`.`status`
		FROM `student_enrolment` se
		INNER JOIN `genders` g ON se.gender_id = g.gender_id
		INNER JOIN `religions` r ON se.religion_id = r.religion_id
		INNER JOIN `status` s ON se.status_id = s.status_id
		WHERE se.enrolment_year = (SELECT MAX(enrolment_year) FROM student_enrolment)";
		$result=$this->db->query($sql)->result();
		return $result;		
	}
	
	function StudentList($class_id, $section_id){
		
		
		$sql = "SELECT 
		`student_enrolment`.`roll_no`,
		`student_enrolment`.`first_name`, 
		`student_enrolment`.`last_name`,
		`genders`.`gender_name`,
		`student_enrolment`.`profile_photo`,
		'' AS `grade_point_average`,
		'' AS `grade`,
		`student_enrolment`.`enrolment_id` as `position`
		FROM `student_details`
		INNER JOIN `student_enrolment` ON `student_enrolment`.`enrolment_id` = `student_details`.enrolment_id
		INNER JOIN `genders` ON `student_enrolment`.`gender_id` = `genders`.gender_id
		WHERE `student_details`.`class_id` = '".$class_id."' AND `student_details`.`section_id` = '".$section_id."'
		ORDER BY `student_enrolment`.`enrolment_id` ASC";
		
		$result=$this->db->query($sql)->result();
		return $result;	
	}
	
	
	function GetParentList(){		
		$sql = "SELECT CONCAT(first_name, ' ', last_name) AS full_name, parents_id FROM `parents` ORDER BY parents_id DESC";
		$result=$this->db->query($sql)->result();
		return $result;	
	}
	
	function GetGenderList(){
		$sql = 'SELECT * FROM `genders` ORDER BY `genders`.`gender_id`  ASC';
		$result=$this->db->query($sql)->result();
		return $result;	
	}
	
	function GetReligionList(){
		$sql = "SELECT * FROM `religions` ORDER BY `religions`.`religion_id`  ASC";
		$result=$this->db->query($sql)->result();
		return $result;	
	}
	
	function GetStatusList(){
		$sql = "SELECT * FROM `status` ORDER BY `status_id` ASC";
		$result=$this->db->query($sql)->result();
		return $result;	
	}
	
	function GetClassList(){
		$sql = "SELECT `classes`.`class_id`,`classes`.`class_name` FROM `classes` ORDER BY `classes`.`class_name` ASC ";
		$result=$this->db->query($sql)->result();
		return $result;	
	}
	
	function GetSectionList(){
		$sql = "SELECT `sections`.`section_id`,`sections`.`section_name` FROM `sections` ORDER BY `sections`.`section_name` ASC";
		$result=$this->db->query($sql)->result();
		return $result;
	}
	
	// Generate roll number 
	function GetRollNumber(){
		$roll = date("y");
		$prefix_value = '1927';
		$prefix_index = '001';
		$sql = "SELECT * FROM `prefixes` WHERE prefix_year = ".date("Y");
		$result=$this->db->query($sql)->result();
		if($result)
		{
			foreach ($result as $row) {
		        $prefix_value = $row->prefix_value;
		        $prefix_index = $row->prefix_index;
		    }
		    
		    if(strlen($prefix_index) == 1)
		    	$prefix_index = '00'.$prefix_index;
		    else if(strlen($prefix_index) == 2)
		    	$prefix_index = '0'.$prefix_index;		    
		    
		    $roll = $roll.$prefix_value.$prefix_index;
		}
		else {
			$insertArray = array(
	        'prefix_year' => date("Y"),
	        'prefix_value' => 1927,
		    'prefix_index' => 1
			);
			$query=$this->db->insert('prefixes', $insertArray);
			
			$roll = $roll.$prefix_value.$prefix_index;
		}
		
		return $roll;
	}
	
	// Generate roll number 
	function UpdatePrefixes(){
		$prefix_index = 0;
		$sql = "SELECT * FROM `prefixes` WHERE prefix_year = ".date("Y");
		$result=$this->db->query($sql)->result();
		foreach ($result as $row) {
		        $prefix_index = $row->prefix_index;
		    }
		$prefix_index = $prefix_index + 1;
		$updateArray = array(
		    'prefix_index' => $prefix_index
		);
		$this->db->where('prefix_year', date("Y"));
		$query = $this->db->update('prefixes',$updateArray);
				
		if($query)
			return true;
		else
			return false;
	}
	
	function SaveStudentEnrolment($enrolment_id, $roll_no, $first_name, $last_name, $parents_id, $father_name, $mother_name, $address, $mobile_no, $gender_id, $religion_id, $date_of_birth, $profile_photo, $enrolment_year, $status_id)
	{
		$roll_no = $this->GetRollNumber();
		$insertArray = array(
	        'roll_no' => $roll_no,
	        'first_name' => $first_name,
		    'last_name' => $last_name,
		    'parents_id' => $parents_id,
			'father_name' => $father_name,
			'mother_name' => $mother_name,
			'address' => $address,
			'mobile_no' => $mobile_no,
		    'gender_id' => $gender_id,
			'religion_id' => $religion_id,
			'date_of_birth' => $date_of_birth,
			'profile_photo' => 'no image',
			'enrolment_year' => date("Y"),
			'status_id' => 1,
		);
		
		$updateArray = array(
	        'first_name' => $first_name,
		    'last_name' => $last_name,
			'father_name' => $father_name,
			'mother_name' => $mother_name,
			'address' => $address,
			'mobile_no' => $mobile_no,
		    'gender_id' => $gender_id,
			'religion_id' => $religion_id,
			'date_of_birth' => $date_of_birth
		);
		
		if($enrolment_id > 0)
		{
			$this->db->where('enrolment_id', $enrolment_id);
			$query = $this->db->update('student_enrolment',$updateArray);
		}
		else 
		{
			$query=$this->db->insert('student_enrolment', $insertArray);
			$this->UpdatePrefixes();
		}
		if($query)
			return true;
		else
			return false;		
	}	
	
	/*Start manage students section here ....*/
	function GetEnrolmentStudents($enrolment_year, $status, $class_id, $section_id){
		if($status == 'New')
		{
			$sql = "SELECT 
			0 AS `is_checked`,
			`student_enrolment`.`enrolment_id`,
			`student_enrolment`.`roll_no`,
			CONCAT(`student_enrolment`.`first_name`, ' ', `student_enrolment`.`last_name`) AS `full_name`,
			'' AS `cgpa`,
			'' AS `grade`,
			`student_enrolment`.`enrolment_id` as `position`
			FROM `student_enrolment`
			INNER JOIN status ON `student_enrolment`.`status_id` = `status`.status_id
			WHERE `status`.`status` = '".$status."' AND `student_enrolment`.`enrolment_year` = '".$enrolment_year."'
			ORDER BY `enrolment_id` ASC";
		}
		else {
			$sql = "SELECT 
			`student_enrolment`.`enrolment_id`,
			`student_enrolment`.`roll_no`,
			CONCAT(`student_enrolment`.`first_name`, ' ', `student_enrolment`.`last_name`) AS `full_name`,
			'' AS `grade_point_average`,
			'' AS `grade`,
			`student_enrolment`.`enrolment_id` as `position`
			FROM `student_enrolment`
			INNER JOIN status ON `student_enrolment`.`status_id` = `status`.status_id
			WHERE `status`.`status` = '".$status."' AND `student_enrolment`.`enrolment_year` = '".$enrolment_year."'
			ORDER BY `enrolment_id` ASC";
		}
		
		$result=$this->db->query($sql)->result();
		return $result;	
	}
	
	function ProceedToNextClass($datas){		
		$study_year = date("y");
		$student_session = date("y");
		$class_id = 1;
		$section_id = 1;
		$status_id = 2; // Current
		foreach ($datas as $row)
	   	{
	        $insertArray = array(
	        'enrolment_id' => $row->enrolment_id,
	        'class_id' => $class_id,
		    'section_id' => $section_id,
		    'student_session' => $student_session,
			'study_year' => $study_year,
			'merit_position' => $row->position,
			'status_id' => $status_id
			);
			
			$result = $this->db->insert('student_details', $insertArray);
	    }
	    	    
	    return $result;	
	}
	/*End manage students section here ....*/
}
?>