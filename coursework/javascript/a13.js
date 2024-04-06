   
async function getData() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '084dd663c7mshd202ce2c00c367ap1a35f0jsn80275d51a87d',
            'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
        }
    };
    
        let response = await fetch('https://random-words5.p.rapidapi.com/getMultipleRandom?count=5', options)
        
        if (response.status == 200) {
            let result = await response.json();
            console.log(result)
            
            let main = document.querySelector("main")
            main.innerHTML = "here are 5 random words: " + 
                "<ul> <li>" + result[0] + "</li> <li>" + result[1] + "</li> <li>" + result[2] + 
                "</li> <li>" + result[3] + "</li> <li>" + result[4] + "</li> </ul>" +
                "<br> refresh for 5 more"
        }
        else {
            console.log(response.error)
        }
        
    }
    
    getData()
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '084dd663c7mshd202ce2c00c367ap1a35f0jsn80275d51a87d',
            'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
        }
    };
    
