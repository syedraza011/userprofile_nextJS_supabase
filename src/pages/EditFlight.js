import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "./supabase";

const EditFlight = () => {
  const router = useRouter();
  const { id } = router.query;

  const [fetchError, setFetchError] = useState(null);
  const [flight, setFlight] = useState(null);
  const [formData, setFormData] = useState({
    depart: "",
    depardate: "",
    arrive: "",
    arrivaldate: "",
    spacecraft: "",
  });

  useEffect(() => {
    const fetchFlight = async () => {
      const { data, error } = await supabase
        .from("flight")
        .select()
        .eq("id", id)
        .single();
      if (error) {
        setFetchError("Could not fetch flight data");
        setFlight(null);
        console.log("Error: ", error);
      }
      if (data) {
        console.log(data);
        setFlight(data);
        setFormData({
          depart: data.depart,
          depardate: data.depardate,
          arrive: data.arrive,
          arrivaldate: data.arrivaldate,
          spacecraft: data.spacecraft,
        });
        setFetchError(null);
      }
    };
    fetchFlight();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { depart, depardate, arrive, arrivaldate, spacecraft } = formData;
    const { data, error } = await supabase
      .from("flight")
      .update({ depart, depardate, arrive, arrivaldate, spacecraft })
      .eq("id", id);
    if (error) {
      console.log("Error updating flight:", error);
      return;
    }
    console.log("Flight updated:", data);
    router.push("/Flights");
  };

  const handleChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  if (fetchError) {
    return <p>{fetchError}</p>;
  }

  if (!flight) {
    return <p>Loading flight data...</p>;
  }

  return (
    <div>
      <h1>Edit Flight</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="depart">Departure:</label>
          <input
            type="text"
            id="depart"
            name="depart"
            value={formData.depart}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="depardate">Departure Date:</label>
          <input
            type="text"
            id="depardate"
            name="depardate"
            value={formData.depardate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="arrive">Arrival:</label>
          <input
            type="text"
            id="arrive"
            name="arrive"
            value={formData.arrive}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="arrivaldate">Arrival Date:</label>
          <input
            type="text"
            id="arrivaldate"
            name="arrivaldate"
            value={formData.arrivaldate}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
};
