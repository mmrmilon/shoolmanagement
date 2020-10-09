<?php 

class Newsmodel extends CI_Model {
	function __construct(){
		//parent::Model();	
		$this->load->model('myxml');
	}
		
	function GetNewsList(){
		$sql = "SELECT 
		`news`.*,
		`member`.`user_role` AS posted_by
		FROM `news`
		INNER JOIN `member` ON `news`.`member_id` = `member`.`member_id`
		ORDER BY `news`.`news_id` DESC
		LIMIT 0, 15";
		$result=$this->db->query($sql)->result();
		return $result;	
	}
	
	function GetNewsDetailsById($news_id){
		$sql = "SELECT 
		`news`.*,
		`member`.`user_role` AS posted_by
		FROM `news`
		INNER JOIN `member` ON `news`.`member_id` = `member`.`member_id`
		WHERE `news`.`news_id` = ". $news_id ."
		ORDER BY `news`.`news_id` DESC";		
		$result=$this->db->query($sql);
		//return $result;
		return $result->row();
		if($result)
			return $result[0]->row();
		else 
			return $result;	
	}
	
	function GetTopFiveNews(){
		$sql = "SELECT 
		@s:=@s+1 AS serial_no,
		records.* 
		FROM 
		(
		    SELECT 
		    `news`.*,
		    `member`.`user_role` AS posted_by
		    FROM `news`
		    INNER JOIN `member` ON `news`.`member_id` = `member`.`member_id`
		    ORDER BY `news`.`news_id` DESC
		    LIMIT 0, 5
		) AS records, (SELECT @s:= 0) AS s";
		$result=$this->db->query($sql)->result();
		return $result;
	}
	
	function GetTopTenNews(){
		$sql = "SELECT 
		@s:=@s+1 AS serial_no,
		records.* 
		FROM 
		(
		    SELECT 
		    `news`.*,
		    `member`.`user_role` AS posted_by
		    FROM `news`
		    INNER JOIN `member` ON `news`.`member_id` = `member`.`member_id`
		    ORDER BY `news`.`news_id` DESC
		    LIMIT 0, 10
		) AS records, (SELECT @s:= 0) AS s";
		$result=$this->db->query($sql)->result();
		return $result;	
	}
	
	function SaveNews($news_id, $data)
	{
		if($news_id > 0)
		{
			$this->db->where('news_id', $news_id);
			$query = $this->db->update('news',$data);
		}
		else 
		{
			$query=$this->db->insert('news', $data);
		}
		if($query)
			return true;
		else
			return $query;		
	}
}
?>