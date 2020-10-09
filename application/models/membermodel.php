<?php 

class Membermodel extends CI_Model {
	function __construct(){
		//parent::Model();	
		$this->load->model('myxml');
	}
	
	// get login details by member id
	function getLoginDetails($member_id=0)
	{
		$this->db->select('m.*');
		$this->db->from('member m');
		$this->db->where('member_id',$member_id);
		return $this->db->get()->row();		
	}
	
	// get exam list from exam table
	function GetExamList()
	{
		$sql = "SELECT * FROM `exams` ORDER BY exam_year DESC";
		$result=$this->db->query($sql)->result();
		if(count($result) > 0)
			return $result;	
		return false;	
	}
	
	function SaveExamRecords($exam_id, $exam_name, $exam_type, $start_date, $end_date, $exam_year)
	{
		$dataArray = array(
		'exam_name' => $exam_name,
		'exam_type' => $exam_type,
		'start_date' => $start_date,
		'end_date' => $end_date,
		'exam_year' => $exam_year,
		);
		
		if($exam_id > 0)
		{
			$this->db->where('exam_id', $exam_id);
			$query = $this->db->update('exams',$dataArray);
		}
		else 
		{
			$query=$this->db->insert('exams', $dataArray);
		}
		if($query)
			return true;
		else
			return false;		
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