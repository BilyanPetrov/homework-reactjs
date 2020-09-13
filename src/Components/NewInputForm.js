import React, {useState, useEffect} from 'react';
import './NewInputForm.css';

const NewInputForm = () => {

    const [input, setInput] = useState('');
    const [data, setData] = useState({'main':{'temp' : ''}});
    const [submited, setSubmited] = useState("not"); 
    const [readyToRender, setReadyToRender] = useState(false);
    const [isFetched, setFetched] = useState(false);

    useEffect(() => {
      if(!(submited=="not")){ //to prevent useEffect from rendering on first enter in page
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=2008e3c277656a5a4a5f658976c07e50`)
        .then((response) => response.json())
        .then((json) =>{ 
          if(!(typeof json.cod == "string")){
            setData(json);
          }
          else{
            setData({'main':{'temp' : ''}});
          }
          setFetched(true);  
        })
        setReadyToRender(true);
        setSubmited("not");
      }
    }, [submited])
    const handleSubmit = (e) => {
      e.preventDefault();
      setSubmited("submited");
    }
    return(
        <div>
            <form className="submitForm" onSubmit ={handleSubmit}>
                <input type="text" value={input} required onChange={(e) => setInput(e.target.value)}></input>
                <button type="submit" >Submit</button>
            </form>
            <div className="output">
            {(() => {
                if(readyToRender){
                  if(data.main.temp != ''){
                    return <div className="valid">The temperature is {data.main.temp} °Kelvin"</div>;
                  }
                  else 
                    return <div className="invalid">Invalid input</div>;
                }
              })()}
            </div>
        </div>
    );
  
  }

export default NewInputForm;