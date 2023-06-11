import { useState } from "react";
import supabase from "./supabase";
import TimePicker from "react-datepicker";

function AddFlight() {
  const [depart, setDepart] = useState("");
  const [destination, setDestination] = useState("");
  const [departime, setDepartime] = useState("");
  const [depardate, setDepardate] = useState("");
  const [returntime, setReturntime] = useState("");
  const [returndate, setReturndate] = useState("");
  const [price, setPrice] = useState("");

  const handleTimeChange = (arrivetime) => {
    setArrivetime(arrivetime);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.from("flights").insert([
      {
        depart,
        destination,
        departime,
        depardate,
        returntime,
        returndate,
        price,
      },
    ]);

    if (error) {
      console.error(error);
    } else {
      console.log("Flight added successfully:", data);
      // reset form fields
      setDepart("");
      setDestination("");
      setDepartime("");
      setDepardate("");
      setReturntime("");
      setReturndate("");
      setPrice("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
      <div className="grid grid-cols-1 gap-6">
        <label htmlFor="depart" className="block">
          Departure
        </label>
        <input
          type="text"
          id="depart"
          name="depart"
          value={depart}
          onChange={(e) => setDepart(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:border-blue-500"
        />
        <label htmlFor="destination" className="block">
          Destination
        </label>
        <input
          type="text"
          id="destination"
          name="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:border-blue-500"
        />
        {/* <label htmlFor="departime" className="block">
          Departure Time
        </label>
        <input
          type="text"
          id="departime"
          name="departime"
          value={departime}
          onChange={(e) => setDepartime(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:border-blue-500"
        /> */}

        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="departime"
        >
          Departure Time
        </label>


        <TimePicker
        placeholderText="Select Arrival Time"
        selected={arrivetime}
        onChange={handleTimeChange}
        showTimeSelect
        isClearable
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="hh:mm:ss aa"
      />


        {/* <TimePicker
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="departime"
          value={departime}
          onChange={setDepartime}
        /> */}

        <label htmlFor="depardate" className="block">
          Departure Date
        </label>
        <input
          type="text"
          id="depardate"
          name="depardate"
          value={depardate}
          onChange={(e) => setDepardate(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:border-blue-500"
        />
        <label htmlFor="returntime" className="block">
          Return Time
        </label>
        <input
          type="text"
          id="returntime"
          name="returntime"
          value={returntime}
          onChange={(e) => setReturntime(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline"
        />

        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <button type="submit">Add Flight</button>
      </div>
    </form>
  );
}

export default AddFlight;
