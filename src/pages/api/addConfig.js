import '../../clientConfig'
import { getAllRows, getConfig, submit } from '../../clientConfig'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('request: ', req.body)
    // Perform any necessary validation or processing of the form data here
    const data = JSON.parse(req.body)
    
    const {clientID, commisionDifference, grossAmountDifference, user} = data
    
    console.log(clientID)


    // const sampleconfig = await getConfig(4);
    // console.log('config:' , sampleconfig)

    const submitConfig = await submit(clientID, grossAmountDifference, commisionDifference, user);
    console.log(submitConfig)
    

    // Example response indicating successful form submission
    res.status(200).json({ message: `Form submitted successfully!`});
  } else {
    // Handle invalid request methods
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
