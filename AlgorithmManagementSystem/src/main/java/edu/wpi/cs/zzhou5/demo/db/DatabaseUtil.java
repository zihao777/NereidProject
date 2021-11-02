package edu.wpi.cs.zzhou5.demo.db;

import java.sql.Connection;
import java.sql.DriverManager;

public class DatabaseUtil {
	
	public static String rdsMySqlDatabaseUrl;
	public static String dbUsername;
	public static String dbPassword;
	
	public final static String jdbcTag = "jdbc:mysql://";
	public final static String rdsMySqlDatabasePort = "3306";
	public final static String multiQueries = "?allowMultiQueries=true";
	   
	public final static String dbName = "sys";           // Whatever Schema you created in tutorial.
	public final static String testingName = "tmp";       // used for testing (also default created)
	
	static Connection conn;
	
	protected static Connection connect() throws Exception {
		if (conn != null) { return conn; }
		
		boolean useTestDB = System.getenv("TESTING") != null;
		
		// this is resistant to any SQL-injection attack since we choose one of two possible ones.
		String schemaName = dbName;
		if (useTestDB) { 
			schemaName = testingName;
			System.out.println("USE TEST DB:" + useTestDB);
		}
		
		dbUsername = System.getenv("dbUsername");
		if (dbUsername == null) {
			System.err.println("Environment variable dbUsername is not set!");
		}
		dbPassword = System.getenv("dbPassword");
		if (dbPassword == null) {
			System.err.println("Environment variable dbPassword is not set!");
		}
		rdsMySqlDatabaseUrl = System.getenv("rdsMySqlDatabaseUrl");
		if (rdsMySqlDatabaseUrl == null) {
			System.err.println("Environment variable rdsMySqlDatabaseUrl is not set!");
		}
		
		try {
			//System.out.println("start connecting......");
			Class.forName("com.mysql.cj.jdbc.Driver"); 
			conn = DriverManager.getConnection(
					jdbcTag + rdsMySqlDatabaseUrl + ":" + rdsMySqlDatabasePort + "/" + schemaName + multiQueries,
					dbUsername,
					dbPassword);
			//System.out.println("Database has been connected successfully.");
			return conn;
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new Exception("Failed in database connection");
		}
	}
}
