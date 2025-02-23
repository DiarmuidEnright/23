"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Supabase configuration
const supabase = createClient(
  "https://evxchpvtxienefjtcbhs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2eGNocHZ0eGllbmVmanRjYmhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyNDUzMTMsImV4cCI6MjA1NTgyMTMxM30.AT95PWkDSPUBQAQCmE1VZrhIltvOuj4moE34pRs3OVw"
);

interface Complaint {
  id: number;
  full_name: string;
  country: string;
  city: string;
  summary: string;
}

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchComplaints() {
      const { data, error } = await supabase.from("complaints").select("*");
      if (error) {
        setError(error.message);
      } else {
        setComplaints(data);
      }
    }
    fetchComplaints();
  }, []);

  return (
    <div className="complaints-container">
      <h1 className="page-title">Live Complaints</h1>
      {error && <p className="error-message">{error}</p>}

      <div className="complaints-table">
        <div className="complaints-header">
          <span>ID</span>
          <span>Name</span>
          <span>Country</span>
          <span>City</span>
          <span>Description</span>
        </div>

        {complaints.map((complaint) => (
          <div key={complaint.id} className="complaint-row">
            <span>{complaint.id}</span>
            <span>{complaint.full_name}</span>
            <span>{complaint.country}</span>
            <span>{complaint.city}</span>
            <span>{complaint.summary}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintsPage;
