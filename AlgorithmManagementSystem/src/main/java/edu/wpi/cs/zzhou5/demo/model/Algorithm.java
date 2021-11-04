package edu.wpi.cs.zzhou5.demo.model;

public class Algorithm {
	public String name;
	public String description;
	public int id;
	public int classification;
	
	public Algorithm(String name,int classification) {
		this.name = name;
		this.classification = classification;
		this.id = -1;
	}
	
	public Algorithm(String name,int classification,String description) {
		this.name = name;
		this.classification = classification;
		this.description = description;
		this.id = -1;
	}
	
	public Algorithm(String name,int classification,String description,int id) {
		this.name = name;
		this.classification = classification;
		this.description = description;
		this.id = id;
	}
	
}
