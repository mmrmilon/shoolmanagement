<?php 

class Eventmodel extends CI_Model {
	function __construct(){
		//parent::Model();	
		$this->load->model('myxml');
	}
		
	function GetEventList(){
		$sql = "SELECT 
		`events`.*,
		YEAR(`events`.`start_date`) AS event_year, 
		DATE_FORMAT(events.start_date, '%b') AS event_month, 
		DAYOFMONTH(`events`.`start_date`) AS event_day 
		FROM `events`
		ORDER BY `events`.`event_id` DESC";
		$result=$this->db->query($sql)->result();
		return $result;	
	}
	
	function GetTopFiveEvent(){
		$sql = "SELECT 
		`events`.*,
		YEAR(`events`.`start_date`) AS event_year, 
		DATE_FORMAT(events.start_date, '%b') AS event_month, 
		DAYOFMONTH(`events`.`start_date`) AS event_day 
		FROM `events`
		ORDER BY `events`.`event_id` DESC LIMIT 0, 5";
		$result=$this->db->query($sql)->result();
		return $result;	
	}
	
	function SaveEventInfo($event_id, $data)
	{
		if($event_id > 0)
		{
			$this->db->where('event_id', $event_id);
			$query = $this->db->update('events',$data);
		}
		else 
		{
			$query=$this->db->insert('events', $data);
		}
		if($query)
			return true;
		else
			return $query;		
	}
}
?>