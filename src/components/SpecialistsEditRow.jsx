import React , {useState, useRef, useEffect} from 'react'
import axios from 'axios';

const UPDATE_PIC_API_URL = "http://localhost:8080/api/v1/admin/specialist/pic/"
const UPDATE_NAME_API_URL = "http://localhost:8080/api/v1/admin/specialist/name/"
const UPDATE_INFO_API_URL = "http://localhost:8080/api/v1/admin/specialist/info/"


export const SpecialistsEditRow = ({specialist, handleDeleteClick, handleСancelСlick, handleAddClick}) => {
    const fileInputRef = useRef(null);
    const [fileSource, setFileSource] = useState('');


    const [specialistName, setSpecialistName] = useState('');
    const [info, setInfo] = useState('');

  

    const [isEditable, setIsEditable] = useState(false);

    const handleEditClick = () => {
        setIsEditable(true);
    };


    const handleSaveClick = () => {
        setIsEditable(false);

        const token =  localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        };


        if(specialist){
            const formData = new FormData();
            const file = fileInputRef.current.files[0];
            formData.append('file', file);
           
        
            axios.put(`${UPDATE_PIC_API_URL}${specialist.id}`, formData, {headers})
            .then(response => {
              // Handle success
                alert(response.data.message)
            })
            .catch(error => {
              // Handle error
              console.error(error);
            });
    
            const formData2 = new FormData();
            
            formData2.append('name', specialistName );
    
            axios.put(`${UPDATE_NAME_API_URL}${specialist.id}`, formData2, {headers})
            .then(response => {
              // Handle success
                alert(response.data.message)
            })
            .catch(error => {
              // Handle error
              console.error(error);
            });
            const formData3 = new FormData();
            formData3.append('info', info );
    
            axios.put(`${UPDATE_INFO_API_URL}${specialist.id}`, formData3, {headers})
            .then(response => {
              // Handle success
                alert(response.data.message)
            })
            .catch(error => {
              // Handle error
              console.error(error);
            });
        } else{
            const formData = new FormData();
            const file = fileInputRef.current.files[0];
            formData.append('file', file);
            formData.append('name', specialistName)
            formData.append('info', info)

            handleAddClick(formData);
        }
       



    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
          const source = e.target.result;
          setFileSource(source);
        };

        reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    fileInputRef.current.value = null;
    setFileSource('');
  };

 const searchSpecialist = ()=>{
    if(specialist){
        setSpecialistName(specialist.name)
        setInfo(specialist.info)
        if (specialist.filename) {
          setFileSource("http://localhost:8080/api/v1/public/info/specialists/pic/" + specialist.filename);
          fileInputRef.current.value = ""; // Очистка значения file input
        }
    }
    else{
        setIsEditable(true)
    }
 }

  useEffect(searchSpecialist, [specialist]);

  return (

    <>
        <td>
            <div>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} disabled={!isEditable} />
                {fileSource && (
                <>
                    <div className='editimgdiv'>
                        <img src={fileSource} alt="Selected File" />
                    </div>
                    {
                        !specialist &&
                        <button  onClick={handleRemoveFile} disabled={!isEditable}>Удалить картинку</button>
                    }
                </>
                 )}
            </div>
        </td>
        <td>
            <input type="text" disabled={!isEditable} value={specialistName}    onChange={(e) => setSpecialistName(e.target.value)}/>
        </td>
        <td>
            <input type="text" disabled={!isEditable} value={info}    onChange={(e) => setInfo(e.target.value)}/>
        </td>
        <td>
           

            {
                isEditable ?
                (
                    <button onClick={handleSaveClick}>
                     {specialist? "Сохранить" : "Добавить"}
                    </button>
                ):(
                    <button onClick={handleEditClick} disabled={isEditable}>
                     Редактировать
                    </button>
                )
                
            }
        </td>

        <td>
            {
                specialist ?
                (
                    <button onClick={()=> handleDeleteClick(specialist.id)}>
                        Удалить
                    </button>
                ):(
                    <button onClick={()=> handleСancelСlick()}>
                        Отмена
                    </button>
                )


               
            }
        </td>
    </>

    
  );
}