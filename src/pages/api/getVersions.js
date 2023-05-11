import '../../clientConfig'
import { getVersions } from '../../clientConfig'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('request: ', req.body)
    // Perform any necessary validation or processing of the form data here
    const data = JSON.parse(req.body)
    
    const {} = data
    
    console.log()

    const versions = await getVersions();

    // Check if data is missing
    console.log(versions)

    if(versions.data.length === 0) {
        res.status(200).json({ message: `MISSING_CONFIG`});
    } else {
        // If Data Is Present
        
    }
    console.log("pending changes", versions)    

  } else {
    // Handle invalid request methods
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
