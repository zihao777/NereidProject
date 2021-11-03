package edu.wpi.cs.zzhou5.demo.db;

import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import edu.wpi.cs.zzhou5.demo.model.Classification;
import edu.wpi.cs.zzhou5.demo.db.DatabaseUtil;

public class ClassificationsDAO {
	
	java.sql.Connection conn;
	
	final String tblName = "Classifications";   // Exact capitalization

	public ClassificationsDAO() {
		try  {
    		conn = DatabaseUtil.connect();
    	} catch (Exception e) {
    		conn = null;
    	}	
	}
	
	public Classification  getClassification(String name) throws Exception {
        
        try {
        	Classification c = null;
            PreparedStatement ps = conn.prepareStatement("SELECT * FROM " + tblName + " WHERE name=?;");
            ps.setString(1,  name);
            ResultSet resultSet = ps.executeQuery();
            
            while (resultSet.next()) {
                c = generateClassification(resultSet);
            }
            resultSet.close();
            ps.close();
            
            return c;

        } catch (Exception e) {
        	e.printStackTrace();
            throw new Exception("Failed in getting user: " + e.getMessage());
        }
    }
	
	public boolean addClassification(Classification c) throws Exception {
        try {
            PreparedStatement ps = conn.prepareStatement("SELECT * FROM " + tblName + " WHERE name = ?;");
            ps.setString(1, c.name);
            ResultSet resultSet = ps.executeQuery();
            
            // already present?
            while (resultSet.next()) {
//                User c = generateUser(resultSet);
                resultSet.close();
                return false;
            }

            ps = conn.prepareStatement("INSERT INTO " + tblName + " (name,childrenID,level) values(?,?,?);");
            ps.setString(1,  c.name);
            String var= "";
            System.out.println(c.childrenID);
            if(c.childrenID == null) {
            	var = "";
            }
            else if(c.childrenID.length == 1) {
            	var  = var + c.childrenID[0];
            }else if(c.childrenID.length > 1) {
            	var  = var + c.childrenID[0];
            	for(int i = 1; i<c.childrenID.length;i++ ) {
            		var = var + "," + c.childrenID[i];
            	}
            }
            ps.setString(2,  var);
            ps.setInt(3,  c.level);
            ps.execute();
            
            ps = conn.prepareStatement("SELECT LAST_INSERT_ID();");
            resultSet = ps.executeQuery();
            resultSet.next();
            int childID = resultSet.getInt("LAST_INSERT_ID()");
            
            ps = conn.prepareStatement("SELECT * FROM " + tblName + " WHERE id = ?;");
            ps.setInt(1, c.fatherID);
            resultSet = ps.executeQuery();
            resultSet.next();
            
            String var1 = resultSet.getString("childrenID");
            if(var1.equals("")) {
            	var1 = Integer.toString(childID);
            }else {
            	var1 = var1 + ","+ childID;
            }
            ps = conn.prepareStatement("UPDATE "+ tblName+ " SET childrenID= \""+ var1 +"\" WHERE id ="+c.fatherID+";");
            ps.execute();
            return true;
        } catch (Exception e) {
            throw new Exception("Failed to insert classification: " + e.getMessage());
        }
    }
	
	public List<Classification> getAllClassifications() throws Exception{
		List<Classification> allClassifications = new ArrayList<>();
		try {
			Statement statement = conn.createStatement();
            String query = "SELECT * FROM " + tblName + ";";
            ResultSet resultSet = statement.executeQuery(query);

            while (resultSet.next()) {
                Classification c = generateClassification(resultSet);
                allClassifications.add(c);
            }
            resultSet.close();
            statement.close();
            return allClassifications;
		}catch(Exception e) {
			throw new Exception("Failed in getting classifications: " + e.getMessage());
		}
	}
	
	public Map<String, Classification> getClassificationsHierarchy() throws Exception{
		Map<String, Classification> map = new HashMap<>();
		try {
			Statement statement1 = conn.createStatement();
            String query = "SELECT * FROM " + tblName + " WHERE level = 0 ;";
            ResultSet resultSet1 = statement1.executeQuery(query);
            while(resultSet1.next()) {
            	Classification c = generateClassification(resultSet1);
            	buildTree(c);
            	String key = Integer.toString(c.id);
            	map.put(key,c);
            }
            
//            int levels = resultSet1.getInt("max(level)")+1;
//            for(int i = 0 ; i<levels ; i ++ ) {
//                query = "SELECT * FROM " + tblName + " WHERE level =" + i;
//                resultSet1 = statement1.executeQuery(query);
//                while(resultSet1.next()) {
//                	 Classification c = generateClassification(resultSet1);
//                	 String key = Integer.toString(c.id);
//                	 for(int k = 0; k< c.childrenID.length ; k ++) {
//                		 Statement statement2 = conn.createStatement();
//                		 String query2 = "SELECT * FROM " + tblName + " WHERE id =" + c.childrenID[k];
//                		 ResultSet resultSet2 = statement2.executeQuery(query2);
//                		 while(resultSet2.next()) {
//                			 Classification c2 = generateClassification(resultSet2);
//                			 String key2 = Integer.toString(c2.id);
//                			 c.childern.put(key2, c2);
//                		 }
//                		 resultSet2.close();
//                         statement2.close();
//                	 }
//                	 map.put(key,c);	 
//                }
//            }
            resultSet1.close();
            statement1.close();
            return map;
		}catch(Exception e) {
			throw new Exception("Failed in getting classifications: " + e.getMessage());
		}
	}
	
	private Classification generateClassification(ResultSet resultSet) throws Exception {
        String name  = resultSet.getString("name");
        int id  = resultSet.getInt("id");
        String childrenID = resultSet.getString("childrenID");
        int level = resultSet.getInt("level");
        int[] arr2 = null;
        if(!childrenID.equals("")) {
        	String[] arr1 = childrenID.split(",");
            arr2 = new int[arr1.length];
            for(int i = 0; i< arr1.length ; i++) {
            	arr2[i] = Integer.parseInt(arr1[i]);
            }
        }
        return new Classification (name,id,arr2,level);
    }
	private void buildTree(Classification c) throws Exception{
		if(c.childrenID == null) {
			return;
		}else {
			for(int k = 0; k< c.childrenID.length ; k ++) {
           		Statement statement2 = conn.createStatement();
           		String query2 = "SELECT * FROM " + tblName + " WHERE id =" + c.childrenID[k] + ";";
           		ResultSet resultSet2 = statement2.executeQuery(query2);
           		while(resultSet2.next()) {
           			Classification c2 = generateClassification(resultSet2);
           			String key2 = Integer.toString(c2.id);
           			buildTree(c2);
           			c.childern.put(key2, c2);
           		}
           		resultSet2.close();
                statement2.close();
           	}
			return;
		}
	}
}
