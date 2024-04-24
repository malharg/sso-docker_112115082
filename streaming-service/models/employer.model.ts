import mongoose from "mongoose";

export interface IEmployer{
    // employer_id --> check this
    name: string,
    email: string,
    password: string,
    skills: [string],
    location: string,
    address: string, //check
    available: boolean,
    industry: [string],
    experience: number,
    languages: [string],
    education: string
    type: string, //check this -> Part-Time/Full
    jobs_applied: [number] //check
    jobs_shortlisted: [number] //check
    acc_type: string

}