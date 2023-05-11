import '../../clientConfig'
import { getAllRows, getConfig, submit } from '../../clientConfig'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('request: ', req.body)
    // Perform any necessary validation or processing of the form data here
    const data = JSON.parse(req.body)
    
    const {clientID, commisionDifference, grossAmountDifference, user} = data
    
    console.log(clientID)

    const retrievedConfig = await getConfig(clientID);

    // Check if data is missing
    console.log(retrievedConfig)

    if(retrievedConfig.data.length === 0) {
        res.status(200).json({ message: `MISSING_CONFIG`});
    } else {
        // If Data Is Present
        const ret_commission_difference = retrievedConfig.data[0].commission_difference;
        const ret_grossamount_difference = retrievedConfig.data[0].grossamount_difference;


        if(commisionDifference > ret_commission_difference) {
            res.status(200).json({ message: `COMMISION_OUT_OF_TOLERANCE`});
        } else if (grossAmountDifference > ret_grossamount_difference) {
            res.status(200).json({ message: `GROSSAMOUNT_OUT_OF_TOLERANCE`});
        } else {
            res.status(200).json({ message: `SUCCESS`});
        }
    }
    console.log("retrieved config", retrievedConfig)    

  } else {
    // Handle invalid request methods
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
