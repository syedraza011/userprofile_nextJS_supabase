import React, { useEffect, useState } from "react";
import Link from "next/link";
import supabase from "./supabase";
import styles from "@/styles/Home.module.css";
import robStyles from "@/styles/robsStyles/Flights.module.css";
import Cart from "../pages/cart";

const Flights = () => {
  const [fetchError, setFetchError] = useState(null);
  const [flights, setflights] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const handleEdit = (id) => {
    router.push(`/flights/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from("flight").delete().eq("id", id);
      if (error) {
        throw error;
      }
      setflights((prevFlights) => {
        return prevFlights.filter((flight) => flight.id !== id);
      });
    } catch (error) {
      console.log("Error deleting flight: ", error);
    }
  };

  const handleAddToCart = (flight) => {
    const existingCartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingCartItem = existingCartItems.find(
      (item) => item.id === flight.id
    );
    if (existingCartItem) {
      existingCartItem.quantity += 1;
      localStorage.setItem("cartItems", JSON.stringify(existingCartItems));
      setCartItems(existingCartItems);
      alert("Item already in cart, quantity updated");
    } else {
      const updatedCartItems = [
        ...existingCartItems,
        { ...flight, quantity: 1 },
      ];
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      setCartItems(updatedCartItems);
      alert("Item added to cart");
    }

  
  };

  useEffect(() => {
    const fetchFlights = async () => {
      const { data, error } = await supabase.from("flight").select();
      if (error) {
        setFetchError("Could not fetch flights data");
        setflights(null);
        console.log("Error: ", error);
      }
      if (data) {
        setflights(data);
        setFetchError(null);
      }
    };
    fetchFlights();

    // Retrieve cart items from local storage
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  return (
    <>
      <Cart />
      <div className="styles.CartIcon">
        <Link href="/cart">🛒 </Link>
      </div>
      <div className={robStyles.flightsBox}>
        <p className={robStyles.textBox}>
          Welcome to Starbound Flights, the premier space tourism company for
          those seeking a truly out-of-this-world experience. Our mission is to
          make space travel accessible and safe for everyone, so that you can
          experience the thrill of exploring the cosmos for yourself.
        </p>
        <div>
          <Link className={styles.btnStyle} href="/AddFlight">
            Add New Flight
          </Link>

          {fetchError && <p>{fetchError}</p>}
          {flights && (
            <div className="flights">
              {flights.map((flight, index) => (
                <div key={index}>
                  <h2>
                    {flight.depart} to {flight.destination}
                  </h2>
                  <p>Depart Origon: {flight.depart}</p>
                  <p>depart Time:{flight.departime}</p>
                  <p>depart Date: {flight.depardate}</p>
                  <p>Return Time:{flight.returntime}</p>
                  <p> Return Date: {flight.returndate}</p>
                  <p>Dragon Price: ${flight.price}</p>
                  <button onClick={() => handleEdit(flight.id)}>Edit</button>
                  <button onClick={() => handleDelete(flight.id)}>
                    Delete
                  </button>

                  <button onClick={() => handleAddToCart(flight)}>
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="main"></div>
      </div>
    </>
  );
};

export default Flights;

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import supabase from "./supabase";
// import styles from "@/styles/Home.module.css";
// import robStyles from "@/styles/robsStyles/Flights.module.css";
// import CartIcon from "./CartIcon";
// import Cart from "./cart";

// const Flights = () => {
//   const [fetchError, setFetchError] = useState(null);
//   const [flights, setflights] = useState(null);
//   const [cartItems, setCartItems] = useState([]);

//   const handleEdit = (id) => {
//     router.push(`/flights/${id}`);
//   };

//   const handleDelete = async (id) => {
//     try {
//       const { error } = await supabase.from("flight").delete().eq("id", id);
//       if (error) {
//         throw error;
//       }
//       setflights((prevFlights) => {
//         return prevFlights.filter((flight) => flight.id !== id);
//       });
//     } catch (error) {
//       console.log("Error deleting flight: ", error);
//     }
//   };

//   const handleAddToCart = (flight) => {
//     console.log("AddingtoCart");
//     const existingCartItems =
//       JSON.parse(localStorage.getItem("cartItems")) || [];
//       console.log("ExistingCartItems",existingCartItems)
//     const updatedCartItems = [...existingCartItems, flight];
//     localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
//     console.log("Updated",updatedCartItems)
//     setCartItems(updatedCartItems);
//   };

//   useEffect(() => {
//     const fetchFlights = async () => {
//       const { data, error } = await supabase.from("flight").select();
//       if (error) {
//         setFetchError("Could not fetch flights data");
//         setflights(null);
//         console.log("Error: ", error);
//       }
//       if (data) {
//         setflights(data);
//         setFetchError(null);
//       }
//     };
//     fetchFlights();

//     // Retrieve cart items from local storage
//     const storedCartItems = localStorage.getItem("cartItems");
//     if (storedCartItems) {
//       setCartItems(JSON.parse(storedCartItems));
//     }
//   }, []);

//   return (
//     <>
//       <Cart cartItems={cartItems} />
//       <div className={robStyles.flightsBox}>
//         <p className={robStyles.textBox}>
//           Welcome to Starbound Flights, the premier space tourism company for
//           those seeking a truly out-of-this-world experience. Our mission is to
//           make space travel accessible and safe for everyone, so that you can
//           experience the thrill of exploring the cosmos for yourself.
//         </p>
//         <div>
//           <Link className={styles.btnStyle} href="/AddFlight">
//             Add New Flight
//           </Link>

//           {fetchError && <p>{fetchError}</p>}
//           {flights && (
//             <div className="flights">
//               {flights.map((flight) => (
//                 <div key={flight.id}>
//                   <h2>
//                     {flight.depart} to {flight.destination}
//                   </h2>
//                   <p>Depart Origon: {flight.depart}</p>
//                   <p>depart Time:{flight.departime}</p>
//                   <p>depart Date: {flight.depardate}</p>
//                   <p>Return Time:{flight.returntime}</p>
//                   <p> Return Date: {flight.returndate}</p>
//                   <p>Dragon Price: ${flight.price}</p>
//                   <button onClick={() => handleEdit(flight.id)}>Edit</button>
//                   <button onClick={() => handleDelete(flight.id)}>
//                     Delete
//                   </button>
//                   <button onClick={() => handleAddToCart(flight)}>
//                     Add to Cart
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="main"></div>
//       </div>
//     </>
//   );
// };

// export default Flights;
