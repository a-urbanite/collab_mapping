import { collection, getDocs, getFirestore } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next'
import { app } from '../../firebase-config';
import { starterSet, locationsType } from './starterSet'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<locationsType>
) {
  const db = getFirestore(app);
  const dbRef = collection(db, "features3" )
  const resp = await getDocs(dbRef);
  const locations: any[] = resp.docs.map((doc) => {
      const data = doc.data()
      const geojsonObj = JSON.parse(data.feature)
      geojsonObj.properties.firebaseDocID = doc.id
      return geojsonObj
  })
  res.status(200).json(locations)
}