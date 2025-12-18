/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom";

// Correct axios base URL
axios.defaults.baseURL = "http://localhost:4000";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    
    const navigate = useNavigate();
    const currency = "$";
    
    // States
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [pickupDate, setPickupDate] = useState("");
    const [returnDate, setReturnDate] = useState("");

    const [cars,setCars] = useState([])

    //Founction To Check if user is logged in
    const fetchUser = async () =>{
      try {
        const {data} = await axios.get("/api/user/data")
         if(data.success){
            setUser(data.user)
            setIsOwner(data.user.role === 'owner')
         }else{
            navigate('/')
         }
      } catch (error) {
        toast.error(error.message)
      }
    } 

const fetchCars = async () => {
  try {
    const { data } = await axios.get("/api/user/cars");
   console.log(data);
   
    if (data.success) {
      setCars(data.cars);
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    console.error(error);
    toast.error("Failed to load cars");
  }
};


    //Founction To log out The user
    const logout = () =>{
      localStorage.removeItem('token')
      setToken(null)
      setUser(null)
      setIsOwner(false)
        axios.defaults.headers.common['Authorization'] = ''
        toast.success('You have been logged out')
    }

    //useEffect to fetch retrieve the token from localStroage
    useEffect(() =>{
        const token = localStorage.getItem('token')
        setToken(token)
        fetchCars()
    },[])

    //useEffect to fetch user data when token is available
    useEffect(() =>{
     if(token){
        axios.defaults.headers.common['Authorization'] = `${token}`
        fetchUser()
     }
    },[token])
    const value = {
        navigate,currency,axios,user,setUser,token,
        setToken,isOwner,setIsOwner,fetchUser,showLogin,
        setShowLogin,logout,fetchCars,cars,setCars,
        pickupDate,setPickupDate,returnDate,setReturnDate

    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
