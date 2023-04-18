const curDate = document.getElementById("date");

const getcurrentDay = () =>{
    var weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tues";
    weekday[3] = "Wed";
    weekday[4] = "Thur";
    weekday[5] = "Fri";
    weekday[6] = "Sat";
    let currentTime = new Date();
    let day = weekday[currentTime.getDay()];
    return day;
};
                        
const getcurrentTime = () =>{
    var now = new Date();

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];                
                                
    var month = months[now.getMonth()];
    var date =now.getDate();
                                
    let hours = now.getHours();
    let mins = now.getMinutes();
    let periods="AM";

    if(hours>11){
        periods="PM";
    }
    if(hours>12){
        hours -= 12;
    }
    
    if(hours<10){
        hours="0"+hours;
    }
    if(mins<10){
        mins = "0"+mins;
    }
    return `${month} ${date} | ${hours}:${mins}${periods}`;
};
curDate.innerHTML = getcurrentDay() +" | "+ getcurrentTime();