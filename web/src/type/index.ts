export interface Furniture {
  id: number
  name: string
  description: string
  image: string
  type: number
  create_time: string
  location: string
  user_id: number
  status: number 
  score: number
  buyer_id: number
  feedback: string
}

export interface User {
  id: number
  email: string
  password: string
  username: string
}

export interface Comment {
  id: number
  furniture_id: number
  user_id: number
  content: string
  create_time: string
  username: string
  email: string
}

export interface Post {
  id: number
  title: string
  content: string
}

export interface Message {
  id: number
  content: string
  send_id: number
  receive_id: number
  create_time: string
  username: string
}