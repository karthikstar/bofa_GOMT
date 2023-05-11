import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Form({user}) {
  const router = useRouter();
  const [ClientID, setClientID] = useState('');
  const [CommissionDifference, setCommissionDifference] = useState('');
  const [GrossAmountDifference, setGrossAmountDifference] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get data from the form.
    const data = {
      clientID: ClientID,
      commisionDifference: CommissionDifference, 
      grossAmountDifference: GrossAmountDifference,
      user: user,
    };
 
    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);
 

    try {
      const response = await fetch('/api/addConfig', {
        method: 'POST',
        body: JSONdata,
      });

      console.log(response)

      if (response.ok) {
        // Handle successful form submission
        console.log('Form submitted successfully!');

        // You can optionally navigate to a different page here
        router.push('./');
      } else {
        // Handle form submission error
        console.log('Form submission error');
      }
    } catch (error) {
      // Handle fetch error
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="ClientID">Client ID</label>
      <input type="number" id="ClientID" name="ClientID" value={ClientID} onChange={(e) => setClientID(e.target.value)} required />

      <label htmlFor="CommissionDifference">Commision Difference</label>
      <input type="number" id="CommissionDifference" name="CommissionDifference" value={CommissionDifference} onChange={(e) => setCommissionDifference(e.target.value)} required />

      <label htmlFor="GrossAmountDifference">Gross Amount Difference</label>
      <input type="number" id="GrossAmountDifference" name="GrossAmountDifference" value={GrossAmountDifference} onChange={(e) => setGrossAmountDifference(e.target.value)} required />

      <button type="submit">Submit</button>
    </form>
  );
}
// In this code, the form's onSubmit event handler is set to handleSubmit, which prevents the default form submission behavior. The form data is then sent asynchronously using the fetch API. If the response is successful (status code 200-299), you can handle it accordingly. Additionally, you can use the router.push method to navigate to a different page if desired.
