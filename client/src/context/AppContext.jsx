import {createContext, useEffect} from 'react';
import { useState } from 'react';
import { dummyCourses } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import humanizeDuration from 'humanize-duration';


export const AppContext = createContext();

export const AppContextProvider = (props) => {

const currency= import.meta.env.VITE_CURRENCY
const navigate= useNavigate()

const [allCourses, setallCourses]= useState([])
const [isEducator, setIsEducator]= useState(true)
const[enrolledCourses, setEnrolledCourses]= useState([])

//fetch all courses
const fetchAllCourses = async () => {
    setallCourses(dummyCourses);
}
//function to calculate avg ratoimg of a course
const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {
        return 0;}
    let totalRating = 0;
    course.courseRatings.forEach(rating => {
        totalRating += rating.rating;
    });
    return (totalRating / course.courseRatings.length);

}

//function to calc course chapter time
const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture) => time+= lecture.lectureDuration);
    return humanizeDuration(time * 60 * 1000, {units: ['h', 'm']});
    
}

//function to calculate the course duration
const calculateCourseDuration = (course)=> {
    let time=0 

    course.courseContent.map((chapter) => chapter.chapterContent.map(
        (lecture)=> time+= lecture.lectureDuration
    ))
    return humanizeDuration(time * 60 * 1000, {units: ['h', 'm']});
}

//total lectures in a course
const calculateTotalNoOfLectures = (course) => {
    let totalLectures= 0;
    course.courseContent.forEach(chapter => {
        if (Array.isArray(chapter.chapterContent)) {
            totalLectures += chapter.chapterContent.length;
        } 
          
    })
    return totalLectures;
}

//fetch user enrolled courses
const fetchUserEnrolledCourses = async () => {
    
    setEnrolledCourses(dummyCourses)
}

useEffect(() => {
    fetchAllCourses();
    fetchUserEnrolledCourses();
}, []);

    const value = {
       currency, allCourses,navigate,calculateRating,
         isEducator, setIsEducator, calculateChapterTime, calculateCourseDuration, calculateTotalNoOfLectures,enrolledCourses,fetchUserEnrolledCourses
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
