import { firebase } from '../utilities'

export type ItemModel = {
  id: string
  title: string
  body: string
  status: 'unpublish' | 'publish'
  createdAt: firebase.firestore.FieldValue
  updatedAt: firebase.firestore.FieldValue
}

export const createItemModel = (json: PureObject): ItemModel => {
  return {
    id: json.id,
    title: json.title,
    body: json.body,
    status: json.status,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  }
}
