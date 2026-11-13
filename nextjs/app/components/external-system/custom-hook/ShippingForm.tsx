import { useEffect, useState } from 'react';

// You can simplify the ShippingForm component above by extracting the common logic 
// between them into your own useData Hook

function useData(url: string | null) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (url) {
      let ignore = false;
      
      fetch(url)
        .then(response => response.json())
        .then(json => {
          if (!ignore) {
            setData(json);
          }
        });

      return () => {
        ignore = true;
      };
    }
  }, [url]);

  return data;
}

interface ShippingFormProps
{
  country: string
}

function ShippingForm({ country }: ShippingFormProps) {

  const cities = useData(`/api/cities?country=${country}`);
  const [city, setCity] = useState(null);
  const areas = useData(city ? `/api/areas?city=${city}` : null);
}
