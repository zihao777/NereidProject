package edu.wpi.cs.zzhou5.demo.db;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import edu.wpi.cs.zzhou5.demo.model.Algorithm;
import edu.wpi.cs.zzhou5.demo.model.Implementation;

public class ImplementationsDAO {
	java.sql.Connection conn;
	
	final String tblName = "Implementations";   // Exact capitalization

	public ImplementationsDAO() {
		try  {
    		conn = DatabaseUtil.connect();
    	} catch (Exception e) {
    		conn = null;
    	}	
	}
	
	public boolean uploadImplementation(Implementation imple) throws Exception {
		try {
			PreparedStatement ps1 = conn.prepareStatement("SELECT * FROM Algorithms WHERE id=?;");
			ps1.setInt(1, imple.algorithm);
			ResultSet resultSet1 = ps1.executeQuery();
			if(!resultSet1.next()) {
				return false;
			}
			
			PreparedStatement ps = conn.prepareStatement("INSERT INTO " + tblName + " (language,content,algorithm) values(?,?,?);");
            ps.setString(1, imple.language);
            ps.setString(2, imple.content);
            ps.setInt(3, imple.algorithm);
            ps.execute();
            return true;
		}catch (Exception e) {
            throw new Exception("Failed to insert implementation: " + e.getMessage());
        }
	}
	
	private Implementation generateImplementation(ResultSet resultSet) throws Exception {
        String language  = resultSet.getString("language");
        String content = resultSet.getString("content");
        int id = resultSet.getInt("id");
        int algo = resultSet.getInt("algorithm");
        
        return new Implementation (language, content,id,algo);
    }
}
