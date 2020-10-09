<?php class Custdatabase extends CI_Model {
	function __construct(){
		//parent::Model();
		$this->load->database();
	}
function update($searchXML=''){	
		$xmlInput = simplexml_load_string($searchXML);
		
		$tableName = $xmlInput->xpath('/query/table');
		$tableName = $tableName[0];
				
		$fielddata = $xmlInput->xpath('/query/data');
		$fielddata = $fielddata[0];
		
		$where = $xmlInput->xpath('/query/where');
		$where = $where[0];
		
		$xmlInput = simplexml_load_string($searchXML);
		
	 	$updateArray = '';
		if($fielddata){
			foreach ($fielddata as $member=>$data){
				if($data!=''){
					$updateArray[$member] = str_replace('"', '', $data);
				} 	
			}
		}
		
		if($where){
			foreach ($where as $member=>$data){
				$data=str_replace('"', '',$data);	
				if($member==='password'){
						$data = md5($data);
					}
					if($data['cond']=='NORLIKE'){
						$this->db->or_not_like($member,$data);
					}elseif($data['cond']=='OR'){
						$this->db->or_where($member,$data);
					}elseif($data['cond']=='LIKE'){
						$this->db->like($member,$data);		 		
					}elseif($data['cond']=='ORLIKE'){
						$this->db->or_like($member,$data);
					}elseif($data['cond']=='NOTLIKE'){
						$this->db->not_like($member,$data);
					}else{		 		
						$this->db->where($member,$data);
					} 	
			}			
		}
		
		$res = $this->db->update($tableName, $updateArray);
		
		if($res){
			return $res;
		}else return false;
	}

function delete($searchXML=''){	
		$xmlInput = simplexml_load_string($searchXML);
		
		$tableName = $xmlInput->xpath('/query/table');
		$tableName = $tableName[0];
				
		$where = $xmlInput->xpath('/query/where');
		$where = $where[0];
		
		$xmlInput = simplexml_load_string($searchXML);
	 	
		if($where){
			foreach ($where as $member=>$data){
				$data=str_replace('"', '',$data);	
					if($data['cond']=='NORLIKE'){
						$this->db->or_not_like($member,$data);
					}elseif($data['cond']=='OR'){
						$this->db->or_where($member,$data);
					}elseif($data['cond']=='LIKE'){
						$this->db->like($member,$data);		 		
					}elseif($data['cond']=='ORLIKE'){
						$this->db->or_like($member,$data);
					}elseif($data['cond']=='NOTLIKE'){
						$this->db->not_like($member,$data);
					}else{		 		
						$this->db->where($member,$data);
					} 	
			}			
		}
		
		$res = $this->db->delete($tableName);
		if($res){
			return $res;
		}else return false;
	}	

function insert($searchXML=''){	
	$xmlInput = simplexml_load_string($searchXML);
		
		$tableName = $xmlInput->xpath('/query/table');
		$tableName = $tableName[0];
				
		$fielddata = $xmlInput->xpath('/query/data');
		$fielddata = $fielddata[0];
		
		$xmlInput = simplexml_load_string($searchXML);
		
	 	$updateArray = '';
		if($fielddata){
			foreach ($fielddata as $member=>$data){
				if($data!=''){
					$updateArray[$member] = str_replace('"', '', $data);
				} 	
			}
		}

		$res = $this->db->insert($tableName, $updateArray);	
		if($res){
			return  $this->db->insert_id();
		}else return false;
	}

function select($searchXML=''){
		$xmlInput = simplexml_load_string($searchXML);
		
		$tableName = $xmlInput->xpath('/query/table');
		$tableName = $tableName[0];
				
		$where = $xmlInput->xpath('/query/where');
		$where = $where[0];
		
		$orderby = $xmlInput->xpath('/query/orderby');
		$orderby = $orderby[0];
		if($where){
			foreach ($where as $member=>$data){
				$data=str_replace('"', '',$data);	
				if($member==='password'){
						$data = md5($data);
					}
					if($data['cond']=='NORLIKE'){
						$this->db->or_not_like($member,$data);
					}elseif($data['cond']=='OR'){
						$this->db->or_where($member,$data);
					}elseif($data['cond']=='LIKE'){
						$this->db->like($member,$data);		 		
					}elseif($data['cond']=='ORLIKE'){
						$this->db->or_like($member,$data);
					}elseif($data['cond']=='NOTLIKE'){
						$this->db->not_like($member,$data);
					}else{		 		
						$this->db->where($member,$data);
					} 	
			}			
		}
		
		if($orderby){
			foreach ($orderby as $member=>$data){
				$data=str_replace('"', '',$data);	
				$this->db->order_by($member, $data);		
			}			
		}
	
		$query=$this->db->get("$tableName");
		$res = $query->result();
		if($res){
		$resArray = $this->objectToArray($res);
		$memberXML =  $this->arrayToXml($resArray,$tableName);
		
		return $memberXML;	
		}else{
			return FALSE;
		}
	}
	
function objectToArray($obj) 
{
		$arr=array();
        $arrObj = is_object($obj) ? get_object_vars($obj) : $obj;
        foreach ($arrObj as $key => $val) {
                $val = (is_array($val) || is_object($val)) ? $this->objectToArray($val) : $val;
                $arr[$key] = $val;
        }
        return $arr;
	}

function arrayToXml($data, $rootNodeName = 'Parent', $headerXml=null)
	{
		// turn off compatibility mode as simple xml throws a wobbly if you don't.
		if (ini_get('zend.ze1_compatibility_mode') == 1)
		{
			ini_set ('zend.ze1_compatibility_mode', 0);
		}
 
		if ($headerXml == null)
		{
		/*	
		 $headerXml = simplexml_load_string("<?xml version='1.0' encoding='utf-8'?><$rootNodeName />");
		*/
			
		$headerXml = simplexml_load_string("<$rootNodeName />");
			
		}
 
		// loop through the data passed in.
		foreach($data as $key => $value)
		{
			
			// no numeric keys in our xml please!
			if (is_numeric($key))
			{
				// make string key...
				
				$key = "Row_". (string) $key;
				
				// $key = "";
			}
 
			// replace anything not alpha numeric
			$key = preg_replace('/[^a-z]/i', '', $key);
 
			// if there is another array found recrusively call this function
			if (is_array($value))
			{
			//	echo '&nbsp;&nbsp;&nbsp;'.$key.'<br />';
				$node = $headerXml->addChild($key);
				// recrusive call.
				$this->arrayToXml($value, $rootNodeName, $node);
			}
			else 
			{
				// add single node.
				// echo '&nbsp;&nbsp;&nbsp;'.$key.'--'.$value.'<br />';
                $value = htmlentities($value);
				$headerXml->addChild($key,$value);
			}
 
		}
		
		// pass back as string. or simple xml object if you want!
		return $headerXml->asXML();
	}

function custAppendXML($parentXML='', $childXML='', $node){
		
		if($node == '') return false;
		//echo '<pre>', htmlspecialchars($parentXML), '</pre>';
		$node = explode('/',$node);
		// $xmldict = new SimpleXMLElement($parentXML);
		//$xmldict = new SimpleXMLElement('<Usertype><Row><id>1</id></Row></Usertype>');
		//$xmldict = new SimpleXMLElement('<dictionary><a/><b/><c/></dictionary>');
		//$kitty   = new SimpleXMLElement('<cat><sound>meow</sound><texture>fuzzy</texture></cat>');
		
		$xmldict = new SimpleXMLElement($parentXML);
		$kitty   = new SimpleXMLElement($childXML);
		
		// Create new DOMElements from the two SimpleXMLElements
	    
		$nodeSize = sizeof($node);
		
		switch($nodeSize){
			case 5:
				$domdict = dom_import_simplexml($xmldict->$node[0]->$node[1]->$node[2]->$node[3]->$node[4]);
				break;
			case 4:
				$domdict = dom_import_simplexml($xmldict->$node[0]->$node[1]->$node[2]->$node[3]);
				break;
			case 3:
				$domdict = dom_import_simplexml($xmldict->$node[0]->$node[1]->$node[2]);
				break;
			case 2:
				$domdict = dom_import_simplexml($xmldict->$node[0]->$node[1]);
				break;
			default:
				$domdict = dom_import_simplexml($xmldict->$node[0]);
				break;
		}
		
		
		//$domdict = dom_import_simplexml($xmldict->Row);
		//$domdict = dom_import_simplexml($xmldict->c);
		//$domdict = dom_import_simplexml($xmldict->Row);
		$domcat  = dom_import_simplexml($kitty);
		
		// Import the <cat> into the dictionary document
		$domcat  = $domdict->ownerDocument->importNode($domcat, TRUE);
		
		// Append the <cat> to <c> in the dictionary
		$domdict->appendChild($domcat);
		
		// We can still use SimpleXML! (meow)
		// echo '<pre>'.htmlspecialchars($parentXML).'</pre>';
		// echo 'Sound: '.$xmldict->Row->cat->sound;
		 
		 $resArray = $this->objectToArray($xmldict);
		 $memberXML =  $this->arrayToXml($resArray);
		
		 return $memberXML;
		// echo $xmldict->c->cat->sound;
		// return $xmldict;		
	}
}
?>