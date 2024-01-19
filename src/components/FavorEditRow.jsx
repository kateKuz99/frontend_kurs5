import React , {useState, useRef, useEffect} from 'react'
import axios from 'axios';

const UPDATE_PIC_API_URL = "http://localhost:8080/api/v1/admin/favor/pic/"
const UPDATE_NAME_API_URL = "http://localhost:8080/api/v1/admin/favor/name/"
const UPDATE_PRICE_API_URL = "http://localhost:8080/api/v1/admin/favor/price/"



export const FavorEditRow = ({favor, handleDeleteClick, handleСancelСlick, handleAddClick}) => {
    const fileInputRef = useRef(null);
    const [fileSource, setFileSource] = useState('');


    const [favorName, setFavorName] = useState('');
    const [price, setPrice] = useState('');

  

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


        if(favor){
            const formData = new FormData();
            const file = fileInputRef.current.files[0];
            formData.append('file', file);
           
            

            axios.put(`${UPDATE_PIC_API_URL}${favor.id}`, formData, {headers})
            .then(response => {
              // Handle success
                alert(response.data.message)
            })
            .catch(error => {
              // Handle error
              console.error(error);
            });
    
            const formData2 = new FormData();
            
            formData2.append('name', favorName );
    
            axios.put(`${UPDATE_NAME_API_URL}${favor.id}`, formData2, {headers})
            .then(response => {
              // Handle success
                alert(response.data.message)
            })
            .catch(error => {
              // Handle error
              console.error(error);
            });
            const formData3 = new FormData();
            formData3.append('price', price );
    
            axios.put(`${UPDATE_PRICE_API_URL}${favor.id}`, formData3, {headers})
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
            formData.append('name', favorName)
            formData.append('price', price)

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

 const searchFavor = ()=>{
    if(favor){
        setFavorName(favor.name)
        setPrice(favor.price)
        if (favor.filename) {
          setFileSource("http://localhost:8080/api/v1/public/info/favors/pic/" + favor.filename);
          fileInputRef.current.value = ""; // Очистка значения file input
        }
    }
    else{
        setIsEditable(true)
    }
 }

  useEffect(searchFavor, [favor]);

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
                        !favor &&
                        <button  onClick={handleRemoveFile} disabled={!isEditable}>Удалить картинку</button>
                    }
                </>
                 )}
            </div>
        </td>
        <td>
            <input type="text" disabled={!isEditable} value={favorName}  onChange={(e) => setFavorName(e.target.value)}/>
        </td>
        <td>
        <input
  type="text"
  disabled={!isEditable}
  value={price}
  onChange={(e) => {
    const inputValue = e.target.value;
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setPrice(inputValue);
    }
  }}
/>
        </td>
        <td>
           

            {
                isEditable ?
                (
                    <button onClick={handleSaveClick}>
                     {favor? "Сохранить" : "Добавить"}
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
                favor ?
                (
                    <button onClick={()=> handleDeleteClick(favor.id)}>
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