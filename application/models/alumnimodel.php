<?php 

class Alumnimodel extends CI_Model {
	function __construct(){
		//parent::Model();	
		$this->load->model('myxml');
	}
	
	function GetAlumniSummary()
	{
		$sql = "SELECT 
		`alumni_register`.`passing_year`, 
		count(*) AS `total_alumni` 
		FROM `alumni_register`
		GROUP BY `alumni_register`.`passing_year`
		ORDER BY `alumni_register`.`passing_year` ASC";
		$result=$this->db->query($sql)->result();
		return $result;		
	}
	
	function GetAlumniList()
	{
		$sql = "SELECT `alumni_register`.*, `genders`.`gender_name` 
		FROM `alumni_register` INNER JOIN `genders` ON `alumni_register`.gender_id = `genders`.gender_id 
		ORDER BY `alumni_register`.`register_id` DESC ";
		$result=$this->db->query($sql)->result();
		return $result;		
	}
	
	function GetGenderList(){
		$sql = 'SELECT * FROM `genders` ORDER BY `genders`.`gender_id`  ASC';
		$result=$this->db->query($sql)->result();
		return $result;	
	}
		
	function SaveAlumniInfo($register_id, $data)
	{
		if($register_id > 0)
		{
			$this->db->where('register_id', $register_id);
			$query = $this->db->update('alumni_register',$data);
		}
		else 
		{
			$query=$this->db->insert('alumni_register', $data);
		}
		if($query)
			return true;
		else
			return $query;		
	}
	
	// get teacher records
	function GetTeacherList()
	{
		$sql = "SELECT * FROM `teachers` ORDER BY teacher_id DESC";
		$result=$this->db->query($sql)->result();
		if(count($result) > 0)
			return $result;	
		return false;	
	}
	
}
?>