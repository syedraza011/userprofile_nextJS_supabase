import { useState } from "react";
import supabase from "../supabase";
import { useRouter } from "next/router";
import Link from "next/link";

const FlightDetails = ({ flight }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    depart: flight.depart,
    destination: flight.destination,
    departime: flight.departime,
    depardate: flight.depardate,
    returndate: flight.returndate,
    returntime: flight.returntime,
    price: flight.price,
  });

  const handleChange = (e) => {
    console.log("i am here");
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("i am in usbmission part");
    console.log("sample output", formData);
    e.preventDefault();
    const {
      depart,
      destination,
      departime,
      depardate,
      returntime,
      returndate,
      price,
    } = formData;
    console.log("Departure origon", depart);
    const { data, error } = await supabase
      .from("flight")
      .update([
        {
          depart,
          destination,
          departime,
          depardate,
          returntime,
          returndate,
          price,
        },
      ])
      .eq("id", flight.id);

    if (error) {
      alert(error.message);
      console.log("Error updating flight:", error);
      return;
    }
    alert("Succes, Updated flight");
    console.log("Flight updated:", data);
    router.push(`/flights/${flight.id}`);
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-16 px-8">
      <h1 className="text-3xl mb-6">
        {flight.depart} to {flight.destination}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="depart">Departure:</label>
          <input
            type="text"
            id="depart"
            name="depart"
            value={formData.depart}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="destination">Destination:</label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="depardate">Departure time:</label>
          <input
            type="text"
            id="departime"
            name="departime"
            value={formData.departime}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="depardate">Departure Date:</label>
          <input
            type="text"
            id="depardate"
            name="depardate"
            value={formData.depardate}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="returndate">Return time:</label>
          <input
            type="text"
            id="returntime"
            name="returntime"
            value={formData.returntime}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="returndate">Return Date:</label>
          <input
            type="text"
            id="returndate"
            name="returndate"
            value={formData.returndate}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <Link href="/flights">
          <button>Back to Flights Page</button>
          </Link>
         
          <button type="submit">Update Flight </button>
   
      </form>
    </div>
  );
};

export default FlightDetails;

export const getStaticPaths = async () => {
  const { data: flights } = await supabase.from("flight").select("id");

  const paths = flights.map(({ id }) => ({
    params: {
      id: id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { id } }) => {
  const { data: flight } = await supabase
    .from("flight")
    .select("*")
    .eq("id", id)
    .single();

  return {
    props: {
      flight,
    },
  };
};

// import { useState } from "react";
// import supabase from "../supabase";
// import { useRouter } from "next/router";
// import Link from "next/link";

// const FlightDetails = ({ flight }) => {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     depart: flight.depart,
//     destination: flight.destination,
//     departime: flight.departime,
//     depardate: flight.depardate,
//     returndate: flight.returndate,
//     returntime: flight.returntime,
//     price: flight.price,
//   });

//   const handleChange = (e) => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     console.log("sample output", formData);
//     e.preventDefault();

//     const { data, error } = await supabase
//       .from("flight")
//       .update({
//         depart: formData.depart,
//         destination: formData.destination,
//         departime: formData.departime,
//         depardate: formData.depardate,
//         returndate: formData.returndate,
//         returntime: formData.returntime,
//         price: formData.price,
//       })
//       .eq("id", flight.id);

//     if (error) {
//       console.log("Error updating flight:", error);
//       return;
//     }
//     console.log("Flight updated:", data);
//     router.push(`/flights/${flight.id}`);
//   };

//   return (
//     <div className="w-full max-w-3xl mx-auto py-16 px-8">
//       <h1 className="text-3xl mb-6">
//         {flight.depart} to {flight.destination}
//       </h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="depart">Departure:</label>
//           <input
//             type="text"
//             id="depart"
//             name="depart"
//             value={formData.depart}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="destination">Destination:</label>
//           <input
//             type="text"
//             id="destination"
//             name="destination"
//             value={formData.destination}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="departime">Departure time:</label>
//           <input
//             type="text"
//             id="departime"
//             name="departime"
//             value={formData.departime}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="depardate">Departure Date:</label>
//           <input
//             type="text"
//             id="depardate"
//             name="depardate"
//             value={formData.depardate}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="returntime">Return time:</label>
//           <input
//             type="text"
//             id="returntime"
//             name="returntime"
//             value={formData.returntime}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="returndate">Return Date:</label>
//           <input
//             type="text"
//             id="returndate"
//             name="returndate"
//             value={formData.returndate}
//             onChange={handleChange}
//           />
//         </div>

// <div className="mb-4">
//           <label htmlFor="price">Price:</label>
//            <input
//             type="number"
//             id="price"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//           />
//         </div>
//         <Link href="/flights">
//           <button type="submit">Update Flight </button>
//         </Link>
//       </form>
//     </div>
//   );
// };

// export default FlightDetails;

// export const getStaticPaths = async () => {
//   const { data: flights } = await supabase.from("flight").select("id");

//   const paths = flights.map(({ id }) => ({
//     params: {
//       id: id.toString(),
//     },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// };

// export const getStaticProps = async ({ params: { id } }) => {
//   const { data: flight } = await supabase
//     .from("flight")
//     .select("*")
//     .eq("id", id)
//     .single();

//   return {
//     props: {
//       flight,
//     },
//   };
// };
