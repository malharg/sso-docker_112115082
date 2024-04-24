import {Schema} from "mongoose";

interface IJob{
    // job ID -----> Check
    title: string,
    desc: string,
    date_posted: Date, //check this
    date_expire: Date,
    responsibility: string,
    skills: [string],
    salary: number,
    location: string,
    address: string, //check
    active: boolean,
    openings: number,
    category: [string],
    min_hours: number,
    type: string, //check this -> Part-Time/Full
    employer_id: number, //check this
    workers_applied: [number] //check
    workers_selected: [number] //check

}