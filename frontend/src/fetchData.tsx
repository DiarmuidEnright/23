// src/components/FetchData.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';

interface Item {
  id: number;
  name: string;
}

const FetchData: React.FC = () => {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('items').select('*');
      if (error) console.error('Error fetching data:', error);
      else setData(data || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Footage Analysis:</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FetchData;
