<?php 

class Subjectmodel extends CI_Model {
	function __construct(){
		//parent::Model();	
		$this->load->model('myxml');
	}
	
	// get exam list from exam table
	function GetSubjectList()
	{
		$sql = "SELECT 
		subjects.subject_id, 
		subjects.subject_name, 
		subjects.subject_code, 
		subjects.class_id, 
		subjects.section_id, 
		subjects.is_optional, 
		classes.class_name, 
		sections.section_name 
		FROM subjects 
		INNER JOIN classes ON subjects.class_id = classes.class_id 
		INNER JOIN sections ON subjects.section_id = sections.section_id ";
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
	
	function SaveSubject($subject_id, $subject_name, $subject_code, $class_id, $section_id, $is_optional)
	{
		$dataArray = array(
	        'subject_name' => $subject_name,
	        'subject_code' => $subject_code,
		    'class_id' => $class_id,
		    'section_id' => $section_id,
		    'is_optional' => $is_optional
		);
		
		if($subject_id > 0)
		{
			$this->db->where('subject_id', $subject_id);
			$query = $this->db->update('subjects',$dataArray);
		}
		else 
		{
			$query=$this->db->insert('subjects', $dataArray);
		}
		if($query)
			return true;
		else
			return false;		
	}	
}
?>