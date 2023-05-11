import '../../clientConfig'
import { getPending } from '../../clientConfig'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('request: ', req.body)
    // Perform any necessary validation or processing of the form data here
    const data = JSON.parse(req.body)
    
    const {userID} = data
    
    console.log(userID)

    const pendingChanges = await getPending(userID);

    // Check if data is missing
    console.log(pendingChanges)

    if(pendingChanges.data.length === 0) {
        res.status(200).json({ message: `MISSING_CONFIG`});
    } else {
        // If Data Is Present
        res.status(200).json({data: pendingChanges})
        
    }
    // console.log("pending changes", pendingChanges)    

  } else {
    // Handle invalid request methods
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
