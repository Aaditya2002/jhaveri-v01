import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request: Request) {
  try {
    const { name, email, phone, start, end, notes } = await request.json()
    
    const response = await axios.post(
      'https://api.cal.com/v1/bookings',
      {
        eventType: 'jhaveri-securities/15min',
        attendees: [
          {
            name,
            email,
            phone
          }
        ],
        start,
        end,
        metadata: {
          notes: notes || 'Scheduled via AI chatbot.'
        }
      },
      {
        headers: {
          Authorization: 'Bearer cal_live_a9f1601725ec72b3222d02408bd360f3',
          'Content-Type': 'application/json'
        }
      }
    )
    
    return NextResponse.json(response.data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.response?.data || 'Internal server error' },
      { status: error?.response?.status || 500 }
    )
  }
} 