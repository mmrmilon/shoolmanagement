<?php 
class Teachermodel extends CI_Model {
	function __construct(){
		//parent::Model();	
		$this->load->model('myxml');
	}
	
	// get student records
	function GetTeacherList()
	{
		$sql = "SELECT  
		`teachers`.`teacher_id`,
		`teachers`.`first_name`,
		`teachers`.`last_name`,
		CONCAT(`teachers`.`first_name`, ' ', `teachers`.`last_name`) AS full_name,
		`teachers`.`address`,
		`teachers`.`designation_id`,
		`designations`.`designation`,
		`teachers`.`gender_id`,
		`genders`.`gender_name`,
		`teachers`.`religion_id`,
		`religions`.`religion_name`,
		`teachers`.`date_of_birth`,
		`teachers`.`phone_number`,
		`teachers`.`mobile_number`,
		`teachers`.`joining_date`,
		`teachers`.`leaving_date`,
		`teachers`.`profile_photo`,
		`teachers`.`about`,
		`teachers`.`is_active` AS status
		FROM `teachers`
		INNER JOIN `designations` ON `teachers`.designation_id = `designations`.designation_id
		INNER JOIN `genders` ON `teachers`.gender_id = `genders`.gender_id
		INNER JOIN `religions` ON `teachers`.`religion_id` = `religions`.`religion_id`
		ORDER BY `teachers`.teacher_id DESC";
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
	
	function GetDesignationList(){
		$sql = "SELECT * FROM `designations` ORDER BY `designation_id` ASC";
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
	
	function SaveTeacherInfo($teacher_id, $data)
	{		
		if($teacher_id > 0)
		{
			$this->db->where('teacher_id', $teacher_id);
			$query = $this->db->update('teachers',$data);
		}
		else 
		{
			$query=$this->db->insert('teachers', $data);
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