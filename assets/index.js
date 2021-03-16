const filterAction=document.querySelector(".filtt");
const filters=document.querySelector(".filters");
const topImg=document.querySelector("#top-img");
const topp=document.querySelector(".top");


const cityIds=[2267057,2950159,2511174,3067696,2515271,2268563,665087,745044,6356055,498817,681291,862995,2643743,2735943,2267827,3117735,611717,792680,2673730,2267226,683506,524894,3186886,625144,3054643,3372783,3196359,669737,456172,726051,6362115,2512989,588335,2759794,2886241,733462,593116,756135,7531890,727012,670059,703448,702550,732770,2867714,2968815,2562501,2650225,616052,3078610,2519217,3191648,6361046,2761369,2657832,3190261,2755251,680962,6692263,146214,3171728,2911298,2964574,2264456,3191281,2618425,2648579,2655603,323776,3182350,658225,680962,3083829,2742611,2800866,2644668,2268339,728193,2751773,3081368,3247449,3088171,7290400,3055535,618426,2935022,2521978,3186952,2641673,2644210,3094802,3143244,3170647,2742032,2825297,264371,2643123,3193935,2990969,2512186,2747891,2656173,3204509,3204541,2745912,3183875,2653941,3060972,324190,587084,2972315,3176219,2964179,2654675,2645425,615532,6359472,2523920,3203104,614455,2912618,2655095,2692969,325361,2641170,2965140,3124967,6357216,2514169,2879139,5695743,2895044,680332,2652221,633679,2644688,2902767,3165243,146384,655194,3201047,3199180,3176959,2951839,2778067,2657895,542420,3014728,634964,698740,3333184,3114472,2949188,314829,2521570,3202825,598098,2892794,7533560,146268,2661552,2944387,865084,2646458,3337388,323784,2649808,3319179,2655984,2643339,3133881,2637487,3110044,554234,2750053,785842,2766823,2654710,3119841,3182650,2638077,520555,146400,2983990,2910831,2637891,675810,2747373,706483,8133781,2973783,8133841,2756253,2653822,320995,7532474,3163392,5100144,2892518,479123,2929567,2792482,2640729,2934246,3181927,2516479,2992166,787657,554840,2938913,2998324,8133690,2624886,2995469,2740637,491422,2996944,472757,2775220,638936,479561,2641181,498677,2935517,2743478,2633352,3183130,3096472,3194360,311044,8133762,2751792,643493,3031582,598316,2653261,499099,6458783,3169361,2517117,2411585,3028808,3161732,516436,2821164,1508291,2510599,1486209,3197538,6418539,3064673,2751738,3194828,2990440,2639996,2747599,306571,765876,3128026,2661604,2516336,254352,3189077,2907911,3041563,3133895,551487,660158,2611396,8133832,518970,2659836,2993458,2758401,3042091,750268,750269,3165185,3169070,709930,2803139,2641430,2759661,2746301,3177090,3165201,2744042,3174530,3162955,786714,2755003,2756987,3032797,3173331,2960316,2659994,3337388,2746383,3166548,7287240,2660253,3037543,3021372,2525473,3035681,703845,257056,2982652,501175,3027301,3172629,6691831,3164603,3173435,3164527,707471,3038334,3172394,3165524];

//Constants
const imagee=["pexels-flo-dahm-699466.jpg", "pexels-josh-hild-2422259.jpg", "pexels-kai-pilger-547494.jpg", "pexels-oleg-magni-1837591.jpg", "pexels-pixabay-460672.jpg", "pexels-pixabay-532263.jpg"];

const apiKey="eeec14d2182b776ece4aaf9e924f849a";
const weather=`api.openweathermap.org/data/2.5/group?lat=54.5260&lon=15.2551&appid=${apiKey}`;
const group=`http://api.openweathermap.org/data/2.5/group?id=${cityIds}&units=metric&appid=${apiKey}`

let allWeather=[];
let corona=[];





twenty();
imgChanger();
let shown=false;
filterAction.addEventListener("click", function(e){
    
    console.log("clicked")
        if(shown===false){
            filters.style.display="flex";
            filterAction.textContent="Hide";
            filters.style.animationName="show";
            
            shown=true;
        }else{
            filters.style.animationName="hidden";
            filterAction.textContent="Filters";
           
            shown=false;
        }
    
    
}
)

function imgChanger(){
    let count=1;
setInterval(()=>{
    topp.removeChild(document.querySelector("#top-img"));
    count=count%(imagee.length);
    
    let url=`assets/top-images/${imagee[count]}`;
    
    let newImg=document.createElement("img");
    newImg.setAttribute("src", url);
    newImg.setAttribute("id", "top-img")
    
    topp.appendChild(newImg);
    count++;
}, 4000)
}



let list = document.querySelectorAll("li");




function twenty(){
    let arr=[];
    while(cityIds.length!==0){
                
        if(cityIds.length<20){
            arr=cityIds.splice(0, cityIds.length);
        }else{
            arr=cityIds.splice(0, 20)
        }
        let joined=arr.join(",");
        
    
       
    fetch(`http://api.openweathermap.org/data/2.5/group?id=${joined}&units=metric&appid=${apiKey}`)
    .then(res=>{
        let response=res.json();
        return response;
    })
    .then(ress=>{
        allWeather.push(...ress.list);
        if(allWeather.length>=cityIds.length){
            for(let i=0; i<=allWeather.length; i++){
                Array.from(list).forEach(data=>{
                                
                if(data.dataset.slug.toLowerCase()===allWeather[i].name.toLowerCase()){
                    let time=new Date(allWeather[i].dt * 1000);
                    let temp=Math.round(allWeather[i].main.temp);
                    let weath=allWeather[i].weather[0].description;
                    console.log(temp)
                    
                                    
                    let formatter=new Intl.NumberFormat();
                                    
                    let newImg=document.createElement("img");
                    newImg.setAttribute("alt", weath);
                    newImg.setAttribute("title", weath);
                    newImg.setAttribute("src", `http://openweathermap.org/img/w/${allWeather[i].weather[0].icon}.png`);
                                    
                    data.querySelector(".corona").innerText=`${time.getHours()}:${time.getMinutes()}`;
                    data.querySelector(".temperature").innerText=`${temp}°C`;

                    
                    if(!data.querySelector(".weather").hasChildNodes()){
                        data.querySelector(".weather").appendChild(newImg);
                    }
                                
                    //console.log(data.dataset.slug, allWeather[i].name, data.dataset.slug.toLowerCase()===allWeather[i].name.toLowerCase())
                    // return data.dataset.slug.toLowerCase()===allWeather[i].name.toLowerCase();
                               
                }

            })
        }
        return 
    }
                    
})
.catch(err=>{
    console.log("an error occured")
    console.log(err);
    return
                    
    })
}
                
}




function compare(data){


}